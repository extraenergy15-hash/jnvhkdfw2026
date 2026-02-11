// Custom Cursor Logic
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const hoverables = document.querySelectorAll('a, button, .gallery-item, input, select, textarea');
hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        if(item.classList.contains('gallery-item')) {
            cursor.classList.add('plus');
        }
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursor.classList.remove('plus');
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggering effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Horizontal Parallax Effect for Gallery
const scroller = document.getElementById('main-scroller');
const parallaxImages = document.querySelectorAll('.gallery-img');

scroller.addEventListener('scroll', () => {
    const scrollLeft = scroller.scrollLeft;
    const viewportWidth = window.innerWidth;

    parallaxImages.forEach(img => {
        const parent = img.parentElement;
        const parentOffset = parent.offsetLeft;
        
        // Calculate position relative to viewport
        const relativePos = parentOffset - scrollLeft;
        
        if (relativePos < viewportWidth && relativePos > -400) {
            const movement = (relativePos / viewportWidth) * 40; // Adjust for intensity
            img.style.transform = `translateX(${movement}px)`;
        }
    });

    // Nav background transition
    const nav = document.getElementById('navbar');
    if (scrollLeft > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Form Handling
const form = document.getElementById('architectForm');
const messageBox = document.getElementById('message-box');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show custom success message
    messageBox.classList.add('show');
    form.reset();

    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
});

// Smooth Section Snapping for Nav Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (window.innerWidth > 768) {
            scroller.scrollTo({
                left: targetSection.offsetLeft,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initial check for mobile to disable horizontal JS features
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        scroller.style.overflowX = 'visible';
    } else {
        scroller.style.overflowX = 'scroll';
    }
});
