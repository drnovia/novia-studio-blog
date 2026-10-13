export function PagePlaceholder({ title }: { title: string }) {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 pt-16 pb-36">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-700">
        Novia Studio
      </p>
      <h1 className="mt-4 font-serif text-5xl text-ocean-900 sm:text-6xl">{title}</h1>
      <p className="mt-6 text-lg leading-8 text-ink/70">Halaman ini sedang disiapkan.</p>
    </main>
  );
}
