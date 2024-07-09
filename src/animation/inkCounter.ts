export class InkCounter {
  private clickCount: number = 0;
  private counterElement: HTMLElement;
  private countDisplay: HTMLElement;
  private milestoneElement: HTMLElement;

  private colors: string[] = [
    '#ff4e50', '#fc913a', '#f9d62e', '#8bc34a', '#00bcd4', '#7e57c2',
    '#ff1a1a', '#ff8c1a', '#ffff1a', '#1aff1a', '#1affff', '#1a1aff'
  ];

  constructor() {
    this.counterElement = document.createElement('div');
    this.counterElement.className = 'ink-counter';

    this.countDisplay = document.createElement('div');
    this.countDisplay.className = 'count-display';

    this.milestoneElement = document.createElement('div');
    this.milestoneElement.className = 'milestone-animation';

    this.counterElement.appendChild(this.countDisplay);
    this.counterElement.appendChild(this.milestoneElement);

    this.updateCounter();

    this.clickCount = this.getCounterFromCookie();
    this.updateCounter();
  }

  incrementCount() {
    this.clickCount++;
    this.setCounterToCookie(this.clickCount);
    this.updateCounter();

    if (this.clickCount % 10 === 0) {
      this.showMilestoneAnimation();
    }
  }

  private getCounterFromCookie(): number {
    const counter = parseInt(localStorage.getItem('counter') || '0');
    return isNaN(counter) ? 0 : counter;
  }

  private setCounterToCookie(value: number): void {
    localStorage.setItem('counter', value.toString());
  }

  private updateCounter() {
    this.countDisplay.textContent = `${this.clickCount}`;
    this.countDisplay.style.transform = 'scale(1.2)';
    this.counterElement.classList.add('splatoon-effect');

    const randomColor = this.getRandomColor();
    this.countDisplay.style.color = randomColor;

    setTimeout(() => {
      this.countDisplay.style.transform = 'scale(1)';
      this.counterElement.classList.remove('splatoon-effect');
      this.countDisplay.style.color = '#ffffff'; // Reset to default color
    }, 500);
  }

  private showMilestoneAnimation() {
    const animations = [
      this.getSplatoonInkSplashSVG(),
      this.getSplatoonSquidSVG(),
      this.getSplatoonStarSVG(),
      this.getSplatoonFairySVG(),
      this.getSplatoonHeartSVG()
    ];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    const randomColor = this.getRandomColor();

    this.milestoneElement.innerHTML = randomAnimation;
    this.milestoneElement.querySelector('svg')!.style.fill = randomColor;
    this.milestoneElement.classList.add('show-milestone');
    setTimeout(() => {
      this.milestoneElement.classList.remove('show-milestone');
    }, 2000);
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private getSplatoonInkSplashSVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z">
          <animate attributeName="d" 
            values="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z;
                    M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z;
                    M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C75 95 95 75 95 50 C95 25 75 5 50 5 Z"
            dur="1s" repeatCount="2"/>
        </path>
      </svg>
    `;
  }

  private getSplatoonSquidSVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C30 10 20 30 20 50 C20 70 30 80 50 90 C70 80 80 70 80 50 C80 30 70 10 50 10 Z">
          <animate attributeName="d" 
            values="M50 10 C30 10 20 30 20 50 C20 70 30 80 50 90 C70 80 80 70 80 50 C80 30 70 10 50 10 Z;
                    M50 5 C25 5 15 25 15 45 C15 65 25 75 50 95 C75 75 85 65 85 45 C85 25 75 5 50 5 Z;
                    M50 10 C30 10 20 30 20 50 C20 70 30 80 50 90 C70 80 80 70 80 50 C80 30 70 10 50 10 Z"
            dur="1s" repeatCount="2"/>
        </path>
        <circle cx="35" cy="40" r="5"/>
        <circle cx="65" cy="40" r="5"/>
      </svg>
    `;
  }

  private getSplatoonStarSVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z">
          <animate attributeName="d" 
            values="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z;
                    M50 0 L65 35 L100 35 L70 60 L85 100 L50 75 L15 100 L30 60 L0 35 L35 35 Z;
                    M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
            dur="1s" repeatCount="2"/>
        </path>
      </svg>
    `;
  }

  private getSplatoonFairySVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C40 10 30 20 30 30 C20 40 10 50 20 60 C30 70 40 80 50 70 C60 80 70 70 80 60 C90 50 80 40 70 30 C70 20 60 10 50 10 Z">
          <animate attributeName="d" 
            values="M50 10 C40 10 30 20 30 30 C20 40 10 50 20 60 C30 70 40 80 50 70 C60 80 70 70 80 60 C90 50 80 40 70 30 C70 20 60 10 50 10 Z;
                    M50 5 C35 5 25 15 25 25 C15 35 5 45 15 55 C25 65 35 75 50 65 C65 75 75 65 85 55 C95 45 85 35 75 25 C75 15 65 5 50 5 Z;
                    M50 10 C40 10 30 20 30 30 C20 40 10 50 20 60 C30 70 40 80 50 70 C60 80 70 70 80 60 C90 50 80 40 70 30 C70 20 60 10 50 10 Z"
            dur="1s" repeatCount="2"/>
        </path>
        <circle cx="40" cy="30" r="3"/>
        <circle cx="60" cy="30" r="3"/>
        <path d="M45 40 Q50 45 55 40" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }

  private getSplatoonHeartSVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 20 C30 0 0 20 0 50 C0 80 50 100 50 100 C50 100 100 80 100 50 C100 20 70 0 50 20 Z">
          <animate attributeName="d" 
            values="M50 20 C30 0 0 20 0 50 C0 80 50 100 50 100 C50 100 100 80 100 50 C100 20 70 0 50 20 Z;
                    M50 15 C25 -5 -5 25 -5 55 C-5 85 50 105 50 105 C50 105 105 85 105 55 C105 25 75 -5 50 15 Z;
                    M50 20 C30 0 0 20 0 50 C0 80 50 100 50 100 C50 100 100 80 100 50 C100 20 70 0 50 20 Z"
            dur="1s" repeatCount="2"/>
        </path>
      </svg>
    `;
  }

  getElement(): HTMLElement {
    return this.counterElement;
  }
}