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
    
    // Initialize Swiper for Hero Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            init: function() {
                const activeSlide = this.slides[this.activeIndex];
                const content = activeSlide.querySelector('.hero-content');
                content.classList.add('animate');
            },
            slideChangeTransitionStart: function() {
                const outgoingSlide = this.slides[this.previousIndex];
                const outgoingContent = outgoingSlide.querySelector('.hero-content');
                outgoingContent.classList.remove('animate');
            },
            slideChangeTransitionEnd: function() {
                const incomingSlide = this.slides[this.activeIndex];
                const incomingContent = incomingSlide.querySelector('.hero-content');
                incomingContent.classList.add('animate');
            }
        }
    });
    
    // Service Cards Mouse Follow Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
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
    
    // Social Media Modal
    const instagramLink = document.getElementById('instagram-link');
    const linkedinLink = document.getElementById('linkedin-link');
    const socialModal = document.getElementById('socialModal');
    const closeModal = document.querySelector('.close-modal');
    
    function showModal() {
        socialModal.classList.add('active');
    }
    
    function hideModal() {
        socialModal.classList.remove('active');
    }
    
    instagramLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });
    
    linkedinLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });
    
    closeModal.addEventListener('click', hideModal);
    
    socialModal.addEventListener('click', (e) => {
        if (e.target === socialModal) {
            hideModal();
        }
    });
    
    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .contact-form, .contact-map, .about-content, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            console.log('Form submitted:', { name, email, message });
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.navbar', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    const sections = document.querySelectorAll('section');
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
    
    gsap.to('.footer', {
        backgroundPosition: '100% 50%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'none'
    });
});