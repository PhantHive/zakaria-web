let canvas: HTMLCanvasElement = document.getElementById(
    'canvas',
) as HTMLCanvasElement;
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

let f: Firefly[] = [];

function draw(): void {
    if (f.length < 100) {
        for (let j = 0; j < 10; j++) {
            f.push(new Firefly());
        }
    }
    for (let i = 0; i < f.length; i++) {
        f[i].move();
        f[i].show();
        if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
            f.splice(i, 1);
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
    let canvas: HTMLCanvasElement = document.getElementById(
        elemid,
    ) as HTMLCanvasElement;
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
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="10" fill="pink" />
      <polygon points="20,30 40,30 30,10" fill="lightblue" />
      <polygon points="20,34 40,34 30,54" fill="lightblue" />
      <polygon points="14,32 30,24 30,40" fill="lightblue" />
      <polygon points="50,32 34,24 34,40" fill="lightblue" />
    </svg>`;

  for (let i = 0; i < 10; i++) {
    const fairy = document.createElement('div');
    fairy.innerHTML = fairySvg;
    fairy.classList.add('fairy');
    fairy.style.top = `${Math.random() * window.innerHeight}px`;
    fairy.style.left = `${Math.random() * window.innerWidth}px`;
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
    const cp1x = x1 + (x2 - x1) * 0.25 + (Math.random() - 0.5) * 100;
    const cp1y = y1 + (y2 - y1) * 0.25 + (Math.random() - 0.5) * 100;
    const cp2x = x1 + (x2 - x1) * 0.75 + (Math.random() - 0.5) * 100;
    const cp2y = y1 + (y2 - y1) * 0.75 + (Math.random() - 0.5) * 100;

    const duration = 3000 + Math.random() * 2000; // Random duration between 3-5 seconds
    const start = performance.now();

    function animate(time) {
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

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };

  moveFairy();
}

function bezierCurve(t, p0, p1, p2, p3) {
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
