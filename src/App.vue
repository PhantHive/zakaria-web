<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { initCustomCursor } from './animation/customCursor';
import Consent from './components/Consent.vue';

onMounted(() => {
    initCustomCursor();
});
</script>

<template>
    <div class="app-container">
        <Header />
        <router-view />
        <Footer />
        <Consent />
    </div>
</template>
