import { SITE, BOOK } from './data.mjs';
import * as T from './templates.mjs';
import { GLYPHS, benefitGlyph } from './parts.mjs';
const { esc, pic, arrow, star, btn, amazonBtn, eyebrow, faq, faqLd, crumbLd, crumbs, cta, postCard, ALT, href, layout } = T;

export default function ({ out, post }) {
  out('book/', () => {
    const learn = [
      ['Where heavy beliefs come from', 'How we acquire harmful beliefs and feelings, often without noticing.'],
      ['“Cleaning house”', 'Practical strategies for clearing out what no longer serves you.'],
      ['Connecting authentically', 'Ways to connect with others more honestly and deeply.'],
      ['Essential conversations', 'How to start the conversations that matter, even when the conversation is with yourself.'],
      ['Your inner power', 'A deeper understanding of the strength you already carry.'],
      ['Embracing life', 'A set of strategies for living more joyfully, day to day.'],
    ];
    const bfaq = [['Where can I buy the book?', 'Peace and Joy Guidebook is available in paperback on Amazon.'], ['How long is it?', `The paperback is ${BOOK.pages} pages, published by ${BOOK.publisher} on ${BOOK.date}.`], ['Who is the book for?', 'Anyone who wants to live with more peace and joy and to connect more deeply with themselves and others. It offers back-to-basics guidance rather than clinical theory.']];
    const body = `
<section class="bhero">
  <div class="bhero__panel wrap">
    ${crumbs([['Home', ''], ['The Book', 'book/']])}
    <div class="bhero__grid">
      <div class="bhero__text">
        <p class="eyebrow">The book by Clancy Kiener, LMFT</p>
        <h1 class="bhero__h" data-split>Peace and Joy <em>Guidebook</em></h1>
        <p class="bhero__sub" data-reveal>${BOOK.subtitle}</p>
        <p class="bhero__p" data-reveal>You want to live with more peace and joy in your heart. This short, warm guide offers back-to-basics ways to connect more deeply with yourself and others.</p>
      </div>
      <div class="bhero__stage" data-reveal>
        <div class="bhero__obj" data-float>${pic('book-cover', ALT['book-cover'], { sizes: '(min-width: 1024px) 300px, 56vw', eager: true, imgCls: 'bookfx__cover' })}<span class="bookfx__shadow" aria-hidden="true"></span></div>
      </div>
      <div class="bhero__buy" data-reveal>
        <div class="pills" role="list" aria-label="Format"><span class="pill pill--dark" role="listitem">Paperback</span><span class="pill pill--line" role="listitem">${BOOK.pages} pages</span><span class="pill pill--line" role="listitem">2023</span></div>
        <div class="buy buy--panel">
          <p class="buy__rate"><span class="stars" aria-hidden="true">${star.repeat(5)}</span><span>${BOOK.rating} out of 5 · ${BOOK.ratings} Amazon ratings</span></p>
          <p class="buy__ship">Paperback · available on Amazon</p>
          ${amazonBtn('Buy on Amazon')}
        </div>
      </div>
    </div>
  </div>
</section>
<section class="wrap bdesc">
  <div class="prose-grid">
    <aside class="prose-aside" data-reveal><p class="eyebrow">Details</p><dl class="bdl"><div><dt>Author</dt><dd>Clancy Kiener, LMFT</dd></div><div><dt>Publisher</dt><dd>${BOOK.publisher}</dd></div><div><dt>Published</dt><dd>${BOOK.date}</dd></div><div><dt>Format</dt><dd>Paperback, ${BOOK.pages} pages</dd></div><div><dt>ISBN-13</dt><dd>${BOOK.isbn}</dd></div></dl></aside>
    <div class="prose">
      <h2>Back-to-basics guidance for <em>a more joyful life</em></h2>
      <p>${esc(BOOK.desc)}</p>
      <p class="fine">Description from the book’s Amazon listing.</p>
      <div class="prose-cta">${amazonBtn('Buy on Amazon')}</div>
    </div>
  </div>
</section>
<section class="wrap learn" aria-labelledby="learn-h">
  <div class="sec-head sec-head--center">${eyebrow('Inside the book')}<h2 id="learn-h" class="sec-h" data-split>What readers <em>explore</em></h2></div>
  <div class="ben__grid">${learn.map(([h, p], i) => `<article class="ben" data-reveal><span class="ben__g">${GLYPHS[benefitGlyph[i]]}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>
</section>
<section class="band band--book" aria-labelledby="rv-h">
  <div class="wrap band__book">
    <div>${eyebrow('Readers', 'eyebrow--light')}<h2 id="rv-h" class="band__h" data-split>Rated <em>${BOOK.rating} out of 5</em> on Amazon</h2><p class="band__p" data-reveal>All ${BOOK.ratings} of the book’s Amazon ratings are five stars (as of November 2026). Read the reviews and order your copy on Amazon.</p></div>
    <div class="band__btns" data-reveal>${amazonBtn('Read reviews on Amazon', 'cream')}</div>
  </div>
</section>
<section class="wrap author" aria-labelledby="au-h">
  <div class="meet__card">
    <div class="meet__photo" data-reveal><div class="meet__frame">${pic('clancy-portrait', ALT['clancy-portrait'], { sizes: '320px' })}</div><p class="meet__cap">Clancy Kiener, LMFT</p></div>
    <div class="meet__body">${eyebrow('About the author')}<h2 id="au-h" class="sec-h" data-split>Clancy <em>Kiener</em></h2>
    <p data-reveal>Clancy Kiener is a licensed marriage and family therapist with a master’s degree in religion. She enjoys working as a therapist and professional speaker at treatment centers and churches, connecting with people from all walks of life. In her therapy practice, Clancy focuses on empowerment, dreams, connection, and nutrition.</p>
    <div class="hero__btns" data-reveal>${btn(href('about/'), 'More about Clancy', 'line')}${btn(href('contact/'), 'Work with Clancy')}</div></div>
  </div>
</section>
<section class="wrap sfaq"><div class="hfaq__grid"><div>${eyebrow('About the book')}<h2 class="sec-h">Good to <em>know</em></h2></div>${faq(bfaq)}</div></section>
<section class="wrap related"><div class="sec-head"><h2 class="sec-h">Related <em>reading</em></h2></div><div class="pgrid">${['finding-peace-and-joy', 'communication-in-marriage', 'family-conflict-patterns'].map((p) => post(p)).filter(Boolean).map((p) => postCard(p)).join('')}</div></section>
${cta({ h: 'Want to go deeper <em>together?</em>', p: 'The book is a beginning. If you would like support putting it into practice, Clancy sees clients in Nashville and by telehealth.' })}`;
    const bookLd = { '@context': 'https://schema.org', '@type': 'Book', name: `${BOOK.title}: ${BOOK.subtitle}`, author: { '@type': 'Person', '@id': SITE.url + '#clancy', name: 'Clancy Kiener' }, isbn: '9798218051327', numberOfPages: BOOK.pages, bookFormat: 'https://schema.org/Paperback', publisher: { '@type': 'Organization', name: BOOK.publisher }, datePublished: BOOK.isoDate, image: SITE.url + 'assets/img/book-cover.jpg', url: SITE.url + 'book/', sameAs: BOOK.amazon, description: BOOK.desc, aggregateRating: { '@type': 'AggregateRating', ratingValue: BOOK.rating, ratingCount: BOOK.ratings, bestRating: '5' } };
    return layout({ path: 'book/', title: 'Peace and Joy Guidebook by Clancy Kiener, LMFT | Buy on Amazon', desc: 'Peace and Joy Guidebook: Your Path to Embracing Life by Nashville therapist Clancy Kiener. Practical strategies for clearing harmful beliefs and connecting authentically. Rated 5.0 on Amazon.', body, active: 'book/', bodyClass: 'bookpage', ogType: 'book', ogImg: 'og-book.jpg', jsonld: [bookLd, faqLd(bfaq), crumbLd([['Home', ''], ['The Book', 'book/']])] });
  });
}
