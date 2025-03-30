// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission handling
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
                
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                }
            });

            if (isValid) {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.role = 'alert';
                alertDiv.textContent = successMessage;
                
                form.appendChild(alertDiv);
                
                // Reset form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 3000);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.classList.remove('is-invalid');
                    }
                }
            });
        });
    }
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission('newsletterForm', 'Thank you for subscribing! We will notify you when PharmaSuite becomes available.');
    handleFormSubmission('contactForm', 'Thank you for your message! We will get back to you soon.');
});

// Feature animations
function animateFeatures() {
    const features = document.querySelectorAll('.feature-item');
    features.forEach(feature => {
        if (isElementInViewport(feature) && !feature.classList.contains('animated')) {
            feature.classList.add('animated');
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }
    });
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

// Initialize feature animations
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature-item');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateFeatures();
    window.addEventListener('scroll', animateFeatures);
});

// Blog search functionality
function initializeBlogSearch() {
    const searchInput = document.querySelector('.sidebar .input-group input');
    const searchButton = document.querySelector('.sidebar .input-group button');
    const blogPosts = document.querySelectorAll('.blog-post');

    if (searchInput && searchButton) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            blogPosts.forEach(post => {
                const title = post.querySelector('.card-title').textContent.toLowerCase();
                const content = post.querySelector('.card-text').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm) || content.includes(searchTerm);
                post.style.display = isVisible ? 'block' : 'none';
            });
        };

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Blog category filtering
function initializeBlogCategories() {
    const categoryLinks = document.querySelectorAll('.sidebar .card:nth-child(2) a');
    const blogPosts = document.querySelectorAll('.blog-post');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.textContent.toLowerCase();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');

            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.blog-meta .fa-folder')
                    .parentElement.textContent.toLowerCase();
                post.style.display = category === 'all' || postCategory.includes(category) ? 'block' : 'none';
            });
        });
    });
}

// Tag filtering
function initializeBlogTags() {
    const tagButtons = document.querySelectorAll('.sidebar .card:last-child .btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    tagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tag = e.target.textContent.toLowerCase();
            
            // Toggle active state
            button.classList.toggle('active');
            
            // Get all active tags
            const activeTags = Array.from(tagButtons)
                .filter(btn => btn.classList.contains('active'))
                .map(btn => btn.textContent.toLowerCase());

            // Show posts that match any active tag, or all posts if no tags are active
            blogPosts.forEach(post => {
                const postContent = post.textContent.toLowerCase();
                const isVisible = activeTags.length === 0 || 
                    activeTags.some(tag => postContent.includes(tag));
                post.style.display = isVisible ? 'block' : 'none';
            });
        });
    });
}

// Initialize blog functionality when on blog page
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission('newsletterForm', 'Thank you for subscribing! We will notify you when PharmaSuite becomes available.');
    handleFormSubmission('contactForm', 'Thank you for your message! We will get back to you soon.');
    
    // Initialize blog functionality if we're on the blog page
    if (window.location.pathname.includes('blog.html')) {
        initializeBlogSearch();
        initializeBlogCategories();
        initializeBlogTags();
    }
});

// Enhanced Contact Form Validation
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Input validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        subject: /^.{5,100}$/,
        message: /^[\s\S]{10,1000}$/
    };

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input, patterns);
        });

        input.addEventListener('blur', () => {
            validateInput(input, patterns);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!validateInput(input, patterns)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.role = 'alert';
            alertDiv.textContent = 'Thank you for your message! We will get back to you soon.';
            
            // Disable form
            form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
            
            form.appendChild(alertDiv);
            
            // Re-enable form after 3 seconds and reset
            setTimeout(() => {
                form.reset();
                form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = false);
                alertDiv.remove();
                
                // Reset any validation states
                form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
            }, 3000);
        }
    });
}

// Input validation helper
function validateInput(input, patterns) {
    if (!input.id || input.type === 'checkbox') return true;

    const pattern = patterns[input.id];
    const isValid = pattern ? pattern.test(input.value) : input.value.length > 0;

    input.classList.remove('is-valid', 'is-invalid');
    input.classList.add(isValid ? 'is-valid' : 'is-invalid');

    // Update any associated feedback elements
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.style.display = isValid ? 'none' : 'block';
    }

    return isValid;
}

// Documentation page functionality
function initializeDocumentation() {
    const searchInput = document.getElementById('docsSearch');
    const navLinks = document.querySelectorAll('#docsNav .nav-link');
    const sections = document.querySelectorAll('.docs-content section');
    const headings = document.querySelectorAll('.docs-content h1, .docs-content h2, .docs-content h3');

    if (!searchInput) return;

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search through all headings and sections
        headings.forEach(heading => {
            const section = heading.closest('section');
            const content = heading.textContent.toLowerCase();
            const sectionContent = section ? section.textContent.toLowerCase() : '';
            
            // Show/hide based on heading or section content
            const shouldShow = content.includes(searchTerm) || sectionContent.includes(searchTerm);
            if (section) {
                section.style.display = shouldShow ? 'block' : 'none';
            }
        });

        // Update navigation visibility based on search results
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                link.style.display = targetSection.style.display;
            }
        });
    });

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update URL hash without scrolling
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Highlight active section on scroll
    const highlightActiveSection = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 100; // Offset for fixed header

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            link.classList.toggle('active', targetId === currentSectionId);
        });
    };

    // Update active section on scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initialize active section on page load
    highlightActiveSection();

    // Handle initial hash in URL
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Add to DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission('newsletterForm', 'Thank you for subscribing! We will notify you when PharmaSuite becomes available.');
    handleFormSubmission('contactForm', 'Thank you for your message! We will get back to you soon.');
    
    // Initialize blog functionality if we're on the blog page
    if (window.location.pathname.includes('blog.html')) {
        initializeBlogSearch();
        initializeBlogCategories();
        initializeBlogTags();
    }

    // Initialize documentation functionality if we're on the docs page
    if (window.location.pathname.includes('documentation.html')) {
        initializeDocumentation();
    }
});