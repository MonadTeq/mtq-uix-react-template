# MTQ UiX — Architecture

This document describes the architecture, design patterns, and technical decisions behind the
**MTQ UiX** admin panel. The codebase is a strict-TypeScript, Feature-Sliced Design (FSD)
React application built on top of the CoreUI component library.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architectural Pattern (Feature-Sliced Design)](#architectural-pattern-feature-sliced-design)
- [Layer Responsibilities](#layer-responsibilities)
- [Directory Structure](#directory-structure)
- [Design System](#design-system)
- [Routing](#routing)
- [State Management](#state-management)
- [Styling](#styling)
- [Build System](#build-system)
- [Performance](#performance)
- [Code Quality & Boundaries](#code-quality--boundaries)
- [Browser Support](#browser-support)
- [Deployment](#deployment)

---

## Overview

MTQ UiX is a single-page admin dashboard refactored from the CoreUI Free React Admin Template.
The goal of the refactor was to impose **long-term maintainability** and **architectural
boundaries** on an otherwise conventional template codebase:

- Strict **TypeScript** everywhere (no `any`, no runtime prop validation).
- **Feature-Sliced Design** with enforced, one-directional layer dependencies.
- A **separate design-system package** consumed as `@mtq/design-system`.
- **Token-driven styling** — no hardcoded colors, fonts, radii, or spacing in application code.
- Minimal global state via React **context**, not a global Redux store.
- **Storybook** for component documentation and accessibility review.

## Technology Stack

| Area | Technology |
| --- | --- |
| Language | TypeScript 6 (strict), ES2022 |
| UI | React 19 + React DOM 19 |
| Routing | React Router 7 (hash-based) |
| Component library | CoreUI 5 (`@coreui/react`) wrapped by `@mtq/design-system` |
| Icons | `@coreui/icons` + `@coreui/icons-react` |
| Charts | Chart.js 4 via `@coreui/react-chartjs` |
| Build tool | Vite 8 |
| Styling | Sass/SCSS + CoreUI CSS variables (design tokens) |
| State | React Context + hooks (no Redux) |
| Documentation | Storybook 10 |
| Linting | ESLint 9 + Prettier + `eslint-plugin-boundaries` |

Exact versions are pinned in `package.json`.

---

## Architectural Pattern (Feature-Sliced Design)

The application is split into layers. **Imports may only flow downward**:

```
app → pages → widgets → features → entities → shared
```

```
┌─────────────────────────────────────────────────────────────┐
│                          app                                │
│   entry, providers, router, global styles, error boundaries │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         ┌─────────┐   ┌──────────┐   ┌───────────┐
         │  pages  │   │ widgets  │   │ features  │
         └────┬────┘   └────┬─────┘   └─────┬─────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                     ┌───────────────┐
                     │   entities    │
                     └───────┬───────┘
                             ▼
                     ┌───────────────┐
                     │    shared     │
                     └───────┬───────┘
                             ▼
              ┌──────────────────────────────┐
              │  @mtq/design-system      │
              │  (CoreUI primitives, tokens, │
              │   icons, brand assets)       │
              └──────────────────────────────┘
```

The dependency direction is **enforced at lint time** by `eslint-plugin-boundaries`
(see `.storybook`/`eslint.config.mjs`). An upward or cross-slice import fails the build.

## Layer Responsibilities

| Layer | Responsibility | Examples |
| --- | --- | --- |
| `app` | Entry point, providers, router, global styles only. No business logic. | `src/app/App.tsx`, `src/app/router/AppRoutes.tsx` |
| `pages` | One component per route. Composes widgets/features; contains no business logic. | `src/pages/dashboard/DashboardPage.tsx` |
| `widgets` | Self-contained page blocks. | `src/widgets/layout/AppSidebar.tsx`, `src/widgets/dashboard/WidgetsDropdown.tsx` |
| `features` | User-facing state and actions (`ui/`, `model/`, `api/`). | `src/features/sidebar/`, `src/features/theme/` |
| `entities` | Domain data, types, selectors. Pure; no side-effectful actions. | `src/entities/navigation/`, `src/entities/user/` |
| `shared` | Infrastructure: API client, config, utils, base UI helpers. | `src/shared/api/`, `src/shared/lib/`, `src/shared/ui/` |

### Public API rule

Every slice exposes a single `index.ts`. Consumers import from the slice root only — deep
imports such as `@/features/auth/ui/LoginForm` are forbidden:

```ts
// features/sidebar/index.ts
export { SidebarProvider, useSidebar } from './model/sidebar-context'
export type { SidebarState } from './model/types'
```

## Directory Structure

```
mtq-admin-panel/
├── .storybook/                     # Storybook config (main.ts, preview.tsx)
├── packages/
│   └── design-system/              # @mtq/design-system
│       └── src/
│           ├── index.ts            # public API (re-exports CoreUI + icons + tokens)
│           ├── tokens.ts           # brand color token map
│           ├── types.ts
│           ├── assets/             # brand logos, custom icons, images
│           └── styles/brand.css    # brand color CSS variables
├── src/
│   ├── app/
│   │   ├── index.tsx               # entry (createRoot)
│   │   ├── App.tsx                 # providers + router + theme bootstrap
│   │   ├── providers/              # AppProviders (sidebar context)
│   │   ├── router/                 # AppRoutes (nested route tree)
│   │   └── styles/                 # global SCSS + examples + vendor overrides
│   ├── pages/                      # 48 route components (FSD pages layer)
│   ├── widgets/
│   │   ├── layout/                 # DefaultLayout, AppHeader, AppSidebar, …
│   │   └── dashboard/              # WidgetsDropdown, WidgetsBrand, MainChart, …
│   ├── features/
│   │   ├── sidebar/                # sidebar visibility state (context)
│   │   └── theme/                  # typed useColorModes wrapper
│   ├── entities/
│   │   ├── navigation/             # nav config, types, path→name selector
│   │   └── user/                   # User type + UserAvatar
│   ├── shared/
│   │   ├── api/                    # fetch client + error types
│   │   ├── config/                 # app constants, route paths, links
│   │   ├── lib/                    # cn (classnames), cssVar (token lookup)
│   │   └── ui/                     # DocsExample, DocsLink, PageSpinner, …
│   └── vite-env.d.ts               # asset module declarations
├── index.html                      # entry (loads /src/app/index.tsx)
├── vite.config.ts                  # Vite config + path aliases
├── tsconfig.json                   # strict TypeScript config + paths
└── eslint.config.mjs               # ESLint + boundaries + Storybook rules
```

---

## Design System

The design system lives in `packages/design-system` and is consumed everywhere as
**`@mtq/design-system`**. Application code **never** imports `@coreui/*` directly and
**never** re-implements a primitive that already exists.

- **Primitives/icons/charts** are re-exported from CoreUI (`CButton`, `CIcon`, `CChartLine`, …).
- **Brand assets** (logo, sygnet, social icons, images) live in `packages/design-system/src/assets`.
- **Brand colors** are defined as CSS variables in `styles/brand.css`
  (`--color-brand-facebook`, `--color-brand-twitter`, …) and exposed as the typed
  `brandColorTokens` map for use in code.

### Tokens

All visual values resolve to CSS variables:

| Kind | Examples |
| --- | --- |
| CoreUI semantic tokens | `--cui-primary`, `--cui-body-bg`, `--cui-border-color-translucent`, `--cui-info-rgb` |
| Brand tokens | `--color-brand-facebook`, `--color-brand-twitter`, `--color-brand-linkedin`, `--color-brand-youtube` |

Theme-dependent chart colors are read at runtime with the `cssVar()` helper from `@/shared`
so they follow light/dark/auto color modes.

---

## Routing

Routing uses **React Router 7** with `HashRouter` (static-host friendly). The route tree is
defined in `src/app/router/AppRoutes.tsx` and every route is lazy-loaded.

```
<HashRouter>
  <Routes>
    {/* public routes */}
    <Route path="/authentication/login" element={<LoginPage />} />
    …
    <Route path="/error-pages/404" element={<Page404Page />} />

    {/* protected routes, wrapped in the layout */}
    <Route element={<DefaultLayout />}>
      <Route path="*" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="components/accordion" element={<AccordionPage />} />
      …
    </Route>
  </Routes>
</HashRouter>
```

`DefaultLayout` renders the app chrome (sidebar, header, footer) and an `<Outlet />` for the
nested page content.

### Navigation

The sidebar menu is **data**, not JSX. It is defined as a discriminated union in
`src/entities/navigation/navigation.tsx` and rendered by the `AppSidebarNav` widget:

```ts
type NavEntry = NavItem | NavGroup | NavTitle

// { type: 'item', name: 'Dashboard', to: '/dashboard', icon: <CIcon … /> }
// { type: 'group', name: 'Components', icon: …, items: [ … ] }
// { type: 'title', name: 'Extras' }
```

Breadcrumbs are derived from the same navigation source of truth
(`entities/navigation/lib/path-map.ts`), so routes, sidebar, and breadcrumbs cannot drift.

---

## State Management

The template's original Redux store was removed. State is kept minimal and co-located:

| Concern | Mechanism | Location |
| --- | --- | --- |
| Sidebar visibility/unfoldable | React Context + `useReducer` | `features/sidebar` |
| Color mode (light/dark/auto) | CoreUI `useColorModes` wrapped in a typed `useTheme` | `features/theme` |
| Local UI state | `useState` / `useReducer` | within components |
| Server state | `fetch`-based client in `shared/api` | future TanStack Query integration |

There is **no global store folder** and no duplicated server state. The `SidebarProvider` is
mounted once in `app/providers/AppProviders.tsx`.

---

## Styling

- Global styles are token-driven SCSS in `src/app/styles/` (`style.scss`, `examples.scss`).
- CoreUI is imported once as SCSS with `@use "@coreui/coreui/scss/coreui"`.
- Layout is primarily composed with CoreUI/Bootstrap utility classes
  (`mb-4`, `d-flex`, `gap-3`, `text-body-secondary`, …).
- Conditional classes use the `cn()` helper from `@/shared` (wraps `classnames`).
- Custom-property styles are typed: `style={{ '--cui-card-cap-bg': brandColorTokens.facebook } as CSSProperties}`.

**No hardcoded hex/rgb values** are allowed in application code — brand colors are tokens,
CoreUI colors are `var(--cui-*)`.

---

## Build System

Vite 8 with two path aliases (defined in `vite.config.ts` and mirrored in `tsconfig.json`):

| Alias | Resolves to |
| --- | --- |
| `@/` | `src/` |
| `@mtq/design-system` | `packages/design-system/src` |

Build outputs:

- `npm run build` → `build/` (base `./`, hash-cached, code-split).
- `npm run build-storybook` → `storybook-static/`.

## Performance

- All 48 pages are `React.lazy`-loaded (one chunk per route).
- Layout widgets (`AppSidebar`, `AppFooter`, breadcrumb) are wrapped in `React.memo`.
- Chart data is stable across re-renders; color-mode changes are applied imperatively to
  avoid remounting charts.

## Code Quality & Boundaries

Enforced in CI (`.github/workflows/npm.yml`) and locally:

```bash
npm run lint        # ESLint: TypeScript, React hooks, prettier, FSD boundaries, Storybook
npx tsc --noEmit    # strict type check
```

The FSD boundary rules allow downward imports only:

```
app      → app, pages, widgets, features, entities, shared, design-system
pages    → pages, widgets, features, entities, shared, design-system
widgets  → widgets, features, entities, shared, design-system
features → features, entities, shared, design-system
entities → entities, shared, design-system
shared   → shared, design-system
```

## Browser Support

Targets are defined in `.browserslistrc` (`> 0.5%`, `last 2 versions`, `Firefox ESR`,
`not dead`, `not IE 11`). `core-js` provides ES6+ polyfills.

## Deployment

The app builds to fully static assets (`build/`). Because routing is hash-based, the output
works on any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront) with no
server-side rewrite rules.

```bash
npm run build     # emit build/
npm run serve     # preview build locally
```
