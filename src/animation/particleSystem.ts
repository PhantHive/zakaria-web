interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
}

export function initParticleSystem(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    const colors = ['#ff6b6b', '#ff9f9f', '#4ecdc4'];
    let animationFrameId: number;

    // Performance optimization variables
    const FPS = 30;
    const fpsInterval = 1000 / FPS;
    let lastTime = 0;

    // Responsive particle count
    const PARTICLE_COUNT = Math.min(
        50,
        Math.floor((window.innerWidth * window.innerHeight) / 50000),
    );

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Regenerate particles on resize
        particles = generateParticles();
    }

    function generateParticles(): Particle[] {
        return Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.3 + 0.1,
        }));
    }

    function updateParticle(particle: Particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Screen wrapping
        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;
    }

    function draw(currentTime: number) {
        animationFrameId = requestAnimationFrame(draw);

        // FPS limiting
        const elapsed = currentTime - lastTime;
        if (elapsed < fpsInterval) return;
        lastTime = currentTime - (elapsed % fpsInterval);

        ctx!.fillStyle = '#1a1a2e';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        ctx!.beginPath();
        particles.forEach((particle) => {
            updateParticle(particle);

            // Draw particle
            ctx!.moveTo(particle.x, particle.y);
            ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        });

        // Batch render all particles
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx!.fill();

        // Draw connections between nearby particles
        drawConnections();
    }

    function drawConnections() {
        const maxDistance = 100;
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.2;
                    ctx!.beginPath();
                    ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx!.lineWidth = 0.5;
                    ctx!.moveTo(p1.x, p1.y);
                    ctx!.lineTo(p2.x, p2.y);
                    ctx!.stroke();
                }
            });
        });
    }

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    particles = generateParticles();
    requestAnimationFrame(draw);

    // Cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
}
