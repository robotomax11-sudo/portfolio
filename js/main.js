/* ============================================
   ANIMATION CONFIGURATION
   ============================================

   To change the intro animation style, modify the
   'animationStyle' variable below.

   Options:
   - 'scramble'   : Hacker-style scramble effect (current)
   - 'typing'     : Typewriter effect
   - 'fade-in'    : Simple fade in
   - 'slide-up'   : Slide up from below
   - 'word-fade'  : Word by word fade in

   ============================================ */

const animationStyle = 'fade-in';

// The text to display in the intro
const introText = "I'm Rui, a Product Designer";

// Typing speed in milliseconds (lower = faster)
const typingSpeed = 80;

// ============================================
// TYPING ANIMATION
// ============================================

function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    let charIndex = 0;

    function type() {
        if (charIndex < introText.length) {
            typingElement.textContent += introText.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Hide cursor after typing completes (optional)
            // cursor.style.display = 'none';
        }
    }

    // Start typing after a brief delay
    setTimeout(type, 500);
}

// ============================================
// FADE-IN ANIMATION
// ============================================

function initFadeInAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    cursor.style.display = 'none';
    typingElement.textContent = introText;
    typingElement.style.opacity = '0';
    typingElement.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
        typingElement.style.opacity = '1';
    }, 300);
}

// ============================================
// SLIDE-UP ANIMATION
// ============================================

function initSlideUpAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    cursor.style.display = 'none';
    typingElement.textContent = introText;
    typingElement.style.opacity = '0';
    typingElement.style.transform = 'translateY(30px)';
    typingElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
        typingElement.style.opacity = '1';
        typingElement.style.transform = 'translateY(0)';
    }, 300);
}

// ============================================
// WORD-BY-WORD FADE ANIMATION
// ============================================

function initWordFadeAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    cursor.style.display = 'none';

    const words = introText.split(' ');
    typingElement.innerHTML = words.map((word, index) =>
        `<span class="word" style="opacity: 0; transition: opacity 0.4s ease ${index * 0.15}s;">${word}</span>`
    ).join(' ');

    setTimeout(() => {
        document.querySelectorAll('.word').forEach(word => {
            word.style.opacity = '1';
        });
    }, 300);
}

// ============================================
// SCRAMBLE (HACKER) ANIMATION
// ============================================

function initScrambleAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    cursor.style.display = 'none';

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    const duration = 2000; // Total animation duration in ms
    const frameRate = 30; // Updates per second
    const totalFrames = (duration / 1000) * frameRate;

    let frame = 0;
    typingElement.style.fontFamily = 'inherit';

    function scramble() {
        const progress = frame / totalFrames;
        const revealedLength = Math.floor(introText.length * progress);

        let result = '';
        for (let i = 0; i < introText.length; i++) {
            if (introText[i] === ' ') {
                result += ' ';
            } else if (i < revealedLength) {
                // Character is revealed
                result += introText[i];
            } else if (i < revealedLength + 3) {
                // Characters being scrambled (rolling window)
                result += chars[Math.floor(Math.random() * chars.length)];
            } else {
                // Characters not yet reached
                result += '';
            }
        }

        typingElement.textContent = result;
        frame++;

        if (frame <= totalFrames) {
            requestAnimationFrame(scramble);
        } else {
            typingElement.textContent = introText;
        }
    }

    // Start after a brief delay
    setTimeout(scramble, 500);
}

// ============================================
// SCROLL ANIMATIONS FOR CARDS
// ============================================

function initScrollAnimations() {
    const cards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for each card
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// ============================================
// SMOOTH HOVER EFFECTS
// ============================================

function initHoverEffects() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.01)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ============================================

function initParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');

    if (orbs.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// HIDE SCROLL INDICATOR ON SCROLL
// ============================================

function initScrollIndicatorHide() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    let hasScrolled = false;

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        }
    });
}

// ============================================
// NAVIGATION GLASS EFFECT ON SCROLL
// ============================================

function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ============================================
// STACKING/DRAWER SCROLL EFFECT
// ============================================

function initStackingEffect() {
    const sections = document.querySelectorAll('.stacking-section');
    if (sections.length === 0) return;

    // Update active nav link based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize intro animation based on style
    switch (animationStyle) {
        case 'scramble':
            initScrambleAnimation();
            break;
        case 'typing':
            initTypingAnimation();
            break;
        case 'fade-in':
            initFadeInAnimation();
            break;
        case 'slide-up':
            initSlideUpAnimation();
            break;
        case 'word-fade':
            initWordFadeAnimation();
            break;
        default:
            initScrambleAnimation();
    }

    // Initialize other animations
    initScrollAnimations();
    initParallaxEffect();
    initSmoothScroll();
    initScrollIndicatorHide();
    initNavScrollEffect();
    initStackingEffect();

    // Make cards visible immediately if they're in viewport on load
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                setTimeout(() => card.classList.add('visible'), index * 150);
            }
        });
    }, 100);
});
