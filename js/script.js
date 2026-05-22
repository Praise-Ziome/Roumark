/**
 * Zego Website Core Interactions
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Prevent Browser Scroll-on-Refresh Behavior
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    // Force windows to mount cleanly from the top coordinate layout on execution
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Smooth Scrolling for Navigation Links
    const navigationLinks = document.querySelectorAll('a[href^="#"]');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Dynamic Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + document.querySelector('.navbar').offsetHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Add this section inside your document.addEventListener('DOMContentLoaded', () => { ... }) block

const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const individualLinks = document.querySelectorAll('.nav-links a');

// Function container to drop state hooks cleanly
const toggleMenu = () => {
    const isActive = menuToggle.classList.toggle('is-active');
    navLinksContainer.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isActive);
};

// Open/Close menu interaction toggle anchor
menuToggle.addEventListener('click', toggleMenu);

// Close navigation slide out instantly whenever any explicit internal page target line link item is clicked
individualLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('is-active')) {
            toggleMenu();
        }
    });
});
    
    // 4. Contact Form Client-Side Validation and Simulation
    const contactForm = document.getElementById('mainContactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const termsCheckbox = document.getElementById('terms');
            
            // Simple validation assertion checks
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill out all required fields before submitting.');
                return;
            }

            if (!termsCheckbox.checked) {
                alert('You must agree to the privacy guidelines to proceed.');
                return;
            }

            // Simulated Successful Submission Lifecycle
            const submitButton = this.querySelector('.btn-submit');
            const originalButtonText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending Message...';

            setTimeout(() => {
                alert(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`);
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 1200);
        });
    }
});
