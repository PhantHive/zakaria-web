<template>
    <header class="header">
        <div class="header-container">
            <div class="brand">
                <router-link to="/" class="brand-link"> PhantHive </router-link>
            </div>

            <nav class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
                <router-link
                    to="/"
                    class="nav-item"
                    exact
                    @click="closeMobileMenu"
                >
                    Home
                </router-link>
                <router-link
                    to="/timeline"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    Timeline
                </router-link>
                <router-link
                    to="/projects"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    Projects
                </router-link>
                <router-link
                    to="/applications"
                    class="nav-item"
                    @click="closeMobileMenu"
                >
                    Applications
                </router-link>
            </nav>

            <div ref="inkCounterContainer" class="ink-counter-container"></div>

            <button
                class="burger-menu"
                @click="toggleMobileMenu"
                :class="{ active: mobileMenuOpen }"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import { InkCounter } from '../animation/inkCounter';

export default defineComponent({
    name: 'Header',
    setup() {
        const inkCounterContainer = ref<HTMLElement | null>(null);
        const mobileMenuOpen = ref(false);
        let inkCounter: InkCounter;

        const toggleMobileMenu = () => {
            mobileMenuOpen.value = !mobileMenuOpen.value;
        };

        const closeMobileMenu = () => {
            mobileMenuOpen.value = false;
        };

        onMounted(async () => {
            inkCounter = new InkCounter();
            if (inkCounterContainer.value) {
                inkCounterContainer.value.appendChild(inkCounter.getElement());

                await nextTick();

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
            mobileMenuOpen,
            toggleMobileMenu,
            closeMobileMenu,
        };
    },
});
</script>

<style lang="scss">
@import '../styles/header.scss';
</style>
