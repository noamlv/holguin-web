import { MarkdownBlock } from "@/components/MarkdownBlock";

export function Timeline({ items }) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.title} className="grid gap-4 md:grid-cols-[40px_1fr]">
            <div className="flex md:justify-center">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">
                {index + 1}
                {index < items.length - 1 ? (
                  <span className="absolute left-1/2 top-10 hidden h-16 w-px -translate-x-1/2 bg-black/10 md:block" />
                ) : null}
              </div>
            </div>
            <div className="rounded-xl border border-black/10 p-4 sm:p-5">
              <h3 className="text-lg font-semibold tracking-tight text-brand-ink">{item.title}</h3>
              <div className="mt-2">
                <MarkdownBlock markdown={item.body} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
