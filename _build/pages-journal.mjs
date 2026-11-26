import { SITE, BOOK } from './data.mjs';
import * as T from './templates.mjs';
const { esc, pic, mark, arrow, ext, eyebrow, crumbLd, crumbs, cta, postCard, bookCard, md, ALT, href, layout, slugify } = T;

export default function ({ out, POSTS, svc, fmtDate }) {
  const CATS = [...new Set(POSTS.map((p) => p.cat))];
  out('journal/', () => {
    const [first, ...rest] = POSTS;
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Journal', 'journal/']])}
  <div class="phero__grid"><div>${eyebrow('The Journal')}<h1 class="phero__h" data-split>Thoughtful reading on <em>love, family and healing</em></h1></div><p class="phero__lead" data-reveal>Long-form, practical articles on marriage, family relationships and emotional health from Quiet Mind Therapy in Nashville.</p></div>
</section>
<section class="wrap journal">
  <div class="filters" role="group" aria-label="Filter articles by topic"><button type="button" class="chipbtn is-on" data-filter="all" aria-pressed="true">All</button>${CATS.map((c) => `<button type="button" class="chipbtn" data-filter="${slugify(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div>
  <div class="pfeature" data-grid>${postCard(first, { big: true })}</div>
  <div class="pgrid" data-grid>${rest.map((p) => postCard(p)).join('')}</div>
</section>
<section class="wrap">${bookCard('bookcard--wide')}</section>
${cta()}`;
    return layout({ path: 'journal/', title: 'The Journal | Marriage, Family & Mental Health Articles | Quiet Mind Therapy', desc: 'In-depth articles on communication in marriage, rebuilding trust, premarital counseling, family conflict, parenting teens and starting therapy, from Quiet Mind Therapy in Nashville.', body, active: 'journal/', jsonld: [crumbLd([['Home', ''], ['Journal', 'journal/']]), { '@context': 'https://schema.org', '@type': 'Blog', name: 'The Journal · Quiet Mind Therapy', url: SITE.url + 'journal/', blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: SITE.url + 'journal/' + p.slug + '/', datePublished: p.date })) }] });
  });

  for (const p of POSTS) {
    const path = 'journal/' + p.slug + '/';
    out(path, () => {
      const { html, toc } = md(p.body);
      const inlineBook = `<aside class="inbook" aria-label="Clancy’s book"><div class="inbook__cover">${pic('book-cover', ALT['book-cover'], { sizes: '120px' })}</div><div class="inbook__body"><p class="eyebrow">From Clancy’s book</p><p class="inbook__t">Peace and Joy Guidebook</p><p>Back-to-basics strategies for clearing the beliefs that hold you back and connecting more authentically with the people you love.</p><a class="link" href="${BOOK.amazon}" target="_blank" rel="noopener" data-amazon>Buy on Amazon ${ext()}</a></div></aside>`;
      const content = html.replace('[[book]]', inlineBook);
      const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
      const tocList = `<ol>${toc.map(([t, id]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol>`;
      const body = `
<article class="post">
  <header class="post__hero wrap">
    ${crumbs([['Home', ''], ['Journal', 'journal/'], [p.title, path]])}
    <div class="post__meta" data-reveal><span class="pill pill--soft">${esc(p.cat)}</span><span>${fmtDate(p.date)}</span><span>${p.read} min read</span></div>
    <h1 class="post__h" data-split>${esc(p.title)}</h1>
    <p class="post__dek" data-reveal>${esc(p.desc)}</p>
    <p class="post__by" data-reveal>${mark('mark')}<span>Quiet Mind Therapy · Nashville, TN</span></p>
    <div class="post__img" data-clip>${pic(p.img, ALT[p.img], { sizes: '(min-width: 1200px) 1200px, 100vw', eager: true })}</div>
  </header>
  <div class="post__wrap wrap">
    <aside class="post__side">
      <nav class="toc" aria-label="Table of contents"><p class="eyebrow">In this article</p>${tocList}</nav>
      <div class="post__sticky">${bookCard('bookcard--side')}</div>
    </aside>
    <div class="post__body">
      <div class="takeaways"><p class="eyebrow">Key takeaways</p><ul>${p.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <details class="toc-m"><summary>In this article</summary>${tocList}</details>
      <div class="prose prose--post">${content}</div>
      <div class="post__svcs"><p class="eyebrow">Related services</p><div class="mini-svcs">${p.services.map(svc).filter(Boolean).map((o) => `<a class="mini" href="${href('services/' + o.slug + '/')}"><span class="mini__t">${esc(o.name)}</span><span class="mini__p">${o.price.amount}</span>${arrow()}</a>`).join('')}</div></div>
      <p class="disclaimer">This article is for educational purposes only and is not medical or mental health advice, diagnosis or treatment. Reading it does not create a therapist–client relationship. If you are in crisis, call or text <a href="tel:988">988</a> or call 911.</p>
    </div>
  </div>
</article>
<div class="bookbar" data-bookbar hidden><div class="bookbar__in">${pic('book-cover', '', { sizes: '40px' })}<p><strong>Peace and Joy Guidebook</strong><span>by Clancy Kiener, LMFT</span></p><a class="btn btn--solid btn--sm" href="${BOOK.amazon}" target="_blank" rel="noopener" data-amazon>${T.roll('Buy on Amazon')}</a><button type="button" class="bookbar__x" aria-label="Hide book banner" data-bookbar-x>×</button></div></div>
<section class="wrap related" aria-labelledby="more-h"><div class="sec-head sec-head--split"><div>${eyebrow('Keep reading')}<h2 id="more-h" class="sec-h">More from <em>the Journal</em></h2></div><a class="link" href="${href('journal/')}">All articles ${arrow()}</a></div><div class="pgrid">${related.map((r) => postCard(r)).join('')}</div></section>
${cta()}`;
      const art = { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, image: SITE.url + 'assets/img/' + p.img + '.jpg', datePublished: p.date, dateModified: p.date, author: { '@type': 'Organization', name: 'Quiet Mind Therapy', url: SITE.url }, publisher: { '@type': 'Organization', name: 'Quiet Mind Therapy', logo: { '@type': 'ImageObject', url: SITE.url + 'assets/img/apple-touch-icon.png' } }, mainEntityOfPage: SITE.url + path, wordCount: p.words, articleSection: p.cat };
      return layout({ path, title: `${p.title} | Quiet Mind Therapy`, desc: p.desc, body, ogType: 'article', active: 'journal/', bodyClass: 'postpage', jsonld: [art, crumbLd([['Home', ''], ['Journal', 'journal/'], [p.title, path]])] });
    });
  }
}
