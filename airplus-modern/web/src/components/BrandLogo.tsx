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
  const markSize = small ? 36 : 44;
  const textSize = small ? "text-base md:text-[2rem]" : "text-[2rem]";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <span
        className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white shadow-sm"
        style={{ width: markSize, height: markSize }}
        aria-hidden="true"
      >
        <svg width={markSize - 10} height={markSize - 10} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#F8FBFF" />
          <path d="M10 31.5L19.2 18L24 24.1L28.8 16L38 31.5" stroke="#1559C6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 35H36" stroke="#1559C6" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="33.5" cy="13.5" r="3" fill="#F48120" />
        </svg>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`display-face font-bold tracking-[-0.05em] text-foreground ${textSize}`}>
            Airplus<span className="text-accent">nepal</span>
          </span>
          <span className="mt-1 text-[11px] font-medium tracking-[0.06em] text-muted-foreground">
            Trekking & Adventure
          </span>
        </span>
      )}
    </span>
  );
}
