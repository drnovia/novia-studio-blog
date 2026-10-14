# Folder map — NOVIA Studio Blog

```text
.
├── app/                 # App Router pages & global styles
├── components/          # Shared chrome (MenuBar, Dock, …)
├── public/images/       # Photography & avatar assets
├── supabase/migrations/ # Future article schema (optional)
├── tests/               # Reserved for automated tests
├── docs/                # Documentation
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## Conventions

- **Pages:** one folder per route under `app/` (`app/journal/page.tsx`).
- **Shared UI:** only in `components/` — layout renders MenuBar/Dock once in `app/layout.tsx`.
- **Assets:** kebab-case under `public/images/`.
- Avatar source of truth: `public/images/novia-avatar.jpg`.

## Stack

Next.js 16 App Router · React 19 · Tailwind CSS v4 · React Compiler.
