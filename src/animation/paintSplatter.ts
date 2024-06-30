const colors = ['#ff4e50', '#fc913a', '#f9d62e', '#8bc34a', '#00bcd4', '#7e57c2'];
let ctx: CanvasRenderingContext2D | null = null;
let splatters: Array<{ x: number; y: number; radius: number; color: string; opacity: number }> = [];

function createSplatter(x: number, y: number) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const radius = Math.random() * 50 + 10;
  splatters.push({ x, y, radius, color, opacity: 1 });
}

function drawSplatters() {
  if (!ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  splatters = splatters.filter(splatter => splatter.opacity > 0);
  splatters.forEach((splatter) => {
    ctx!.beginPath();
    ctx!.arc(splatter.x, splatter.y, splatter.radius, 0, Math.PI * 2);
    ctx!.fillStyle = splatter.color + Math.floor(splatter.opacity * 255).toString(16).padStart(2, '0');
    ctx!.fill();
    splatter.opacity -= 0.01; // Fade out effect
  });
  requestAnimationFrame(drawSplatters);
}

function handleClick(event: MouseEvent) {
  createSplatter(event.clientX, event.clientY);
}

export function initPaintSplatter(canvas: HTMLCanvasElement) {
  ctx = canvas.getContext('2d');
  updateCanvasSize();

  window.addEventListener('click', handleClick);
  window.addEventListener('resize', updateCanvasSize);
  requestAnimationFrame(drawSplatters);

  // Clean up function
  return () => {
    window.removeEventListener('click', handleClick);
    window.removeEventListener('resize', updateCanvasSize);
  };
}

function updateCanvasSize() {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}