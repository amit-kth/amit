import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.seo.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "52px 64px",
        background: "#F1F5F9",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.12em", fontWeight: 700 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#862FE7", color: "#FFFFFF", fontSize: 15 }}>{profile.brandMark}</span>
            <span>{profile.hero.portfolioLabel}</span>
          </span>
          <span style={{ color: "#6B7589", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" }}>{profile.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ width: 72, height: 4, borderRadius: 2, background: "#862FE7" }} />
          <span style={{ color: "#5F259E", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em" }}>{profile.techSummary.toUpperCase()}</span>
          <span style={{ maxWidth: 990, fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.055em" }}>{profile.name}</span>
          <span style={{ maxWidth: 820, color: "#3F4654", fontSize: 23, lineHeight: 1.4 }}>{profile.seo.description}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid #D8E0EA", fontSize: 16 }}>
          <span>{profile.email}</span>
          <span style={{ color: "#5F259E", fontWeight: 700 }}>{profile.experienceYears} YEARS / {profile.userScale} USERS</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
