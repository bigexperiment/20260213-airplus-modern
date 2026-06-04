/**
 * Regenerates public/og/share.jpg — run: npm run generate:og
 */
import React from "react";
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { loadOgFonts } from "../src/lib/og-fonts";
import { OG_HEIGHT, OG_WIDTH } from "../src/lib/og-image";
import { SITE_COLORS, SITE_DOMAIN } from "../src/lib/site";

const PAD_X = 36;
const PAD_Y = 14;
const LEFT_COL = 520;
const CARD_W = LEFT_COL - 12;
const CARD_H = OG_HEIGHT - PAD_Y * 2;
const GAP = 36;

const { background, heading, primary, accent, brandNavy, border, white } = SITE_COLORS;

function publicPath(...parts: string[]) {
  return path.join(process.cwd(), "public", ...parts);
}

async function main() {
  const [fonts, heroBuffer, markBuffer] = await Promise.all([
    loadOgFonts(),
    readFile(publicPath("information/assets/hero_main.png")),
    readFile(publicPath("brand/airplusnepal-hiker-mark-tight.png")),
  ]);

  const [heroJpeg, markPng] = await Promise.all([
    sharp(heroBuffer)
      .resize(CARD_W, CARD_H, { fit: "cover", position: "bottom" })
      .jpeg({ quality: 92 })
      .toBuffer(),
    sharp(markBuffer)
      .resize(92, 53, { fit: "inside" })
      .png()
      .toBuffer(),
  ]);

  const heroSrc = `data:image/jpeg;base64,${heroJpeg.toString("base64")}`;
  const markSrc = `data:image/png;base64,${markPng.toString("base64")}`;

  const png = await new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background,
          padding: `${PAD_Y}px ${PAD_X}px`,
          fontFamily: "DM Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: `0 0 ${LEFT_COL}px`,
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: CARD_W,
              height: CARD_H,
              borderRadius: 20,
              border: `2px solid ${border}`,
              background: white,
              boxShadow: "0 8px 28px rgba(148, 163, 184, 0.2)",
              overflow: "hidden",
            }}
          >
            <img src={heroSrc} alt="" width={CARD_W} height={CARD_H} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: GAP,
            minWidth: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
            <img src={markSrc} alt="" width={92} height={53} style={{ marginRight: 12 }} />
            <div
              style={{
                display: "flex",
                fontFamily: "Manrope",
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              <span style={{ color: brandNavy }}>Airplus</span>
              <span style={{ color: accent }}>nepal</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "DM Sans",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: heading,
            }}
          >
            <span style={{ display: "flex" }}>Explore Nepal.</span>
            <span style={{ display: "flex", color: primary, marginTop: 6 }}>
              Live the adventure.
            </span>
            <span
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 40,
                fontWeight: 700,
                color: brandNavy,
                letterSpacing: "-0.02em",
              }}
            >
              {SITE_DOMAIN}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: "DM Sans", data: fonts.dmSansRegular, weight: 400, style: "normal" },
        { name: "DM Sans", data: fonts.dmSansBold, weight: 700, style: "normal" },
        { name: "Manrope", data: fonts.manropeExtraBold, weight: 800, style: "normal" },
      ],
    },
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png))
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const out = publicPath("og/share.jpg");
  await writeFile(out, jpeg);
  console.log(`Wrote ${out} (${jpeg.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
