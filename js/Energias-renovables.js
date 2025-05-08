document.addEventListener('DOMContentLoaded', function() {
    // Navbar Toggle for Mobile
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hero animations
    const energyHeroContent = document.querySelector('.energy-hero-content');
    if (energyHeroContent) {
        energyHeroContent.classList.add('animate');
    }
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.mission, .benefits, .products, .consultation');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });
    
    // Animate individual elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .benefit-card, .product-card, .mission-content, .mission-image, .consultation-content, .consultation-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateElements();
    
    // Check on scroll
    window.addEventListener('scroll', animateElements);
    
    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Expandable product info functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    const expandedInfos = document.querySelectorAll('.expanded-info');
    const closeButtons = document.querySelectorAll('.close-expanded');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetInfo = document.getElementById(targetId);
            
            if (targetInfo) {
                // Close any open info sections first
                expandedInfos.forEach(info => {
                    info.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
                
                // Open the selected one
                targetInfo.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Animate the content in
                gsap.from(targetInfo.querySelector('.expanded-content'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentInfo = button.closest('.expanded-info');
            if (parentInfo) {
                parentInfo.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close expanded info when clicking outside content
    expandedInfos.forEach(info => {
        info.addEventListener('click', (e) => {
            if (e.target === info) {
                info.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Social Media Modal
    const socialModal = document.getElementById('socialModal');
    const closeModal = document.querySelector('.close-modal');
    
    function showModal() {
        socialModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        socialModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', hideModal);
    
    socialModal.addEventListener('click', (e) => {
        if (e.target === socialModal) {
            hideModal();
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});