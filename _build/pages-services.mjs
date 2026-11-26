import { SITE, SERVICES } from './data.mjs';
import * as T from './templates.mjs';
import { GLYPHS, benefitGlyph, bookFeature } from './parts.mjs';
const { esc, pic, arrow, ext, btn, eyebrow, faq, faqLd, crumbLd, crumbs, cta, postCard, bookCard, ALT, href, layout } = T;

export default function ({ out, post }) {
  out('services/', () => {
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Services', 'services/']])}
  <div class="phero__grid">
    <div>${eyebrow('Services')}<h1 class="phero__h" data-split>Therapy for couples, families <em>and you</em></h1></div>
    <p class="phero__lead" data-reveal>Seven ways to work with Clancy, each with a clear fee. Sessions take place in person at 4235 Hillsboro Pike in Nashville or by telehealth, Monday through Saturday.</p>
  </div>
</section>
<section class="svc-list wrap" aria-label="All services">
  ${SERVICES.map((s) => `<a class="srow" href="${href('services/' + s.slug + '/')}" data-reveal>
    <div class="srow__img">${pic(s.img, ALT[s.img], { sizes: '(min-width: 1024px) 220px, 100vw' })}</div>
    <div class="srow__main"><h2 class="srow__t">${esc(s.name)}</h2><p class="srow__d">${esc(s.lead)}</p></div>
    <div class="srow__price"><span class="srow__amt">${s.price.amount}</span><span class="srow__unit">${esc(s.price.unit)}</span></div>
    <span class="srow__go" aria-hidden="true">${arrow()}</span>
  </a>`).join('')}
</section>
<section class="wrap compare" aria-labelledby="cmp-h">
  <div class="sec-head">${eyebrow('Not sure where to start?')}<h2 id="cmp-h" class="sec-h" data-split>Choosing the <em>right fit</em></h2></div>
  <div class="cmp">
    <div class="cmp__c" data-reveal><h3>If it is mostly about your relationship</h3><p>Start with <a href="${href('services/couples-marriage-therapy/')}">couples &amp; marriage therapy</a>. If you are engaged or planning to marry, <a href="${href('services/premarital-counseling/')}">premarital counseling</a> is designed for you.</p></div>
    <div class="cmp__c" data-reveal><h3>If the whole household feels it</h3><p><a href="${href('services/family-therapy/')}">Family therapy</a> looks at the patterns between people, not one “problem person.”</p></div>
    <div class="cmp__c" data-reveal><h3>If it is about you</h3><p><a href="${href('services/individual-therapy/')}">Individual therapy</a> covers a wide range, with focused work for <a href="${href('services/anxiety-counseling/')}">anxiety</a>, <a href="${href('services/addiction-therapy/')}">addiction</a> and <a href="${href('services/trauma-family-of-origin-therapy/')}">trauma and family of origin</a>.</p></div>
  </div>
  <p class="cmp__note" data-reveal>Still unsure? The <a href="${href('contact/')}">Get Started form</a> takes about two minutes, and Clancy can help you decide.</p>
</section>
${bookFeature()}
${cta()}`;
    return layout({ path: 'services/', title: 'Therapy Services & Fees | Quiet Mind Therapy, Nashville TN', desc: 'Couples and marriage therapy, premarital counseling, family therapy, individual, anxiety, addiction and trauma therapy in Nashville with Clancy Kiener, LMFT. Transparent fees from $150.', body, active: 'services', jsonld: [crumbLd([['Home', ''], ['Services', 'services/']]), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE.url + 'services/' + s.slug + '/', name: s.name })) }] });
  });

  for (const s of SERVICES) {
    const path = 'services/' + s.slug + '/';
    out(path, () => {
      const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
      const go = href('contact/?service=' + s.slug);
      const priceCard = `<aside class="price" aria-label="Fee for ${esc(s.name)}">
        <p class="eyebrow">Transparent fee</p>
        <p class="price__amt">${s.price.amount}</p>
        <p class="price__unit">${esc(s.price.unit)}</p>
        <ul class="price__list"><li><span>Length</span><span>${esc(s.price.len)}</span></li><li><span>Format</span><span>In person or telehealth</span></li><li><span>Insurance</span><span>Not accepted · HSA welcome</span></li><li><span>Sliding scale</span><span>May be available</span></li></ul>
        ${s.price.note ? `<p class="price__note">${esc(s.price.note)}</p>` : ''}
        ${btn(go, 'Get started')}
        <a class="link link--quiet" href="${SITE.booking}" target="_blank" rel="noopener">Book online ${ext()}</a>
      </aside>`;
      const h1 = s.title.replace(' in Nashville, TN', '');
      const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Services', 'services/'], [s.name, path]])}
  <div class="shero">
    <div class="shero__text">
      ${eyebrow(esc(s.tag))}
      <h1 class="phero__h" data-split>${esc(h1)} <em>in Nashville</em></h1>
      <p class="phero__lead" data-reveal>${esc(s.lead)}</p>
      <div class="shero__meta" data-reveal><span class="pill pill--dark">${s.price.amount} · ${esc(s.price.unit)}</span><span class="pill pill--line">In person &amp; telehealth</span></div>
      <div class="hero__btns" data-reveal>${btn(go, 'Get started')}${btn('#fee', 'See the fee', 'line')}</div>
    </div>
    <div class="shero__img" data-clip>${pic(s.img, ALT[s.img], { sizes: '(min-width: 1024px) 44vw, 100vw', eager: true })}</div>
  </div>
</section>

<section class="sbody wrap">
  <div class="sbody__grid">
    <div class="sbody__main">
      <div class="prose">
        <h2>Understanding <em>${esc(s.name.toLowerCase().replace('&', 'and'))}</em></h2>
        ${s.overview.map((p) => `<p>${esc(p)}</p>`).join('')}
      </div>
      <div class="who" data-reveal>
        <h2 class="sub-h">Who it is <em>for</em></h2>
        <ul class="ticks ticks--grid">${s.who.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="sbody__side" id="fee">${priceCard}</div>
  </div>
</section>

<section class="flow wrap" aria-labelledby="flow-h">
  <div class="sec-head">${eyebrow('What sessions look like')}<h2 id="flow-h" class="sec-h" data-split>The shape of <em>the work</em></h2></div>
  <ol class="flow__list">${s.flow.map(([h, p], i) => `<li class="flow__step flow__step--${['a', 'b', 'c', 'd'][i]}" data-reveal><span class="flow__dot" aria-hidden="true"></span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
</section>

<section class="benefits wrap" aria-labelledby="ben-h">
  <div class="sec-head sec-head--center">${eyebrow('Benefits')}<h2 id="ben-h" class="sec-h" data-split>What can <em>change</em></h2></div>
  <div class="ben__grid">${s.benefits.map(([h, p], i) => `<article class="ben" data-reveal><span class="ben__g">${GLYPHS[benefitGlyph[i]]}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>
</section>

<section class="approach wrap" aria-labelledby="ap-h">
  <div class="approach__card">
    <div class="approach__img" data-clip>${pic(s.slug === 'couples-marriage-therapy' || s.slug === 'premarital-counseling' ? 'two-chairs' : 'stones-cairn', s.slug === 'couples-marriage-therapy' || s.slug === 'premarital-counseling' ? ALT['two-chairs'] : ALT['stones-cairn'], { sizes: '(min-width: 1024px) 36vw, 100vw' })}</div>
    <div class="approach__body">
      ${eyebrow('Approach & modalities')}
      <h2 id="ap-h" class="sec-h" data-split>How Clancy <em>works</em></h2>
      <p data-reveal>${esc(s.approach)}</p>
      <ul class="chips chips--line" data-reveal>${s.modalities.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="feeband wrap" aria-labelledby="fb-h">
  <div class="feeband__card" data-reveal>
    <div><p class="eyebrow eyebrow--light">The fee, plainly</p><h2 id="fb-h" class="feeband__h">${esc(s.name)}: <em>${s.price.amount}</em> ${esc(s.price.unit)}</h2>
    <p>${s.price.note ? esc(s.price.note) + ' ' : ''}Clancy does not take insurance. HSA cards, major credit cards, Venmo, Zelle, PayPal, Apple Cash, ACH, checks and cash are accepted. Depending on current availability and circumstances, a sliding scale may be available.</p></div>
    <div class="feeband__ctas">${btn(href('fees/'), 'All fees', 'cream')}${btn(go, 'Get started', 'ghost')}</div>
  </div>
</section>

<section class="sfaq wrap" aria-labelledby="sfaq-h">
  <div class="hfaq__grid">
    <div>${eyebrow('FAQ')}<h2 id="sfaq-h" class="sec-h" data-split>Common <em>questions</em></h2></div>
    ${faq(s.faq)}
  </div>
</section>

<section class="wrap related" aria-labelledby="rel-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Keep reading')}<h2 id="rel-h" class="sec-h">From the <em>Journal</em></h2></div></div>
  <div class="pgrid">${s.posts.map((p) => post(p)).filter(Boolean).map((p) => postCard(p)).join('')}</div>
</section>

<section class="wrap related" aria-labelledby="oth-h">
  <div class="sec-head"><h2 id="oth-h" class="sec-h">Other <em>services</em></h2></div>
  <div class="mini-svcs">${others.map((o) => `<a class="mini" href="${href('services/' + o.slug + '/')}" data-reveal><span class="mini__t">${esc(o.name)}</span><span class="mini__p">${o.price.amount}</span>${arrow()}</a>`).join('')}</div>
</section>

<section class="wrap">${bookCard('bookcard--wide')}</section>
${cta()}`;
      const serviceLd = { '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.meta, url: SITE.url + path, provider: { '@id': SITE.url + '#practice' }, areaServed: { '@type': 'City', name: 'Nashville, TN' }, offers: { '@type': 'Offer', price: s.price.amount.replace('$', ''), priceCurrency: 'USD', description: s.price.unit } };
      return layout({ path, title: `${s.title} | Clancy Kiener, LMFT`, desc: s.meta, body, active: 'services', jsonld: [serviceLd, faqLd(s.faq), crumbLd([['Home', ''], ['Services', 'services/'], [s.name, path]])] });
    });
  }
}
