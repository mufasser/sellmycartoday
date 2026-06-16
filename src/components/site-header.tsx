import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Sell My Car Today home">
          <Image
            src={site.localLogo}
            alt="Sell My Car Today"
            width={176}
            height={58}
            priority
            className="h-12 w-auto max-w-[176px] object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-[13px] font-black tracking-[0.03em] text-neutral-800 transition hover:bg-yellow-300 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden h-11 items-center gap-2 rounded-md bg-black px-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:bg-yellow-300 hover:text-black sm:flex"
          >
            <Phone size={17} aria-hidden="true" />
            {site.phone}
          </a>
          <details className="group relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-black/15 bg-white text-black transition hover:bg-yellow-300 [&::-webkit-details-marker]:hidden">
              <Menu size={20} aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </summary>
            <nav className="absolute right-0 mt-3 w-72 rounded-lg border border-black/10 bg-white p-2 shadow-2xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-3 text-sm font-black text-neutral-800 hover:bg-yellow-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
