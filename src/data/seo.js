/**
 * Social / Open Graph defaults.
 * Set VITE_SITE_URL in .env to your live domain (no trailing slash).
 * Must match the URL people actually share — a dead custom domain breaks WhatsApp/Telegram/Messenger.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://portfolio-m38t.vercel.app'
).replace(/\/$/, '');

/** Exact 1200×630 JPEG — absolute URL required by Facebook / WhatsApp / Telegram / Instagram */
export const OG_IMAGE =
  'https://res.cloudinary.com/dbtkfjrvd/video/upload/so_0,w_1200,h_630,c_fill,q_auto:good,f_jpg/v1777759925/12665405_2088_720_60fps_ld3elk.jpg';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const DEFAULT_SEO = {
  en: {
    title: 'Berry Studio — Web Design & Development',
    description:
      'Berry Studio builds fast, scalable websites and apps with React, Next.js, Node.js, and MongoDB for ambitious brands.',
    siteName: 'Berry Studio',
  },
  fr: {
    title: 'Berry Studio — Design & développement web',
    description:
      'Berry Studio crée des sites et apps rapides et scalables avec React, Next.js, Node.js et MongoDB pour les marques ambitieuses.',
    siteName: 'Berry Studio',
  },
};

export const ROUTE_SEO = {
  '/': {
    en: { title: 'Berry Studio — Web Design & Development', description: DEFAULT_SEO.en.description },
    fr: { title: 'Berry Studio — Design & développement web', description: DEFAULT_SEO.fr.description },
  },
  '/about': {
    en: {
      title: 'About — Berry Studio',
      description: 'Background, process, and selected work from Berry Studio.',
    },
    fr: {
      title: 'À propos — Berry Studio',
      description: 'Parcours, process et travaux sélectionnés de Berry Studio.',
    },
  },
  '/projects': {
    en: {
      title: 'Projects — Berry Studio',
      description: 'Selected web design and development projects: e-commerce, landing pages, SaaS, and more.',
    },
    fr: {
      title: 'Projets — Berry Studio',
      description: 'Projets web sélectionnés : e-commerce, landing pages, SaaS et plus encore.',
    },
  },
  '/services': {
    en: {
      title: 'Services — Berry Studio',
      description: 'Web development packages: portfolios, business sites, SaaS, e-commerce, and SEO. Transparent pricing.',
    },
    fr: {
      title: 'Services — Berry Studio',
      description: 'Packages de développement web : portfolios, sites pro, SaaS, e-commerce et SEO. Tarifs transparents.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact — Berry Studio',
      description: 'Start a project with Berry Studio.',
    },
    fr: {
      title: 'Contact — Berry Studio',
      description: 'Lancez un projet avec Berry Studio.',
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
