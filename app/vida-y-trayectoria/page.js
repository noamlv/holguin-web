import { SectionHeader } from "@/components/SectionHeader";
import { Timeline } from "@/components/Timeline";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { CTA } from "@/components/CTA";
import { getCampaignContent } from "@/lib/content";

export const metadata = {
  title: "Vida y Trayectoria",
  description:
    "Historia, formación, experiencia profesional y trayectoria política de César Augusto Holguín Loaiza, candidato a diputado por Cusco."
};

export default function VidaTrayectoriaPage() {
  const content = getCampaignContent();
  const vida = content.sections["VIDA Y TRAYECTORIA"];

  return (
    <div className="container-shell py-8 sm:py-14">
      <SectionHeader
        eyebrow="Vida y trayectoria"
        title="Historia personal, formación y experiencia pública"
        subtitle="Relato biográfico oficial del candidato."
      />

      <Timeline items={vida.subsections.map((item) => ({ title: item.title, body: item.rawMarkdown }))} />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {vida.subsections.map((section) => (
          <article key={section.title} className="surface-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-brand-ink">{section.title}</h2>
            <div className="mt-4">
              <MarkdownBlock markdown={section.rawMarkdown} />
            </div>
          </article>
        ))}
      </section>

      <div className="mt-10">
        <CTA
          title="Conoce el plan de trabajo"
          description="La trayectoria se conecta con una agenda de equilibrio institucional, descentralización y fiscalización."
          primary={{ label: "Conoce la propuesta", href: "/propuestas/" }}
          secondary={{ label: "Súmate", href: "/sumate/" }}
        />
      </div>
    </div>
  );
}
