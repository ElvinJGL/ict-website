function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    document.querySelectorAll('.error').forEach(elem => {
        elem.textContent = '';
    });
    
    if (name.trim() === '') {
        document.getElementById('nameError').textContent = 'Please enter your name';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        document.getElementById('emailError').textContent = 'Please enter your email';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (subject.trim() === '') {
        document.getElementById('subjectError').textContent = 'Please enter a subject';
        isValid = false;
    }

    if (message.trim() === '') {
        document.getElementById('messageError').textContent = 'Please enter your message';
        isValid = false;
    }

    return isValid;
}

function submitMsg() {
    if (validateForm()) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            <strong>Success!</strong> Your message has been sent successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        const form = document.getElementById('form');
        form.parentNode.insertBefore(alertDiv, form);

        document.getElementById('contactFormFields').reset();

        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
    
    gsap.registerPlugin(ScrollTrigger);
    
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
    
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    const startCounters = function () {
        document.querySelectorAll('.counter-value').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);

            let current = 0;
            const updateCounter = () => {
                current += increment;
                counter.textContent = Math.floor(current);

                if (current < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    const counterSection = document.querySelector('.counter-box');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterSection.parentElement.parentElement);
    }

    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function () {
            const emailInput = this.previousElementSibling;
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === '') {
                alert('Please enter your email address');
                return;
            }

            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    gsap.from('.carousel-caption h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.carousel-caption p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.utils.toArray('.feature-icon').forEach(icon => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            rotate: 360,
            duration: 1,
            ease: 'power1.inOut'
        });
    });

    gsap.utils.toArray('.timeline-container').forEach((container, i) => {
        const anim = gsap.fromTo(container,
            {
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out'
            }
        );

        ScrollTrigger.create({
            trigger: container,
            animation: anim,
            start: 'top 80%',
            toggleActions: 'play none none none'
        });
    });

    gsap.utils.toArray('.section-header').forEach(header => {
        ScrollTrigger.create({
            trigger: header,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(header,
                    {
                        opacity: 0,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    }
                );

                gsap.fromTo(header.nextElementSibling,
                    {
                        width: '0%'
                    },
                    {
                        width: '80px',
                        duration: 1,
                        ease: 'power2.out',
                        delay: 0.3
                    }
                );
            },
            once: true
        });
    });

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        let startX;
        let endX;

        carousel.addEventListener('touchstart', function (event) {
            startX = event.touches[0].pageX;
        }, false);

        carousel.addEventListener('touchend', function (event) {
            endX = event.changedTouches[0].pageX;

            if (startX > endX + 50) {
                new bootstrap.Carousel(carousel).next();
            } else if (startX < endX - 50) {
                new bootstrap.Carousel(carousel).prev();
            }
        }, false);
    });

    gsap.utils.toArray('.card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
            });

            const cardImg = this.querySelector('.card-img-top');
            if (cardImg) {
                gsap.to(cardImg, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
            });

            const cardImg = this.querySelector('.card-img-top');
            if (cardImg) {
                gsap.to(cardImg, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });

    gsap.utils.toArray('.btn-custom').forEach(button => {
        button.addEventListener('mouseenter', function () {
            gsap.to(this, {
                y: -2,
                duration: 0.3,
                boxShadow: '0 5px 15px rgba(0, 123, 255, 0.4)',
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                boxShadow: '0 0 0 rgba(0, 123, 255, 0)',
                ease: 'power2.out'
            });
        });
    });

    document.querySelectorAll('.carousel-item img').forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });

    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('footer p.mb-0');
    if (copyrightText) {
        copyrightText.textContent = copyrightText.textContent.replace('2024', currentYear);
    }

    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.2,
                color: '#FCC100',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        icon.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                color: '#154079',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    window.addEventListener('beforeunload', function () {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, savedScrollPosition);
        localStorage.removeItem('scrollPosition');
    }
});