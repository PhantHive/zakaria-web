<template>
    <header class="header">
        <div class="nav-links">
            <router-link to="/" class="nav-link" active-class="active" exact
                >Home</router-link
            >
            <router-link to="/timeline" class="nav-link" active-class="active"
                >Timeline</router-link
            >
            <a href="https://github.com/PhantHive" target="_blank">GitHub</a>
            <span>PhantHive</span>
            <a
                href="https://www.linkedin.com/in/zakaria-chaouki-8316801b9/"
                target="_blank"
                >LinkedIn</a
            >
        </div>
        <div ref="inkCounterContainer" class="ink-counter-container"></div>
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
