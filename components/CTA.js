import Link from "next/link";

export function CTA({ title, description, primary, secondary }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-brand-ink p-6 text-white shadow-card sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-white/80">{description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {primary ? (
            <Link href={primary.href} className="rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white">
              {primary.label}
            </Link>
          ) : null}
          {secondary ? (
            <Link href={secondary.href} className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
