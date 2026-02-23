export const dynamic = "force-static";

export default function sitemap() {
  const base = "https://example.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/propuestas/`, lastModified: now },
    { url: `${base}/vida-y-trayectoria/`, lastModified: now },
    { url: `${base}/como-votar/`, lastModified: now },
    { url: `${base}/sumate/`, lastModified: now }
  ];
}
