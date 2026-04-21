/* ═══════════════════════════════════════════════
   BRIJESH BHATTARAI — script.js
   ═══════════════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════════
   CURSOR SYSTEM
══════════════════════════════════════ */
const CursorSystem = (() => {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const trail = document.getElementById('cursor-trail');

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX, ringY  = mouseY;
  let trailX = mouseX, trailY = mouseY;

  function onMove(e) { mouseX = e.clientX; mouseY = e.clientY; }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    // Dot: instant
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    // Ring: smooth lag
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    // Trail: slower lag
    trailX = lerp(trailX, mouseX, 0.055);
    trailY = lerp(trailY, mouseY, 0.055);
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';

    requestAnimationFrame(loop);
  }

  function bindHovers() {
    document.querySelectorAll(
      'a, button, .nav-card, .project-card, .blog-card, .blog-main, ' +
      '.blog-side-card, .program-card, .filter-btn, .form-submit, ' +
      '.form-input, .form-textarea, .form-select, .social-btn'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  function init() {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
    loop();
    bindHovers();
  }

  return { init, bindHovers };
})();

/* ══════════════════════════════════════
   PARALLAX — cursor drives orbs + grid ONLY
   Photo stays in grid flow (NO transform on it)
══════════════════════════════════════ */
const ParallaxSystem = (() => {
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  const grid = document.querySelector('.hero-grid-lines');

  let cw = window.innerWidth  / 2;
  let ch = window.innerHeight / 2;
  let mx = 0, my = 0;
  let cx = 0, cy = 0;
  let raf = null;
  let active = false;

  function onMove(e) {
    mx = (e.clientX - cw) / cw;
    my = (e.clientY - ch) / ch;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    cx = lerp(cx, mx, 0.055);
    cy = lerp(cy, my, 0.055);

    if (orb1) orb1.style.transform = `translate(${cx * -20}px, ${cy * -14}px)`;
    if (orb2) orb2.style.transform = `translate(${cx *  12}px, ${cy *  10}px)`;
    if (grid) grid.style.transform = `translate(${cx *   5}px, ${cy *   5}px)`;

    if (active) raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    cw = window.innerWidth  / 2;
    ch = window.innerHeight / 2;
  });

  function start() {
    if (!active) {
      active = true;
      document.addEventListener('mousemove', onMove);
      loop();
    }
  }

  function stop() {
    active = false;
    cancelAnimationFrame(raf);
    document.removeEventListener('mousemove', onMove);
    // Reset decorative elements
    if (orb1) orb1.style.transform = '';
    if (orb2) orb2.style.transform = '';
    if (grid) grid.style.transform = '';
  }

  return { start, stop };
})();

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
const Loader = (() => {
  const el    = document.getElementById('loader');
  const name  = el.querySelector('.loader-name');
  const bar   = el.querySelector('.loader-bar-fill');
  const label = el.querySelector('.loader-label');

  function run(onDone) {
    setTimeout(() => {
      name.classList.add('show');
      label.classList.add('show');
    }, 80);
    setTimeout(() => { bar.style.width = '100%'; }, 150);
    setTimeout(() => {
      el.classList.add('hidden');
      setTimeout(() => { el.style.display = 'none'; }, 650);
      onDone();
    }, 2100);
  }

  return { run };
})();

/* ══════════════════════════════════════
   CURTAIN
══════════════════════════════════════ */
const Curtain = (() => {
  const el = document.getElementById('curtain');

  function slideDown(cb) {
    el.className = '';
    void el.offsetWidth;
    el.classList.add('slide-down');
    setTimeout(cb, 640);
  }

  function slideUp(cb) {
    el.className = '';
    void el.offsetWidth;
    el.classList.add('slide-up');
    setTimeout(() => { el.className = ''; if (cb) cb(); }, 640);
  }

  return { slideDown, slideUp };
})();

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
const Navbar = (() => {
  const nav = document.getElementById('navbar');

  function init() {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  function setActive(id) {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });
  }

  return { init, setActive };
})();

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
const MobileMenu = (() => {
  const menu = document.querySelector('.mobile-menu');
  const ham  = document.querySelector('.hamburger');
  let open   = false;

  function toggle() {
    open = !open;
    ham.classList.toggle('open', open);
    if (open) {
      menu.style.display = 'flex';
      requestAnimationFrame(() => menu.classList.add('open'));
    } else {
      menu.classList.remove('open');
      setTimeout(() => { menu.style.display = ''; }, 420);
    }
  }

  function close() { if (open) toggle(); }

  function init() { ham.addEventListener('click', toggle); }

  return { init, close };
})();

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const ScrollReveal = (() => {
  let io;

  function init() {
    if (io) io.disconnect();

    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('visible');
        // Trigger skill bars inside the revealed element
        en.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animate'));
        io.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    // Skill bars individually
    document.querySelectorAll('.page.active .skill-fill').forEach(f => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { f.classList.add('animate'); obs.disconnect(); }
      }, { threshold: 0.5 });
      obs.observe(f);
    });

    document.querySelectorAll('.page.active .reveal, .page.active .exp-item').forEach(el => {
      el.classList.remove('visible');
      io.observe(el);
    });
  }

  return { init };
})();

/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
function animateCounter(el, target, suffix, dur) {
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.floor(e * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ══════════════════════════════════════
   PAGE ROUTER
══════════════════════════════════════ */
const Router = (() => {
  let current = null;
  let busy    = false;

  function enter(id, isFirst) {
    const page = document.getElementById('page-' + id);
    if (!page) return;

    page.classList.add('active');
    window.scrollTo(0, 0);
    Navbar.setActive(id);
    current = id;

    // Trigger page-entry animations
    requestAnimationFrame(() => requestAnimationFrame(() => {
      page.classList.add('entered');
      ScrollReveal.init();
      CursorSystem.bindHovers();

      if (id === 'home') {
        ParallaxSystem.start();
        setTimeout(() => {
          animateCounter(document.getElementById('stat-1'), 5,  '+', 1400);
          animateCounter(document.getElementById('stat-2'), 20, '+', 1400);
          animateCounter(document.getElementById('stat-3'), 3,  '',  1200);
        }, 750);
      } else {
        ParallaxSystem.stop();
      }
    }));
  }

  function leave() {
    if (!current) return;
    const old = document.getElementById('page-' + current);
    if (!old) return;
    old.classList.remove('entered');
    setTimeout(() => old.classList.remove('active'), 50);
  }

  function navigate(id, e) {
    if (e) e.preventDefault();
    if (id === current || busy) return;
    busy = true;
    MobileMenu.close();

    Curtain.slideDown(() => {
      leave();
      enter(id, false);
      Curtain.slideUp(() => { busy = false; });
    });
  }

  function init(startId) { enter(startId, true); }

  return { navigate, init };
})();

/* ══════════════════════════════════════
   PROJECT CARD: mouse-follow glow
══════════════════════════════════════ */
function initCardGlow() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });
}

/* ══════════════════════════════════════
   NAV CARD: 3-D tilt on hover
══════════════════════════════════════ */
function initCardTilt() {
  document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left)  / r.width  - 0.5;
      const y  = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.3s';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 560);
    });
  });
}

/* ══════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.22;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ══════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════ */
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.category === cat) ? '' : 'none';
  });
}

/* ══════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════ */
function submitContactForm() {
  const ids = ['contact-fn','contact-ln','contact-email','contact-subject','contact-message'];
  let ok = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    const v  = el.value.trim();
    el.style.borderColor = v ? '' : '#E24B4A';
    el.style.background  = v ? '' : 'rgba(226,75,74,0.05)';
    if (!v) ok = false;
  });
  const ch = document.getElementById('contact-consent');
  if (!ch.checked) { ch.style.outline = '2px solid #E24B4A'; ok = false; }
  else ch.style.outline = '';
  if (!ok) return;
  document.getElementById('contact-form-inner').style.display = 'none';
  document.getElementById('contact-success').style.display    = 'block';
}

/* ══════════════════════════════════════
   GLOBAL EXPOSE
══════════════════════════════════════ */
window.navigateTo        = (id, e) => Router.navigate(id, e);
window.filterProjects    = filterProjects;
window.submitContactForm = submitContactForm;

/* ══════════════════════════════════════
   BOOT
══════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  CursorSystem.init();
  Navbar.init();
  MobileMenu.init();
  initCardGlow();
  initCardTilt();
  initMagnetic();

  Loader.run(() => Router.init('home'));
});
