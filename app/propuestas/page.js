import { ProposalsGrid } from "@/components/ProposalsGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { getCampaignContent } from "@/lib/content";

export const metadata = {
  title: "Propuestas",
  description:
    "Ejes de propuesta de César Holguín para Cusco: equilibrio institucional, descentralización, revocatoria parlamentaria y fiscalización."
};

export default function PropuestasPage() {
  const content = getCampaignContent();
  const { axes } = content.proposals;
  const vision = content.sections["VISIÓN"];

  return (
    <div className="container-shell py-8 sm:py-14">
      <SectionHeader
        eyebrow="Propuestas"
        title="Agenda legislativa y territorial para Cusco"
        subtitle="Contenido organizado desde la fuente oficial `contenido.md`, sin alterar el sentido de las propuestas."
      />

      <ProposalsGrid axes={axes} />

      <section className="mt-12 rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-8">
        <SectionHeader eyebrow="Visión" title="Síntesis de resultados esperados" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {vision.checklist.map((item) => (
            <li key={item} className="rounded-xl border border-black/10 bg-brand-soft px-4 py-3 text-sm text-black/80">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <CTA
          title="Participa en la campaña"
          description="Ayuda a difundir propuestas y fiscalización ciudadana en Cusco."
          primary={{ label: "Súmate", href: "/sumate/" }}
          secondary={{ label: "Comparte", href: "/como-votar/" }}
        />
      </div>
    </div>
  );
}
