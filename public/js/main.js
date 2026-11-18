// ============================================
// GLOBAL FUNCTIONS & UTILITIES
// ============================================

// helper that runs a function when the document is ready (handles cases where the script
// is loaded before or after DOMContentLoaded).
function onReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

onReady(function() {
    initializeSmoothScroll();
    initializeMobileNav();
    initializeChatWidget(); // renamed to avoid collision with chatbot.js
});

// also in case someone loads this script after the event, make sure nav is still initialized
if (document.readyState !== 'loading') {
    initializeMobileNav();
}

// Smooth scrolling for internal anchors
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Mobile navigation toggle
function initializeMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    // toggle menu open/close
    navToggle.addEventListener('click', function (e) {
        // prevent the document listener from immediately closing it
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close nav when clicking outside (but ignore clicks on the toggle itself)
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Chatbot widget toggle functionality (name changed to prevent overwrite)
function initializeChatWidget() {
    // ensure we have a widget container even if none is written into the HTML
    if (!document.getElementById('chatbot-widget')) {
        // minimal markup so the floating button can open something
        const widget = document.createElement('div');
        widget.id = 'chatbot-widget';
        widget.style.display = 'none';
        widget.innerHTML = `
            <div class="chat-header">
                <span>Need Website Help?</span>
                <button id="close-chat">×</button>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="chat-input" placeholder="Ask anything...">
                <button id="send-chat">Send</button>
            </div>
        `;
        document.body.appendChild(widget);
    }

    // Create floating widget button now that we know widget exists
    createFloatingWidgetButton();

    const chatWidget = document.getElementById('chatbot-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', function() {
            chatWidget.style.display = chatWidget.style.display === 'none' ? 'flex' : 'none';
        });
    }

    if (closeChat && chatWidget) {
        closeChat.addEventListener('click', function() {
            chatWidget.style.display = 'none';
        });
    }
}

// Create floating chatbot button in bottom-right corner
function createFloatingWidgetButton() {
    // Don't create if already exists
    if (document.getElementById('floating-chat-button')) return;

    console.log('🔘 creating floating chat button');
    const button = document.createElement('button');
    button.id = 'floating-chat-button';
    button.innerHTML = '💬 Chat';
    button.setAttribute('aria-label', 'Open chat with us');
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #06b6d4, #22d3ee);
        color: white;
        border: none;
        padding: 14px 18px;
        border-radius: 50px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
        z-index: 9998;
        font-size: 1rem;
        transition: all 0.3s ease;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    `;

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 12px 35px rgba(6, 182, 212, 0.5)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.4)';
    });

    button.addEventListener('click', function() {
        const widget = document.getElementById('chatbot-widget');
        if (widget) {
            const isVisible = widget.style.display !== 'none';
            widget.style.display = isVisible ? 'none' : 'flex';
            button.innerHTML = isVisible ? '💬 Chat' : '× Close';
        }
    });

    document.body.appendChild(button);
}

// Utility: Track clicks for analytics
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Utility: Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Utility: Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Utility: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

// Performance: Monitor Core Web Vitals
window.addEventListener('load', function() {
    // Measure Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch(e) {
            console.log('LCP observer not supported');
        }
    }
});

// Initialize charts or data visualizations (if needed)
function initializeDataVisualizations() {
    // Placeholder for future data visualization initialization
}

console.log('Recursive Tech Solution - Premium AI Platform Loaded');
