import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  status: "connected" | "disconnected" | "in-memory-fallback";
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  status: "in-memory-fallback",
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === "") {
    cached.status = "in-memory-fallback";
    return null;
  }

  if (cached.conn) {
    cached.status = "connected";
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        cached.status = "connected";
        return m;
      })
      .catch((err) => {
        console.warn("[MongoDB] Connection failed, switching to in-memory fallback:", err.message);
        cached.promise = null;
        cached.status = "in-memory-fallback";
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.conn = null;
    cached.status = "in-memory-fallback";
  }

  return cached.conn;
}

export function getDatabaseStatus(): "connected" | "disconnected" | "in-memory-fallback" {
  if (!process.env.MONGODB_URI) {
    return "in-memory-fallback";
  }
  if (mongoose.connection.readyState === 1) {
    return "connected";
  }
  return cached.status;
}
