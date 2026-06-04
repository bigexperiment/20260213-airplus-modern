import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { loadOgFonts } from "@/lib/og-fonts";
import {
  OG_HEIGHT,
  OG_RENDER_HEIGHT,
  OG_RENDER_SCALE,
  OG_RENDER_WIDTH,
  OG_WIDTH,
} from "@/lib/og-image";
import { SITE_COLORS, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Treks & tours in Nepal`;
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/jpeg";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const S = OG_RENDER_SCALE;
const { background, backgroundTop, heading, primary, accent, brandNavy, border, white } =
  SITE_COLORS;

/** Hero card: same 4:3 frame as homepage (hero_main.png is 2364×1773) */
const LEFT_COL = 540 * S;
const CARD_W = Math.round(LEFT_COL - 8 * S);
const CARD_H = Math.round((CARD_W * 3) / 4);

export default async function Image() {
  const heroPath = path.join(process.cwd(), "public/information/assets/hero_main.png");
  const markPath = path.join(process.cwd(), "public/brand/airplusnepal-hiker-mark-tight.png");

  const [fonts, heroBuffer, markBuffer] = await Promise.all([
    loadOgFonts(),
    readFile(heroPath),
    readFile(markPath),
  ]);

  const [heroJpeg, markPng] = await Promise.all([
    sharp(heroBuffer)
      .resize(CARD_W, CARD_H, { fit: "cover", position: "bottom" })
      .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer(),
    sharp(markBuffer)
      .resize(Math.round(80 * S), Math.round(46 * S), { fit: "inside" })
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
          background: `linear-gradient(180deg, ${backgroundTop} 0%, ${background} 55%, #f1f5f9 100%)`,
          padding: `${48 * S}px ${52 * S}px`,
          fontFamily: "DM Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: `0 0 ${LEFT_COL}px`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: CARD_W,
              height: CARD_H,
              borderRadius: 24 * S,
              border: `${2 * S}px solid ${border}`,
              background: white,
              boxShadow: `0 ${12 * S}px ${40 * S}px rgba(148, 163, 184, 0.18)`,
              overflow: "hidden",
            }}
          >
            <img
              src={heroSrc}
              alt=""
              width={CARD_W}
              height={CARD_H}
              style={{ width: CARD_W, height: CARD_H }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 48 * S,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 36 * S,
            }}
          >
            <img
              src={markSrc}
              alt=""
              width={80 * S}
              height={46 * S}
              style={{ marginRight: 10 * S }}
            />
            <div
              style={{
                display: "flex",
                fontFamily: "Manrope",
                fontSize: 38 * S,
                fontWeight: 800,
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
              fontSize: 58 * S,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: heading,
            }}
          >
            <span style={{ display: "flex" }}>Explore Nepal.</span>
            <span style={{ display: "flex", color: primary, marginTop: 8 * S }}>
              Live the adventure.
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_RENDER_WIDTH,
      height: OG_RENDER_HEIGHT,
      fonts: [
        { name: "DM Sans", data: fonts.dmSansBold, weight: 700, style: "normal" },
        { name: "Manrope", data: fonts.manropeExtraBold, weight: 800, style: "normal" },
      ],
    },
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png))
    .resize(OG_WIDTH, OG_HEIGHT, { kernel: "lanczos3" })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  return new Response(new Blob([new Uint8Array(jpeg)], { type: "image/jpeg" }), {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
