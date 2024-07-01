import { ref, onMounted, onUnmounted, computed } from 'vue';

interface WorkItem {
  image: string;
  title: string;
  description: string;
  techStack: string[];
}

const useImageSlider = () => {
  const works = ref<WorkItem[]>([
    {
      image: 'mywork/mastermind.png',
      title: 'Mastermind',
      description: 'A challenging code-breaking game with adaptive AI',
      techStack: ['Python', 'Pygame', 'AI Algorithms']
    },
    {
      image: 'mywork/aircraft-stability.png',
      title: 'Aircraft Stability',
      description: 'Advanced flight dynamics analysis tool for aerospace engineering',
      techStack: ['MATLAB', 'Control Theory', 'Aerodynamics']
    },
    {
      image: 'mywork/ania-bot.png',
      title: 'Ania Bot',
      description: 'Intelligent chatbot assistant with natural language processing',
      techStack: ['Python', 'NLP', 'Machine Learning']
    },
    {
      image: 'mywork/crossword-generator.png',
      title: 'Crossword Generator',
      description: 'Automated system for creating custom, thematic crossword puzzles',
      techStack: ['JavaScript', 'Node.js', 'Graph Algorithms']
    },
    {
      image: 'mywork/kb-tool-names.png',
      title: 'KB Tool Names',
      description: 'Knowledge base for standardizing and managing tool naming conventions',
      techStack: ['React', 'GraphQL', 'MongoDB']
    },
      {
          image: 'mywork/matrix-calculator.png',
          title: 'Matrix Calculator',
          description: 'Advanced matrix operations solver with visualization',
          techStack: ['C++', 'OpenGL', 'Linear Algebra']
      },
{
          image: 'mywork/minesweeper-resolver.png',
          title: 'Minesweeper Resolver',
          description: 'AI-powered Minesweeper solver with visual hints',
          techStack: ['Java', 'AI Algorithms', 'Game Development']
      },
      {
          image: 'mywork/opti-resolver.png',
          title: 'Opti Resolver',
          description: 'Optimization algorithm visualizer for engineering applications',
          techStack: ['Python', 'Optimization', 'Data Visualization']
      },
      {
          image: 'mywork/pheabots.png',
          title: 'Pheabots',
          description: 'Swarm intelligence simulation for collective behavior analysis',
          techStack: ['Python', 'Swarm Intelligence', 'Simulation']
      },
      {
          image: 'mywork/zilya-bot.png',
          title: 'Zilya Bot',
          description: 'Multi-purpose Discord bot with custom commands and features',
          techStack: ['JavaScript', 'Discord API', 'Web Scraping']
      },
      {
          image: 'mywork/bigbrain.png',
          title: 'Big Brain',
          description: 'Neural network visualization tool for understanding model behavior',
          techStack: ['Python', 'TensorFlow', 'Data Visualization']
      }
    ]);

  const currentIndex = ref(0);
  const translateY = ref(0);
  const isSwiping = ref(false);

  const currentWork = computed(() => works.value[currentIndex.value]);
  const nextWork = computed(() => works.value[(currentIndex.value + 1) % works.value.length]);

  const currentItemStyle = computed(() => ({
    transform: `translateY(${-translateY.value}px)`,
    transition: isSwiping.value ? 'none' : 'transform 0.5s ease-out'
  }));

  const nextItemStyle = computed(() => ({
    transform: `translateY(calc(100% - 100px - ${translateY.value}px))`,
    transition: isSwiping.value ? 'none' : 'transform 0.5s ease-out'
  }));

  function nextImage() {
    currentIndex.value = (currentIndex.value + 1) % works.value.length;
    translateY.value = 0;
  }

  function handleTouchStart() {
    isSwiping.value = true;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isSwiping.value) return;
    const touch = event.touches[0];
    const newTranslateY = Math.max(0, Math.min(window.innerHeight, touch.clientY));
    translateY.value = window.innerHeight - newTranslateY;
  }

  function handleTouchEnd() {
    isSwiping.value = false;
    if (translateY.value > window.innerHeight / 4) {
      nextImage();
    } else {
      translateY.value = 0;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      nextImage();
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return {
    currentWork,
    nextWork,
    nextImage,
    currentItemStyle,
    nextItemStyle,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

export default useImageSlider;