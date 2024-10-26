// Configuration
const CONFIG = {
    animation: {
        duration: 0.3,
        threshold: 0.2,
        particles: {
            count: 50,
            colors: ['#00f2fe', '#0093E9', '#64FFDA']
        }
    },
services: {
    'visibility': {
        title: 'Visibilité Digitale',
        content: `
            <div class="service-details">
                <h4>Une présence en ligne performante et sécurisée</h4>
                <ul>
                    <li>Développement web professionnel basé sur des infrastructures robustes</li>
                    <li>Optimisation pour les moteurs de recherche (SEO)</li>
                    <li>Performance et disponibilité garanties</li>
                    <li>Protection contre les cybermenaces</li>
                    <li>Monitoring et maintenance proactive</li>
                </ul>
                <p class="service-tech">Basé sur notre expertise en infrastructures télécom</p>
            </div>
        `
    },
    'infrastructure': {
        title: 'Infrastructure Sécurisée',
        content: `
            <div class="service-details">
                <h4>Le socle de votre réussite digitale</h4>
                <ul>
                    <li>Réseaux MPLS/SDWAN nouvelle génération</li>
                    <li>Protection avancée contre les cyberattaques</li>
                    <li>Sécurisation des données et des accès</li>
                    <li>Haute disponibilité garantie</li>
                    <li>Support technique 24/7</li>
                </ul>
                <p class="service-tech">Solutions éprouvées auprès des grands comptes</p>
            </div>
        `
    },
    'integrated': {
        title: 'Solutions Intégrées',
        content: `
            <div class="service-details">
                <h4>L'alliance de la visibilité et de la sécurité</h4>
                <ul>
                    <li>Architecture web-infrastructure optimisée</li>
                    <li>Cloud sécurisé et évolutif</li>
                    <li>Continuité d'activité garantie</li>
                    <li>Performance et sécurité de bout en bout</li>
                    <li>Accompagnement stratégique</li>
                </ul>
                <p class="service-tech">Une approche unique basée sur 20 ans d'expertise</p>
            </div>
        `
    }
}
};

// Classes principales
class App {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
    }

    initializeComponents() {
        this.animation = new AnimationManager();
        this.modal = new ModalManager();
        this.particles = new ParticleSystem();
        this.form = new FormManager();
        this.navigation = new NavigationManager();
    }

    setupEventListeners() {
        document.addEventListener('scroll', () => {
            this.animation.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        // Gestion du responsive
    }
}

class AnimationManager {
    constructor() {
        this.initGSAP();
        this.setupScrollAnimations();
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Animation du titre principal
        gsap.from('.hero h1', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        // Animation du sous-titre
        gsap.from('.hero__subtitle', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });

        // Animation de la description
        gsap.from('.hero__description', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });
    }

    setupScrollAnimations() {
        // Animation des services
        const services = document.querySelectorAll('.service');
        services.forEach((service, index) => {
            gsap.from(service, {
                scrollTrigger: {
                    trigger: service,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });

        // Animation de la timeline
        this.setupTimelineAnimation();
    }

    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%'
                },
                duration: 0.8,
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'particles';
        document.querySelector('.hero').appendChild(this.container);
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < CONFIG.animation.particles.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Position et style aléatoires
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            // Couleur aléatoire
            const color = CONFIG.animation.particles.colors[
                Math.floor(Math.random() * CONFIG.animation.particles.colors.length)
            ];
            particle.style.backgroundColor = color;
            
            this.container.appendChild(particle);
        }
    }
}

class ModalManager {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Boutons service
        document.querySelectorAll('[data-service]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceId = button.dataset.service;
                this.openModal(serviceId);
            });
        });

        // Fermeture modal
        this.modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Fermeture sur click externe
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Fermeture sur Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    openModal(serviceId) {
        const service = CONFIG.services[serviceId];
        if (!service) return;

        this.modal.querySelector('.modal-title').textContent = service.title;
        this.modal.querySelector('.modal-body').innerHTML = service.content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

class FormManager {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) this.setupFormHandling();
    }

    setupFormHandling() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            try {
                await this.handleSubmit(submitBtn);
                this.showSuccess(submitBtn, originalText);
            } catch (error) {
                this.showError(submitBtn, originalText);
            }
        });
    }

    async handleSubmit(button) {
        button.disabled = true;
        button.textContent = 'Envoi en cours...';

        // Simulation d'envoi (à remplacer par l'appel API réel)
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    showSuccess(button, originalText) {
        button.textContent = 'Message envoyé !';
        this.form.reset();
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
        }, 2000);
    }

    showError(button, originalText) {
        button.textContent = 'Erreur lors de l\'envoi';
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
        }, 2000);
    }
}

class NavigationManager {
    constructor() {
        this.setupSmoothScroll();
        this.setupMobileMenu();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.nav__toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new App();
});