// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const interestHeaders = document.querySelectorAll('.interest-header');
const blogContainer = document.querySelector('.blog-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const backToTopBtn = document.getElementById('back-to-top');
const navLinksList = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('current-year');

// Blog data
const blogPosts = [
    {
        id: 1,
        title: "The Impact of Monetary Policy on Emerging Markets",
        excerpt: "An analysis of how central bank decisions in developed economies affect financial stability and growth prospects in emerging markets like Nepal and other South Asian countries.",
        date: "June 15, 2023",
        category: "Economic Policy",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 2,
        title: "Cognitive Biases in Investment Decisions",
        excerpt: "Exploring how psychological factors like overconfidence, herd mentality, and loss aversion influence investor behavior and market outcomes.",
        date: "May 28, 2023",
        category: "Behavioral Finance",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 3,
        title: "Sustainable Investing: Beyond the ESG Hype",
        excerpt: "A critical look at Environmental, Social, and Governance (ESG) investing, its measurement challenges, and how to identify genuinely sustainable investment opportunities.",
        date: "April 10, 2023",
        category: "Financial Markets",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 4,
        title: "Digital Currencies and the Future of Central Banking",
        excerpt: "Examining the rise of digital currencies and their potential impact on traditional monetary systems and financial stability.",
        date: "March 22, 2023",
        category: "Economic Policy",
        image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 5,
        title: "Inflation Dynamics in Post-Pandemic Economies",
        excerpt: "Analyzing the complex factors driving inflation in the aftermath of the COVID-19 pandemic and policy responses around the world.",
        date: "February 18, 2023",
        category: "Economic Policy",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 6,
        title: "The Psychology of Market Bubbles",
        excerpt: "Understanding the behavioral economics behind financial bubbles and what history teaches us about identifying and navigating them.",
        date: "January 5, 2023",
        category: "Behavioral Finance",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
];

let displayedPosts = 3;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize blog posts
    displayBlogPosts();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize interest section accordion
    initInterestAccordion();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize active nav link on scroll
    initActiveNavLink();
});

// Mobile Menu Toggle
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
}

// Interest Section Accordion
function initInterestAccordion() {
    interestHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Close other open sections
            document.querySelectorAll('.interest-content').forEach(item => {
                if (item !== content && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
                    item.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current section
            content.classList.toggle('active');
            
            // Toggle icon
            if (content.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

// Display Blog Posts
function displayBlogPosts() {
    // Clear existing posts
    blogContainer.innerHTML = '';
    
    // Display posts based on current count
    const postsToShow = blogPosts.slice(0, displayedPosts);
    
    postsToShow.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-img" style="background-image: url('${post.image}');"></div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-folder"></i> ${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more" data-id="${post.id}">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
    
    // Update load more button visibility
    if (displayedPosts >= blogPosts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
    
    // Add event listeners to read more buttons
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-id');
            showBlogPostModal(postId);
        });
    });
}

// Load More Blog Posts
loadMoreBtn.addEventListener('click', function() {
    displayedPosts += 3;
    displayBlogPosts();
});

// Blog Post Modal
function showBlogPostModal(postId) {
    const post = blogPosts.find(p => p.id == postId);
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="blog-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${post.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-folder"></i> ${post.category}</span>
                    </div>
                    <div class="modal-image" style="background-image: url('${post.image}');"></div>
                    <p>${post.excerpt}</p>
                    <p>This is a sample blog post. In a real implementation, this would contain the full article content. For demonstration purposes, we're showing the excerpt here. A complete blog system would have a backend to manage posts, categories, and comments.</p>
                    <p>Finance and economics are dynamic fields that require continuous learning and adaptation. As markets evolve and new economic theories emerge, staying informed is crucial for making sound financial decisions.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn close-modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners to close modal
    const modalOverlay = document.getElementById('blog-modal');
    const closeBtn = document.querySelector('.modal-close');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    function closeModal() {
        modalOverlay.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Add CSS for modal
    const modalCSS = `
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                padding: 20px;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 10px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                padding: 20px 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: var(--primary-color);
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--light-text);
                line-height: 1;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: var(--accent-color);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .modal-meta {
                display: flex;
                justify-content: space-between;
                color: var(--secondary-color);
                font-size: 0.9rem;
                margin-bottom: 20px;
            }
            
            .modal-image {
                height: 300px;
                background-size: cover;
                background-position: center;
                border-radius: 8px;
                margin-bottom: 25px;
            }
            
            .modal-body p {
                margin-bottom: 20px;
                color: var(--light-text);
            }
            
            .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #eee;
                text-align: right;
            }
            
            @media (max-width: 768px) {
                .modal-header {
                    padding: 15px 20px;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-image {
                    height: 200px;
                }
                
                .modal-footer {
                    padding: 15px 20px;
                }
            }
        </style>
    `;
    
    // Add CSS to head if not already added
    if (!document.querySelector('#modal-css')) {
        const style = document.createElement('style');
        style.id = 'modal-css';
        style.innerHTML = modalCSS;
        document.head.appendChild(style);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
                
                // Scroll to target
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

// Contact Form
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success message
        
        // Simulate API call
        showFormMessage('Sending message...', 'success');
        
        setTimeout(() => {
            // Show success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        }, 1500);
    });
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
}

// Back to Top Button
function initBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active Navigation Link on Scroll
function initActiveNavLink() {
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        header.style.padding = '';
    }
});
