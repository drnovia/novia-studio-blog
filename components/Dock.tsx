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
    tile: "bg-linear-to-b from-[#6cc0ff] to-[#1f6fd6]",
    icon: <path fill="#fff" d="M12 4.5 4 11v8.5h5.5V15h5v4.5H20V11z" />,
  },
  {
    href: "/journal",
    label: "Journal",
    tile: "bg-linear-to-b from-white to-[#e6edf5]",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" fill="#2f8cf0" />
        <circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeWidth="0.6" strokeDasharray="0.6 1.4" />
        <path fill="#ef4b4b" d="m15.8 8.2-2.6 5-2.4-2.4z" />
        <path fill="#fff" d="m8.2 15.8 2.6-5 2.4 2.4z" />
      </>
    ),
  },
  {
    href: "/the-unspoken",
    label: "The Unspoken",
    tile: "bg-linear-to-b from-white to-[#f3ece6]",
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
    tile: "bg-linear-to-b from-white to-[#e7f1ee]",
    icon: (
      <>
        <path fill="#2f8f7a" d="M19 5C11 5 5.5 9 5.5 16c0 1 .1 2 .4 3C7 12 12 9 16 8c-4 2-7.5 5.5-8.6 10.5C15 19 19 14 19 5z" />
      </>
    ),
  },
  {
    href: "/reading-room",
    label: "Reading Room",
    tile: "bg-linear-to-b from-[#ffa45c] to-[#ee5f2c]",
    icon: (
      <>
        <path fill="#fff" d="M3.5 6.5c2.8-1 5.8-.8 8 1v11c-2.2-1.5-5.2-1.8-8-1z" />
        <path fill="#fff" d="M20.5 6.5c-2.8-1-5.8-.8-8 1v11c2.2-1.5 5.2-1.8 8-1z" />
      </>
    ),
  },
  {
    href: "/find-your-words",
    label: "Find Your Words",
    tile: "bg-linear-to-b from-white to-[#f1ecf4]",
    icon: (
      <>
        <path fill="#c98bc0" d="M12 5c1.8 2 2.6 4.3 2.6 6.8 0 2.2-1 4-2.6 5.2-1.6-1.2-2.6-3-2.6-5.2C9.4 9.3 10.2 7 12 5z" />
        <path fill="#dba6d2" d="M4.5 10c2.6.2 4.7 1.4 6 3.3.6 1 1 2.3 1.5 3.7-3.8-.2-6.8-2.6-7.5-7zm15 0c-.7 4.4-3.7 6.8-7.5 7 .5-1.4.9-2.7 1.5-3.7 1.3-1.9 3.4-3.1 6-3.3z" />
        <path fill="#b8955a" d="M7 18.5h10" stroke="#b8955a" strokeWidth="1" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/about",
    label: "About",
    tile: "bg-linear-to-b from-[#7ccaff] to-[#2b7fe0]",
    icon: (
      <>
        <circle cx="12" cy="9" r="3.6" fill="#fff" />
        <path fill="#fff" d="M5.5 19c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6z" />
      </>
    ),
  },
];

const tileBase =
  "flex size-11 items-center justify-center rounded-[0.8rem] shadow-[0_4px_10px_rgb(19_50_74/0.18)] ring-1 ring-black/5 transition-transform duration-200 ease-out sm:size-13";

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
                  <svg viewBox="0 0 24 24" className="size-7 sm:size-8" aria-hidden="true">
                    {item.icon}
                  </svg>
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
