document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---------- Hero: entrance, stat count-up, parallax ---------- */
const hero = document.getElementById('hero');
const heroImg = document.getElementById('heroImg');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero) {
  // Staggered entrance
  const animEls = hero.querySelectorAll('.hero-anim');
  animEls.forEach((el, i) => el.style.setProperty('--d', `${i * 0.12}s`));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => animEls.forEach(el => el.classList.add('is-in')));
  });

  // Count-up when the stats come into view
  const counters = hero.querySelectorAll('[data-count]');
  const countUp = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!reduceMotion) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => {
      c.textContent = '0' + (c.dataset.suffix || '');
      statObserver.observe(c);
    });
  }

  // Gentle parallax
  if (heroImg && !reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < hero.offsetHeight) heroImg.style.transform = `translateY(${y * 0.25}px)`;
        ticking = false;
      });
    }, { passive: true });
  }
}

  
  /* ---------- Contact form (front-end only demo) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formNote.textContent = 'Please fill in all required fields and accept the guidelines.';
      formNote.style.color = '#C2570A';
      return;
    }
    formNote.textContent = 'Thanks — your message has been received. We\'ll follow up within one business day.';
    formNote.style.color = '#14213D';
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
