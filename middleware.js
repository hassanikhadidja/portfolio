import { next } from '@vercel/edge';
import { buildOgHtml } from './og-meta.mjs';

/**
 * Social scrapers (WhatsApp, Telegram, Messenger, Instagram, Facebook, etc.)
 * do not execute JavaScript. Serve static Open Graph HTML with og:url matching
 * the shared host so previews work on both vercel.app and a custom domain.
 */
const SOCIAL_BOT =
  /facebookexternalhit|Facebot|FacebookBot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|SkypeUriPreview|Pinterest|redditbot|Embedly|Quora Link Preview|Iframely|VKShare|W3C_Validator|Google.*snippet|Applebot/i;

export const config = {
  matcher: ['/', '/about', '/projects', '/projects/:path*', '/services', '/contact'],
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!SOCIAL_BOT.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const html = buildOgHtml({ origin: url.origin, pathname: url.pathname });

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=300, stale-while-revalidate=86400',
      'x-robots-tag': 'all',
    },
  });
}
