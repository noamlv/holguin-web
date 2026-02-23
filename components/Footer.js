import Link from "next/link";

export function Footer({ candidate, finalPhrase }) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-sm font-semibold text-brand-ink">{candidate.name}</p>
          <p className="mt-1 text-sm text-black/60">{candidate.roleLine}</p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-black/75">
            {finalPhrase || "Cusco necesita representantes con reglas claras, autonomía regional y rendición de cuentas permanente."}
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/sumate/" className="text-brand-ink hover:text-brand-red">
            {candidate.social}
          </Link>
          <a href={`tel:+51${candidate.phoneDigits}`} className="text-brand-ink hover:text-brand-red">
            {candidate.phone}
          </a>
          <Link href="/como-votar/" className="text-brand-ink hover:text-brand-red">
            Cómo votar
          </Link>
          <Link href="/propuestas/" className="text-brand-ink hover:text-brand-red">
            Propuestas
          </Link>
        </div>
      </div>
    </footer>
  );
}
