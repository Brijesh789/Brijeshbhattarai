// ===========================================
// FINANCE CONSULTANT NEPAL - JAVASCRIPT
// Author: Brijesh Bhattarai
// Version: 1.0
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Finance Consultant Nepal website loaded');
    
    // Initialize all functions
    initMobileMenu();
    initFormSubmission();
    initScrollEffects();
    initAnimations();
    initServiceCards();
    initContactFormValidation();
    initCurrentYear();
    initTestimonials(); // If you add testimonials later
});

// ===========================================
// 1. MOBILE MENU FUNCTIONALITY
// ===========================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav a');
    
    if (!mobileMenuBtn) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Reset icon
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Reset icon
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ===========================================
// 2. FORM SUBMISSION AND VALIDATION
// ===========================================

function initFormSubmission() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        if (btnText && loadingSpinner && submitBtn) {
            btnText.textContent = 'Sending...';
            loadingSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString(),
            source: 'Finance Consultant Website'
        };
        
        try {
            // In a real application, you would send this data to a server
            // For now, we'll simulate an API call
            await simulateFormSubmission(formData);
            
            // Show success message
            showNotification('success', `Thank you ${formData.name}! Your consultation request has been received. I will contact you at ${formData.email} within 24 hours.`);
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Show error message
            showNotification('error', 'Sorry, there was an error submitting your form. Please try again or contact me directly at consult@financenepal.com');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            if (btnText && loadingSpinner && submitBtn) {
                btnText.textContent = 'Send Message';
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
            }
        }
    });
}

function initContactFormValidation() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error on focus
        input.addEventListener('focus', function() {
            clearError(this);
        });
        
        // Live validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                if (this.value) {
                    validateEmail(this);
                }
            });
        }
    });
}

function validateForm() {
    const form = document.getElementById('consultationForm');
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate email if present
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        if (!validateEmail(emailField)) {
            isValid = false;
        }
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.previousElementSibling?.textContent || 'This field';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${fieldName} is required`);
        return false;
    }
    
    // Special validation for email
    if (field.type === 'email' && value) {
        return validateEmail(field);
    }
    
    // Clear any existing error
    clearError(field);
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showFieldError(emailField, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailField);
    return true;
}

function showFieldError(field, message) {
    // Remove any existing error
    clearError(field);
    
    // Add error class to field
    field.classList.add('error');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.3rem';
    
    // Insert after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearError(field) {
    field.classList.remove('error');
    
    // Remove error message if exists
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Simulate form submission (replace with real API call)
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log('Form data submitted:', formData);
                
                // In a real app, you would send to your backend:
                // fetch('https://your-api-endpoint.com/submit', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // })
                
                resolve({ success: true, message: 'Form submitted successfully' });
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 1500);
    });
}

// ===========================================
// 3. SCROLL EFFECTS AND NAVIGATION
// ===========================================

function initScrollEffects() {
    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        // Trigger animations on scroll
        checkScrollAnimations();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150;
    
    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// ===========================================
// 4. ANIMATIONS AND INTERACTIONS
// ===========================================

function initAnimations() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add delay-based animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-up, .service-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects to service cards
    initServiceCards();
}

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

function checkScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up:not(.animated)');
    const windowHeight = window.innerHeight;
    
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        
        if (position < windowHeight - 100) {
            el.classList.add('animated');
        }
    });
}

// ===========================================
// 5. NOTIFICATION SYSTEM
// ===========================================

function showNotification(type, message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.maxWidth = '400px';
    notification.style.animation = 'slideInRight 0.3s ease';
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#d4edda';
        notification.style.color = '#155724';
        notification.style.borderLeft = '4px solid #28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f8d7da';
        notification.style.color = '#721c24';
        notification.style.borderLeft = '4px solid #dc3545';
    } else {
        notification.style.backgroundColor = '#fff3cd';
        notification.style.color = '#856404';
        notification.style.borderLeft = '4px solid #ffc107';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Add keyframes for animation
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ===========================================
// 6. UTILITY FUNCTIONS
// ===========================================

function initCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Also update copyright if needed
    const copyright = document.querySelector('.copyright p');
    if (copyright && copyright.textContent.includes('2023')) {
        copyright.textContent = copyright.textContent.replace('2023', currentYear);
    }
}

// ===========================================
// 7. FINANCE CALCULATOR (BONUS FEATURE)
// ===========================================

function initFinanceCalculator() {
    // This is a bonus feature you can add later
    console.log('Finance calculator initialized (placeholder)');
    
    // Example: Simple compound interest calculator
    // You can expand this based on your needs
}

// ===========================================
// 8. TESTIMONIALS SLIDER (BONUS FEATURE)
// ===========================================

function initTestimonials() {
    // This is a bonus feature you can add later
    console.log('Testimonials slider initialized (placeholder)');
    
    // You can add a testimonials section with a slider
    // Example structure:
    /*
    <section class="testimonials">
        <div class="container">
            <div class="section-title">
                <h2>Client Testimonials</h2>
            </div>
            <div class="testimonial-slider">
                <div class="testimonial-slide">Testimonial 1</div>
                <div class="testimonial-slide">Testimonial 2</div>
                <div class="testimonial-slide">Testimonial 3</div>
            </div>
        </div>
    </section>
    */
}

// ===========================================
// 9. PAGE LOADING OPTIMIZATION
// ===========================================

// Add loading state for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute for native lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            // You could set a placeholder image here
            // this.src = 'path/to/placeholder.jpg';
        });
    });
}

// Initialize when window loads
window.addEventListener('load', function() {
    // Remove preloader if you have one
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Initialize image loading
    initImageLoading();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    console.log('Page fully loaded');
});

// ===========================================
// 10. ACCESSIBILITY IMPROVEMENTS
// ===========================================

function initAccessibility() {
    // Add keyboard navigation for all interactive elements
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in a form
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Close mobile menu on Escape key
        if (e.key === 'Escape') {
            const nav = document.querySelector('nav ul');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.mobile-menu-btn').classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Reset icon
                const icon = document.querySelector('.mobile-menu-btn i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    // Add focus styles for keyboard navigation
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('a, button, input, textarea, [tabindex]')) {
            e.target.classList.add('keyboard-focus');
        }
    });
    
    document.addEventListener('focusout', function(e) {
        e.target.classList.remove('keyboard-focus');
    });
}

// Initialize accessibility features
initAccessibility();

// ===========================================
// 11. ANALYTICS AND TRACKING (OPTIONAL)
// ===========================================

function initAnalytics() {
    // This is where you would add Google Analytics or other tracking
    // Example (replace with your own tracking ID):
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_TRACKING_ID');
    */
    
    // Track form submissions
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function() {
            // Track form submission event
            console.log('Form submission tracked');
            // In real implementation: gtag('event', 'form_submission', {...});
        });
    }
    
    // Track outbound link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            console.log('Outbound link clicked:', url);
            // In real implementation: gtag('event', 'outbound_click', {...});
        });
    });
}

// Uncomment to enable analytics
// initAnalytics();

// Export functions if using modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initFormSubmission,
        validateForm,
        showNotification
    };
}
