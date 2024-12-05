<template>
    <header class="header">
        <div class="nav-links">
            <router-link
                to="/"
                class="nav-link"
                :class="{ 'router-link-active': $route.path === '/' }"
                exact
                >Home</router-link
            >
            <span>PhantHive</span>
            <router-link
                to="/timeline"
                class="nav-link"
                :class="{ 'router-link-active': $route.path === '/timeline' }"
                >Timeline</router-link
            >
        </div>
        <div ref="inkCounterContainer" class="ink-counter-container"></div>
        <router-link
            to="/projects"
            class="floating-projects-btn"
            :class="{ active: $route.path === '/projects' }"
        >
            <div class="btn-content">
                <div class="icon-wrapper">🚀</div>
                <span class="tooltip">Projects</span>
            </div>
            <div class="pulse-ring"></div>
        </router-link>
        <router-link
            to="/"
            class="floating-home-btn"
            :class="{ active: $route.path === '/' }"
        >
            <div class="btn-content">
                <div class="icon-wrapper">🏠</div>
            </div>
        </router-link>
    </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import { InkCounter } from '../animation/inkCounter';

export default defineComponent({
    name: 'Header',
    setup() {
        const inkCounterContainer = ref<HTMLElement | null>(null);
        let inkCounter: InkCounter;

        onMounted(async () => {
            inkCounter = new InkCounter();
            if (inkCounterContainer.value) {
                inkCounterContainer.value.appendChild(inkCounter.getElement());

                // Wait for the next DOM update cycle
                await nextTick();

                // Apply styles after the element is in the DOM
                const counterElement =
                    inkCounterContainer.value.querySelector('.ink-counter');
                if (counterElement) {
                    counterElement.classList.add('ink-counter-visible');
                }
            }

            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        });

        function handleClick() {
            inkCounter.incrementCount();
        }

        return {
            inkCounterContainer,
        };
    },
});
</script>

<style lang="scss">
@import '../styles/header.scss';
</style>
