# rathorevaibhav.com

Personal site of Vaibhav Rathore — software engineer at ColoredCow.

Built with Vite + React + TypeScript + Tailwind + shadcn/ui. The UI is organized as **swappable themes** (`src/themes/`), with all content in a single **content layer** (`src/content/`). The current theme is **Aurora** (light-first, with a 3D "Spotlight" hero and a playable Music page).

## Requirements
- **Node 20+** (an `.nvmrc` pins 20). Run `nvm use` before installing.

## Develop
```sh
nvm use
npm install
npm run dev      # http://localhost:8080
npm test         # Vitest
npm run build    # production build
```

## Structure
- `src/content/` — typed content (single source of truth)
- `src/themes/<id>/` — a theme's components + pages (Aurora is theme #1)
- `src/themes/registry.ts` / `resolver.ts` — theme selection (cookie/query/default)

Deployed on Vercel.
