<template>
  <header class="header">
    <div class="nav-links">
      <a href="https://github.com/PhantHive" target="_blank">GitHub</a>
      <span>PhantHive</span>
      <a href="https://www.linkedin.com/in/zakaria-chaouki-8316801b9/" target="_blank">LinkedIn</a>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped>
@import '../styles/header.css';
</style>
