// Modern PicoSack Presentation JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
});

function initializePresentation() {
    // Initialize all components
    initProgressBar();
    initNavigation();
    initScrollAnimations();
    initInteractiveElements();
    initStatCounters();
    initMobileMenu();
    initSmoothScroll();
    
    console.log('🚀 PicoSack presentation initialized');
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    function updateProgressBar() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initial call
}

// Enhanced Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!header) return;
    
    // Header scroll effect
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    
    // Active navigation link tracking
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Update toggle icon
        const icon = mobileToggle.querySelector('i') || mobileToggle;
        if (navLinks.classList.contains('active')) {
            icon.textContent = '✕';
        } else {
            icon.textContent = '☰';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').textContent = '☰';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').textContent = '☰';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
        
        if (el.classList.contains('fade-in-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('fade-in-left')) {
            el.style.transform = 'translateX(-30px)';
        } else if (el.classList.contains('fade-in-right')) {
            el.style.transform = 'translateX(30px)';
        }
        
        observer.observe(el);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Card hover effects
    initCardHoverEffects();
    
    // Button interactions
    initButtonEffects();
    
    // Demo interface interactions
    initDemoInterface();
    
    // Stat circle animations
    initStatCircles();
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.problem-card, .feature-card, .product-card, .competitor-card, .phase-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initDemoInterface() {
    const menuCategories = document.querySelectorAll('.menu-category');
    const addButtons = document.querySelectorAll('.add-btn');
    const cartElement = document.querySelector('.demo-cart');
    
    let cartItems = 2;
    let cartTotal = 270;
    
    // Menu category switching
    menuCategories.forEach(category => {
        category.addEventListener('click', function() {
            menuCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add to cart functionality
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartTotal += 120; // Assuming average item price
            
            if (cartElement) {
                cartElement.innerHTML = `
                    <span>🛒 Cart (${cartItems} items)</span>
                    <span>₹${cartTotal}</span>
                `;
            }
            
            // Button animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function initStatCircles() {
    const statCircles = document.querySelectorAll('.stat-circle');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = circle.getAttribute('data-percent') || 50;
                const circumference = 2 * Math.PI * 60; // radius of 60
                const offset = circumference - (percent / 100) * circumference;
                
                // Animate the circle
                circle.style.background = `conic-gradient(
                    var(--primary) ${percent * 3.6}deg,
                    var(--light) ${percent * 3.6}deg
                )`;
                
                observer.unobserve(circle);
            }
        });
    });
    
    statCircles.forEach(circle => observer.observe(circle));
}

// Stat Counter Animation
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number, .projection-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.,]/g, '');
    const prefix = text.match(/^[^\d]*/)[0];
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue;
        if (number >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            displayValue = (current / 1000).toFixed(0) + 'K';
        } else {
            displayValue = Math.floor(current).toString();
        }
        
        element.textContent = prefix + displayValue + suffix.replace(/[KM]/, '');
    }, duration / steps);
}

// Performance Optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply performance optimizations
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions are already optimized
}, 16)); // ~60fps

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Recalculate any position-dependent elements
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Trigger any resize-dependent calculations
    });
}, 250));

// Error handling
window.addEventListener('error', function(e) {
    console.error('Presentation error:', e.error);
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileToggle = document.querySelector('.mobile-toggle');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').textContent = '☰';
                }
            }
        }
    });
}

// Initialize accessibility features
enhanceAccessibility();

// Export functions for potential external use
window.PicoSackPresentation = {
    init: initializePresentation,
    updateProgress: function() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    }
};
