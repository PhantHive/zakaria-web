import { ref, onMounted, onUnmounted } from 'vue';

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
      description: 'A solo/multiplayer simple but yet aesthetic game of Mastermind. It is a code-breaking game where the player has to guess the secret code.',
      techStack: ['Python', 'PyQt5']
    },
    {
      image: 'mywork/aircraft-stability.png',
      title: 'Aircraft Stability',
      description: 'Advanced flight dynamics analysis tool for aerospace engineering. This program allows for the analysis of aircraft stability and control characteristics using a state-space model. It provide analytic tools for longitudinal and lateral stability of an aircraft.',
      techStack: ['MATLAB', 'Python', 'Aerospace Engineering']
    },
    {
      image: 'mywork/ania-bot.png',
      title: 'Ania Bot',
      description: 'Intelligent chatbot assistant for students. It uses advanced path research algorithms with a unique UI',
      techStack: ['TypeScript', 'Discord.js', 'Node.js']
    },
    {
      image: 'mywork/crossword-generator.png',
      title: 'Crossword Generator',
      description: 'Automated system for resolving crossword puzzles. It uses AC3 algorithm to solve the crossword puzzle based on a random grid and a list of words.',
      techStack: ['Python', 'Symbolic AI Algorithms', 'Game Development']
    },
    {
      image: 'mywork/kb-tool-names.png',
      title: 'KB Tool Names',
      description: 'Knowledge base for retrieving people names. It uses a simple search algorithm to find the name of a person based on the input. It makes recommendations based on the input.',
      techStack: ['React', 'JavaScript', 'Rest API']
    },
      {
          image: 'mywork/matrix-calculator.png',
          title: 'Matrix Calculator',
          description: 'Advanced matrix operations solver with visualization. This resolve optimization problem based on gradient descent algorithm. It provides a visual representation of the matrix operations.',
          techStack: ['Python', 'PyQT5', 'Data Visualization', 'Numpy']
      },
{
          image: 'mywork/minesweeper-resolver.png',
          title: 'Minesweeper Resolver',
          description: 'Symbolic AI-powered Minesweeper solver with visual hints',
          techStack: ['Python', 'AI Algorithms', 'Game Development']
      },
      {
          image: 'mywork/opti-resolver.png',
          title: 'Opti Resolver',
          description: 'Optimization algorithm visualizer for engineering applications.',
          techStack: ['Python', 'Optimization', 'Data Visualization']
      },
      {
          image: 'mywork/pheabots.png',
          title: 'Pheabots',
          description: 'A warm website for a group of bots that are used for various purposes. They are made by my GitHub organization, Phearion and are open-source.',
          techStack: ['TypeScript', 'React', 'Node.js', 'Vite', 'Discord API']
      },
      {
          image: 'mywork/zilya-bot.png',
          title: 'Zilya Bot',
          description: 'Multi-purpose Discord bot with custom commands and features',
          techStack: ['TypeScript', 'Discord.js', 'Node.js']
      },
      {
          image: 'mywork/bigbrain.png',
          title: 'Big Brain',
          description: 'The Big Brain is a simple but powerful AI that helps students by provindg them ressources tailored to their needs and specific to their school. It is a quantized fine-tuned LLM model.',
          techStack: ['Python', 'Hugging Face', 'AI Algorithms', 'NLP', 'fine-tuning', 'SFT', 'Quantization', 'QLORA']
      }
    ]);

  const currentWork = ref(works.value[0]);

  let isPaused = false;
  let currentIndex = 0;


    const isHovering = ref(false);

    function handleMouseOver() {
    isHovering.value = true;
  }

  function handleMouseOut() {
    isHovering.value = false;
  }

  const nextImage = () => {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % works.value.length;
        currentWork.value = works.value[currentIndex];
    }
  };

  const pauseSlider = () => {
    isPaused = true;
  };

  const resumeSlider = () => {
    isPaused = false;
  };

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      nextImage();
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('mouseover', handleMouseOver);
    window.removeEventListener('mouseout', handleMouseOut);
  });

  return {
    currentWork,
    nextImage,
    pauseSlider,
    resumeSlider
  };
};

export default useImageSlider;