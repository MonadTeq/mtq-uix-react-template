# MTQ UiX — Development Guide

A practical guide for developers working on the **MTQ UiX** admin panel. Covers setup,
day-to-day workflows, and the conventions you must follow to keep the codebase maintainable.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Daily Workflow](#daily-workflow)
- [Where to Put Code (FSD)](#where-to-put-code-fsd)
- [Adding a New Page](#adding-a-new-page)
- [Adding a New Component](#adding-a-new-component)
- [State Management](#state-management)
- [Styling & Design System](#styling--design-system)
- [Storybook](#storybook)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Prerequisites

- **Node.js `20.19+`** (or `22.12+`) — required by Vite 8.
- **npm** (bundled with Node).

```bash
node --version
npm --version
```

## Getting Started

```bash
npm install     # install dependencies
npm start       # dev server at http://localhost:3000
```

The dev server provides HMR for components and styles, and an error overlay.

### Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Vite dev server (`http://localhost:3000`) |
| `npm run build` | Production build → `build/` |
| `npm run serve` | Preview the production build |
| `npm run lint` | ESLint (TS, React, prettier, FSD boundaries, Storybook rules) |
| `npx tsc --noEmit` | Strict TypeScript check |
| `npm run storybook` | Storybook dev server (`http://localhost:6006`) |
| `npm run build-storybook` | Static Storybook build → `storybook-static/` |

---

## Project Structure

```
src/
├── app/          # entry, providers, router, global styles
├── pages/        # one component per route (composition only)
├── widgets/      # self-contained page blocks (layout, dashboard)
├── features/     # sidebar state, theme
├── entities/     # navigation, user (data + types + selectors)
├── shared/       # api client, config, utils, base UI helpers
└── vite-env.d.ts
packages/
└── design-system/   # @mtq/design-system (tokens, assets, primitives)
```

Layer dependency direction is **one-way and enforced**:

```
app → pages → widgets → features → entities → shared → design-system
```

Import aliases:

| Alias | Path |
| --- | --- |
| `@/` | `src/` |
| `@mtq/design-system` | `packages/design-system/src` |

---

## Daily Workflow

1. `npm start`
2. Edit source in `src/` (never edit `build/` or `storybook-static/` — they are generated).
3. Watch HMR apply changes.
4. Before committing: `npm run lint` and `npx tsc --noEmit`.
5. Test in light and dark mode and at a couple of breakpoints.
6. Commit with a conventional-commit message (see [Best Practices](#best-practices)).

---

## Where to Put Code (FSD)

Ask: **which layer and slice does this belong to?**

| You want to… | Put it in |
| --- | --- |
| Change routing/providers/global styles | `app/` |
| Build a route screen | `pages/` |
| Build a reusable page block (header, sidebar, dashboard card) | `widgets/` |
| Add user-facing state/action (e.g. a toggle, a filter) | `features/<feature>/model/` |
| Model a domain object (User, Product, Navigation) | `entities/<entity>/` |
| Add a generic util/API client/base UI helper | `shared/` |
| Add or change a UI primitive / token / brand asset | `packages/design-system/` |

Rules:

- **Never import upward** (e.g. `entities` → `widgets`). The boundary linter fails the build.
- **Never deep-import** a slice; use its public `index.ts`.
- **No business logic in `pages/`** — pages only compose widgets and features.

---

## Adding a New Page

### 1. Create the page component

```tsx
// src/pages/products/ProductsPage.tsx
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@mtq/design-system'

const ProductsPage = () => (
  <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Products</CCardHeader>
        <CCardBody>{/* content */}</CCardBody>
      </CCard>
    </CCol>
  </CRow>
)

export default ProductsPage
```

```ts
// src/pages/products/index.ts
export { default } from './ProductsPage'
```

### 2. Register the route

Add a lazy import and a route in `src/app/router/AppRoutes.tsx`:

```tsx
const ProductsPage = lazy(() => import('@/pages/products'))

// inside the <DefaultLayout> route group:
<Route path="products" element={<ProductsPage />} />
```

### 3. Add navigation

Add an entry to `src/entities/navigation/navigation.tsx` (this drives the sidebar **and**
breadcrumbs):

```tsx
{
  type: 'item',
  name: 'Products',
  to: '/products',
  icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
}
```

### 4. Add a Storybook story (recommended for new UI)

```tsx
// src/pages/products/ProductsPage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import ProductsPage from './ProductsPage'

const meta = { title: 'Pages/Products', component: ProductsPage } satisfies Meta<typeof ProductsPage>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
```

---

## Adding a New Component

One component per file, named after the file, with types and (for UI) a story:

```tsx
// src/shared/ui/StatusBadge.tsx
import { CBadge } from '@mtq/design-system'

type StatusBadgeProps = {
  status: 'active' | 'inactive'
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <CBadge color={status === 'active' ? 'success' : 'secondary'}>{status}</CBadge>
)

export default StatusBadge
```

TypeScript rules:

- `strict` mode; **no `any`** (use `unknown` + narrowing).
- `type` for unions/intersections, `interface` for extendable shapes.
- `import type { … }` for type-only imports (`verbatimModuleSyntax` is on).
- Discriminated unions for state machines (`{ status: 'idle' | 'loading' | 'error' | 'success' }`).
- No enums — use `as const` objects.

---

## State Management

### Sidebar (global UI state)

Sidebar visibility is provided by a typed context in `features/sidebar`:

```tsx
import { useSidebar } from '@/features/sidebar'

const { state, toggleVisible, toggleUnfoldable } = useSidebar()
```

### Theme

```tsx
import { useTheme } from '@/features/theme'

const { colorMode, setColorMode } = useTheme()
```

### Local state

Prefer `useState`/`useReducer` for UI-only concerns. **Do not** introduce a global store for
form or page state. For server data, use `shared/api` (the `request()` client) — a
TanStack Query layer is the intended future home for server state.

---

## Styling & Design System

- Import all primitives/icons/charts from `@mtq/design-system` — **never** `@coreui/*`.
- Use CoreUI utility classes for layout (`mb-4`, `d-flex`, `gap-3`).
- Use design tokens for every visual value:

```tsx
import { brandColorTokens } from '@mtq/design-system'
import { cssVar, cn } from '@/shared'

<div style={{ backgroundColor: cssVar('--cui-body-bg') }} />
<div style={{ '--cui-card-cap-bg': brandColorTokens.facebook } as CSSProperties} />
<div className={cn('card', { 'card--active': isActive })} />
```

- No hardcoded colors/fonts/radii/spacing.
- New brand colors: add to `packages/design-system/src/styles/brand.css` + `tokens.ts`.

---

## Storybook

Run `npm run storybook`. Stories are co-located:

- `packages/design-system/src/stories/` — primitives, brand assets, tokens
- `src/shared/ui/*.stories.tsx` — shared helpers
- `src/widgets/**/*.stories.tsx` — widgets

Every new primitive or shared UI component ships with a story and passes the
`@storybook/addon-a11y` check.

---

## Code Quality

```bash
npm run lint        # ESLint (TypeScript, React hooks, prettier, boundaries, Storybook)
npx tsc --noEmit    # strict type check
npm run build       # production build (also run before merging)
```

The CI workflow (`.github/workflows/npm.yml`) runs `npm ci` → lint → typecheck → build on
Node 20 and 22.

### Code style

- Prettier is the source of truth (no semicolons, single quotes, 2-space indent).
- Components: PascalCase (`StatusBadge.tsx`); utilities: camelCase; styles: kebab-case.
- Functional components only.

---

## Testing

The project does not yet have a unit-test runner. Manual checklist before committing:

- [ ] Light + dark + auto theme
- [ ] Mobile / tablet / desktop widths
- [ ] Console free of errors
- [ ] Navigation + breadcrumbs correct
- [ ] Keyboard reachability + focus visibility (a11y)

Storybook's a11y addon (`test: 'todo'`) surfaces violations in the Storybook UI.

---

## Build & Deployment

```bash
npm run build     # → build/
npm run serve     # preview build/
```

The output is static and hash-routed, so it deploys to any static host. See
`ARCHITECTURE.md` → Deployment.

Environment variables use the `VITE_` prefix (e.g. `VITE_API_URL`) and are read via
`import.meta.env`.

---

## Troubleshooting

| Problem | Solution |
| --- | --- |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill` (or change `server.port` in `vite.config.ts`) |
| Module not found / stale deps | `rm -rf node_modules package-lock.json && npm install` |
| Boundary lint error | Move the code to the correct layer, or re-export via the slice `index.ts` |
| `base: './'` breaks Storybook | Already handled in `.storybook/main.ts` via `viteFinal` |
| Build memory error | `NODE_OPTIONS="--max-old-space-size=4096" npm run build` |

---

## Best Practices

- **One responsibility per component.**
- **Respect the layer boundaries** — when in doubt, lift logic up to `shared`/`entities`.
- **Keep changes small and reviewable.**
- **Public API**: if a slice's surface changes, update its `index.ts`.
- **Accessibility first**: semantic HTML, visible focus, `aria-label` on icon buttons.

Commit messages follow Conventional Commits:

```
feat: add products page
fix: resolve sidebar toggle on mobile
refactor: extract brand tokens into design-system
docs: update architecture guide
chore: bump dependencies
```

---

For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md). For a designer-facing
overview, see `mtq-uix-designer-summary.md` in the project root (one directory above this
repository).
