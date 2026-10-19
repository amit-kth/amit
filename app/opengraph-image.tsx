import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.seo.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "52px 64px",
        overflow: "hidden",
        background: "#10130F",
        color: "#F1F3E9",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{ position: "absolute", top: -170, right: -40, width: 560, height: 560, borderRadius: 280, background: "radial-gradient(circle, rgba(182,242,58,0.38) 0%, rgba(182,242,58,0) 70%)" }} />
        <div style={{ position: "absolute", bottom: -280, right: 120, width: 540, height: 540, borderRadius: 270, background: "radial-gradient(circle, rgba(112,143,78,0.28) 0%, rgba(112,143,78,0) 70%)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.12em", fontWeight: 700 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#B6F23A", color: "#17200D", fontSize: 15 }}>{profile.brandMark}</span>
            <span>{profile.hero.portfolioLabel}</span>
          </span>
          <span style={{ color: "#9DA596", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" }}>{profile.location}</span>
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ color: "#B6F23A", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em" }}>{profile.techSummary.toUpperCase()}</span>
          <span style={{ maxWidth: 990, fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.055em" }}>{profile.name}</span>
          <span style={{ maxWidth: 820, color: "#9DA596", fontSize: 23, lineHeight: 1.4 }}>{profile.seo.description}</span>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 16 }}>
          <span>{profile.email}</span>
          <span style={{ color: "#B6F23A", fontWeight: 700 }}>{profile.experienceYears} YEARS / {profile.userScale} USERS</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
