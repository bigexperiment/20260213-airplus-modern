import Image from "next/image";

type BrandLogoProps = {
  showWordmark?: boolean;
  small?: boolean;
  className?: string;
};

export default function BrandLogo({
  showWordmark = true,
  small = false,
  className = "",
}: BrandLogoProps) {
  const markSize = small ? 42 : 52;
  const textSize = small ? "text-[1.35rem] md:text-[1.8rem]" : "text-[2.05rem]";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <span
        className="inline-flex items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-white shadow-sm"
        style={{ width: markSize, height: markSize }}
        aria-hidden="true"
      >
        <Image
          src="/logo-custom.png"
          alt=""
          width={markSize}
          height={markSize}
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </span>
      {showWordmark && (
        <span className="leading-none">
          <span className={`display-face font-extrabold tracking-[-0.045em] text-[#0d2d5e] ${textSize}`}>
            Airplus<span className="text-[#f07f17]">nepal</span>
          </span>
        </span>
      )}
    </span>
  );
}
