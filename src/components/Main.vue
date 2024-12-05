<template>
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" @completed="handleLoadingComplete" />

    <!-- Main Content -->
    <main v-else class="main-content">
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
import { ref } from 'vue';
import LoadingScreen from './LoadingScreen.vue';
import WorkCard from './WorkCard.vue';
import { works } from '../data/works';

const isLoading = ref(true);

const handleLoadingComplete = () => {
    // Add a small delay before hiding the loading screen
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
};
</script>

<style>
@import '../styles/main.css';
@import '../styles/effects.scss';
@import '../styles/performance.scss';
</style>
