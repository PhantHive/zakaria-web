<template>
  <header class="header">
    <div class="nav-links">
      <a href="https://github.com/PhantHive" target="_blank">GitHub</a>
      <span>PhantHive</span>
      <a href="https://www.linkedin.com/in/zakaria-chaouki-8316801b9/" target="_blank">LinkedIn</a>
    </div>
    <div class="ink-counter">Ink: {{ inkCount }}</div>
  </header>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    const inkCount = ref(0);

    onMounted(() => {
      document.addEventListener('click', () => {
        inkCount.value++;
      });

      return () => {
        document.removeEventListener('click', () => {
          inkCount.value++;
        });
      };
    })

    return {
      inkCount
    };
  }
});
</script>

<style scoped>
@import '../styles/header.css';
</style>
