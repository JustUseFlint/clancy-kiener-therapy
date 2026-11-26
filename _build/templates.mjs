import { readFileSync } from 'node:fs';
import { SITE, BOOK, SERVICES } from './data.mjs';
const DIMS = JSON.parse(readFileSync(new URL('./img-dims.json', import.meta.url)));
export const V = '9';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export let R = './';
export const setRoot = (r) => { R = r; };
export const href = (p) => (p === '' ? R : R + p);

// Brand mark: a still moon over two ripples ("quiet mind")
export const mark = (cls = 'mark') => `<svg class="${cls}" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false"><circle cx="20" cy="15" r="8.2" fill="currentColor"/><path d="M5 27.5c5 0 5-2.4 10-2.4s5 2.4 10 2.4 5-2.4 10-2.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 33c3.7 0 3.7-1.8 7.4-1.8S20.1 33 23.8 33s3.7-1.8 7.2-1.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".55"/></svg>`;
export const arrow = (cls = 'arr') => `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const ext = (cls = 'arr') => `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const star = `<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.5l-4.2 2.3 1-4.6L1.3 6l4.7-.5z"/></svg>`;

export function pic(name, alt, { sizes = '100vw', cls = '', eager = false, imgCls = '' } = {}) {
  const [w, h] = DIMS[name];
  const set = (e) => (w > 800 ? `${R}assets/img/${name}-800.${e} 800w, ${R}assets/img/${name}.${e} ${w}w` : `${R}assets/img/${name}.${e} ${w}w`);
  return `<picture class="${cls}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img class="${imgCls}" src="${R}assets/img/${name}${w > 800 ? '-800' : ''}.jpg" srcset="${set('jpg')}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

export const ALT = {
  'hero-cloud-room': 'A sunlit cream room with arched windows, olive trees and a curved moss-green chaise, with soft clouds drifting near the ceiling',
  'stones-cairn': 'A balanced stack of smooth sage, stone and sand coloured pebbles on cream linen',
  'vessels-family': 'Three handmade ceramic vases in cream, sage and sand grouped together with an olive branch',
  'garden-pool': 'A round stone reflecting pool on soft moss in a quiet, misty garden',
  'clouds-sky': 'Soft billowing clouds in a pale sage-blue sky',
  'linen-light': 'Morning light and leaf shadows on a plaster wall beside a linen curtain and a cup of tea',
  'two-stones': 'Two smooth stones, one sage and one sand, leaning against each other on a pedestal',
  'single-chair': 'A single moss-green armchair beside a tall window in a calm cream room',
  'olive-branches': 'Two olive branches rising together from a cream ceramic vase',
  'still-water': 'A leaf resting on still water in a stone basin with soft ripples and smooth pebbles',
  'kintsugi-bowl': 'A cream ceramic bowl mended with gold kintsugi seams resting on sage linen',
  'seedling-stone': 'A young green seedling growing from a crack in pale stone, lit by morning sun',
  'hills-fog': 'Rolling green Tennessee hills fading into soft morning fog',
  'two-chairs': 'Two rounded cream armchairs facing each other across a small oak table with water glasses',
  'journal-tea': 'An open blank journal with a pencil, a sage mug of tea, eucalyptus and a smooth stone on linen',
  'winding-path': 'A gravel path winding through soft grasses and ferns toward morning light',
  'pebble-line': 'One large sage stone followed by three smaller pebbles in a gentle line on sand',
  'book-backdrop': 'A soft cream and sage backdrop with dappled leaf shadows',
  'book-cover': 'Cover of Peace and Joy Guidebook: Your Path to Embracing Life by Clancy Kiener, LMFT',
  'clancy-portrait': 'Portrait of Clancy Kiener, Licensed Marriage and Family Therapist',
};

export const roll = (text) => `<span class="roll" data-t="${esc(text)}"><span>${esc(text)}</span></span>`;
export const btn = (h, text, v = 'solid', extra = '') => `<a class="btn btn--${v}" href="${h}" ${extra}>${roll(text)}<span class="btn__arr" aria-hidden="true">${/target="_blank"/.test(extra) ? ext() + ext() : arrow() + arrow()}</span></a>`;
export const amazonBtn = (text = 'Buy on Amazon', v = 'solid') => btn(BOOK.amazon, text, v, 'target="_blank" rel="noopener" data-amazon');
export const eyebrow = (t, cls = '') => `<p class="eyebrow ${cls}">${t}</p>`;
export const crumbs = (list) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${list.map(([n, p], i) => i === list.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${href(p)}">${esc(n)}</a></li>`).join('')}</ol></nav>`;
export const crumbLd = (list) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + p })) });
export const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

let faqN = 0;
export function faq(items) {
  return `<div class="faq">${items.map(([q, a]) => { const id = 'faq-' + (++faqN); return `<div class="faq__item" data-reveal><h3 class="faq__q"><button type="button" aria-expanded="false" aria-controls="${id}"><span>${esc(q)}</span><i class="faq__icon" aria-hidden="true"></i></button></h3><div class="faq__a" id="${id}" role="region" hidden><div><p>${esc(a)}</p></div></div></div>`; }).join('')}</div>`;
}

export const crisis = (cls = '') => `<p class="crisis ${cls}"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10 5.5v5.5M10 13.6v.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span>If you are in crisis, call or text <a href="tel:988">988</a> (Suicide &amp; Crisis Lifeline) or call 911. This site and the Get Started form are not for emergencies.</span></p>`;

export function bookCard(cls = '') {
  return `<aside class="bookcard ${cls}" aria-label="Clancy’s book">
    <div class="bookcard__cover">${pic('book-cover', ALT['book-cover'], { sizes: '120px' })}</div>
    <div class="bookcard__body"><p class="eyebrow">The book by Clancy</p><p class="bookcard__t">${BOOK.title}</p><p class="bookcard__s">${BOOK.subtitle}</p>
    <div class="bookcard__ctas"><a class="link" href="${BOOK.amazon}" target="_blank" rel="noopener" data-amazon>Buy on Amazon ${ext()}</a><a class="link link--quiet" href="${href('book/')}">About the book</a></div></div>
  </aside>`;
}

export function cta({ h = 'When it feels right, <em>we’re here.</em>', p = 'Take your time. Send a short note, call or text, or book a session online. A reminder is sent by text, email or both.' } = {}) {
  return `<section class="cta" aria-labelledby="cta-h">
    <div class="cta__media" data-clip>${pic('clouds-sky', '', { sizes: '100vw' })}</div>
    <div class="cta__inner wrap">
      <span class="cta__moon" aria-hidden="true">${mark('mark')}</span>
      <h2 id="cta-h" class="cta__h" data-split>${h}</h2>
      <p class="cta__p" data-reveal>${p}</p>
      <div class="cta__btns" data-reveal>${btn(href('contact/'), 'Get started')}${btn(SITE.booking, 'Book online', 'ghost', 'target="_blank" rel="noopener"')}</div>
      <p class="cta__tel" data-reveal>Or call / text <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
    </div>
  </section>`;
}

export function postCard(a, { big = false } = {}) {
  return `<article class="pcard${big ? ' pcard--big' : ''}" data-reveal data-cat="${slugify(a.cat)}">
    <a href="${href('journal/' + a.slug + '/')}" class="pcard__link">
      <div class="pcard__img" data-clip>${pic(a.img, ALT[a.img], { sizes: big ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 700px) 50vw, 100vw' })}</div>
      <div class="pcard__meta"><span class="pill pill--soft">${esc(a.cat)}</span><span>${a.read} min read</span></div>
      <h3 class="pcard__t">${esc(a.title)}</h3>
      ${big ? `<p class="pcard__d">${esc(a.desc)}</p>` : ''}
      <span class="pcard__more">Read article ${arrow()}</span>
    </a>
  </article>`;
}

const NAV = [['About', 'about/'], ['Fees', 'fees/'], ['The Book', 'book/'], ['Journal', 'journal/']];

function header(active) {
  const svcLinks = SERVICES.map((s) => `<li><a href="${href('services/' + s.slug + '/')}"><span class="mega__n">${esc(s.name)}</span><span class="mega__p">${s.price.amount}</span></a></li>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr__bar">
    <a class="brand" href="${href('')}" aria-label="Clancy Kiener, Quiet Mind Therapy, home">${mark('mark brand__mark')}<span class="brand__txt"><span class="brand__name">Clancy Kiener</span><span class="brand__sub">Quiet Mind Therapy</span></span></a>
    <nav class="nav" aria-label="Primary">
      <ul>
        <li class="nav__has"><a href="${href('services/')}" class="nav__a${active === 'services' ? ' is-active' : ''}" aria-haspopup="true" aria-expanded="false" data-mega-trigger>Services<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></a>
          <div class="mega" data-mega>
            <div class="mega__inner">
              <div class="mega__col"><p class="eyebrow">Ways to work together</p><ul class="mega__list">${svcLinks}</ul><a class="link" href="${href('services/')}">All services ${arrow()}</a></div>
              <div class="mega__side">${bookCard('bookcard--mega')}<a class="mega__fees" href="${href('fees/')}"><span>Transparent fees</span><span>$150 sessions · sliding scale may be available</span>${arrow()}</a></div>
            </div>
          </div>
        </li>
        ${NAV.map(([n, p]) => `<li><a class="nav__a${active === p ? ' is-active' : ''}" href="${href(p)}">${n}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="hdr__right">
      <a class="hdr__tel" href="tel:${SITE.tel}">${SITE.phone}</a>
      ${btn(href('contact/'), 'Get started', 'solid', 'data-hdr-cta')}
      <button class="burger" type="button" aria-expanded="false" aria-controls="sheet" data-burger><span class="burger__l" aria-hidden="true"><i></i><i></i></span><span class="burger__t">Menu</span></button>
    </div>
  </div>
</header>
<div class="sheet" id="sheet" data-sheet hidden>
  <div class="sheet__inner">
    <nav aria-label="Mobile">
      <ul class="sheet__main">
        <li data-sheet-item><a href="${href('')}">Home</a></li>
        <li data-sheet-item><a href="${href('services/')}">Services</a></li>
        <li data-sheet-item><a href="${href('about/')}">About Clancy</a></li>
        <li data-sheet-item><a href="${href('fees/')}">Fees &amp; insurance</a></li>
        <li data-sheet-item><a href="${href('book/')}">The Book</a></li>
        <li data-sheet-item><a href="${href('journal/')}">Journal</a></li>
        <li data-sheet-item><a href="${href('testimonials/')}">Testimonials</a></li>
        <li data-sheet-item><a href="${href('faq/')}">FAQ</a></li>
      </ul>
      <p class="sheet__label" data-sheet-item>Services</p>
      <ul class="sheet__svc" data-sheet-item>${SERVICES.map((s) => `<li><a href="${href('services/' + s.slug + '/')}">${esc(s.short)}</a></li>`).join('')}</ul>
    </nav>
    <div data-sheet-item>${bookCard('bookcard--sheet')}</div>
    <div class="sheet__foot" data-sheet-item>
      ${btn(href('contact/'), 'Get started', 'cream')}
      <p><a href="tel:${SITE.tel}">${SITE.phone}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></p>
      ${crisis('crisis--sheet')}
    </div>
  </div>
</div>`;
}

function footer() {
  return `<footer class="ftr">
  <div class="ftr__top wrap">
    <div class="ftr__lead">
      <p class="ftr__word" aria-hidden="true">Quiet <em>Mind</em></p>
      <p class="ftr__intro">Marriage, family and individual therapy with Clancy Kiener, ${SITE.creds}. In person in Nashville and by telehealth.</p>
      ${btn(href('contact/'), 'Get started', 'cream')}
    </div>
    <div class="ftr__cols">
      <div><p class="ftr__h">Services</p><ul>${SERVICES.map((s) => `<li><a href="${href('services/' + s.slug + '/')}">${esc(s.name)}</a></li>`).join('')}</ul></div>
      <div><p class="ftr__h">Practice</p><ul><li><a href="${href('about/')}">About Clancy</a></li><li><a href="${href('fees/')}">Fees &amp; insurance</a></li><li><a href="${href('book/')}">The Book</a></li><li><a href="${href('testimonials/')}">Testimonials</a></li><li><a href="${href('faq/')}">FAQ</a></li><li><a href="${href('journal/')}">Journal</a></li><li><a href="${href('privacy/')}">Privacy &amp; policies</a></li></ul></div>
      <div><p class="ftr__h">Visit &amp; contact</p><address><a href="${SITE.maps}" target="_blank" rel="noopener">${SITE.street}<br>${SITE.city}, ${SITE.region} ${SITE.zip}</a></address><ul><li><a href="tel:${SITE.tel}">${SITE.phone}</a></li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li>${SITE.hours}</li><li><a href="${SITE.booking}" target="_blank" rel="noopener">Book online</a></li><li><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
    </div>
    <div class="ftr__book">${bookCard('bookcard--ftr')}</div>
  </div>
  <div class="ftr__crisis wrap">${crisis('crisis--ftr')}</div>
  <div class="ftr__base wrap">
    <p>Clancy Kiener, ${SITE.creds} · Licensed Marriage and Family Therapist · TN License 1168 · OR License T2367</p>
    <p>© ${new Date().getFullYear()} Quiet Mind Therapy · <a href="${href('privacy/')}">Privacy</a></p>
  </div>
</footer>`;
}

export const businessLd = () => ({
  '@context': 'https://schema.org', '@type': ['MedicalBusiness', 'ProfessionalService'], '@id': SITE.url + '#practice',
  name: 'Quiet Mind Therapy', url: SITE.url, telephone: SITE.tel, email: SITE.email, image: SITE.url + 'assets/img/og-quiet-mind.jpg',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.zip, addressCountry: 'US' },
  areaServed: ['Nashville, TN', 'Tennessee', 'Oregon'], priceRange: '$150–$400', paymentAccepted: 'ACH bank transfer, American Express, Apple Cash, Cash, Check, Discover, Health Savings Account, Mastercard, PayPal, Venmo, Visa, Wire, Zelle', currenciesAccepted: 'USD',
  sameAs: [SITE.facebook, SITE.pt],
  founder: { '@id': SITE.url + '#clancy' },
});
export const personLd = () => ({
  '@context': 'https://schema.org', '@type': 'Person', '@id': SITE.url + '#clancy', name: 'Clancy Z. Kiener', alternateName: 'Clancy Kiener',
  jobTitle: 'Licensed Marriage and Family Therapist', honorificSuffix: 'LMFT, D.Min.', image: SITE.url + 'assets/img/clancy-portrait.jpg', email: SITE.email, telephone: SITE.tel,
  worksFor: { '@id': SITE.url + '#practice' }, alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Trevecca Nazarene University' }, { '@type': 'CollegeOrUniversity', name: 'George Fox University' }],
  hasCredential: [{ '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'Licensed Marriage and Family Therapist, Tennessee License 1168' }, { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'Licensed Marriage and Family Therapist, Oregon License T2367' }, { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Doctor of Ministry, George Fox University' }],
  sameAs: [SITE.pt],
});

export function layout({ path, title, desc, body, jsonld = [], ogType = 'website', bodyClass = '', active = '', ogImg = 'og-quiet-mind.jpg', noindex = false }) {
  const url = SITE.url + path;
  const ld = [businessLd(), ...jsonld].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#F4EFE6">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Quiet Mind Therapy · Clancy Kiener, LMFT">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}assets/img/${ogImg}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Quiet Mind Therapy with Clancy Kiener, LMFT, Nashville">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE.url}assets/img/${ogImg}">
<link rel="icon" href="${R}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${R}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..500,50;1,9..144,300..500,50&family=Manrope:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');</script>
${ld}
</head>
<body class="${bodyClass}">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="${R}assets/js/vendor/gsap.min.js?v=${V}" defer></script>
<script src="${R}assets/js/vendor/ScrollTrigger.min.js?v=${V}" defer></script>
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>`;
}

export function md(src) {
  const lines = src.trim().split('\n');
  let out = '', list = null, ol = false, toc = [];
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\[(.+?)\]\((.+?)\)/g, (m, t, u) => `<a href="${u.startsWith('http') ? u : href(u)}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
  const closeList = () => { if (list) { out += ol ? `<ol>${list.join('')}</ol>` : `<ul>${list.join('')}</ul>`; list = null; } };
  for (const raw of lines) {
    const l = raw.trimEnd();
    if (!l.trim()) { closeList(); continue; }
    if (l === '[[book]]') { closeList(); out += '[[book]]'; continue; }
    if (l.startsWith('## ')) { closeList(); const t = l.slice(3); const id = slugify(t); toc.push([t, id]); out += `<h2 id="${id}">${inline(t)}</h2>`; }
    else if (l.startsWith('### ')) { closeList(); out += `<h3>${inline(l.slice(4))}</h3>`; }
    else if (l.startsWith('- ')) { if (list && ol) closeList(); ol = false; (list ||= []).push(`<li>${inline(l.slice(2))}</li>`); }
    else if (/^\d+\. /.test(l)) { if (list && !ol) closeList(); ol = true; (list ||= []).push(`<li>${inline(l.replace(/^\d+\. /, ''))}</li>`); }
    else if (l.startsWith('> ')) { closeList(); out += `<blockquote class="pull"><p>${inline(l.slice(2))}</p></blockquote>`; }
    else { closeList(); out += `<p>${inline(l)}</p>`; }
  }
  closeList();
  return { html: out, toc };
}
