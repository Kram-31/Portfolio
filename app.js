/**
 * app.js — Portfolio interactions
 * - Burger menu (mobile)
 * - Scroll animations (Intersection Observer)
 * - Active nav section highlight
 */

import { initModal } from './modal.js';

// Init imports
initModal();

// ===========================
// Burger Menu
// ===========================
const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.querySelector('.main-nav');

burgerBtn?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', isOpen);
    burgerBtn.innerHTML = isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
});

// Fermer le menu en cliquant un lien
mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        burgerBtn?.setAttribute('aria-expanded', 'false');
        burgerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
});

// ===========================
// Scroll Animations
// ===========================
const animatedEls = document.querySelectorAll('.animate-on-scroll');

const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            appearObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animatedEls.forEach(el => appearObserver.observe(el));

// ===========================
// Active Nav Section
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
            active?.classList.add('active');
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// Centralized Scroll Optimization (Throttle)
// ===========================
const backToTopBtn = document.getElementById('back-to-top');
const progressBar = document.getElementById('scroll-progress');
const header = document.querySelector('.main-header');

let isTicking = false;

window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            // 1. Back to Top
            if (scrolled > 400) {
                backToTopBtn?.classList.add('visible');
            } else {
                backToTopBtn?.classList.remove('visible');
            }
            
            // 2. Scroll Progress Bar
            const total = document.documentElement.scrollHeight - window.innerHeight;
            if (progressBar && total > 0) {
                progressBar.style.width = `${(scrolled / total) * 100}%`;
            }
            
            // 3. Header Glass
            header?.classList.toggle('scrolled', scrolled > 60);
            
            isTicking = false;
        });
        isTicking = true;
    }
}, { passive: true });

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Stat Counter Animation
// ===========================
function animateCounter(el, target, suffix = '', duration = 1200) {
    const startTime = performance.now();
    const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('[data-count]').forEach(el => {
                    const target = parseInt(el.dataset.count) || 0;
                    const suffix = el.dataset.suffix || '';
                    setTimeout(() => animateCounter(el, target, suffix), 400);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    counterObserver.observe(heroStats);
}

// Removed separate scroll handlers for performance

// ===========================
// Card Spotlight Effect
// ===========================
document.querySelectorAll('.project-card, .cert-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// ===========================
// Typewriter Effect (Hero)
// ===========================
const typedEl = document.querySelector('.text-gradient');
if (typedEl) {
    const fullText = typedEl.textContent.trim();
    typedEl.textContent = '';
    typedEl.classList.add('typing');

    let i = 0;
    const type = () => {
        if (i < fullText.length) {
            typedEl.textContent += fullText[i++];
            setTimeout(type, 65);
        } else {
            setTimeout(() => typedEl.classList.remove('typing'), 1200);
        }
    };
    setTimeout(type, 700);
}

