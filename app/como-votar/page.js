import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { getCampaignAssets, pickCampaignAssets } from "@/lib/assets";

export const metadata = {
  title: "Cómo Votar",
  description:
    "Guía visual para votar por César Holguín, candidato a diputado por Cusco (Ahora Nación), con pasos claros 1-2-3."
};

function StepCard({ number, title, body, image, alt }) {
  return (
    <div className="surface-card overflow-hidden">
      {image ? (
        <Image
          src={image.publicPath}
          alt={alt}
          width={800}
          height={500}
          className="h-48 w-full object-cover sm:h-56"
          loading="lazy"
        />
      ) : (
        <div className="grid h-48 place-items-center bg-brand-soft text-center sm:h-56">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Placeholder</p>
            <p className="mt-2 text-sm text-black/70">Reemplazar imagen de apoyo para el paso {number}</p>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white">
          {number}
        </div>
        <h3 className="text-lg font-semibold text-brand-ink">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-black/75">{body}</p>
      </div>
    </div>
  );
}

export default function ComoVotarPage() {
  const assets = pickCampaignAssets(getCampaignAssets());

  return (
    <div className="container-shell py-8 sm:py-14">
      <SectionHeader
        eyebrow="Cómo votar"
        title="Guía visual 1-2-3 para marcar correctamente"
        subtitle="Usa el número 1 para diputado por Cusco. Revisa siempre la cédula y marca dentro del recuadro."
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <StepCard
          number="1"
          title="Ubica la opción para diputado"
          body="Busca la sección correspondiente a la elección de diputado y verifica el espacio de votación en la cédula."
          image={assets.voteGuide}
          alt="Referencia visual de cédula para votar por diputado"
        />
        <StepCard
          number="2"
          title="Marca el número 1"
          body="Marca con claridad el número 1 en el recuadro del candidato a diputado. Evita salirte del espacio."
          image={assets.logoArt}
          alt="Arte de campaña con referencia visual del número 1 y candidatura"
        />
        <StepCard
          number="3"
          title="Verifica y comparte la información"
          body="Confirma que tu voto esté bien marcado y comparte esta guía con familiares y vecinos para evitar votos nulos."
          image={assets.flyer}
          alt="Pieza gráfica de campaña para difusión y recordación de voto"
        />
      </section>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-semibold text-brand-ink">Recordatorio rápido</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Partido</p>
            <p className="mt-2 text-sm font-medium text-brand-ink">Ahora Nación</p>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Candidato</p>
            <p className="mt-2 text-sm font-medium text-brand-ink">César Augusto Holguín Loaiza</p>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Cargo</p>
            <p className="mt-2 text-sm font-medium text-brand-ink">Diputado por Cusco</p>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Marca clave</p>
            <p className="mt-2 text-sm font-medium text-brand-ink">Número 1</p>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <CTA
          title="Comparte esta guía"
          description="Difunde cómo votar correctamente y ayuda a reducir errores de marcación."
          primary={{ label: "Comparte", href: "/sumate/" }}
          secondary={{ label: "Conoce la propuesta", href: "/propuestas/" }}
        />
      </div>
    </div>
  );
}
