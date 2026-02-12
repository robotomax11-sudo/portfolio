/* ============================================
   ANIMATION CONFIGURATION
   ============================================

   To change the intro animation style, modify the
   'animationStyle' variable below.

   Options:
   - 'text-swap'  : Dynamic headline with typewriter swap (recommended)
   - 'scramble'   : Hacker-style scramble effect
   - 'typing'     : Typewriter effect
   - 'fade-in'    : Simple fade in
   - 'slide-up'   : Slide up from below
   - 'word-fade'  : Word by word fade in

   ============================================ */

const animationStyle = 'text-swap';

// Static part of the intro (always visible)
const introStatic = "I'm Rui, ";

// Roles to cycle through
const roles = [
    "a Product Designer",
    "a Problem Solver",
    "a Design Hobbyist"
];

// The text to display in the intro (used by other animation styles)
const introText = "I'm Rui, a Product Designer";

// Typing speed in milliseconds (lower = faster)
const typingSpeed = 80;

// Delete speed in milliseconds (faster than typing)
const deleteSpeed = 40;

// Pause before deleting (ms)
const pauseBeforeDelete = 2000;

// Pause before typing next role (ms)
const pauseBeforeType = 500;

// ============================================
// TEXT SWAP ANIMATION (Dynamic Headline)
// ============================================

function initTextSwapAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentRole = roles[roleIndex];

    // Set up role container (static text "I'm Rui," is now in HTML)
    typingElement.innerHTML = `<span class="role-text"></span>`;
    const roleElement = typingElement.querySelector('.role-text');

    function type() {
        if (isDeleting) {
            // Deleting characters
            if (charIndex > 0) {
                charIndex--;
                roleElement.textContent = currentRole.substring(0, charIndex);
                setTimeout(type, deleteSpeed);
            } else {
                // Done deleting, move to next role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                currentRole = roles[roleIndex];
                setTimeout(type, pauseBeforeType);
            }
        } else {
            // Typing characters
            if (charIndex < currentRole.length) {
                charIndex++;
                roleElement.textContent = currentRole.substring(0, charIndex);
                setTimeout(type, typingSpeed);
            } else {
                // Done typing, pause then start deleting
                isDeleting = true;
                setTimeout(type, pauseBeforeDelete);
            }
        }
    }

    // Start typing after a brief delay
    setTimeout(type, 500);
}

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
            const href = this.getAttribute('href');
            const targetId = href.substring(1);

            // Calculate scroll position based on the stacking layout
            const heroSpacer = document.querySelector('.hero-spacer');
            const projectsWrapper = document.querySelector('.projects-wrapper');
            const projectsSection = document.querySelector('#projects');
            const aboutSection = document.querySelector('#about');

            let scrollTarget = 0;

            if (targetId === 'projects' && heroSpacer) {
                // Scroll to where projects section becomes fully visible
                scrollTarget = heroSpacer.offsetTop + heroSpacer.offsetHeight;
            } else if (targetId === 'about' && projectsWrapper) {
                // Scroll to where about section starts
                scrollTarget = projectsWrapper.offsetTop + projectsWrapper.offsetHeight;
            }

            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
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

    const heroSection = document.querySelector('.stacking-section[data-stack-order="1"]');
    const heroSpacer = document.querySelector('.hero-spacer');
    const projectsSection = document.querySelector('.stacking-section[data-stack-order="2"]');
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projectsSpacer = document.querySelector('.projects-scroll-spacer');

    if (projectsSection && projectsSpacer && heroSpacer && projectsWrapper) {
        // Cache layout values to avoid reading on every scroll
        let cachedValues = {};
        let ticking = false;

        const updateCachedValues = () => {
            cachedValues = {
                viewportHeight: window.innerHeight,
                heroSpacerTop: heroSpacer.offsetTop,
                heroSpacerBottom: heroSpacer.offsetTop + heroSpacer.offsetHeight,
                projectsHeight: projectsSection.offsetHeight,
                wrapperTop: projectsWrapper.offsetTop,
                wrapperBottom: projectsWrapper.offsetTop + projectsWrapper.offsetHeight
            };
        };

        const updateLayout = () => {
            const projectsHeight = projectsSection.offsetHeight;
            projectsSpacer.style.height = projectsHeight + 'px';
            updateCachedValues();
        };

        // Update on load, resize, and after images load
        updateLayout();
        window.addEventListener('resize', updateLayout);
        window.addEventListener('load', updateLayout);

        const updateScroll = () => {
            const scrollY = window.scrollY;
            const { viewportHeight, heroSpacerTop, heroSpacerBottom, projectsHeight, wrapperBottom } = cachedValues;

            // Phase 1: Hero visible, Projects not yet appearing
            if (scrollY < heroSpacerTop) {
                projectsSection.style.transform = 'translateY(100vh)';
                projectsSection.classList.remove('visible');
            }
            // Phase 2: Scrolling through hero spacer - Projects slides up from bottom
            else if (scrollY >= heroSpacerTop && scrollY < heroSpacerBottom) {
                const progress = (scrollY - heroSpacerTop) / viewportHeight;
                const slideUp = viewportHeight * (1 - progress);
                projectsSection.style.transform = `translateY(${slideUp}px)`;
                projectsSection.classList.add('visible');
            }
            // Phase 3: Scrolling through projects wrapper - scroll through projects content
            else if (scrollY >= heroSpacerBottom && scrollY < wrapperBottom) {
                const scrollInWrapper = scrollY - heroSpacerBottom;
                const maxScroll = Math.max(0, projectsHeight - viewportHeight);
                const scrollProgress = Math.min(scrollInWrapper, maxScroll);
                projectsSection.style.transform = `translateY(-${scrollProgress}px)`;
                projectsSection.classList.add('visible');
            }
            // Phase 4: Past projects wrapper - keep at final position
            else if (scrollY >= wrapperBottom) {
                const maxScroll = Math.max(0, projectsHeight - viewportHeight);
                projectsSection.style.transform = `translateY(-${maxScroll}px)`;
                projectsSection.classList.add('visible');
            }

            ticking = false;
        };

        // Handle scroll with requestAnimationFrame for smooth performance
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });

        // Trigger initial scroll calculation
        updateScroll();

        // Update active nav link based on scroll position
        const navLinks = document.querySelectorAll('.nav-link');

        function updateNavActiveState() {
            const scrollY = window.scrollY;
            const heroSpacerBottom = heroSpacer.offsetTop + heroSpacer.offsetHeight;
            const projectsWrapperBottom = projectsWrapper.offsetTop + projectsWrapper.offsetHeight;

            // Clear all active states first
            navLinks.forEach(link => link.classList.remove('active'));

            // Determine which section is active based on scroll position
            if (scrollY < heroSpacerBottom - 100) {
                // In hero section - no active state
            } else if (scrollY < projectsWrapperBottom - 100) {
                // In projects section
                const projectsLink = document.querySelector('.nav-link[href="#projects"]');
                if (projectsLink) projectsLink.classList.add('active');
            } else {
                // In about section
                const aboutLink = document.querySelector('.nav-link[href="#about"]');
                if (aboutLink) aboutLink.classList.add('active');
            }
        }

        // Update on scroll
        window.addEventListener('scroll', updateNavActiveState, { passive: true });
        // Initial update
        updateNavActiveState();
    }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize intro animation based on style
    switch (animationStyle) {
        case 'text-swap':
            initTextSwapAnimation();
            break;
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
            initTextSwapAnimation();
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

    // Handle hash on page load (for links like index.html#projects)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const heroSpacer = document.querySelector('.hero-spacer');

        if (targetId === 'projects' && heroSpacer) {
            // Small delay to ensure layout is ready
            setTimeout(() => {
                const scrollTarget = heroSpacer.offsetTop + heroSpacer.offsetHeight;
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'instant'
                });
            }, 100);
        }
    }
});
