import "./globals.css";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { getCampaignContent } from "@/lib/content";
import { getCampaignAssets, pickCampaignAssets } from "@/lib/assets";

export async function generateMetadata() {
  const content = getCampaignContent();
  const assets = pickCampaignAssets(getCampaignAssets());
  const title = "César Augusto Holguín Loaiza | Diputado por Cusco - Ahora Nación";
  const description =
    content.sections.INICIO.summary ||
    "Agenda para equilibrio de poder, autonomía real para Cusco y fiscalización con transparencia.";

  return {
    metadataBase: new URL("https://example.com"),
    title: {
      default: title,
      template: "%s | César Holguín - Diputado por Cusco"
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_PE",
      images: assets.flyer?.publicPath || assets.portrait?.publicPath ? [assets.flyer?.publicPath || assets.portrait?.publicPath] : []
    }
  };
}

export default function RootLayout({ children }) {
  const content = getCampaignContent();
  const candidate = content.candidate;

  return (
    <html lang="es">
      <body className="min-h-screen bg-white">
        <MainNav candidate={candidate} />
        <main>{children}</main>
        <Footer candidate={candidate} finalPhrase={content.sections["FRASE FINAL"].paragraphs[0] || ""} />
      </body>
    </html>
  );
}
