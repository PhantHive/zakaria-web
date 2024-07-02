<template>
  <div id="loading-screen" class="loading-screen">
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
    <div class="typing-text">
      <span id="text"></span><span id="cursor">|</span>
    </div>
  </div>
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
      <div
        class="work-item"
        :class="{ selected: state.isSelected }"
        @click="toggleSelection"
        @mouseover="pauseImageTransition"
        @mouseout="resumeImageTransition"
      >
        <img :src="currentWork.image" :alt="currentWork.title" class="work-image">
        <div class="work-info">
          <h2 class="work-title">{{ currentWork.title }}</h2>
          <p class="work-description">{{ currentWork.description }}</p>
        </div>
        <div class="ink-splatter"></div>
      </div>
    </div>
    <div id="fairies-container"></div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { initBackgroundTransition } from '../animation/backgroundTransition';
import useImageSlider from '../animation/displayMyWork';
import { useInkSplash } from '../animation/inkSplash';
import { initPaintSplatter } from '../animation/paintSplatter';
import { initFairyBackground } from '../animation/fairyBackground';
import { initLoadingScreen } from '../animation/loadingScreen';

const { currentWork, nextImage, pauseSlider, resumeSlider } = useImageSlider();
const { inkSplashes, addSplash } = useInkSplash();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const state = reactive({
  isSelected: false,
  isSliderActive: true
});

const toggleSelection = () => {
  console.log('Toggle selection called');
  state.isSelected = !state.isSelected;
  if (state.isSelected) {
    console.log('Slider paused');
    pauseSlider();
  } else {
    console.log('Slider resumed');
    resumeSlider();
  }
};

const pauseImageTransition = () => {
  if (!state.isSelected) {
    pauseSlider();
  }
};

const resumeImageTransition = () => {
  if (!state.isSelected) {
    resumeSlider();
  }
};

onMounted(() => {
  initBackgroundTransition();
  if (canvasRef.value) {
    const cleanup = initPaintSplatter(canvasRef.value);
    onUnmounted(cleanup);
  }

  document.addEventListener('click', (event) => {
    nextImage();
    addSplash(event.clientX, event.clientY);
  });

  // Move to the next image every 5 seconds
  const imageInterval = setInterval(() => {
    if (state.isSliderActive) {
      nextImage();
    }
  }, 5000);

  onUnmounted(() => {
    clearInterval(imageInterval);
  });

  // Initialize fairy background
  initFairyBackground();

  // Initialize loading screen
  initLoadingScreen();
});
</script>

<style>
@import '../styles/layout.css';
@import '../styles/effects.css';
@import '../styles/work-showcase.css';
@import '../styles/loading.css';
</style>
