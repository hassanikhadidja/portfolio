/** Shared Open Graph defaults for static HTML + Vercel bot middleware. */

export const LIVE_SITE_URL = 'https://portfolio-m38t.vercel.app';

/** Exact 1200×630 JPEG — required by WhatsApp / Messenger / Telegram / Instagram */
export const OG_IMAGE =
  'https://res.cloudinary.com/dbtkfjrvd/image/upload/w_1200,h_630,c_fill,g_face,f_jpg,q_auto:good/v1785110493/photo_2026-07-27_01-01-10_kdbc94.jpg';

export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';

export const DEFAULT_META = {
  title: 'Khadidja Hassani — Full-Stack Web Developer',
  description:
    'Full-Stack Web Developer specializing in React, Next.js, Node.js, and MongoDB. Fast, scalable websites and apps for ambitious brands.',
  siteName: 'Khadidja Hassani',
};

export const ROUTE_META = {
  '/': DEFAULT_META,
  '/about': {
    title: 'About — Khadidja Hassani',
    description: 'Background, process, and selected work from Full-Stack Web Developer Khadidja Hassani.',
    siteName: DEFAULT_META.siteName,
  },
  '/projects': {
    title: 'Projects — Khadidja Hassani',
    description: 'Selected web design and development projects: e-commerce, landing pages, SaaS, and more.',
    siteName: DEFAULT_META.siteName,
  },
  '/services': {
    title: 'Services — Khadidja Hassani',
    description: 'Web development packages: portfolios, business sites, SaaS, e-commerce, and SEO. Transparent pricing.',
    siteName: DEFAULT_META.siteName,
  },
  '/contact': {
    title: 'Contact — Khadidja Hassani',
    description: 'Start a project or book a discovery call with Full-Stack Web Developer Khadidja Hassani.',
    siteName: DEFAULT_META.siteName,
  },
};

export function resolveMeta(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path.startsWith('/projects/') && path !== '/projects') {
    return {
      title: `Project — ${DEFAULT_META.siteName}`,
      description: DEFAULT_META.description,
      siteName: DEFAULT_META.siteName,
    };
  }
  return ROUTE_META[path] || DEFAULT_META;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Minimal HTML shell for social crawlers (they do not run JavaScript). */
export function buildOgHtml({ origin, pathname }) {
  const path = pathname.replace(/\/$/, '') || '/';
  const meta = resolveMeta(path);
  const pageUrl = `${origin}${path === '/' ? '' : path}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const siteName = escapeHtml(meta.siteName);
  const image = escapeHtml(OG_IMAGE);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="${siteName}" />
  <link rel="canonical" href="${escapeHtml(pageUrl)}" />
  <link rel="image_src" href="${image}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${siteName}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${escapeHtml(pageUrl)}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
  <meta property="og:image:alt" content="${title}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="${title}" />

  <meta itemprop="name" content="${title}" />
  <meta itemprop="description" content="${description}" />
  <meta itemprop="image" content="${image}" />
</head>
<body>
  <p>${title}</p>
</body>
</html>`;
}
