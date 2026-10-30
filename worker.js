// Sends every non-canonical URL (http://, www., .html, /index, trailing slash)
// to https://afronet.bio/<clean path> in a single 301, then serves the static
// assets for everything else. Cloudflare's own html_handling still maps
// /6aoc -> 6aoc.html, so the canonical URLs never redirect.

const HOST = 'afronet.bio';
const LANG_DIRS = ['fr', 'pt', 'sw'];
// Must stay reachable at their exact .html path.
const KEEP_AS_IS = ['/google39e493c7b7e76f50.html', '/404.html'];

function canonicalPath(path) {
  if (KEEP_AS_IS.includes(path) || path.startsWith('/assets/')) return path;

  let p = path;
  if (p.endsWith('.html')) p = p.slice(0, -5);
  else if (/\.[a-z0-9]+$/i.test(p)) return path; // sitemap.xml, robots.txt, images…

  p = p.replace(/\/index$/, '/');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);

  // Language homes are directories: /fr -> /fr/
  if (LANG_DIRS.includes(p.slice(1))) p += '/';
  return p;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = new URL(url);
    target.pathname = canonicalPath(url.pathname);

    // Only rewrite scheme/host for the live domains, so `wrangler dev` on localhost still works.
    if (url.hostname === HOST || url.hostname === `www.${HOST}`) {
      target.protocol = 'https:';
      target.hostname = HOST;
      target.port = '';
    }

    if (target.href !== url.href) return Response.redirect(target.href, 301);

    // html_handling would 307 these to their extensionless path; serve them in place instead.
    if (KEEP_AS_IS.includes(url.pathname)) {
      return env.ASSETS.fetch(new Request(new URL(url.pathname.slice(0, -5), url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
