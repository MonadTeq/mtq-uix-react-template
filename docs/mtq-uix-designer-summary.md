# MTQ Admin Panel — UI/UX Designer Summary

This document is a designer-facing overview of the refactored admin panel codebase. It explains where the design system lives, how tokens and components are used, and how to add or change UI without breaking architectural boundaries or brand consistency.

---

## 1. What changed (high level)

The CoreUI Free React Admin Template was refactored into an **enterprise Feature-Sliced Design (FSD)** architecture with a **TypeScript-strict** codebase and a **separate design-system package**. Nothing visual changed for the user — this was a structural/quality refactor. The app still looks and behaves the same, but is now maintainable, typed, and token-driven.

Layers (imports flow only downward):

```
app → pages → widgets → features → entities → shared
```

| Layer | Purpose | Example |
|---|---|---|
| `app` | Entry, router, providers, global styles | `src/app/App.tsx` |
| `pages` | One component per route; composition only, no business logic | `src/pages/dashboard/DashboardPage.tsx` |
| `widgets` | Self-contained page blocks | `src/widgets/layout/AppSidebar.tsx` |
| `features` | User-facing state/actions | `src/features/sidebar/`, `src/features/theme/` |
| `entities` | Domain data + types + selectors | `src/entities/navigation/`, `src/entities/user/` |
| `shared` | Infrastructure + base UI helpers | `src/shared/ui/`, `src/shared/lib/` |

---

## 2. The design system

The design system lives in **`packages/design-system/`** and is consumed everywhere as **`@mtq/design-system`**. App code **never** imports `@coreui/*` directly and **never** re-implements a primitive that already exists.

```
packages/design-system/
├── src/
│   ├── index.ts        # public API (re-exports CoreUI + icons + brand assets + tokens)
│   ├── tokens.ts       # brand color token names (source of truth for brand colors)
│   ├── types.ts
│   ├── assets/         # logos, brand icons, custom icons, images
│   │   ├── brand/      #   logo, sygnet, apple, google, chatgpt, linkedin-badge, twitter-x
│   │   ├── icons/      #   eye
│   │   └── images/     #   avatars, component illustrations
│   └── styles/
│       └── brand.css   # brand color CSS variables (:root)
└── package.json
```

### 2.1 Design tokens

All visual values resolve to **CSS variables** — never hardcoded hex/rgb in the app.

- **CoreUI semantic tokens** (`--cui-*`) come from `@coreui/coreui` and cover color, spacing, radius, typography, breakpoints, shadows, etc. Examples: `--cui-primary`, `--cui-body-bg`, `--cui-border-color-translucent`, `--cui-info-rgb`.
- **Brand tokens** (project-specific, added in `packages/design-system/src/styles/brand.css`):

| Token | Value | Usage |
|---|---|---|
| `--color-brand-facebook` | `#3b5998` | Facebook brand card |
| `--color-brand-twitter` | `#00aced` | Twitter brand card |
| `--color-brand-linkedin` | `#4875b4` | LinkedIn brand card |
| `--color-brand-youtube` | `#ff0132` | YouTube brand card |
| `--color-brand-google` | `#4285f4` | Google brand |
| `--color-brand-apple` | `#000000` | Apple brand |

In TypeScript these are referenced through the typed map `brandColorTokens` (exported from `@mtq/design-system`), e.g. `brandColorTokens.facebook` → `var(--color-brand-facebook)`.

> **Rule:** if a new brand color is needed, add it to `brand.css` + `tokens.ts` first, then reference the token. Do not paste a hex value into a component.

### 2.2 Using a primitive component

```tsx
import { CButton, CCard, CRow, CCol } from '@mtq/design-system'
import { CIcon } from '@mtq/design-system'
import { cilSave } from '@mtq/design-system'

<CButton color="primary" onClick={save}>
  <CIcon icon={cilSave} className="me-2" />
  Save
</CButton>
```

App-specific compositions (e.g. `UserAvatar` = `CAvatar` + user data) live in `entities/user/ui`, **not** in the design system.

---

## 3. Styling rules

1. **No hardcoded colors/fonts/radii/spacing** — always use tokens (`var(--cui-*)`, `var(--color-brand-*)`).
2. App-level styling is **token-driven SCSS/CSS Modules**; global styles live in `src/app/styles/`.
3. CoreUI utility classes (`mb-4`, `text-body-secondary`, `d-flex`, `gap-3`, …) are the primary layout mechanism — prefer them over new CSS.
4. `classNames`/`cn` (from `@/shared`) is used for conditional class composition.
5. Dynamic theme colors in charts/widgets are read at runtime with `cssVar('--cui-…')` (from `@/shared`) so they follow light/dark/auto.

---

## 4. Accessibility (a11y) requirements

Every UI change must ship accessible:

- Semantic HTML first; ARIA only to fill gaps.
- All interactive elements keyboard-reachable with a **visible focus state**.
- Icons used as buttons need `aria-label` (e.g. the header toggler has `aria-label="Toggle sidebar"` and `aria-expanded`).
- Images carry `alt`; avatars carry a `title`/label.
- Color contrast follows CoreUI's accessible palette; do not override tokens with low-contrast values.
- New components include an a11y note (keyboard, focus, contrast, labels) in the PR description.

---

## 5. Storybook

Storybook 10 is configured (`.storybook/`). It documents the design system and shared UI so designers can preview components in isolation.

Run it:

```bash
npm run storybook        # dev server
npm run build-storybook  # static build
```

Stories live alongside the components they document:

- `packages/design-system/src/stories/` — primitives, brand assets, tokens
- `src/shared/ui/*.stories.tsx` — shared UI helpers

**Adding a story:** create `<Component>.stories.tsx` next to the component and use the CSF3 format (`export default { component, title, tags }` + named story objects).

---

## 6. Quick file map for designers

| Want to… | Look here |
|---|---|
| Change global styles | `src/app/styles/style.scss` |
| Change brand colors | `packages/design-system/src/styles/brand.css` + `tokens.ts` |
| Change the sidebar/header/footer | `src/widgets/layout/` |
| Change a page | `src/pages/<feature>/<Name>Page.tsx` |
| Change navigation labels/order | `src/entities/navigation/navigation.tsx` |
| Add a reusable UI helper | `src/shared/ui/` |
| Add a new primitive | `packages/design-system/` (needs token check + Storybook story) |
| Dashboard widgets/charts | `src/widgets/dashboard/` |

---

## 7. Definition of Done for a UI change

- [ ] Uses existing design-system primitives (no re-implementation).
- [ ] No hardcoded visual values — all styling via tokens.
- [ ] Placed in the correct FSD layer (pages compose, widgets block, entities data).
- [ ] Storybook story added/updated.
- [ ] Keyboard, focus, contrast, and labels reviewed.
- [ ] Public `index.ts` updated if a slice's surface changed.
