import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { SITE, BOOK, TESTIMONIALS, PAYMENTS, EXPERTISE, TOP, MODALITIES, SERVICES, HOME_FAQ, FAQ_GROUPS } from './data.mjs';
import * as T from './templates.mjs';
import { GLYPHS, benefitGlyph, svcCard, testimonialBlock, credStrip, bookFeature } from './parts.mjs';
const { esc, pic, mark, arrow, ext, star, btn, amazonBtn, eyebrow, faq, faqLd, crumbLd, crumbs, cta, postCard, bookCard, crisis, md, ALT, href, layout, personLd, slugify } = T;

const ROOT = new URL('..', import.meta.url).pathname;
const pages = [];
function out(path, render) {
  const depth = path === '' || path === '404.html' ? 0 : path.split('/').filter(Boolean).length;
  T.setRoot(depth ? '../'.repeat(depth) : './');
  const html = render();
  const file = path.endsWith('.html') ? join(ROOT, path) : join(ROOT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (path !== '404.html') pages.push(path);
}

const POSTS = readdirSync(new URL('./posts/', import.meta.url)).filter((f) => f.endsWith('.md')).map((f) => {
  const src = readFileSync(new URL('./posts/' + f, import.meta.url), 'utf8');
  const [, fm, ...rest] = src.split(/^---$/m);
  const body = rest.join('---');
  const meta = Object.fromEntries(fm.trim().split('\n').map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));
  const words = body.replace(/\[\[book\]\]/g, '').split(/\s+/).filter(Boolean).length;
  return { slug: f.replace('.md', ''), ...meta, takeaways: meta.takeaways.split('|').map((s) => s.trim()), services: meta.services.split(',').map((s) => s.trim()), body, words, read: Math.max(6, Math.round(words / 230)) };
}).sort((a, b) => b.date.localeCompare(a.date));
const post = (slug) => POSTS.find((p) => p.slug === slug);
const svc = (slug) => SERVICES.find((s) => s.slug === slug);
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const ctx = { out, POSTS, post, svc, fmtDate };

const mods = ['pages-home.mjs', 'pages-main.mjs', 'pages-services.mjs', 'pages-book.mjs', 'pages-journal.mjs', 'pages-contact.mjs'];
for (const m of mods) (await import('./' + m)).default(ctx);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}sitemap.xml\n`);
writeFileSync(join(ROOT, '.nojekyll'), '');
console.log('pages', pages.length + 1, 'posts', POSTS.map((p) => p.slug + ':' + p.words).join(' '));
