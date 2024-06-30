export class InkCounter {
  private clickCount: number = 0;
  private counterElement: HTMLElement;
  private countDisplay: HTMLElement;
  private inkSplatter: HTMLElement;

  constructor() {
    this.counterElement = document.createElement('div');
    this.counterElement.className = 'ink-counter';

    this.countDisplay = document.createElement('div');
    this.countDisplay.className = 'count-display';

    this.inkSplatter = document.createElement('div');
    this.inkSplatter.className = 'ink-splatter';

    this.counterElement.appendChild(this.inkSplatter);
    this.counterElement.appendChild(this.countDisplay);

    this.updateCounter();
  }

  incrementCount() {
    this.clickCount++;
    this.updateCounter();
    this.animateInkSplatter();
  }

  private updateCounter() {
    this.countDisplay.textContent = `${this.clickCount}`;
  }

  private animateInkSplatter() {
    const colors = ['#ff4e50', '#fc913a', '#f9d62e', '#8bc34a', '#00bcd4', '#7e57c2'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    this.inkSplatter.style.setProperty('--splatter-color', color);
    this.inkSplatter.classList.remove('animate');
    void this.inkSplatter.offsetWidth; // Trigger reflow
    this.inkSplatter.classList.add('animate');
  }

  getElement(): HTMLElement {
    return this.counterElement;
  }
}