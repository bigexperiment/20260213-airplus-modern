/**
 * Regenerates public/og/share.jpg — run: npm run generate:og
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { OG_HEIGHT, OG_WIDTH } from "../src/lib/og-image";

function publicPath(...parts: string[]) {
  return path.join(process.cwd(), "public", ...parts);
}

async function main() {
  const heroBuffer = await readFile(publicPath("information/assets/hero_main.png"));

  const jpeg = await sharp(heroBuffer)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "bottom" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const out = publicPath("og/share.jpg");
  await writeFile(out, jpeg);
  console.log(`Wrote ${out} (${jpeg.length} bytes, ${OG_WIDTH}x${OG_HEIGHT})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
