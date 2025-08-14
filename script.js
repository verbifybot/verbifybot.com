// VerbifyBot Landing Page JavaScript

// Language switching functionality
let currentLanguage = 'en';

// Detect browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Check if we support this language
    if (translations && translations[langCode]) {
        return langCode;
    }
    
    return 'en'; // Default to English
}

// Update page content with translations
function updateContent(lang) {
    if (!translations || !translations[lang]) {
        console.warn('Translation not found for language:', lang);
        return;
    }
    
    const t = translations[lang];
    
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(t, key);
        
        if (translation) {
            // Handle special cases for elements with HTML content
            if (key === 'hero.title') {
                const instantlySpan = element.querySelector('.highlight');
                if (instantlySpan) {
                    element.innerHTML = translation + ' <span class="highlight" data-i18n="hero.instantly">' + t.hero.instantly + '</span>';
                } else {
                    element.textContent = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update current language display
    const currentLangElement = document.querySelector('.current-lang');
    if (currentLangElement && languageCodes[lang]) {
        currentLangElement.textContent = languageCodes[lang];
    }
    
    // Update active language option
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update page title and meta description
    updateMetaTags(lang);
    
    currentLanguage = lang;
    
    // Store language preference
    localStorage.setItem('verbifybot-language', lang);
}

// Get nested translation value
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => o && o[k], obj);
}

// Update meta tags for SEO
function updateMetaTags(lang) {
    if (!translations || !translations[lang]) return;
    
    const t = translations[lang];
    
    // Update title
    document.title = `VerbifyBot - ${t.hero.slogan}`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `VerbifyBot - ${t.hero.slogan}! ${t.hero.description}`;
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = `VerbifyBot - ${t.hero.slogan}`;
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = `${t.hero.slogan}! ${t.hero.description}`;
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.content = `VerbifyBot - ${t.hero.slogan}`;
    }
    
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) {
        twitterDesc.content = `${t.hero.slogan}! ${t.hero.description}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    const savedLanguage = localStorage.getItem('verbifybot-language');
    const initialLanguage = savedLanguage || detectLanguage();
    updateContent(initialLanguage);
    
    // Language switcher functionality
    const languageToggle = document.querySelector('.language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageToggle.classList.toggle('active');
            languageDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageToggle.classList.remove('active');
            languageDropdown.classList.remove('active');
        });
        
        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                updateContent(selectedLang);
                languageToggle.classList.remove('active');
                languageDropdown.classList.remove('active');
                
                // Close mobile menu if open
                if (navLinks && mobileMenuToggle) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinksElements = document.querySelectorAll('a[href^="#"]');
    navLinksElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Greeting text rotation (enhanced)
    const greetingTexts = document.querySelectorAll('.greeting-text');
    let currentGreeting = 0;
    
    function rotateGreeting() {
        // Hide all greetings
        greetingTexts.forEach(text => {
            text.style.opacity = '0';
            text.style.transform = 'translateY(-20px)';
        });
        
        // Show current greeting
        setTimeout(() => {
            if (greetingTexts[currentGreeting]) {
                greetingTexts[currentGreeting].style.opacity = '1';
                greetingTexts[currentGreeting].style.transform = 'translateY(0)';
            }
            
            currentGreeting = (currentGreeting + 1) % greetingTexts.length;
        }, 200);
    }

    // Start greeting rotation
    if (greetingTexts.length > 0) {
        rotateGreeting();
        setInterval(rotateGreeting, 2000);
    }

    // Button hover effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Translation demo animation
    const demoMessages = document.querySelectorAll('.demo-message');
    const demoArrow = document.querySelector('.demo-arrow');
    
    function animateTranslationDemo() {
        if (demoMessages.length >= 2 && demoArrow) {
            // Reset animation
            demoMessages.forEach(msg => {
                msg.style.transform = 'scale(1)';
                msg.style.opacity = '1';
            });
            
            // Animate input message
            setTimeout(() => {
                demoMessages[0].style.transform = 'scale(1.05)';
                demoMessages[0].style.boxShadow = '0 8px 25px rgba(228, 87, 27, 0.3)';
            }, 500);
            
            // Animate arrow
            setTimeout(() => {
                demoArrow.style.transform = 'scale(1.2)';
                demoArrow.style.color = '#FFD700';
            }, 1000);
            
            // Animate output message
            setTimeout(() => {
                demoMessages[1].style.transform = 'scale(1.05)';
                demoMessages[1].style.boxShadow = '0 8px 25px rgba(27, 113, 228, 0.3)';
                demoArrow.style.transform = 'scale(1)';
                demoArrow.style.color = '';
            }, 1500);
            
            // Reset
            setTimeout(() => {
                demoMessages.forEach(msg => {
                    msg.style.transform = 'scale(1)';
                    msg.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                });
            }, 2500);
        }
    }

    // Start translation demo animation
    setTimeout(animateTranslationDemo, 2000);
    setInterval(animateTranslationDemo, 8000);

    // Parallax effect for hero section - REMOVED to prevent overlay issues
    // const hero = document.querySelector('.hero');
    // if (hero) {
    //     window.addEventListener('scroll', function() {
    //         const scrolled = window.pageYOffset;
    //         const parallax = scrolled * 0.5;
    //         hero.style.transform = `translateY(${parallax}px)`;
    //     });
    // }

    // Click tracking for analytics (placeholder)
    const trackableElements = document.querySelectorAll('[href*="t.me/verbifybot"]');
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            // Placeholder for analytics tracking
            console.log('VerbifyBot link clicked:', this.href);
            
            // You can add Google Analytics, Facebook Pixel, or other tracking here
            // Example: gtag('event', 'click', { event_category: 'CTA', event_label: 'Add to Telegram' });
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Performance optimization: Lazy load images (exclude logos)
    const images = document.querySelectorAll('img[src]:not(.logo):not(.footer-logo)');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
    
    // Ensure logos are always visible
    const logos = document.querySelectorAll('.logo, .footer-logo');
    logos.forEach(logo => {
        logo.style.opacity = '1';
        logo.style.transition = 'none';
    });

    // Add loading states for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = originalText.replace(/Add|Start/, 'Opening...');
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #E4571B';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply ripple effect to CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Console welcome message
    console.log(`
    🤖 VerbifyBot Landing Page
    ========================
    
    Welcome to VerbifyBot! 
    Break language barriers instantly with our Telegram bot.
    
    Add @verbifybot to get started!
    
    Built with ❤️ for global communication
    `);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('VerbifyBot: Non-critical error occurred:', e.message);
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();