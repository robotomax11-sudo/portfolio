/* ============================================
   BENTO BOX PORTFOLIO V2 - INTERACTIVE EFFECTS
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================

const config = {
    // Roles for headline cycling
    roles: ['Product Designer', 'Problem Solver', 'Design Hobbyist'],
    roleChangeInterval: 3000,
    typingSpeed: 80,
    deletingSpeed: 50,

    // Skills for physics cloud
    skills: [
        'Figma',
        'Sketch',
        'Adobe XD',
        'Framer',
        'Principle',
        'InVision',
        'Protopie',
        'Miro',
        'FigJam'
    ],

    // Magnetic effect settings
    magneticStrength: 0.3,
    magneticRadius: 100
};

// ============================================
// DYNAMIC HEADLINE - TEXT SWAPPING
// ============================================

class HeadlineTyper {
    constructor(element, roles) {
        this.element = element;
        this.roles = roles;
        this.currentRoleIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.isPaused = false;
    }

    start() {
        this.currentText = this.roles[0];
        this.element.textContent = this.currentText;
        setTimeout(() => this.tick(), config.roleChangeInterval);
    }

    tick() {
        const currentRole = this.roles[this.currentRoleIndex];

        if (this.isDeleting) {
            // Deleting text
            this.currentText = currentRole.substring(0, this.currentText.length - 1);
        } else {
            // Typing text
            this.currentText = currentRole.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let nextDelay = this.isDeleting ? config.deletingSpeed : config.typingSpeed;

        if (!this.isDeleting && this.currentText === currentRole) {
            // Finished typing, pause before deleting
            nextDelay = config.roleChangeInterval;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            // Finished deleting, move to next role
            this.isDeleting = false;
            this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
            nextDelay = 300;
        }

        setTimeout(() => this.tick(), nextDelay);
    }
}

// ============================================
// PHYSICS-BASED SKILLS CLOUD (Matter.js)
// ============================================

class SkillsCloud {
    constructor(container, skills) {
        this.container = container;
        this.skills = skills;
        this.engine = null;
        this.render = null;
        this.bodies = [];
        this.elements = [];
    }

    init() {
        if (typeof Matter === 'undefined') {
            console.warn('Matter.js not loaded, falling back to static display');
            this.createStaticTags();
            return;
        }

        const { Engine, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

        // Get container dimensions
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Create engine
        this.engine = Engine.create();
        this.engine.gravity.y = 0.3;

        // Create walls
        const wallThickness = 50;
        const walls = [
            // Bottom
            Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
            // Top
            Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
            // Left
            Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
            // Right
            Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
        ];

        World.add(this.engine.world, walls);

        // Create skill bodies
        this.skills.forEach((skill, index) => {
            const tagWidth = skill.length * 8 + 24;
            const tagHeight = 28;
            const x = 30 + Math.random() * (width - 60);
            const y = 20 + Math.random() * (height - 40);

            const body = Bodies.rectangle(x, y, tagWidth, tagHeight, {
                restitution: 0.6,
                friction: 0.1,
                frictionAir: 0.02,
                chamfer: { radius: 14 }
            });

            // Add random initial velocity
            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3
            });

            this.bodies.push(body);
            World.add(this.engine.world, body);

            // Create DOM element
            const element = document.createElement('div');
            element.className = 'skill-tag';
            element.textContent = skill;
            if (index === 0) element.classList.add('highlight');
            this.container.appendChild(element);
            this.elements.push(element);
        });

        // Add mouse constraint for interaction
        const mouse = Mouse.create(this.container);
        const mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(this.engine.world, mouseConstraint);

        // Run the engine
        const runner = Runner.create();
        Runner.run(runner, this.engine);

        // Update DOM positions
        this.updatePositions();
    }

    updatePositions() {
        this.bodies.forEach((body, index) => {
            const element = this.elements[index];
            const { x, y } = body.position;
            const angle = body.angle;

            element.style.left = `${x - element.offsetWidth / 2}px`;
            element.style.top = `${y - element.offsetHeight / 2}px`;
            element.style.transform = `rotate(${angle}rad)`;
        });

        requestAnimationFrame(() => this.updatePositions());
    }

    createStaticTags() {
        // Fallback for when Matter.js is not available
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.skills.forEach((skill, index) => {
            const element = document.createElement('div');
            element.className = 'skill-tag';
            element.textContent = skill;
            if (index === 0) element.classList.add('highlight');

            // Position randomly
            const x = 10 + Math.random() * (width - 80);
            const y = 10 + Math.random() * (height - 40);
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            this.container.appendChild(element);
        });
    }
}

// ============================================
// MAGNETIC HOVER EFFECT
// ============================================

class MagneticEffect {
    constructor(elements) {
        this.elements = elements;
        this.boundHandlers = new Map();
    }

    init() {
        this.elements.forEach(element => {
            const handleMouseMove = (e) => this.onMouseMove(e, element);
            const handleMouseLeave = () => this.onMouseLeave(element);

            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseleave', handleMouseLeave);

            this.boundHandlers.set(element, { handleMouseMove, handleMouseLeave });
        });
    }

    onMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = config.magneticRadius;

        if (distance < maxDistance) {
            const strength = (1 - distance / maxDistance) * config.magneticStrength;
            const moveX = deltaX * strength;
            const moveY = deltaY * strength;

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }

    onMouseLeave(element) {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.3s ease-out';

        setTimeout(() => {
            element.style.transition = '';
        }, 300);
    }
}

// ============================================
// ZOOM NAVIGATION (Work Card -> Project Detail)
// ============================================

class ZoomNavigation {
    constructor() {
        this.bentoContainer = document.getElementById('bento-main');
        this.projectDetailView = document.getElementById('project-detail-view');
        this.backToHomeBtn = document.getElementById('back-to-home');
        this.workCards = document.querySelectorAll('.work-card');
        this.currentProjectId = null;
    }

    init() {
        // Work card click -> Show project detail directly
        this.workCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.project;
                this.showProjectDetail(projectId);
            });
        });

        // Back to home button
        this.backToHomeBtn.addEventListener('click', () => this.showHome());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.projectDetailView.classList.contains('active')) {
                this.showHome();
            }
        });
    }

    showProjectDetail(projectId) {
        this.currentProjectId = projectId;
        this.bentoContainer.classList.add('zoomed-out');

        setTimeout(() => {
            // Here you could load different content based on projectId
            this.projectDetailView.classList.add('active');
        }, 300);
    }

    showHome() {
        this.projectDetailView.classList.remove('active');

        setTimeout(() => {
            this.bentoContainer.classList.remove('zoomed-out');
        }, 300);
    }
}

// ============================================
// AVATAR PARALLAX EFFECT
// ============================================

class AvatarParallax {
    constructor(element) {
        this.element = element;
        this.image = element.querySelector('.avatar-image');
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        const rotateX = deltaY * 10;
        const rotateY = deltaX * -10;

        this.image.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    onMouseLeave() {
        this.image.style.transform = '';
        this.image.style.transition = 'transform 0.5s ease-out';

        setTimeout(() => {
            this.image.style.transition = '';
        }, 500);
    }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Masonry for Pinterest layout
    const bentoContainer = document.getElementById('bento-main');
    if (bentoContainer && typeof Masonry !== 'undefined') {
        const msnry = new Masonry(bentoContainer, {
            itemSelector: '.bento-card',
            columnWidth: '.bento-card:not(.footer-card)',
            percentPosition: true,
            gutter: 14
        });

        // Re-layout after images load
        const images = bentoContainer.querySelectorAll('img');
        let loadedImages = 0;
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        msnry.layout();
                    }
                });
            }
        });
    }

    // Initialize headline typer
    const roleTextElement = document.getElementById('role-text');
    if (roleTextElement) {
        const headlineTyper = new HeadlineTyper(roleTextElement, config.roles);
        headlineTyper.start();
    }

    // Initialize skills cloud
    const skillsCloudContainer = document.getElementById('skills-cloud');
    if (skillsCloudContainer) {
        const skillsCloud = new SkillsCloud(skillsCloudContainer, config.skills);
        skillsCloud.init();
    }

    // Initialize magnetic effect on contact links
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    if (magneticLinks.length > 0) {
        const magneticEffect = new MagneticEffect(magneticLinks);
        magneticEffect.init();
    }

    // Initialize zoom navigation
    const zoomNav = new ZoomNavigation();
    zoomNav.init();

    // Initialize avatar parallax
    const avatarElement = document.querySelector('.hero-avatar');
    if (avatarElement) {
        const avatarParallax = new AvatarParallax(avatarElement);
        avatarParallax.init();
    }

    // Add initial animation class to cards
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 80);
    });
});
