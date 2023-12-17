import { ref, onMounted, computed } from 'vue';

const useImageSlider = () => {
    const images = ref<string[]>([
        'mywork/mastermind.png',
        'mywork/aircraft-stability.png',
        'mywork/ania-bot.png',
        'mywork/crossword-generator.png',
        'mywork/kb-tool-names.png',
        'mywork/matrix-calculator.png',
        'mywork/minesweeper-resolver.png',
        'mywork/opti-resolver.png',
        'mywork/pheabots.png',
        'mywork/zilya-bot.png',
        'mywork/bigbrain.png'
    ]);
    let imageIndex = ref(0);
    const currentImage = computed(() => images.value[imageIndex.value]);

    function nextImage() {
        console.log('nextImage');
        imageIndex.value = (imageIndex.value + 1) % images.value.length;
    }

    onMounted(() => {
        setInterval(() => {
            nextImage();
        }, 3000);
    });

    return { currentImage };
};

export default useImageSlider;
