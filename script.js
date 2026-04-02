document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle Font Awesome icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Terminal Typing Effect
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Initializing...",
        "Establishing connection...",
        "Access granted.",
        "Welcome to my portfolio.",
        "Compiling skills...",
        "Executing: ./show_projects.sh"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingText) return;

        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Faster deleting
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = Math.random() * 50 + 50; // Randomize typing speed for realism
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after short delay
    setTimeout(type, 1000);

    // Matrix Rain Effect (Optional, subtle background effect)
    // Could be added later if desired, but kept simple for now per requirements.

    // Smooth Scrolling for internal links (handled largely by CSS, JS as fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Advanced Background Animation (Matrix Rain) ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$₹&%*<>?'.split('');
        const fontSize = 16;
        let columns = width / fontSize;
        let drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(5, 11, 20, 0.08)'; // Slightly transparent to show trails
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0f8'; // Neon green
            ctx.font = fontSize + 'px Fira Code';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Handle Resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) drops[x] = 1;
        });

        setInterval(drawMatrix, 40);
    }
});
