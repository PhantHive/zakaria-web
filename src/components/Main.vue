<template>
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
        <!-- Work Showcase -->
        <section class="work-showcase">
            <div class="work-grid">
                <WorkCard
                    v-for="work in works"
                    :key="work.title"
                    :work="work"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WorkCard from './WorkCard.vue';
import FairySpinner from './FairySpinner.vue';
import { works } from '../data/works';

const isLoading = ref(true);
const loadingProgress = ref(0);
const loadingText = ref('Summoning magical interface...');

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
@import '../styles/performance.scss';
</style>
