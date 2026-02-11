// --- 1. Custom Cursor Logic ---
const cursor = document.getElementById('cursor');
const links = document.querySelectorAll('.nav-link, button, input, select, textarea, .gallery-item');

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        if (link.classList.contains('gallery-item')) {
            cursor.classList.add('plus');
        }
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursor.classList.remove('plus');
    });
});

// --- 2. Horizontal Scroll Parallax & Progress ---
const scroller = document.getElementById('mainScroller');
const progressBar = document.getElementById('progressBar');
const nav = document.getElementById('navbar');
const galleryItems = document.querySelectorAll('.gallery-item');

scroller.addEventListener('scroll', () => {
    const scrollLeft = scroller.scrollLeft;
    const maxScroll = scroller.scrollWidth - window.innerWidth;
    const progress = (scrollLeft / maxScroll) * 100;
    
    progressBar.style.width = progress + '%';

    // Nav background transition
    if (scrollLeft > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Parallax for gallery images
    galleryItems.forEach(item => {
        const wrapper = item.querySelector('.gallery-img-wrapper');
        const itemRect = item.getBoundingClientRect();
        const containerRect = scroller.getBoundingClientRect();
        
        // Calculate position relative to viewport
        const relativeX = itemRect.left - containerRect.left;
        // Move the background image slightly slower than foreground
        const moveX = relativeX * 0.15; 
        wrapper.style.transform = `translateX(${moveX}px)`;
    });
});

// --- 3. Intersection Observer for Animations ---
const observerOptions = {
    threshold: 0.2
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-slide').forEach(el => {
    revealObserver.observe(el);
});

// CTA Scroll trigger
document.querySelector('.gallery-trigger').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

// Mobile Fix: Remove snap on small screens if scroller layout changes
const checkMobile = () => {
    if (window.innerWidth < 768) {
        scroller.style.overflowX = 'hidden';
        scroller.style.overflowY = 'auto';
    } else {
        scroller.style.overflowX = 'scroll';
        scroller.style.overflowY = 'hidden';
    }
};

window.addEventListener('resize', checkMobile);
checkMobile();

// Form feedback mock
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "PROJECT INITIALIZED ✓";
    btn.style.backgroundColor = "#22c55e";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        e.target.reset();
    }, 3000);
});
