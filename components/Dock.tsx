"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type DockItem = {
  href: string;
  label: string;
  tile: string;
  icon: ReactNode;
};

const items: DockItem[] = [
  {
    href: "/",
    label: "Home",
    tile: "bg-[linear-gradient(90deg,#2a78dc_50%,#9fd6ff_50%)]",
    icon: (
      <>
        <path stroke="#13324a" strokeWidth="1.6" strokeLinecap="round" d="M8.5 7.5v3.2M15.5 7.5v3.2" />
        <path fill="none" stroke="#13324a" strokeWidth="1.4" strokeLinecap="round" d="M6.5 14.5c3.2 3.4 7.8 3.4 11 0" />
      </>
    ),
  },
  {
    href: "/journal",
    label: "Journal",
    tile: "bg-linear-to-b from-white to-[#e3eaf2]",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" fill="#d7e0ea" />
        <circle cx="12" cy="12" r="7.8" fill="#2f8cf0" />
        <circle cx="12" cy="12" r="6.6" fill="none" stroke="#fff" strokeWidth="0.6" strokeDasharray="0.5 1.3" strokeOpacity="0.85" />
        <path fill="#ef5b5b" d="m16 8-2.9 5.1-2.2-2.2z" />
        <path fill="#fff" d="m8 16 2.9-5.1 2.2 2.2z" />
      </>
    ),
  },
  {
    href: "/the-unspoken",
    label: "The Unspoken",
    tile: "bg-linear-to-b from-[#fffaf6] to-[#f5e5de]",
    icon: (
      <path
        fill="#e07a6f"
        d="M7.5 7C5.6 7 4.5 8.4 4.5 10.2c0 1.7 1.2 3 2.8 3-.2 1.6-1 2.6-2.3 3.3l.6.9c2.8-1 4.4-3.3 4.4-6.6C10 8.4 9 7 7.5 7zm8.5 0c-1.9 0-3 1.4-3 3.2 0 1.7 1.2 3 2.8 3-.2 1.6-1 2.6-2.3 3.3l.6.9c2.8-1 4.4-3.3 4.4-6.6 0-2.4-1-3.8-2.5-3.8z"
      />
    ),
  },
  {
    href: "/becoming",
    label: "Becoming",
    tile: "bg-linear-to-b from-[#f7fcfa] to-[#dcefe8]",
    icon: (
      <>
        <path fill="#3a9d88" d="M19 5C11 5 5.5 9 5.5 16c0 1 .1 2 .4 3C7 12 12 9 16 8c-4 2-7.5 5.5-8.6 10.5C15 19 19 14 19 5z" />
        <path fill="none" stroke="#e6f4ef" strokeWidth="0.8" strokeLinecap="round" d="M9.5 15.5c2-3 4.5-5.3 7.5-7" />
      </>
    ),
  },
  {
    href: "/find-your-words",
    label: "Find Your Words",
    tile: "bg-linear-to-b from-[#fdfaff] to-[#ece4f4]",
    icon: (
      <>
        <path fill="#dba6d2" d="M4.5 10c2.6.2 4.7 1.4 6 3.3.6 1 1 2.3 1.5 3.7-3.8-.2-6.8-2.6-7.5-7zm15 0c-.7 4.4-3.7 6.8-7.5 7 .5-1.4.9-2.7 1.5-3.7 1.3-1.9 3.4-3.1 6-3.3z" />
        <path fill="#c98bc0" d="M12 5c1.8 2 2.6 4.3 2.6 6.8 0 2.2-1 4-2.6 5.2-1.6-1.2-2.6-3-2.6-5.2C9.4 9.3 10.2 7 12 5z" />
        <path fill="none" stroke="#a993cf" strokeWidth="1" strokeLinecap="round" d="M7 19h10" />
      </>
    ),
  },
  {
    href: "/about",
    label: "About",
    tile: "bg-linear-to-b from-[#7ccaff] to-[#2b7fe0]",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" fill="#fff" fillOpacity="0.22" />
        <circle cx="12" cy="10" r="3.2" fill="#fff" />
        <path fill="#fff" d="M6.6 17.6c1-2.7 3-4.1 5.4-4.1s4.4 1.4 5.4 4.1A7.8 7.8 0 0 1 6.6 17.6z" />
      </>
    ),
  },
];

const tileBase =
  "relative flex size-11 items-center justify-center overflow-hidden rounded-[0.8rem] shadow-[0_4px_10px_rgb(19_50_74/0.18)] ring-1 ring-black/5 transition-transform duration-200 ease-out sm:size-13";

const tileGloss = (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 to-transparent to-55%"
  />
);

export function Dock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-2"
    >
      <ul className="flex items-start gap-1 rounded-[1.4rem] border border-white/60 bg-white/40 px-2 pt-2 pb-1.5 shadow-[0_10px_40px_rgb(19_50_74/0.2)] backdrop-blur-xl backdrop-saturate-150 sm:gap-2 sm:px-3 sm:pt-2.5">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="flex w-11 flex-col items-center sm:w-19">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className="group flex flex-col items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
              >
                <span
                  className={`${tileBase} ${item.tile} group-hover:-translate-y-1.5 group-hover:scale-110 group-focus-visible:-translate-y-1.5 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:transform-none`}
                >
                  <svg viewBox="0 0 24 24" className="relative size-7 sm:size-8" aria-hidden="true">
                    {item.icon}
                  </svg>
                  {tileGloss}
                </span>
                <span className="mt-1 hidden text-[11px] leading-tight whitespace-nowrap text-ink/85 sm:block">
                  {item.label}
                </span>
              </Link>
              <span
                aria-hidden="true"
                className={`mt-0.5 size-1 rounded-full ${active ? "bg-ink/70" : "bg-transparent"}`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
