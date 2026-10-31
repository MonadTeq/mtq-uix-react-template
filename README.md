# MTQ UiX

Enterprise React admin dashboard, refactored from the
[CoreUI Free React Admin Template](https://github.com/coreui/coreui-free-react-admin-template)
into a **Feature-Sliced Design (FSD)** architecture with **strict TypeScript**, a
separate **design system package**, and a token-driven styling approach.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [How to use](#how-to-use)
- [How to build](#how-to-build)
- [Storybook](#storybook)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Code quality](#code-quality)
- [License](#license)

---

## Tech stack

- [React 19](https://react.dev/) + [TypeScript 6](https://www.typescriptlang.org/) (strict)
- [Vite 8](https://vite.dev/) (build tool)
- [React Router 7](https://reactrouter.com/) (hash-based routing)
- [CoreUI 5](https://coreui.io/react/) (UI component library, consumed as `@mtq/design-system`)
- [Chart.js](https://www.chartjs.org/) via `@coreui/react-chartjs`
- [Storybook 10](https://storybook.js.org/) (component documentation)
- [ESLint 9](https://eslint.org/) with `eslint-plugin-boundaries` (architectural boundaries)

---

## Prerequisites

- **Node.js `20.19+`** (or `22.12+`) — required by Vite 8.
- **npm** (bundled with Node).

Verify:

```bash
node --version
npm --version
```

---

## How to use

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm start
```

The app is served at <http://localhost:3000>. It uses hash-based routing, so
deep links look like `http://localhost:3000/#/dashboard`.

### 3. Lint & typecheck

```bash
npm run lint            # ESLint (prettier, TS, React, architectural boundaries)
npx tsc --noEmit        # strict TypeScript check
```

### Available scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm start`            | Start the Vite dev server (`http://localhost:3000`) |
| `npm run build`        | Production build into `build/`                      |
| `npm run serve`        | Preview the production build (`vite preview`)       |
| `npm run lint`         | Run ESLint                                          |
| `npx tsc --noEmit`     | Run the TypeScript type check                       |
| `npm run storybook`    | Start Storybook (`http://localhost:6006`)           |
| `npm run build-storybook` | Static Storybook build into `storybook-static/`  |

---

## How to build

### Production build

```bash
npm run build
```

The optimized, code-split bundle is emitted to `build/`. To preview it locally:

```bash
npm run serve
```

> The build uses `base: './'` so the output can be served from any static
> sub-path without additional configuration.

### Static Storybook build

```bash
npm run build-storybook
```

The static Storybook site is emitted to `storybook-static/`.

---

## Storybook

Storybook documents the design system and shared UI in isolation.

```bash
npm run storybook        # http://localhost:6006
```

Stories are co-located with the components they document:

- `packages/design-system/src/stories/` — primitives, brand assets, brand tokens
- `src/shared/ui/*.stories.tsx` — shared UI helpers
- `src/widgets/**/*.stories.tsx` — widgets

Any new primitive or shared UI component should ship with a Storybook story and
an accessibility review (the `@storybook/addon-a11y` addon is enabled).

---

## Project structure

Imports flow only downward through the FSD layers:

```
app → pages → widgets → features → entities → shared
```

```
├── .storybook/                  # Storybook configuration
├── packages/
│   └── design-system/           # @mtq/design-system (tokens, assets, primitives)
├── src/
│   ├── app/                     # entry, providers, router, global styles
│   ├── pages/                   # one component per route (composition only)
│   ├── widgets/                 # self-contained page blocks (layout, dashboard)
│   ├── features/                # sidebar state, theme
│   ├── entities/                # navigation, user (data + types + selectors)
│   ├── shared/                  # api client, config, utils, base UI helpers
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
└── tsconfig.json
```

Key rules:

- **No upward imports** — enforced by `eslint-plugin-boundaries`
  (e.g. `entities` may not import `widgets`, `shared` may not import anything above it).
- Every slice exposes a **public `index.ts`**; consumers import from the slice root,
  never deep-import internals.
- All visual values resolve to **design tokens** (`var(--cui-*)`, `var(--color-brand-*)`).
  No hardcoded colors, fonts, radii, or spacing.

---

## Design system

The design system lives in `packages/design-system` and is consumed everywhere as
**`@mtq/design-system`**. Application code never imports `@coreui/*` directly
and never re-implements a primitive that already exists.

- **Primitives/icons/charts** are re-exported from CoreUI.
- **Brand assets** (logo, sygnet, social icons, images) live in `packages/design-system/src/assets`.
- **Brand colors** are defined as CSS variables in
  `packages/design-system/src/styles/brand.css` and exposed as the typed
  `brandColorTokens` map.

For a designer-facing overview, see `mtq-uix-designer-summary.md` in the project root
(one directory above this repository).

## License

Released under the [MIT License](LICENSE). Based on the CoreUI Free React Admin
Template by [CoreUI](https://coreui.io/).
