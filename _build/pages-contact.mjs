import { SITE } from './data.mjs';
import * as T from './templates.mjs';
import { GLYPHS } from './parts.mjs';
const { esc, pic, mark, arrow, ext, eyebrow, crumbLd, crumbs, crisis, ALT, href, layout, roll } = T;

export default function ({ out }) {
  out('contact/', () => {
    const chip = (name, v, type = 'checkbox') => `<label class="opt"><input type="${type}" name="${name}" value="${esc(v)}"><span>${esc(v)}</span></label>`;
    const ocard = (v, g, s) => `<label class="ocard"><input type="radio" name="who" value="${esc(v)}"><span class="ocard__g">${GLYPHS[g]}</span><span class="ocard__t">${esc(v)}</span><span class="ocard__s">${s}</span></label>`;
    const body = `
<section class="onb-wrap wrap">
  ${crumbs([['Home', ''], ['Get started', 'contact/']])}
  <div class="onb-grid">
    <div class="onb-intro">
      ${eyebrow('Get started')}
      <h1 class="phero__h" data-split>Begin <em>gently</em></h1>
      <p class="phero__lead" data-reveal>A few quiet questions, about two minutes. Nothing is sent from this page: at the end, you choose how to send your note to Clancy.</p>
      <ul class="onb-contact" data-reveal>
        <li><span>Call or text</span><a href="tel:${SITE.tel}">${SITE.phone}</a></li>
        <li><span>Email</span><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><span>Book directly</span><a href="${SITE.booking}" target="_blank" rel="noopener">Online scheduler ${ext()}</a></li>
        <li><span>Office</span><a href="${SITE.maps}" target="_blank" rel="noopener">${SITE.street}, Nashville, TN ${SITE.zip}</a></li>
        <li><span>Hours</span><span>${SITE.hours}</span></li>
      </ul>
      <div data-reveal>${crisis('crisis--block')}</div>
    </div>

    <div class="onb" data-onb>
      <div class="onb__head">
        <p class="onb__step-l" aria-live="polite" data-onb-label>Who it’s for</p>
        <ol class="onb__dots" aria-hidden="true"><li></li><li></li><li></li><li></li><li></li></ol>
      </div>
      <div class="onb__prog" aria-hidden="true"><span data-onb-bar></span></div>
      <form novalidate data-onb-form>
        <fieldset class="onb__step" data-step="who" data-label="Who it’s for">
          <legend class="onb__q">Who is this for?</legend>
          <p class="onb__hint">Choose the one that fits best.</p>
          <div class="cards">
            ${ocard('Just me', 'leaf', 'Individual therapy')}
            ${ocard('Me and my partner', 'ripple', 'Couples &amp; marriage')}
            ${ocard('We’re engaged', 'door', 'Premarital counseling')}
            ${ocard('Our family', 'stones', 'Family therapy')}
          </div>
          <p class="onb__err" role="alert" data-err></p>
        </fieldset>

        <fieldset class="onb__step" data-step="what" data-label="What’s going on" hidden>
          <legend class="onb__q">What’s going on?</legend>
          <p class="onb__hint">Choose any that apply. You can say more below, or nothing at all.</p>
          <div class="opts">${['Communication', 'Trust or betrayal', 'Frequent conflict', 'Feeling disconnected', 'Preparing for marriage', 'Parenting', 'Family of origin', 'Anxiety or stress', 'Depression', 'Trauma', 'Grief or loss', 'Addiction or recovery', 'ADHD or neurodivergence', 'Life transition', 'Spirituality', 'Something else'].map((v) => chip('what', v)).join('')}</div>
          <label class="field field--area"><span>Anything you’d like Clancy to know? <em>(optional)</em></span><textarea name="note" rows="3" maxlength="800" placeholder="A sentence or two is plenty."></textarea></label>
          <p class="onb__err" role="alert" data-err></p>
        </fieldset>

        <fieldset class="onb__step" data-step="prefs" data-label="Preferences" hidden>
          <legend class="onb__q">What would work best?</legend>
          <p class="onb__hint">Appointments are Monday through Saturday, most hours.</p>
          <p class="onb__sub">Format</p>
          <div class="opts opts--seg">${['In person in Nashville', 'Telehealth', 'Either is fine'].map((v) => chip('format', v, 'radio')).join('')}</div>
          <p class="onb__sub">Preferred times <em>(choose any)</em></p>
          <div class="opts">${['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Saturdays', 'Flexible'].map((v) => chip('times', v)).join('')}</div>
          <p class="onb__sub">Where you live</p>
          <div class="opts opts--seg">${['Tennessee', 'Oregon', 'Somewhere else'].map((v) => chip('state', v, 'radio')).join('')}</div>
          <label class="opt opt--check"><input type="checkbox" name="sliding" value="yes"><span>I’d like to ask about the sliding scale</span></label>
          <p class="onb__err" role="alert" data-err></p>
        </fieldset>

        <fieldset class="onb__step" data-step="you" data-label="Your details" hidden>
          <legend class="onb__q">How can Clancy reach you?</legend>
          <p class="onb__hint">Used only to prepare your note. Nothing is stored or sent by this website.</p>
          <div class="fields">
            <label class="field"><span>First name</span><input name="first" autocomplete="given-name" required></label>
            <label class="field"><span>Last name <em>(optional)</em></span><input name="last" autocomplete="family-name"></label>
            <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" inputmode="email" required></label>
            <label class="field"><span>Phone <em>(optional)</em></span><input name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
          </div>
          <p class="onb__sub">Best way to reach you</p>
          <div class="opts opts--seg">${['Email', 'Phone call', 'Text'].map((v) => chip('method', v, 'radio')).join('')}</div>
          <label class="opt opt--check"><input type="checkbox" name="ack" value="yes"><span>I understand this is not an emergency service. In a crisis I will call or text 988 or call 911.</span></label>
          <p class="onb__err" role="alert" data-err></p>
        </fieldset>

        <fieldset class="onb__step" data-step="review" data-label="Review" hidden>
          <legend class="onb__q">Take a look</legend>
          <p class="onb__hint">Everything look right? Tap any section to change it.</p>
          <dl class="review" data-review></dl>
        </fieldset>

        <div class="onb__done" data-step="done" hidden tabindex="-1">
          <span class="onb__moon" aria-hidden="true">${mark('mark')}</span>
          <h2 class="onb__q" data-done-h>Thank you.</h2>
          <p class="onb__done-p">Your note is ready. Because this website never stores or sends your information, the last step is yours: choose how to send it, and Clancy will be in touch.</p>
          <div class="handoff">
            <a class="hcard hcard--main" data-mailto href="mailto:${SITE.email}"><span class="hcard__t">Email your note</span><span class="hcard__s">Opens your email app, pre-filled to ${SITE.email}</span>${arrow()}</a>
            <a class="hcard" data-sms href="sms:${SITE.tel}"><span class="hcard__t">Text ${SITE.phone}</span><span class="hcard__s">Pre-filled with a short summary</span>${arrow()}</a>
            <a class="hcard" href="tel:${SITE.tel}"><span class="hcard__t">Call ${SITE.phone}</span><span class="hcard__s">Monday through Saturday</span>${arrow()}</a>
            <a class="hcard" href="${SITE.booking}" target="_blank" rel="noopener"><span class="hcard__t">Book online now</span><span class="hcard__s">Pick a time in the scheduler</span>${ext()}</a>
          </div>
          ${crisis('crisis--block')}
          <button type="button" class="link link--quiet" data-restart>Start over</button>
        </div>

        <div class="onb__nav" data-onb-nav>
          <button type="button" class="btn btn--line" data-back hidden>${roll('Back')}</button>
          <button type="button" class="btn btn--solid" data-next>${roll('Continue')}<span class="btn__arr" aria-hidden="true">${arrow()}${arrow()}</span></button>
        </div>
      </form>
    </div>
  </div>
  <div class="onb-img" data-clip>${pic('two-chairs', ALT['two-chairs'], { sizes: '100vw' })}</div>
</section>`;
    return layout({ path: 'contact/', title: 'Get Started | Contact Clancy Kiener, LMFT in Nashville', desc: 'Start therapy with Clancy Kiener, LMFT in Nashville. A quick, private two-minute form, or call or text 615-423-4140, email, or book online. In person or telehealth.', body, bodyClass: 'contactpage', jsonld: [crumbLd([['Home', ''], ['Get started', 'contact/']]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE.url + 'contact/', about: { '@id': SITE.url + '#practice' } }] });
  });

  out('privacy/', () => {
    const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Privacy & policies', 'privacy/']])}
  <div class="phero__grid"><div>${eyebrow('Privacy & policies')}<h1 class="phero__h" data-split>Your privacy, <em>protected</em></h1></div><p class="phero__lead" data-reveal>How this website handles information, Quiet Mind Therapy’s notice of privacy practices, office accessibility and practice policies.</p></div>
</section>
<section class="wrap">
  <div class="prose-grid">
    <nav class="prose-aside toc" aria-label="On this page"><p class="eyebrow">On this page</p><ol><li><a href="#website">This website</a></li><li><a href="#hipaa">Notice of privacy practices</a></li><li><a href="#accessibility">Office accessibility</a></li><li><a href="#policies">Practice policies</a></li></ol></nav>
    <div class="prose">
      <h2 id="website">This website</h2>
      <p>This website does not use cookies, analytics or advertising trackers, and it does not collect or store anything you type. The Get Started form runs entirely in your browser. When you finish it, you choose whether to send your note by opening your own email app, phone or messaging app, or the online scheduler. Anything you send through those services is handled by those services.</p>
      <p>Fonts are loaded from Google Fonts, which may receive your IP address as part of delivering the font files. Links to Amazon, Psychology Today, Facebook and the online scheduler take you to third-party sites with their own privacy policies.</p>
      <h2 id="hipaa">HIPAA notice of privacy practices</h2>
      <p>This notice describes how medical and mental health information about you may be used and disclosed, and how you can access this information. Please review it carefully.</p>
      <h3>Your rights</h3>
      <ul><li><strong>Access your records:</strong> you can ask to see or receive a copy of your counseling record.</li><li><strong>Request corrections:</strong> you can ask to correct information you believe is inaccurate or incomplete.</li><li><strong>Confidential communications:</strong> you can request to be contacted in a specific way (for example, only by phone, not email).</li><li><strong>Receive a copy of this notice:</strong> you can ask for a paper copy at any time, even if you agreed to receive it electronically.</li><li><strong>File a complaint:</strong> if you believe your privacy rights have been violated, you may file a complaint with the practice or with the U.S. Department of Health and Human Services (HHS). Filing a complaint will not affect your services.</li></ul>
      <h3>Right to confidentiality</h3>
      <p>At Quiet Mind Therapy, your privacy is of the utmost importance. What you share in counseling is kept confidential in accordance with professional ethics and federal and state laws. Information disclosed in counseling sessions is confidential and will not be shared without your written consent.</p>
      <h3>Exceptions to confidentiality</h3>
      <ul><li><strong>Imminent danger to self:</strong> if you are at risk of harming yourself.</li><li><strong>Imminent danger to others:</strong> if you threaten serious harm to another person.</li><li><strong>Abuse or neglect:</strong> if there is suspicion or disclosure of abuse or neglect of a child, elderly person or vulnerable adult.</li><li><strong>Court order:</strong> if required by law or court order.</li><li>Your written request to release information to a designated individual or organization.</li></ul>
      <h3>Our responsibilities</h3>
      <p>The practice is required by law to maintain the privacy and security of your protected health information (PHI), to follow the duties and privacy practices described in this notice, and to give you a copy upon request. Your information will not be used or shared other than as described here unless you give written authorization, which you may revoke in writing at any time.</p>
      <h3>Questions or complaints</h3>
      <p>Email <a href="mailto:${SITE.email}">${SITE.email}</a> or call <a href="tel:${SITE.tel}">${SITE.phone}</a>. You may also file a complaint with the U.S. Department of Health and Human Services, Office for Civil Rights, at 1-877-696-6775 or <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener">hhs.gov/ocr/privacy/hipaa/complaints</a>.</p>
      <h2 id="accessibility">Office accessibility</h2>
      <p>Quiet Mind Therapy is committed to maintaining an environment that is accessible and accommodating to individuals with mobility needs, in the spirit of the Americans with Disabilities Act (ADA).</p>
      <ul><li>Wheelchair-accessible entryways and restrooms</li><li>Elevator access for offices not located on the ground floor</li><li>Accessible and comfortable seating in the waiting area</li></ul>
      <p>If you encounter any accessibility barrier, in person or online, please let the practice know at <a href="mailto:${SITE.email}">${SITE.email}</a> or ${SITE.phone}. Every reasonable effort will be made to provide accommodations.</p>
      <h2 id="policies">Practice policies</h2>
      <h3>ADA and FMLA paperwork</h3><p>Clancy does not complete ADA or FMLA paperwork, based on HIPAA privacy requirements and the absence of a secure fax line. A primary care physician or medical provider can handle these forms securely.</p>
      <h3>Emotional Support Animal letters</h3><p>Clancy does not provide ESA evaluations or letters.</p>
      <h3>Court-related services</h3><p>Clancy does not attend court or provide court testimony, including custody hearings, disability hearings or other legal proceedings, except when she receives a court order. A forensic specialist is the right resource for court-related evaluations.</p>
      <h3>Attendance</h3><p>Therapy is most effective when appointments are attended consistently. Three cancellations or missed appointments within 24 hours of the scheduled session will result in a referral to another provider, based on clinical judgment and practice needs. If you need referrals for any of the services above, Clancy is glad to point you toward appropriate professionals.</p>
    </div>
  </div>
</section>
<section class="wrap">${crisis('crisis--block')}</section>`;
    return layout({ path: 'privacy/', title: 'Privacy Policy, HIPAA Notice & Policies | Quiet Mind Therapy', desc: 'Website privacy, HIPAA notice of privacy practices, office accessibility and practice policies for Quiet Mind Therapy with Clancy Kiener, LMFT in Nashville.', body, jsonld: [crumbLd([['Home', ''], ['Privacy', 'privacy/']])] });
  });
}
