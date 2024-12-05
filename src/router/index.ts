// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';
import Main from '../components/Main.vue';
import Timeline from '../components/Timeline.vue';
import Projects from '../components/Projects.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/timeline',
        name: 'Timeline',
        component: Timeline,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
