/* Quiet Mind Therapy — interactions. Native scroll only; reveals run once, transform/opacity (+ clip for images). */
(() => {
  const d = document, root = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!reduce && hasGsap) root.classList.add('motion');
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];

  /* ---------- Motion ---------- */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
            const w = d.createElement('span'); w.className = 'w';
            const i = d.createElement('span'); i.textContent = part; w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    $$('.w', el).forEach((w) => w.setAttribute('aria-hidden', 'true'));
    el.classList.add('is-split');
  }

  if (!reduce && hasGsap) {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    const ease = 'power3.out';
    $$('[data-split]').forEach((el) => {
      splitWords(el);
      const inner = $$('.w > span', el);
      gsap.set(inner, { yPercent: 110 });
      const inHero = el.closest('[data-hero]') || el.closest('.phero, .bhero, .post__hero, .onb-wrap');
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045, delay: inHero ? 0.15 : 0 }) });
    });
    // batch reveals so siblings stagger
    ScrollTrigger.batch('[data-reveal]', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease, stagger: 0.08, overwrite: true }) });
    $$('[data-clip]').forEach((el) => {
      const img = el.querySelector('img');
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => {
        gsap.to(el, { clipPath: 'inset(0% 0 0 0 round 0px)', duration: 1.4, ease: 'expo.out', onComplete: () => { el.style.clipPath = 'none'; } });
        if (img) gsap.to(img, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform' });
      } });
    });
    // hero entrance
    const hero = d.querySelector('[data-hero] .hero__media img');
    if (hero) gsap.fromTo(hero, { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
    // gentle idle float for book objects (transform only, not scroll-linked)
    $$('[data-float]').forEach((el) => gsap.to(el, { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
    // safety net: never leave content hidden
    setTimeout(() => { $$('[data-reveal]').forEach((el) => { if (getComputedStyle(el).opacity === '0' && el.getBoundingClientRect().top < innerHeight) gsap.to(el, { opacity: 1, y: 0, duration: .6 }); }); }, 2500);
    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    $$('[data-split]').forEach((el) => el.classList.add('is-split'));
  }

  /* ---------- Header ---------- */
  const hdr = d.querySelector('[data-hdr]');
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('is-scrolled', y > 30);
    if (!d.body.classList.contains('menu-open')) hdr.classList.toggle('is-hidden', y > 320 && y > lastY + 4);
    if (y < lastY - 4) hdr.classList.remove('is-hidden');
    lastY = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });

  // Mega menu keyboard / touch
  const trig = d.querySelector('[data-mega-trigger]'), mega = d.querySelector('[data-mega]');
  if (trig && mega) {
    const li = trig.parentElement;
    li.addEventListener('mouseenter', () => trig.setAttribute('aria-expanded', 'true'));
    li.addEventListener('mouseleave', () => { trig.setAttribute('aria-expanded', 'false'); mega.classList.remove('is-open'); });
    trig.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); mega.classList.add('is-open'); trig.setAttribute('aria-expanded', 'true'); mega.querySelector('a')?.focus(); } });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) { mega.classList.remove('is-open'); trig.setAttribute('aria-expanded', 'false'); } });
    mega.addEventListener('keydown', (e) => { if (e.key === 'Escape') { mega.classList.remove('is-open'); trig.focus(); } });
  }

  // Mobile sheet
  const burger = d.querySelector('[data-burger]'), sheet = d.querySelector('[data-sheet]');
  if (burger && sheet) {
    const label = burger.querySelector('.burger__t');
    const open = () => {
      sheet.hidden = false; d.body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true'); label.textContent = 'Close'; hdr.classList.remove('is-hidden');
      if (!reduce && hasGsap) {
        window.gsap.fromTo(sheet, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: .9, ease: 'expo.out' });
        window.gsap.fromTo($$('[data-sheet-item]', sheet), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'expo.out', stagger: .04, delay: .12 });
      }
      sheet.querySelector('a')?.focus({ preventScroll: true });
    };
    const close = () => {
      const done = () => { sheet.hidden = true; d.body.classList.remove('menu-open'); };
      burger.setAttribute('aria-expanded', 'false'); label.textContent = 'Menu';
      if (!reduce && hasGsap) window.gsap.to(sheet, { clipPath: 'circle(0% at 100% 0%)', duration: .55, ease: 'power3.in', onComplete: done }); else done();
    };
    burger.addEventListener('click', () => (burger.getAttribute('aria-expanded') === 'true' ? close() : open()));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { close(); burger.focus(); } });
    sheet.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) close(); });
    matchMedia('(min-width: 1181px)').addEventListener('change', (m) => { if (m.matches && !sheet.hidden) close(); });
  }

  /* ---------- FAQ accordions ---------- */
  $$('.faq__q button').forEach((b) => {
    const panel = d.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click', () => {
      const isOpen = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) { panel.classList.remove('is-open'); setTimeout(() => { if (b.getAttribute('aria-expanded') === 'false') panel.hidden = true; }, reduce ? 0 : 500); }
      else { panel.hidden = false; void panel.offsetHeight; panel.classList.add('is-open'); }
    });
  });

  /* ---------- Journal filters ---------- */
  const chips = $$('[data-filter]');
  chips.forEach((c) => c.addEventListener('click', () => {
    const f = c.dataset.filter;
    chips.forEach((x) => { x.classList.toggle('is-on', x === c); x.setAttribute('aria-pressed', String(x === c)); });
    $$('.journal .pcard').forEach((p) => { const show = f === 'all' || p.dataset.cat === f; p.classList.toggle('is-hidden', !show); if (show) { p.style.opacity = 1; p.style.transform = 'none'; } });
  }));

  /* ---------- Post: TOC highlight + book bar ---------- */
  const tocLinks = $$('.post__side .toc a');
  if (tocLinks.length) {
    const toc = d.querySelector('.post__side .toc');
    const setH = () => d.querySelector('.post__side')?.style.setProperty('--toc-h', toc.offsetHeight + 24 + 'px');
    setH(); addEventListener('resize', setH);
    const heads = tocLinks.map((a) => d.getElementById(a.hash.slice(1))).filter(Boolean);
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { tocLinks.forEach((a) => a.classList.toggle('is-active', a.hash === '#' + e.target.id)); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach((h) => io.observe(h));
  }
  const bar = d.querySelector('[data-bookbar]');
  if (bar) {
    const body = d.querySelector('.post__body'); let dismissed = false;
    bar.hidden = false;
    bar.querySelector('[data-bookbar-x]').addEventListener('click', () => { dismissed = true; bar.classList.remove('is-on'); });
    const upd = () => { if (dismissed) return; const r = body.getBoundingClientRect(); bar.classList.toggle('is-on', r.top < innerHeight * 0.3 && r.bottom > innerHeight * 0.9); };
    addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- Onboarding ---------- */
  const onb = d.querySelector('[data-onb]');
  if (onb) initOnboarding(onb);

  function initOnboarding(box) {
    const form = box.querySelector('[data-onb-form]');
    const steps = $$('[data-step]', form).filter((s) => s.dataset.step !== 'done');
    const done = form.querySelector('[data-step="done"]');
    const next = form.querySelector('[data-next]'), back = form.querySelector('[data-back]'), nav = form.querySelector('[data-onb-nav]');
    const bar = box.querySelector('[data-onb-bar]'), label = box.querySelector('[data-onb-label]'), dots = $$('.onb__dots li', box);
    const EMAIL = 'clancy@quietmindtherapy.com';
    let i = 0;
    // preselect from ?service=
    const svcMap = { 'couples-marriage-therapy': 'Me and my partner', 'premarital-counseling': 'We’re engaged', 'family-therapy': 'Our family', 'individual-therapy': 'Just me', 'anxiety-counseling': 'Just me', 'addiction-therapy': 'Just me', 'trauma-family-of-origin-therapy': 'Just me' };
    const svcChip = { 'anxiety-counseling': 'Anxiety or stress', 'addiction-therapy': 'Addiction or recovery', 'trauma-family-of-origin-therapy': 'Trauma', 'premarital-counseling': 'Preparing for marriage' };
    const q = new URLSearchParams(location.search).get('service');
    if (q && svcMap[q]) { const r = form.querySelector(`input[name="who"][value="${svcMap[q]}"]`); if (r) r.checked = true; }
    if (q && svcChip[q]) { const c = form.querySelector(`input[name="what"][value="${svcChip[q]}"]`); if (c) c.checked = true; }

    const val = (n) => form.querySelector(`input[name="${n}"]:checked`)?.value || '';
    const vals = (n) => $$(`input[name="${n}"]:checked`, form).map((x) => x.value);
    const field = (n) => form.elements[n];
    const err = (msg) => { const e = steps[i].querySelector('[data-err]'); if (e) e.textContent = msg || ''; };

    function validate() {
      const s = steps[i].dataset.step;
      $$('.field.is-bad', steps[i]).forEach((f) => f.classList.remove('is-bad'));
      if (s === 'who' && !val('who')) return err('Please choose who this is for.'), false;
      if (s === 'what' && !vals('what').length && !field('note').value.trim()) return err('Choose at least one topic, or write a short note.'), false;
      if (s === 'prefs' && !val('format')) return err('Please choose in person, telehealth or either.'), false;
      if (s === 'prefs' && !val('state')) return err('Please tell us where you live (this affects telehealth licensing).'), false;
      if (s === 'you') {
        const first = field('first'), email = field('email');
        if (!first.value.trim()) { first.closest('.field').classList.add('is-bad'); first.focus(); return err('Please add your first name.'), false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { email.closest('.field').classList.add('is-bad'); email.focus(); return err('Please add a valid email address.'), false; }
        const ph = field('phone').value.trim();
        if ((val('method') === 'Phone call' || val('method') === 'Text') && ph.replace(/\D/g, '').length < 10) { field('phone').closest('.field').classList.add('is-bad'); field('phone').focus(); return err('Please add a phone number so Clancy can call or text you.'), false; }
        if (ph && ph.replace(/\D/g, '').length < 10) { field('phone').closest('.field').classList.add('is-bad'); return err('That phone number looks incomplete.'), false; }
        if (!val('method')) return err('Please choose the best way to reach you.'), false;
        if (!form.querySelector('input[name="ack"]').checked) return err('Please confirm you understand this is not an emergency service.'), false;
      }
      err(''); return true;
    }

    function summary() {
      return [
        ['Who it’s for', val('who'), 0],
        ['What’s going on', [...vals('what'), field('note').value.trim() && `“${field('note').value.trim()}”`].filter(Boolean).join(', '), 1],
        ['Format', val('format'), 2],
        ['Times', vals('times').join(', ') || 'No preference', 2],
        ['Location', val('state') + (form.querySelector('input[name="sliding"]').checked ? ' · asking about sliding scale' : ''), 2],
        ['Name', [field('first').value.trim(), field('last').value.trim()].filter(Boolean).join(' '), 3],
        ['Email', field('email').value.trim(), 3],
        ['Phone', field('phone').value.trim() || '—', 3],
        ['Reach me by', val('method'), 3],
      ];
    }

    function render(focus = true) {
      steps.forEach((s, k) => { s.hidden = k !== i; });
      done.hidden = true; nav.hidden = false;
      back.hidden = i === 0;
      const last = i === steps.length - 1;
      next.querySelector('.roll').dataset.t = last ? 'Prepare my note' : 'Continue';
      next.querySelector('.roll > span').textContent = last ? 'Prepare my note' : 'Continue';
      bar.style.width = ((i + 1) / (steps.length + 1)) * 100 + '%';
      label.textContent = steps[i].dataset.label;
      dots.forEach((dt, k) => { dt.classList.toggle('is-on', k === i); dt.classList.toggle('is-done', k < i); });
      if (steps[i].dataset.step === 'review') {
        const dl = form.querySelector('[data-review]');
        dl.innerHTML = '';
        summary().forEach(([k, v, step]) => {
          const row = d.createElement('div');
          const dt = d.createElement('dt'); dt.textContent = k;
          const dd = d.createElement('dd'); dd.textContent = v || '—';
          const b = d.createElement('button'); b.type = 'button'; b.textContent = 'Edit'; b.setAttribute('aria-label', 'Edit ' + k);
          b.addEventListener('click', () => go(step));
          row.append(dt, dd, b); dl.appendChild(row);
        });
      }
      if (!reduce && hasGsap) window.gsap.fromTo(steps[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' });
      if (focus) { const t = steps[i].querySelector('legend'); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); if (box.getBoundingClientRect().top < 0) box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    }
    function go(k) { i = k; render(); }

    function finish() {
      const s = summary();
      const first = field('first').value.trim();
      const lines = s.map(([k, v]) => `${k}: ${v || '—'}`).join('\n');
      const subject = `New client inquiry from ${first} (${val('who')})`;
      const bodyTxt = `Hi Clancy,\n\nI found your website and would like to talk about starting therapy.\n\n${lines}\n\nThank you,\n${[first, field('last').value.trim()].filter(Boolean).join(' ')}`;
      form.querySelector('[data-mailto]').href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyTxt)}`;
      const sms = `Hi Clancy, this is ${first}. I'd like to ask about ${val('who').toLowerCase()} sessions (${val('format').toLowerCase()}). Best way to reach me: ${val('method').toLowerCase()}.`;
      form.querySelector('[data-sms]').href = `sms:+16154234140?&body=${encodeURIComponent(sms)}`;
      steps.forEach((x) => { x.hidden = true; }); nav.hidden = true; done.hidden = false;
      done.querySelector('[data-done-h]').textContent = `Thank you, ${first}.`;
      bar.style.width = '100%'; label.textContent = 'Ready to send';
      dots.forEach((dt) => { dt.classList.remove('is-on'); dt.classList.add('is-done'); });
      if (!reduce && hasGsap) window.gsap.fromTo(done.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', stagger: .06 });
      done.focus({ preventScroll: true });
    }

    next.addEventListener('click', () => { if (!validate()) return; if (i === steps.length - 1) finish(); else go(i + 1); });
    back.addEventListener('click', () => { if (i > 0) go(i - 1); });
    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && e.target.type !== 'radio') { e.preventDefault(); next.click(); } });
    form.addEventListener('change', () => err(''));
    form.addEventListener('input', (e) => { const f = e.target.closest('.field'); if (f) f.classList.remove('is-bad'); });
    $$('input[name="who"]', form).forEach((r) => r.addEventListener('change', () => { if (i === 0) setTimeout(() => go(1), reduce ? 0 : 280); }));
    form.querySelector('[data-restart]').addEventListener('click', () => { form.reset(); go(0); });
    render(false);
  }
})();
