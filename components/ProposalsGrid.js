import { MarkdownBlock } from "@/components/MarkdownBlock";
import { slugify } from "@/lib/utils";

function AxisCard({ axis, compact = false }) {
  return (
    <article id={slugify(axis.title)} className="surface-card p-6 sm:p-8 scroll-mt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">{axis.label}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">{axis.title}</h3>
      <div className="mt-5 grid gap-4">
        {(compact ? axis.sections.slice(0, 2) : axis.sections).map((section) => (
          <section key={`${axis.title}-${section.heading}`} className="rounded-xl border border-black/10 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-black/70">{section.heading}</h4>
            <div className="mt-2">
              <MarkdownBlock markdown={section.body} />
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export function ProposalsGrid({ axes, compact = false }) {
  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      {axes.map((axis) => (
        <AxisCard key={axis.title} axis={axis} compact={compact} />
      ))}
    </section>
  );
}
