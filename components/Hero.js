import Image from "next/image";
import Link from "next/link";
import { Landmark, ShieldCheck, Vote } from "lucide-react";

const forceMessages = [
  {
    icon: Vote,
    title: "Revocatoria Parlamentaria",
    quote: "Si no cumplen, se van."
  },
  {
    icon: Landmark,
    title: "Autonomía Real para Cusco",
    quote: "Nuestro presupuesto, nuestras decisiones."
  },
  {
    icon: ShieldCheck,
    title: "Fiscalización sin miedo",
    quote: "Obras emblemáticas bajo control."
  }
];

export function Hero({ portrait, lead }) {
  return (
    <section className="container-shell pt-6 sm:pt-10">
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-brand-soft shadow-card">
          {portrait ? (
            <Image
              src={portrait.publicPath}
              alt="César Holguín, candidato a diputado por Cusco"
              width={1200}
              height={1200}
              className="h-full min-h-[420px] w-full object-cover object-top"
              priority
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          ) : (
            <div className="grid min-h-[420px] place-items-center p-8 text-center text-sm text-black/60">
              Placeholder: retrato del candidato
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Diputado por Cusco · Ahora Nación</p>
          <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-brand-red sm:text-5xl">Recuperemos la patria</h1>
          {lead ? <p className="mt-5 max-w-2xl text-base leading-7 text-black/75 sm:text-lg">{lead}</p> : null}

          <div className="mt-7 space-y-4">
            {forceMessages.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-black/10 bg-brand-soft/60 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-red" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red sm:text-base">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-black/80">“{item.quote}”</p>
                    </div>
                    <Icon className="ml-auto hidden h-4 w-4 shrink-0 text-black/40 sm:block" aria-hidden />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/propuestas/" className="rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white">
              Conoce la propuesta
            </Link>
            <Link href="/sumate/" className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-brand-ink">
              Súmate
            </Link>
            <Link href="/como-votar/" className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-brand-ink">
              Cómo votar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
