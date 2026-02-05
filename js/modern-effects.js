// Modern Interactive Effects and Animations

class ModernEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingEffect();
        this.setupParallaxEffect();
        this.setupMagneticButtons();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupCursorEffects();
        this.setupRippleEffect();
        this.setupCounterAnimation();
    }

    // Typing Effect for Hero Text
    setupTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const texts = [
            'AI Solutions',
            'Digital Innovation',
            'Smart Automation',
            'Future Technology'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    // Parallax Scrolling Effect
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Magnetic Button Effect
    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for child elements
                    const staggerItems = entry.target.querySelectorAll('.stagger-item');
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.animate-slide-up, .animate-slide-left, .animate-fade-in, .card-elevated'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Smooth Scrolling for Navigation
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Custom Cursor Effects
    setupCursorEffects() {
        // Cursor effects disabled
    }

    // Ripple Effect for Buttons
    setupRippleEffect() {
        const rippleButtons = document.querySelectorAll('.ripple');
        
        rippleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Counter Animation
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }
}

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = {
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            };
            
            this.particles.push(particle);
            this.createParticleElement(particle);
        }
    }

    createParticleElement(particle) {
        const element = document.createElement('div');
        element.className = 'particle-dot';
        element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: rgba(255, 255, 255, ${particle.opacity});
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particle.element = element;
        this.container.appendChild(element);
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.container.offsetWidth) {
                particle.vx *= -1;
            }
            
            if (particle.y < 0 || particle.y > this.container.offsetHeight) {
                particle.vy *= -1;
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggleButton();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all';
        button.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
        
        button.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.body.appendChild(button);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
        
        const button = document.querySelector('.theme-toggle');
        button.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernEffects();
    
    // Initialize particle system for hero section
    const heroSection = document.querySelector('section');
    if (heroSection) {
        new ParticleSystem(heroSection);
    }
    
    // Initialize theme switcher
    new ThemeSwitcher();
});

// Add CSS for custom cursor and animations
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
    }

    .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background: #06b6d4;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    }

    .cursor-outline {
        position: fixed;
        width: 32px;
        height: 32px;
        border: 2px solid rgba(6, 182, 212, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    }

    .cursor-hover .cursor-dot {
        transform: translate(-50%, -50%) scale(2);
        background: #3b82f6;
    }

    .cursor-hover .cursor-outline {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: rgba(59, 130, 246, 0.8);
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0) !important;
    }

    .particle-dot {
        animation: particle-float 8s ease-in-out infinite;
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;

document.head.appendChild(style);