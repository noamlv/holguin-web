import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { getCampaignContent } from "@/lib/content";
import { getCampaignAssets, pickCampaignAssets } from "@/lib/assets";

export const metadata = {
  title: "Súmate",
  description:
    "Contacto y participación en la campaña de César Holguín por Cusco. Súmate, comparte y participa en fiscalización ciudadana."
};

export default function SumatePage() {
  const content = getCampaignContent();
  const assets = pickCampaignAssets(getCampaignAssets());

  return (
    <div className="container-shell py-8 sm:py-14">
      <SectionHeader
        eyebrow="Súmate"
        title="Participa, comparte y fortalece la fiscalización ciudadana"
        subtitle="Canales de contacto y acciones para apoyar la campaña en Cusco."
      />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-brand-ink">Contacto directo</h2>
          <div className="mt-5 space-y-4 text-sm text-black/80">
            <p>
              <span className="font-semibold text-brand-ink">Teléfono / WhatsApp:</span> {content.candidate.phone}
            </p>
            <p>
              <span className="font-semibold text-brand-ink">Redes:</span> {content.candidate.social}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={`https://wa.me/51${content.candidate.phoneDigits.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-red px-4 py-4 text-center text-sm font-semibold text-white"
            >
              Súmate por WhatsApp
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-black/10 px-4 py-4 text-center text-sm font-semibold text-brand-ink"
            >
              Compartir en redes
            </a>
          </div>

          <div className="mt-8 rounded-xl border border-black/10 bg-brand-soft p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">Cómo apoyar</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-black/80">
              <li>Comparte la web y la guía “Cómo votar”.</li>
              <li>Organiza conversaciones barriales con foco en propuestas.</li>
              <li>Promueve la fiscalización ciudadana de obras y presupuesto.</li>
              <li>Ayuda a difundir los ejes: revocatoria, autonomía y fiscalización.</li>
            </ul>
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          {assets.portrait ? (
            <Image
              src={assets.portrait.publicPath}
              alt="Retrato de César Holguín, candidato a diputado por Cusco"
              width={900}
              height={1200}
              className="h-full w-full object-cover object-top"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          ) : (
            <div className="grid h-full min-h-[320px] place-items-center bg-brand-soft p-8 text-center text-sm text-black/60">
              Placeholder: retrato del candidato
            </div>
          )}
        </div>
      </section>

      <div className="mt-10">
        <CTA
          title="Fiscalización y revocatoria como compromiso público"
          description="Difunde una campaña enfocada en control ciudadano, autonomía regional y reglas claras."
          primary={{ label: "Fiscalización", href: "/propuestas/#fiscalizacion-fuerte-para-cusco" }}
          secondary={{ label: "Revocatoria", href: "/propuestas/#revocatoria-parlamentaria" }}
        />
      </div>
    </div>
  );
}
