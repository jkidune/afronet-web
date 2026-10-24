/*
 * Builds the translated pages (/fr/, /pt/, /sw/) from the English pages + i18n/<lang>.json.
 *
 *   npm run i18n              build every language, update the English pages' switcher/hreflang and sitemap.xml
 *   npm run i18n -- --extract write i18n/<lang>.missing.json with every English string still untranslated
 *
 * English pages stay the source of truth. Markup is copied byte for byte; only text, a few attributes
 * (alt, title, placeholder, aria-label, data-caption, value, meta content), JSON-LD strings, listed
 * inline-script strings, internal links and asset paths change.
 *
 * Dictionary (i18n/<lang>.json):
 *   text:   English text -> translation. Inline tags inside a sentence become numbered placeholders:
 *           "Read the <0>Kigali Declaration</0> here<1/>" -> "Lisez la <0>Déclaration de Kigali</0> ici<1/>"
 *   script: string literals in a page's inline <script>s (only the ones listed here are touched)
 *   js:     strings the shared scripts look up at runtime through window.AFRONET_I18N
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n/config.json"), "utf8"));
const SITE = CONFIG.site;
const LANGS = CONFIG.languages;
const EXTRACT = process.argv.includes("--extract");

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const INLINE = new Set(["a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "img", "kbd", "mark", "q", "s", "samp", "small", "span", "strong", "sub", "sup", "svg", "time", "u", "var", "wbr"]);
const RAW = new Set(["script", "style", "textarea"]);
const OPAQUE = new Set(["svg", "img", "br", "wbr"]);
const TEXT_ATTRS = ["alt", "title", "placeholder", "aria-label", "data-caption"];
const META_CONTENT = /^(description|og:title|og:description|twitter:title|twitter:description)$/;

/* ---------- small helpers ---------- */
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", copy: "©", reg: "®", trade: "™", rarr: "→", larr: "←", times: "×", bull: "•", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", ocirc: "ô", ecirc: "ê", euml: "ë", iuml: "ï", deg: "°", laquo: "«", raquo: "»" };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] !== undefined ? ENTITIES[e.toLowerCase()] : m;
  });
}
const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => escText(s).replace(/"/g, "&quot;");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const hasWords = (s) => /\p{L}{2,}/u.test(s.replace(/<\/?\d+\/?>/g, ""));

/* ---------- tokenizer -> light tree with source offsets ---------- */
const TAG_RE = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/gi;

function parse(src) {
  const root = { tag: "#root", children: [], start: 0, attrs: "" };
  const stack = [root];
  let last = 0, m;
  TAG_RE.lastIndex = 0;
  const pushText = (a, b) => { if (b > a) stack[stack.length - 1].children.push({ text: true, start: a, end: b }); };
  while ((m = TAG_RE.exec(src))) {
    pushText(last, m.index);
    last = TAG_RE.lastIndex;
    const top = stack[stack.length - 1];
    if (m[0].startsWith("<!")) { top.children.push({ comment: true, start: m.index, end: last }); continue; }
    if (m[1]) { // closing tag
      const tag = m[1].toLowerCase();
      let i = stack.length - 1;
      while (i > 0 && stack[i].tag !== tag) i--;
      if (i > 0) {
        while (stack.length - 1 > i) { const el = stack.pop(); el.closeStart = el.closeEnd = m.index; }
        const el = stack.pop();
        el.closeStart = m.index; el.closeEnd = last;
      }
      continue;
    }
    const tag = m[2].toLowerCase();
    const el = { tag, attrs: m[3] || "", start: m.index, openEnd: last, children: [] };
    top.children.push(el);
    if (VOID.has(tag) || m[4] === "/") { el.closeStart = el.closeEnd = last; continue; }
    if (RAW.has(tag)) {
      const close = src.toLowerCase().indexOf("</" + tag, last);
      const end = close < 0 ? src.length : close;
      el.rawStart = last; el.rawEnd = end;
      const gt = src.indexOf(">", end);
      el.closeStart = end; el.closeEnd = gt < 0 ? src.length : gt + 1;
      TAG_RE.lastIndex = last = el.closeEnd;
      continue;
    }
    stack.push(el);
  }
  pushText(last, src.length);
  while (stack.length > 1) { const el = stack.pop(); el.closeStart = el.closeEnd = src.length; }
  return root;
}

const attr = (el, name) => {
  const m = new RegExp("(?:^|\\s)" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')", "i").exec(el.attrs || "");
  return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
};
const skipped = (el) => el.tag === "script" || el.tag === "style" || attr(el, "translate") === "no" || /\bnotranslate\b/.test(attr(el, "class") || "");

// An element that may sit inside a sentence: inline, and everything inside it is inline too
function inlineOnly(el) {
  if (el.text || el.comment) return true;
  if (!INLINE.has(el.tag)) return false;
  if (OPAQUE.has(el.tag) || skipped(el)) return true;
  return el.children.every(inlineOnly);
}
function nodeHasText(src, n) {
  if (n.text) return /\S/.test(src.slice(n.start, n.end));
  if (n.comment || OPAQUE.has(n.tag) || skipped(n)) return false;
  return (n.children || []).some((c) => nodeHasText(src, c));
}

/* ---------- translatable units ---------- */
// A unit is a run of text + inline elements between block boundaries, e.g. a <p>'s content or a link label.
function collectUnits(src, root) {
  const units = [];
  function walk(el) {
    if (el.tag !== "#root" && skipped(el)) return;
    if (OPAQUE.has(el.tag) || RAW.has(el.tag)) return;
    let run = [];
    const flush = () => {
      let r = run; run = [];
      while (r.length && !nodeHasText(src, r[0]) && (r[0].text || r[0].comment)) r.shift();
      while (r.length && !nodeHasText(src, r[r.length - 1]) && (r[r.length - 1].text || r[r.length - 1].comment)) r.pop();
      if (!r.some((n) => nodeHasText(src, n))) return;
      // A run that is just one wrapper element (li > a, h2 > span) translates the wrapper's content instead
      const meaningful = r.filter((n) => !(n.text && !/\S/.test(src.slice(n.start, n.end))) && !n.comment);
      if (meaningful.length === 1 && !meaningful[0].text && !OPAQUE.has(meaningful[0].tag) && !skipped(meaningful[0]) && meaningful[0].children.length) {
        walk(meaningful[0]);
        return;
      }
      units.push(makeUnit(src, r));
    };
    for (const c of el.children) {
      if (c.comment) { run.push(c); continue; }
      if (inlineOnly(c)) run.push(c);
      else { flush(); walk(c); }
    }
    flush();
  }
  walk(root);
  return units;
}

function makeUnit(src, nodes) {
  const slots = [];
  function ser(n) {
    if (n.text) return decode(src.slice(n.start, n.end));
    if (n.comment) return "";
    const id = slots.length;
    if (OPAQUE.has(n.tag) || skipped(n) || !nodeHasText(src, n)) {
      slots.push({ whole: src.slice(n.start, n.closeEnd) });
      return `<${id}/>`;
    }
    slots.push({ open: src.slice(n.start, n.openEnd), close: src.slice(n.closeStart, n.closeEnd) });
    return `<${id}>` + n.children.map(ser).join("") + `</${id}>`;
  }
  const raw = nodes.map(ser).join("");
  const start = nodes[0].start, end = nodes[nodes.length - 1].closeEnd ?? nodes[nodes.length - 1].end;
  const text = src.slice(start, end);
  const lead = /^\s*/.exec(text)[0], trail = /\s*$/.exec(text)[0];
  return { start, end, key: norm(raw), slots, lead, trail };
}

function renderUnit(unit, translation) {
  let out = "", i = 0;
  const re = /<(\d+)\/>|<(\d+)>|<\/(\d+)>/g;
  let m;
  while ((m = re.exec(translation))) {
    out += escText(translation.slice(i, m.index));
    i = re.lastIndex;
    const s = unit.slots[+(m[1] ?? m[2] ?? m[3])];
    if (!s) continue;
    if (m[1] !== undefined) out += s.whole ?? (s.open + s.close);
    else if (m[2] !== undefined) out += s.open ?? s.whole;
    else out += s.close ?? "";
  }
  out += escText(translation.slice(i));
  return unit.lead + out + unit.trail;
}

/* ---------- per-page translation ---------- */
function pageUrl(lang, key) {
  const base = lang === "en" ? "" : "/" + lang;
  return key === "index" ? base + "/" : base + "/" + key;
}
const langPages = (lang) => new Set(lang === "en" ? allPages() : LANGS[lang].pages || []);
const activeLangs = () => Object.keys(LANGS).filter((l) => l === "en" || (LANGS[l].published && (LANGS[l].pages || []).length));
let ALL;
function allPages() {
  if (!ALL) ALL = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html") && !/^google|^news-page-\d/.test(f)).map((f) => f.slice(0, -5));
  return ALL;
}

function rewriteHref(href, lang) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const m = /^\/([^?#]*)([?#].*)?$/.exec(href);
  if (!m) return href;
  const key = m[1] === "" ? "index" : m[1].replace(/\.html$/, "");
  return langPages(lang).has(key) ? pageUrl(lang, key) + (m[2] || "") : href;
}

function translateAttrs(tagSrc, lang, dict, miss) {
  const tag = (/^<([a-zA-Z][\w:-]*)/.exec(tagSrc) || [])[1];
  if (!tag) return tagSrc;
  const lower = tag.toLowerCase();
  const metaName = lower === "meta" ? (/(?:name|property)="([^"]+)"/.exec(tagSrc) || [])[1] : null;
  return tagSrc.replace(/(\s)([^\s=>\/]+)(\s*=\s*)"([^"]*)"/g, (all, sp, name, eq, val) => {
    const n = name.toLowerCase();
    let v = val;
    const tr = () => {
      const k = norm(decode(val));
      if (!hasWords(k)) return val;
      if (dict.text[k] === k) return val;
      if (dict.text[k] !== undefined) return escAttr(dict.text[k]);
      miss.add(k);
      return val;
    };
    if (TEXT_ATTRS.includes(n)) v = tr();
    else if (n === "value" && /type="(submit|button)"/.test(tagSrc)) v = tr();
    else if (n === "content" && metaName && META_CONTENT.test(metaName)) v = tr();
    else if (n === "href" && (lower === "a" || lower === "area")) v = rewriteHref(val, lang);
    return sp + name + eq + '"' + v + '"';
  });
}

function translateJsonLd(json, lang, dict, miss) {
  let data;
  try { data = JSON.parse(json); } catch { return json; }
  const walk = (o) => {
    if (Array.isArray(o)) return o.map(walk);
    if (o && typeof o === "object") {
      for (const k of Object.keys(o)) {
        const v = o[k];
        if (typeof v === "string" && /^(name|description|caption|headline)$/.test(k) && hasWords(v)) {
          const key = norm(v);
          if (dict.text[key] !== undefined) o[k] = dict.text[key]; else miss.add(key);
        } else if (typeof v === "string" && /^(item|url)$/.test(k) && v.startsWith(SITE + "/")) {
          const rel = rewriteHref(v.slice(SITE.length), lang);
          if (rel.startsWith("/" + lang)) o[k] = SITE + rel;
        } else o[k] = walk(v);
      }
    }
    return o;
  };
  return JSON.stringify(walk(data)).replace(/<\//g, "<\\/");
}

function translateScript(code, dict, cands) {
  return code.replace(/(["'])((?:\\.|(?!\1)[^\\\n])*)\1/g, (all, q, body) => {
    const s = body.replace(/\\(["'\\])/g, "$1");
    if (dict.script[s] !== undefined) return q + dict.script[s].replace(/\\/g, "\\\\").replace(new RegExp(q, "g"), "\\" + q) + q;
    if (cands && /\p{L}{2,}/u.test(s) && /[A-Z]|\s/.test(s) && !/^[\w.-]+$/.test(s) && !/[<>{}=;]|^[#.[]|^https?:/.test(s)) cands.add(s);
    return all;
  });
}

function alternatesBlock(key) {
  const langs = activeLangs().filter((l) => langPages(l).has(key));
  if (langs.length < 2) return "<!-- i18n:alternates --><!-- /i18n:alternates -->";
  const links = langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${pageUrl(l, key)}" />`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${pageUrl("en", key)}" />`);
  return "<!-- i18n:alternates -->\n    " + links.join("\n    ") + "\n    <!-- /i18n:alternates -->";
}

function switcherBlock(key, lang) {
  const langs = activeLangs();
  if (langs.length < 2) return "";
  const cur = LANGS[lang];
  const items = langs.map((l) => {
    const target = langPages(l).has(key) ? pageUrl(l, key) : pageUrl(l, "index");
    const here = l === lang;
    return `<li${here ? ' class="is-active"' : ""}><a href="${target}" hreflang="${l}" lang="${l}"${here ? ' aria-current="true"' : ""}>${LANGS[l].label}</a></li>`;
  }).join("");
  return `<li class="dropdown main-menu__lang" translate="no"><a href="#" role="button" aria-label="${escAttr(cur.switcherLabel)}"><i class="fas fa-globe" aria-hidden="true"></i> ${cur.short}</a><ul>${items}</ul></li><!-- /.main-menu__lang -->`;
}

// Puts the switcher and hreflang links into a page (English source or generated copy); safe to repeat
function stampChrome(html, key, lang) {
  const alt = alternatesBlock(key);
  if (/<!-- i18n:alternates -->[\s\S]*?<!-- \/i18n:alternates -->/.test(html)) html = html.replace(/<!-- i18n:alternates -->[\s\S]*?<!-- \/i18n:alternates -->/, alt);
  else html = html.replace(/(<link rel="canonical"[^>]*>|<\/head>)/, (m) => (m === "</head>" ? alt + "\n" + m : m + "\n    " + alt));
  const sw = switcherBlock(key, lang);
  html = html.replace(/\s*<li class="dropdown main-menu__lang"[\s\S]*?<!-- \/\.main-menu__lang -->/g, "");
  if (sw) html = html.replace(/(\s*)(<\/ul>\s*<\/nav><!-- \/\.main-header__nav -->)/, (m, ws, tail) => "\n                            " + sw + ws + tail);
  return html;
}

function buildPage(key, lang, dict, miss, cands) {
  let src = fs.readFileSync(path.join(ROOT, key + ".html"), "utf8");
  src = src.replace(/\s*<li class="dropdown main-menu__lang"[\s\S]*?<!-- \/\.main-menu__lang -->/g, "");
  const root = parse(src);

  // 1. text units
  const units = collectUnits(src, root);
  let out = "", pos = 0;
  for (const u of units) {
    if (!hasWords(u.key)) continue;
    const tr = dict.text[u.key];
    if (tr === undefined) { miss.add(u.key); continue; }
    if (tr === u.key) continue;
    out += src.slice(pos, u.start) + renderUnit(u, tr);
    pos = u.end;
  }
  out += src.slice(pos);

  // 2. attributes in every start tag (outside scripts/styles), JSON-LD, inline scripts
  const root2 = parse(out);
  const edits = [];
  (function walk(el) {
    for (const c of el.children || []) {
      if (c.text || c.comment) continue;
      edits.push({ start: c.start, end: c.openEnd, fn: (s) => translateAttrs(s, lang, dict, miss) });
      if (c.tag === "script" && c.rawStart !== undefined) {
        const type = attr(c, "type") || "";
        if (/ld\+json/.test(type)) edits.push({ start: c.rawStart, end: c.rawEnd, fn: (s) => translateJsonLd(s, lang, dict, miss) });
        else if (!attr(c, "src")) edits.push({ start: c.rawStart, end: c.rawEnd, fn: (s) => translateScript(s, dict, cands) });
      }
      walk(c);
    }
  })(root2);
  edits.sort((a, b) => a.start - b.start);
  let res = "";
  pos = 0;
  for (const e of edits) { res += out.slice(pos, e.start) + e.fn(out.slice(e.start, e.end)); pos = e.end; }
  res += out.slice(pos);

  // 3. document-level: lang, canonical, og, asset paths, runtime strings
  const url = SITE + pageUrl(lang, key);
  res = res.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(["'(,]\s*|&quot;)assets\//g, "$1/assets/");
  if (!/og:locale/.test(res)) res = res.replace(/(<meta property="og:type"[^>]*>)/, `$1\n    <meta property="og:locale" content="${LANGS[lang].locale}" />`);
  const js = JSON.stringify(dict.js || {}).replace(/<\//g, "<\\/");
  res = res.replace("</head>", `    <script>window.AFRONET_I18N=${js};</script>\n</head>`);
  return stampChrome(res, key, lang);
}

/* ---------- sitemap ---------- */
function updateSitemap() {
  const file = path.join(ROOT, "sitemap.xml");
  let sm = fs.readFileSync(file, "utf8");
  const nl = sm.includes("\r\n") ? "\r\n" : "\n";
  sm = sm.replace(/<urlset[^>]*>/, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">');
  // Drop previously generated language entries and alternates, then add them fresh
  const langCodes = Object.keys(LANGS).filter((l) => l !== "en").join("|");
  sm = sm.replace(new RegExp(`\\s*<url>\\s*<loc>${SITE.replace(/\./g, "\\.")}/(${langCodes})/[\\s\\S]*?</url>`, "g"), "");
  sm = sm.replace(/\s*<xhtml:link [^>]*\/>/g, "");
  const extra = [];
  sm = sm.replace(/(\s*)<url>(\s*)<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g, (all, ws, ws2, loc, body) => {
    const p = loc.slice(SITE.length);
    const key = p === "/" ? "index" : p.slice(1);
    const langs = activeLangs().filter((l) => langPages(l).has(key));
    if (langs.length < 2) return all;
    const links = langs.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${pageUrl(l, key)}"/>`)
      .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pageUrl("en", key)}"/>`);
    const alt = links.map((x) => nl + "    " + x).join("");
    for (const l of langs.filter((x) => x !== "en")) {
      extra.push(`  <url>${nl}    <loc>${SITE}${pageUrl(l, key)}</loc>${body.replace(/\s+$/, "")}${alt}${nl}  </url>`);
    }
    return `${ws}<url>${ws2}<loc>${loc}</loc>${body.replace(/\s+$/, "")}${alt}${nl}  </url>`;
  });
  sm = sm.replace(/\s*<\/urlset>/, (extra.length ? nl + extra.join(nl) : "") + nl + "</urlset>");
  fs.writeFileSync(file, sm);
}

/* ---------- main ---------- */
const report = [];
for (const lang of Object.keys(LANGS).filter((l) => l !== "en")) {
  const pages = LANGS[lang].pages || [];
  if (!pages.length) continue;
  const dictFile = path.join(ROOT, "i18n", lang + ".json");
  const dict = Object.assign({ text: {}, script: {}, js: {} }, fs.existsSync(dictFile) ? JSON.parse(fs.readFileSync(dictFile, "utf8")) : {});
  const missing = {}, scriptCands = {};
  fs.mkdirSync(path.join(ROOT, lang), { recursive: true });
  for (const key of pages) {
    const miss = new Set(), cands = new Set();
    const html = buildPage(key, lang, dict, miss, cands);
    if (!EXTRACT) fs.writeFileSync(path.join(ROOT, lang, key + ".html"), html);
    for (const k of miss) (missing[k] ||= []).push(key);
    for (const k of cands) (scriptCands[k] ||= []).push(key);
    report.push(`${lang}/${key}.html  missing ${miss.size}`);
  }
  if (EXTRACT) {
    const out = { text: Object.fromEntries(Object.keys(missing).map((k) => [k, ""])), scriptCandidates: Object.keys(scriptCands).filter((k) => dict.script[k] === undefined) };
    fs.writeFileSync(path.join(ROOT, "i18n", lang + ".missing.json"), JSON.stringify(out, null, 2) + "\n");
    report.push(`${lang}: ${Object.keys(missing).length} untranslated strings -> i18n/${lang}.missing.json`);
  }
}

if (!EXTRACT) {
  let stamped = 0;
  for (const key of allPages()) {
    const file = path.join(ROOT, key + ".html");
    const html = fs.readFileSync(file, "utf8");
    const next = stampChrome(html, key, "en");
    if (next !== html) { fs.writeFileSync(file, next); stamped++; }
  }
  updateSitemap();
  report.push(`English pages updated: ${stamped}; sitemap.xml updated`);
}
console.log(report.join("\n"));
