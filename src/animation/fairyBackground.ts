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

window.addEventListener('resize', function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    loop();
});

loop();
setInterval(loop, 1500);
