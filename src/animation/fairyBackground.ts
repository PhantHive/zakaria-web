let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let c: CanvasRenderingContext2D = init(canvas.id);
let w: number = (canvas.width = window.innerWidth);
let h: number = (canvas.height = window.innerHeight);

class Firefly {
    x: number;
    y: number;
    s: number;
    ang: number;
    v: number;

    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = (this.s * this.s) / 4;
    }

    move(): void {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
    }

    show(): void {
        c.beginPath();
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = '#fddba3';
        c.fill();
    }
}

let fireflies: Firefly[] = [];

function draw(): void {
    if (fireflies.length < 100) {
        for (let j = 0; j < 10; j++) {
            fireflies.push(new Firefly());
        }
    }
    for (let i = 0; i < fireflies.length; i++) {
        fireflies[i].move();
        fireflies[i].show();
        if (fireflies[i].x < 0 || fireflies[i].x > w || fireflies[i].y < 0 || fireflies[i].y > h) {
            fireflies.splice(i, 1);
        }
    }
}

let mouse: { x?: number; y?: number } = {};
let last_mouse: { x?: number; y?: number } = {};

canvas.addEventListener(
    'mousemove',
    function (e: MouseEvent) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    },
    false,
);

function init(elemid: string): CanvasRenderingContext2D {
    let canvas: HTMLCanvasElement = document.getElementById(elemid) as HTMLCanvasElement;
    let c: CanvasRenderingContext2D = canvas.getContext('2d')!;
    let w: number = (canvas.width = window.innerWidth);
    let h: number = (canvas.height = window.innerHeight);
    c.fillStyle = 'rgba(30,30,30,1)';
    c.fillRect(0, 0, w, h);
    return c;
}

window.requestAnimationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        function (callback: FrameRequestCallback) {
            window.setTimeout(callback);
        }
    );
})();

function loop(): void {
    window.requestAnimationFrame(loop);
    c.clearRect(0, 0, w, h);
    draw();
}

export function initFairyBackground() {
  const fairiesContainer = document.getElementById('fairies-container');
  if (!fairiesContainer) return;

  const fairySvg = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="fairy">
        <!-- Wings -->
        <g class="wings">
          <path class="wing back-wing" d="M40 40 Q20 30 30 10 Q50 20 40 40" fill="#E6E6FA" stroke="#B0C4DE" stroke-width="0.5" opacity="0.6">
            <animate attributeName="d" values="
              M40 40 Q20 30 30 10 Q50 20 40 40;
              M40 40 Q15 35 30 10 Q50 20 40 40;
              M40 40 Q20 30 30 10 Q50 20 40 40"
              dur="0.5s" repeatCount="indefinite"/>
          </path>
          <path class="wing front-wing" d="M45 45 Q25 55 35 75 Q55 65 45 45" fill="#E6E6FA" stroke="#B0C4DE" stroke-width="0.5" opacity="0.8">
            <animate attributeName="d" values="
              M45 45 Q25 55 35 75 Q55 65 45 45;
              M45 45 Q20 60 35 75 Q55 65 45 45;
              M45 45 Q25 55 35 75 Q55 65 45 45"
              dur="0.5s" repeatCount="indefinite"/>
          </path>
        </g>
        <!-- Dress -->
        <path d="M50 35 Q60 40 55 60 Q40 80 35 60 Q45 45 50 35" fill="#7FFFD4"/>
        <!-- Body -->
        <path d="M50 30 Q55 35 50 55 Q45 35 50 30" fill="#FFE4B5"/>
        <!-- Head -->
        <circle cx="50" cy="25" r="10" fill="#FFE4B5"/>
        <!-- Hair -->
        <path d="M50 15 Q60 15 55 25 Q60 20 60 30 L50 35 Q40 30 45 20 Z" fill="#FFD700"/>
        <!-- Face -->
        <circle cx="53" cy="23" r="1.5" fill="#4B0082"/> <!-- Eye -->
        <path d="M54 27 Q56 28 55 29" fill="none" stroke="#FF69B4" stroke-width="1"/> <!-- Smile -->
        <!-- Arm -->
        <path d="M52 40 Q60 45 65 40" fill="none" stroke="#FFE4B5" stroke-width="2" stroke-linecap="round"/>
        <!-- Pixie dust -->
        <g class="pixie-dust">
          <circle cx="65" cy="40" r="1" fill="#FFD700">
            <animate attributeName="cy" values="40;35;40" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="65;68;65" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="68" cy="42" r="1" fill="#FFD700">
            <animate attributeName="cy" values="42;37;42" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="68;72;68" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70" cy="38" r="1" fill="#FFD700">
            <animate attributeName="cy" values="38;33;38" dur="0.8s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="70;74;70" dur="0.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </svg>`;

  for (let i = 0; i < 10; i++) {
    const fairy = document.createElement('div');
    fairy.innerHTML = fairySvg;
    fairy.classList.add('fairy');
    fairy.style.top = `${Math.random() * window.innerHeight}px`;
    fairy.style.left = `${Math.random() * window.innerWidth}px`;
    fairy.style.transform = `scale(${0.3 + Math.random() * 0.3})`; // Random size between 0.3 and 0.6
    fairiesContainer.appendChild(fairy);
    animateFairy(fairy);
  }
}

function animateFairy(fairy: HTMLElement) {
  const moveFairy = () => {
    const x1 = parseFloat(fairy.style.left);
    const y1 = parseFloat(fairy.style.top);
    const x2 = Math.random() * window.innerWidth;
    const y2 = Math.random() * window.innerHeight;
    const cp1x = x1 + (x2 - x1) * 0.25 + (Math.random() - 0.5) * 200;
    const cp1y = y1 + (y2 - y1) * 0.25 + (Math.random() - 0.5) * 200;
    const cp2x = x1 + (x2 - x1) * 0.75 + (Math.random() - 0.5) * 200;
    const cp2y = y1 + (y2 - y1) * 0.75 + (Math.random() - 0.5) * 200;

    const duration = 8000 + Math.random() * 7000; // Random duration between 8-15 seconds
    const start = performance.now();

    function animate(time: DOMHighResTimeStamp) {
      const t = (time - start) / duration;
      if (t > 1) {
        fairy.style.left = `${x2}px`;
        fairy.style.top = `${y2}px`;
        requestAnimationFrame(moveFairy);
        return;
      }

      const posX = bezierCurve(t, x1, cp1x, cp2x, x2);
      const posY = bezierCurve(t, y1, cp1y, cp2y, y2);
      fairy.style.left = `${posX}px`;
      fairy.style.top = `${posY}px`;

      // Calculate movement direction
      const dx = posX - x1;
      const dy = posY - y1;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      // Determine if the fairy should face left or right
      const isFacingLeft = dx < 0;

      // Apply transformations
      const scale = fairy.style.transform.match(/scale\((.*?)\)/)?.[1] || '0.3';
      const scaleTransform = `scale(${scale})`;
      const rotateTransform = `rotate(${angle}deg)`;
      const flipTransform = isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)';

      fairy.style.transform = `${scaleTransform} ${rotateTransform} ${flipTransform}`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  moveFairy();
}

function bezierCurve(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const cX = 3 * (p1 - p0);
  const bX = 3 * (p2 - p1) - cX;
  const aX = p3 - p0 - cX - bX;

  return aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0;
}

window.addEventListener('resize', function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    loop();
});

loop();
setInterval(loop, 1500);
