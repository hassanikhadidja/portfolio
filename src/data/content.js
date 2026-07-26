export const designer = {
  name: "Khadidja Hssn",
  firstName: "Alex",
  /** Navbar wordmark (Playfair italic, same treatment as About hero headline) */
  navBrandText: "Khadidja.",
  calendlyUrl: "https://calendly.com/khadidja-khaoila-hassani/30min?month=2026-05",
  /** Full-bleed hero background (home) */
  heroVideoSrc:
    "https://res.cloudinary.com/dbtkfjrvd/video/upload/v1777759925/12665405_2088_720_60fps_ld3elk.mp4",
  tagline: "Design Studio",
  /** Intro splash on first load / refresh */
  introSplashName: "Khadidja Hassani",
  introSplashTitle: "Full-Stack Web Developer",
  /** Production site URL for Open Graph (override with VITE_SITE_URL) */
  siteUrl: "https://buildwithkhadidja.com",
  bio: "I'm a Gen Z web designer & developer crafting stunning, conversion-focused websites for ambitious brands. I believe great design isn't just beautiful — it's built to perform.",
  bioLong: "I help startups and brands create clean, high-performing websites that reflect their true value. Combining strong design with smart UX, I focus on building experiences that attract, engage, and convert.",
  location: "New York, USA",
  email: "buildwith.khadidja@gmail.com",
  /**
   * Google Apps Script web app → appends a row to your Sheet.
   * Paste your /exec URL after Deploy → Web app (Anyone).
   */
  contactFormUrl:
    "https://script.google.com/macros/s/AKfycbzirMagrI4R6x9WHzziXmn5hrCTJ14aTR9frWtKtY3m5EmlQlLYTNVf5tSEMf049aw/exec",
  availability: true,
  aboutPhoto:
    "https://res.cloudinary.com/dbtkfjrvd/image/upload/v1780059861/photo_2026-05-29_14-03-52_ayefti.jpg",
  years: "4+",
  projects: "5",
  skills: ["Framer", "Webflow", "Shopify", "React", "UI/UX", "Branding"],
  /** Place your PDF at public/Khadidja-Hassani-CV.pdf or set a Cloudinary / hosted URL */
  cvUrl: "/Khadidja-Hassani-CV.pdf",
  cvFileName: "Khadidja-Hassani-CV.pdf",
  socials: {
    instagram: "#",
    linkedin: "https://www.linkedin.com/in/khadidja-khaoila-hassani-1a0426257?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    behance: "#",
    twitter: "#",
  }
};

export const projects = [
  { id: 1, slug: "ajbloks", title: "AjBloks", category: "Website Design & Development", year: "2025", tags: ["React", "E-Commerce", "Admin"], description: "Fully custom e-commerce for AJ BLOKS — 50+ toys, accounts, cart, loyalty, wholesale, FAQ, blog, and a full admin dashboard.", color: "linear-gradient(135deg, #0a1a2e 0%, #1a3a6e 45%, #0d1520 100%)" },
  { id: 2, slug: "badee-beauty", title: "Badee Beauty", category: "Website Design & Development", year: "2025", tags: ["React", "E-Commerce", "EmailJS"], description: "Custom storefront, admin dashboard, blog, and automated emails for an Algerian beauty brand.", color: "linear-gradient(135deg, #1a0a14 0%, #2d1522 45%, #0f080c 100%)" },
  { id: 3, slug: "bel-nco", title: "BEL*NCO", category: "Web Design", year: "2024", tags: ["Landing Page", "RTL", "Google Sheets"], description: "Arabic-first landing page and order capture for an Algerian skincare brand.", color: "linear-gradient(145deg, #252320 0%, #3a3632 50%, #181716 100%)" },
  { id: 4, slug: "digital-wedding-invitation-templates", title: "Digital Wedding Invitation Templates", category: "Website Design & Development", year: "2024", tags: ["Framer", "UI/UX"], description: "Interactive mobile invitation with intro, program, RSVP, maps, gifts, and optional guest management.", color: "linear-gradient(135deg, #2d1f38 0%, #4a3a5c 50%, #1e1528 100%)" },
  { id: 5, slug: "florea-paris-florist", title: "Floréa", category: "Website Design & Development", year: "2025", tags: ["Next.js", "E-Commerce", "React"], description: "Paris florist storefront with carousel, filterable catalog, cart, and VISA checkout. Mobile-first.", color: "linear-gradient(135deg, #3d2a35 0%, #5c4458 45%, #1f1419 100%)" },
];

export const services = [
  {
    id: 1,
    number: "01",
    title: "Portfolio — Sections",
    icon: "◈",
    description:
      "A single scrolling page: intro, project gallery, about and contact. A clean, simple way to launch your presence online.",
    details:
      "A single scrolling page: intro, project gallery, about and contact. A clean, simple way to launch your presence online.",
    platforms: ["One-page", "HTML/CSS/JS", "Responsive"],
    tags: ["One-page", "HTML/CSS/JS", "Responsive"],
    prices: {
      dzd: { label: "ALGERIA", display: "15,000 – 25,000 DA" },
      usd: { label: "USD", display: "$250 – 400" },
      eur: { label: "EUR", display: "€230 – 370" },
    },
    addOns: [
      {
        name: "Extra section",
        prices: { dzd: "+3,000 DA", usd: "+$45", eur: "+€40" },
      },
      {
        name: "Custom animation",
        prices: { dzd: "+5,000–8,000 DA", usd: "+$70–110", eur: "+€65–100" },
      },
      {
        name: "Blog",
        prices: { dzd: "+8,000 DA", usd: "+$110", eur: "+€100" },
      },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Portfolio — Pages",
    icon: "✦",
    description:
      "A multi-page structure with individual project pages, dedicated navigation, and layouts tailored to each piece of work.",
    details:
      "A multi-page structure with individual project pages, dedicated navigation, and layouts tailored to each piece of work.",
    platforms: ["Multi-page", "React", "Project pages"],
    tags: ["Multi-page", "React", "Project pages"],
    prices: {
      dzd: { label: "ALGERIA", display: "25,000 – 40,000 DA" },
      usd: { label: "USD", display: "$400 – 650" },
      eur: { label: "EUR", display: "€370 – 600" },
    },
    addOns: [
      {
        name: "Extra page",
        prices: { dzd: "+4,000–6,000 DA", usd: "+$60–90", eur: "+€55–85" },
      },
      {
        name: "Filter / sort projects",
        prices: { dzd: "+5,000 DA", usd: "+$75", eur: "+€70" },
      },
      {
        name: "Blog",
        prices: { dzd: "+10,000 DA", usd: "+$140", eur: "+€130" },
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Business Site + Dashboard",
    icon: "◎",
    description:
      "A one-page company landing paired with an admin dashboard (3–5 modules) with authentication to manage content, leads, and stats.",
    details:
      "A one-page company landing paired with an admin dashboard (3–5 modules) with authentication to manage content, leads, and stats.",
    platforms: ["Dashboard", "Auth", "React"],
    tags: ["Dashboard", "Auth", "React"],
    prices: {
      dzd: { label: "ALGERIA", display: "110,000 – 190,000 DA" },
      usd: { label: "USD", display: "$1,200 – 2,000" },
      eur: { label: "EUR", display: "€1,100 – 1,850" },
    },
    addOns: [
      {
        name: "Extra landing section",
        prices: { dzd: "+4,000–6,000 DA", usd: "+$55–85", eur: "+€50–80" },
      },
      {
        name: "Extra dashboard module",
        prices: { dzd: "+15,000–25,000 DA", usd: "+$170–280", eur: "+€155–260" },
      },
      {
        name: "Multi-role access",
        prices: { dzd: "+15,000 DA", usd: "+$170", eur: "+€155" },
      },
      {
        name: "Reports export",
        prices: { dzd: "+10,000 DA", usd: "+$115", eur: "+€105" },
      },
      {
        name: "Advanced form (quote/booking)",
        prices: { dzd: "+8,000 DA", usd: "+$90", eur: "+€85" },
      },
      {
        name: "Multilingual",
        prices: { dzd: "+12,000 DA", usd: "+$135", eur: "+€125" },
      },
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Landing Page",
    icon: "↗",
    description:
      "A high-conversion landing page: hero, services, social proof, and call to action — built for a launch or a campaign.",
    details:
      "A high-conversion landing page: hero, services, social proof, and call to action — built for a launch or a campaign.",
    platforms: ["Conversion", "HTML/CSS/JS", "Fast turnaround"],
    tags: ["Conversion", "HTML/CSS/JS", "Fast turnaround"],
    prices: {
      dzd: { label: "ALGERIA", display: "25,000 – 40,000 DA" },
      usd: { label: "USD", display: "$350 – 550" },
      eur: { label: "EUR", display: "€320 – 500" },
    },
    addOns: [
      {
        name: "Extra section",
        prices: { dzd: "+3,000–5,000 DA", usd: "+$45–70", eur: "+€40–65" },
      },
      {
        name: "Advanced animation",
        prices: { dzd: "+5,000 DA", usd: "+$70", eur: "+€65" },
      },
      {
        name: "Multilingual",
        prices: { dzd: "+10,000 DA", usd: "+$140", eur: "+€130" },
      },
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Wedding Invitation",
    icon: "✿",
    description:
      "An elegant mini-site with countdown, gallery, day-of schedule, and online RSVP — a digital keepsake as refined as a paper card.",
    details:
      "An elegant mini-site with countdown, gallery, day-of schedule, and online RSVP — a digital keepsake as refined as a paper card.",
    platforms: ["RSVP", "Custom design"],
    tags: ["RSVP", "Custom design"],
    prices: {
      dzd: { label: "ALGERIA", display: "8,000 – 15,000 DA" },
      usd: { label: "USD", display: "$80 – 150" },
      eur: { label: "EUR", display: "€75 – 140" },
    },
    addOns: [
      {
        name: "RSVP with guest management",
        prices: { dzd: "+3,000 DA", usd: "+$30", eur: "+€28" },
      },
      {
        name: "Reveal animation",
        prices: { dzd: "+4,000 DA", usd: "+$40", eur: "+€37" },
      },
      {
        name: "Confetti",
        prices: { dzd: "+2,000 DA", usd: "+$20", eur: "+€18" },
      },
      {
        name: "Multilingual",
        prices: { dzd: "+3,000 DA", usd: "+$30", eur: "+€28" },
      },
    ],
  },
  {
    id: 6,
    number: "06",
    title: "Business Website",
    icon: "🖥",
    description:
      "A 4–6 page institutional site: home, about, services, contact — a solid foundation for a complete professional presence.",
    details:
      "A 4–6 page institutional site: home, about, services, contact — a solid foundation for a complete professional presence.",
    platforms: ["4–6 pages", "HTML/CSS/JS", "SEO-ready"],
    tags: ["4–6 pages", "HTML/CSS/JS", "SEO-ready"],
    prices: {
      dzd: { label: "ALGERIA", display: "70,000 – 150,000 DA" },
      usd: { label: "USD", display: "$700 – 1,200" },
      eur: { label: "EUR", display: "€650 – 1,100" },
    },
    addOns: [
      {
        name: "Extra page",
        prices: { dzd: "+8,000–10,000 DA", usd: "+$80–100", eur: "+€75–95" },
      },
      {
        name: "Multilingual",
        prices: { dzd: "+15,000–20,000 DA", usd: "+$150–200", eur: "+€140–185" },
      },
      {
        name: "Blog",
        prices: { dzd: "+15,000 DA", usd: "+$150", eur: "+€140" },
      },
    ],
  },
  {
    id: 7,
    number: "07",
    title: "SaaS Websites",
    icon: "⚡",
    description:
      "A bespoke marketing site for a SaaS product: hero, features, pricing, testimonials, and a landing built to turn visitors into signups.",
    details:
      "A bespoke marketing site for a SaaS product: hero, features, pricing, testimonials, and a landing built to turn visitors into signups.",
    platforms: ["React", "Marketing site", "Conversion"],
    tags: ["React", "Marketing site", "Conversion"],
    prices: {
      dzd: { label: "ALGERIA", display: "300,000 – 600,000 DA" },
      usd: { label: "USD", display: "$3,500 – 6,000" },
      eur: { label: "EUR", display: "€3,200 – 5,500" },
    },
    addOns: [
      {
        name: "Extra page (features, changelog, about)",
        prices: { dzd: "+20,000–40,000 DA", usd: "+$230–460", eur: "+€210–420" },
      },
      {
        name: "Pricing calculator / interactive component",
        prices: { dzd: "+30,000–50,000 DA", usd: "+$350–580", eur: "+€320–530" },
      },
      {
        name: "Full design system (multi-page brand kit)",
        prices: { dzd: "+150,000 DA+", usd: "+$1,700+", eur: "+€1,550+" },
      },
    ],
  },
  {
    id: 8,
    number: "08",
    title: "Complex Website / E-commerce",
    icon: "◈",
    description:
      "A full online store: 20+ front-end pages, catalog, cart, checkout, and a 10-module admin dashboard to run the whole business.",
    details:
      "A full online store: 20+ front-end pages, catalog, cart, checkout, and a 10-module admin dashboard to run the whole business.",
    platforms: ["E-commerce", "Dashboard", "Payments"],
    tags: ["E-commerce", "Dashboard", "Payments"],
    prices: {
      dzd: { label: "ALGERIA", display: "250,000 – 600,000 DA" },
      usd: { label: "USD", display: "$2,500 – 5,000" },
      eur: { label: "EUR", display: "€2,300 – 4,600" },
    },
    addOns: [
      {
        name: "Extra dashboard module",
        prices: { dzd: "+15,000–30,000 DA", usd: "+$150–300", eur: "+€140–275" },
      },
      {
        name: "Payment gateway (CIB/Edahabia or Stripe/PayPal)",
        prices: { dzd: "+40,000–60,000 DA", usd: "+$400–600", eur: "+€370–550" },
      },
      {
        name: "Multilingual",
        prices: { dzd: "+30,000 DA", usd: "+$300", eur: "+€280" },
      },
      {
        name: "Custom product/category page",
        prices: { dzd: "+3,000–5,000 DA", usd: "+$30–50", eur: "+€28–46" },
      },
    ],
  },
  {
    id: 9,
    number: "09",
    title: "SEO",
    icon: "↗",
    description:
      "Technical audit, on-page optimization, and monthly tracking to grow your site's visibility and organic traffic over time.",
    details:
      "Technical audit, on-page optimization, and monthly tracking to grow your site's visibility and organic traffic over time.",
    platforms: ["Audit", "On-page", "Monthly tracking"],
    tags: ["Audit", "On-page", "Monthly tracking"],
    prices: {
      dzd: { label: "ALGERIA", display: "15,000 – 30,000 DA (audit)" },
      usd: { label: "USD", display: "$150 – 300" },
      eur: { label: "EUR", display: "€140 – 280" },
    },
    addOns: [
      {
        name: "On-page optimization (per page)",
        prices: { dzd: "+3,000–5,000 DA", usd: "+$30–50", eur: "+€28–46" },
      },
      {
        name: "Monthly tracking",
        prices: { dzd: "+15,000–40,000 DA/mo", usd: "+$150–400/mo", eur: "+€140–370/mo" },
      },
      {
        name: "Extra optimized article",
        prices: { dzd: "+3,000–5,000 DA", usd: "+$30–50", eur: "+€28–46" },
      },
      {
        name: "Small site (4–6 pages), flat",
        prices: { dzd: "+15,000–25,000 DA", usd: "+$150–250", eur: "+€140–230" },
      },
      {
        name: "Larger site (10+ pages)",
        prices: {
          dzd: "+base audit + 3,000–5,000 DA/page",
          usd: "base $150–250 + $30–50/page",
          eur: "base €140–230 + €28–46/page",
        },
      },
      {
        name: "Ongoing optimization",
        prices: {
          dzd: "+15,000–40,000 DA/mo (instead of a flat fee)",
          usd: "+$150–400/mo (instead of a flat fee)",
          eur: "+€140–370/mo (instead of a flat fee)",
        },
      },
    ],
  },
];

export const process = [
  { step: "01", title: "Discovery Call", description: "We start with a 30-min call to understand your goals, audience, and vision. No fluff, just clarity." },
  { step: "02", title: "Strategy & Wireframes", description: "I map the user journey and wireframe the key pages, ensuring the structure serves your conversion goals." },
  { step: "03", title: "Design & Development", description: "High-fidelity designs, then built pixel-perfect in React & Next.js with smooth, performant animations." },
  { step: "04", title: "Launch & Handoff", description: "We do a thorough review, I handle revisions, then deliver a fully launched site with a video walkthrough." },
];

export const features = [
  { icon: "⚡", title: "Fast Turnarounds", description: "Most projects delivered in 2–4 weeks without sacrificing quality." },
  { icon: "✦", title: "Conversion-Focused", description: "Every design decision is made with your business goals in mind." },
  { icon: "◈", title: "Premium Aesthetic", description: "Editorial-quality design that makes your brand unforgettable." },
  { icon: "◎", title: "Fully Responsive", description: "Pixel-perfect on every device, from mobile to 4K displays." },
  { icon: "↗", title: "SEO Optimized", description: "Clean code and technical SEO so your site gets found." },
  { icon: "✿", title: "Ongoing Support", description: "Post-launch support and maintenance so you're never left stranded." },
];

export const pricing = [
  {
    tier: "Starter", price: "Starting from $1,500",
    description: "Perfect for early-stage founders who need a polished online presence fast.",
    features: ["Up to 5 pages", "Mobile responsive", "Basic animations", "Contact form", "1 revision round", "7-day delivery"],
  },
  {
    tier: "Professional", price: "Starting from $3,500",
    description: "For growing brands ready to invest in a website that seriously converts.",
    features: ["Up to 10 pages", "Custom animations", "CMS integration", "SEO setup", "3 revision rounds", "14-day delivery", "30-day support"],
    featured: true,
  },
  {
    tier: "Premium", price: "Starting from $6,000",
    description: "Full-service design & development for brands who want the best of the best.",
    features: ["Unlimited pages", "Full brand system", "E-commerce setup", "Analytics integration", "Unlimited revisions", "Priority delivery", "90-day support", "Monthly retainer option"],
  },
];

export const faqs = [
  { q: "How long does a project typically take?", a: "Most websites take 2–4 weeks from kick-off to launch. Larger websites or applications with advanced features, custom integrations, or e-commerce typically take 4–8 weeks. I'll provide a precise timeline during our discovery call." },
  { q: "Do you work with clients worldwide?", a: "Absolutely! I work with clients globally. All meetings happen over Zoom and deliverables are handled digitally, so location is never a barrier." },
  { q: "What platforms do you build on?", a: "I specialize in React & Next.js, building custom-coded web applications tailored to your business. Every project is developed for performance, scalability, SEO, and a seamless user experience." },
  { q: "How does payment work?", a: "Projects are split into two payments: 50% upfront to secure your project and 50% upon final delivery. For clients in Algeria, I accept CCP and Edahabia. International clients can pay securely via PayPal or RedotPay." },
  { q: "Do you offer ongoing support after launch?", a: "Yes! Every project includes 15 days of post-launch support to fix any bugs and ensure everything runs smoothly. Additional updates, new features, or design changes can be provided as a separate service." },
  { q: "Can you redesign my existing website?", a: "Yes. I can enhance existing websites and web applications by improving the interface, performance, and functionality. The scope depends on your current tech stack and whether the source code is available." },
];

export const marqueeItems = ["Web Design", "Branding", "UI/UX", "Conversion-Focused", "Editorial Aesthetic", "EmailJS", "Klaviyo", "AI automation", "n8n", "Social Media Management"];
