import Image from "next/image";
import noviaAvatar from "@/public/images/novia-avatar.jpg";
import { LiveClock } from "@/components/LiveClock";

const menus = ["File", "Edit", "View", "Go", "Window", "Help"];

export function MenuBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between border-b border-white/40 bg-ivory-50/55 px-3 text-[13px] text-ink backdrop-blur-xl sm:px-4">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 24 24" className="size-4 text-ocean-900" fill="currentColor" aria-hidden="true">
          <path d="M12 3c1.5 2.5 1.5 5 0 7.5C10.5 8 10.5 5.5 12 3zm0 18c-1.5-2.5-1.5-5 0-7.5 1.5 2.5 1.5 5 0 7.5zM3 12c2.5-1.5 5-1.5 7.5 0C8 13.5 5.5 13.5 3 12zm18 0c-2.5 1.5-5 1.5-7.5 0 2.5-1.5 5-1.5 7.5 0z" />
        </svg>
        <span className="font-semibold">Novia Studio</span>
        <ul className="hidden gap-4 md:flex" aria-hidden="true">
          {menus.map((menu) => (
            <li key={menu}>{menu}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <svg viewBox="0 0 24 24" className="hidden size-4 sm:block" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden size-4 sm:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 28 14" className="hidden h-3.5 w-7 sm:block" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <rect x="1" y="1" width="23" height="12" rx="3" />
          <rect x="3" y="3" width="17" height="8" rx="1.5" fill="currentColor" stroke="none" />
          <path d="M26 5v4" strokeLinecap="round" />
        </svg>
        <span className="font-medium">
          <LiveClock withDate />
        </span>
        <Image
          src={noviaAvatar}
          alt=""
          className="size-5 rounded-full object-cover object-[50%_40%] ring-1 ring-white/70"
          sizes="20px"
        />
      </div>
    </header>
  );
}
