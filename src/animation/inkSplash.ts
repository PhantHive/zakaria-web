import { ref } from 'vue';

interface InkSplash {
  id: number;
  x: number;
  y: number;
  color: string;
}

const inkSplashes = ref<InkSplash[]>([]);
let nextId = 0;

export function useInkSplash() {
  function createInkSplash(x: number, y: number, color: string) {
    const id = nextId++;
    inkSplashes.value.push({ id, x, y, color });

    // Remove the splash after animation completes
    setTimeout(() => {
      inkSplashes.value = inkSplashes.value.filter(splash => splash.id !== id);
    }, 1000);
  }

  return {
    inkSplashes,
    createInkSplash,
  };
}