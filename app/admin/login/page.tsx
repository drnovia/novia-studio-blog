import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="mt-8 max-w-md rounded-3xl bg-ivory-100 p-6 shadow-[0_12px_40px_rgb(19_50_74/0.12)] sm:p-8">
      <h1 className="font-serif text-4xl text-ocean-900">Masuk</h1>
      <p className="mt-2 text-ink/70">Khusus admin NOVIA STUDIO.</p>
      <LoginForm />
    </section>
  );
}
