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
    
    // Image Gallery Functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image
            const newImageSrc = this.getAttribute('data-image');
            mainImage.src = newImageSrc;
            
            // Add fade effect
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.style.opacity = 1;
                mainImage.style.transition = 'opacity 0.3s ease';
            }, 100);
        });
    });
    
    // Product Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Quick Question Modal
    const quickQuestionBtn = document.getElementById('quickQuestionBtn');
    const quickQuestionModal = document.getElementById('quickQuestionModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (quickQuestionBtn) {
        quickQuestionBtn.addEventListener('click', function() {
            quickQuestionModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            quickQuestionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === quickQuestionModal) {
            quickQuestionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Submissions
    const inquiryForm = document.getElementById('productInquiryForm');
    const quickQuestionForm = document.getElementById('quickQuestionForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#inquiryName').value;
            const email = this.querySelector('#inquiryEmail').value;
            const subject = this.querySelector('#inquirySubject').value;
            const message = this.querySelector('#inquiryMessage').value;
            
            // Here you would typically send the data to a server
            console.log('Inquiry submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Gracias por tu consulta. Nos pondremos en contacto contigo pronto.');
            
            // Reset form
            this.reset();
        });
    }
    
    if (quickQuestionForm) {
        quickQuestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#quickName').value;
            const email = this.querySelector('#quickEmail').value;
            const question = this.querySelector('#quickQuestion').value;
            
            // Here you would typically send the data to a server
            console.log('Quick question submitted:', { name, email, question });
            
            // Show success message
            alert('Gracias por tu pregunta. Te responderemos a la brevedad.');
            
            // Reset form and close modal
            this.reset();
            quickQuestionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-info, .inquiry-form, .product-tabs, .related-products');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
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