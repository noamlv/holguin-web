import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { CTA } from "@/components/CTA";
import { ProposalsGrid } from "@/components/ProposalsGrid";
import { MarkdownBlock } from "@/components/MarkdownBlock";
import { getCampaignContent } from "@/lib/content";
import { getCampaignAssets, pickCampaignAssets } from "@/lib/assets";
import { Scale, Landmark, ShieldCheck, Vote, Share2 } from "lucide-react";

export const metadata = {
  title: "Inicio",
  description:
    "Campaña de César Augusto Holguín Loaiza a diputado por Cusco: equilibrio de poder, autonomía real y fiscalización sin miedo."
};

export default function HomePage() {
  const content = getCampaignContent();
  const assets = pickCampaignAssets(getCampaignAssets());
  const inicio = content.sections.INICIO;
  const perfil = content.sections.PERFIL;
  const vision = content.sections["VISIÓN"];
  const finalPhrase = content.sections["FRASE FINAL"].paragraphs[0];

  const quickAxes = [3, 2, 4].map((index) => content.proposals.axes[index]).filter(Boolean);

  return (
    <>
      <Hero
        lead={inicio.summary}
        portrait={assets.portrait}
      />

      <section className="container-shell py-10 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-card p-6 sm:p-8">
            <SectionHeader
              eyebrow="Perfil"
              title="Una trayectoria construida desde el trabajo, el estudio y la gestión pública"
              subtitle="Síntesis oficial basada en contenido.md"
            />
            <MarkdownBlock markdown={perfil.rawMarkdown} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/vida-y-trayectoria/" className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white">
                Vida y trayectoria
              </Link>
              <Link href="/sumate/" className="rounded-full border border-brand-red px-5 py-3 text-sm font-semibold text-brand-red">
                Súmate
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-brand-soft p-6 sm:p-8">
            {assets.map ? (
              <Image
                src={assets.map.publicPath}
                alt="Mapa de Cusco como recurso visual de contexto territorial"
                fill
                className="pointer-events-none object-cover opacity-15"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ) : null}
            <div className="relative">
              <SectionHeader eyebrow="3 pilares" title="Mensajes centrales de campaña" />
              <div className="space-y-4">
                <Card icon={Vote} title="Revocatoria Parlamentaria" description="Control ciudadano sobre el congresista para terminar con el cheque en blanco." />
                <Card icon={Landmark} title="Autonomía Real para Cusco" description="Capacidad de decisión presupuestal y descentralización fiscal con reglas claras." />
                <Card icon={ShieldCheck} title="Fiscalización sin miedo" description="Seguimiento permanente a megaproyectos con información pública y auditorías técnicas." />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/propuestas/#revocatoria-parlamentaria" className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-brand-ink">
                  Revocatoria
                </Link>
                <Link href="/propuestas/#fiscalizacion-fuerte-para-cusco" className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-brand-ink">
                  Fiscalización
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-4 sm:py-8">
        <SectionHeader eyebrow="Propuestas" title="Ejes de trabajo para Cusco" subtitle="Resumen de la agenda legislativa y territorial" />
        <ProposalsGrid axes={quickAxes} compact />
        <div className="mt-8">
          <CTA
            title="Conoce la propuesta completa"
            description="Revisa los seis ejes con diagnóstico, medidas concretas y resultados esperados."
            primary={{ label: "Conoce la propuesta", href: "/propuestas/" }}
            secondary={{ label: "Cómo votar", href: "/como-votar/" }}
          />
        </div>
      </section>

      <section className="container-shell py-10 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="surface-card p-6 sm:p-8">
            <SectionHeader eyebrow="Visión" title="Una agenda clara para Cusco" />
            <ul className="space-y-3 text-sm leading-6 text-black/80">
              {vision.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-6 sm:p-8">
            <SectionHeader eyebrow="Acción" title="Comparte y convoca" subtitle="Ayuda a que más personas conozcan la agenda" />
            <div className="space-y-4 text-sm text-black/80">
              <p>
                La campaña busca conversación pública con propuestas claras. Comparte esta web y convoca a vecinos, familia y amigos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/sumate/" className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white">
                  <Share2 className="h-4 w-4" /> Comparte
                </Link>
                <a
                  href={`https://wa.me/51${content.candidate.phoneDigits.replace(/\s+/g, "")}`}
                  className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-brand-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  Súmate
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {assets.flyer ? (
                  <div className="overflow-hidden rounded-xl border border-black/10">
                    <Image
                      src={assets.flyer.publicPath}
                      alt="Flyer de campaña con mensajes principales"
                      width={620}
                      height={760}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                {assets.logoArt ? (
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white p-3">
                    <Image
                      src={assets.logoArt.publicPath}
                      alt="Identidad visual de campaña"
                      width={620}
                      height={760}
                      className="h-full w-full rounded-lg object-contain"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {assets.gallery?.length ? (
        <section className="container-shell py-2 sm:py-8">
          <SectionHeader
            eyebrow="Campaña en territorio"
            title="Presencia y recorrido"
            subtitle="Fotos de apoyo detectadas automáticamente desde la carpeta de assets."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assets.gallery.slice(0, 4).map((photo, index) => (
              <div key={photo.fileName} className="overflow-hidden rounded-xl border border-black/10 bg-brand-soft">
                <Image
                  src={photo.publicPath}
                  alt={`Foto de campaña ${index + 1} de César Holguín`}
                  width={800}
                  height={800}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-black/50">
            Si alguna foto en formato HEIC no se muestra en tu navegador, conviértela a JPG/PNG y reemplázala en `assets/`.
          </p>
        </section>
      ) : null}

      <section className="container-shell pb-14 sm:pb-20">
        <div className="rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/5 to-white p-6 sm:p-10">
          <p className="max-w-4xl text-lg font-semibold leading-relaxed text-brand-ink sm:text-2xl">{finalPhrase}</p>
          <p className="mt-4 text-sm text-black/60">Frase final de campaña</p>
        </div>
      </section>
    </>
  );
}
