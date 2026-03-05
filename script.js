// script.js - Main JavaScript for Accounting Advisor & Business Solutions

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow on scroll down
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // 3. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the submit button to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const width = submitBtn.offsetWidth;
            
            // Set loading state
            submitBtn.style.width = width + 'px';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request delay (1.5 seconds)
            setTimeout(() => {
                // Show success notification
                showNotification('Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.style.width = '';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only scroll if it's not a generic "#" link
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 5. Add animation on scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Unobserve after animation is done so it doesn't repeat
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply initial invisible state and observe cards for animation
    const animatedElements = document.querySelectorAll('.expertise-card, .service-card, .stat-card, .info-item, .mv-card');
    animatedElements.forEach((el, index) => {
        // Calculate a slight delay based on the element's index for a staggered effect
        const delay = (index % 4) * 0.1; 
        
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        
        observer.observe(el);
    });

    // 6. Add loading state to generic buttons (like "Book Now" links with href="#")
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip actual navigation links and form submit buttons (handled separately)
            if (this.type === 'submit' || (this.tagName === 'A' && this.getAttribute('href') && this.getAttribute('href') !== '#')) {
                return;
            }
            
            e.preventDefault();
            const originalText = this.innerHTML;
            const width = this.offsetWidth;
            
            this.style.width = width + 'px';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.width = '';
            }, 1000);
        });
    });
});

// 7. Notification function (global scope for inline onclick handlers)
function showNotification(message) {
    let notification = document.getElementById('notification');
    
    // Fallback: Create the notification element dynamically if it's missing from the HTML page
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

