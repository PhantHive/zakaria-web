<script setup lang="ts">
import { initBackgroundTransition } from '../animation/backgroundTransition';
import useImageSlider from '../animation/displayMyWork';
import { useInkSplash } from '../animation/inkSplash';
import {onMounted} from "vue";
import {onUnmounted, ref} from "vue";
import {InkCounter} from "../animation/inkCounter.ts";
import {initPaintSplatter} from "../animation/paintSplatter.ts";

const { currentImage } = useImageSlider();
const { inkSplashes } = useInkSplash();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let inkCounter: InkCounter;

onMounted(() => {
  initBackgroundTransition();
  if (canvasRef.value) {
    const cleanup = initPaintSplatter(canvasRef.value);
    onUnmounted(cleanup);
  }

  // Create and add ink counter to the DOM
  inkCounter = new InkCounter();
  document.querySelector('.main')?.appendChild(inkCounter.getElement());

  // Add click event listener to increment count and create ink splash
  document.addEventListener('click', () => {
    inkCounter.incrementCount();
  });
});

</script>

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
        <div class="work-box">
            <div class="image-container">
                <transition name="fade" mode="out-in">
                    <img
                        v-if="currentImage"
                        :src="currentImage"
                        :key="currentImage"
                        alt="Work Image"
                    />
                </transition>
            </div>
        </div>
    </main>
</template>

<style scoped src="../styles/main.scss"></style>