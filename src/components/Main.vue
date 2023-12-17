<script setup lang="ts">
import { initBackgroundTransition } from '../animation/backgroundTransition.ts';
import useImageSlider from '../animation/displayMyWork';
const { currentImage } = useImageSlider();
initBackgroundTransition();
</script>

<template>
    <main class="main">
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

<style scoped src="../styles/main.css"></style>
