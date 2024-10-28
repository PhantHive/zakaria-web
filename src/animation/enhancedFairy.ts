export function initEnhancedFairySystem(container: HTMLElement) {
    const FAIRY_COUNT = 5; // Reduced from 10
    const UPDATE_INTERVAL = 50; // ms between updates

    class EnhancedFairy {
        private element: HTMLElement;
        private x: number = 0;
        private y: number = 0;
        private dx: number = 0;
        private dy: number = 0;

        constructor() {
            this.element = document.createElement('div');
            this.element.className = 'fairy';
            this.element.innerHTML = `<div class="fairy-inner"></div>`;
            this.reset();
            container.appendChild(this.element);
        }

        private reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.dx = (Math.random() - 0.5) * 2;
            this.dy = (Math.random() - 0.5) * 2;
            this.updatePosition();
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (
                this.x < 0 ||
                this.x > window.innerWidth ||
                this.y < 0 ||
                this.y > window.innerHeight
            ) {
                this.reset();
            }

            this.updatePosition();
        }

        private updatePosition() {
            // Use transform instead of left/top for better performance
            this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        }
    }

    const fairies = Array.from(
        { length: FAIRY_COUNT },
        () => new EnhancedFairy(),
    );
    const interval = setInterval(() => {
        fairies.forEach((fairy) => fairy.update());
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
}
