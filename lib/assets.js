import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const manifestFile = path.join(process.cwd(), "public", "assets", "manifest.json");

export const getCampaignAssets = cache(() => {
  if (!fs.existsSync(manifestFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  } catch {
    return [];
  }
});

export function pickCampaignAssets(assets) {
  const byHint = (hint) => assets.find((a) => a.useHint === hint);
  const byOriginalIncludes = (text) => assets.find((a) => a.originalName.includes(text));
  const imageAssets = assets.filter((a) => String(a.mimeType).startsWith("image/"));
  const reserved = new Set(
    ["candidate-portrait", "how-to-vote", "campaign-logo-art", "campaign-flyer", "cusco-map"]
      .map((hint) => byHint(hint)?.fileName)
      .filter(Boolean)
  );
  const gallery = imageAssets
    .filter((a) => !reserved.has(a.fileName))
    .filter((a) => !["how-to-vote", "cusco-map"].includes(a.useHint))
    .sort((a, b) => {
      const aImg = /^img_/i.test(a.originalName) ? 0 : 1;
      const bImg = /^img_/i.test(b.originalName) ? 0 : 1;
      return aImg - bImg || a.originalName.localeCompare(b.originalName, "es");
    });

  const fixedHeroPortrait =
    byOriginalIncludes("Captura de pantalla 2026-02-23 a la(s) 8.51.57") ||
    byOriginalIncludes("Captura de pantalla 2026-02-23");

  return {
    portrait: fixedHeroPortrait || byHint("candidate-portrait") || imageAssets[0],
    voteGuide: byHint("how-to-vote"),
    logoArt: byHint("campaign-logo-art"),
    flyer: byHint("campaign-flyer"),
    map: byHint("cusco-map"),
    gallery
  };
}
