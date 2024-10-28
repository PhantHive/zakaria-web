<template>
    <div class="app-container">
        <!-- Loading Screen -->
        <div v-if="isLoading" class="loading-screen">
            <div class="loading-content">
                <div class="loading-fairy">
                    <FairySpinner />
                </div>
                <div class="loading-bar">
                    <div
                        :style="{ width: `${loadingProgress}%` }"
                        class="loading-progress"
                    ></div>
                </div>
                <div class="loading-text">
                    <span class="gradient-text">{{ loadingText }}</span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Particle Canvas -->
            <canvas ref="particleCanvas" class="particle-canvas"></canvas>

            <div
                v-for="splash in inkSplashes"
                :key="splash.id"
                class="ink-splash animate"
                :style="{
                    left: `${splash.x}px`,
                    top: `${splash.y}px`,
                    '--splash-color': splash.color,
                    '--splash-size': `${splash.size}px`,
                    '--splash-rotation': `${splash.rotation}deg`,
                }"
            ></div>

            <!-- Work Showcase -->
            <section class="work-showcase">
                <div class="work-grid">
                    <WorkCard
                        v-for="work in works"
                        :key="work.title"
                        :work="work"
                        @interact="handleWorkInteraction"
                    />
                </div>
            </section>

            <!-- Fairy Background -->
            <div ref="fairiesContainer" class="fairies-container"></div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { initParticleSystem } from '../animation/particleSystem';
import { initEnhancedFairySystem } from '../animation/enhancedFairy';
import WorkCard from './WorkCard.vue';
import FairySpinner from './FairySpinner.vue';
import type { Work } from '../types/work';
import { works } from '../data/works';

const isLoading = ref(true);
const loadingProgress = ref(0);
const loadingText = ref('Summoning magical interface...');
const particleCanvas = ref<HTMLCanvasElement | null>(null);
const fairiesContainer = ref<HTMLElement | null>(null);

const loadingTexts = [
    'Summoning magical interface...',
    "Interfacing Zakaria's brain...",
    'Brewing color potions...',
    'Awakening pixel fairies...',
    'Polishing the magic mirror...',
];

async function simulateLoading() {
    for (let i = 0; i <= 100; i += 20) {
        loadingProgress.value = i;
        loadingText.value =
            loadingTexts[Math.floor((i / 100) * loadingTexts.length)];
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    isLoading.value = false;
}

// function handleWorkInteraction(event: MouseEvent, work: Work) {
//     addSplash(event.clientX, event.clientY);
// }

onMounted(async () => {
    if (particleCanvas.value) {
        initParticleSystem(particleCanvas.value);
    }

    if (fairiesContainer.value) {
        initEnhancedFairySystem(fairiesContainer.value);
    }

    await simulateLoading();

    // const handleClick = (event: MouseEvent) => {
    //
    // };

    // document.addEventListener('click', handleClick);
    //
    // return () => {
    //     document.removeEventListener('click', handleClick);
    // };
});
</script>

<style>
@import '../styles/main.css';
@import '../styles/effects.scss';
@import '../styles/fairy-background.css';
@import '../styles/performance.scss';
</style>
