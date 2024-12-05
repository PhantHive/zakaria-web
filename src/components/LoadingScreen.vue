<template>
    <div class="loading-screen">
        <canvas ref="neuralCanvas" class="neural-canvas"></canvas>
        <div class="loading-content">
            <div class="loading-fairy">
                <FairySpinner />
                <div class="angel-aureole"></div>
            </div>

            <div class="loading-bar-container">
                <div class="loading-bar">
                    <div
                        class="loading-progress"
                        :style="{ width: `${progress}%` }"
                    ></div>
                </div>
                <div class="loading-percentage">{{ progress }}%</div>
            </div>

            <div class="loading-text">
                <span class="gradient-text">{{ currentText }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import FairySpinner from './FairySpinner.vue';
import { NeuralWings } from '../animation/neuralWings';

const neuralCanvas = ref<HTMLCanvasElement | null>(null);
const currentText = ref('Summoning magical interface...');
const progress = ref(0);
let neuralWings: NeuralWings | null = null;

const loadingTexts = [
    'Summoning magical interface...',
    "Interfacing Zakaria's brain...",
    'Brewing color potions...',
    'Awakening pixel fairies...',
    'Polishing the magic mirror...',
];

let textInterval: number;

const simulateLoading = async () => {
    for (let i = 0; i <= 100; i += 2) {
        progress.value = i;
        // Update text based on progress
        const textIndex = Math.floor((i / 100) * loadingTexts.length);
        currentText.value =
            loadingTexts[Math.min(textIndex, loadingTexts.length - 1)];
        await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Emit completed event after loading is done
    emit('completed');
};

onMounted(async () => {
    if (neuralCanvas.value) {
        neuralWings = new NeuralWings(neuralCanvas.value, {
            centerElement: '.loading-fairy',
        });
    }

    // Start loading simulation
    await simulateLoading();
});

onBeforeUnmount(() => {
    if (neuralWings) {
        neuralWings.destroy();
    }
    clearInterval(textInterval);
});

// Define emit for parent component
const emit = defineEmits(['completed']);
</script>

<style lang="scss">
@import '../styles/loadingScreen.scss';
</style>
