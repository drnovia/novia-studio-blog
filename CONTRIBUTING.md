# Contributing — NOVIA Studio Blog

## Setup

```bash
npm install
npm run dev
```

## Design rules

- Preserve the desktop metaphor, MenuBar, and Dock — do not duplicate them inside pages.
- Do not re-add Dock tiles that were intentionally removed (Trash, Reading Room shortcut).
- Use `public/images/novia-avatar.jpg` for avatar imagery.
- Surgical edits only; no unrelated redesigns.

## Before a PR

```bash
npm run lint
npm run build
```

Include screenshots for visual changes. Never commit `.cursor/`.
