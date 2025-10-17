<template>
    <div class="applications-page">
        <div class="applications-hero">
            <h1>Application Tracker</h1>
            <p class="hero-subtitle">
                Hi, my name is Zakaria Chaouki. I am just graduating from IPSA
                (promo 2024) with an engineer diploma and a specialization in
                AI. I do a lot of personal projects and would be pleased if you
                consider recommending me or hiring me. me. You can reach me
                through: zakaria.chaouki@phanthive.com
            </p>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-number">{{ totalApplications }}</span>
                    <span class="stat-label">Total Applications</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">{{ inProgressCount }}</span>
                    <span class="stat-label">In Progress</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">{{ rejectionCount }}</span>
                    <span class="stat-label">Rejections</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">{{ noResponseCount }}</span>
                    <span class="stat-label">No Response</span>
                </div>
            </div>
        </div>

        <div class="filters-section">
            <div class="filter-group">
                <label>Status</label>
                <select v-model="filterStatus" class="filter-select">
                    <option value="all">All Statuses</option>
                    <option value="In progress">In Progress</option>
                    <option value="Rejection">Rejected</option>
                    <option value="No response">No Response</option>
                    <option value="Applied">Applied</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Country</label>
                <select v-model="filterCountry" class="filter-select">
                    <option value="all">All Countries</option>
                    <option
                        v-for="country in countries"
                        :key="country"
                        :value="country"
                    >
                        {{ country }}
                    </option>
                </select>
            </div>
            <div class="filter-group">
                <label>Sort By</label>
                <select v-model="sortBy" class="filter-select">
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="company">Company</option>
                </select>
            </div>
        </div>

        <div class="applications-table">
            <div class="table-header">
                <div class="col-date">Date</div>
                <div class="col-company">Company</div>
                <div class="col-position">Position</div>
                <div class="col-country">Country</div>
                <div class="col-status">Status</div>
                <div class="col-actions">Details</div>
            </div>
            <div class="table-body">
                <div
                    v-for="app in filteredApplications"
                    :key="app.id"
                    class="table-row"
                    :class="getStatusClass(app.status)"
                >
                    <div class="col-date">{{ formatDate(app.date) }}</div>
                    <div class="col-company">
                        <span class="company-name">{{ app.company }}</span>
                    </div>
                    <div class="col-position">{{ app.position }}</div>
                    <div class="col-country">
                        <span class="country-badge">{{ app.country }}</span>
                    </div>
                    <div class="col-status">
                        <span
                            class="status-badge"
                            :class="getStatusClass(app.status)"
                        >
                            {{ app.status }}
                        </span>
                    </div>
                    <div class="col-actions">
                        <button
                            v-if="app.steps && app.steps.length > 0"
                            @click="toggleDetails(app.id)"
                            class="details-btn"
                        >
                            {{ expandedRows.includes(app.id) ? '▼' : '▶' }}
                        </button>
                    </div>
                    <div
                        v-if="expandedRows.includes(app.id) && app.steps"
                        class="details-row"
                    >
                        <div class="steps-timeline">
                            <div
                                v-for="(step, index) in app.steps"
                                :key="index"
                                class="step-item"
                            >
                                <div class="step-marker"></div>
                                <div class="step-content">
                                    <div class="step-date">
                                        {{ formatDate(step.date) }}
                                    </div>
                                    <div class="step-status">
                                        {{ step.status }}
                                    </div>
                                    <div class="step-description">
                                        {{ step.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { applications } from '../data/applications';

const filterStatus = ref('all');
const filterCountry = ref('all');
const sortBy = ref('date-desc');
const expandedRows = ref<number[]>([]);

const countries = computed(() => {
    const uniqueCountries = [
        ...new Set(applications.map((app) => app.country)),
    ];
    return uniqueCountries.sort();
});

const totalApplications = computed(() => applications.length);
const inProgressCount = computed(
    () => applications.filter((app) => app.status === 'In progress').length,
);
const rejectionCount = computed(
    () =>
        applications.filter(
            (app) =>
                app.status.includes('Rejection') ||
                app.status.includes('Rejected'),
        ).length,
);
const noResponseCount = computed(
    () => applications.filter((app) => app.status === 'No response').length,
);

const filteredApplications = computed(() => {
    let filtered = [...applications];

    if (filterStatus.value !== 'all') {
        filtered = filtered.filter((app) =>
            app.status.includes(filterStatus.value),
        );
    }

    if (filterCountry.value !== 'all') {
        filtered = filtered.filter(
            (app) => app.country === filterCountry.value,
        );
    }

    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'date-desc':
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case 'date-asc':
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case 'company':
                return a.company.localeCompare(b.company);
            default:
                return 0;
        }
    });

    return filtered;
});

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getStatusClass = (status: string) => {
    if (status === 'In progress') return 'status-progress';
    if (status.includes('Rejection') || status.includes('Rejected'))
        return 'status-rejected';
    if (status === 'No response') return 'status-no-response';
    if (status === 'Applied') return 'status-applied';
    return '';
};

const toggleDetails = (id: number) => {
    const index = expandedRows.value.indexOf(id);
    if (index > -1) {
        expandedRows.value.splice(index, 1);
    } else {
        expandedRows.value.push(id);
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/applications.scss';
</style>
