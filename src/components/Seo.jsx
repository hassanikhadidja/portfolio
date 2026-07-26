import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { getProjectDetail } from '../data/projectDetails';
import { localizeProjectDetail } from '../i18n/useLocalizedContent';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, resolveSeo } from '../data/seo';

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Keeps title + Open Graph / Twitter tags in sync for link previews. */
export default function Seo() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    let projectTitle;
    let projectDesc;
    let projectImage;

    if (pathname.startsWith('/projects/') && pathname !== '/projects') {
      const slug = pathname.replace(/^\/projects\//, '').split('/')[0];
      const detail = localizeProjectDetail(getProjectDetail(slug), lang);
      if (detail) {
        projectTitle = detail.heroTitle;
        projectDesc = detail.heroDesc;
        projectImage = detail.heroFrameImage || detail.coverImage || undefined;
      }
    }

    const seo = resolveSeo({ pathname, lang, projectTitle, projectDesc });
    const image = projectImage || seo.image;

    document.title = seo.title;
    document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'author', seo.siteName);
    upsertMeta('name', 'theme-color', '#0a0a0a');

    // Open Graph — Facebook, Messenger, WhatsApp, Telegram, LinkedIn, etc.
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', seo.siteName);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.url);
    upsertMeta('property', 'og:locale', seo.locale);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:secure_url', image);
    upsertMeta('property', 'og:image:type', 'image/jpeg');
    upsertMeta('property', 'og:image:width', String(OG_IMAGE_WIDTH));
    upsertMeta('property', 'og:image:height', String(OG_IMAGE_HEIGHT));
    upsertMeta('property', 'og:image:alt', seo.title);

    // Twitter / X (also used by some Instagram / TikTok scrapers)
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', seo.title);

    upsertLink('canonical', seo.url);
  }, [pathname, lang]);

  return null;
}
