export function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : ""}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">{eyebrow}</p> : null}
      {title ? <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">{title}</h2> : null}
      {subtitle ? <p className="mt-3 text-sm leading-6 text-black/65 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}
