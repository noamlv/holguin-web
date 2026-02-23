export function Card({ icon: Icon, title, description }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="rounded-lg bg-brand-red/10 p-2 text-brand-red">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div>
          <h3 className="text-sm font-semibold text-brand-ink">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-black/70">{description}</p>
        </div>
      </div>
    </div>
  );
}
