import { readFile } from "node:fs/promises";
import path from "node:path";

const FONT_CDN = "https://cdn.jsdelivr.net/npm";

function localFontPath(...parts: string[]) {
  return path.join(process.cwd(), "node_modules", ...parts);
}

async function loadFont(
  cdnUrl: string,
  localRelative: string[],
): Promise<ArrayBuffer> {
  try {
    const res = await fetch(cdnUrl, { cache: "force-cache" });
    if (res.ok) return res.arrayBuffer();
  } catch {
    /* use local fallback */
  }
  const buf = await readFile(localFontPath(...localRelative));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function loadOgFonts() {
  const [dmSansRegular, dmSansBold, manropeExtraBold] = await Promise.all([
    loadFont(
      `${FONT_CDN}/@fontsource/dm-sans@5.2.8/files/dm-sans-latin-400-normal.woff`,
      ["@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff"],
    ),
    loadFont(
      `${FONT_CDN}/@fontsource/dm-sans@5.2.8/files/dm-sans-latin-700-normal.woff`,
      ["@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff"],
    ),
    loadFont(
      `${FONT_CDN}/@fontsource/manrope@5.2.8/files/manrope-latin-800-normal.woff`,
      ["@fontsource/manrope/files/manrope-latin-800-normal.woff"],
    ),
  ]);

  return { dmSansRegular, dmSansBold, manropeExtraBold };
}
