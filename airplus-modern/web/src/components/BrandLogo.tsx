import Image from "next/image";
import { Manrope } from "next/font/google";

type BrandLogoProps = {
  showWordmark?: boolean;
  small?: boolean;
  className?: string;
};

const brandFont = Manrope({ subsets: ["latin"], display: "swap", weight: ["600", "700", "800"] });

const MARK_SRC = "/brand/airplusnepal-hiker-mark-tight.png";

export default function BrandLogo({
  showWordmark = true,
  small = false,
  className = "",
}: BrandLogoProps) {
  const markClass = small ? "h-10 w-auto shrink-0 md:h-11" : "h-12 w-auto shrink-0";
  const textSize = small ? "text-[1.2rem] md:text-[1.35rem]" : "text-[1.5rem]";

  return (
    <span className={`inline-flex items-center gap-1 ${className}`.trim()}>
      <Image
        src={MARK_SRC}
        alt=""
        width={455}
        height={259}
        className={markClass}
        priority={small}
        aria-hidden="true"
      />
      {showWordmark && (
        <span className={`leading-none ${brandFont.className}`}>
          <span className={`font-extrabold tracking-[-0.01em] text-[#0d2d5e] ${textSize}`}>
            Airplus<span className="text-[#ea580c]">nepal</span>
          </span>
        </span>
      )}
    </span>
  );
}
