# my-store-react

This is an e-commerce demo (React + TypeScript) scaffolded with Vite. It demonstrates a small storefront with localization, theming, a 3D hero scene, and common e-commerce features (products, cart, wishlist, checkout UI). The project focuses on a beautiful UI, fast developer experience, and a small, testable codebase.

---

## Highlights / Features

- React + TypeScript (Vite) with fast HMR
- Tailwind CSS for utility-first styling
- React Router for client-side routing
- react-i18next for localization (English + Arabic) with RTL support
- Context-based state: cart, wishlist, theme, language
- Framer Motion for polished animations
- react-three-fiber + drei for a 3D hero background (WebGL canvas)
- Accessible UI components and small design system in `src/components/ui`
- SEO-friendly `index.html` meta tags and an SVG favicon

## Tech stack / notable libraries

- Vite — dev server and build tooling
- React 18 + TypeScript
- Tailwind CSS — utility CSS framework
- react-router-dom — routing
- i18next + react-i18next — localization
- framer-motion — animations
- @react-three/fiber and @react-three/drei — 3D canvas and helpers
- lucide-react — icons
- sonner — toast notifications
- @tanstack/react-query — data fetching utilities (if used)

## Project structure (important files)

- `index.html` — app entry, SEO meta tags and favicon link
- `src/main.tsx` — React app bootstrap
- `src/App.tsx` — top-level routes
- `src/components/layout/Navbar.tsx` — header and navigation
- `src/components/layout/Layout.tsx` — app layout wrapper (contains Navbar and Footer)
- `src/components/home/HeroSection.tsx` — hero section with 3D background
- `src/components/3d/Hero3DScene.tsx` — react-three-fiber scene
- `src/pages/*` — page components (Index, Products, ProductDetail, Cart, Wishlist, Checkout)
- `src/contexts/*` — React Contexts (CartContext, WishlistContext, ThemeContext, LanguageContext)
- `src/lib/i18n.ts` — translations/resources
- `src/index.css` — Tailwind + custom CSS utilities

## Local development

Requirements: Node.js (16+ recommended) and npm/yarn/pnpm.

1. Install dependencies

```cmd
npm install
```

2. Start dev server (Vite)

```cmd
npm run dev
```

3. Build for production

```cmd
npm run build
```

4. Preview the production build locally

```cmd
npm run preview
```

Other scripts (if present):

- `npm test` — run tests (project contains a jest/vitest example test file under `test/`)

## Localization

- Translations are defined in `src/lib/i18n.ts`. Keys are grouped (e.g., `nav`, `products`, `wishlist`).
- Language selection updates the document `dir` (ltr/rtl) via the `LanguageContext`.

When adding new UI text, prefer using `t('some.key')` and add the key to `i18n.ts` for both `en` and `ar`.

## Styling & CSS

- Tailwind CSS is used across the project. Utility classes live in components and custom utilities are defined in `src/index.css`.
- There are a few Tailwind `@apply` rules; ensure your dev environment runs PostCSS with Tailwind configured (see `postcss.config.js` and `tailwind.config.cjs`).

If you see `Unknown at rule @tailwind` or `@apply` errors when linting/editing, make sure your editor/IDE is not trying to parse PostCSS without Tailwind/PostCSS configured.

## 3D Canvas and interaction notes

- The hero uses a WebGL canvas (`react-three-fiber`) as a background. To avoid the canvas capturing pointer events or occluding the UI, canvas elements use `pointer-events: none` in CSS (`.canvas-container canvas`).
- If you want interactive 3D controls, enable pointer events selectively only on the interactive elements.

## SEO & Favicon

- `index.html` includes SEO meta tags (Open Graph, Twitter) and uses a gold-cart SVG favicon at `/favicon.svg`.

## Accessibility & RTL

- The `LanguageContext` sets `dir` and `lang` on the document root. The app contains RTL-aware styles and flips icons when `direction === 'rtl'`.

## Recent fixes / developer notes

- Navbar active-link indicator: improved active detection and recalculation after language changes to avoid misaligned underline when switching LTR/RTL or navigating nested routes.
- Hero section: overlays and headings now have explicit z-index values and the canvas ignores pointer events to prevent accidental occlusion of the first section text.

Files to inspect for visual/layout issues:
- `src/components/layout/Navbar.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/3d/Hero3DScene.tsx`
- `src/index.css`

If you hit a layout issue after switching languages or resizing, try a hard refresh (Ctrl+F5) to clear cached CSS and verify.

## Contributing

Contributions are welcome. Recommended steps:

1. Fork the repo
2. Create a feature branch
3. Add tests for new features where appropriate
4. Open a pull request describing the change

## Troubleshooting

- Dev server doesn't start: verify Node version and run `npm install`.
- Tailwind errors in your editor: ensure PostCSS/Tailwind is enabled for your IDE and not just the TypeScript parser.
- Missing translation text: add keys to `src/lib/i18n.ts`.

## License

This project scaffold is provided as-is. Add a `LICENSE` file if you plan to publish.

---

If you want, I can:
- add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT`;
- add automated visual tests (Playwright) for the hero/routing behaviors;
- generate PNG favicons + a `site.webmanifest` for PWA support.

Tell me which of those you'd like next.

