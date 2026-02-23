import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "assets");
const publicAssetsDir = path.join(root, "public", "assets");
const manifestPath = path.join(publicAssetsDir, "manifest.json");

function slugifyFileName(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  return (
    base
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() + ext
  );
}

function inferUseHint(fileName) {
  const f = fileName.toLowerCase();
  if (f.includes("mapa")) return "cusco-map";
  if (f.includes("19.13.53")) return "candidate-portrait";
  if (f.includes("19.14.06")) return "how-to-vote";
  if (f.includes("captura")) return "campaign-logo-art";
  if (f.includes("gemini")) return "campaign-flyer";
  return "general";
}

function mimeType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".heic" || ext === ".heif") return "image/heic";
  return "application/octet-stream";
}

if (!fs.existsSync(sourceDir)) {
  console.warn("No se encontró carpeta assets/. Se omite sincronización.");
  process.exit(0);
}

fs.mkdirSync(publicAssetsDir, { recursive: true });

const files = fs
  .readdirSync(sourceDir)
  .filter((name) => fs.statSync(path.join(sourceDir, name)).isFile());

const usedNames = new Set();
const manifest = [];

for (const originalName of files) {
  let safeName = slugifyFileName(originalName);
  const ext = path.extname(safeName);
  const stem = path.basename(safeName, ext);
  let count = 2;
  while (usedNames.has(safeName)) {
    safeName = `${stem}-${count}${ext}`;
    count += 1;
  }
  usedNames.add(safeName);

  const src = path.join(sourceDir, originalName);
  const dest = path.join(publicAssetsDir, safeName);
  fs.copyFileSync(src, dest);

  manifest.push({
    originalName,
    fileName: safeName,
    publicPath: `/assets/${safeName}`,
    mimeType: mimeType(safeName),
    sizeBytes: fs.statSync(dest).size,
    useHint: inferUseHint(originalName)
  });
}

manifest.sort((a, b) => a.fileName.localeCompare(b.fileName, "es"));
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log(`Assets sincronizados: ${manifest.length}`);
