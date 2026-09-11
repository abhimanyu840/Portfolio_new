# portfolio_new

Full-stack developer portfolio web application for Abhimanyu Kumar (Software Engineer specializing in Python, FastAPI, React, Linux/RHEL, Observability & Infrastructure Telemetry). Built as a Turborepo monorepo orchestrated with Bun workspaces, featuring a Next.js 16 full-stack App Router application with Tailwind CSS, integrated Next.js API route handlers, MongoDB persistence, and an Observability & Dark Tech Minimalist UI theme deployed on Netlify.

Status: new project, 0 commits. Architecture aligned via user interview: single full-stack Next.js 16 app with internal API route handlers in Turborepo, deployed to Netlify.

## Stack

- **Workspace & Monorepo Runner**: Turborepo `2.10.12` (`npm view turbo version`) orchestrated by Bun `1.3.14` (`bun --version`) with Bun workspaces (`apps/*`, `packages/*`).
- **Full-Stack Application (`apps/web`)**: Next.js `16.3.4` (`npm view next version`) with React 19, TypeScript, and Tailwind CSS. API endpoints reside in Next.js App Router Route Handlers (`src/app/api/v1/...`).
- **Database**: MongoDB with Mongoose ODM (singleton connection pattern optimized for serverless Netlify functions, with in-memory seed fallback for local offline development).
- **Hosting & Deployment**: Netlify (`netlify.toml` with Next.js Runtime).
- **Runtimes & Tooling**: Node.js `v25.8.0` (`node --version`), npm `11.11.0` (`npm --version`), bun `1.3.14` (`bun --version`), git `2.53.0.windows.1` (`git --version`).

## Commands

| Task | Command | Status |
|---|---|---|
| probe runtime | `node --version` | `verified` — exited 0 (`v25.8.0`) |
| probe package manager | `bun --version` | `verified` — exited 0 (`1.3.14`) |
| probe npm | `npm --version` | `verified` — exited 0 (`11.11.0`) |
| probe vcs | `git --version` | `verified` — exited 0 (`git version 2.53.0.windows.1`) |
| probe next registry | `npm view next version` | `verified` — exited 0 (`16.3.4`) |
| probe turbo registry | `npm view turbo version` | `verified` — exited 0 (`2.10.12`) |
| install monorepo deps | `bun install` | `verified` — exited 0 (138 packages installed) |
| check-types (turbo) | `bun run check-types` | `verified` — exited 0 (turbo check-types across all workspaces) |
| lint (turbo) | `bun run lint` | `verified` — exited 0 (turbo lint across all workspaces) |
| dev (turbo) | `bun run dev` | `verified` — starts Next.js App Router on port 3000 |
| build (turbo) | `bun run build` | `verified` — exited 0 (production build in 13.4s) |
| health probe | `Invoke-RestMethod http://localhost:3000/api/v1/health` | `verified` — exited 0 (status: healthy, 200 OK) |
| projects probe | `Invoke-RestMethod http://localhost:3000/api/v1/projects` | `verified` — exited 0 (5 projects returned, 200 OK) |
| telemetry probe | `Invoke-RestMethod http://localhost:3000/api/v1/telemetry` | `verified` — exited 0 (live telemetry returned, 200 OK) |
| contact probe | `POST http://localhost:3000/api/v1/contact` | `verified` — exited 0 (201 Created on valid input, 400 on invalid) |
| browser test | Headless Edge / Chrome (`http://localhost:3000`) | `verified` — exited 0 (DOM dumped 119KB, visual screenshots desktop & mobile verified) |

## Layout

Verified Turborepo monorepo layout:

```
apps/
  web/                    # Next.js 16 full-stack app (UI + API routes) — implemented & verified
    src/
      app/
        api/v1/           # Next.js Route Handlers (health, projects, contact, telemetry)
        layout.tsx
        page.tsx
        globals.css
      components/         # Navbar, Hero, TerminalHUD, Projects, Skills, Experience, Contact, Footer
      lib/                # MongoDB singleton connection, seed data
      models/             # Mongoose schemas: Project, Contact, VisitorLog
packages/
  shared/                 # Shared TypeScript types and Zod schemas (@portfolio/shared)
  typescript-config/      # Shared tsconfig base files (@portfolio/typescript-config)
ai-workspace/             # AI workflow artifacts
  plans/                  # Implementation plans
  prompts/specs/          # Project specs
  scratch/                # Ephemeral scratch files (ignored)
netlify.toml              # Netlify build and deployment configuration
turbo.json                # Turborepo task pipeline configuration
package.json              # Monorepo root manifest with Bun workspaces
AGENTS.md                 # Project rules and context
.gitignore                # Git ignore rules
```

## Conventions

- Shell: Windows PowerShell 5.1 / 7 (`pwsh`). Script commands chain with `;` (never Unix `&&` or `||`).
- Paths: Use forward slashes in markdown and code imports; backslashes for native Windows PowerShell execution paths.
- Package manager: Bun (`bun install`, `bun add`, `bun run`).
- Secrets and tokens: Database connection string (`MONGODB_URI`) resides in `.env.local` / Netlify environment variables, never committed to git.
- API Design: Route Handlers in `src/app/api/v1/` with Zod input validation and uniform JSON responses `{ success: true, data: ... }`.

## First slice

Completed and verified:
1. Root `package.json` and `turbo.json` created and functional.
2. `apps/web` (Next.js 16 + Tailwind CSS) with Route Handlers in `src/app/api/v1/...` and responsive UI.
3. Verified `http://localhost:3000` renders without console errors in headless browsers, and all API endpoints respond with HTTP 200/201.

## Built and Verified

- Monorepo root manifest (`package.json`) with Bun workspaces (`apps/*`, `packages/*`).
- Turborepo configuration (`turbo.json`) with `build`, `dev`, `lint`, and `check-types` pipelines.
- Shared package `@portfolio/shared` with TypeScript interfaces and Zod validation schemas.
- TypeScript base configurations in `packages/typescript-config`.
- Full-stack Next.js 16 App Router application in `apps/web`.
- Mongoose singleton connection with robust fallback (`apps/web/src/lib/db.ts`).
- Comprehensive seed data representing Abhimanyu Kumar's full credentials, projects, and skills (`apps/web/src/lib/seed-data.ts`).
- Observability & Dark Tech Minimalist UI components (matching `updated_ui.png` with darker obsidian cyber-blue scheme):
  - `Navbar`: Floating dock capsule with AK blue-indigo gradient monogram, active HUD pill with glowing cyan dot, live uptime ECG pulse, CLI drawer launcher, and verified credential badge.
  - `Hero`: Headline (on single line), tech stack subheader, status capsule (`ENTERPRISE TELEMETRY ACTIVE`), CTAs (`EXPLORE_PROJECTS`, `OPEN_TERMINAL_HUD`, `TRANSMIT_INQUIRY`), 4 metric glass cards (1.5+ Yrs, 500+ Nodes, 12k/s flow, BITS Pilani M.Tech) with sparklines, server array graphic, and campus clock tower silhouette, Netlify badge, and fiber-optic rail.
  - `HoloConsole`: 3D isometric layered developer console with glowing `< / >` emblem, vertical telemetry bars, and vertical tagline (`BUILDING SCALABLE SYSTEMS FOR A SMARTER TOMORROW`).
  - `ObservabilityHUD`: Real-time topology flow, enterprise storage status (NetApp, Dell EMC, Hitachi, Brocade SAN), sparklines in dark obsidian glass.
  - `TerminalHUD`: Interactive drawer CLI with `help`, `whoami`, `projects`, `skills`, `experience`, `education`, `uptime`, `cat resume`, `contact`, `theme`, `clear`, `exit`.
  - `Projects`: Filterable project showcase with deep architecture spec modal in dark obsidian glass.
  - `Skills`: Categorized competency matrix across 7 domains with cyan/emerald percentage meters.
  - `Experience`: Detailed Wipro enterprise telemetry timeline and BITS Pilani M.Tech academic foundation.
  - `ContactSection`: Validated transmission buffer form and direct communication channels.
  - `Footer`: System SLA, commit hash indicator, fiber-optic beam, and return-to-top button.
- Netlify deployment config in `netlify.toml` with `@netlify/plugin-nextjs`.
- Git repository initialized.

## Verification

Toolchain and application verified on this host:

- `node --version` -> `v25.8.0`
- `bun --version` -> `1.3.14`
- `git --version` -> `git version 2.53.0.windows.1`
- `npm view next version` -> `16.3.4`
- `npm view turbo version` -> `2.10.12`
- `bun run check-types` -> passed (0 errors)
- `bun run build` -> passed (0 errors, all static & dynamic routes compiled)
- `Invoke-RestMethod http://localhost:3000/api/v1/health` -> HTTP 200 `{ status: "healthy" }`
- `Invoke-RestMethod http://localhost:3000/api/v1/projects` -> HTTP 200 (5 projects)
- `Invoke-RestMethod http://localhost:3000/api/v1/telemetry` -> HTTP 200 (live metrics)
- `POST http://localhost:3000/api/v1/contact` -> HTTP 201 (valid), HTTP 400 (invalid)
- Visual Verification: Headless Chrome/Edge captured `final-desktop.png` and `final-mobile.png`, perfectly matching `ai-workspace/prompts/specs/updated_ui.png` with darker color scheme.

## Open questions

All core architectural decisions resolved:
1. **Design Theme**: Observability & Dark Tech Minimalist (ultra-dark obsidian `#02040a` canvas with neon cyan, cobalt, and purple telemetry accents and 3D isometric hologram matching `updated_ui.png`).
2. **Backend**: Next.js 16 App Router Route Handlers (`src/app/api/v1/...`).
3. **Database**: MongoDB Atlas with resilient mock/seed fallback.
4. **Deployment**: Netlify (`@netlify/plugin-nextjs`).
