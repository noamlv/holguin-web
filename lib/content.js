import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const contentPath = path.join(process.cwd(), "contenido.md");

const SECTION_ORDER = ["INICIO", "PERFIL", "VIDA Y TRAYECTORIA", "PROPUESTAS", "VISIÓN", "FRASE FINAL"];

function normalizeBreaks(text) {
  return text.replace(/\r\n/g, "\n").replace(/\u00a0/g, " ");
}

function findSectionBounds(raw, title, nextTitles) {
  const header = `# ${title}`;
  const start = raw.indexOf(header);
  if (start === -1) return null;

  const bodyStart = start + header.length;
  let end = raw.length;
  for (const nextTitle of nextTitles) {
    const nextHeader = `# ${nextTitle}`;
    const nextIndex = raw.indexOf(nextHeader, bodyStart);
    if (nextIndex !== -1 && nextIndex < end) end = nextIndex;
  }
  return { start, bodyStart, end };
}

function cleanSectionBody(text) {
  return text
    .replace(/^\s+/, "")
    .replace(/\n?---+\n?/g, "\n")
    .trim();
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .filter((chunk) => !chunk.startsWith("#"));
}

function parseChecklist(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/^✔\s*/, "").trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("Una agenda clara"));
}

function parseSubsections(sectionText) {
  const matches = [...sectionText.matchAll(/^##\s+(.+)$/gm)];
  if (matches.length === 0) return [];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : sectionText.length;
    const rawMarkdown = sectionText.slice(start, end).trim();
    return {
      title,
      rawMarkdown,
      paragraphs: splitParagraphs(rawMarkdown)
    };
  });
}

function parseProposalAxes(sectionText) {
  const matches = [...sectionText.matchAll(/^##\s+EJE\s+(\d+):\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const axisNumber = match[1];
    const title = match[2].trim();
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : sectionText.length;
    const chunk = sectionText.slice(start, end).trim();

    const subMatches = [...chunk.matchAll(/^###\s+(.+)$/gm)];
    const sections = subMatches.length
      ? subMatches.map((sub, subIndex) => {
          const subStart = sub.index + sub[0].length;
          const subEnd = subIndex + 1 < subMatches.length ? subMatches[subIndex + 1].index : chunk.length;
          return {
            heading: sub[1].trim(),
            body: chunk.slice(subStart, subEnd).trim()
          };
        })
      : [{ heading: "Contenido", body: chunk }];

    return {
      label: `Eje ${axisNumber}`,
      axisNumber,
      title,
      sections
    };
  });
}

function extractCandidateHeader(raw) {
  const nameMatch = raw.match(/^#\s+(.+)$/m);
  const roleMatch = raw.match(/^##\s+(.+)$/m);
  const phoneMatch = raw.match(/📞\s*([0-9 ]+)/);
  const socialMatch = raw.match(/📲\s*([^\n]+)/);

  return {
    name: nameMatch?.[1]?.trim() || "César Augusto Holguín Loaiza",
    roleLine: roleMatch?.[1]?.trim() || "Candidato a Diputado por Cusco – Ahora Nación",
    phone: phoneMatch?.[1]?.trim() || "955 413 488",
    phoneDigits: (phoneMatch?.[1] || "955413488").replace(/\D+/g, ""),
    social: socialMatch?.[1]?.trim() || "@CesarHolguín"
  };
}

export const getCampaignContent = cache(() => {
  const raw = normalizeBreaks(fs.readFileSync(contentPath, "utf8"));
  const candidate = extractCandidateHeader(raw);

  const sections = {};
  for (let i = 0; i < SECTION_ORDER.length; i += 1) {
    const title = SECTION_ORDER[i];
    const nextTitles = SECTION_ORDER.slice(i + 1);
    const bounds = findSectionBounds(raw, title, nextTitles);
    if (!bounds) continue;
    const body = cleanSectionBody(raw.slice(bounds.bodyStart, bounds.end));
    const headingMatch = body.match(/^##\s+(.+)$/m);
    const summaryParagraphs = splitParagraphs(body);

    sections[title] = {
      title,
      rawMarkdown: body,
      heading: headingMatch?.[1]?.trim() || "",
      paragraphs: summaryParagraphs,
      summary: summaryParagraphs[0] || ""
    };
  }

  if (sections["VIDA Y TRAYECTORIA"]) {
    sections["VIDA Y TRAYECTORIA"].subsections = parseSubsections(sections["VIDA Y TRAYECTORIA"].rawMarkdown);
  }

  if (sections["VISIÓN"]) {
    sections["VISIÓN"].checklist = parseChecklist(sections["VISIÓN"].rawMarkdown);
  } else {
    sections["VISIÓN"] = { checklist: [] };
  }

  const proposalsMarkdown = sections.PROPUESTAS?.rawMarkdown || "";
  const proposals = {
    axes: parseProposalAxes(proposalsMarkdown)
  };

  return {
    candidate,
    sections,
    proposals
  };
});
