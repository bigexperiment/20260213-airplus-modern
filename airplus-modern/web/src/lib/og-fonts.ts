import { readFile } from "node:fs/promises";
import path from "node:path";

function fontPath(...parts: string[]) {
  return path.join(process.cwd(), "node_modules", ...parts);
}

export async function loadOgFonts() {
  const [dmSansRegular, dmSansBold, manropeBold, manropeExtraBold] = await Promise.all([
    readFile(fontPath("@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff")),
    readFile(fontPath("@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff")),
    readFile(fontPath("@fontsource/manrope/files/manrope-latin-700-normal.woff")),
    readFile(fontPath("@fontsource/manrope/files/manrope-latin-800-normal.woff")),
  ]);

  return {
    dmSansRegular,
    dmSansBold,
    manropeBold,
    manropeExtraBold,
  };
}
