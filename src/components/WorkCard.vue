<template>
    <div class="work-cards-container">
        <div
            class="work-card"
            :class="{ selected: isSelected }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @click="handleClick"
        >
            <!-- Image Container -->
            <div class="work-image-container">
                <img
                    :src="work.image"
                    :alt="work.title"
                    class="work-image"
                    loading="lazy"
                />

                <!-- Tech Stack Tags -->
                <div class="tech-stack">
                    <span
                        v-for="tech in work.techStack"
                        :key="tech"
                        class="tech-tag"
                    >
                        {{ tech }}
                    </span>
                </div>
            </div>

            <!-- Content -->
            <div class="work-content">
                <div class="work-header">
                    <h3 class="work-title">{{ work.title }}</h3>
                    <p class="work-description">{{ work.description }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="work-actions">
                    <a
                        v-if="work.demoUrl"
                        :href="work.demoUrl"
                        target="_blank"
                        rel="noopener"
                        class="action-button demo"
                        @click.stop
                    >
                        <span>Website</span>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a
                        v-if="work.codeUrl"
                        :href="work.codeUrl"
                        target="_blank"
                        rel="noopener"
                        class="action-button code"
                        @click.stop
                    >
                        <span>View Code</span>
                        <i class="fas fa-code"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Work } from '../types/work';

// Props
interface Props {
    work: Work;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
    (e: 'interact', event: MouseEvent, work: Work): void;
}>();

// State
const isSelected = ref(false);

// Event Handlers
function handleMouseEnter() {
    emit('interact', new MouseEvent('mouseenter'), props.work);
}

function handleMouseLeave() {
    emit('interact', new MouseEvent('mouseleave'), props.work);
}

function handleClick(event: MouseEvent) {
    isSelected.value = !isSelected.value;
    emit('interact', event, props.work);
}
</script>

<style src="../styles/work-card.css"></style>
