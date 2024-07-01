import { ref } from 'vue';

interface InkSplash {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

const inkSplashes = ref<InkSplash[]>([]);
let nextId = 0;

const colors = ['#ff4e50', '#fc913a', '#f9d62e', '#8bc34a', '#00bcd4', '#7e57c2'];

export function useInkSplash() {
  function addSplash(x: number, y: number) {
    const id = nextId++;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 50 + 50;
    const rotation = Math.random() * 360;

    inkSplashes.value.push({ id, x, y, color, size, rotation });

    setTimeout(() => {
      inkSplashes.value = inkSplashes.value.filter(splash => splash.id !== id);
    }, 2000);
  }

  function createInkSplash(x: number, y: number, color: string) {
    const id = nextId++;
    inkSplashes.value.push({ id, x, y, color, size: 0, rotation: 0 });

    setTimeout(() => {
      inkSplashes.value = inkSplashes.value.filter(splash => splash.id !== id);
    }, 1000);
  }

  return {
    inkSplashes,
    createInkSplash,
    addSplash,
  };
}