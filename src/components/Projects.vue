```vue
<template>
    <div class="projects-page">
        <!-- Video Overlay -->
        <div
            v-if="activeVideo"
            class="video-overlay"
            :class="{ active: isVideoActive }"
            @click.self="closeVideo"
        >
            <div class="video-container">
                <div class="video-header">
                    <h3>{{ activeVideo.title }}</h3>
                    <button class="close-btn" @click="closeVideo">
                        <span class="close-icon">×</span>
                    </button>
                </div>
                <div class="video-frame">
                    <video
                        ref="videoPlayer"
                        controls
                        autoplay
                        :src="activeVideo.url"
                        @ended="closeVideo"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-frame-decoration top-left"></div>
                    <div class="video-frame-decoration top-right"></div>
                    <div class="video-frame-decoration bottom-left"></div>
                    <div class="video-frame-decoration bottom-right"></div>
                </div>
            </div>
        </div>

        <div class="projects-hero">
            <h1>Join the Innovation Journey</h1>
            <p class="hero-subtitle">
                Help turn creative ideas into impactful reality
            </p>
        </div>

        <div class="projects-grid">
            <div
                v-for="project in projects"
                :key="project.id"
                class="project-card"
                :class="project.status.toLowerCase()"
            >
                <div class="status-badge">{{ project.status }}</div>
                <h2>{{ project.title }}</h2>
                <div class="project-content">
                    <p>{{ project.description }}</p>

                    <div v-if="project.command" class="command-demo">
                        {{ project.command }}
                    </div>

                    <div v-if="project.criteria" class="criteria-grid">
                        <div
                            v-for="(criterion, index) in project.criteria"
                            :key="index"
                            class="criteria-item"
                        >
                            <span class="icon">{{ criterion.icon }}</span>
                            {{ criterion.name }}
                        </div>
                    </div>
                </div>

                <div class="project-footer">
                    <div class="badges-container">
                        <span
                            v-if="project.type"
                            class="project-badge type-badge"
                        >
                            <span class="icon">🔧</span>
                            {{ project.type }}
                        </span>
                        <span
                            v-if="project.infoBadge"
                            class="project-badge info-badge"
                        >
                            <span class="icon">💡</span>
                            {{ project.infoBadge }}
                        </span>
                    </div>

                    <button
                        v-if="project.video"
                        class="video-preview-btn"
                        @click="showVideo(project.video)"
                    >
                        <div
                            class="preview-thumbnail"
                            :style="{
                                backgroundImage: `url(${project.video.thumbnail})`,
                            }"
                        ></div>
                        <div class="btn-content">
                            <span class="icon">▶️</span>
                            Watch Demo
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="contact-section">
            <div class="contact-card">
                <h2>Want to Support or Learn More?</h2>
                <p>Your support can help bring these ideas to life!</p>
                <div class="support-buttons">
                    <a :href="'mailto:' + contactEmail" class="contact-button">
                        <span class="icon">✉️</span>
                        Contact Me
                    </a>
                    <a
                        href="https://www.paypal.com/paypalme/phearion"
                        class="donate-button"
                        target="_blank"
                    >
                        <span class="icon">💰</span>
                        Support
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface VideoData {
    title: string;
    url: string;
    thumbnail?: string;
}

interface Criterion {
    icon: string;
    name: string;
}

interface Project {
    id: number;
    title: string;
    status: string;
    description: string;
    type?: string;
    command?: string;
    infoBadge?: string;
    criteria?: Criterion[];
    video?: VideoData;
}

// Projects data
const projects: Project[] = [
    {
        id: 1,
        title: 'Mythical Bot',
        status: 'Active',
        description:
            'Single command and jump into the game with hunts, hatching, housing and more!',
        type: 'Discord Bot',
        command: '/myth to start the game',
        video: {
            title: 'Mythical Bot Demo',
            url: '/videos/mythical.mp4',
            thumbnail: '/videos/thumbnails/mythical-bot.png',
        },
    },
    {
        id: 2,
        title: 'Big Brain',
        status: 'Paused',
        description:
            "An AI tailored to each university's needs, providing exact resources for student studies.",
        infoBadge: 'Seeking Funding',
        video: {
            title: 'Big Brain Concept',
            url: '/videos/bigbrain.mp4',
            thumbnail: '/videos/thumbnails/bigbrain.png',
        },
    },
    {
        id: 3,
        title: 'Zumi Chan',
        status: 'Active',
        description:
            'The first ever E.T.H.I.C.A.L lyrics music player with a touch of AI and your personal kawaii assistant Zumi!',
        infoBadge: 'Private project, but would extend it to public maybe...',
        video: {
            title: 'Zumi Chan Demo',
            url: '/videos/zumi.mp4',
            thumbnail: '/videos/thumbnails/zumi.png',
        },
        criteria: [
            { icon: '🎶', name: 'Music Player & Assistant' },
            {
                icon: '🤖',
                name: 'Lyrics are 100% E.T.H.I.C.A.L, no bad words, no bad content, no bad influence, no drugs, no alcohol, no violence and much more.',
            },
            { icon: '🌸', name: 'Kawaii' },
        ],
    },
    {
        id: 4,
        title: 'Humanity',
        status: 'Paused',
        description:
            'Using our humanity spider to collect and analyze public information for humanitarian assessment. Then we feed the AI in order to provide humanity scores for each politican based on their actions.',
        type: 'AI Analysis Tool',
        criteria: [
            { icon: '👤', name: 'Human Dignity' },
            { icon: '☮️', name: 'Non-Violence' },
            { icon: '🔍', name: 'Truth & Transparency' },
            { icon: '⚖️', name: 'Justice & Fairness' },
            { icon: '🌱', name: 'Common Good' },
        ],
    },
];

const contactEmail = 'hestia@phearion.fr';

// Video handling
const videoPlayer = ref<HTMLVideoElement | null>(null);
const activeVideo = ref<VideoData | null>(null);
const isVideoActive = ref(false);

const showVideo = (video: VideoData) => {
    activeVideo.value = video;
    setTimeout(() => {
        isVideoActive.value = true;
    }, 50);
};

const closeVideo = () => {
    isVideoActive.value = false;
    if (videoPlayer.value) {
        videoPlayer.value.pause();
    }
    setTimeout(() => {
        activeVideo.value = null;
    }, 300);
};
</script>

<style lang="scss">
@import '../styles/projects.scss';
</style>
```
