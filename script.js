/* =====================
   DOM ELEMENTS
   ===================== */

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollToTop = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const bookingForm = document.getElementById('bookingForm');
const newsletterForm = document.getElementById('newsletterForm');
const bookingModal = document.getElementById('bookingModal');

/* =====================
   MOBILE MENU FUNCTIONALITY
   ===================== */

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

/* =====================
   SCROLL TO TOP FUNCTIONALITY
   ===================== */

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =====================
   SMOOTH SCROLL FUNCTION
   ===================== */

function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
    }
}

/* =====================
   CONTACT FORM VALIDATION & SUBMISSION
   ===================== */

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !phone || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (in real scenario, send to server)
        console.log({
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        });
    });
}

/* =====================
   BOOKING MODAL FUNCTIONALITY
   ===================== */

function handleBooking(route) {
    const routeDisplay = document.getElementById('routeDisplay');
    const tripDestination = document.getElementById('tripDestination');
    
    routeDisplay.value = route;
    tripDestination.value = route;
    bookingModal.style.display = 'block';
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bDate').min = today;
}

function closeModal() {
    bookingModal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === bookingModal) {
        closeModal();
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const route = document.getElementById('tripDestination').value;
        const passengers = document.getElementById('bPassengers').value;
        const date = document.getElementById('bDate').value;
        const name = document.getElementById('bName').value.trim();
        const phone = document.getElementById('bPhone').value.trim();
        
        // Validation
        if (!passengers || !date || !name || !phone) {
            showNotification('Please fill in all booking details', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show success message
        showNotification('Booking confirmed! Check your email for payment details. Reference: BK' + Date.now(), 'success');
        
        // Log booking data
        console.log({
            route,
            passengers,
            date,
            name,
            phone,
            timestamp: new Date().toISOString()
        });
        
        // Reset form and close modal
        bookingForm.reset();
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
}

/* =====================
   NEWSLETTER FORM
   ===================== */

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value.trim();
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('Successfully subscribed to our newsletter!', 'success');
        newsletterForm.reset();
        
        console.log({
            newsletter_subscription: email,
            timestamp: new Date().toISOString()
        });
    });
}

/* =====================
   VALIDATION FUNCTIONS
   ===================== */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove spaces and special characters
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/* =====================
   NOTIFICATION SYSTEM
   ===================== */

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInDown 0.3s ease;
        font-weight: 500;
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* =====================
   ANIMATION UTILITIES
   ===================== */

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* =====================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ===================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.service-card, .trip-card, .testimonial-card, .feature-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

/* =====================
   ANALYTICS & TRACKING
   ===================== */

// Track page views
window.addEventListener('load', () => {
    console.log('Page loaded:', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
});

// Track link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href && !this.href.includes('javascript:')) {
            console.log('Link clicked:', {
                href: this.href,
                text: this.textContent,
                timestamp: new Date().toISOString()
            });
        }
    });
});

/* =====================
   PERFORMANCE OPTIMIZATION
   ===================== */

// Lazy load images (when images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* =====================
   KEYBOARD NAVIGATION
   ===================== */

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.style.display === 'block') {
        closeModal();
    }
});

// Skip to main content with keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    }
});

/* =====================
   RESPONSIVE MENU FIXES
   ===================== */

// Update nav on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

/* =====================
   SERVICE WORKER FOR PWA (Optional)
   ===================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Service Worker registration available');
        // Uncomment below to register service worker when created
        // navigator.serviceWorker.register('/sw.js');
    });
}

/* =====================
   DARK MODE TOGGLE (Optional Feature)
   ===================== */

function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const newDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newDarkMode);
        darkModeToggle.textContent = newDarkMode ? '☀️' : '🌙';
    });
}

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', initDarkMode);

/* =====================
   INITIALIZATION
   ===================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat h4');
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach((stat, index) => {
                        const finalNumber = parseInt(stat.textContent);
                        let currentNumber = 0;
                        const increment = finalNumber / 50;
                        
                        const counter = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                stat.textContent = stat.textContent; // Keep original text
                                clearInterval(counter);
                            } else {
                                stat.textContent = Math.floor(currentNumber) + (stat.textContent.includes('+') ? '+' : '');
                            }
                        }, 30);
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

/* =====================
   ERROR HANDLING
   ===================== */

window.addEventListener('error', (e) => {
    console.error('Error occurred:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        timestamp: new Date().toISOString()
    });
});

/* =====================
   UTILITY FUNCTIONS
   ===================== */

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 480) return 'mobile';
    if (width < 768) return 'tablet';
    return 'desktop';
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

console.log('JavaScript loaded - Ready for interactions');
