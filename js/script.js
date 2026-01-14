/**
 * MARKO VERUOVIČ - Portfolio Script
 * Kompletní a vyčištěná verze: Cursor, Typing, Timeline & Reveal
 */

// 1. CUSTOM CURSOR
const cursor = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Zvětšení kurzoru na interaktivních prvcích
const interactiveElements = document.querySelectorAll('a, button, .card, .icon-box, .timeline-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});


// 2. TYPING EFFECT (Hero sekce)
const typingSpan = document.getElementById('typing');
const words = ["Business Developer", "Kreativec", "CEO Young Republic Digital", "Marketer"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingSpan.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

if (typingSpan) type();


// 3. TIMELINE & ROCKET LOGIC (Plynulá aktivace raketou)
const animateTimeline = () => {
    const timeline = document.querySelector('.timeline-container');
    const rocket = document.getElementById('timelineRocket');
    const items = document.querySelectorAll('.timeline-item');
    
    if (!timeline || !rocket) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Pokud je sekce v zorném poli
    if (rect.top < windowHeight && rect.bottom > 0) {
        // Výpočet postupu (0 až 100)
        let scrollPercent = ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100;
        
        // Korekce rychlosti pro lepší pocit z pohybu
        scrollPercent = Math.min(Math.max(scrollPercent * 1.15, 0), 100);
        
        // Pohyb rakety (Desktop = horizontálně, Mobil = vertikálně)
        if (window.innerWidth > 1024) {
            rocket.style.left = scrollPercent + "%";
            rocket.style.top = "50%";
        } else {
            rocket.style.top = scrollPercent + "%";
            rocket.style.left = "0";
        }

        // Aktivace bodů podle pozice rakety
        // stepPositions odpovídají procentům v CSS: 5, 25, 45, 65, 85
        const stepPositions = [5, 25, 45, 65, 85];
        
        items.forEach((item, idx) => {
            const targetPos = stepPositions[idx];
            
            // Pokud je raketa blízko bodu (+/- 12%), rozsviť ho
            if (Math.abs(scrollPercent - targetPos) < 12) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};

window.addEventListener('scroll', animateTimeline);


// 4. REVEAL ON SCROLL (Animace při skrollování)
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);


// 5. BURGER MENU
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(34, 34, 34, 0.95)';
            nav.style.padding = '2rem';
        }
    });
}

// 6. FORMULÁŘ
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Děkuji! Zpráva byla úspěšně odeslána.');
        contactForm.reset();
    });
}// DRAG TO SCROLL FOR CAROUSEL (PC)
const slider = document.querySelector('.dim-carousel');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Rychlost posunu
        slider.scrollLeft = scrollLeft - walk;
    });
}