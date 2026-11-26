import { SITE, BOOK, PAYMENTS, EXPERTISE, TOP, MODALITIES, SERVICES, FAQ_GROUPS } from './data.mjs';
import * as T from './templates.mjs';
import { testimonialBlock } from './parts.mjs';
const { esc, pic, mark, arrow, ext, btn, eyebrow, faq, faqLd, crumbLd, crumbs, cta, bookCard, crisis, ALT, href, layout, personLd, slugify } = T;

export default function ({ out }) {
  // ABOUT
  out('about/', () => {
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['About Clancy', 'about/']])}
  <div class="about-hero">
    <div class="about-hero__text">
      ${eyebrow('About Clancy')}
      <h1 class="phero__h" data-split>Clancy Kiener, <em>LMFT, D.Min.</em></h1>
      <p class="phero__lead" data-reveal>Licensed Marriage and Family Therapist in Nashville, Tennessee. Fifteen years in practice. Licensed in Tennessee and Oregon. Author, professional speaker and a steady, honest presence for the people she works with.</p>
      <div class="hero__btns" data-reveal>${btn(href('contact/'), 'Work with Clancy')}${btn(href('book/'), 'Read her book', 'line')}</div>
    </div>
    <div class="about-hero__art" data-reveal>
      <div class="about-hero__bg" data-clip>${pic('vessels-family', ALT['vessels-family'], { sizes: '(min-width: 1024px) 34vw, 90vw' })}</div>
      <div class="about-hero__photo">${pic('clancy-portrait', ALT['clancy-portrait'], { sizes: '240px', eager: true })}</div>
    </div>
  </div>
</section>

<section class="prose-sec wrap">
  <div class="prose-grid">
    <aside class="prose-aside" data-reveal><p class="eyebrow">In her words</p><blockquote class="aside-quote"><p>“Please feel free to reach out. If I am not the right fit we can work together to find a fit that will better suit your needs.”</p></blockquote></aside>
    <div class="prose">
      <h2>Meeting you <em>where you are</em></h2>
      <p>Clancy specializes in helping individuals heal from trauma, both environmental and narcissistic. Through her work, she has found that both family of origin and workplace dynamics often have a deep impact on mental health. With over fifteen years of experience, she works with individuals from diverse backgrounds, offering support that meets you where you are.</p>
      <p>Her practice, Quiet Mind Therapy, is dedicated to guiding people toward improved mental health. Alongside individual and addiction therapy, she offers couples and premarital counseling, complemented by creative processing and professional growth work. Her focus lies in fostering authentic communication and using innovative methods to enhance mental healthcare.</p>
      <p>She has years of experience working with people facing social anxiety, trauma, depression, autism, chemical addiction and family issues. She supports those recovering from family abuse and guides clients in reclaiming their creativity as part of the healing process.</p>
      <h2>Her approach <em>in the room</em></h2>
      <p>In a first session, you will discuss what is bringing you to therapy and begin identifying goals that matter to you. Clancy often uses Cognitive Behavioral Therapy (CBT), which helps explore how thoughts shape emotions and day-to-day experiences. Together, you work on ways to challenge unhelpful thought patterns so you can feel more in control and experience meaningful change.</p>
      <p>As a marriage and family therapist, she also looks at relationships as systems. The way a family communicated, handled conflict or kept secrets often echoes in adult relationships. Seeing those echoes clearly tends to replace blame with understanding, and understanding with choice.</p>
      <p>Sessions are available both in person at 4235 Hillsboro Pike in Nashville and via telehealth, and appointments are scheduled Monday through Saturday, most hours.</p>
    </div>
  </div>
</section>

<section class="creds wrap" aria-labelledby="creds-h">
  <div class="sec-head">${eyebrow('Credentials')}<h2 id="creds-h" class="sec-h" data-split>Education &amp; <em>licensure</em></h2></div>
  <div class="creds__grid">
    <div class="cred" data-reveal><p class="cred__k">Licensure</p><p class="cred__v">Licensed Marriage and Family Therapist</p><p class="cred__s">Tennessee License 1168 (verified by Psychology Today) · Oregon License T2367</p></div>
    <div class="cred" data-reveal><p class="cred__k">Doctorate</p><p class="cred__v">Doctor of Ministry</p><p class="cred__s">George Fox University, 2026</p></div>
    <div class="cred" data-reveal><p class="cred__k">Graduate study</p><p class="cred__v">Master’s degree</p><p class="cred__s">Trevecca Nazarene University, graduated 2011. Her author biography describes a master’s degree in religion.</p></div>
    <div class="cred" data-reveal><p class="cred__k">Undergraduate</p><p class="cred__v">Degree in Business</p><p class="cred__s">Integrating practical insight with relational and spiritual care</p></div>
    <div class="cred" data-reveal><p class="cred__k">Experience</p><p class="cred__v">15 years in practice</p><p class="cred__s">Therapist and professional speaker at treatment centers and churches</p></div>
    <div class="cred" data-reveal><p class="cred__k">Recognition</p><p class="cred__v">Verified by Psychology Today</p><p class="cred__s">Endorsed by Chris O’Rear, Pastoral Counselor, MDiv, MMFT, LCPT</p></div>
  </div>
</section>

<section class="spec wrap" aria-labelledby="spec-h">
  <div class="spec__grid">
    <div>${eyebrow('Specialties')}<h2 id="spec-h" class="sec-h" data-split>Where Clancy <em>can help</em></h2><p class="sec-p" data-reveal>Top specialties: ${TOP.join(', ').toLowerCase().replace(/^./, (c) => c.toUpperCase()).replace('adhd', 'ADHD')}. Areas of expertise from her Psychology Today profile:</p></div>
    <div><ul class="chips" data-reveal>${EXPERTISE.map((e) => `<li>${e}</li>`).join('')}</ul>
    <p class="eyebrow spec__mod">Types of therapy</p><ul class="chips chips--line" data-reveal>${MODALITIES.map((e) => `<li>${e}</li>`).join('')}</ul></div>
  </div>
</section>

<section class="personal wrap" aria-labelledby="personal-h">
  <div class="personal__card">
    <div class="personal__img" data-clip>${pic('hills-fog', ALT['hills-fog'], { sizes: '(min-width: 1024px) 45vw, 100vw' })}</div>
    <div class="personal__body">
      ${eyebrow('A personal note', 'eyebrow--light')}
      <h2 id="personal-h" class="sec-h" data-split>Beyond <em>the office</em></h2>
      <p data-reveal>Clancy lives in Middle Tennessee with her husband and their temperamental but lovable dog, Joey. She is a proud mom to her daughter and enjoys visiting with her mom, who also lives in Tennessee.</p>
      <p data-reveal>In her leisure time she likes to take walks, paint and write, and she has recently taken up writing poetry. In her therapy practice she focuses on empowerment, dreams, connection and nutrition.</p>
      <p class="fine" data-reveal>From Clancy’s author biography.</p>
    </div>
  </div>
</section>

<section class="wrap about-book">${bookCard('bookcard--wide')}</section>
${cta({ h: 'Ready when <em>you are.</em>' })}`;
    return layout({ path: 'about/', title: 'About Clancy Kiener, LMFT, D.Min. | Nashville Marriage & Family Therapist', desc: 'Meet Clancy Kiener, Licensed Marriage and Family Therapist (TN 1168, OR T2367) with 15 years in practice, a Doctor of Ministry and a focus on authentic communication.', body, active: 'about/', jsonld: [personLd(), crumbLd([['Home', ''], ['About', 'about/']])] });
  });

  // FEES
  out('fees/', () => {
    const rows = SERVICES.map((s) => `<tr><th scope="row"><a href="${href('services/' + s.slug + '/')}">${esc(s.name)}</a></th><td>${esc(s.price.len)}</td><td class="fee">${s.price.amount}</td><td class="src">${esc(s.price.note ? s.price.note : 'Published fee')}</td></tr>`).join('');
    const fq = [
      ['Why don’t you take insurance?', 'Clancy does not take insurance but accepts all other forms of payment. Many clients pay with a Health Savings Account (HSA) card.'],
      ['Is a sliding scale available?', 'Depending on current availability and circumstances, a sliding scale may be available for clients. Ask about it when you reach out; you can also note it in the Get Started form.'],
      ['What is a Good Faith Estimate?', 'Under the federal No Surprises Act, people who are not using insurance have the right to receive a Good Faith Estimate of the expected cost of care. You can ask for one before scheduling.'],
      ['What happens if I miss sessions?', 'Three cancellations or missed appointments within 24 hours of the scheduled session will result in a referral to another provider, based on clinical judgment and practice needs.'],
    ];
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Fees & insurance', 'fees/']])}
  <div class="phero__grid">
    <div>${eyebrow('Fees & insurance')}<h1 class="phero__h" data-split>Transparent fees, <em>no surprises</em></h1></div>
    <p class="phero__lead" data-reveal>Every fee is listed here in plain terms. Individual and couple sessions are $150. Premarital counseling is $400 for a two-hour session.</p>
  </div>
</section>
<section class="wrap fees">
  <div class="fees__cards">
    <div class="fcard fcard--a" data-reveal><p class="fcard__k">Individual session</p><p class="fcard__n">$150</p><p class="fcard__s">55 minutes · in person or telehealth</p></div>
    <div class="fcard fcard--b" data-reveal><p class="fcard__k">Couple session</p><p class="fcard__n">$150</p><p class="fcard__s">Per session · in person or telehealth</p></div>
    <div class="fcard fcard--c" data-reveal><p class="fcard__k">Premarital counseling</p><p class="fcard__n">$400</p><p class="fcard__s">2-hour session · includes an online relationship questionnaire</p></div>
  </div>
  <div class="table-wrap" data-reveal>
    <table class="ftable"><caption>Fees by service</caption><thead><tr><th scope="col">Service</th><th scope="col">Length</th><th scope="col">Fee</th><th scope="col">Notes</th></tr></thead><tbody>${rows}</tbody></table>
  </div>
</section>
<section class="wrap pay" aria-labelledby="pay-h">
  <div class="pay__grid">
    <div>${eyebrow('Payment')}<h2 id="pay-h" class="sec-h" data-split>Ways <em>to pay</em></h2><p class="sec-p" data-reveal>“I do not take insurance but I take all other forms of payment.” Accepted methods:</p></div>
    <ul class="chips" data-reveal>${PAYMENTS.map((p) => `<li>${p}</li>`).join('')}</ul>
  </div>
  <div class="notes">
    <div class="note" data-reveal><h3>Insurance</h3><p>Clancy does not take insurance. If you use a Health Savings Account, your HSA card is welcome.</p></div>
    <div class="note" data-reveal><h3>Sliding scale</h3><p>Depending on current availability and circumstances, a sliding scale may be available for clients.</p></div>
    <div class="note" data-reveal><h3>Good Faith Estimate</h3><p>You have the right to receive a Good Faith Estimate explaining how much your care will cost. Ask for one before your first session, or learn more at <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener">cms.gov/nosurprises</a>.</p></div>
    <div class="note" data-reveal><h3>Attendance</h3><p>Therapy works best with consistent attendance. Three cancellations or no-shows within 24 hours of a session will result in a referral to another provider.</p></div>
  </div>
</section>
<section class="wrap sfaq"><div class="hfaq__grid"><div>${eyebrow('Fee questions')}<h2 class="sec-h" data-split>The <em>fine print</em></h2></div>${faq(fq)}</div></section>
<section class="wrap">${bookCard('bookcard--wide')}</section>
${cta()}`;
    return layout({ path: 'fees/', title: 'Therapy Fees & Insurance | Quiet Mind Therapy, Nashville', desc: 'Transparent therapy fees in Nashville: individual and couple sessions $150, premarital counseling $400 for 2 hours. HSA accepted, no insurance, sliding scale may be available.', body, active: 'fees/', jsonld: [faqLd(fq), crumbLd([['Home', ''], ['Fees', 'fees/']])] });
  });

  // TESTIMONIALS
  out('testimonials/', () => {
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Testimonials', 'testimonials/']])}
  <div class="phero__grid"><div>${eyebrow('Testimonials')}<h1 class="phero__h" data-split>In their <em>own words</em></h1></div><p class="phero__lead" data-reveal>What clients have shared about working with Clancy, attributed by first name and initial to protect privacy.</p></div>
</section>
<section class="wrap testi testi--page">${testimonialBlock('quotes--page')}</section>
<section class="circle circle--small"><div class="circle__frame wrap"><div class="circle__media" data-clip>${pic('winding-path', ALT['winding-path'], { sizes: '100vw' })}</div><div class="circle__orb" data-reveal><h2 class="circle__h">A safe space to <em>heal and grow.</em></h2>${btn(href('contact/'), 'Get started')}</div></div></section>
<section class="wrap more-proof">
  <div class="notes notes--2">
    <div class="note" data-reveal><h3>Verified by Psychology Today</h3><p>Clancy’s license is verified on her Psychology Today profile, where she is endorsed by Chris O’Rear, Pastoral Counselor, MDiv, MMFT, LCPT.</p><a class="link" href="${SITE.pt}" target="_blank" rel="noopener">View profile ${ext()}</a></div>
    <div class="note" data-reveal><h3>Readers of her book</h3><p><em>Peace and Joy Guidebook</em> holds a ${BOOK.rating} out of 5 rating from ${BOOK.ratings} Amazon ratings.</p><a class="link" href="${BOOK.amazon}" target="_blank" rel="noopener" data-amazon>See it on Amazon ${ext()}</a></div>
  </div>
</section>
${cta()}`;
    return layout({ path: 'testimonials/', title: 'Client Testimonials | Clancy Kiener, LMFT, Nashville', desc: 'Read what clients say about therapy with Clancy Kiener, LMFT at Quiet Mind Therapy in Nashville: supportive, creative and a safe space to heal and grow.', body, jsonld: [crumbLd([['Home', ''], ['Testimonials', 'testimonials/']])] });
  });

  // FAQ
  out('faq/', () => {
    const all = FAQ_GROUPS.flatMap(([, items]) => items);
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['FAQ', 'faq/']])}
  <div class="phero__grid"><div>${eyebrow('FAQ')}<h1 class="phero__h" data-split>Questions, <em>answered plainly</em></h1></div><p class="phero__lead" data-reveal>Getting started, sessions, fees, policies and privacy. If your question is not here, call or text ${SITE.phone}.</p></div>
</section>
<section class="wrap faqpage">
  <nav class="faqnav" aria-label="FAQ topics">${FAQ_GROUPS.map(([g]) => `<a href="#${slugify(g)}">${esc(g)}</a>`).join('')}</nav>
  <div class="faqgroups">${FAQ_GROUPS.map(([g, items]) => `<section class="faqgroup" id="${slugify(g)}" aria-labelledby="${slugify(g)}-h"><h2 id="${slugify(g)}-h" class="sub-h">${esc(g)}</h2>${faq(items)}</section>`).join('')}</div>
</section>
<section class="wrap">${crisis('crisis--block')}</section>
${cta()}`;
    return layout({ path: 'faq/', title: 'Therapy FAQ | Quiet Mind Therapy with Clancy Kiener, Nashville', desc: 'Answers about therapy with Clancy Kiener, LMFT in Nashville: first sessions, telehealth, fees, insurance, sliding scale, cancellations, confidentiality and more.', body, jsonld: [faqLd(all), crumbLd([['Home', ''], ['FAQ', 'faq/']])] });
  });

  // 404
  out('404.html', () => {
    T.setRoot('/clancy-kiener-therapy/');
    const body = `<section class="nf wrap"><div class="nf__orb">${mark('mark')}</div><p class="eyebrow">Page not found</p><h1 class="phero__h">This path <em>wanders off.</em></h1><p class="phero__lead">The page you were looking for has moved or never existed. Let’s find your way back.</p><div class="hero__btns">${btn(href(''), 'Back home')}${btn(href('services/'), 'Services', 'line')}${btn(href('contact/'), 'Get started', 'line')}</div></section>`;
    return layout({ path: '404.html', title: 'Page not found | Quiet Mind Therapy', desc: 'This page could not be found.', body, noindex: true });
  });
}
