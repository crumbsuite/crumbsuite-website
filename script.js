/* ─── Mobile nav ─── */
const burger  = document.querySelector('.nav__burger');
const drawer  = document.getElementById('drawer');
const drawerLinks = document.querySelectorAll('.drawer__link, .drawer__cta');

burger.addEventListener('click', () => {
  drawer.classList.toggle('is-open');
});
drawerLinks.forEach(link => {
  link.addEventListener('click', () => drawer.classList.remove('is-open'));
});

/* ─── Sticky nav shadow ─── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,.08)'
    : 'none';
});

/* ─── Scroll-reveal ─── */
const revealEls = document.querySelectorAll(
  '.feature-card, .update-card, .screen-card, .step, .testimonial-card, .plan, .hero__text, .hero__mockup, .section-header, .demo-form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

/* ─── Notify form ─── */
const notifyForm = document.getElementById('notifyForm');
if (notifyForm) {
  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = notifyForm.querySelector('button');
    const input = notifyForm.querySelector('input');
    btn.textContent = '✓ You\'re on the list!';
    btn.style.background = '#4CAF50';
    btn.disabled = true;
    input.value = '';
  });
}

/* ─── Contact form ─── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#4CAF50';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ─── Book demo form (email wired) ─── */
const demoForm = document.getElementById('demoForm');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('demoName')?.value?.trim() || '';
    const email = document.getElementById('demoEmail')?.value?.trim() || '';
    const bakery = document.getElementById('demoBakery')?.value?.trim() || '';
    const slot = document.getElementById('demoSlot')?.value?.trim() || '';
    const notes = document.getElementById('demoNotes')?.value?.trim() || '';

    const subject = encodeURIComponent('CrumbSuite Demo Request');
    const body = encodeURIComponent(
      `Hi CrumbSuite Team,\n\n` +
      `I would like to book a demo.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Bakery: ${bakery}\n` +
      `Preferred Slot: ${slot}\n` +
      `Notes: ${notes || 'NA'}\n\n` +
      `Thanks`
    );

    window.location.href = `mailto:crumbsuite@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ─── Smooth active nav highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--clr-primary)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── Pricing toggle ─── */
const billingPills = document.querySelectorAll('.billing-pill');
const proPrice = document.getElementById('proPrice');
const proCycle = document.getElementById('proCycle');
const proPeriod = document.getElementById('proPeriod');
const proOffer = document.getElementById('proOffer');
const proCta = document.getElementById('proCta');

if (billingPills.length && proPrice && proCycle && proPeriod && proOffer && proCta) {
  billingPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cycle = pill.dataset.cycle;

      billingPills.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-selected', 'true');

      if (cycle === 'annual') {
        proPrice.textContent = proPrice.dataset.annual || '₹4,999/-';
        proCycle.textContent = '/annum';
        proPeriod.textContent = '14-day trial, then yearly billing';
        proOffer.textContent = '✓ Includes 2 months free';
        proCta.textContent = 'Start 14-Day Trial';
      } else {
        proPrice.textContent = proPrice.dataset.monthly || '₹499/-';
        proCycle.textContent = '/month';
        proPeriod.textContent = '14-day trial, then billed monthly';
        proOffer.textContent = '✓ Flexible monthly billing';
        proCta.textContent = 'Start 14-Day Trial';
      }
    });
  });
}

