import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/propuestas/", label: "Propuestas" },
  { href: "/vida-y-trayectoria/", label: "Vida y trayectoria" },
  { href: "/como-votar/", label: "Cómo votar" },
  { href: "/sumate/", label: "Súmate" }
];

export function MainNav({ candidate }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <Link href="/" className="min-w-0">
          <p className="truncate text-sm font-semibold text-brand-ink sm:text-base">{candidate.name}</p>
          <p className="truncate text-xs text-black/60">{candidate.roleLine}</p>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/sumate/" className="ml-1 rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white">
            Súmate
          </Link>
        </nav>
      </div>
      <div className="border-t border-black/5 lg:hidden">
        <div className="container-shell flex gap-2 overflow-x-auto py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
