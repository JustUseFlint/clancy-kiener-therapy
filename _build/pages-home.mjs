import { SITE, SERVICES, HOME_FAQ } from './data.mjs';
import * as T from './templates.mjs';
import { GLYPHS, svcCard, testimonialBlock, credStrip, bookFeature } from './parts.mjs';
const { pic, arrow, btn, eyebrow, faq, faqLd, cta, postCard, ALT, href, layout, personLd } = T;

export default function ({ out, POSTS }) {
  out('', () => {
    const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__frame" data-hero>
    <div class="hero__media">${pic('hero-cloud-room', ALT['hero-cloud-room'], { eager: true, sizes: '100vw' })}</div>
    <div class="hero__content">
      <p class="eyebrow eyebrow--pill" data-reveal>Clancy Kiener, LMFT, D.Min. · Nashville &amp; telehealth</p>
      <h1 id="hero-h" class="hero__h" data-split>Marriage &amp; family therapy, <em>held quietly.</em></h1>
      <p class="hero__p" data-reveal>Thoughtful, unhurried therapy for couples, families and individuals in Nashville, Tennessee. A place to slow down, say what is true, and find your way back to each other, and to yourself.</p>
      <div class="hero__btns" data-reveal>${btn(href('contact/'), 'Begin gently')}${btn(href('services/'), 'Explore services', 'glass')}</div>
    </div>
    <div class="hero__note" data-reveal>
      <p class="hero__note-t">Sessions from <strong>$150</strong></p>
      <p>In person on Hillsboro Pike, or by telehealth. Monday through Saturday, most hours.</p>
      <a class="link" href="${href('fees/')}">See transparent fees ${arrow()}</a>
    </div>
  </div>
</section>

${credStrip()}

<section class="intro wrap" aria-labelledby="intro-h">
  <div class="intro__grid">
    <div>
      ${eyebrow('A quieter kind of therapy')}
      <h2 id="intro-h" class="intro__h" data-split>Together, we can explore where you want to be, <em>and how to get there.</em></h2>
    </div>
    <div class="intro__side">
      <p data-reveal>Clancy Kiener is a Licensed Marriage and Family Therapist with fifteen years in practice, licensed in Tennessee and Oregon. Her focus is authentic communication: helping people say what is actually true, and be heard.</p>
      <p data-reveal>Therapy here looks at the whole picture: your relationships, your history and the pressures of everyday life. You will be met where you are, by someone who is direct, warm and practical.</p>
      <a class="link" href="${href('about/')}" data-reveal>Meet Clancy ${arrow()}</a>
    </div>
  </div>
  <div class="intro__art">
    <div class="intro__img intro__img--a" data-clip>${pic('stones-cairn', ALT['stones-cairn'], { sizes: '(min-width: 1024px) 50vw, 90vw' })}</div>
    <div class="intro__img intro__img--b" data-clip>${pic('linen-light', ALT['linen-light'], { sizes: '(min-width: 1024px) 26vw, 50vw' })}</div>
    <figure class="intro__quote" data-reveal><blockquote><p>“Through my work, I’ve found that both family of origin and workplace dynamics often have a deep impact on mental health.”</p></blockquote><figcaption>Clancy Kiener</figcaption></figure>
  </div>
</section>

<section class="steps wrap" aria-labelledby="steps-h">
  <div class="sec-head sec-head--center">
    ${eyebrow('How it works')}
    <h2 id="steps-h" class="sec-h" data-split>A few gentle steps <em>to begin</em></h2>
  </div>
  <div class="steps__grid">
    <article class="step step--a" data-reveal><span class="step__glyph">${GLYPHS.leaf}</span><h3>Share what’s going on</h3><p>Use the two-minute Get Started form, call or text, or email. Tell Clancy as much or as little as you like.</p><a class="step__go" href="${href('contact/')}" aria-label="Open the Get Started form">${arrow()}</a></article>
    <article class="step step--b" data-reveal><span class="step__glyph">${GLYPHS.ripple}</span><h3>Find a time that fits</h3><p>In person on Hillsboro Pike or telehealth, Monday through Saturday. Reminders come by text, email or both.</p><a class="step__go" href="${SITE.booking}" target="_blank" rel="noopener" aria-label="Book online">${arrow()}</a></article>
    <article class="step step--c" data-reveal><span class="step__glyph">${GLYPHS.door}</span><h3>Your first session</h3><p>You will talk about what is bringing you in and begin identifying goals that matter to you.</p><a class="step__go" href="${href('journal/what-to-expect-first-therapy-session/')}" aria-label="What to expect in a first session">${arrow()}</a></article>
  </div>
</section>

<section class="svcs wrap" aria-labelledby="svcs-h">
  <div class="sec-head sec-head--split">
    <div>${eyebrow('Services')}<h2 id="svcs-h" class="sec-h" data-split>Ways we can <em>work together</em></h2></div>
    <p class="sec-p" data-reveal>Every service lists its fee up front. No insurance maze, and a sliding scale may be available depending on current availability and circumstances.</p>
  </div>
  <div class="bento">
    ${SERVICES.map((s, i) => svcCard(s, 'scard--' + ['xl', 'tall', 'md', 'md', 'sm', 'sm', 'wide'][i])).join('')}
  </div>
</section>

<section class="circle" aria-labelledby="circle-h">
  <div class="circle__frame wrap">
    <div class="circle__media" data-clip>${pic('garden-pool', ALT['garden-pool'], { sizes: '100vw' })}</div>
    <div class="circle__orb" data-reveal>
      <h2 id="circle-h" class="circle__h">Healing is rarely <em>a straight line.</em> It can still be a gentle one.</h2>
      ${btn(href('contact/'), 'Take the first step', 'solid')}
    </div>
  </div>
</section>

${bookFeature()}

<section class="band" aria-labelledby="band-h">
  <div class="wrap">
    <div class="band__head">
      ${eyebrow('At a glance', 'eyebrow--light')}
      <h2 id="band-h" class="band__h" data-split>Clear about the things <em>that matter</em></h2>
    </div>
    <div class="band__grid">
      <div class="stat" data-reveal><p class="stat__n">$150</p><p class="stat__l">Individual and couple sessions</p></div>
      <div class="stat" data-reveal><p class="stat__n">55<span>min</span></p><p class="stat__l">Individual, anxiety and addiction sessions</p></div>
      <div class="stat" data-reveal><p class="stat__n">15<span>yrs</span></p><p class="stat__l">In practice</p></div>
      <div class="stat" data-reveal><p class="stat__n">TN<span>+</span>OR</p><p class="stat__l">Licensed in two states</p></div>
    </div>
    <div class="band__foot" data-reveal>
      <p>Clancy does not take insurance, but accepts HSA cards, all major cards, Venmo, Zelle, PayPal, Apple Cash, checks and cash.</p>
      ${btn(href('fees/'), 'Fees & insurance', 'cream')}
    </div>
  </div>
</section>

<section class="testi wrap" aria-labelledby="testi-h">
  <div class="sec-head sec-head--center">${eyebrow('Kind words')}<h2 id="testi-h" class="sec-h" data-split>Stories from <em>clients</em></h2></div>
  ${testimonialBlock()}
  <p class="testi__more" data-reveal><a class="link" href="${href('testimonials/')}">All testimonials ${arrow()}</a></p>
</section>

<section class="meet wrap" aria-labelledby="meet-h">
  <div class="meet__card">
    <div class="meet__photo" data-reveal>
      <div class="meet__frame">${pic('clancy-portrait', ALT['clancy-portrait'], { sizes: '320px' })}</div>
      <p class="meet__cap">Clancy Kiener, LMFT, D.Min.</p>
    </div>
    <div class="meet__body">
      ${eyebrow('Meet Clancy')}
      <h2 id="meet-h" class="sec-h" data-split>Direct, warm, and <em>on your side</em></h2>
      <p data-reveal>Clancy is a Licensed Marriage and Family Therapist with a Doctor of Ministry from George Fox University, a master’s degree, and an undergraduate degree in business, which lets her integrate practical insight with relational and spiritual care.</p>
      <p data-reveal>She works with people from diverse backgrounds on relationships, family patterns, trauma, anxiety, addiction and growth. She is also a professional speaker and the author of <a href="${href('book/')}"><em>Peace and Joy Guidebook</em></a>.</p>
      <ul class="ticks" data-reveal><li>Licensed in Tennessee (1168) and Oregon (T2367)</li><li>15 years in practice</li><li>Verified by Psychology Today</li></ul>
      <div data-reveal>${btn(href('about/'), 'About Clancy', 'line')}</div>
    </div>
  </div>
</section>

<section class="journal-prev wrap" aria-labelledby="jp-h">
  <div class="sec-head sec-head--split">
    <div>${eyebrow('The Journal')}<h2 id="jp-h" class="sec-h" data-split>Reading for <em>the in-between</em></h2></div>
    <a class="link" href="${href('journal/')}" data-reveal>All articles ${arrow()}</a>
  </div>
  <div class="pgrid">${POSTS.slice(0, 3).map((p) => postCard(p)).join('')}</div>
</section>

<section class="hfaq wrap" aria-labelledby="hfaq-h">
  <div class="hfaq__grid">
    <div>${eyebrow('Questions')}<h2 id="hfaq-h" class="sec-h" data-split>Good to <em>know</em></h2><p class="sec-p" data-reveal>Straight answers about cost, scheduling and what to expect.</p><a class="link" href="${href('faq/')}" data-reveal>Full FAQ ${arrow()}</a></div>
    ${faq(HOME_FAQ)}
  </div>
</section>

${cta()}`;
    return layout({ path: '', title: 'Clancy Kiener, LMFT | Marriage & Family Therapist in Nashville, TN', desc: 'Quiet Mind Therapy: couples, marriage, family and individual therapy in Nashville, TN with Clancy Kiener, LMFT, D.Min. In person and telehealth. Sessions $150.', body, bodyClass: 'home', jsonld: [personLd(), faqLd(HOME_FAQ)] });
  });
}
