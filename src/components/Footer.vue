<template>
    <footer class="footer" ref="footerRef">
        <!-- Wave Animation -->
        <div class="wave-container">
            <svg
                class="waves"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="wave-path"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g class="wave-parallax">
                    <use
                        href="#wave-path"
                        x="48"
                        y="0"
                        fill="rgba(255,105,180,0.2)"
                    />
                    <use
                        href="#wave-path"
                        x="48"
                        y="3"
                        fill="rgba(155,89,182,0.2)"
                    />
                    <use
                        href="#wave-path"
                        x="48"
                        y="5"
                        fill="rgba(52,152,219,0.2)"
                    />
                    <use
                        href="#wave-path"
                        x="48"
                        y="7"
                        fill="rgba(46,204,113,0.1)"
                    />
                </g>
            </svg>
        </div>

        <div class="footer-content">
            <!-- Main Content -->
            <div class="footer-sections">
                <div class="footer-section brand-section">
                    <h3 class="section-title">PhantHive</h3>
                    <p class="brand-description">
                        Creating magical digital experiences with a touch of
                        waifu spirit ✨
                    </p>
                    <div class="ink-counter">
                        <span>Ink Splashes:</span>
                        <span class="count">{{ totalInkSplashes }}</span>
                    </div>
                </div>

                <div class="footer-section links-section">
                    <h3 class="section-title">Quick Links</h3>
                    <ul class="footer-links">
                        <li v-for="link in quickLinks" :key="link.text">
                            <a
                                :href="link.url"
                                @mouseenter="handleLinkHover"
                                class="footer-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="footer-section connect-section">
                    <h3 class="section-title">Connect</h3>
                    <div class="social-links">
                        <a
                            v-for="social in socialLinks"
                            :key="social.name"
                            :href="social.url"
                            :title="social.name"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link"
                            @mouseenter="handleSocialHover"
                        >
                            <i :class="social.icon"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom">
                <p class="copyright">
                    © {{ currentYear }} PhantHive | Chaouki Zakaria. All rights
                    reserved.
                </p>
                <div class="made-with">
                    Made with
                    <span class="heart" @mouseenter="handleHeartHover">❤️</span>
                    and lots of
                    <span class="magic" @mouseenter="handleMagicHover">✨</span>
                </div>
            </div>
        </div>

        <!-- Ink Splash Container -->
        <div class="footer-splash-container">
            <div
                v-for="splash in inkSplashes"
                :key="splash.id"
                class="footer-splash"
                :style="getSplashStyle(splash)"
            />
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface SplashEffect {
    id: number;
    x: number;
    y: number;
    color: string;
}

// State
const footerRef = ref<HTMLElement | null>(null);
const inkSplashes = ref<SplashEffect[]>([]);
const totalInkSplashes = ref(parseInt(localStorage.getItem('inkCount') || '0'));
let splashId = 0;

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Links Data
const quickLinks = [
    { text: "My Girlfriend's Website", url: 'https://maya-design.cloud' },
    { text: 'Mythical Bot Game', url: 'https://mythical.phearion.fr' },
];

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/PhantHive',
        icon: 'fab fa-github',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/zakaria-chaouki-8316801b9/',
        icon: 'fab fa-linkedin',
    },
];

// Methods
const createSplash = (e: MouseEvent, color?: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const splash = {
        id: splashId++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color: color,
    } as SplashEffect;

    inkSplashes.value.push(splash);
    setTimeout(() => {
        inkSplashes.value = inkSplashes.value.filter((s) => s.id !== splash.id);
    }, 1000);
};

const handleLinkHover = (e: MouseEvent) => {
    createSplash(e, '#9B59B6');
};

const handleSocialHover = (e: MouseEvent) => {
    createSplash(e, '#3498DB');
};

const handleHeartHover = (e: MouseEvent) => {
    createSplash(e, '#E74C3C');
};

const handleMagicHover = (e: MouseEvent) => {
    createSplash(e, '#F1C40F');
};

const getSplashStyle = (splash: SplashEffect) => ({
    left: `${splash.x}px`,
    top: `${splash.y}px`,
    backgroundColor: splash.color,
});

// Lifecycle
onMounted(() => {
    // Update ink count when it changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'inkCount') {
            totalInkSplashes.value = parseInt(e.newValue || '0');
        }
    });
});
</script>

<style>
@import '../styles/footer.scss';
</style>
