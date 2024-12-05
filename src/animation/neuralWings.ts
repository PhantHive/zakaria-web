interface WingPoint {
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
    radius: number;
    color: string;
    connectionCount: number;
    featherAngle: number;
    featherLength: number;
    layer: number; // For layered feather effect
    intensity: number; // For glow intensity
    wingSpan: number; // For wing span
}

interface Connection {
    p1: WingPoint;
    p2: WingPoint;
    strength: number;
    life: number;
}

interface NeuralWingsOptions {
    centerElement: string;
}

export class NeuralWings {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width = 0;
    private height = 0;
    private particles: WingPoint[] = [];
    private connections: Connection[] = [];
    private wingOpening = 0;
    private centerX = 0;
    private centerY = 0;
    private animationFrame = 0;
    private readonly centerElementSelector: string;
    private resizeObserver: ResizeObserver;
    private centerElement: HTMLElement | null = null;
    private maxWingSpan: number = Math.min(this.width, this.height) * 0.4;

    constructor(canvas: HTMLCanvasElement, options: NeuralWingsOptions) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not get canvas context');
        this.ctx = context;

        this.centerElementSelector = options.centerElement;

        // Initialize ResizeObserver
        this.resizeObserver = new ResizeObserver(() => this.resize());

        this.setupCanvas();
        this.init();
        this.animate();
    }

    private readonly wingSettings = {
        feathers: {
            layers: 3,
            countPerLayer: 15,
            minLength: 100,
            maxLength: 200,
            spread: 40, // Angle spread in degrees
            gap: 50, // Gap between wings
            curve: 0.5, // Wing curvature
            peakIntensity: 0.2, // How pronounced the peaks are
        },
        colors: {
            primary: 'rgba(74, 144, 226, 0.8)',
            secondary: 'rgba(80, 227, 194, 0.6)',
            glow: 'rgba(74, 144, 226, 0.2)',
            connections: 'rgba(255, 255, 255, 0.15)',
        },
        animation: {
            wingOpenSpeed: 0.007,
            featherWaveSpeed: 0.002,
            featherWaveIntensity: 4,
            glowPulseSpeed: 0.001,
        },
    };

    private createWing(side: number, layer: number): WingPoint[] {
        const points: WingPoint[] = [];
        const { feathers } = this.wingSettings;
        const baseAngle = side > 0 ? 270 : 90; // Correct the base angle
        const layerOffset = layer * (feathers.spread / feathers.layers);
        const xOffset =
            side > 0
                ? this.maxWingSpan * 0.75 + feathers.gap / 2
                : -this.maxWingSpan * 0.75 - feathers.gap / 2; // Adjust the horizontal offset based on the gap
        const wingSpan = this.maxWingSpan * 1.4; // Increase the wing span

        for (let i = 0; i < feathers.countPerLayer; i++) {
            const progress = i / (feathers.countPerLayer - 1);
            const angle = baseAngle + progress * feathers.spread + layerOffset;
            const length =
                feathers.minLength +
                Math.sin(progress * Math.PI) *
                    (feathers.maxLength - feathers.minLength);

            // Calculate feather peak positions
            const radAngle = (angle * Math.PI) / 180;
            const curveOffset = Math.sin(progress * Math.PI) * feathers.curve;

            const targetX =
                this.centerX +
                xOffset +
                Math.cos(radAngle) * length * (1 + curveOffset);
            const targetY =
                this.centerY +
                Math.sin(radAngle) * length * (1 + curveOffset) * side;

            points.push({
                x: this.centerX + xOffset,
                y: this.centerY,
                vx: 0,
                vy: 0,
                targetX,
                targetY,
                radius: 2 + Math.random(),
                color: this.wingSettings.colors.primary,
                connectionCount: 0,
                featherAngle: angle,
                featherLength: length,
                layer,
                intensity: 0.5 + Math.random() * 0.5,
                wingSpan,
            });
        }

        return points;
    }

    private createConnections() {
        this.connections = [];
        const maxDistance = 270;
        const maxConnections = 3;

        // Group particles by wing side
        const leftWingParticles = this.particles.filter(
            (p) => p.x < this.centerX,
        );
        const rightWingParticles = this.particles.filter(
            (p) => p.x >= this.centerX,
        );

        // Create connections within each wing
        leftWingParticles.forEach((p1, i) => {
            if (p1.connectionCount >= maxConnections) return;

            leftWingParticles.slice(i + 1).forEach((p2) => {
                if (p2.connectionCount >= maxConnections) return;

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.connections.push({
                        p1,
                        p2,
                        strength: 1 - distance / maxDistance,
                        life: 1,
                    });
                    p1.connectionCount++;
                    p2.connectionCount++;
                }
            });
        });

        rightWingParticles.forEach((p1, i) => {
            if (p1.connectionCount >= maxConnections) return;

            rightWingParticles.slice(i + 1).forEach((p2) => {
                if (p2.connectionCount >= maxConnections) return;

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.connections.push({
                        p1,
                        p2,
                        strength: 1 - distance / maxDistance,
                        life: 1,
                    });
                    p1.connectionCount++;
                    p2.connectionCount++;
                }
            });
        });
    }

    private init() {
        // Create left and right wings with multiple layers
        for (let side of [-1, 1]) {
            // Left and right wings
            for (
                let layer = 0;
                layer < this.wingSettings.feathers.layers;
                layer++
            ) {
                this.particles.push(...this.createWing(side, layer));
            }
        }
    }

    private updateParticle(p: WingPoint) {
        const time = Date.now() * this.wingSettings.animation.featherWaveSpeed;
        const waveOffset =
            Math.sin(time + p.featherAngle) *
            this.wingSettings.animation.featherWaveIntensity *
            (1 - p.layer / this.wingSettings.feathers.layers);

        // Apply wave motion to target position
        const adjustedTargetX =
            p.targetX + waveOffset * Math.cos((p.featherAngle * Math.PI) / 180);
        const adjustedTargetY =
            p.targetY + waveOffset * Math.sin((p.featherAngle * Math.PI) / 180);

        // Spring physics
        const dx = (adjustedTargetX - p.x) * this.wingOpening;
        const dy = (adjustedTargetY - p.y) * this.wingOpening;

        const ax = dx * 0.08;
        const ay = dy * 0.08;

        p.vx = (p.vx + ax) * 0.95;
        p.vy = (p.vy + ay) * 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Update glow intensity
        p.intensity = 0.5 + Math.sin(time * 2 + p.featherAngle) * 0.3;
    }

    private drawFeather(p: WingPoint) {
        // Draw glow
        const gradient = this.ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 8,
        );
        gradient.addColorStop(0, `rgba(74, 144, 226, ${0.2 * p.intensity})`);
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(
            p.x - p.radius * 8,
            p.y - p.radius * 8,
            p.radius * 16,
            p.radius * 16,
        );

        // Draw point
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color;
        this.ctx.arc(p.x, p.y, p.radius * p.intensity, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private setupCanvas() {
        // Set canvas to full screen
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        // Get center element position
        const centerElement = document.querySelector(
            this.centerElementSelector,
        );
        if (centerElement) {
            const rect = centerElement.getBoundingClientRect();
            this.centerX = rect.left + rect.width / 2;
            this.centerY = rect.top + rect.height / 2;
            this.resizeObserver.observe(centerElement);
        } else {
            this.centerX = this.width / 2;
            this.centerY = this.height / 2;
        }

        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    private handleResize() {
        this.resize();
    }

    private resize() {
        // Update canvas dimensions
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        // Update center position
        const centerElement = document.querySelector(
            this.centerElementSelector,
        );
        if (centerElement) {
            const rect = centerElement.getBoundingClientRect();
            this.centerX = rect.left + rect.width / 2;
            this.centerY = rect.top + rect.height / 2;
        }

        // Reinitialize particles with new positions
        this.particles = [];
        this.init();
    }

    private update() {
        const rect = this.centerElement?.getBoundingClientRect();
        if (rect) {
            this.centerX = rect.left + rect.width / 2;
            this.centerY = rect.top + rect.height / 2;
        }

        this.wingOpening = Math.min(1, this.wingOpening + 0.005);

        this.particles.forEach((p) => {
            const dx = (p.targetX - this.centerX) * this.wingOpening;
            const dy = (p.targetY - this.centerY) * this.wingOpening;

            p.x += Math.sin(Date.now() * 0.001 + p.targetX) * 0.3;
            p.y += Math.cos(Date.now() * 0.001 + p.targetY) * 0.3;

            const ax = (this.centerX + dx - p.x) * 0.1;
            const ay = (this.centerY + dy - p.y) * 0.1;

            p.vx = (p.vx + ax) * 0.95;
            p.vy = (p.vy + ay) * 0.95;

            p.x += p.vx;
            p.y += p.vy;

            p.connectionCount = 0;
        });

        if (Math.random() < 0.1) this.createConnections();

        this.connections.forEach((c, i) => {
            c.life *= 0.95;
            if (c.life < 0.01) this.connections.splice(i, 1);
        });
    }

    private draw() {
        this.ctx.fillStyle = 'rgba(13, 25, 42, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw connections
        this.connections.forEach((c) => {
            const gradient = this.ctx.createLinearGradient(
                c.p1.x,
                c.p1.y,
                c.p2.x,
                c.p2.y,
            );
            gradient.addColorStop(0, c.p1.color);
            gradient.addColorStop(1, c.p2.color);

            this.ctx.beginPath();
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = c.strength * c.life * 2;
            this.ctx.moveTo(c.p1.x, c.p1.y);
            this.ctx.lineTo(c.p2.x, c.p2.y);
            this.ctx.stroke();
        });

        // Update and draw particles
        this.particles.forEach((p) => {
            this.updateParticle(p);
            this.drawFeather(p);
        });
    }

    private animate() {
        this.update();
        this.draw();
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    public destroy() {
        window.removeEventListener('resize', this.handleResize.bind(this));
        this.resizeObserver.disconnect();
        cancelAnimationFrame(this.animationFrame);

        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Clear arrays
        this.particles = [];
        this.connections = [];
    }
}
