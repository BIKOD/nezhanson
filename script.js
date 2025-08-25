// Professional JavaScript for Nazhan Zaatar Factory
class NazhanWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupProductFiltering();
        this.setupSmoothScrolling();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupHeaderEffects();
        this.setupInteractiveElements();
        this.setupFloatingElements();
        this.setupServiceWorker();
        this.setupLoadingScreen();
        this.setupPerformanceOptimizations();
        this.setupModalKeyboardSupport();
        this.setupMobileFrame();
        this.setupShoppingCart();
        this.setupCheckout();
        this.renderMyOrders();
        this.setupAuth();
        this.renderAdmin();
    }

    // Mobile Navigation with Advanced Animations
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add stagger animation to menu items
            navLinks.forEach((link, index) => {
                link.style.animationDelay = `${index * 0.1}s`;
                link.classList.toggle('slide-in');
            });
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navLinks.forEach(l => l.classList.remove('slide-in'));
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navLinks.forEach(l => l.classList.remove('slide-in'));
            }
        });
    }

    // Advanced Product Filtering with Smooth Transitions
    setupProductFiltering() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const productCards = document.querySelectorAll('.product-card');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons with animation
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'scale(1)';
                });
                
                // Add active class to clicked button with scale effect
                button.classList.add('active');
                button.style.transform = 'scale(1.05)';
                
                const category = button.getAttribute('data-category');
                
                // Animate product cards with stagger effect
                productCards.forEach((card, index) => {
                    const shouldShow = category === 'all' || card.getAttribute('data-category') === category;
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.classList.add('fade-in-scale');
                    } else {
                        card.classList.remove('fade-in-scale');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Enhanced Smooth Scrolling with Offset
    setupSmoothScrolling() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
            });
        }
    });
});
    }

    // Advanced Contact Form with Real-time Validation
    setupContactForm() {
const contactForm = document.getElementById('contactForm');
        const formInputs = contactForm?.querySelectorAll('input, textarea');

        // Real-time validation
        formInputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
            if (this.validateForm(contactForm)) {
                this.submitForm(contactForm);
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'الاسم يجب أن يكون 3 أحرف على الأقل';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
                }
                break;
            case 'phone':
                const phoneRegex = /^(\+963|0)?[0-9]{9}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'يرجى إدخال رقم هاتف صحيح';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#f44336';
        field.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.9rem;
            margin-top: 5px;
            animation: slideDown 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Advanced Scroll Animations with Intersection Observer
    setupScrollAnimations() {
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
                    
                    // Add stagger effect for multiple elements
                    if (entry.target.classList.contains('feature')) {
                        const features = entry.target.parentNode.children;
                        Array.from(features).forEach((feature, index) => {
                            feature.style.animationDelay = `${index * 0.2}s`;
                        });
                    }
        }
    });
}, observerOptions);

// Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature, .product-card, .contact-item, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    }

    // Dynamic Header Effects
    setupHeaderEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
    } else {
                header.style.transform = 'translateY(0)';
    }

            lastScrollY = currentScrollY;
});
    }

    // Interactive Elements with Advanced Effects
    setupInteractiveElements() {
        // Product card interactions
        const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-20px) scale(1.03)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // Button ripple effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });

        // Category button effects
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                if (!button.classList.contains('active')) {
                    button.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Setup purchase functionality
        this.setupPurchaseSystem();
    }

    // Purchase System
    setupPurchaseSystem() {
        const buyButtons = document.querySelectorAll('.buy-btn');
        const productPrices = document.querySelectorAll('.product-price[data-price]');
        const purchaseModal = document.getElementById('purchaseModal');
        const closeModal = document.getElementById('closePurchaseModal');
        const decreaseBtn = document.getElementById('decreaseQuantity');
        const increaseBtn = document.getElementById('increaseQuantity');
        const quantityDisplay = document.getElementById('quantityDisplay');
        const totalPrice = document.getElementById('totalPrice');
        const confirmPurchase = document.getElementById('confirmPurchase');
        const whatsappPurchase = document.getElementById('whatsappPurchase');

        let currentProduct = null;
        let currentPrice = 0;
        let quantity = 1;

        // Buy button click
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = button.getAttribute('data-product');
                const productName = button.getAttribute('data-name');
                const price = parseInt(button.getAttribute('data-price'));
                
                this.openPurchaseModal(productId, productName, price);
            });
        });

        // Product price click
        productPrices.forEach(priceElement => {
            priceElement.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = priceElement.closest('.product-card');
                const productId = productCard.getAttribute('data-product');
                const productName = productCard.querySelector('h3').textContent;
                const price = parseInt(priceElement.getAttribute('data-price'));
                
                this.openPurchaseModal(productId, productName, price);
            });
        });

        // Product card click
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on buy button or price
                if (e.target.closest('.buy-btn') || e.target.closest('.product-price')) {
                    return;
                }
                
                const productId = card.getAttribute('data-product');
                const productName = card.querySelector('h3').textContent;
                const price = parseInt(card.getAttribute('data-price'));
                
                this.openPurchaseModal(productId, productName, price);
    });
});

        // Close modal
        closeModal.addEventListener('click', () => {
            this.closePurchaseModal();
        });

        // Close modal when clicking outside
        purchaseModal.addEventListener('click', (e) => {
            if (e.target === purchaseModal) {
                this.closePurchaseModal();
            }
        });

        // Quantity controls
        decreaseBtn.addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity--;
                this.updateQuantity();
            }
        });

        increaseBtn.addEventListener('click', () => {
            this.quantity++;
            this.updateQuantity();
        });

        // Confirm purchase
        confirmPurchase.addEventListener('click', () => {
            this.processPurchase();
        });

        // WhatsApp purchase
        whatsappPurchase.addEventListener('click', () => {
            this.processWhatsAppPurchase();
        });

        // Store references for use in methods
        this.purchaseModal = purchaseModal;
        this.quantityDisplay = quantityDisplay;
        this.totalPrice = totalPrice;
    }

    openPurchaseModal(productId, productName, price) {
        this.currentProduct = productId;
        this.currentPrice = price;
        this.quantity = 1;

        // Update modal content
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalProductPrice').textContent = `${price.toLocaleString()} ل.س`;
        this.updateQuantity();

        // Show modal with animation
        this.purchaseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first interactive element for accessibility
        setTimeout(() => {
            document.getElementById('decreaseQuantity').focus();
        }, 300);
    }

    closePurchaseModal() {
        this.purchaseModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset quantity
        this.quantity = 1;
        this.updateQuantity();
    }

    updateQuantity() {
        this.quantityDisplay.textContent = this.quantity;
        const total = this.currentPrice * this.quantity;
        this.totalPrice.textContent = `المجموع: ${total.toLocaleString()} ل.س`;
    }

    processPurchase() {
        const total = this.currentPrice * this.quantity;
        const productName = document.getElementById('modalProductName').textContent;
        
        // Add ripple effect to confirm button
        const confirmBtn = document.getElementById('confirmPurchase');
        this.createRippleEffect({ clientX: confirmBtn.offsetLeft + confirmBtn.offsetWidth/2, clientY: confirmBtn.offsetTop + confirmBtn.offsetHeight/2 }, confirmBtn);
        
        // Add to cart instead of just showing notification
        this.addToCart(this.currentProduct, productName, this.currentPrice, this.getProductImage(this.currentProduct), this.quantity);
        
        // Close modal with delay for better UX
        setTimeout(() => {
            this.closePurchaseModal();
        }, 500);
        
        // Here you would typically send the order to your backend
        console.log('Purchase processed:', {
            productId: this.currentProduct,
            productName: productName,
            quantity: this.quantity,
            price: this.currentPrice,
            total: total,
            timestamp: new Date().toISOString()
        });
    }
    
    // Get product image source
    getProductImage(productId) {
        const productCard = document.querySelector(`[data-product="${productId}"]`);
        if (productCard) {
            const img = productCard.querySelector('img');
            return img ? img.src : '';
        }
        return '';
    }

    savePurchaseToHistory(purchase) {
        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
        purchaseHistory.push(purchase);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    }

    processWhatsAppPurchase() {
        const total = this.currentPrice * this.quantity;
        const productName = document.getElementById('modalProductName').textContent;
        const message = `مرحباً! أريد طلب:
المنتج: ${productName}
الكمية: ${this.quantity}
السعر الإجمالي: ${total.toLocaleString()} ل.س

هل يمكنني الحصول على مزيد من المعلومات حول طرق الدفع والتوصيل؟`;

        const whatsappUrl = `https://wa.me/963XXXXXXXXX?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Add ripple effect to WhatsApp button
        const whatsappBtn = document.getElementById('whatsappPurchase');
        this.createRippleEffect({ clientX: whatsappBtn.offsetLeft + whatsappBtn.offsetWidth/2, clientY: whatsappBtn.offsetTop + whatsappBtn.offsetHeight/2 }, whatsappBtn);
        
        this.closePurchaseModal();
        this.showNotification('تم فتح واتساب لإتمام الطلب!', 'success');
    }

    // Add keyboard support for modal
    setupModalKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (this.purchaseModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closePurchaseModal();
                } else if (e.key === 'Enter') {
                    this.processPurchase();
                }
            }
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Floating Elements Setup
    setupFloatingElements() {
        this.createWhatsAppButton();
        this.createScrollToTopButton();
        this.createLoadingIndicator();
    }

    createWhatsAppButton() {
const whatsappButton = document.createElement('div');
        whatsappButton.className = 'floating-whatsapp';
whatsappButton.innerHTML = `
            <a href="https://wa.me/963XXXXXXXXX" target="_blank" aria-label="تواصل معنا عبر واتساب">
                <i class="fab fa-whatsapp"></i>
                <span class="tooltip">تواصل معنا</span>
            </a>
        `;
        
        document.body.appendChild(whatsappButton);
    }

    createScrollToTopButton() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.className = 'scroll-to-top';
        scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopButton.setAttribute('aria-label', 'العودة إلى الأعلى');
        
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollToTopButton);

        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
    }

    createLoadingIndicator() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>جاري التحميل...</p>
            </div>
        `;
        
        document.body.appendChild(loading);

        // Hide loading after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => loading.remove(), 500);
            }, 1000);
        });
    }

    // Service Worker Registration
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered successfully:', registration);
                    })
                    .catch(error => {
                        console.log('Service Worker registration failed:', error);
                    });
            });
        }
    }

    // Loading Screen
    setupLoadingScreen() {
        // Add loading screen styles
        const loadingStyles = document.createElement('style');
        loadingStyles.textContent = `
            .loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a4d2e 0%, #2d7d32 50%, #388e3c 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }

            .loading.hidden {
                opacity: 0;
                pointer-events: none;
            }

            .loading-content {
                text-align: center;
                color: white;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid #ffd700;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .floating-whatsapp {
        position: fixed;
        bottom: 20px;
        left: 20px;
                z-index: 1000;
            }

            .floating-whatsapp a {
        width: 60px;
        height: 60px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-decoration: none;
        font-size: 30px;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        transition: all 0.3s ease;
        animation: bounce 2s infinite;
                position: relative;
            }

            .floating-whatsapp a:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
            }

            .tooltip {
                position: absolute;
                right: 70px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .floating-whatsapp a:hover .tooltip {
                opacity: 1;
                visibility: visible;
            }

            .scroll-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: #1a4d2e;
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(26, 77, 46, 0.3);
            }

            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }

            .scroll-to-top:hover {
                transform: scale(1.1);
                background: #2d7d32;
            }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fade-in-scale {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .slide-in {
                animation: slideInFromRight 0.5s ease forwards;
            }

            @keyframes slideInFromRight {
                from {
    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(loadingStyles);
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Enhanced image loading with error handling
        this.setupImageLoading();
        
        // Debounce scroll events
        let scrollTimeout;
window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based operations
            }, 16); // ~60fps
        });
    }

    setupImageLoading() {
        const productImages = document.querySelectorAll('.product-image img');
        
        productImages.forEach(img => {
            const imageContainer = img.parentElement;
            
            // Add loading class
            imageContainer.classList.add('loading');
            
            // Handle image load
            img.addEventListener('load', () => {
                imageContainer.classList.remove('loading');
                imageContainer.classList.add('loaded');
                
                // Add fade-in animation
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
            });
            
            // Handle image error
            img.addEventListener('error', () => {
                imageContainer.classList.remove('loading');
                imageContainer.classList.add('error');
                
                // Show fallback icon
                const overlay = imageContainer.querySelector('.image-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.background = 'var(--gradient-secondary)';
                }
            });
    });
}

    // Enhanced Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${this.getNotificationIcon(type)}"></i>
                </div>
                <div class="notification-text">
                    <span class="notification-message">${message}</span>
                </div>
                <button class="notification-close" aria-label="إغلاق">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-progress"></div>
        `;
        
        // Add enhanced styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 0;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        `;
        
        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                padding: 16px 20px;
                gap: 12px;
            }

            .notification-icon {
                font-size: 20px;
                width: 24px;
                text-align: center;
            }

            .notification-text {
                flex: 1;
            }

            .notification-message {
                font-size: 14px;
                line-height: 1.4;
            }

            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s ease;
            }

            .notification-close:hover {
                background: rgba(255,255,255,0.1);
            }

            .notification-progress {
                height: 3px;
                background: rgba(255,255,255,0.3);
                width: 100%;
                animation: progress 5s linear;
            }

            @keyframes slideInNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }
        `;
        document.head.appendChild(notificationStyles);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutNotification 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutNotification 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    getNotificationColor(type) {
        switch (type) {
            case 'success': return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            case 'error': return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
            case 'warning': return 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
            default: return 'linear-gradient(135deg, #2196F3 0%, #1976d2 100%)';
        }
    }
    
    // Mobile Frame Setup
    setupMobileFrame() {
        // Update mobile time
        this.updateMobileTime();
        setInterval(() => this.updateMobileTime(), 60000); // Update every minute
        
        // Add mobile frame animations
        this.addMobileFrameAnimations();
    }
    
    updateMobileTime() {
        const timeElement = document.getElementById('mobileTime');
        if (timeElement) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
            timeElement.textContent = timeString;
        }
    }
    
    addMobileFrameAnimations() {
        // Add subtle animations to mobile frame elements
        const statusBar = document.querySelector('.mobile-status-bar');
        const homeIndicator = document.querySelector('.home-indicator');
        
        if (statusBar) {
            statusBar.style.opacity = '0';
            setTimeout(() => {
                statusBar.style.transition = 'opacity 0.5s ease';
                statusBar.style.opacity = '1';
            }, 100);
        }
        
        if (homeIndicator) {
            homeIndicator.style.transform = 'translateX(-50%) scale(0.8)';
            setTimeout(() => {
                homeIndicator.style.transition = 'transform 0.5s ease';
                homeIndicator.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }
    }
    
    // Shopping Cart Management
    setupShoppingCart() {
        this.cart = JSON.parse(localStorage.getItem('nazhanCart')) || [];
        this.updateCartDisplay();
        
        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const closeCart = document.getElementById('closeCart');
        
        cartToggle?.addEventListener('click', () => {
            this.openCart();
        });
        
        closeCart?.addEventListener('click', () => {
            this.closeCart();
        });
        
        cartOverlay?.addEventListener('click', () => {
            this.closeCart();
        });
        
        // Clear cart
        const clearCartBtn = document.getElementById('clearCart');
        clearCartBtn?.addEventListener('click', () => {
            this.clearCart();
        });
        
        // Checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn?.addEventListener('click', () => {
            this.openCheckout();
        });

        // Add event listeners for cart item controls
        this.setupCartItemControls();
    }

    // Setup cart item controls
    setupCartItemControls() {
        // Use event delegation for cart item controls
        const cartItems = document.getElementById('cartItems');
        if (cartItems) {
            cartItems.addEventListener('click', (e) => {
                const target = e.target;
                
                // Handle quantity controls
                if (target.classList.contains('quantity-control')) {
                    const productId = target.getAttribute('data-product-id');
                    const action = target.getAttribute('data-action');
                    const item = this.cart.find(item => item.id === productId);
                    
                    if (item) {
                        if (action === 'decrease') {
                            this.updateCartItemQuantity(productId, item.quantity - 1);
                        } else if (action === 'increase') {
                            this.updateCartItemQuantity(productId, item.quantity + 1);
                        }
                    }
                }
                
                // Handle remove button
                if (target.classList.contains('cart-item-remove') || target.closest('.cart-item-remove')) {
                    const productId = target.getAttribute('data-product-id') || target.closest('.cart-item-remove').getAttribute('data-product-id');
                    if (productId) {
                        this.removeFromCart(productId);
                    }
                }
            });
        }
    }
    
    // Add item to cart
    addToCart(productId, productName, price, imageSrc, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: productName,
                price: price,
                image: imageSrc,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`تم إضافة ${productName} إلى سلة المشتريات!`, 'success');
    }
    
    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    // Update item quantity
    updateCartItemQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }
    
    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.closeCart();
        this.showNotification('تم إفراغ سلة المشتريات', 'info');
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('nazhanCart', JSON.stringify(this.cart));
    }
    
    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartBadge = document.getElementById('cartBadge');
        const cartTotalPrice = document.getElementById('cartTotalPrice');
        const cartItemCount = document.getElementById('cartItemCount');
        
        if (!cartItems) return;
        
        // Update cart badge
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>سلة المشتريات فارغة</p>
                    <small>اضغط على "شراء الآن" لإضافة منتجات</small>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString()} ل.س</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-control" data-product-id="${item.id}" data-action="decrease">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-control" data-product-id="${item.id}" data-action="increase">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-product-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
        
        // Update totals
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalPrice) cartTotalPrice.textContent = `${totalPrice.toLocaleString()} ل.س`;
        if (cartItemCount) cartItemCount.textContent = totalItems;
    }
    
    // Open cart
    openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close cart
    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Checkout system
    setupCheckout() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const closeCheckoutModal = document.getElementById('closeCheckoutModal');
        const backToCart = document.getElementById('backToCart');
        const confirmOrder = document.getElementById('confirmOrder');
        
        checkoutBtn?.addEventListener('click', () => {
            this.openCheckout();
        });
        
        closeCheckoutModal?.addEventListener('click', () => {
            this.closeCheckout();
        });
        
        backToCart?.addEventListener('click', () => {
            this.closeCheckout();
            this.openCart();
        });
        
        confirmOrder?.addEventListener('click', () => {
            this.processOrder();
        });
        
        // Close checkout when clicking outside
        checkoutModal?.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                this.closeCheckout();
            }
        });
    }
    
    // Open checkout
    openCheckout() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            this.updateCheckoutDisplay();
            checkoutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close checkout
    closeCheckout() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Update checkout display
    updateCheckoutDisplay() {
        const orderSummary = document.getElementById('orderSummary');
        const subtotal = document.getElementById('subtotal');
        const finalTotal = document.getElementById('finalTotal');
        
        if (!orderSummary) return;
        
        // Update order summary
        orderSummary.innerHTML = this.cart.map(item => `
            <div class="order-item">
                <span class="order-item-name">${item.name} × ${item.quantity}</span>
                <span class="order-item-total">${(item.price * item.quantity).toLocaleString()} ل.س</span>
            </div>
        `).join('');
        
        // Update totals
        const subtotalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 5000;
        const finalTotalAmount = subtotalAmount + deliveryFee;
        
        if (subtotal) subtotal.textContent = `${subtotalAmount.toLocaleString()} ل.س`;
        if (finalTotal) finalTotal.textContent = `${finalTotalAmount.toLocaleString()} ل.س`;
    }
    
    // Process order
    processOrder() {
        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
        
        if (!customerName || !customerPhone || !customerAddress) {
            this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Generate order number
        const orderNumber = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Create order object
        const order = {
            orderNumber: orderNumber,
            customer: {
                name: customerName,
                phone: customerPhone,
                email: customerEmail,
                address: customerAddress
            },
            items: this.cart,
            paymentMethod: paymentMethod,
            subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            deliveryFee: 5000,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5000,
            date: new Date().toLocaleString('ar-SA'),
            status: 'pending'
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('nazhanOrders') || '[]');
        orders.unshift(order);
        localStorage.setItem('nazhanOrders', JSON.stringify(orders));
        
        // Clear cart
        this.clearCart();
        
        // Close checkout
        this.closeCheckout();
        
        // Show confirmation
        this.showOrderConfirmation(order);
        this.renderMyOrders();
        
        // Send WhatsApp message
        this.sendWhatsAppOrder(order);
    }
    
    // Show order confirmation
    showOrderConfirmation(order) {
        const confirmationModal = document.getElementById('orderConfirmationModal');
        const orderNumber = document.getElementById('orderNumber');
        const finalOrderDetails = document.getElementById('finalOrderDetails');
        const closeConfirmation = document.getElementById('closeConfirmation');
        const downloadInvoice = document.getElementById('downloadInvoice');
        
        if (orderNumber) orderNumber.textContent = order.orderNumber;
        
        if (finalOrderDetails) {
            finalOrderDetails.innerHTML = `
                <div><strong>اسم العميل:</strong> ${order.customer.name}</div>
                <div><strong>رقم الهاتف:</strong> ${order.customer.phone}</div>
                <div><strong>العنوان:</strong> ${order.customer.address}</div>
                <div><strong>طريقة الدفع:</strong> ${this.getPaymentMethodText(order.paymentMethod)}</div>
                <div><strong>المجموع:</strong> ${order.total.toLocaleString()} ل.س</div>
                <div><strong>التاريخ:</strong> ${order.date}</div>
            `;
        }
        
        closeConfirmation?.addEventListener('click', () => {
            this.closeOrderConfirmation();
        });
        
        downloadInvoice?.addEventListener('click', () => {
            this.downloadInvoice(order);
        });
        
        confirmationModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-close for UX
        setTimeout(() => {
            this.closeOrderConfirmation();
        }, 3500);
    }
    
    // Close order confirmation
    closeOrderConfirmation() {
        const confirmationModal = document.getElementById('orderConfirmationModal');
        if (confirmationModal) {
            confirmationModal.classList.remove('active');
        }
    }

    // ---------- Auth ----------
    setupAuth() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const authModal = document.getElementById('authModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const adminCredentials = document.getElementById('adminCredentials');
        const confirmLogin = document.getElementById('confirmLogin');

        // toggle admin credentials on role select
        document.querySelectorAll('input[name="role"]').forEach(r => {
            r.addEventListener('change', (e) => {
                const role = e.target.value;
                adminCredentials.style.display = role === 'admin' ? 'block' : 'none';
            });
        });

        loginBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeAuthModal?.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        confirmLogin?.addEventListener('click', () => {
            const role = document.querySelector('input[name="role"]:checked')?.value || 'customer';

            if (role === 'admin') {
                const username = document.getElementById('adminUsername').value.trim();
                const password = document.getElementById('adminPassword').value.trim();
                // simple demo credentials
                if (username !== 'admin' || password !== '1234') {
                    this.showNotification('بيانات المدير غير صحيحة', 'error');
                    return;
                }
            }

            localStorage.setItem('nazhanRole', role);
            this.showNotification('تم تسجيل الدخول', 'success');
            authModal.classList.remove('active');
            document.body.style.overflow = '';
            this.renderAdmin();
            this.updateAuthUI();
        });

        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('nazhanRole');
            this.showNotification('تم تسجيل الخروج', 'info');
            this.renderAdmin();
            this.updateAuthUI();
        });

        this.updateAuthUI();
    }

    updateAuthUI() {
        const role = localStorage.getItem('nazhanRole') || 'customer';
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        if (role === 'admin') {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = '';
        } else {
            loginBtn.style.display = '';
            logoutBtn.style.display = 'none';
        }
    }

    // ---------- Admin ----------
    renderAdmin() {
        const role = localStorage.getItem('nazhanRole') || 'customer';
        const adminSection = document.getElementById('adminDashboard');
        const adminOrdersList = document.getElementById('adminOrdersList');
        const addProductBtn = document.getElementById('addProductBtn');

        if (!adminSection) return;

        if (role !== 'admin') {
            adminSection.style.display = 'none';
            return;
        }

        // show admin section
        adminSection.style.display = '';

        // render orders for admin with status controls
        const orders = JSON.parse(localStorage.getItem('nazhanOrders') || '[]');
        adminOrdersList.innerHTML = orders.map((o, idx) => `
            <div class="order-card">
                <div class="order-card-header">
                    <div class="order-number">${o.orderNumber}</div>
                    <div class="order-date">${o.date}</div>
                </div>
                <div class="order-items">${o.items.map(i => `${i.name} × ${i.quantity}`).join('، ')}</div>
                <div class="order-total">${o.total.toLocaleString()} ل.س</div>
                <div class="order-status" style="margin-top:8px">
                    <select data-index="${idx}" class="status-select">
                        <option value="waiting" ${o.status==='waiting'?'selected':''}>قيد الانتظار</option>
                        <option value="onway" ${o.status==='onway'?'selected':''}>في الطريق</option>
                        <option value="cancelled" ${o.status==='cancelled'?'selected':''}>تم إلغاؤه</option>
                    </select>
                </div>
            </div>
        `).join('');

        // status change
        adminOrdersList.querySelectorAll('.status-select').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                const orders = JSON.parse(localStorage.getItem('nazhanOrders') || '[]');
                orders[idx].status = e.target.value;
                localStorage.setItem('nazhanOrders', JSON.stringify(orders));
                this.renderMyOrders();
                this.renderAdmin();
                this.showNotification('تم تحديث حالة الطلب', 'success');
            });
        });

        // add product handler
        addProductBtn?.addEventListener('click', () => {
            const name = document.getElementById('newProductName').value.trim();
            const price = parseInt(document.getElementById('newProductPrice').value, 10) || 0;
            const image = document.getElementById('newProductImage').value.trim();
            if (!name || !price || !image) {
                this.showNotification('يرجى إدخال بيانات المنتج كاملة', 'error');
                return;
            }
            // For demo: add to local product store
            const products = JSON.parse(localStorage.getItem('nazhanProducts') || '[]');
            const id = name.toLowerCase().replace(/\s+/g,'-') + '-' + Date.now();
            products.push({ id, name, price, image });
            localStorage.setItem('nazhanProducts', JSON.stringify(products));
            this.showNotification('تم إضافة المنتج (تجريبي محلي)', 'success');
        });
    }
    
    // Get payment method text
    getPaymentMethodText(method) {
        const methods = {
            'cash': 'نقداً عند الاستلام',
            'bank': 'تحويل بنكي',
            'mobile': 'محفظة إلكترونية'
        };
        return methods[method] || method;
    }
    
    // Send WhatsApp order
    sendWhatsAppOrder(order) {
        const message = `مرحباً! طلب جديد:

رقم الطلب: ${order.orderNumber}
العميل: ${order.customer.name}
الهاتف: ${order.customer.phone}
العنوان: ${order.customer.address}

المنتجات:
${order.items.map(item => `- ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ل.س`).join('\n')}

المجموع: ${order.total.toLocaleString()} ل.س
طريقة الدفع: ${this.getPaymentMethodText(order.paymentMethod)}
التاريخ: ${order.date}`;

        const whatsappUrl = `https://wa.me/963XXXXXXXXX?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    // Download invoice
    downloadInvoice(order) {
        const invoiceContent = `
معمل الزعتر النزهان
فاتورة طلب

رقم الطلب: ${order.orderNumber}
التاريخ: ${order.date}

معلومات العميل:
الاسم: ${order.customer.name}
الهاتف: ${order.customer.phone}
العنوان: ${order.customer.address}

المنتجات:
${order.items.map(item => `${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ل.س`).join('\n')}

المجموع الفرعي: ${order.subtotal.toLocaleString()} ل.س
رسوم التوصيل: ${order.deliveryFee.toLocaleString()} ل.س
المجموع النهائي: ${order.total.toLocaleString()} ل.س

طريقة الدفع: ${this.getPaymentMethodText(order.paymentMethod)}

شكراً لكم على ثقتكم بنا
معمل الزعتر النزهان
        `;
        
        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `فاتورة_${order.orderNumber}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NazhanWebsite();
    console.log('معمل الزعتر النزهان - الموقع جاهز! 🍃');
});

// Add slideOutNotification animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutNotification {
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
document.head.appendChild(slideOutStyle);
