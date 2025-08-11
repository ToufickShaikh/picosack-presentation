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
    const nav = document.querySelector('.modern-nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!nav) return;
    
    // Navigation scroll effect
    function updateNav() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'var(--shadow)';
        }
    }
    
    window.addEventListener('scroll', updateNav);
    
    // Navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const section = document.getElementById(target);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Active navigation tracking
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('.section, .hero');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-target') === id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    updateActiveNavItem(); // Initial call
}

// Mobile Menu
function initMobileMenu() {
    // For this simple navigation, mobile is handled via CSS
    // The nav-text is hidden on mobile, keeping only icons
    console.log('Mobile navigation ready');
}

// Smooth Scroll
function initSmoothScroll() {
    // Smooth scrolling is handled by the navigation function
    console.log('Smooth scroll ready');
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .card, .hero-text, .hero-visual');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        observer.observe(el);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Card hover effects
    initCardHoverEffects();
    
    // Button interactions
    initButtonEffects();
    
    console.log('Interactive elements ready');
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .problem-card, .feature-card');
    
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
    const buttons = document.querySelectorAll('.btn, .nav-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a simple click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Stat Counter Animation
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.problem-stat, .stat-number');
    
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
        
        if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (text.includes('M')) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (text.includes('K')) {
            element.textContent = Math.floor(current / 1000) + 'K';
        } else {
            element.textContent = Math.floor(current);
        }
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

// Apply performance optimizations
window.addEventListener('scroll', debounce(function() {
    // Already handled by individual functions
}, 16));

// Resize handler
window.addEventListener('resize', debounce(function() {
    console.log('Window resized');
}, 250));

// Error handling
window.addEventListener('error', function(e) {
    console.error('Presentation error:', e.error);
});

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

// Global function for button clicks
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update navigation active state
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === sectionId) {
                item.classList.add('active');
            }
        });
    }
}
