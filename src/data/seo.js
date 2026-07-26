/**
 * Social / Open Graph defaults.
 * Set VITE_SITE_URL in .env to your live domain (no trailing slash), e.g.:
 * VITE_SITE_URL=https://your-domain.com
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://buildwithkhadidja.com').replace(/\/$/, '');

/** 1200×630 OG image (Cloudinary) — absolute URL required by Facebook / WhatsApp / Telegram */
export const OG_IMAGE =
  'https://res.cloudinary.com/dbtkfjrvd/image/upload/c_fill,w_1200,h_630,g_face,q_auto,f_auto/v1780059861/photo_2026-05-29_14-03-52_ayefti.jpg';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const DEFAULT_SEO = {
  en: {
    title: 'Khadidja Hassani — Full-Stack Web Developer',
    description:
      'Full-Stack Web Developer specializing in React, Next.js, Node.js, and MongoDB. Fast, scalable websites and apps for ambitious brands.',
    siteName: 'Khadidja Hassani',
  },
  fr: {
    title: 'Khadidja Hassani — Développeuse Web Full-Stack',
    description:
      'Développeuse Web Full-Stack spécialisée en React, Next.js, Node.js et MongoDB. Sites et apps rapides et scalables pour les marques ambitieuses.',
    siteName: 'Khadidja Hassani',
  },
};

export const ROUTE_SEO = {
  '/': {
    en: { title: 'Khadidja Hassani — Full-Stack Web Developer', description: DEFAULT_SEO.en.description },
    fr: { title: 'Khadidja Hassani — Développeuse Web Full-Stack', description: DEFAULT_SEO.fr.description },
  },
  '/about': {
    en: {
      title: 'About — Khadidja Hassani',
      description: 'Background, process, and selected work from Full-Stack Web Developer Khadidja Hassani.',
    },
    fr: {
      title: 'À propos — Khadidja Hassani',
      description: 'Parcours, process et travaux sélectionnés de la développeuse Full-Stack Khadidja Hassani.',
    },
  },
  '/projects': {
    en: {
      title: 'Projects — Khadidja Hassani',
      description: 'Selected web design and development projects: e-commerce, landing pages, SaaS, and more.',
    },
    fr: {
      title: 'Projets — Khadidja Hassani',
      description: 'Projets web sélectionnés : e-commerce, landing pages, SaaS et plus encore.',
    },
  },
  '/services': {
    en: {
      title: 'Services — Khadidja Hassani',
      description: 'Web development packages: portfolios, business sites, SaaS, e-commerce, and SEO. Transparent pricing.',
    },
    fr: {
      title: 'Services — Khadidja Hassani',
      description: 'Packages de développement web : portfolios, sites pro, SaaS, e-commerce et SEO. Tarifs transparents.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact — Khadidja Hassani',
      description: 'Start a project or book a discovery call with Full-Stack Web Developer Khadidja Hassani.',
    },
    fr: {
      title: 'Contact — Khadidja Hassani',
      description: 'Lancez un projet ou réservez un appel découverte avec la développeuse Full-Stack Khadidja Hassani.',
    },
  },
};

export function resolveSeo({ pathname, lang = 'en', projectTitle, projectDesc } = {}) {
  const locale = lang === 'fr' ? 'fr' : 'en';
  const defaults = DEFAULT_SEO[locale];

  if (pathname?.startsWith('/projects/') && pathname !== '/projects') {
    const name = projectTitle || 'Project';
    return {
      title: `${name} — ${defaults.siteName}`,
      description: (projectDesc || defaults.description).replace(/\s+/g, ' ').trim().slice(0, 200),
      url: `${SITE_URL}${pathname}`,
      image: OG_IMAGE,
      siteName: defaults.siteName,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    };
  }

  const route = ROUTE_SEO[pathname] || ROUTE_SEO['/'];
  const copy = route[locale] || route.en;
  return {
    title: copy.title,
    description: copy.description,
    url: `${SITE_URL}${pathname === '/' ? '' : pathname}`,
    image: OG_IMAGE,
    siteName: defaults.siteName,
    locale: locale === 'fr' ? 'fr_FR' : 'en_US',
  };
}
