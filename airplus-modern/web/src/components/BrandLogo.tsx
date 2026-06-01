import Image from "next/image";
import { Manrope } from "next/font/google";

type BrandLogoProps = {
  showWordmark?: boolean;
  small?: boolean;
  className?: string;
};

const brandFont = Manrope({ subsets: ["latin"], display: "swap", weight: ["600", "700", "800"] });

export default function BrandLogo({
  showWordmark = true,
  small = false,
  className = "",
}: BrandLogoProps) {
  // Keep the icon visually aligned with the wordmark height.
  const markSize = small ? 30 : 40;
  const textSize = small ? "text-[1.15rem] md:text-[1.25rem]" : "text-[1.4rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <Image
        src="/brand/airplusnepal-mark-v3.png"
        alt=""
        width={markSize}
        height={markSize}
        className="block h-auto w-auto"
        style={{ width: markSize, height: markSize }}
        aria-hidden="true"
      />
      {showWordmark && (
        <span className={`leading-none ${brandFont.className}`}>
          <span className={`font-extrabold tracking-[-0.01em] text-[#0d2d5e] ${textSize}`}>
            Airplus<span className="text-[#f07f17]">nepal</span>
          </span>
        </span>
      )}
    </span>
  );
}
