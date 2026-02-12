/* =========================================
   Scroll Reveal (IntersectionObserver)
   ========================================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================================
   Navigation — Scroll Shadow
   ========================================= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});

/* =========================================
   Navigation — Active Link Highlight
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__links a');

const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))}px 0px -40% 0px`,
  }
);

sections.forEach((section) => activeLinkObserver.observe(section));

/* =========================================
   Mobile Menu Toggle
   ========================================= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =========================================
   Smooth Scroll for anchor links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================================
   Contact Form (prevent default)
   ========================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 2500);
  });
}
