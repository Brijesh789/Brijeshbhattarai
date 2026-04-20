/* ═══════════════════════════════════════════════
   BRIJESH BHATTARAI — PERSONAL WEBSITE
   script.js
   ═══════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════
// CURSOR SYSTEM
// ══════════════════════════════════════
const CursorSystem = (() => {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const trail = document.getElementById('cursor-trail');

  let dotX = 0,  dotY  = 0;
  let ringX = 0, ringY = 0;
  let trailX = 0, trailY = 0;
  let mouseX = 0, mouseY = 0;
  let raf;

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function loop() {
    // Dot follows instantly
    dotX += (mouseX - dotX) * 1;
    dotY += (mouseY - dotY) * 1;

    // Ring follows with smooth lag
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    // Trail follows with more lag
    trailX += (mouseX - trailX) * 0.055;
    trailY += (mouseY - trailY) * 0.055;

    dot.style.left   = dotX   + 'px';
    dot.style.top    = dotY   + 'px';
    ring.style.left  = ringX  + 'px';
    ring.style.top   = ringY  + 'px';
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';

    raf = requestAnimationFrame(loop);
  }

  function addHoverListeners() {
    const hoverEls = document.querySelectorAll(
      'a, button, .nav-card, .project-card, .blog-card, .blog-main, .blog-side-card, .program-card, .filter-btn, .form-submit, .form-input, .form-textarea, .form-select, .social-btn'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  function init() {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
    loop();
    addHoverListeners();
  }

  return { init, addHoverListeners };
})();

// ══════════════════════════════════════
// PARALLAX — cursor-driven & scroll-driven
// ══════════════════════════════════════
const ParallaxSystem = (() => {
  let mx = 0, my = 0;
  let cw = window.innerWidth  / 2;
  let ch = window.innerHeight / 2;
  let raf;

  // Elements with data-parallax="speed" attribute
  const orb1   = document.querySelector('.hero-orb-1');
  const orb2   = document.querySelector('.hero-orb-2');
  const grid   = document.querySelector('.hero-grid-lines');
  const photo  = document.querySelector('.hero-photo-wrap');

  function onMove(e) {
    mx = (e.clientX - cw) / cw;  // -1 to 1
    my = (e.clientY - ch) / ch;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  let cx = 0, cy = 0;

  function loop() {
    cx = lerp(cx, mx, 0.06);
    cy = lerp(cy, my, 0.06);

    if (orb1)  orb1.style.transform  = `translate(${cx * -18}px, ${cy * -18}px)`;
    if (orb2)  orb2.style.transform  = `translate(${cx *  12}px, ${cy *  12}px)`;
    if (grid)  grid.style.transform  = `translate(${cx *   6}px, ${cy *   6}px)`;
    if (photo) photo.style.transform = `translateY(-50%) translate(${cx * -10}px, ${cy * -8}px)`;

    raf = requestAnimationFrame(loop);
  }

  function onResize() {
    cw = window.innerWidth  / 2;
    ch = window.innerHeight / 2;
  }

  function init() {
    document.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    loop();
  }

  function pause()  { cancelAnimationFrame(raf); }
  function resume() { loop(); }

  return { init, pause, resume };
})();

// ══════════════════════════════════════
// LOADER
// ══════════════════════════════════════
const Loader = (() => {
  const el      = document.getElementById('loader');
  const name    = el.querySelector('.loader-name');
  const bar     = el.querySelector('.loader-bar-fill');
  const label   = el.querySelector('.loader-label');

  function run(onDone) {
    // Staggered reveal
    setTimeout(() => { name.classList.add('show'); label.classList.add('show'); }, 80);
    setTimeout(() => { bar.style.width = '100%'; }, 140);

    setTimeout(() => {
      el.classList.add('hidden');
      onDone();
    }, 2200);
  }

  return { run };
})();

// ══════════════════════════════════════
// CURTAIN PAGE TRANSITION
// ══════════════════════════════════════
const Curtain = (() => {
  const el = document.getElementById('curtain');

  function slideDown(cb) {
    el.className = '';
    void el.offsetWidth;           // force reflow
    el.classList.add('slide-down');
    setTimeout(cb, 620);
  }

  function slideUp(cb) {
    el.className = '';
    void el.offsetWidth;
    el.classList.add('slide-up');
    setTimeout(() => {
      el.className = '';
      if (cb) cb();
    }, 620);
  }

  return { slideDown, slideUp };
})();

// ══════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════
const Navbar = (() => {
  const nav = document.getElementById('navbar');

  function init() {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 48);
    });
  }

  function setActive(pageId) {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });
  }

  return { init, setActive };
})();

// ══════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════
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
      setTimeout(() => { menu.style.display = ''; }, 400);
    }
  }

  function close() {
    if (open) toggle();
  }

  function init() {
    ham.addEventListener('click', toggle);
  }

  return { init, close };
})();

// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
const ScrollReveal = (() => {
  let observer;

  function init() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill fills inside
          entry.target.querySelectorAll('.skill-fill').forEach(fill => {
            fill.classList.add('animate');
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Also observe skill fills directly
    document.querySelectorAll('.page.active .skill-fill').forEach(fill => {
      const skillObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fill.classList.add('animate');
          skillObserver.disconnect();
        }
      }, { threshold: 0.5 });
      skillObserver.observe(fill);
    });

    document.querySelectorAll('.page.active .reveal, .page.active .exp-item').forEach(el => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }

  return { init };
})();

// ══════════════════════════════════════
// COUNTER ANIMATION
// ══════════════════════════════════════
function animateCounter(el, target, suffix, duration) {
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

// ══════════════════════════════════════
// PAGE ROUTER
// ══════════════════════════════════════
const Router = (() => {
  let current   = null;
  let busy      = false;
  let parallaxRunning = true;

  function showPage(id, isFirst) {
    const page = document.getElementById('page-' + id);
    if (!page) return;

    // Activate page
    page.classList.add('active');
    window.scrollTo(0, 0);

    // Update nav
    Navbar.setActive(id);
    current = id;

    // Trigger entry animations after a tiny delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        page.classList.add('entered');
        ScrollReveal.init();

        // Counter animation on home
        if (id === 'home') {
          setTimeout(() => {
            const s1 = document.getElementById('stat-1');
            const s2 = document.getElementById('stat-2');
            const s3 = document.getElementById('stat-3');
            if (s1) animateCounter(s1, 5,  '+', 1400);
            if (s2) animateCounter(s2, 20, '+', 1400);
            if (s3) animateCounter(s3, 3,  '',  1200);
          }, 700);

          // Parallax only on home
          if (!parallaxRunning) { ParallaxSystem.resume(); parallaxRunning = true; }
        } else {
          if (parallaxRunning) { ParallaxSystem.pause(); parallaxRunning = false; }
        }

        // Re-add cursor hover listeners for new page elements
        CursorSystem.addHoverListeners();
      });
    });
  }

  function hideCurrent() {
    if (!current) return;
    const old = document.getElementById('page-' + current);
    if (old) {
      old.classList.remove('entered');
      setTimeout(() => old.classList.remove('active'), 50);
    }
  }

  function navigate(id, e) {
    if (e) e.preventDefault();
    if (id === current || busy) return;

    busy = true;
    MobileMenu.close();

    Curtain.slideDown(() => {
      hideCurrent();
      showPage(id, false);

      Curtain.slideUp(() => {
        busy = false;
      });
    });
  }

  function init(startId) {
    showPage(startId, true);
  }

  return { navigate, init };
})();

// ══════════════════════════════════════
// PROJECT CARDS — mouse glow effect
// ══════════════════════════════════════
function initCardGlow() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top)  / rect.height * 100) + '%');
    });
  });
}

// ══════════════════════════════════════
// PROJECT FILTER
// ══════════════════════════════════════
function filterProjects(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.style.display = match ? '' : 'none';
    card.style.opacity = match ? '' : '0';
  });
}

// ══════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════
function submitContactForm() {
  const fields = ['contact-fn', 'contact-ln', 'contact-email', 'contact-subject', 'contact-message'];
  let valid = true;

  fields.forEach(id => {
    const el = document.getElementById(id);
    const val = el.value.trim();
    if (!val) {
      el.style.borderColor = '#E24B4A';
      el.style.background  = 'rgba(226,75,74,0.05)';
      valid = false;
    } else {
      el.style.borderColor = '';
      el.style.background  = '';
    }
  });

  const consent = document.getElementById('contact-consent');
  if (!consent.checked) {
    consent.style.outline = '2px solid #E24B4A';
    valid = false;
  } else {
    consent.style.outline = '';
  }

  if (!valid) return;

  document.getElementById('contact-form-inner').style.display = 'none';
  document.getElementById('contact-success').style.display    = 'block';
}

// ══════════════════════════════════════
// MAGNETIC BUTTON EFFECT
// ══════════════════════════════════════
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const dy = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ══════════════════════════════════════
// NAV CARD TILT
// ══════════════════════════════════════
function initCardTilt() {
  document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// ══════════════════════════════════════
// SMOOTH HORIZONTAL TEXT MARQUEE (home)
// ══════════════════════════════════════
function initMarquee() {
  const marquee = document.querySelector('.marquee-inner');
  if (!marquee) return;
  let x = 0;
  (function tick() {
    x -= 0.4;
    if (x < -marquee.scrollWidth / 2) x = 0;
    marquee.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(tick);
  })();
}

// ══════════════════════════════════════
// GLOBAL EXPOSE — called from HTML
// ══════════════════════════════════════
window.navigateTo        = (id, e) => Router.navigate(id, e);
window.filterProjects    = filterProjects;
window.submitContactForm = submitContactForm;
window.toggleMobileMenu  = () => {
  const ham = document.querySelector('.hamburger');
  ham.click();
};

// ══════════════════════════════════════
// BOOT
// ══════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  CursorSystem.init();
  Navbar.init();
  MobileMenu.init();
  ParallaxSystem.init();
  initCardGlow();
  initCardTilt();
  initMagneticButtons();
  initMarquee();

  Loader.run(() => {
    Router.init('home');
  });
});
