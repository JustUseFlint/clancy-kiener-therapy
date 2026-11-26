import { SITE, BOOK, TESTIMONIALS } from './data.mjs';
import * as T from './templates.mjs';
const { esc, pic, mark, arrow, star, amazonBtn, eyebrow, ALT, href } = T;

export const GLYPHS = {
  leaf: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 32C8 17 19 8 33 8c0 15-10 25-25 24Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 32 24 16" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>',
  ripple: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="3.5" fill="currentColor"/><circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".5"/></svg>',
  stones: '<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="31" rx="12" ry="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="20" cy="21.5" rx="8.5" ry="3.8" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="20" cy="13" rx="5" ry="3" fill="currentColor"/></svg>',
  door: '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 34V14a9 9 0 0 1 18 0v20" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M6 34h28" stroke="currentColor" stroke-width="1.4"/><circle cx="24.5" cy="23" r="1.3" fill="currentColor"/></svg>',
};
export const benefitGlyph = ['leaf', 'ripple', 'stones', 'door', 'leaf', 'ripple'];

export const svcCard = (s, cls = '') => `<a class="scard ${cls}" href="${href('services/' + s.slug + '/')}" data-reveal>
  <div class="scard__img" data-clip>${pic(s.img, ALT[s.img], { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>
  <div class="scard__body">
    <div class="scard__top"><span class="pill">${s.price.amount} · ${esc(/session$/i.test(s.price.len) ? 'per session' : s.price.len)}</span></div>
    <h3 class="scard__t">${esc(s.name)}</h3>
    <p class="scard__d">${esc(s.tag)}</p>
    <span class="scard__go" aria-hidden="true">${arrow()}</span>
  </div>
</a>`;

export const testimonialBlock = (cls = '') => `<div class="quotes ${cls}">${TESTIMONIALS.map((t) => `<figure class="quote" data-reveal>
  <svg class="quote__mark" viewBox="0 0 40 30" aria-hidden="true"><path fill="currentColor" d="M0 30V17C0 7 5 1.5 15 0l1.5 3.6C10.6 5.3 8.4 8.6 8.2 13H16v17H0Zm24 0V17c0-10 5-15.5 15-17l1 3.6c-5.9 1.7-8.1 5-8.3 9.4H40v17H24Z"/></svg>
  <p class="quote__title">${esc(t.title)}</p>
  <blockquote><p>${esc(t.quote)}</p></blockquote>
  <figcaption>${esc(t.author)}</figcaption>
</figure>`).join('')}</div>`;

export const credStrip = () => {
  const items = ['Licensed Marriage &amp; Family Therapist', 'Tennessee License 1168', 'Oregon License T2367', '15 years in practice', 'Doctor of Ministry, George Fox University', 'Verified by Psychology Today', 'In person &amp; telehealth'];
  return `<section class="strip" aria-label="Credentials"><div class="strip__track">${[0, 1].map((k) => `<div class="strip__set"${k ? ' aria-hidden="true"' : ''}>${items.map((t) => `<span>${t}</span>${mark('mark strip__mark')}`).join('')}</div>`).join('')}</div></section>`;
};

export const bookFeature = () => `<section class="bookfx" aria-labelledby="bookfx-h">
  <div class="bookfx__panel wrap">
    <div class="bookfx__stage" data-reveal>
      <div class="bookfx__bg">${pic('book-backdrop', '', { sizes: '(min-width: 1024px) 60vw, 100vw' })}</div>
      <div class="bookfx__obj" data-float>${pic('book-cover', ALT['book-cover'], { sizes: '(min-width: 1024px) 260px, 46vw', imgCls: 'bookfx__cover' })}<span class="bookfx__shadow" aria-hidden="true"></span></div>
    </div>
    <div class="bookfx__info">
      ${eyebrow('The book by Clancy')}
      <h2 id="bookfx-h" class="bookfx__h" data-split>Peace and Joy <em>Guidebook</em></h2>
      <p class="bookfx__sub" data-reveal>${BOOK.subtitle}</p>
      <p class="bookfx__p" data-reveal>Back-to-basics guidance for connecting more deeply with yourself and others. Stories and insights from Clancy’s work as a therapist and professional speaker, with practical strategies for “cleaning house” on the beliefs that hold you back.</p>
      <div class="pills" data-reveal role="list" aria-label="Book details"><span class="pill pill--dark" role="listitem">Paperback</span><span class="pill pill--line" role="listitem">${BOOK.pages} pages</span><span class="pill pill--line" role="listitem">${BOOK.publisher}</span><span class="pill pill--line" role="listitem">2023</span></div>
      <div class="buy" data-reveal>
        <p class="buy__rate"><span class="stars" aria-hidden="true">${star.repeat(5)}</span><span>${BOOK.rating} out of 5 on Amazon · ${BOOK.ratings} ratings</span></p>
        <div class="buy__row">${amazonBtn('Buy on Amazon')}<a class="link link--quiet" href="${href('book/')}">About the book ${arrow()}</a></div>
      </div>
    </div>
  </div>
</section>`;
