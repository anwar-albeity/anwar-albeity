(() => {
  const M = window.ME, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), mix = (a, b, v) => a + (b - a) * v, ease = (v) => v * v * (3 - 2 * v), f1 = (v) => v.toFixed(1);
  const wa = `https://wa.me/${M.whatsapp}?text=${encodeURIComponent('Hi Anwar, I found your portfolio and would like to talk.')}`;
  const studio = M.studio.url ? `<a href="${esc(M.studio.url)}" target="_blank" rel="noopener">${esc(M.studio.name)}</a>` : esc(M.studio.name);
  const body = document.body, main = $('#main');
  let watchFilms = () => {};

  // ---- the sections: each one opens on its picture whole, then the words ----
  const PROJ = Object.fromEntries(M.work.map((w, i) => [`p-${w.slug}`, i]));
  const VIEWS = ['info', 'work', 'record', 'contact', ...Object.keys(PROJ)];
  const NEXT = { info: ['work', 'Work'], work: ['contact', 'Contact'], record: ['contact', 'Contact'], contact: ['', 'The islands'] };
  M.work.forEach((w, i) => { const n = M.work[i + 1]; NEXT[`p-${w.slug}`] = n ? [`p-${n.slug}`, n.title] : ['work', 'All work']; });
  const cr = (k, v) => `<p class="cr"><b>${k}:</b> ${v}</p>`;
  const hero = (a, b, line) => `
    <section class="hero" aria-label="${esc(a)}">
      <h1 class="hero__name"><span>${esc(a)}</span><span>${esc(b)}</span></h1><hr>
      <p>${line}</p><hr>
    </section>`;
  const end = (v, extra = '') => `
    <section class="end" aria-label="Next">
      <div class="end__info">
        <p><b>${esc(M.name)}</b><span>${esc(M.location)}</span></p><hr>
        ${extra}
        <p><a href="#${NEXT[v][0]}">Next: ${esc(NEXT[v][1])} →</a></p><hr>
      </div>
    </section>
    <p class="foot">${esc(M.name)} © ${new Date().getFullYear()} · ${esc(M.location)}</p>`;
  // the CV: a small sheet that lifts and turns its corner when you point at it
  const cvLink = `<a class="cvl" href="${esc(M.cv)}" download target="_blank" rel="noopener">
      <span class="cvl__sheet" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="cvl__t"><b>Curriculum vitae</b><span>PDF · two pages · A4</span></span>
      <span class="cvl__go" aria-hidden="true">↓</span>
    </a>`;
  const reach = `<p><a href="mailto:${esc(M.email)}">${esc(M.email)}</a><a href="${esc(wa)}" target="_blank" rel="noopener">WhatsApp</a>${M.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}</p><hr>`;
  const PAGES = {
    info: () => `${hero(M.name, M.location, `${esc(M.roles)} Founder of ${studio}${/\.$/.test(M.studio.name) ? '' : '.'}`)}
      <section aria-label="Info">
        <p class="k">Info</p>
        ${cr('Based', esc(M.location))}
        ${M.education.map(([, t]) => cr(/CPA/.test(t) ? 'Qualifying' : 'Studied', esc(t))).join('')}
        ${cr('By day', esc(M.experience[1][1]))}
        ${cr('Founded', `${studio}, 2025`)}
        ${cvLink}
        <p>${esc(M.lede)}</p>
        ${M.story.map((t) => `<p class="gap">${t}</p>`).join('')}
        <p class="quote">“${esc(M.pullquote)}”<br>${esc(M.signoff)}</p>
        <hr>
      </section>${M.films && M.films.info ? film(M.films.info) : ''}${end('info', '<p>Design, development, audit</p><hr>')}`,
    work: () => `${hero('Work', `${M.work.length} projects`, 'Brands, websites and the systems behind them.')}
      <section class="work" aria-label="Selected work">
        <p class="k">Selected work</p>
        ${M.work.map((w, i) => `
        <article class="job" data-job="${i}" data-set="${i + 1}" tabindex="0">
          <p class="job__t"><b>${esc(w.title)}</b><span>${esc(w.year)}</span></p>
          <p>${esc(w.kind)}</p>
          <p class="job__line">${esc(w.line)}</p>
          <p>${esc(w.role)} · <a href="#p-${esc(w.slug)}">Read the project →</a></p>
        </article>`).join('')}
      </section>${end('work')}`,
    record: () => `${hero('Record', 'CV', 'Designer, developer and auditor, on paper.')}
      <section aria-label="The record">
        <p class="k">Crafts</p>
        ${M.crafts.map(([k, v]) => cr(k, esc(v))).join('')}
        <hr>
        <p class="k">Experience</p>
        ${M.experience.map(([y, t]) => cr(esc(y), esc(t))).join('')}
        <p class="k">Education</p>
        ${M.education.map(([y, t]) => cr(esc(y), esc(t))).join('')}
        <p class="k">Certificates</p>
        ${M.certificates.map((c) => `<p>${esc(c)}, certificate</p>`).join('')}
        ${cvLink}
      </section>${end('record')}`,
    contact: () => `${hero('Contact', M.location, 'For a brand, a website or a system, write or send a WhatsApp.')}
      <section aria-label="Contact">
        <p class="k">Write</p>
        ${cr('Email', `<a href="mailto:${esc(M.email)}">${esc(M.email)}</a>`)}
        ${cr('WhatsApp', `<a href="${esc(wa)}" target="_blank" rel="noopener">+${esc(M.whatsapp)}</a>`)}
        ${M.socials.map((s) => cr(esc(s.label), `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url.replace(/^https?:\/\//, ''))}</a>`)).join('')}
        <hr>
        <p class="k">Studio</p>
        <p>For agency work (branding, websites, ERP and CRM systems) there is ${studio}, also in ${esc(M.location.split(',')[0])}.</p>
        <hr>
      </section>${M.films && M.films.contact ? film(M.films.contact) : ''}${end('contact', reach)}`,
  };
  // A project page: the cover whole at the top, then three chapters (the brief, what it does, before and
  // after), each with its own picture in the bubble, then the next project.
  // the film: it starts by itself when it comes into view (the bubble squares up while it runs), with sound;
  // the round button in its corner, or a tap on the film, turns the sound off and on
  // f: { src, poster, length, title, cap }; set: which picture the bubble shows while it is read (project pages only)
  const film = (f, set) => `
      <section class="film"${set == null ? '' : ` data-set="${set}"`} aria-label="The film">
        <p class="k">The film</p>
        <figure class="film__box">
          <video src="${esc(f.src)}" poster="${esc(f.poster)}" playsinline muted loop preload="metadata" aria-label="A short drawn film: ${esc(f.title)}"></video>
          <button class="film__snd" type="button" aria-label="Sound on" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="spk" d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path class="w1" d="M15 9.3a3.6 3.6 0 0 1 0 5.4"/><path class="w2" d="M17.6 6.8a7.2 7.2 0 0 1 0 10.4"/><path class="x" d="M15.5 9.5l5 5m0-5l-5 5"/></svg></button>
          <i class="film__bar" aria-hidden="true"><i></i></i>
        </figure>
        <p class="film__cap">${esc(f.cap || `${f.title} in a few drawings.`)}</p>
        <hr>
      </section>`;
  const project = (i) => {
    const w = M.work[i];
    return `${hero(w.title, String(w.year), `${esc(w.kind)}. <em>${esc(w.line)}</em>`)}
      <section class="chap" data-set="0" aria-label="The project">
        <p class="k">The project</p>
        ${cr('Client', esc(w.client))}
        ${cr('Role', esc(w.role))}
        ${cr('Status', esc(w.status))}
        ${cr('Scope', w.scope.map(esc).join(', '))}
        ${w.link ? cr('Live', `<a href="${esc(w.link)}" target="_blank" rel="noopener">${esc(w.link.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>`) : ''}
        <hr>
        <p>${esc(w.about)}</p>
        <hr>
      </section>
      <section class="chap" data-set="1" aria-label="What it does">
        <p class="k">What it does</p>
        <ol class="does" role="list">${w.does.map(([t, d], n) => `<li><span class="does__n">${String(n + 1).padStart(2, '0')}</span><p><b>${esc(t)}</b><br>${esc(d)}</p></li>`).join('')}</ol>
        <hr>
      </section>
      <section class="chap" data-set="2" aria-label="Before and after">
        <p class="k">Before</p>
        <p>${esc(w.before)}</p>
        <p class="k">After</p>
        <p class="ba__after">${esc(w.after)}</p>
        <hr>
      </section>${w.film ? film({ ...w.film, title: w.title }, 2) : ''}${end(`p-${w.slug}`, `<p>${esc(w.title)}, ${esc(w.year)}</p><hr>`)}`;
  };
  M.work.forEach((w, i) => { PAGES[`p-${w.slug}`] = () => project(i); });

  // ---- the stick figure: you, in ink (the curls and the beard) ----
  // A skeleton of joint angles. Angles are degrees from straight down (90 points right on screen, -90 left);
  // knees and elbows bend relative to the bone above. The loader dances it; the Contact bubble waves it.
  const POSE = {
    stand: { lean: 0, la: 14, le: 4, ra: -14, re: -4, lh: 5, lk: 0, rh: -5, rk: 0, y: 0, sx: 1 },
    up: { lean: 0, la: 165, le: 18, ra: -165, re: -18, lh: 4, lk: 0, rh: -4, rk: 0, y: -4, sx: 1 },
    open: { lean: 0, la: 92, le: 6, ra: -92, re: -6, lh: 14, lk: 0, rh: -14, rk: 0, y: -2, sx: 1 },
    plie: { lean: 0, la: 70, le: 40, ra: -70, re: -40, lh: 42, lk: -58, rh: -42, rk: 58, y: 20, sx: 1 },
    arab: { lean: 32, la: 118, le: 0, ra: -150, re: 0, lh: -4, lk: 0, rh: 98, rk: -8, y: -2, sx: 1 },
    turn: { lean: 0, la: 168, le: 16, ra: -168, re: -16, lh: 2, lk: 0, rh: -40, rk: 75, y: -8, sx: -1 },
    kick: { lean: -10, la: 100, le: 4, ra: -96, re: -4, lh: 3, lk: 0, rh: -128, rk: 4, y: -2, sx: 1 },
    hop: { lean: 0, la: 150, le: 12, ra: -150, re: -12, lh: 22, lk: -34, rh: -22, rk: 34, y: -38, sx: 1 },
    bow: { lean: 40, la: 70, le: 40, ra: -6, re: -8, lh: 3, lk: 0, rh: -10, rk: 6, y: 3, sx: 1 },
    crouch: { lean: 12, la: 40, le: 50, ra: -40, re: -50, lh: 55, lk: -80, rh: -55, rk: 80, y: 28, sx: 1 },
    leap: { lean: -6, la: 140, le: 10, ra: -120, re: -10, lh: 80, lk: -10, rh: -95, rk: 10, y: -70, sx: 1 },
  };
  const NAMES = { stand: 'First position', up: 'Fifth, arms up', open: 'Second', plie: 'Plié', arab: 'Arabesque', turn: 'Pirouette', kick: 'Grand battement', hop: 'Sauté', bow: 'Révérence' };
  const vec = (a, len) => { const r = (a * Math.PI) / 180; return [Math.sin(r) * len, Math.cos(r) * len]; };
  const lerpPose = (A, Bp, k) => Object.fromEntries(Object.keys(A).map((key) => [key, mix(A[key], Bp[key], k)]));
  const smooth = (k) => k * k * k * (k * (6 * k - 15) + 10);
  const figGeo = (P) => {
    const hip = [0, P.y], lean = P.lean;
    const add = (a, b) => [a[0] + b[0], a[1] + b[1]], pt = (q) => `${f1(q[0] * P.sx)} ${f1(q[1])}`;
    const neck = add(hip, vec(180 + lean, 76)), sh = add(hip, vec(180 + lean, 62)), headC = add(hip, vec(180 + lean, 102));
    const limb = (from, a1, a2, l1, l2, foot) => {
      const k = add(from, vec(a1 + lean * 0.3, l1)), e = add(k, vec(a1 + a2 + lean * 0.3, l2));
      return `M${pt(from)} L${pt(k)} L${pt(e)}${foot ? ` L${pt(add(e, vec(a1 + a2 + foot, 12)))}` : ''}`;
    };
    return {
      body: `M${pt(hip)} L${pt(neck)}`,
      armL: limb(sh, P.la + lean, P.le, 28, 27), armR: limb(sh, P.ra + lean, P.re, 28, 27),
      legL: limb(hip, P.lh, P.lk, 34, 36, 90), legR: limb(hip, P.rh, P.rk, 34, 36, -90),
      head: `translate(${pt(headC)}) rotate(${f1(-lean * P.sx)}) scale(${f1(P.sx)} 1)`,
      hand: add(sh, add(vec(P.ra + lean + lean * 0.3, 28), vec(P.ra + P.re + lean * 1.3, 27))).map((x, i) => (i ? x : x * P.sx)),
    };
  };
  const FACE = `${[[-24, -10], [-19, -21], [-9, -28], [3, -30], [14, -26], [22, -18], [26, -7], [-28, 1], [8, -35], [-3, -36], [-15, -32], [19, -31]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${7 + (i % 3)}"/>`).join('')}
          <path d="M-22 8 Q-20 29 0 29 Q20 29 22 8 Q14 17 0 17 Q-14 17 -22 8 Z"/>
          <path d="M-6 20 Q0 24 6 20" stroke="#ffffff" stroke-width="2" fill="none"/>
          <circle cx="-9" cy="-1" r="2.6"/><circle cx="9" cy="-1" r="2.6"/>`;

  // Contact: the figure waves hello on a loop while a paper plane loops round it and the greeting changes
  // language. Drawn once as a short run of pictures, so it plays in the bubbles like any other footage.
  const WAVE = (() => {
    const N = 144, words = ['Hello!', 'Jambo!', 'Salaam!', 'Hi!'], out = [];
    for (let i = 0; i < N; i++) {
      const ph = (i / N) * Math.PI * 2;
      const P = { ...POSE.stand, la: 24, le: 70, ra: -150 + 22 * Math.sin(ph * 3), re: -28 + 26 * Math.sin(ph * 3 + 0.8), lean: 3 * Math.sin(ph), y: 1.5 * Math.sin(ph * 3) };
      const g = figGeo(P);
      const px = 150 + Math.cos(ph) * 68, py = 222 + Math.sin(ph) * 26, ang = (Math.atan2(Math.cos(ph) * 26, -Math.sin(ph) * 68) * 180) / Math.PI;
      const word = words[Math.floor((i / N) * words.length)];
      const svgs = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="600" height="800">
        <rect width="300" height="400" fill="#eeeeee"/>
        <ellipse cx="150" cy="301" rx="40" ry="4.5" fill="#111111" opacity=".14"/>
        <g transform="translate(150 250) scale(.72)" fill="none" stroke="#111111" stroke-linecap="round" stroke-linejoin="round">
          <path d="${g.legL}" stroke-width="5"/><path d="${g.legR}" stroke-width="5"/><path d="${g.body}" stroke-width="5.5"/>
          <path d="${g.armL}" stroke-width="5"/><path d="${g.armR}" stroke-width="5"/>
          <g transform="${g.head}"><circle r="25" fill="#ffffff" stroke-width="3.5"/><g stroke="none" fill="#111111">${FACE}</g></g>
          <g transform="translate(-16 -8) rotate(-8)"><rect x="-13" y="-9" width="26" height="18" fill="#ffffff" stroke-width="2.6"/><path d="M-13 -9 L0 2 L13 -9" stroke-width="2.2"/></g>
        </g>
        <g transform="translate(${f1(px)} ${f1(py)}) rotate(${f1(ang)}) scale(.8)" fill="#ffffff" stroke="#111111" stroke-width="2.4" stroke-linejoin="round"><path d="M-16 -8 L18 0 L-16 9 L-9 0 Z"/><path d="M-9 0 L18 0" fill="none"/></g>
        <g transform="translate(197 140) scale(.46)"><path d="M-52 -22 H52 Q60 -22 60 -14 V14 Q60 22 52 22 H-14 L-26 36 L-24 22 H-52 Q-60 22 -60 14 V-14 Q-60 -22 -52 -22 Z" fill="#ffffff" stroke="#111111" stroke-width="2.4"/>
          <text x="0" y="8" text-anchor="middle" font-family="Fraunces, Georgia, 'Times New Roman', serif" font-style="italic" font-size="24" fill="#111111">${word}</text></g>
      </svg>`;
      out.push(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgs)}`);
    }
    return out;
  })();

  // the pictures each section plays; Work switches to a project's pictures while it is read
  const HERO = {
    info: { frames: M.portrait.frames, fps: M.portrait.fps || 10, title: '' },
    work: { frames: M.work.map((w) => w.frames[0]), fps: 1.4, title: 'Selected work' },
    record: { frames: M.work.flatMap((w) => w.frames.slice(1, 3)), fps: 1.2, title: 'Record' },
    contact: { frames: WAVE, fps: 30, title: 'Say hello' },
  };

  const words = (el, text) => { el.innerHTML = text.split(' ').map((w) => `<span>${esc(w)}</span>`).join(' '); return $$('span', el); };
  words($('[data-tag]'), M.tagline);

  // A closed smooth outline through points around an ellipse, each radius nudged by a few slow waves.
  // amp stirs the waves up (fast scrolling, hover), so the bubbles wobble like something soft being carried.
  let time = 0;
  const shapeD = (w, h, seed, amp = 1) => {
    const N = 9, pts = [], k1 = 0.1 * amp, k2 = 0.07 * amp, k3 = 0.045 * amp;
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2, r = 0.82 * (1 + k1 * Math.sin(a * 2 + seed + time * 0.7) + k2 * Math.sin(a * 3 - seed * 1.7 + time * 0.45) + k3 * Math.sin(a * 5 + seed * 2.3 - time * 0.9));
      pts.push([w / 2 + Math.cos(a) * (w / 2) * r, h / 2 + Math.sin(a) * (h / 2) * r]);
    }
    let d = `M${f1(pts[0][0])},${f1(pts[0][1])}`;
    for (let k = 0; k < N; k++) {
      const a = pts[(k + N - 1) % N], b = pts[k], c = pts[(k + 1) % N], e = pts[(k + 2) % N];
      d += `C${f1(b[0] + (c[0] - a[0]) / 6)},${f1(b[1] + (c[1] - a[1]) / 6)} ${f1(c[0] - (e[0] - b[0]) / 6)},${f1(c[1] - (e[1] - b[1]) / 6)} ${f1(c[0])},${f1(c[1])}`;
    }
    return `${d}Z`;
  };
  const shape = (w, h, seed, amp) => `path('${shapeD(w, h, seed, amp)}')`;
  // where the whole picture sits at the top of a section; an island grows into exactly this
  const heroRect = () => {
    const W = innerWidth, H = innerHeight, phone = W <= 760, U = phone ? W : Math.min(W, H * 0.95);
    return phone ? { x: W / 2, y: H * 0.4, w: U * 0.8, h: Math.min(H * 0.5, U * 1.02) } : { x: W / 2, y: H * 0.38, w: U * 0.66, h: H * 0.62 };
  };
  const SEED = 1.2; // the shape both halves share while they are one picture

  // ================= the islands =================
  const isles = $('.isles');
  const ISLES = [
    // at: d on a wide screen, m on a phone, as [x, y, width] fractions. On a phone the islands sit close
    // enough to run together into one piece of land.
    { view: 'info', label: 'Info', cap: 'About Anwar', frames: M.islands.info, fps: 8, seed: 0.4, at: { d: [0.32, 0.5, 0.28], m: [0.4, 0.4, 0.56] } },
    { view: 'work', label: 'Work', cap: `${M.work.length} projects`, frames: M.islands.work, fps: 1.4, seed: 2.6, at: { d: [0.62, 0.36, 0.22], m: [0.68, 0.54, 0.46] } },
    { view: 'contact', label: 'Contact', cap: 'Say hello', frames: WAVE, fps: 30, seed: 5.3, at: { d: [0.66, 0.75, 0.16], m: [0.38, 0.645, 0.42] } },
  ];
  // each project also floats as a small island of its own; it opens that project. On a phone they sit
  // on the edges of the land, joined to it.
  const SPOTS = [[0.12, 0.32, 0.1], [0.9, 0.28, 0.1], [0.14, 0.78, 0.09], [0.93, 0.6, 0.08]];
  const MSPOTS = [[0.64, 0.31, 0.25], [0.18, 0.53, 0.21], [0.66, 0.71, 0.23], [0.17, 0.29, 0.21]];
  M.work.slice(0, SPOTS.length).forEach((w, i) => ISLES.push({ view: `p-${w.slug}`, label: w.title, cap: String(w.year), frames: M.islands.projects[i] || [w.frames[0]], fps: 1.1, seed: 6.2 + i * 1.3, small: true, at: { d: SPOTS[i], m: MSPOTS[i] } }));
  ISLES.forEach((s, i) => { s.num = String(i + 1).padStart(2, '0'); });
  // on a phone the names sit in a legend under the land, like the key to a map; each island carries its number
  const legendItem = (s, i) => `<a href="#${s.view}" data-legend="${i}"><i>${s.num}</i><b>${esc(s.label)}</b>${s.small ? '' : `<span>${esc(s.cap)}</span>`}</a>`;
  const legendHTML = `<nav class="legend" aria-label="The islands, listed">
      <div class="legend__col">${ISLES.filter((s) => !s.small).map((s) => legendItem(s, ISLES.indexOf(s))).join('')}</div>
      <div class="legend__col legend__col--work"><p class="legend__k">Projects</p>${ISLES.filter((s) => s.small).map((s) => legendItem(s, ISLES.indexOf(s))).join('')}</div>
    </nav>`;
  isles.innerHTML = `<svg class="land" aria-hidden="true"><defs>
      <filter id="land-goo" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="11"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter>
      <filter id="land-ink" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="1.08" intercept="-0.1"/><feFuncG type="linear" slope="1.08" intercept="-0.1"/><feFuncB type="linear" slope="1.08" intercept="-0.1"/></feComponentTransfer></filter>
      <mask id="land-mask" maskUnits="userSpaceOnUse"><g class="land__goo" filter="url(#land-goo)"></g></mask>
    </defs><g mask="url(#land-mask)"><rect class="land__bg"/><g class="land__pics"></g></g><g class="land__nums"></g></svg>` +
    ISLES.map((s, i) => `<a class="isle${s.small ? ' isle--small' : ''}" href="#${s.view}" data-isle="${i}" aria-label="${esc(s.label)}: ${esc(s.cap)}"><img src="${esc(s.frames[0])}" alt=""></a><p class="isle__label" aria-hidden="true"><b><i>${s.num}</i>${esc(s.label)}</b><span>${esc(s.cap)}</span></p>`).join('') + legendHTML;
  ISLES.forEach((s, i) => {
    s.el = $(`[data-isle="${i}"]`); s.img = $('img', s.el); s.lab = s.el.nextElementSibling;
    s.x = innerWidth / 2; s.y = innerHeight * 0.45; s.w = 0; s.vx = s.vy = s.vw = 0; s.fi = 0; s.acc = 0; s.hot = 0; s.morph = 0;
  });
  let isleMode = 'loading', openIdx = -1, hotIdx = -1, mxp = -1e4, myp = -1e4, legendH = 0;
  const legend = $('.legend', isles);
  const homeSpot = (s, i) => {
    // on a phone the land is laid out on a 390 by 844 sheet, scaled to fit the screen and centred
    const W = innerWidth, H = innerHeight, phone = W <= 760;
    const top = 92, bottom = H - legendH - 28, S = phone ? Math.min(W * 0.98, (bottom - top) / 1.2) : Math.min(W * 0.9, H * 1.25);
    if (phone && !s.at.m) return { x: W / 2, y: H / 2, w: 0 };
    const [fx, fy, fw] = phone ? s.at.m : s.at.d;
    // drift: each island floats on its own slow loop
    const dx = Math.sin(time * 0.31 + i * 1.7) * (phone ? 9 : 10), dy = Math.cos(time * 0.27 + i * 2.3) * (phone ? 11 : 12);
    let x = (phone ? W / 2 + (fx - 0.46) * S : fx * W) + dx, y = (phone ? (top + bottom) / 2 + (fy - 0.52) * S * 2.164 : fy * H) + dy;
    // the pointer nudges islands away a little, so the page feels like water
    const ex = x - mxp, ey = y - myp, dd = Math.hypot(ex, ey), r = fw * S * 0.9;
    if (dd < r && dd > 1 && i !== hotIdx) { const k = (1 - dd / r) * 26; x += (ex / dd) * k; y += (ey / dd) * k; }
    return { x, y, w: fw * S * (1 + (i === hotIdx ? (phone ? 0.06 : 0.08) : 0)) };
  };
  const springTo = (s, t, dt, k = 90, c = 13) => {
    for (const [p, v, goal] of [['x', 'vx', t.x], ['y', 'vy', t.y], ['w', 'vw', t.w]]) {
      if (reduce) { s[p] = goal; s[v] = 0; continue; }
      s[v] += ((goal - s[p]) * k - s[v] * c) * dt; s[p] += s[v] * dt;
    }
  };
  const isleFrame = (dt) => {
    const H = innerHeight, hr = heroRect(), phone = innerWidth <= 760;
    isles.classList.toggle('is-land', phone);
    legendH = phone ? legend.offsetHeight : 0;
    ISLES.forEach((s, i) => {
      let t, k = 90, c = 13;
      if (s.wait > 0) { s.wait -= dt; t = { x: s.x, y: s.y, w: 0 }; }
      else if (isleMode === 'loading') t = { x: s.x, y: s.y, w: 0 };
      else if (isleMode === 'open') { t = i === openIdx ? { x: hr.x, y: hr.y, w: hr.w } : { ...homeSpot(s, i), w: 0 }; k = 60; c = 14; }
      else t = homeSpot(s, i);
      springTo(s, t, dt, k, c);
      s.hot += ((i === hotIdx ? 1 : 0) - s.hot) * Math.min(1, dt * 6);
      s.morph += (((isleMode === 'open' && i === openIdx) ? 1 : 0) - s.morph) * Math.min(1, dt * 5);
      const w = Math.max(0, s.w), h = mix(w * 1.25, isleMode === 'open' && i === openIdx ? hr.h : w * 1.25, s.morph);
      s.el.style.width = f1(w) + 'px'; s.el.style.height = f1(h) + 'px';
      s.el.style.transform = `translate(${f1(s.x - w / 2)}px, ${f1(s.y - h / 2)}px)`;
      s.el.style.clipPath = w > 1 ? shape(w, h, mix(s.seed, SEED, s.morph), 1 + s.hot * 0.9) : 'inset(50%)';
      s.lab.style.transform = phone ? `translate(calc(${f1(s.x)}px - 50%), calc(${f1(s.y)}px - 50%))` : `translate(calc(${f1(s.x)}px - 50%), ${f1(s.y + h * 0.47 + 10)}px)`;
      s.lab.style.opacity = isleMode === 'home' && w > 30 ? '' : 0;
      if (s.leg) s.leg.classList.toggle('is-hot', i === hotIdx);
      s.el.tabIndex = w > 1 ? 0 : -1;
      s.el.classList.toggle('is-open', isleMode === 'open' && i === openIdx);
      // each island plays its own pictures
      if (!reduce && s.frames.length > 1) { s.acc += dt * (1 + s.hot * 2); if (s.acc >= 1 / s.fps) { s.acc = 0; s.fi = (s.fi + 1) % s.frames.length; s.img.src = s.frames[s.fi]; } }
    });
    if (phone) drawLand();
  };

  // ---- on a phone: the islands run together into one piece of land ----
  // Each island's outline goes into a mask, blurred and sharpened again so that outlines close to each other
  // melt into one shore with soft necks between them. Inside the land the islands overlap like pebbles: the
  // big ones lie underneath, the small ones on top, each drawn a little larger than its outline so the necks
  // are filled, with a fine white edge where one lies over another. Seams are curves, never straight cuts.
  const land = $('.land', isles), landGoo = $('.land__goo', land), landPics = $('.land__pics', land), landNums = $('.land__nums', land), landBg = $('.land__bg', land);
  const LNS = 'http://www.w3.org/2000/svg', mk = (tag, attrs, parent) => { const e = document.createElementNS(LNS, tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); parent.appendChild(e); return e; };
  const landDefs = $('defs', land);
  const EDGE = 1.16; // how far each picture spreads past its island's outline
  ISLES.forEach((s, i) => { s.blob = mk('path', { fill: '#fff' }, landGoo); s.leg = $(`[data-legend="${i}"]`, legend); });
  [...ISLES].sort((a, b) => b.at.m[2] - a.at.m[2]).forEach((s) => {
    const i = ISLES.indexOf(s), cp = mk('clipPath', { id: `land-cell-${i}` }, landDefs);
    s.cell = mk('path', {}, cp);
    const g = mk('g', {}, landPics);
    s.pic = mk('image', { preserveAspectRatio: 'xMidYMid slice', 'clip-path': `url(#land-cell-${i})`, filter: 'url(#land-ink)' }, g);
    s.seam = mk('path', { fill: 'none', stroke: '#fff', 'stroke-width': '2.5' }, g);
    const n = mk('g', { class: 'land__num' }, landNums);
    mk('circle', { r: s.small ? 11 : 13 }, n);
    const tx = mk('text', { 'text-anchor': 'middle', dy: '0.35em' }, n); tx.textContent = s.num;
    s.badge = n;
  });
  let landW = 0, landH = 0;
  const drawLand = () => {
    const W = innerWidth, H = innerHeight;
    if (W !== landW || H !== landH) {
      landW = W; landH = H;
      land.setAttribute('width', W); land.setAttribute('height', H); land.setAttribute('viewBox', `0 0 ${W} ${H}`);
      ['land-goo', 'land-ink'].forEach((id) => { const f = $(`#${id}`, land); f.setAttribute('x', 0); f.setAttribute('y', 0); f.setAttribute('width', W); f.setAttribute('height', H); });
      $('#land-mask', land).setAttribute('width', W); $('#land-mask', land).setAttribute('height', H);
      landBg.setAttribute('width', W); landBg.setAttribute('height', H);
    }
    ISLES.forEach((s, i) => {
      // the island being opened leaves the land and grows on its own
      if ((isleMode === 'open' && i === openIdx) || s.w <= 2) { s.blob.setAttribute('d', ''); s.pic.setAttribute('width', 0); s.seam.setAttribute('d', ''); s.badge.setAttribute('opacity', 0); return; }
      const w = s.w, h = w * 1.25, amp = 1 + s.hot * 0.9;
      s.blob.setAttribute('d', shapeD(w, h, s.seed, amp));
      s.blob.setAttribute('transform', `translate(${f1(s.x - w / 2)} ${f1(s.y - h / 2)})`);
      const we = w * EDGE, he = h * EDGE, d = shapeD(we, he, s.seed, amp), tr = `translate(${f1(s.x - we / 2)} ${f1(s.y - he / 2)})`;
      s.cell.setAttribute('d', d); s.cell.setAttribute('transform', tr);
      s.seam.setAttribute('d', d); s.seam.setAttribute('transform', tr);
      s.pic.setAttribute('x', f1(s.x - we / 2)); s.pic.setAttribute('y', f1(s.y - he / 2));
      s.pic.setAttribute('width', f1(we)); s.pic.setAttribute('height', f1(he));
      const src = s.frames[s.fi]; if (s.picSrc !== src) { s.picSrc = src; s.pic.setAttribute('href', src); }
      // the island under a finger comes into colour
      if (s.hot > 0.5) s.pic.removeAttribute('filter'); else s.pic.setAttribute('filter', 'url(#land-ink)');
      s.badge.setAttribute('transform', `translate(${f1(s.x)} ${f1(s.y - (s.small ? 0 : h * 0.3))}) scale(${(1 + s.hot * 0.25).toFixed(3)})`);
      s.badge.setAttribute('opacity', isleMode === 'home' && w > 30 ? 1 : 0);
    });
  };
  isles.addEventListener('pointerover', (e) => { const a = e.target.closest('.isle'); hotIdx = a ? +a.dataset.isle : -1; ISLES.forEach((s, i) => s.el.classList.toggle('is-hot', i === hotIdx)); isles.classList.toggle('is-hover', hotIdx >= 0); });
  isles.addEventListener('pointerout', (e) => { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.isle')) { hotIdx = -1; ISLES.forEach((s) => s.el.classList.remove('is-hot')); isles.classList.remove('is-hover'); } });
  const setHot = (i) => { hotIdx = i; ISLES.forEach((s, j) => s.el.classList.toggle('is-hot', j === i)); isles.classList.toggle('is-hover', i >= 0); };
  isles.addEventListener('pointerdown', (e) => { const a = e.target.closest('.isle, [data-legend]'); if (a && e.pointerType !== 'mouse') setHot(+(a.dataset.isle || a.dataset.legend)); });
  addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') { mxp = myp = -1e4; if (isleMode === 'home') setTimeout(() => isleMode === 'home' && setHot(-1), 250); } });
  addEventListener('pointercancel', () => { mxp = myp = -1e4; setHot(-1); });
  legend.addEventListener('pointerover', (e) => { const a = e.target.closest('[data-legend]'); if (a && e.pointerType === 'mouse') setHot(+a.dataset.legend); });
  legend.addEventListener('pointerout', (e) => { if (e.pointerType === 'mouse') setHot(-1); });
  legend.addEventListener('focusin', (e) => { const a = e.target.closest('[data-legend]'); if (a) setHot(+a.dataset.legend); });
  legend.addEventListener('focusout', () => setHot(-1));
  addEventListener('pointermove', (e) => { mxp = e.clientX; myp = e.clientY; if (e.pointerType === 'mouse') { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; } });
  // clicking an island grows it into the whole picture at the top of its section, then the section opens
  isles.addEventListener('click', (e) => {
    const a = e.target.closest('.isle, [data-legend]'); if (!a || isleMode !== 'home') return;
    e.preventDefault();
    openIdx = +(a.dataset.isle || a.dataset.legend); isleMode = 'open'; setHot(-1);
    setTimeout(() => { location.hash = ISLES[openIdx].view; }, reduce ? 0 : 620);
  });

  // ================= the dividing picture =================
  // One picture in one bubble. As the reading begins the bubble divides like a cell: the picture is cut down
  // its middle, and each half of the bubble carries its own half of the picture out to its side of the screen,
  // a soft neck stretching between them before it lets go. At the end they drift back, the neck reforms,
  // the two halves of the picture meet at the same line and the bubble is whole again.
  const stage = $('.stage'), NS = 'http://www.w3.org/2000/svg';
  stage.innerHTML = `<svg class="stage__svg" aria-hidden="true">
      <defs>
        <filter id="ink" color-interpolation-filters="sRGB">
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer><feFuncR type="linear" slope="0.95" intercept="-0.06"/><feFuncG type="linear" slope="0.95" intercept="-0.06"/><feFuncB type="linear" slope="0.95" intercept="-0.06"/></feComponentTransfer>
        </filter>
        <clipPath id="cut-l"><polygon/></clipPath>
        <clipPath id="cut-r"><polygon/></clipPath>
      </defs>
      <g class="stage__goo">
        <g class="stage__l"><g clip-path="url(#cut-l)"><rect class="stage__bg"/><image preserveAspectRatio="xMidYMid slice" filter="url(#ink)"/></g></g>
        <g class="stage__r"><g clip-path="url(#cut-r)"><rect class="stage__bg"/><image preserveAspectRatio="xMidYMid slice" filter="url(#ink)"/></g></g>
      </g>
    </svg>`;
  const svg = $('svg', stage), goo = $('.stage__goo', stage), GL = $('.stage__l', stage), GR = $('.stage__r', stage);
  const polyL = $('#cut-l polygon', stage), polyR = $('#cut-r polygon', stage);
  const ims = $$('image', stage), bgs = $$('.stage__bg', stage);
  const num = $('.ctrl__n'), bar = $('.ctrl__bar i'), cap = $('.ctrl__t'), btns = $$('[data-play]');
  const setSrc = (src) => ims.forEach((im) => im.setAttribute('href', src));
  const setInk = (on) => ims.forEach((im) => (on ? im.setAttribute('filter', 'url(#ink)') : im.removeAttribute('filter')));
  let view = 'home', sets = [], cur = 0, fi = 0, acc = 0, playing = !reduce, p = 1, pv = 0, goal = 1, heal = 1, wasApart = false;
  let mx = 0, my = 0, tmx = 0, tmy = 0, vel = 0, lastY = scrollY, hover = -1;

  // points round a soft blob (the same wobbling outline the islands use), sampled at fixed angles
  const NPT = 96;
  const blobPts = (cx, cy, w, h, seed, amp) => {
    const out = [], k1 = 0.1 * amp, k2 = 0.07 * amp, k3 = 0.045 * amp;
    for (let k = 0; k < NPT; k++) {
      const a = (k / NPT) * Math.PI * 2, r = 0.82 * (1 + k1 * Math.sin(a * 2 + seed + time * 0.7) + k2 * Math.sin(a * 3 - seed * 1.7 + time * 0.45) + k3 * Math.sin(a * 5 + seed * 2.3 - time * 0.9));
      out.push([cx + Math.cos(a) * (w / 2) * r, cy + Math.sin(a) * (h / 2) * r]);
    }
    return out;
  };
  const toPoly = (pts) => pts.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');

  // s: 0 the bubble whole, 1 the two halves held at the screen's edges
  const paint = () => {
    const W = innerWidth, H = innerHeight, phone = W <= 760, hr = heroRect(), U = phone ? W : Math.min(W, H * 0.95);
    if (svg.getAttribute('width') !== String(W)) { svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); }
    // s runs 0 (whole) to 1 (apart). First a waist pinches in at the cut while the two lobes ease apart,
    // then they let go and drift out, each rounding off into a bubble of its own.
    const s = cl(1 - p), k = ease(cl(s / 0.24)), go = ease(cl((s - 0.2) / 0.62)), m = ease(cl((s - 0.28) / 0.5)), amp = 1 + vel * 1.2;
    // the picture: one size throughout, centred on the whole bubble
    const iw = Math.max(hr.w, U * 0.87), ih = iw * 4 / 3, ix = hr.x - iw / 2, iy = hr.y + 0.03 * ih - ih / 2;
    // where each half's middle sits: on the whole bubble at first, at its edge of the screen at the end
    const lean = [mx * (phone ? 6 : 26) * go, my * (phone ? 6 : 18) * go], dmax = hr.w * 0.1 * k;
    const L0 = [hr.x - hr.w / 4, hr.y], R0 = [hr.x + hr.w / 4, hr.y];
    const L1 = [phone ? W * 0.015 : W * 0.13, H * 0.47], R1 = [phone ? W * 0.985 : W * 0.87, H * 0.46];
    const Lc = [mix(L0[0] - dmax, L1[0], go) + lean[0], mix(L0[1], L1[1], go) + lean[1]], Rc = [mix(R0[0] + dmax, R1[0], go) + lean[0], mix(R0[1], R1[1], go) + lean[1]];
    const dL = [Lc[0] - L0[0], Lc[1] - L0[1]], dR = [Rc[0] - R0[0], Rc[1] - R0[1]];
    // each half's outline: the whole bubble cut at the middle, its waist pinched toward the cut, rounding
    // into a bubble of its own once they have parted. Both halves pinch the same way, so while they touch
    // they read as one bubble narrowing at its middle.
    const whole = blobPts(hr.x, hr.y, hr.w, hr.h, SEED, amp);
    const sw = U * (phone ? 0.22 : 0.28), sh = phone ? Math.min(H * 0.36, U * 0.56) : Math.min(H * 0.46, U * 0.64);
    const ownL = blobPts(Lc[0], Lc[1], sw, sh, 0.3, amp), ownR = blobPts(Rc[0], Rc[1], sw, sh, 2.1, amp);
    const ov = 3, reach = hr.w * 0.3, cy = hr.y;
    const cut = (x, y, side) => {
      const edge = hr.x - side * dmax, cx = side < 0 ? Math.min(x, edge + ov) : Math.max(x, edge - ov);
      const pinch = 1 - k * 0.995 * Math.exp(-(((cx - edge) / reach) ** 2) * 2.2);
      return [cx, cy + (y - cy) * pinch];
    };
    const ptsL = whole.map(([x, y], i) => { const [cx, cy2] = cut(x, y, -1); return [mix(cx + dL[0], ownL[i][0], m), mix(cy2 + dL[1], ownL[i][1], m)]; });
    const ptsR = whole.map(([x, y], i) => { const [cx, cy2] = cut(x, y, 1); return [mix(cx + dR[0], ownR[i][0], m), mix(cy2 + dR[1], ownR[i][1], m)]; });
    polyL.setAttribute('points', toPoly(ptsL)); polyR.setAttribute('points', toPoly(ptsR));
    // each half carries its half of the picture with it, so the cut line travels with the halves
    [[GL, dL, -1], [GR, dR, 1]].forEach(([g, d, side], n) => {
      const im = ims[n], bg = bgs[n];
      im.setAttribute('x', f1(ix + d[0])); im.setAttribute('y', f1(iy + d[1])); im.setAttribute('width', f1(iw)); im.setAttribute('height', f1(ih));
      bg.setAttribute('x', f1(ix + d[0])); bg.setAttribute('y', f1(iy + d[1])); bg.setAttribute('width', f1(iw)); bg.setAttribute('height', f1(ih));
      const c = side < 0 ? Lc : Rc, rot = (side < 0 ? 9 : -11) * m + mx * 3 * go;
      g.setAttribute('transform', `rotate(${rot.toFixed(2)} ${f1(c[0])} ${f1(c[1])})`);
    });
    // joining: once the halves meet, the bubble gives one soft settle
    if (s > 0.25) wasApart = true;
    if (wasApart && s < 0.01 && pv > 0) { heal = 0; wasApart = false; }
    const pulse = heal < 1 ? Math.sin(heal * Math.PI) * (1 - heal) * 0.05 : 0;
    goo.style.transformOrigin = `${f1(hr.x)}px ${f1(hr.y)}px`;
    goo.style.transform = pulse ? `scale(${(1 + pulse).toFixed(4)})` : '';
    const info = $('.end__info');
    if (info) info.style.opacity = cl((p - 0.8) / 0.2) * cl(endProgress() * 4);
  };
  const endProgress = () => { const e = $('.end'); if (!e) return 0; const r = e.getBoundingClientRect(), H = innerHeight; return cl((H * 0.65 - r.top) / Math.max(1, r.height - H * 0.35)); };
  const measure = () => {
    if (view === 'home') return;
    const H = innerHeight, rh = $('.hero').getBoundingClientRect();
    const split = cl(-rh.top / Math.max(1, rh.height - H * 0.6));
    goal = Math.max(1 - split, endProgress());
    // the picture changes with what is being read: a project in Work, a chapter on a project page
    const parts = $$('[data-set]', main);
    if (!parts.length) return;
    let on = -1;
    parts.forEach((el, i) => { const r = el.getBoundingClientRect(); if (r.top < H * 0.58 && r.bottom > H * 0.42) on = i; });
    if (view === 'work') {
      if (hover >= 0) on = hover;
      $('.work').classList.toggle('is-reading', on >= 0);
      parts.forEach((el, i) => el.classList.toggle('is-on', i === on));
      use(on + 1);
    } else if (on >= 0) use(+parts[on].dataset.set);
    else if (endProgress() > 0) use(3);
    else if (rh.bottom > H * 0.5) use(0);
  };
  const use = (k) => {
    if (k === cur) return;
    cur = k; fi = 0; acc = 0;
    setSrc(sets[k].frames[0]);
    setInk(!(view === 'work' && k > 0) && !(view in PROJ));
    show();
  };
  const show = () => {
    const s = sets[cur]; if (!s) return;
    const n = s.frames.length;
    num.textContent = `${String(fi + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    cap.textContent = s.title;
    bar.style.transform = `scaleX(${n > 1 ? fi / (n - 1) : 1})`;
  };

  // ================= views =================
  const menu = $('#menu'), mbtn = $('.top__menu');
  const mark = () => $$('[data-nav]').forEach((a) => (a.dataset.nav === (view in PROJ ? 'work' : view) ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  const openView = (v) => {
    view = v; body.dataset.view = v; mark(); isleMode = 'idle';
    main.innerHTML = PAGES[v]();
    if (v in PROJ) { const w = M.work[PROJ[v]]; sets = ['', 'What it does', 'Before and after', ''].map((t, n) => ({ frames: [w.frames[n] || w.frames[0]], fps: 1, title: t ? `${w.title} · ${t}` : w.title })); }
    else sets = [HERO[v]].concat(v === 'work' ? M.work.map((w) => ({ frames: w.frames, fps: 1.6, title: w.title })) : []);
    cur = -1; hover = -1; use(0);
    p = 1; pv = 0; goal = 1; heal = 1; wasApart = false;
    scrollTo(0, 0); lastY = 0;
    $$('.job', main).forEach((j, i) => {
      j.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hover = i; measure(); } });
      j.addEventListener('pointerleave', () => { hover = -1; measure(); });
      j.addEventListener('focus', () => { hover = i; measure(); });
      j.addEventListener('blur', () => { hover = -1; measure(); });
    });
    watchFilms();
    document.title = `${v in PROJ ? M.work[PROJ[v]].title : v[0].toUpperCase() + v.slice(1)} · ${M.name}`;
    measure();
  };
  const goHome = () => {
    const from = ISLES.findIndex((s) => s.view === view);
    view = 'home'; body.dataset.view = 'home'; mark(); main.innerHTML = '';
    document.title = M.name;
    // coming back from a section, the islands spill out from where its picture was
    if (from >= 0) {
      const hr = heroRect();
      ISLES.forEach((s, i) => { s.x = hr.x; s.y = hr.y; s.w = i === from ? hr.w : 0; s.vx = s.vy = s.vw = 0; s.morph = i === from ? 1 : 0; });
    }
    isleMode = 'home'; openIdx = -1;
  };
  const route = () => {
    if (body.classList.contains('is-loading')) return;
    setMenu(false);
    const v = location.hash.slice(1);
    if (v === 'main') return; // the skip link
    try { if (VIEWS.includes(v)) openView(v); else goHome(); } catch (err) { console.error(err); main.innerHTML = ''; goHome(); }
  };
  // the skip link jumps to the words without changing the page
  $('.skip').addEventListener('click', (e) => { e.preventDefault(); if (view === 'home') return; main.focus(); main.scrollIntoView(); });
  addEventListener('hashchange', route);

  const setMenu = (open) => {
    mbtn.setAttribute('aria-expanded', String(open)); mbtn.textContent = open ? 'Close' : 'Menu';
    if (open) { menu.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open'))); }
    else { menu.classList.remove('is-open'); menu.hidden = true; }
  };
  mbtn.addEventListener('click', () => setMenu(menu.hidden));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); mbtn.focus(); } });
  // a link to the page you are already on (the name on the front page, say) just closes the menu
  menu.addEventListener('click', (e) => { const a = e.target.closest('a'); if (a && a.dataset.nav === view) setMenu(false); });

  // ================= one clock =================
  let last = performance.now();
  const loop = (now) => {
    requestAnimationFrame(loop); // asked for first, so one bad frame cannot stop the clock
    const dt = Math.min(1 / 30, (now - last) / 1000); last = now;
    if (!reduce) time += dt;
    mx += (tmx - mx) * Math.min(1, dt * 3); my += (tmy - my) * Math.min(1, dt * 3);
    if (view === 'home' || isleMode === 'open') isleFrame(dt);
    if (view !== 'home') {
      const y = scrollY; vel += (cl(Math.abs(y - lastY) / 60) - vel) * Math.min(1, dt * 4); lastY = y;
      // a spring, not a glide: the halves overshoot a touch as they meet, so joining has some weight
      if (reduce) p = goal; else { pv += ((goal - p) * 170 - pv * 20) * dt; p += pv * dt; }
      if (heal < 1) heal = Math.min(1, heal + dt / 0.7);
      const s = sets[cur];
      if (s && playing && s.frames.length > 1) { acc += dt; if (acc >= 1 / s.fps) { acc = 0; fi = (fi + 1) % s.frames.length; setSrc(s.frames[fi]); show(); } }
      paint();
    }
  };
  addEventListener('scroll', measure, { passive: true });
  addEventListener('resize', measure);
  const press = () => btns.forEach((x) => x.setAttribute('aria-pressed', String((x.dataset.play === '1') === playing)));
  btns.forEach((x) => x.addEventListener('click', () => { playing = x.dataset.play === '1'; press(); }));
  press();

  // ================= the loader =================
  // The page opens on white with the name in the corner. A stick figure (you: the curls and the beard) draws
  // itself in ink, line by line, then dances through a short phrase while a number counts to 100: arms up,
  // a plié, an arabesque, a turn. At 100 it leaps, and the islands spill out from where it lands.
  const ld = $('.ld');
  const tag = $$('[data-tag] span');
  const all = [...new Set([...ISLES.flatMap((s) => s.frames), ...M.work.flatMap((w) => w.frames), ...M.portrait.frames])];
  let loaded = 0, shown = 0;
  const t0 = performance.now(), minT = reduce ? 0 : 4400;
  all.forEach((src) => { const im = new Image(); im.onload = im.onerror = () => { loaded++; }; im.src = src; });

  // the loader's figure, with three faint copies trailing a few frames behind it, like a long exposure
  const SVGNS = 'http://www.w3.org/2000/svg';
  const fig = document.createElementNS(SVGNS, 'svg');
  fig.setAttribute('class', 'ld__fig'); fig.setAttribute('viewBox', '-130 -165 260 270'); fig.setAttribute('aria-hidden', 'true');
  const limbs = (cls, extra = '') => `<g class="${cls}" fill="none" stroke="var(--ink)" stroke-linecap="round" stroke-linejoin="round"${extra}>
      <path data-b="legL" pathLength="1" stroke-width="5"/><path data-b="legR" pathLength="1" stroke-width="5"/>
      <path data-b="body" pathLength="1" stroke-width="5.5"/>
      <path data-b="armL" pathLength="1" stroke-width="5"/><path data-b="armR" pathLength="1" stroke-width="5"/>
      <g data-b="head"><circle r="25" fill="var(--paper)" stroke-width="3.5" pathLength="1" class="f-skull"/>${cls === 'f-ink' ? `<g class="f-face" stroke="none" fill="var(--ink)">${FACE}</g>` : ''}</g>
    </g>`;
  fig.innerHTML = `
    <line class="f-ground" x1="-125" x2="125" y1="76" y2="76" pathLength="1"/>
    <ellipse class="f-shadow" cx="0" cy="74" rx="46" ry="5"/>
    ${[3, 2, 1].map((n) => limbs(`f-ghost f-ghost--${n}`)).join('')}
    ${limbs('f-ink')}`;
  ld.appendChild(fig);
  const parts = (g) => Object.fromEntries($$('[data-b]', g).map((e) => [e.dataset.b, e]));
  const B = parts($('.f-ink', fig)), GH = [1, 2, 3].map((n) => parts($(`.f-ghost--${n}`, fig)));
  const face = $('.f-face', fig), shadow = $('.f-shadow', fig), ground = $('.f-ground', fig);
  const PHRASE = ['stand', 'up', 'open', 'plie', 'open', 'arab', 'up', 'turn', 'up', 'kick', 'open', 'hop', 'plie', 'hop', 'stand', 'bow', 'stand'];
  const BEAT = 0.36; // seconds a pose takes
  const flow = (t) => t * 0.7 + smooth(t) * 0.3; // mostly even speed, so the dance never stops between poses
  const put = (Bm, P) => { const g = figGeo(P); ['body', 'armL', 'armR', 'legL', 'legR'].forEach((k) => Bm[k].setAttribute('d', g[k])); Bm.head.setAttribute('transform', g.head); };
  const hist = [];
  const drawFig = (P) => {
    put(B, P);
    hist.unshift(P); if (hist.length > 24) hist.pop();
    GH.forEach((Bm, n) => put(Bm, hist[Math.min(hist.length - 1, (n + 1) * 6)]));
    const air = cl(-P.y / 70);
    shadow.setAttribute('rx', f1(46 * (1 - air * 0.5))); shadow.style.opacity = 0.18 * (1 - air * 0.6);
  };
  let figT = 0, figPose = POSE.stand, figEnd = 0, figGone = false;
  const figLoop = (dt) => {
    figT += dt;
    if (figEnd) {
      // the finale: a crouch, then the leap up and away
      const e = figT - figEnd, k1 = cl(e / 0.35), k2 = cl((e - 0.35) / 0.45);
      figPose = k2 > 0 ? lerpPose(POSE.crouch, POSE.leap, smooth(k2)) : lerpPose(figPose, POSE.crouch, smooth(k1) * 0.5);
      if (k2 > 0) figPose.y = mix(POSE.crouch.y, -260, smooth(k2));
    } else {
      const d = figT - 1.3; // after the drawing, the dance
      if (d > 0) {
        const n = Math.floor(d / BEAT), k = flow(cl((d / BEAT) % 1)), to = PHRASE[(n + 1) % PHRASE.length];
        figPose = lerpPose(POSE[PHRASE[n % PHRASE.length]], POSE[to], k);
      } else figPose = POSE.stand;
      // a breath while it stands
      figPose = { ...figPose, y: figPose.y + Math.sin(figT * 3) * 1.2 };
    }
    drawFig(figPose);
  };
  // the ink goes down stroke by stroke: legs, body, arms, then the head, then the hair, beard and face
  const order = [['legL', 0], ['legR', 0.12], ['body', 0.28], ['armL', 0.45], ['armR', 0.55], ['skull', 0.68]];
  const drawIn = () => {
    const k = (s) => cl((figT - s) / 0.45);
    order.forEach(([b, s]) => { const el = b === 'skull' ? $('.f-ink .f-skull', fig) : B[b]; el.style.strokeDasharray = '1'; el.style.strokeDashoffset = String(1 - smooth(k(s))); });
    face.style.opacity = cl((figT - 1.0) / 0.35);
    ground.style.strokeDashoffset = String(1 - smooth(cl(figT / 1.1)));
    fig.style.setProperty('--ghost', cl((figT - 1.6) / 0.6));
  };
  let lastL = performance.now();
  const ldLoop = (now) => {
    const dt = Math.min(1 / 30, (now - lastL) / 1000); lastL = now;
    if (figGone) return;
    requestAnimationFrame(ldLoop);
    if (reduce) { figT = 2; drawIn(); drawFig(POSE.stand); }
    else { figLoop(dt); drawIn(); }
  };
  requestAnimationFrame(ldLoop);
  requestAnimationFrame(loop);
  const tick = () => {
    const real = performance.now() - t0 > 7000 ? 1 : loaded / all.length, clock = cl((performance.now() - t0) / minT);
    const target = Math.min(real, clock) * 100;
    shown += (target - shown) * 0.12 + (target > shown ? 0.2 : 0);
    shown = Math.min(shown, target);
    if (shown >= 99.5) return done();
    // a background tab gets no frames, so count on a timer there instead
    if (document.hidden) setTimeout(tick, 250); else requestAnimationFrame(tick);
  };
  let finished = false;
  const done = () => {
    if (finished) return; finished = true;
    figEnd = figT;
    ld.classList.add('is-done');
    setTimeout(() => {
      body.classList.remove('is-loading');
      tag.forEach((s, i) => setTimeout(() => (s.style.opacity = 1), i * 80));
      setTimeout(() => { ld.classList.add('is-gone'); figGone = true; }, 1200);
      // the islands spill out from where the figure stood
      const r = fig.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.6;
      ISLES.forEach((s, i) => { s.x = cx; s.y = cy; s.w = 0; s.vx = s.vy = s.vw = 0; s.wait = reduce ? 0 : i * 0.09; });
      const v2 = location.hash.slice(1);
      if (VIEWS.includes(v2)) { openIdx = ISLES.findIndex((s) => s.view === v2); isleMode = 'open'; setTimeout(route, reduce ? 0 : 600); }
      else { isleMode = 'home'; mark(); }
    }, reduce ? 0 : 560);
  };
  // the films: each plays by itself while it is in view and stops when it scrolls away. Sound is on unless the
  // browser refuses it before the visitor has touched the page; then the film plays silent and the button shows it.
  let soundOn = true;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  main.addEventListener('error', (e) => { const f = e.target.tagName === 'VIDEO' && e.target.closest('.film'); if (f) f.hidden = true; }, true);
  const syncSnd = (v) => { const b = $('.film__snd', v.parentNode); if (!b) return; b.setAttribute('aria-pressed', String(!v.muted)); b.setAttribute('aria-label', v.muted ? 'Sound on' : 'Sound off'); };
  const startFilm = (v) => {
    v.muted = !soundOn;
    const go = v.play();
    if (go && go.catch) go.catch(() => { v.muted = true; syncSnd(v); v.play().catch(() => {}); });
    syncSnd(v);
  };
  const filmIO = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { if (!reduce && !saveData) startFilm(e.target); } else e.target.pause();
  }), { threshold: 0.5 }) : null;
  watchFilms = () => { if (filmIO) { filmIO.disconnect(); $$('.film__box video', main).forEach((v) => filmIO.observe(v)); } };
  main.addEventListener('click', (e) => {
    const box = e.target.closest('.film__box'); if (!box) return;
    const v = $('video', box);
    if (v.paused) { startFilm(v); return; }
    soundOn = v.muted; v.muted = !soundOn; syncSnd(v);
  });
  ['play', 'pause'].forEach((ev) => main.addEventListener(ev, (e) => {
    const box = e.target.closest && e.target.closest('.film__box'); if (!box) return;
    box.classList.toggle('is-playing', ev === 'play'); box.classList.toggle('is-on', ev === 'play');
  }, true));
  main.addEventListener('volumechange', (e) => { if (e.target.closest && e.target.closest('.film__box')) syncSnd(e.target); }, true);
  main.addEventListener('timeupdate', (e) => {
    const box = e.target.closest && e.target.closest('.film__box'); if (!box) return;
    $('.film__bar i', box).style.transform = `scaleX(${e.target.currentTime / (e.target.duration || 1)})`;
  }, true);
  tick();
  window.__siteReady = true;
})();
