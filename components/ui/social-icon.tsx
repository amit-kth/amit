export type SocialPlatform = "instagram" | "linkedin" | "github";

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  if (platform === "instagram") {
    return (
      <svg className={className ?? "size-[19px]"} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="footer-instagram-gradient" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEDA75" />
            <stop offset="0.34" stopColor="#FA7E1E" />
            <stop offset="0.67" stopColor="#D62976" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="url(#footer-instagram-gradient)" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="url(#footer-instagram-gradient)" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" fill="#FEDA75" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg className={className ?? "size-[19px] text-[#0A66C2]"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 9v10M5 5.5v.1M10 19v-6.1a3.4 3.4 0 0 1 6.8 0V19M10 10v9" />
        <circle cx="5" cy="5.5" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg className={className ?? "size-[19px] text-[#F0F6FC]"} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.79 1.81 3.25 1.29.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.64 10.64 0 0 1 5.57 0c2.13-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}
