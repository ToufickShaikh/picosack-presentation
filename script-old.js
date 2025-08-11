document.addEventListener('DOMContentLoaded', function() {
    // === INTERSECTION OBSERVER FOR ANIMATIONS ===
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Trigger specific animations for charts and diagrams
                if (entry.target.closest('#performance')) {
                    setTimeout(() => animatePerformanceCharts(), 300);
                }
                if (entry.target.closest('#funding')) {
                    setTimeout(() => animateFundingChart(), 300);
                }
                if (entry.target.closest('#tech')) {
                    setTimeout(() => animateTechDiagram(), 300);
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate').forEach(el => {
        animationObserver.observe(el);
    });

    // === NAVIGATION DOTS LOGIC ===
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.slide');

    if (dots.length > 0 && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    dots.forEach(dot => {
                        dot.classList.toggle('active', dot.getAttribute('data-target') === targetId);
                    });
                }
            });
        }, {
            threshold: 0.5
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // === ENHANCED CHART ANIMATIONS ===
    function animatePerformanceCharts() {
        const progressCircle = document.querySelector('.progress-circle');
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (progressCircle) {
            // Calculate 57% of the circle circumference (502 = 2 * π * 80)
            const circumference = 502;
            const offset = circumference - (circumference * 0.57);
            progressCircle.style.strokeDashoffset = offset + 'px';
        }
        
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(1)';
                bar.style.transformOrigin = 'bottom';
            }, index * 300);
        });
    }

    function animateFundingChart() {
        const pieSlices = document.querySelectorAll('.pie-slice');
        pieSlices.forEach((slice, index) => {
            setTimeout(() => {
                slice.style.opacity = '1';
                slice.style.transform = 'scale(1)';
            }, index * 200);
        });
    }

    function animateTechDiagram() {
        const componentGroups = document.querySelectorAll('.component-group');
        componentGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // === COMPONENT INTERACTIONS ===
    // Add hover effects for SVG components
    document.querySelectorAll('.component, .pie-slice').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            const title = this.querySelector('title');
            if (title) {
                showTooltip(this, title.textContent);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    // Simple tooltip system
    let tooltip = null;

    function showTooltip(element, text) {
        hideTooltip();
        tooltip = document.createElement('div');
        tooltip.className = 'svg-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: fixed;
            background: var(--dark);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1000;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 200px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(tooltip);
        
        // Trigger opacity animation
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        element.addEventListener('mousemove', updateTooltipPosition);
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.remove();
                }
                tooltip = null;
            }, 300);
        }
    }

    function updateTooltipPosition(e) {
        if (tooltip) {
            const x = e.clientX + 10;
            const y = e.clientY - 30;
            
            // Keep tooltip within viewport
            const rect = tooltip.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width - 10;
            const maxY = window.innerHeight - rect.height - 10;
            
            tooltip.style.left = Math.min(x, maxX) + 'px';
            tooltip.style.top = Math.max(y, 10) + 'px';
        }
    }

    // === RESPONSIVE CHART HANDLING ===
    function handleResize() {
        // Reset any fixed dimensions that might cause overflow
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
            svg.style.width = '100%';
            svg.style.height = 'auto';
        });
        
        // Recalculate chart animations if they're visible
        const performanceSection = document.querySelector('#performance');
        if (performanceSection && isElementInViewport(performanceSection)) {
            animatePerformanceCharts();
        }
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Initial resize handling
    handleResize();

    // === LAZY LOAD ANIMATIONS ===
    const lazyAnimations = document.querySelectorAll('[data-lazy-animate]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.lazyAnimate;
                entry.target.style.animation = animation;
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    lazyAnimations.forEach(el => {
        lazyObserver.observe(el);
    });

    // === ACCESSIBILITY IMPROVEMENTS ===
    // Add keyboard navigation for navigation dots
    dots.forEach((dot, index) => {
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
});
