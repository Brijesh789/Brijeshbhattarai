// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const interestHeaders = document.querySelectorAll('.interest-header');
const blogContainer = document.getElementById('blog-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const backToTopBtn = document.getElementById('back-to-top');
const navLinksList = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('current-year');
const filterButtons = document.querySelectorAll('.filter-btn');
const changePhotoBtn = document.getElementById('change-photo-btn');
const toggleBwBtn = document.getElementById('toggle-bw-btn');
const profilePhotos = document.querySelectorAll('.profile-photo');
const photoModal = document.getElementById('photo-modal');
const photoUpload = document.getElementById('photo-upload');
const browseBtn = document.getElementById('browse-btn');
const cancelUpload = document.getElementById('cancel-upload');
const savePhoto = document.getElementById('save-photo');
const uploadArea = document.getElementById('upload-area');
const photoPreview = document.getElementById('photo-preview');
const modalClose = document.querySelector('.modal-close');

// Blog data with categories
const blogPosts = [
    {
        id: 1,
        title: "The Impact of Monetary Policy on Emerging Markets",
        excerpt: "An analysis of how central bank decisions in developed economies affect financial stability and growth prospects in emerging markets like Nepal and other South Asian countries.",
        date: "June 15, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Cognitive Biases in Investment Decisions",
        excerpt: "Exploring how psychological factors like overconfidence, herd mentality, and loss aversion influence investor behavior and market outcomes.",
        date: "May 28, 2023",
        category: "finance",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "Sustainable Investing: Beyond the ESG Hype",
        excerpt: "A critical look at Environmental, Social, and Governance (ESG) investing, its measurement challenges, and how to identify genuinely sustainable investment opportunities.",
        date: "April 10, 2023",
        category: "finance",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Digital Currencies and the Future of Central Banking",
        excerpt: "Examining the rise of digital currencies and their potential impact on traditional monetary systems and financial stability.",
        date: "March 22, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "Inflation Dynamics in Post-Pandemic Economies",
        excerpt: "Analyzing the complex factors driving inflation in the aftermath of the COVID-19 pandemic and policy responses around the world.",
        date: "February 18, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "8 min read"
    },
    {
        id: 6,
        title: "The Psychology of Market Bubbles",
        excerpt: "Understanding the behavioral economics behind financial bubbles and what history teaches us about identifying and navigating them.",
        date: "January 5, 2023",
        category: "analysis",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "5 min read"
    },
    {
        id: 7,
        title: "Fintech Revolution in South Asia",
        excerpt: "How financial technology is transforming banking, payments, and investments in developing economies like Nepal, India, and Bangladesh.",
        date: "December 12, 2022",
        category: "finance",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "6 min read"
    },
    {
        id: 8,
        title: "Global Supply Chain Economics",
        excerpt: "Analyzing the economic implications of global supply chain disruptions and strategies for building more resilient systems.",
        date: "November 20, 2022",
        category: "analysis",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "7 min read"
    }
];

// State variables
let displayedPosts = 3;
let currentFilter = 'all';
let uploadedPhoto = null;
let isBwMode = false;

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
    
    // Initialize blog filter
    initBlogFilter();
    
    // Initialize photo functionality
    initPhotoFunctionality();
    
    // Initialize statistics counter
    initStatsCounter();
    
    // Initialize modal
    initModal();
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
            const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
            
            // Close other open sections
            document.querySelectorAll('.interest-content').forEach(item => {
                if (item !== content && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('i.fa-chevron-up').classList.remove('fa-chevron-up');
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
function displayBlogPosts(filter = 'all') {
    // Clear existing posts
    blogContainer.innerHTML = '';
    
    // Filter posts
    let filteredPosts = blogPosts;
    if (filter !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === filter);
    }
    
    // Display posts based on current count
    const postsToShow = filteredPosts.slice(0, displayedPosts);
    
    if (postsToShow.length === 0) {
        blogContainer.innerHTML = `
            <div class="no-posts" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-newspaper" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: var(--light-text); margin-bottom: 10px;">No posts found in this category</h3>
                <p style="color: var(--light-text);">Try selecting a different category or check back later for new content.</p>
            </div>
        `;
        return;
    }
    
    postsToShow.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.setAttribute('data-category', post.category);
        blogCard.innerHTML = `
            <div class="blog-img" style="background-image: url('${post.image}');"></div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</div>
                <a href="#" class="read-more" data-id="${post.id}">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
    
    // Update load more button visibility
    if (displayedPosts >= filteredPosts.length) {
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
    displayBlogPosts(currentFilter);
});

// Blog Filter
function initBlogFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reset displayed posts
            currentFilter = this.getAttribute('data-filter');
            displayedPosts = 3;
            displayBlogPosts(currentFilter);
        });
    });
}

// Blog Post Modal
function showBlogPostModal(postId) {
    const post = blogPosts.find(p => p.id == postId);
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay blog-modal-overlay">
            <div class="modal-content blog-modal-content">
                <div class="modal-header">
                    <h3>${post.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                        <span><i class="far fa-folder"></i> ${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                    </div>
                    <div class="modal-image" style="background-image: url('${post.image}');"></div>
                    <div class="modal-article">
                        <p>${post.excerpt}</p>
                        <h4>Detailed Analysis</h4>
                        <p>This is a sample blog post. In a real implementation, this would contain the full article content. For demonstration purposes, we're showing the excerpt here. A complete blog system would have a backend to manage posts, categories, and comments.</p>
                        <p>Finance and economics are dynamic fields that require continuous learning and adaptation. As markets evolve and new economic theories emerge, staying informed is crucial for making sound financial decisions.</p>
                        <p>The intersection of technology and finance has created new opportunities and challenges. From blockchain to AI-driven analysis, the tools available to economists and financial professionals are constantly evolving.</p>
                        <div class="article-tags">
                            <span class="tag">${post.category}</span>
                            <span class="tag">Analysis</span>
                            <span class="tag">Market Trends</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline close-blog-modal">Close</button>
                    <button class="btn btn-primary share-article">
                        <i class="fas fa-share-alt"></i> Share Article
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners to close modal
    const modalOverlay = document.querySelector('.blog-modal-overlay');
    const closeBtn = document.querySelector('.blog-modal-overlay .modal-close');
    const closeModalBtn = document.querySelector('.close-blog-modal');
    const shareBtn = document.querySelector('.share-article');
    
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
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href + '#blog'
            });
        } else {
            alert('Share functionality is not available in your browser. Copy the URL to share.');
        }
    });
    
    // Add CSS for modal if not already added
    if (!document.querySelector('#blog-modal-css')) {
        const style = document.createElement('style');
        style.id = 'blog-modal-css';
        style.innerHTML = `
            .blog-modal-overlay {
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
            
            .blog-modal-content {
                background-color: white;
                border-radius: 10px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .blog-modal-content .modal-header {
                padding: 20px 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .blog-modal-content .modal-header h3 {
                color: var(--primary-color);
                margin: 0;
                font-size: 1.5rem;
            }
            
            .blog-modal-content .modal-body {
                padding: 30px;
            }
            
            .modal-meta {
                display: flex;
                justify-content: space-between;
                color: var(--secondary-color);
                font-size: 0.9rem;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .modal-image {
                height: 300px;
                background-size: cover;
                background-position: center;
                border-radius: 8px;
                margin-bottom: 25px;
            }
            
            .modal-article h4 {
                color: var(--primary-color);
                margin: 25px 0 15px;
                font-size: 1.3rem;
            }
            
            .modal-article p {
                margin-bottom: 20px;
                color: var(--light-text);
                line-height: 1.8;
            }
            
            .article-tags {
                display: flex;
                gap: 10px;
                margin-top: 25px;
                flex-wrap: wrap;
            }
            
            .tag {
                background: var(--gray-light);
                padding: 5px 15px;
                border-radius: 50px;
                font-size: 0.9rem;
                color: var(--light-text);
            }
            
            .blog-modal-content .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #eee;
                display: flex;
                justify-content: flex-end;
                gap: 15px;
            }
            
            @media (max-width: 768px) {
                .blog-modal-content .modal-header {
                    padding: 15px 20px;
                }
                
                .blog-modal-content .modal-body {
                    padding: 20px;
                }
                
                .modal-image {
                    height: 200px;
                }
                
                .blog-modal-content .modal-footer {
                    padding: 15px 20px;
                    flex-direction: column;
                }
                
                .blog-modal-content .modal-footer button {
                    width: 100%;
                }
            }
        `;
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

// Photo Functionality
function initPhotoFunctionality() {
    // Change photo button
    changePhotoBtn.addEventListener('click', function() {
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Toggle black and white mode
    toggleBwBtn.addEventListener('click', function() {
        isBwMode = !isBwMode;
        profilePhotos.forEach(photo => {
            if (isBwMode) {
                photo.classList.add('bw');
            } else {
                photo.classList.remove('bw');
            }
        });
        
        // Update button text
        const icon = this.querySelector('i');
        const text = isBwMode ? 'Toggle Color' : 'Toggle B&W';
        icon.className = isBwMode ? 'fas fa-palette' : 'fas fa-adjust';
        this.innerHTML = `<i class="${icon.className}"></i> ${text}`;
    });
}

// Modal Functionality
function initModal() {
    // Close modal button
    modalClose.addEventListener('click', function() {
        photoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cancel upload button
    cancelUpload.addEventListener('click', function() {
        photoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        uploadedPhoto = null;
        photoPreview.innerHTML = '';
    });
    
    // Browse button
    browseBtn.addEventListener('click', function() {
        photoUpload.click();
    });
    
    // Upload area click
    uploadArea.addEventListener('click', function() {
        photoUpload.click();
    });
    
    // File input change
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedPhoto = event.target.result;
                photoPreview.innerHTML = `<img src="${uploadedPhoto}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Save photo button
    savePhoto.addEventListener('click', function() {
        if (uploadedPhoto) {
            // Update all profile photos on the page
            profilePhotos.forEach(photo => {
                photo.src = uploadedPhoto;
            });
            
            // Show success message
            alert('Profile photo updated successfully!');
            
            // Close modal
            photoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            uploadedPhoto = null;
            photoPreview.innerHTML = '';
        } else {
            alert('Please select a photo first.');
        }
    });
    
    // Close modal when clicking outside
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            photoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            uploadedPhoto = null;
            photoPreview.innerHTML = '';
        }
    });
}

// Statistics Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(statNumber => {
        observer.observe(statNumber);
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        header.style.padding = '';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add category styling to blog cards
const style = document.createElement('style');
style.textContent = `
    .blog-category {
        display: inline-block;
        background: var(--gray-light);
        color: var(--light-text);
        padding: 5px 15px;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 500;
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(style);

// Photo fallback functionality
window.addEventListener('load', function() {
    profilePhotos.forEach(photo => {
        photo.addEventListener('error', function() {
            // If photo doesn't exist, show placeholder
            this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
            console.log('Profile photo not found, using placeholder');
        });
    });
});
