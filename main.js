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
const submitBtn = document.querySelector('.submit-btn');
const charCount = document.getElementById('char-count');
const messageTextarea = document.getElementById('message');
const formIndicator = document.getElementById('form-indicator');
const indicatorDot = formIndicator?.querySelector('.indicator-dot');
const indicatorText = formIndicator?.querySelector('.indicator-text');
const draftBtn = document.getElementById('draft-btn');
const resetBtn = document.getElementById('reset-btn');

// Blog data with categories
const blogPosts = [
    {
        id: 1,
        title: "The Impact of Monetary Policy on Emerging Markets",
        excerpt: "An analysis of how central bank decisions in developed economies affect financial stability and growth prospects in emerging markets like Nepal and other South Asian countries.",
        date: "June 15, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "5 min read",
        views: "1,245",
        author: "Brijesh Bhattarai",
        tags: ["Economics", "Monetary Policy", "Emerging Markets"]
    },
    {
        id: 2,
        title: "Cognitive Biases in Investment Decisions",
        excerpt: "Exploring how psychological factors like overconfidence, herd mentality, and loss aversion influence investor behavior and market outcomes.",
        date: "May 28, 2023",
        category: "finance",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "4 min read",
        views: "2,178",
        author: "Brijesh Bhattarai",
        tags: ["Psychology", "Investing", "Behavioral Finance"]
    },
    {
        id: 3,
        title: "Sustainable Investing: Beyond the ESG Hype",
        excerpt: "A critical look at Environmental, Social, and Governance (ESG) investing, its measurement challenges, and how to identify genuinely sustainable investment opportunities.",
        date: "April 10, 2023",
        category: "finance",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "6 min read",
        views: "3,421",
        author: "Brijesh Bhattarai",
        tags: ["ESG", "Sustainable Investing", "Finance"]
    },
    {
        id: 4,
        title: "Digital Currencies and the Future of Central Banking",
        excerpt: "Examining the rise of digital currencies and their potential impact on traditional monetary systems and financial stability.",
        date: "March 22, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "7 min read",
        views: "4,892",
        author: "Brijesh Bhattarai",
        tags: ["Cryptocurrency", "CBDC", "Banking"]
    },
    {
        id: 5,
        title: "Inflation Dynamics in Post-Pandemic Economies",
        excerpt: "Analyzing the complex factors driving inflation in the aftermath of the COVID-19 pandemic and policy responses around the world.",
        date: "February 18, 2023",
        category: "economics",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "8 min read",
        views: "5,634",
        author: "Brijesh Bhattarai",
        tags: ["Inflation", "Macroeconomics", "Pandemic"]
    },
    {
        id: 6,
        title: "The Psychology of Market Bubbles",
        excerpt: "Understanding the behavioral economics behind financial bubbles and what history teaches us about identifying and navigating them.",
        date: "January 5, 2023",
        category: "analysis",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "5 min read",
        views: "3,987",
        author: "Brijesh Bhattarai",
        tags: ["Market Bubbles", "Behavioral Economics", "History"]
    },
    {
        id: 7,
        title: "Fintech Revolution in South Asia",
        excerpt: "How financial technology is transforming banking, payments, and investments in developing economies like Nepal, India, and Bangladesh.",
        date: "December 12, 2022",
        category: "finance",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "6 min read",
        views: "2,754",
        author: "Brijesh Bhattarai",
        tags: ["Fintech", "South Asia", "Digital Banking"]
    },
    {
        id: 8,
        title: "Global Supply Chain Economics",
        excerpt: "Analyzing the economic implications of global supply chain disruptions and strategies for building more resilient systems.",
        date: "November 20, 2022",
        category: "analysis",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        readTime: "7 min read",
        views: "4,123",
        author: "Brijesh Bhattarai",
        tags: ["Supply Chain", "Global Economics", "Logistics"]
    }
];

// State variables
let displayedPosts = 3;
let currentFilter = 'all';
let uploadedPhoto = null;
let isBwMode = false;
let lastScrollPosition = 0;
let isScrollingDown = false;
let unreadMessages = 3;

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
    
    // Initialize character counter
    initCharCounter();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize social links
    initSocialLinks();
    
    // Initialize animations
    initAnimations();
    
    // Initialize visitor counter (local storage based)
    initVisitorCounter();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
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
                    const otherIcon = item.previousElementSibling.querySelector('i');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
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
            <div class="blog-img" style="background-image: url('${post.image}');">
                <div class="blog-overlay">
                    <div class="blog-stats">
                        <span><i class="far fa-eye"></i> ${post.views}</span>
                        <span><i class="far fa-comment"></i> ${Math.floor(Math.random() * 50)}</span>
                    </div>
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-footer">
                    <div class="blog-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</div>
                    <a href="#" class="read-more" data-id="${post.id}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
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
    
    // Add hover effects to blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Load More Blog Posts
loadMoreBtn.addEventListener('click', function() {
    displayedPosts += 3;
    displayBlogPosts(currentFilter);
    
    // Add animation to new cards
    const newCards = blogContainer.querySelectorAll('.blog-card:nth-child(n+4)');
    newCards.forEach(card => {
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
});

// Blog Filter
function initBlogFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
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
                    <div class="modal-header-content">
                        <h3>${post.title}</h3>
                        <p class="modal-subtitle">By ${post.author} • ${post.date} • ${post.readTime}</p>
                    </div>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image" style="background-image: url('${post.image}');">
                        <div class="image-overlay">
                            <div class="image-stats">
                                <span><i class="far fa-eye"></i> ${post.views} views</span>
                                <span><i class="far fa-comment"></i> ${Math.floor(Math.random() * 50)} comments</span>
                                <span><i class="far fa-heart"></i> ${Math.floor(Math.random() * 200)} likes</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-article">
                        <div class="article-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="article-content">
                            <p>${post.excerpt}</p>
                            
                            <h4>Detailed Analysis</h4>
                            <p>This comprehensive analysis explores the intricate dynamics at play. The subject matter requires careful consideration of multiple factors, each contributing to the overall understanding of the topic.</p>
                            
                            <div class="article-highlight">
                                <i class="fas fa-quote-left"></i>
                                <p>The key insight is that traditional approaches may no longer be sufficient in today's rapidly changing environment.</p>
                            </div>
                            
                            <p>The intersection of technology and finance has created new opportunities and challenges. From blockchain to AI-driven analysis, the tools available to economists and financial professionals are constantly evolving.</p>
                            
                            <h4>Key Takeaways</h4>
                            <ul>
                                <li>Understanding market dynamics is crucial for informed decision-making</li>
                                <li>Historical context provides valuable lessons for current challenges</li>
                                <li>Adaptability remains a key success factor in financial markets</li>
                                <li>Continuous learning is essential in this rapidly evolving field</li>
                            </ul>
                            
                            <p>As markets evolve and new economic theories emerge, staying informed is crucial for making sound financial decisions. The ability to adapt to changing circumstances while maintaining core principles is what separates successful investors from the rest.</p>
                        </div>
                        
                        <div class="article-actions">
                            <button class="action-btn like-btn">
                                <i class="far fa-heart"></i> Like
                            </button>
                            <button class="action-btn share-btn">
                                <i class="fas fa-share-alt"></i> Share
                            </button>
                            <button class="action-btn bookmark-btn">
                                <i class="far fa-bookmark"></i> Save
                            </button>
                        </div>
                        
                        <div class="author-box">
                            <div class="author-avatar">
                                <img src="brijesh5.jpeg" alt="Brijesh Bhattarai">
                            </div>
                            <div class="author-info">
                                <h5>${post.author}</h5>
                                <p>Finance & Economics Analyst</p>
                                <p>Sharing insights on market trends, economic policies, and investment strategies.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline close-blog-modal">
                        <i class="fas fa-times"></i> Close
                    </button>
                    <button class="btn btn-primary subscribe-btn">
                        <i class="fas fa-envelope"></i> Subscribe for Updates
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
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
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            .blog-modal-content {
                background-color: white;
                border-radius: 15px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.4s ease;
            }
            
            .blog-modal-content .modal-header {
                padding: 25px 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 15px 15px 0 0;
            }
            
            .modal-header-content h3 {
                margin: 0 0 10px 0;
                font-size: 1.8rem;
                color: white;
            }
            
            .modal-subtitle {
                margin: 0;
                opacity: 0.9;
                font-size: 0.95rem;
            }
            
            .blog-modal-content .modal-body {
                padding: 30px;
            }
            
            .modal-image {
                height: 400px;
                background-size: cover;
                background-position: center;
                border-radius: 10px;
                margin-bottom: 25px;
                position: relative;
            }
            
            .image-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
                padding: 20px;
                border-radius: 0 0 10px 10px;
            }
            
            .image-stats {
                display: flex;
                gap: 20px;
                color: white;
                font-size: 0.9rem;
            }
            
            .article-tags {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }
            
            .tag {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 6px 15px;
                border-radius: 50px;
                font-size: 0.85rem;
                font-weight: 500;
            }
            
            .article-content h4 {
                color: #333;
                margin: 25px 0 15px;
                font-size: 1.4rem;
                border-left: 4px solid #667eea;
                padding-left: 15px;
            }
            
            .article-content p {
                margin-bottom: 20px;
                color: #555;
                line-height: 1.8;
                font-size: 1.05rem;
            }
            
            .article-highlight {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 25px;
                border-radius: 10px;
                margin: 30px 0;
                position: relative;
            }
            
            .article-highlight i.fa-quote-left {
                font-size: 2rem;
                opacity: 0.3;
                position: absolute;
                top: 15px;
                left: 15px;
            }
            
            .article-highlight p {
                color: white;
                font-size: 1.2rem;
                font-style: italic;
                margin: 0;
                padding-left: 30px;
            }
            
            .article-content ul {
                margin: 20px 0;
                padding-left: 20px;
            }
            
            .article-content li {
                margin-bottom: 10px;
                color: #555;
                line-height: 1.6;
            }
            
            .article-actions {
                display: flex;
                gap: 15px;
                margin: 30px 0;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
            
            .action-btn {
                padding: 10px 20px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .like-btn:hover {
                border-color: #f5576c;
                color: #f5576c;
            }
            
            .share-btn:hover {
                border-color: #667eea;
                color: #667eea;
            }
            
            .bookmark-btn:hover {
                border-color: #4CAF50;
                color: #4CAF50;
            }
            
            .author-box {
                display: flex;
                gap: 20px;
                padding: 25px;
                background: #f8f9fa;
                border-radius: 10px;
                margin-top: 30px;
            }
            
            .author-avatar {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
            }
            
            .author-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .author-info h5 {
                margin: 0 0 5px 0;
                color: #333;
            }
            
            .author-info p {
                margin: 0 0 5px 0;
                color: #666;
                font-size: 0.9rem;
            }
            
            .blog-modal-content .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                gap: 15px;
            }
            
            .subscribe-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .blog-modal-content .modal-header {
                    padding: 20px;
                }
                
                .blog-modal-content .modal-body {
                    padding: 20px;
                }
                
                .modal-image {
                    height: 250px;
                }
                
                .author-box {
                    flex-direction: column;
                    text-align: center;
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
    
    // Add event listeners
    setTimeout(() => {
        const modalOverlay = document.querySelector('.blog-modal-overlay');
        const closeBtn = modalOverlay?.querySelector('.modal-close');
        const closeModalBtn = modalOverlay?.querySelector('.close-blog-modal');
        const shareBtn = modalOverlay?.querySelector('.share-btn');
        const likeBtn = modalOverlay?.querySelector('.like-btn');
        const bookmarkBtn = modalOverlay?.querySelector('.bookmark-btn');
        const subscribeBtn = modalOverlay?.querySelector('.subscribe-btn');
        
        if (!modalOverlay) return;
        
        function closeModal() {
            modalOverlay.style.animation = 'fadeOut 0.3s ease forwards';
            modalOverlay.querySelector('.blog-modal-content').style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        }
        
        // Add closing animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners
        closeBtn?.addEventListener('click', closeModal);
        closeModalBtn?.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Share functionality
        shareBtn?.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href
                });
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                });
            }
        });
        
        // Like functionality
        likeBtn?.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-red');
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Bookmark functionality
        bookmarkBtn?.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-warning');
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Save to localStorage
            const bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
            const index = bookmarks.indexOf(postId);
            if (index === -1) {
                bookmarks.push(postId);
                alert('Article bookmarked!');
            } else {
                bookmarks.splice(index, 1);
                alert('Bookmark removed!');
            }
            localStorage.setItem('blogBookmarks', JSON.stringify(bookmarks));
        });
        
        // Subscribe functionality
        subscribeBtn?.addEventListener('click', function() {
            const email = prompt('Enter your email to subscribe for updates:');
            if (email) {
                alert('Thank you for subscribing! You\'ll receive updates on new articles.');
                // In a real app, you would send this to your backend
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }, 100);
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
                    document.body.style.overflow = 'auto';
                }
                
                // Scroll to target
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form with Python Backend Integration
function initContactForm() {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!validateForm()) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Check consent
        if (!document.getElementById('consent').checked) {
            showFormMessage('Please agree to the privacy terms.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare data for Python backend
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString(),
            source: 'Website Contact Form'
        };
        
        try {
            // Send to Python Flask backend (running on localhost:5000)
            const response = await fetch('http://localhost:5000/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                showFormMessage(data.message, 'success');
                
                // Reset form
                contactForm.reset();
                updateFormIndicator();
                charCount.textContent = '0';
                
                // Clear draft
                localStorage.removeItem('contactFormDraft');
                
                // Track successful submission
                trackFormSubmission('success');
                
                // Show confirmation animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                }, 2000);
            } else {
                showFormMessage(data.message, 'error');
                trackFormSubmission('error');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Fallback: Use Formspree if Flask backend is down
            if (confirm('Backend server might be down. Would you like to send the form via email directly?')) {
                // Fallback to Formspree
                const formspreeForm = document.createElement('form');
                formspreeForm.method = 'POST';
                formspreeForm.action = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree ID
                formspreeForm.style.display = 'none';
                
                const nameInput = document.createElement('input');
                nameInput.type = 'hidden';
                nameInput.name = 'name';
                nameInput.value = name;
                
                const emailInput = document.createElement('input');
                emailInput.type = 'hidden';
                emailInput.name = 'email';
                emailInput.value = email;
                
                const subjectInput = document.createElement('input');
                subjectInput.type = 'hidden';
                subjectInput.name = 'subject';
                subjectInput.value = subject;
                
                const messageInput = document.createElement('input');
                messageInput.type = 'hidden';
                messageInput.name = 'message';
                messageInput.value = message;
                
                formspreeForm.appendChild(nameInput);
                formspreeForm.appendChild(emailInput);
                formspreeForm.appendChild(subjectInput);
                formspreeForm.appendChild(messageInput);
                
                document.body.appendChild(formspreeForm);
                formspreeForm.submit();
            } else {
                showFormMessage('Connection failed. Please email me directly at brijesh.bhattarai@impacthub.net', 'error');
                trackFormSubmission('error');
            }
        } finally {
            // Reset button state after 2 seconds even if using fallback
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 2000);
        }
    });
    
    // Save draft button
    draftBtn.addEventListener('click', function() {
        saveDraft();
    });
    
    // Reset button
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all form fields?')) {
            contactForm.reset();
            updateFormIndicator();
            localStorage.removeItem('contactFormDraft');
            charCount.textContent = '0';
            showFormMessage('Form cleared.', 'info');
        }
    });
    
    // Auto-save draft on input
    let draftTimer;
    contactForm.addEventListener('input', function() {
        clearTimeout(draftTimer);
        draftTimer = setTimeout(saveDraft, 2000);
    });
}

// Form validation
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        showValidationError('name', 'Please enter your full name (min. 2 characters)');
        isValid = false;
    } else {
        clearValidationError('name');
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showValidationError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearValidationError('email');
    }
    
    // Validate subject
    const subject = document.getElementById('subject').value;
    if (!subject) {
        showValidationError('subject', 'Please select a subject');
        isValid = false;
    } else {
        clearValidationError('subject');
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (message.length < 10) {
        showValidationError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else if (message.length > 1000) {
        showValidationError('message', 'Message must be less than 1000 characters');
        isValid = false;
    } else {
        clearValidationError('message');
    }
    
    return isValid;
}

function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const validationEl = document.getElementById(`${fieldId}-validation`);
    
    field.classList.add('invalid');
    field.classList.remove('valid');
    if (validationEl) {
        validationEl.textContent = message;
        validationEl.style.color = '#dc3545';
    }
}

function clearValidationError(fieldId) {
    const field = document.getElementById(fieldId);
    const validationEl = document.getElementById(`${fieldId}-validation`);
    
    field.classList.remove('invalid');
    field.classList.add('valid');
    if (validationEl) {
        validationEl.textContent = '';
    }
}

function initFormValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', validateForm);
            field.addEventListener('input', function() {
                updateFormIndicator();
            });
        }
    });
}

// Character counter
function initCharCounter() {
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 1000) {
                charCount.style.color = '#dc3545';
                this.classList.add('invalid');
            } else if (length > 800) {
                charCount.style.color = '#ffc107';
                this.classList.remove('invalid');
            } else {
                charCount.style.color = '#28a745';
                this.classList.remove('invalid');
            }
            
            updateFormIndicator();
        });
    }
}

// Update form indicator
function updateFormIndicator() {
    if (!formIndicator || !indicatorDot || !indicatorText) return;
    
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const subject = document.getElementById('subject')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    const isNameValid = name.length >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isSubjectValid = subject.length > 0;
    const isMessageValid = message.length >= 10 && message.length <= 1000;
    
    const isValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    
    if (isValid) {
        indicatorDot.style.background = '#28a745';
        indicatorText.textContent = 'Form Ready';
        indicatorDot.style.animation = 'pulse 2s infinite';
    } else {
        indicatorDot.style.background = '#ffc107';
        indicatorText.textContent = 'Complete all fields';
        indicatorDot.style.animation = 'none';
    }
}

// Save draft functionality
function saveDraft() {
    const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        subject: document.getElementById('subject')?.value || '',
        message: document.getElementById('message')?.value || '',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    
    // Show save notification
    const notification = document.createElement('div');
    notification.className = 'draft-notification';
    notification.innerHTML = '<i class="fas fa-save"></i> Draft saved';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .draft-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4a6cf7;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 1.7s;
            z-index: 1000;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem('contactFormDraft');
    if (draft) {
        try {
            const formData = JSON.parse(draft);
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const draftDate = new Date(formData.timestamp);
            
            if (draftDate > oneWeekAgo) {
                setTimeout(() => {
                    if (confirm('You have a saved draft from ' + 
                        draftDate.toLocaleDateString() + '. Would you like to load it?')) {
                        document.getElementById('name').value = formData.name || '';
                        document.getElementById('email').value = formData.email || '';
                        document.getElementById('subject').value = formData.subject || '';
                        document.getElementById('message').value = formData.message || '';
                        updateFormIndicator();
                        charCount.textContent = formData.message?.length || 0;
                        showFormMessage('Draft loaded. You can continue editing.', 'info');
                    }
                }, 1000);
            } else {
                localStorage.removeItem('contactFormDraft');
            }
        } catch (e) {
            console.error('Error loading draft:', e);
        }
    }
}

// Show form message
function showFormMessage(text, type) {
    formMessage.innerHTML = '';
    
    const messageEl = document.createElement('div');
    messageEl.className = `message-${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    formMessage.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            if (messageEl.parentNode === formMessage) {
                formMessage.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Back to Top Button
function initBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
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
    if (!changePhotoBtn || !toggleBwBtn) return;
    
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
                photo.style.filter = 'grayscale(100%) contrast(120%)';
            } else {
                photo.classList.remove('bw');
                photo.style.filter = 'none';
            }
        });
        
        // Update button text with animation
        const icon = this.querySelector('i');
        const text = isBwMode ? 'Color Mode' : 'B&W Mode';
        icon.className = isBwMode ? 'fas fa-palette' : 'fas fa-adjust';
        this.innerHTML = `<i class="${icon.className}"></i> ${text}`;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Save preference to localStorage
        localStorage.setItem('photoBwMode', isBwMode);
    });
    
    // Load B&W mode preference
    const savedBwMode = localStorage.getItem('photoBwMode');
    if (savedBwMode === 'true') {
        isBwMode = true;
        profilePhotos.forEach(photo => {
            photo.classList.add('bw');
            photo.style.filter = 'grayscale(100%) contrast(120%)';
        });
        const icon = toggleBwBtn.querySelector('i');
        icon.className = 'fas fa-palette';
        toggleBwBtn.innerHTML = `<i class="${icon.className}"></i> Color Mode`;
    }
}

// Modal Functionality
function initModal() {
    if (!photoModal) return;
    
    // Close modal button
    modalClose.addEventListener('click', function() {
        closePhotoModal();
    });
    
    // Cancel upload button
    cancelUpload.addEventListener('click', function() {
        closePhotoModal();
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
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
                return;
            }
            
            if (file.size > maxSize) {
                alert('File size must be less than 5MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedPhoto = event.target.result;
                photoPreview.innerHTML = `
                    <div class="preview-container">
                        <img src="${uploadedPhoto}" alt="Preview">
                        <div class="preview-info">
                            <p>${file.name}</p>
                            <p>${(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Save photo button
    savePhoto.addEventListener('click', function() {
        if (uploadedPhoto) {
            // Update all profile photos on the page
            profilePhotos.forEach(photo => {
                const img = new Image();
                img.onload = function() {
                    photo.src = uploadedPhoto;
                    // Apply B&W filter if active
                    if (isBwMode) {
                        photo.style.filter = 'grayscale(100%) contrast(120%)';
                    }
                };
                img.src = uploadedPhoto;
            });
            
            // Show success message with animation
            this.innerHTML = '<i class="fas fa-check"></i> Saved!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                closePhotoModal();
                // Reset button
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Save Photo';
                    this.style.background = '';
                }, 500);
            }, 1000);
            
            // Save to localStorage
            localStorage.setItem('profilePhoto', uploadedPhoto);
        } else {
            alert('Please select a photo first.');
        }
    });
    
    // Close modal when clicking outside
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closePhotoModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && photoModal.classList.contains('active')) {
            closePhotoModal();
        }
    });
    
    // Load saved profile photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profilePhotos.forEach(photo => {
            photo.src = savedPhoto;
        });
    }
}

function closePhotoModal() {
    photoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    uploadedPhoto = null;
    photoPreview.innerHTML = '';
    photoUpload.value = '';
}

// Statistics Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target + '+';
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

// Social Links
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('span').textContent;
            trackSocialClick(platform);
        });
    });
    
    // LinkedIn specific tracking
    const linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', function() {
            // Open in new tab with tracking parameters
            this.href = this.href + '?utm_source=website&utm_medium=social&utm_campaign=contact';
        });
    }
}

// Animations
function initAnimations() {
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate
    document.querySelectorAll('.blog-card, .contact-info-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Visitor Counter
function initVisitorCounter() {
    let visitors = localStorage.getItem('siteVisitors') || 0;
    visitors = parseInt(visitors) + 1;
    localStorage.setItem('siteVisitors', visitors);
    
    // Display visitor count in console (optional)
    console.log(`Welcome! You are visitor #${visitors}`);
}

// Scroll Effects
function initScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Update header transparency
                const header = document.querySelector('header');
                const scrollTop = window.pageYOffset;
                
                if (scrollTop > 100) {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    header.style.backdropFilter = 'blur(5px)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }
                
                // Parallax for hero
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrollTop * 0.4}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Analytics functions
function trackFormSubmission(status) {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push({
        timestamp: new Date().toISOString(),
        status: status
    });
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
}

function trackSocialClick(platform) {
    const clicks = JSON.parse(localStorage.getItem('socialClicks') || '[]');
    clicks.push({
        platform: platform,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('socialClicks', JSON.stringify(clicks));
}

// Photo fallback functionality
window.addEventListener('load', function() {
    profilePhotos.forEach(photo => {
        photo.addEventListener('error', function() {
            // If photo doesn't exist, show placeholder
            this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
            this.alt = 'Profile Photo Placeholder';
        });
    });
    
    // Load draft on page load
    setTimeout(loadDraft, 500);
    
    // Initialize form indicator
    updateFormIndicator();
});

// Add additional blog card styles
const blogStyles = document.createElement('style');
blogStyles.textContent = `
    .blog-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7));
        border-radius: 10px 10px 0 0;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .blog-img:hover .blog-overlay {
        opacity: 1;
    }
    
    .blog-stats {
        position: absolute;
        bottom: 15px;
        left: 15px;
        display: flex;
        gap: 15px;
        color: white;
        font-size: 0.85rem;
    }
    
    .blog-tags {
        display: flex;
        gap: 8px;
        margin: 15px 0;
        flex-wrap: wrap;
    }
    
    .blog-tag {
        background: #f0f2f5;
        color: #666;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    .blog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }
    
    .read-more {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #4a6cf7;
        text-decoration: none;
        font-weight: 500;
        transition: gap 0.3s;
    }
    
    .read-more:hover {
        gap: 10px;
    }
    
    .text-red {
        color: #f5576c !important;
    }
    
    .text-warning {
        color: #ffc107 !important;
    }
`;
document.head.appendChild(blogStyles);

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page is visible again - update visitor count
        initVisitorCounter();
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (for future search feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search if exists, otherwise focus contact form
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        } else {
            document.getElementById('name')?.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
            openModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
