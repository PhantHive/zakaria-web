<script setup lang="ts">
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
import { initCustomCursor } from './animation/customCursor';
import {onMounted} from "vue";

onMounted(() => {
    initCustomCursor();
});
</script>

<template>
    <Header />
    <Main />
    <Footer />
</template>

