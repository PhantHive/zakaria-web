<template>
  <main class="main">
    <canvas ref="canvasRef" class="paint-canvas"></canvas>
    <div
      v-for="splash in inkSplashes"
      :key="splash.id"
      class="ink-splash"
      :style="{
        left: `${splash.x}px`,
        top: `${splash.y}px`,
        backgroundColor: splash.color
      }"
    ></div>
    <div class="work-showcase">
      <div class="work-item current"
           @click="nextImage"
           @mouseover="pauseImageTransition"
           @mouseout="resumeImageTransition">
        <img :src="currentWork.image" :alt="currentWork.title" class="work-image">
        <div class="work-info">
          <h2 class="work-title">{{ currentWork.title }}</h2>
          <p class="work-description">{{ currentWork.description }}</p>
        </div>
        <div class="ink-splatter"></div>
      </div>
    </div>
    <div class="ink-counter">Ink: {{ inkCount }}</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { initBackgroundTransition } from '../animation/backgroundTransition';
import useImageSlider from '../animation/displayMyWork';
import { useInkSplash } from '../animation/inkSplash';
import { initPaintSplatter } from '../animation/paintSplatter';

const { currentWork, nextImage, pauseSlider, resumeSlider } = useImageSlider();
const { inkSplashes, addSplash } = useInkSplash();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const inkCount = ref(0);

const pauseImageTransition = () => {
  pauseSlider();
};

const resumeImageTransition = () => {
  resumeSlider();
};

onMounted(() => {
  initBackgroundTransition();
  if (canvasRef.value) {
    const cleanup = initPaintSplatter(canvasRef.value);
    onUnmounted(cleanup);
  }

  document.addEventListener('click', (event) => {
    inkCount.value++;
    nextImage();
    addSplash(event.clientX, event.clientY);
  });

  // every 5 seconds, move to next image
  const imageInterval = setInterval(() => {
    nextImage();
  }, 5000);

  onUnmounted(() => {
    clearInterval(imageInterval);
  });
});
</script>

<style>
@import '../styles/layout.css';
@import '../styles/effects.css';
@import '../styles/work-showcase.css';
</style>
