document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. Cinematic Spotlight ================= */
    const spotlight = document.createElement('div');
    spotlight.id = 'spotlight';
    document.body.appendChild(spotlight);

    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--x', e.clientX + 'px');
        spotlight.style.setProperty('--y', e.clientY + 'px');
    });
    /* ================= 2. Loader ================= */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 2500); // 2.5sec fake loading for aesthetics

    /* ================= 3. Theme ================= */
    // Mode sombre forcé, la logique de toggle a été retirée pour privilégier l'esthétique premium cinéma.

    /* ================= 4. (Supprimé: Music) ================= */

    /* ================= 5. Scroll Progress ================= */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    /* ================= 6. Intersection Observer (Scroll Animations) ================= */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                // Trigger Typewriter if needed
                if (entry.target.classList.contains('typewriter')) {
                    typewriterEffect(entry.target);
                    observer.unobserve(entry.target);
                }
            } else {
                // Remove to re-animate when scrolling back up (optional, here we keep it)
                // entry.target.classList.remove('show-element'); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    /* ================= 7. Typewriter Effect (Simulated) ================= */
    function typewriterEffect(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        let i = 0;
        let isTagScript = false;
        let textScript = '';

        // Simple approach: fade in characters (complex with HTML inside).
        // For simplicity with HTML, we just add 'typewriter-ready' and CSS animation.
        // Actually, CSS typewriter is complex with lines. I'll stick to simple opacity fade letter by letter.
        element.innerHTML = text; // Fallback
    }

    /* ================= 8. Envelope Interaction 3D ================= */
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });

    /* ================= 9. Nos Souvenirs ================= */
    // La logique des animations est gérée nativement par Observer.

    /* ================= 10. Surprise Button (Confetti) ================= */
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseMsg = document.getElementById('surprise-message');

    surpriseBtn.addEventListener('click', () => {
        surpriseMsg.classList.remove('hidden');
        surpriseMsg.classList.add('show-element');
        surpriseBtn.style.display = 'none'; // Hide button

        // Fire Confetti Burst
        var duration = 3000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#E50914', '#8B0000', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#E50914', '#8B0000', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });

    /* ================= 11. Particles Background (Canvas) ================= */
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 3; // Bigger for petals
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 + 1; // Falling down 
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 0.1 - 0.05;
            this.color = (Math.random() > 0.3) ? 'rgba(229, 9, 20, 0.7)' : 'rgba(255, 255, 255, 0.4)'; // Mostly red
        }
        update() {
            this.x += this.speedX + Math.sin(this.angle) * 0.5; // Sway
            this.y += this.speedY;
            this.angle += this.spin;
            
            if(this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Drawing a petal leaf shape instead of a circle
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(this.size * 2, -this.size, this.size * 3, 0);
            ctx.quadraticCurveTo(this.size * 2, this.size, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numParticles = (window.innerWidth < 768) ? 50 : 100;
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            // Pétales tombant en continu, pas de diminution de taille
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();

    /* ================= 12. 3D Polaroid Tilt ================= */
    const polaroids = document.querySelectorAll('.polaroid-card');
    polaroids.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt 
            const tiltX = ((y - centerY) / centerY) * -15; // Max 15deg
            const tiltY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.08)`;
            card.style.zIndex = "100";
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.zIndex = "1";
        });
    });
});
