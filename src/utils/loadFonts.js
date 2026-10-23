const loaded = new Set();

/** Load a Google Fonts CSS URL once (non-blocking). */
export function loadGoogleFont(href) {
  if (typeof document === 'undefined' || !href || loaded.has(href)) return;
  loaded.add(href);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
}

export const FONT_SORA =
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap';
export const FONT_GEIST =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap';
export const FONT_PROJECT_DETAIL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Bebas+Neue&display=swap';
