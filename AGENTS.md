<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Communicate in Bahasa Indonesia; keep code and technical terms in English.
- Preserve the existing NOVIA STUDIO design; refine surgically, never rebuild or redesign unrelated pages, and do not delete existing assets.
- "Commit and push" means commit to `main` and push to GitHub; never include the untracked `.cursor/` folder in commits.
- The Dock has no Trash tile and no Reading Room item; do not re-add them (the `/reading-room` route still exists).
- The MenuBar avatar is `public/images/novia-avatar.jpg` (user-chosen illustrated portrait); reuse it everywhere, do not substitute.

## Learned Workspace Facts

- Stack is Next.js 16.4 App Router + React 19 + TypeScript + Tailwind CSS v4 (with `cacheComponents` and React Compiler); not Vite and no GSAP, despite some user briefs saying so.
- Shared `MenuBar` and `Dock` components are rendered in `app/layout.tsx`; pages should not render their own copies.
- No auth, database, or content storage exists yet; page content is written directly in JSX.
- Git remote is GitHub `drnovia/novia-studio-blog`, branch `main`.
- The Turbopack dev server can serve stale CSS after editing `@theme` tokens in `app/globals.css`; verify with a production build or clear `.next/dev`.
