import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-5 pt-20 pb-36 sm:pt-24">
      <p className="font-serif text-sm tracking-[0.35em] text-ocean-900 uppercase">Novia Studio · Admin</p>
      {children}
    </main>
  );
}
