import { ref, onMounted, computed } from 'vue';

const useImageSlider = () => {
    const images = ref<string[]>([
        'mywork/ania-bot.png',
        'mywork/crossword-generator.png',
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
