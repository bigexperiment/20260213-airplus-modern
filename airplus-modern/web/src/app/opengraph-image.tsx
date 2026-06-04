import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadOgFonts } from "@/lib/og-fonts";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og-image";
import { SITE_COLORS, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Treks & tours in Nepal`;
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const { background, backgroundTop, heading, primary, accent, brandNavy, border, white } =
  SITE_COLORS;

const LEFT_COL = 540;
const CARD_W = LEFT_COL - 8;
const CARD_H = Math.round((CARD_W * 3) / 4);

function publicPath(...parts: string[]) {
  return path.join(process.cwd(), "public", ...parts);
}

async function readPublic(...parts: string[]) {
  return readFile(publicPath(...parts));
}

export default async function Image() {
  try {
    const [fonts, heroBuffer, markBuffer] = await Promise.all([
      loadOgFonts(),
      readPublic("information/assets/hero_main.png"),
      readPublic("brand/airplusnepal-hiker-mark-tight.png"),
    ]);

    const heroSrc = `data:image/png;base64,${heroBuffer.toString("base64")}`;
    const markSrc = `data:image/png;base64,${markBuffer.toString("base64")}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: `linear-gradient(180deg, ${backgroundTop} 0%, ${background} 55%, #f1f5f9 100%)`,
            padding: "48px 52px",
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
                borderRadius: 24,
                border: `2px solid ${border}`,
                background: white,
                boxShadow: "0 12px 40px rgba(148, 163, 184, 0.18)",
                overflow: "hidden",
              }}
            >
              <img
                src={heroSrc}
                alt=""
                width={CARD_W}
                height={CARD_H}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  objectFit: "cover",
                  objectPosition: "bottom",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 36,
              }}
            >
              <img
                src={markSrc}
                alt=""
                width={80}
                height={46}
                style={{ marginRight: 10 }}
              />
              <div
                style={{
                  display: "flex",
                  fontFamily: "Manrope",
                  fontSize: 38,
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
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: heading,
              }}
            >
              <span style={{ display: "flex" }}>Explore Nepal.</span>
              <span style={{ display: "flex", color: primary, marginTop: 8 }}>
                Live the adventure.
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts: [
          { name: "DM Sans", data: fonts.dmSansBold, weight: 700, style: "normal" },
          { name: "Manrope", data: fonts.manropeExtraBold, weight: 800, style: "normal" },
        ],
      },
    );
  } catch {
    const jpeg = await readPublic("og/share.jpg");
    return new Response(new Uint8Array(jpeg), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
