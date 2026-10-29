/**
 * Cyber Matrix & Constellation Canvas Effect
 * Zero external libraries, high performance, mouse-interactive
 */

(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 85;
    const maxDistance = 140;
    const mouseRadius = 160;

    const mouse = {
        x: null,
        y: null
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            // Alternating cyan and emerald green colors for cybersecurity vibe
            this.color = Math.random() > 0.6 ? 'rgba(0, 255, 157, ' : 'rgba(0, 240, 255, ';
            this.baseAlpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 1.5;
                    this.y -= Math.sin(angle) * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.baseAlpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color.includes('255, 157') ? '#00ff9d' : '#00f0ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectLines() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.hypot(dx, dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.25;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Line to cursor
            if (mouse.x !== null && mouse.y !== null) {
                const mdx = particles[a].x - mouse.x;
                const mdy = particles[a].y - mouse.y;
                const mDist = Math.hypot(mdx, mdy);
                if (mDist < 120) {
                    const mAlpha = (1 - mDist / 120) * 0.4;
                    ctx.strokeStyle = `rgba(0, 255, 157, ${mAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectLines();
        requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();
})();

