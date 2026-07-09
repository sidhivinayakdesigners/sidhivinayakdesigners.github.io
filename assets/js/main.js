document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Class
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Active Link Highlighting
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Portfolio & Gallery Filter Logic
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 4. Lightbox Modal
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && lightboxTriggers.length > 0) {
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = trigger.getAttribute('href');
                const captionText = trigger.getAttribute('data-caption') || '';
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.textContent = captionText;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            lightboxImg.setAttribute('src', '');
            lightboxCaption.textContent = '';
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }

    // 5. Before/After Slider Interaction
    const baSlider = document.querySelector('.ba-slider');
    if (baSlider) {
        const handle = baSlider.querySelector('.ba-handle');
        const afterImg = baSlider.querySelector('.ba-after');
        let isDragging = false;

        const setSliderPos = (x) => {
            const rect = baSlider.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            handle.style.left = `${position}%`;
            afterImg.style.width = `${position}%`;
        };

        const handleStart = (e) => {
            isDragging = true;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            setSliderPos(x);
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            setSliderPos(x);
        };

        const handleEnd = () => {
            isDragging = false;
        };

        baSlider.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        baSlider.addEventListener('touchstart', handleStart);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);
    }

    // 6. Interactive Interior Cost Calculator
    const calcForm = document.getElementById('calculatorForm');
    const calcResult = document.getElementById('calcResult');
    
    if (calcForm && calcResult) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const propType = document.getElementById('propType').value;
            const size = parseFloat(document.getElementById('size').value) || 0;
            const quality = document.getElementById('quality').value;
            
            if (!size || size <= 0) {
                alert('Please enter a valid property size in Sq. Ft.');
                return;
            }

            // Rates per Sq. Ft. based on quality tier
            let ratePerSqFt = 0;
            if (quality === 'standard') {
                ratePerSqFt = 950;
            } else if (quality === 'premium') {
                ratePerSqFt = 1600;
            } else if (quality === 'luxury') {
                ratePerSqFt = 2800;
            }

            // Adjustments based on property type complexity
            let multiplier = 1.0;
            if (propType === 'modular-kitchen') {
                multiplier = 1.3; // Kitchen has dense cabinet/fittings cost
            } else if (propType === 'villa') {
                multiplier = 1.15; // Higher architectural requirements
            } else if (propType === 'office' || propType === 'commercial') {
                multiplier = 0.9; // Often larger open spaces
            }

            const estimatedCost = size * ratePerSqFt * multiplier;
            const minCost = Math.round(estimatedCost * 0.9);
            const maxCost = Math.round(estimatedCost * 1.1);

            const formatRupee = (num) => {
                return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                }).format(num);
            };

            calcResult.innerHTML = `
                <h4 class="text-gold mb-3 font-luxury">Your Estimated Cost</h4>
                <h2 class="text-white mb-2" style="font-weight: 700;">${formatRupee(minCost)} - ${formatRupee(maxCost)}*</h2>
                <p class="small text-muted mb-4">*Prices are estimates based on average Navi Mumbai local contractor rates including material and labour. Detailed site visits are required for finalized plans.</p>
                <div class="d-grid gap-2">
                    <a href="https://wa.me/918369297174?text=Hi%20Siddhivinayak%20Designers,%20I%20just%20calculated%20my%20interior%20cost%20estimation%20for%20a%20${size}%20sqft%20${propType}%20as%20${formatRupee(estimatedCost)}.%20Please%20schedule%20a%20free%20consultation." class="btn btn-gold" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>Discuss on WhatsApp
                    </a>
                </div>
            `;
        });
    }

    // 7. Form Submission Success Modal / Feedback
    const contactForm = document.getElementById('contactForm');
    const quoteForm = document.getElementById('quoteForm');

    const handleFormSubmit = (form, formType) => {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Client-side validation check
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!isValid) return;

            // Form data simulation
            const name = form.querySelector('[name="name"]')?.value || 'Valued Client';
            
            // Replace form contents with elegant success message
            const container = form.parentElement;
            container.innerHTML = `
                <div class="text-center py-5" data-aos="fade-up">
                    <div class="mb-4">
                        <i class="fas fa-check-circle text-gold" style="font-size: 4rem;"></i>
                    </div>
                    <h3 class="text-white font-luxury mb-3">Thank you, ${name}!</h3>
                    <p class="text-muted">Your ${formType} request has been submitted successfully. A dedicated project manager from Siddhivinayak Designers will contact you within the next 24 hours.</p>
                    <a href="index.html" class="btn btn-outline-gold mt-4">Go Back Home</a>
                </div>
            `;
        });
    };

    handleFormSubmit(contactForm, 'Contact Form');
    handleFormSubmit(quoteForm, 'Quick Quote');

    // 8. Email Obfuscation Decoder
    const decodeEmail = () => {
        document.querySelectorAll('.email-link').forEach(link => {
            const user = link.getAttribute('data-user');
            const domain = link.getAttribute('data-domain');
            if (user && domain) {
                const email = `${user}@${domain}`;
                link.setAttribute('href', `mailto:${email}`);
                if (link.textContent.trim().includes('[at]')) {
                    link.textContent = email;
                }
            }
        });
        document.querySelectorAll('.email-text').forEach(el => {
            const user = el.getAttribute('data-user');
            const domain = el.getAttribute('data-domain');
            if (user && domain) {
                el.textContent = `${user}@${domain}`;
            }
        });
    };
    decodeEmail();
});
