<template>
    <div class="timeline-page">
        <!-- Floating chibi -->
        <div
            v-show="showMascot"
            class="floating-mascot"
            :style="{
                left: mascotPosition.x + 'px',
                top: mascotPosition.y + 'px',
            }"
        >
            <img
                src="/waifu/mascot-chibi.png"
                alt="Chibi Guide"
                class="mascot-image"
            />
            <div class="mascot-speech">
                <p>{{ currentHoverText }}</p>
            </div>
        </div>

        <div class="timeline-sections">
            <!-- Professional Experience -->
            <section class="timeline-section">
                <h2 class="section-title">Professional Experience</h2>
                <div class="timeline-container">
                    <div class="timeline-axis">
                        <div
                            v-for="year in years"
                            :key="year"
                            class="year-marker"
                        >
                            {{ year }}
                        </div>
                    </div>

                    <div class="timeline-bars">
                        <template
                            v-for="exp in professionalExperience"
                            :key="exp.id"
                        >
                            <div
                                class="experience-bar"
                                :class="[
                                    exp.category,
                                    calculateBarPosition(
                                        getPositionX(exp.startDate),
                                    ),
                                ]"
                                :style="{
                                    left: `${getPositionX(exp.startDate)}%`,
                                    width: `${getDuration(
                                        exp.startDate,
                                        exp.endDate,
                                    )}%`,
                                    top: `${exp.rowPosition * 50}px`,
                                }"
                                @mouseenter="handleHover(exp, $event)"
                                @mousemove="updateMascotPosition($event)"
                                @mouseleave="handleLeave"
                            >
                                <div class="bar-content">
                                    <span class="bar-label">{{
                                        exp.title
                                    }}</span>
                                    <div
                                        class="tags"
                                        :class="
                                            calculateTagsPosition(
                                                getPositionX(exp.startDate),
                                                getDuration(
                                                    exp.startDate,
                                                    exp.endDate,
                                                ),
                                                exp.tags,
                                            )
                                        "
                                    >
                                        <span
                                            v-for="tag in exp.tags"
                                            :key="tag"
                                            class="tag"
                                            >{{ tag }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="milestone-container">
                        <div
                            v-for="milestone in professionalMilestones"
                            :key="milestone.id"
                            class="milestone"
                            @mouseenter="
                                handleHover(
                                    { description: milestone.description },
                                    $event,
                                )
                            "
                            @mousemove="updateMascotPosition($event)"
                            @mouseleave="handleLeave"
                        >
                            <span class="milestone-date">{{
                                formatDate(milestone.date)
                            }}</span>
                            <div class="milestone-icon">
                                {{ milestone.icon }}
                            </div>
                            <div class="milestone-label">
                                {{ milestone.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Education -->
            <section class="timeline-section">
                <h2 class="section-title">Education</h2>
                <div class="timeline-container">
                    <div class="timeline-axis">
                        <div
                            v-for="year in years"
                            :key="year"
                            class="year-marker"
                        >
                            {{ year }}
                        </div>
                    </div>

                    <div class="timeline-bars">
                        <template v-for="edu in education" :key="edu.id">
                            <div
                                class="experience-bar"
                                :class="[
                                    edu.category,
                                    calculateBarPosition(
                                        getPositionX(edu.startDate),
                                    ),
                                ]"
                                :style="{
                                    left: `${getPositionX(edu.startDate)}%`,
                                    width: `${getDuration(
                                        edu.startDate,
                                        edu.endDate,
                                    )}%`,
                                    top: `${edu.rowPosition * 50}px`,
                                }"
                                @mouseenter="handleHover(edu, $event)"
                                @mousemove="updateMascotPosition($event)"
                                @mouseleave="handleLeave"
                            >
                                <div class="bar-content">
                                    <span class="bar-label">{{
                                        edu.title
                                    }}</span>
                                    <div
                                        class="tags"
                                        :class="
                                            calculateTagsPosition(
                                                getPositionX(edu.startDate),
                                                getDuration(
                                                    edu.startDate,
                                                    edu.endDate,
                                                ),
                                                edu.tags,
                                            )
                                        "
                                    >
                                        <span
                                            v-for="tag in edu.tags"
                                            :key="tag"
                                            class="tag"
                                            >{{ tag }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="milestone-container">
                        <div
                            v-for="milestone in educationMilestones"
                            :key="milestone.id"
                            class="milestone"
                            @mouseenter="
                                handleHover(
                                    { description: milestone.description },
                                    $event,
                                )
                            "
                            @mousemove="updateMascotPosition($event)"
                            @mouseleave="handleLeave"
                        >
                            <span class="milestone-date">{{
                                formatDate(milestone.date)
                            }}</span>
                            <div class="milestone-icon">
                                {{ milestone.icon }}
                            </div>
                            <div class="milestone-label">
                                {{ milestone.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    professionalExperience,
    education,
    milestones,
} from '../data/timeline';

const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
const showMascot = ref(false);
const currentHoverText = ref('');
const mascotPosition = ref({ x: 0, y: 0 });

// Separate milestones by section
const professionalMilestones = computed(() =>
    milestones.filter((m) => m.section === 'professional'),
);

const educationMilestones = computed(() =>
    milestones.filter((m) => m.section === 'education'),
);

const calculateTagsWidth = (tags: string[]) => {
    return (
        tags.reduce((total, tag) => {
            return total + tag.length * 8 + 16;
        }, 0) +
        (tags.length - 1) * 8 +
        16
    );
};

const getPositionX = (date: string) => {
    const start = new Date('2018-01-01').getTime();
    const end = new Date('2024-12-31').getTime();
    const current = new Date(date).getTime();
    return ((current - start) / (end - start)) * 100;
};

const getDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const totalDuration =
        new Date('2024-12-31').getTime() - new Date('2018-01-01').getTime();
    return ((endTime - startTime) / totalDuration) * 100;
};

const calculateBarPosition = (xPosition: number) => {
    if (xPosition > 70) return 'position-right';
    if (xPosition < 30) return 'position-left';
    return 'position-center';
};

const calculateTagsPosition = (
    startPosition: number,
    width: number,
    tags: string[],
) => {
    const containerWidth = 1200;
    const tagsWidth = calculateTagsWidth(tags);
    const barStartPx = (containerWidth * startPosition) / 100;
    const barWidthPx = (containerWidth * width) / 100;
    const barCenterPx = barStartPx + barWidthPx / 2;

    if (barCenterPx + tagsWidth / 2 > containerWidth) {
        return 'tags-right';
    }
    if (barCenterPx - tagsWidth / 2 < 0) {
        return 'tags-left';
    }
    return 'tags-center';
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

const handleHover = (item: any, event: MouseEvent) => {
    showMascot.value = true;
    currentHoverText.value = item.description;
    updateMascotPosition(event);
};

const handleLeave = () => {
    showMascot.value = false;
};

const updateMascotPosition = (event: MouseEvent) => {
    const offset = 20;
    mascotPosition.value = {
        x: event.clientX + offset,
        y: event.clientY - offset,
    };
};
</script>

<style scoped>
@import '../styles/timeline.scss';
</style>
