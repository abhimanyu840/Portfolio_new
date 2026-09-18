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
| contact status probe | `Invoke-RestMethod http://localhost:3000/api/v1/contact` | `verified` — exited 0 (status: operational, bufferSize, rateLimitWindow) |
| contact transmission probe | `POST http://localhost:3000/api/v1/contact` | `verified` — exited 0 (201 Created on valid input, 400 on invalid, 429 on rate limit, honeypot trapped) |
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
- Interactive Styling: Universal `cursor: pointer` rule on `button`, `[role="button"]`, `a`, inputs, select, and summary in `globals.css` alongside explicit Tailwind `cursor-pointer` and `disabled:cursor-not-allowed` on all interactive UI components.

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
- Observability & Dark Tech Minimalist UI components:
  - `Navbar`: Modern developer header with AK monogram squircle, role subtitle, navigation links with dynamic scroll spy and glowing active pill highlighting (`Projects`, `Skills`, `Experience`, `Architecture Lab`, `Contact`), active pulse dot indicator, mobile menu with active badges, GitHub/LinkedIn icon buttons, terminal drawer trigger, and gradient CTA with active ring glow (all elements verified with `cursor-pointer`).
  - `Hero`: Headline, enterprise stats (1.5+ Yrs, 500+ Nodes, 12k/s flow, BITS Pilani M.Tech), and above-the-fold Quick Tech Stack ribbon featuring official brand logos (HTML5, CSS3, JS, TS, React, Next.js, Python, FastAPI, Docker, Linux, MongoDB).
  - `ObservabilityHUD`: Repositioned as an interactive Systems Architecture & Live Telemetry Lab below Experience. Features dual-perspective tabs (Enterprise Pipeline Simulation vs. Portfolio Live Runtime), interactive 4-stage ingestion pipeline inspector, enterprise SAN storage fabric node deep-dive inspector (NetApp, Dell EMC, Hitachi, Brocade), live streaming event log terminal with synthetic trap packet injector and SAN alarm simulator, and real-time roundtrip latency sparkline.
  - `TerminalHUD`: Interactive drawer CLI with `help`, `whoami`, `projects`, `skills`, `experience`, `education`, `uptime`, `cat resume`, `contact`, `theme`, `clear`, `exit`, dismissable on backdrop click.
  - `Projects`: Clean engineering systems showcase featuring horizontal segmented tabs with active sliding glow and count badges (no multi-line wrapping or deformed capsules), dedicated Flagship Bento Spotlight for `UnifiedOps`, and unified 2-column bento grid where every project has official colored SVG tech brand icons, color-accented category badges, verified production indicators, architecture highlights, telemetry metrics, and deep architecture spec modals.
  - `Skills`: Filterable visual technology directory with official colored SVG brand logos (HTML5 orange shield, CSS3, JavaScript, TypeScript, React, Python, FastAPI, etc.) and categorized competency matrix with matching tech icons.
  - `TechIcons`: High-fidelity SVG brand icon library with unified `getTechIcon` resolver for all primary web and backend technologies.
  - `Experience`: Detailed Wipro enterprise telemetry timeline and BITS Pilani M.Tech academic foundation.
  - `ContactSection`: Enterprise Direct Transmission Gateway (`05 // DIRECT TRANSMISSION GATEWAY`) with verified direct channels (Email, Phone, Station, SLA, GitHub, LinkedIn), interactive transmission form, one-click preset subject pills (`⚡ Enterprise SRE`, `🚀 Full-Stack`, `🛠️ Distributed Systems`), live character counter (`0 / 2000 chars`), `Ctrl + Enter` / `Cmd + Enter` hotkey execution, anti-spam honeypot trap, and automated 5-second countdown timer for button state restoration.
  - `Contact Gateway Architecture (`apps/web/src/app/api/v1/contact/route.ts`)`: Multi-tier delivery pipeline: Tier 1: Resend REST API direct email dispatch via native `fetch()` (zero new npm dependencies required); Tier 2: Instant Discord/Slack webhook mobile alerts; Tier 3: MongoDB `ContactModel` database persistence; Tier 4: In-memory FIFO ring buffer (`global.contactSubmissionsBuffer`). Protected by token-bucket sliding-window IP rate limiting (5 req/10m in production, 50 in dev) with HTTP 429 and `Retry-After` headers, and invisible bot honeypot trap null-routing crawlers with synthetic HTTP 201 without consuming quotas.
  - `Footer`: System SLA, commit hash indicator, and return-to-top button.
- **Dual-Theme Engine (Dark Mode & Light Mode with System Sync)**:
  - `ThemeContext` (`apps/web/src/context/ThemeContext.tsx`): Tri-state theme manager (`dark` | `light` | `system`), `resolvedTheme` decoupling, `localStorage` persistence, and reactive OS media-query change listener.
  - Zero-FOUC pre-hydration script (`apps/web/src/app/layout.tsx:50-70`): Head script evaluating `localStorage.portfolio_theme` or `window.matchMedia('(prefers-color-scheme: dark)').matches`, applying `.dark` or `.light` class, and setting `style.colorScheme` before first paint.
  - Tailwind v4 Theme Variant (`apps/web/src/app/globals.css:3`): Configured `@custom-variant dark (&:where(.dark, .dark *));` for deterministic class-based theme scoping alongside CSS variables `--background`/`--foreground`.
  - Sun/Moon Animated Toggles: High-contrast toggle buttons in desktop Navbar (`apps/web/src/components/Navbar.tsx:285-300`) and mobile navigation drawer (`apps/web/src/components/Navbar.tsx:320-336`).
  - Terminal CLI HUD Theme Commands (`apps/web/src/components/TerminalHUD.tsx:302-348`): Full support for `theme dark`, `theme light`, `theme system`, `theme toggle`, and `theme prompt <cyan|indigo|purple>`.
  - Pinned Architecture Specification Modal (`apps/web/src/components/Projects.tsx:332-445`): Header and footer pinned with flexbox and `max-h-[90vh]` scrollable body, ensuring close and action buttons are permanently visible within viewport.
  - Skills Single-Row Segmented Filter Tabs (`apps/web/src/components/Skills.tsx:165-184`): Horizontal segmented control with smooth scroll (`overflow-x-auto no-scrollbar`).
  - Latency Sparkline Percentage Heights (`apps/web/src/components/ObservabilityHUD.tsx:764-776`): Fixed flex container percentage height inheritance with `h-full flex flex-col justify-end` and inner flex bar alignment.
- **Framer Motion Tab Animation System**:
  - `framer-motion` (`^13.2.0`) installed in `apps/web`.
  - Spring-physics sliding active indicator (`layoutId`) with CSS `isolation: isolate` on buttons and `z-0 pointer-events-none` on indicator pills across all tab systems:
    - `Projects`: Category tabs (`layoutId="activeProjectsTab"`) with `<AnimatePresence initial={false} mode="wait">` panel transitions (`apps/web/src/components/Projects.tsx:96-140`).
    - `Skills`: Competency tabs (`layoutId="activeSkillsTab"`) with `<AnimatePresence initial={false} mode="wait">` and animated card reflow (`layout` prop) (`apps/web/src/components/Skills.tsx:175-230`).
    - `ObservabilityHUD`: Dual perspective views (`layoutId="activeHudPerspectiveTab"`), 4-stage ingestion topology (`layoutId="activeHudStageTab"`), and 4 enterprise SAN storage fabric nodes (`layoutId="activeHudFabricNode"`) with `<AnimatePresence initial={false} mode="wait">` (`apps/web/src/components/ObservabilityHUD.tsx:363-540`).
    - `Hero`: Specialization persona switchers (`layoutId="activeHeroPersonaTab"`) with `<AnimatePresence initial={false} mode="wait">` (`apps/web/src/components/Hero.tsx:151-189`).
    - `Navbar`: Desktop navigation links (`layoutId="activeNavPill"`) and mobile drawer navigation pills (`layoutId="activeMobileNavPill"`) with pure spring-physics shared layout gliding (`apps/web/src/components/Navbar.tsx:185-215`, `apps/web/src/components/Navbar.tsx:320-355`).
  - Accessibility & Reduced Motion: Full integration with `useReducedMotion()`, dynamically disabling offsets and setting `duration: 0` for users with system-level `prefers-reduced-motion: reduce`.
  - Stacking Context Isolation: Parent button `isolate` guarantees zero bleed-through and full legibility in both Light Mode and Dark Mode.
- **Topbar Navigation Fluid Animation & Color Scheme Architecture**:
  - `Smooth Glide Physics`: Spring transition configured to `{ stiffness: 350, damping: 32, mass: 0.8 }`, eliminating overshooting, shudder, and oscillation (`apps/web/src/components/Navbar.tsx:36-39`).
  - `AnimatePresence Conflict Elimination`: Removed `<AnimatePresence>` from wrapping the conditional `layoutId` pill in `Navbar.tsx:199-210`, allowing Framer Motion's shared layout projection to glide the pill continuously across tabs in 60fps without competing scale/opacity enter-exit animations.
  - `Layout Shift Prevention`: Removed 12px width-shifting pulsating dot from active nav links and aligned font weights to prevent horizontal reflow and micro-jitter during tab switches (`apps/web/src/components/Navbar.tsx:190-212`, `apps/web/src/components/Navbar.tsx:320-352`).
  - `Scroll-Spy Flight Lock`: Extended `isManualNavRef` duration to 1200ms in `handleNavClick` (`apps/web/src/components/Navbar.tsx:49-59`), guaranteeing that smooth anchor scrolling across the entire 3500px page height never triggers premature scroll-spy overrides.
  - `Active Color Scheme Dual-Mode Engine`:
    - Light Mode: Crisp, elevated pure white pill (`bg-white`) with high-contrast text (`text-slate-900 font-semibold`), subtle border (`border-slate-200/90`), and elevation drop shadow (`shadow-sm`), mirroring native macOS/Linear segmented controls.
    - Dark Mode: Fixed CSS background bleed-through by explicitly setting `dark:bg-[#0c1222]` behind `dark:bg-gradient-to-r dark:from-cyan-500/25 dark:via-blue-600/30 dark:to-indigo-600/25`, glowing cyan rim (`dark:border-cyan-400/50`), and ambient cyan bloom (`dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]`) with razor-sharp cyan-white text (`dark:text-cyan-100 font-semibold`), completely removing visual collision with the "Connect ↗" gradient CTA button.
    - Consistency across app: Added `dark:bg-[#0c1222]` to `Projects.tsx:111` and `Skills.tsx:191` to eliminate pastel white bleed-through across all segmented controls.
- **Page-Wide Animation & Ambient Background System**:
  - `AnimatedBackground` (`apps/web/src/components/AnimatedBackground.tsx`): Luminous ambient background featuring 4 organic looping gradient orbs (cyan, blue, indigo, purple) with GPU transform offload (`transform-gpu will-change-transform`), subtle cyber scanline sweep beam, and 6 pulsing telemetry beacon coordinates with pre-hydration static fallback.
  - `Layout Integration` (`apps/web/src/app/layout.tsx:77-80`): Embedded `<AnimatedBackground />` globally behind z-10 page contents across all routes.
  - `Hero Entrance Orchestration` (`apps/web/src/components/Hero.tsx:73-91`): Staggered entrance animation (`staggerChildren: 0.08`), `whileHover={{ y: -2, scale: 1.02 }}` on primary CTA, `whileHover={{ scale: 1.05 }}` on persona selector pills, and badge micro-interactions.
  - `Projects Micro-Interactions` (`apps/web/src/components/Projects.tsx:160-260`): `whileHover={{ y: -3 }}` with glowing border on Flagship Bento Spotlight, `whileHover={{ y: -5 }}` on Bento project cards, and `whileHover`/`whileTap` on modal launch and GitHub triggers.
  - `Skills Interactive Directory` (`apps/web/src/components/Skills.tsx:240-310`): Smooth card reflow (`layout` prop), `whileHover={{ y: -4, scale: 1.015 }}` on competency cards, icon container subtle hover wobble, and hardware protocol badge micro-interactions.
  - `Experience & Academics Motion` (`apps/web/src/components/Experience.tsx:12-30, 71-78`): Viewport-triggered entrance (`whileInView`, `viewport={{ once: true }}`), staggered card emergence, `whileHover={{ y: -4, scale: 1.01 }}` on enterprise and academic cards, and checkmark bullet offsets.
  - `Observability HUD Simulation` (`apps/web/src/components/ObservabilityHUD.tsx:375-720`): Interactive card hover states on 4-stage pipeline topology and enterprise storage fabric nodes, simulation button tap responses (`EMIT_TRAP_PACKET`, `TEST_SAN_ALERT`), and real-time streaming telemetry updates.
  - `Contact Transmission Buffer` (`apps/web/src/components/ContactSection.tsx:15-35, 120-180`): Viewport entrance orchestration, `whileHover={{ y: -4 }}` on direct communication channels, `whileTap` on copy buttons, and `<AnimatePresence>` for transmission status alert transitions.
  - `Footer Interactive Elevation` (`apps/web/src/components/Footer.tsx:50-65`): `whileHover={{ y: -3, scale: 1.05 }}` and `whileTap={{ scale: 0.95 }}` on Back-to-Top button.
  - `Terminal HUD Modal Orchestration` (`apps/web/src/components/TerminalHUD.tsx:415-460, 500-512`): Wrapped in `<AnimatePresence>` with backdrop fade (`opacity: 0 -> 1`), spring modal entrance (`scale: 0.95, y: 14 -> scale: 1, y: 0`) with stiffness 420 and damping 30, and verified dismissals via close button, Escape key, and backdrop click.
  - `GPU Hardware Compositing Offload`: Replaced layout-triggering animation properties (`top` on `AnimatedBackground.tsx` scanline and `left` on `ObservabilityHUD.tsx` telemetry stream beam) with GPU-accelerated transforms (`transform: translateY(...)` and `transform: translateX(...)`) with `transform-gpu will-change-transform`, guaranteeing 60fps execution with zero browser layout recalculations.
  - `Navbar CTA Motion` (`apps/web/src/components/Navbar.tsx:265-275`): `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.97 }}` on Connect CTA button.
  - `Accessibility & Reduced Motion`: All animations guarded with `useReducedMotion()`, setting zero offset and `duration: 0` when `prefers-reduced-motion: reduce` is active.
- **Three.js 3D Animation & Telemetry Systems**:
  - `ThreeBackground` (`apps/web/src/components/ThreeBackground.tsx`): GPU-accelerated ambient 3D particle constellation with dynamic proximity links rendered via `THREE.LineSegments` with opacity inversely proportional to distance, smooth mouse velocity damping tilt for global 3D depth parallax, and automated Dark/Light color adaptation.
  - `HeroTelemetryCanvas` (`apps/web/src/components/HeroTelemetryCanvas.tsx`): Interactive 3D Enterprise SAN Storage & Telemetry Fabric stage featured in Hero and Architecture Lab:
    - Central Telemetry Hub: Glowing pulsing core sphere, rotating wireframe icosahedron, and counter-rotating equatorial gimbal rings.
    - 6 Orbiting Enterprise Fabric Nodes: Brocade DCX-8510 SAN Director (Cyan), NetApp AFF-A800 (Sky Blue), Dell PowerMax 8000 (Royal Blue), Hitachi VSP 5600 (Purple), AsyncIO Trap Daemon (Amber), and InfluxDB Shard Cluster (Emerald).
    - Fiber-Optic 3D Splines & Packets: `THREE.CatmullRomCurve3` conduits with continuous flowing photon packets traveling toward core at speeds proportional to live telemetry stream (12k/s).
    - Interactive 3D Controls: 360° drag rotation with pointer events, raycaster node hover illumination with real-time HUD telemetry tooltip, 3 topology view presets (`Orbit`, `Mesh`, `Wave`), `[⚡ INJECT PACKET]` data burst trigger, auto-rotate toggle, and node quick selector bar.
    - Architecture Lab 3D Mode: Integrated as third perspective tab (`3D SAN Topology`) in `ObservabilityHUD.tsx`.
    - Performance & Lifecycle: Pauses rendering via `IntersectionObserver` when scrolled out of view, clean disposal of geometries, materials, and WebGL renderer on unmount.
- Netlify deployment config in `netlify.toml` with `@netlify/plugin-nextjs`.
- Git repository initialized.

## Verification

Toolchain and application verified on this host:

- `node --version` -> `v25.8.0`
- `bun --version` -> `1.3.14`
- `git --version` -> `git version 2.53.0.windows.1`
- `npm view next version` -> `16.3.4`
- `npm view turbo version` -> `2.10.12`
- `bun run check-types --force` -> passed (0 errors across all 3 packages in 2.6s)
- `bun run build --force` -> passed (0 errors, 7/7 routes compiled in 8.0s)
- `Invoke-RestMethod http://localhost:3000/api/v1/health` -> HTTP 200 `{ status: "healthy" }`
- `Invoke-RestMethod http://localhost:3000/api/v1/projects` -> HTTP 200 (5 projects)
- `Invoke-RestMethod http://localhost:3000/api/v1/telemetry` -> HTTP 200 (live metrics)
- `POST http://localhost:3000/api/v1/contact` -> HTTP 201 (valid), HTTP 400 (invalid)
- DOM section ordering probe: `[ "projects", "skills", "experience", "hud", "contact" ]` verified (`hud` rendered after `experience`).
- Topbar scroll spy probe: Verified deterministic active section tracking across all 5 sections (`projects`, `skills`, `experience`, `hud`, `contact`) and top Hero state clearance via CDP.
- Interactive cursor probe: All buttons, mode toggles, pipeline cards, and fabric node selectors verified with computed `cursor: pointer`.
- Projects header single-line layout probe: Verified `Featured Systems` title and category segmented tabs (`All`, `Observability`, `AI & RAG`, `Full-Stack`) align on the exact same horizontal row (`sameRow: true`) across 768px, 1024px, 1280px, and 1440px viewports, with smooth horizontal scrolling on mobile.
- Dual-Theme CDP Probe (`verify-fixes.mjs`):
  - Pre-hydration script: Verified `hasDark: true`, `hasSystem: false`, `colorScheme: dark` on system resolution; `containsDarkOrLight: true` on page reload.
  - Observability HUD sparkline: Verified all 10 bars rendered with non-zero heights (40.1px to 73.0px) in both dark and light modes.
  - Terminal HUD CLI: Verified `theme system` execution in browser CDP, logging `[SYSTEM] UI Theme synchronized with: OS SYSTEM PREFERENCE` and persisting `portfolio_theme = "system"`.
  - Skills single-line tabs: Verified all 5 tab buttons align on the exact same row (`allSameRow: true`).
  - Architecture modal viewport check: Verified `closeButtonVisible: true`, `rectTop: 805px`, `rectBottom: 837px` within `viewportHeight: 900px`.
- Framer Motion Tab System CDP Probe (`verify-improved-tabs.mjs`):
  - Light mode contrast probe: `btnIsolation: "isolate"`, `indZIndex: "0"`, `textColor: "rgb(255, 255, 255)"`, `indBg: "linear-gradient(...)"`.
  - HUD pipeline stages: All 4 stages verified with `hasSlidingPill: true` and `inspectorUpdated: true`.
  - HUD fabric nodes: All nodes verified with `hasSlidingIndicator: true` and `inspectionDetailUpdated: true`.
  - Rapid tab click spamming: Settle verified with 100% cards rendered and visible.
  - Reduced motion emulation: Instant tab switching with `duration: 0` verified under `prefers-reduced-motion: reduce`.
- Topbar Smooth Animation & Dual-Mode CDP Probe (`verify-topbar-smooth-animation.mjs`, `capture-topbar-fixed.mjs`):
  - Continuous translation: 12-frame sampled transition from Projects (`x: 338.06px`) to Skills (`x: 413.25px`) to Architecture Lab (`x: 563.43px`) with `smoothGlideVerified: true` (continuous monotonic translation, zero teleporting, zero opacity popping).
  - Scroll-spy flight locking: Simulated scroll during manual anchor navigation confirmed `activeAfterScroll: "Architecture Lab"` preserved without intermediate scroll-spy flickering.
  - Dark mode color scheme: Computed style verified `backgroundColor: "rgb(12, 18, 34)"`, `textColor: "lab(95.3146 -13.8285 -6.84733)"` (cyan-100), `boxShadow: "... rgba(6, 182, 212, 0.3) 0px 0px 15px 0px"`.
  - Light mode color scheme: Elevated white capsule `bg-white text-slate-900 border-slate-200/90 shadow-sm`.
  - Mobile drawer: Matching active capsule and click handlers verified on 390px mobile viewport.
- Page-Wide Animation & Background CDP Probe (`verify-page-animations.mjs`, `verify-terminal-and-transforms.mjs`, `debug-close.mjs`):
  - Ambient background: Verified 4 looping blur orbs, cyber scanline sweep beam (`matrix(1, 0, 0, 1, 0, ...)`, 0px top, GPU composited), and 8 pulsing telemetry beacons rendered and cycling.
  - Telemetry Stream Indicator: Verified GPU-composited translation (`matrix(1, 0, 0, 1, ..., 0)`, 0px left) replacing layout reflows.
  - Terminal HUD: Verified `<AnimatePresence>` modal spring entrance, input focus, dark/light theme switching, and smooth dismissal across all 3 close paths (close button `hasCloseBtn: false`, Escape key `hasTerminalTextAfterEscape: false`, backdrop click `hasTerminalTextAfterBackdrop: false`).
  - Visual artifacts: 12 screenshots captured across Dark and Light modes (`anim_01_dark_hero.png` through `anim_10_light_contact.png`, `verified_terminal_dark.png`, `verified_terminal_light.png`) in `ai-workspace/scratch/`.
  - Reduced motion verification: Verified `window.matchMedia('(prefers-reduced-motion: reduce)').matches === true` with animations suppressed to 0 duration.
- Three.js Interactive 3D Verification Probe (`verify-threejs-animations.mjs`, `capture-hero-full-3d.mjs`):
  - Canvas & WebGL probe: 2 active WebGL2 canvases probed (`drawingBufferWidth: 1400/1214`, `gl.getError() === 0`, Direct3D11 hardware compositing verified).
  - 3D Topology Controls: `Orbit`, `Mesh`, and `Wave` mode switching verified (`meshActive: true, waveActive: true, orbitActive: true`).
  - Packet Surge: `[⚡ INJECT PACKET]` trigger verified (`INJECT PACKET` -> `INJECTING...`).
  - Raycaster & SAN Node Selection: Tested all 6 enterprise nodes (`Brocade DCX-8510`, `NetApp AFF-A800`, `Dell PowerMax 8000`, `Hitachi VSP 5600`, `AsyncIO Trap Daemon`, `InfluxDB Cluster`) with dynamic HUD tooltips and throughput verified.
  - 3D Pointer Drag: Verified 360° mouse drag rotation (`success: true`).
  - Architecture Lab 3D View: Verified `3D SAN Topology` tab switch in `ObservabilityHUD.tsx` (`hasTopology3dBtn: true, hudCanvasesCount: 1, isBtnActive: true`).
  - Theme Adaptation: Verified materials and canvas rendering across Dark Mode and Light Mode (`three_hero_dark.png`, `three_hero_light.png`, `three_hud_dark.png`, `three_hud_light.png`).
  - Mobile Responsiveness: Verified on 375x812 viewport with zero horizontal scroll overflow (`hasOverflow: false`, `windowWidth: 375, scrollWidth: 375`).
- Contact Transmission Gateway & UI Verification Probe (`test-contact-api.mjs`, `verify-contact-ui-cdp.mjs`, `test-react-form.mjs`):
  - Gateway Status Endpoint: `GET /api/v1/contact` verified returning `{ status: "operational", bufferSize: N, rateLimitWindowMinutes: 10 }`.
  - Transmission Dispatch: Verified HTTP 201 Created on valid submission with unique ID (`msg_<timestamp>_<hash>`) and message buffering.
  - Multi-tier Fallback: Verified graceful degradation when external keys omitted, logging to in-memory FIFO buffer without uncaught exceptions.
  - Honeypot Anti-Spam Trap: Verified automated bot submissions with filled `hp_company_field` are intercepted, returning synthetic HTTP 201 (`msg_bot_<timestamp>`) while null-routing the payload without consuming human rate limit quotas or external API credits.
  - Token-Bucket Rate Limiting: Verified sliding-window throttling returning HTTP 429 Too Many Requests with descriptive error and `Retry-After` header when limit reached.
  - Client Form Hotkeys: Verified `Ctrl + Enter` / `Cmd + Enter` shortcut on textarea and inputs triggers submission immediately.
  - Preset Subject Pills: Verified clicking preset pills (`⚡ Enterprise SRE`, `🚀 Full-Stack`, `🛠️ Distributed Systems`) automatically populates the subject input and clears field errors.
  - Real-Time Character Counter: Verified dynamic calculation (`0 / 2000 chars`) with warning thresholds.
  - Success State & Countdown Timer: Verified display of emerald success banner (`Message transmitted successfully to telemetry buffer...`), submit button transition to `TRANSMITTED ✓ (<N>s)`, and automatic button restoration after 5 seconds.
  - Terminal HUD Integration: Verified `contact status` command outputs live gateway health and encryption status, and `contact` command outputs verified direct channels with interactive `#contact` link.
  - Dual-Theme Visuals: Verified form layout, inputs, and button states in both Dark Mode (`verified_form_success_countdown.png`) and Light Mode (`verified_contact_light_mode.png`).

## Open questions

All core architectural decisions resolved during interview:
1. **Design Theme**: Blue, Indigo & Purple Tint Minimalist Tech (canvas `#060813`, indigo/purple ambient glow, refined developer topbar, zero vibe-coded sci-fi noise).
2. **Backend**: Next.js 16 App Router Route Handlers (`src/app/api/v1/...`).
3. **Database**: MongoDB Atlas with resilient mock/seed fallback.
4. **Deployment**: Netlify (`@netlify/plugin-nextjs`).
