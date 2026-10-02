/*=============== SHOW & CLOSE MENU ===============*/
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

/*=============== REMOVE MOBILE MENU ON LINK CLICK ===============*/
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*=============== CHANGE HEADER STYLES ON SCROLL ===============*/
const header = document.getElementById('header');

const scrollHeader = () => {
  header.classList.toggle('scroll-header', window.scrollY >= 60);
};

window.addEventListener('scroll', scrollHeader);

/*=============== DARK MODE TOGGLE ===============*/
const themeToggle = document.getElementById('theme-toggle');
const body        = document.body;
const THEME_KEY   = 'barbershop-theme';

// Load saved theme
if (localStorage.getItem(THEME_KEY) === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.querySelector('i').className = 'ri-sun-line';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.querySelector('i').className = isDark ? 'ri-sun-line' : 'ri-moon-line';
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
});

/*=============== BOOKING MODAL ===============*/
const modalOverlay  = document.getElementById('modal-overlay');
const modalClose    = document.getElementById('modal-close');
const bookBtns      = [
  document.getElementById('book-btn'),
  document.getElementById('home-book-btn'),
  document.getElementById('service-book-btn'),
];

const openModal = () => {
  modalOverlay.classList.add('show-modal');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOverlay.classList.remove('show-modal');
  document.body.style.overflow = '';
};

bookBtns.forEach(btn => { if (btn) btn.addEventListener('click', openModal); });

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* Set minimum date to today */
const bookDate = document.getElementById('book-date');
if (bookDate) {
  const today = new Date().toISOString().split('T')[0];
  bookDate.setAttribute('min', today);
}

/*=============== BOOKING FORM SUBMIT ===============*/
const bookingForm    = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingSuccess.classList.add('show');
    setTimeout(() => {
      bookingSuccess.classList.remove('show');
      bookingForm.reset();
      closeModal();
    }, 3000);
  });
}

/*=============== CONTACT FORM SUBMIT ===============*/
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.add('show');
    setTimeout(() => {
      formSuccess.classList.remove('show');
      contactForm.reset();
    }, 4000);
  });
}

/*=============== SWIPER — WORKS ===============*/
const workSwiper = new Swiper('.work__swiper', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.work__pagination',
    clickable: true,
  },
  breakpoints: {
    480:  { slidesPerView: 2,   spaceBetween: 16 },
    768:  { slidesPerView: 3,   spaceBetween: 20 },
    1024: { slidesPerView: 4,   spaceBetween: 24 },
  },
});

/*=============== SWIPER — TESTIMONIALS ===============*/
/*=============== SWIPER — TESTIMONIALS ===============*/
const testimonialSwiper = new Swiper('.testimonial__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,

  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: '.testimonial__pagination',
    clickable: true,
  },

  speed: 600,
});

/*=============== WORK FILTER BUTTONS ===============*/
const filterBtns = document.querySelectorAll('.work__filter');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');

    // Visual feedback — future enhancement can filter slides
    const filter = btn.dataset.filter;
    console.log('Filter selected:', filter);
  });
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up');

const showScrollUp = () => {
  scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
};

window.addEventListener('scroll', showScrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sTop    = section.offsetTop - 140;
    const sBottom = sTop + section.offsetHeight;
    const sId     = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sId}"]`);

    if (navLink) {
      navLink.classList.toggle('active-link', scrollY >= sTop && scrollY < sBottom);
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== ANIMATED COUNTERS ===============*/
const animateCounters = () => {
  document.querySelectorAll('.about__counter-number').forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
};

/* Trigger counters when about section is visible */
const aboutSection = document.getElementById('about');
let countersStarted = false;

if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(aboutSection);
}

/*=============== GSAP ANIMATIONS ===============*/
gsap.registerPlugin(ScrollTrigger);

/* --- Home section --- */
gsap.from('.home__badge', {
  y: 30, opacity: 0, duration: .8, delay: .2, ease: 'power3.out'
});
gsap.from('.home__title', {
  y: 50, opacity: 0, duration: .9, delay: .4, ease: 'power3.out'
});
gsap.from('.home__description', {
  y: 40, opacity: 0, duration: .8, delay: .6, ease: 'power3.out'
});
gsap.from('.home__buttons', {
  y: 30, opacity: 0, duration: .8, delay: .8, ease: 'power3.out'
});
gsap.from('.home__logo', {
  x: 60, opacity: 0, duration: 1.1, delay: .5, ease: 'power3.out'
});
gsap.from('.home__scroll', {
  y: 20, opacity: 0, duration: .8, delay: 1.2, ease: 'power3.out'
});

/* --- Stats strip --- */
gsap.from('.stats__item', {
  scrollTrigger: { trigger: '.stats', start: 'top 85%' },
  y: 25, opacity: 0, duration: .7, stagger: .15, ease: 'power3.out'
});

/* --- About section --- */
gsap.from('.about__image', {
  scrollTrigger: { trigger: '.about', start: 'top 75%' },
  x: -60, opacity: 0, duration: 1, ease: 'power3.out'
});
gsap.from('.about__data > *', {
  scrollTrigger: { trigger: '.about', start: 'top 75%' },
  y: 40, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out'
});

/* --- Works section --- */
gsap.from('.work__description, .work__filters', {
  scrollTrigger: { trigger: '.work', start: 'top 80%' },
  y: 30, opacity: 0, duration: .8, stagger: .2, ease: 'power3.out'
});

/* --- Services section --- */
gsap.from('.service__prices, .service__testimonial', {
  scrollTrigger: { trigger: '.service', start: 'top 75%' },
  y: 50, opacity: 0, duration: .9, stagger: .2, ease: 'power3.out'
});

/* --- Experts section --- */
gsap.from('.expert__card', {
  scrollTrigger: { trigger: '.expert', start: 'top 80%' },
  y: 50, opacity: 0, duration: .8, stagger: .15, ease: 'power3.out'
});

/* --- Contact section --- */
gsap.from('.contact__card', {
  scrollTrigger: { trigger: '.contact', start: 'top 80%' },
  x: -40, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out'
});
gsap.from('.contact__form', {
  scrollTrigger: { trigger: '.contact', start: 'top 80%' },
  x: 40, opacity: 0, duration: .9, ease: 'power3.out'
});

/* --- Footer section --- */
gsap.from('.footer__brand, .footer__group', {
  scrollTrigger: { trigger: '.footer', start: 'top 90%' },
  y: 30, opacity: 0, duration: .8, stagger: .15, ease: 'power3.out'
});
