// ===========================
// Copier Sales Kamias - Professional JavaScript
// ===========================

(function() {
    'use strict';

    // ===========================
    // DOM Elements
    // ===========================
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const backToTopBtn = document.querySelector('.back-to-top');
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccess = document.getElementById('formSuccess');
    const phoneInput = document.getElementById('phone');

    // ===========================
    // Smooth Scrolling with Header Offset
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // ===========================
    // Header Scroll Effect
    // ===========================
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (currentScroll > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });

    // ===========================
    // Back to Top Button
    // ===========================
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // ===========================
    // Form Handling
    // ===========================
    // ===========================
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function () {
                const submitBtn = document.querySelector('.submit-btn');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');

                if (btnText && btnLoader) {
                    btnText.style.display = 'none';
                    btnLoader.style.display = 'flex';
                }

                submitBtn.disabled = true;
            });
        }


    // ===========================
    // Phone Number Formatting
    // ===========================
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 11 digits
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Format as: 0917-839-9948
            if (value.length > 0) {
                if (value.length <= 4) {
                    e.target.value = value;
                } else if (value.length <= 7) {
                    e.target.value = value.slice(0, 4) + '-' + value.slice(4);
                } else {
                    e.target.value = value.slice(0, 4) + '-' + value.slice(4, 7) + '-' + value.slice(7);
                }
            }
        });

        // Prevent non-numeric input
        phoneInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 46) {
                e.preventDefault();
            }
        });
    }

    // ===========================
    // Intersection Observer for Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll('.service-card, .brand-card, .contact-card');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = \s;
            animationObserver.observe(el);
        });
    });

    // ===========================
    // Click Tracking
    // ===========================
    
    // Phone calls
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            console.log('%cCall initiated:', 'color: #00d084;', phoneNumber);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'engagement',
                    'event_label': phoneNumber
                });
            }
        });
    });

    // Viber chats
    document.querySelectorAll('a[href^="viber:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('%cViber chat initiated', 'color: #7360f2;');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'viber_chat', {
                    'event_category': 'engagement',
                    'event_label': 'viber_button'
                });
            }
        });
    });

    // ===========================
    // Notification Helper
    // ===========================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = message;
        notification.style.cssText = 
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: \;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
            font-weight: 500;
        ;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Make showNotification available globally
    window.showNotification = showNotification;

    // ===========================
    // Load Previous Inquiries Info
    // ===========================
    window.addEventListener('load', function() {
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        
        if (inquiries.length > 0) {
            console.log('%c' + inquiries.length + ' previous inquiry/inquiries stored locally.', 'color: #888;');
        }
    });

    // ===========================
    // Console Welcome Message
    // ===========================
    console.log('%cCopier Sales Kamias', 'font-size: 24px; font-weight: bold; color: #ff6b6b;');
    console.log('%cYour trusted supplier for genuine & compatible parts', 'font-size: 14px; color: #666;');
    console.log('%c 0917-839-9948 |  165 Kamias Road, QC', 'font-size: 12px; color: #1a1a2e;');

})();

// ===========================
// Global Reset Form Function
// ===========================
function resetForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccess = document.getElementById('formSuccess');
    
    inquiryForm.style.display = 'block';
    formSuccess.style.display = 'none';
    inquiryForm.reset();
    
    // Scroll to form
    setTimeout(() => {
        document.getElementById('inquiry').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}
