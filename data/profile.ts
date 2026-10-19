export const profile = {
  name: "Amit Verma",
  displayName: "AMIT VERMA",
  brandMark: "AV(R)",
  title: "Frontend Developer",
  location: "Kota, India",
  email: "amverma1204t@gmail.com",
  experienceYears: 5,
  userScale: "5K–50K+",
  techSummary: "React / Next.js / TypeScript",
  seo: {
    title: "Amit Verma — Frontend Developer",
    description:
      "Frontend developer with 5 years of experience building dashboards, platforms and websites for products used by 5K to 50K+ people.",
    imageAlt: "Amit Verma — Frontend Developer (React, Next.js, TypeScript)",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/amit-verma-2a46971b4/",
    github: "https://github.com/it-is-amit",
    resume: "/resume.txt",
  },
  hero: {
    roleLabel: "FRONTEND DEVELOPER · UI/UX MINDSET",
    portfolioLabel: "PORTFOLIO 2026",
    tagline: "I build thoughtful, polished web experiences.",
    intro: "Frontend Developer. React, Next.js, TypeScript.",
    locationLine: "Based in Kota, India. Open to senior frontend roles.",
    scrollBadge: "SCROLL TO EXPLORE",
    marquee: "REACT · NEXT.JS · TYPESCRIPT · SEO · PERFORMANCE · UI/UX ·",
  },
  about: {
    statement:
      "I design and build fast, scalable web products. 5 years of turning ideas into polished interfaces with React, Next.js and TypeScript.",
    supporting:
      "I started as a UI/UX designer, then moved into frontend development. That design background is why my interfaces feel polished, and why I can work closely with designers and backend teams.",
    stats: [
      { id: "experience", value: "5", countTo: 5, suffix: "", label: "Years of experience" },
      { id: "react-years", value: "4+", countTo: 4, suffix: "+", label: "Years in React / Next.js / TypeScript" },
      { id: "user-range", value: "5K–50K+", countTo: 5, suffix: "K–50K+", label: "Users on products I've built" },
    ],
  },
  roleInterest:
    "Open to senior frontend and React / Next.js roles at product companies, in India and remote.",
  copyright: "© 2026 Amit Verma",
  builtWith: "Built with Next.js, TypeScript, GSAP and Lenis.",
  localTimeZone: "Asia/Kolkata",
} as const;

export const copy = {
  skipToContent: "Skip to main content",
  navigationLabel: "Main navigation",
  currentSection: "Current section",
  intro: "Intro",
  profileSnapshot: "Profile snapshot",
  yearsExperience: "Years of experience",
  siteFooter: "Site footer",
  journeyIntro: "I started in UI/UX design, which shapes how I build interfaces today.",
  menu: "Menu",
  openMenu: "Open full-screen menu",
  closeMenu: "Close menu",
  close: "Close",
  services: "Services",
  journey: "Journey",
  stack: "Stack",
  localTime: "Kota local time",
  scroll: "Scroll to explore",
  backToTop: "Back to top",
  preloaderLabel: "AMIT VERMA, FRONTEND DEVELOPER",
  servicesEyebrow: "01 / What I do",
  servicesTitle: "WHAT I DO",
  contact: "Contact",
  journeyCaption: "From designer to frontend developer",
  journeyTitle: "JOURNEY",
  journeyEducation: "Education",
  recognition: "Recognition",
  stackEyebrow: "03 / Skills",
  stackTitle: "TOOLS & TECH",
  linkedIn: "LinkedIn",
  github: "GitHub",
  downloadResume: "Download resume",
  email: "Email",
  timeLabel: "Kota, India",
  srOpenTo: "Open to senior frontend roles",
  nextPanel: "Scroll for next panel",
  panelProgress: "Panel progress",
  unknown: "[ADD]",
} as const;

export const navigation = [
  { id: "hero", label: "Home", index: "00" },
  { id: "what-i-do", label: "What I Do", index: "01" },
  { id: "proof", label: "Scale", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "journey", label: "Journey", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

export const services = [
  {
    id: "frontend-development",
    number: "01",
    title: "Frontend Development",
    description: "Accessible React, Next.js, and TypeScript experiences built to last.",
  },
  {
    id: "uiux-design",
    number: "02",
    title: "UI/UX Design",
    description: "Clear flows and thoughtful interfaces shaped by a designer’s eye.",
  },
  {
    id: "animation-interaction",
    number: "03",
    title: "Animation & Interaction",
    description: "Subtle motion that makes interfaces responsive and engaging.",
  },
  {
    id: "performance-accessibility",
    number: "04",
    title: "Performance & Accessibility",
    description: "Fast, inclusive experiences that work across devices.",
  },
] as const;

export const journey = [
  {
    id: "kriscent-frontend",
    year: "2024",
    period: "JUL 2024 — PRESENT",
    role: "Frontend Developer",
    company: "Kriscent Techno Hub, Kota",
    description:
      "Fleet management dashboards, social media, e-commerce and AI astrology platforms, and the company website redesign. Worked in a 6 to 8 member team and led the full frontend on several projects.",
  },
  {
    id: "vysion-frontend",
    year: "2022",
    period: "MAY 2022 — MAY 2024",
    role: "Frontend Developer",
    company: "Vysion Technology",
    description:
      "Built OCEMS, the Vidhya Bharti School website and admin, AttachClub admin dashboard, plus company and client websites.",
  },
  {
    id: "vysion-designer",
    year: "2021",
    period: "JUN 2021 — APR 2022",
    role: "UI/UX Designer",
    company: "Vysion Technology",
    description:
      "Designed UI/UX for Gurucamp (EdTech), Dhruvaan (IoT device app) and the Decon IoT platform.",
  },
  {
    id: "safal-intern",
    year: "2021",
    period: "JAN 2021 — MAY 2021",
    role: "UI/UX Design Intern",
    company: "Safal Infotech Pvt. Ltd.",
    description:
      "Wireframes, user flows and prototypes for the Market Time stock market mobile app.",
  },
] as const;

export const education = {
  qualification: "B.Tech in Computer Science and Engineering",
  institution: "IIIT Surat",
  dates: "2017 to 2021",
} as const;

export const awards = [
  { title: "Employee of the Month" },
  { title: "Most Evergreen Person of the Year", organization: "Kriscent Techno Hub" },
] as const;

export const stackGroups = [
  {
    id: "core",
    title: "Core",
    items: ["React.js", "Next.js (SSR, SSG, CSR)", "TypeScript", "JavaScript (ES6+)"] as const,
  },
  {
    id: "state-data",
    title: "State and Data",
    items: ["Redux Toolkit", "TanStack Query", "React Hook Form", "REST APIs", "Axios"] as const,
  },
  {
    id: "styling-ui",
    title: "Styling and UI",
    items: ["HTML5", "CSS3", "Tailwind CSS", "Material UI", "Shadcn UI", "Bootstrap", "Framer Motion"] as const,
  },
  {
    id: "practices",
    title: "Practices",
    items: ["SEO", "Performance Optimization", "Responsive Design", "Reusable Component Architecture"] as const,
  },
  {
    id: "backend-tools",
    title: "Backend and Tools",
    items: ["Firebase", "MongoDB", "PostgreSQL", "Git", "GitHub", "Postman", "Vercel", "Netlify", "Figma", "Adobe XD"] as const,
  },
] as const;

export type StackGroup = (typeof stackGroups)[number];
