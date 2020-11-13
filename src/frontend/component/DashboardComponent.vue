<template>
    <nav role="navigation">
        <div class="content-width flex">
            <router-link
                class="flex-1"
                :class="{ 'is-current': false }"
                :key="`dashboard-page-${index}`"
                v-for="(dashboardPage, index) in dashboardPages"
                :to="dashboardPage.link"
            >
                <component :is="dashboardPage.icon" />
                <div>{{ dashboardPage.title }}</div>
            </router-link>
        </div>
    </nav>
</template>

<script lang="ts">
import { computed, ref, shallowReadonly, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ListIcon from '@/component/icon/ListIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';
import ShopIcon from '@/component/icon/ShopIcon.vue';

interface DashboardPage {
    title: string,
    link: string,
    icon: any,
}

export default {
    name: 'DashboardComponent',

    setup() {
        const route = useRoute();

        const dashboardPages = shallowReadonly<DashboardPage[]>([
            {
                title: 'List',
                link: '/',
                icon: ListIcon,
            },
            {
                title: 'Search',
                link: '/search',
                icon: SearchIcon,
            },
            {
                title: 'Shop',
                link: '/shop',
                icon: ShopIcon,
            },
        ]);

        return {
            dashboardPages,
        }
    },
}
</script>

<style lang="scss">
nav[role=navigation] {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0.8rem;
    line-height: 1em;
    text-align: center;
    background-color: theme(white);
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.05);
    z-index: 10;

    .icon {
        margin-bottom: 0.5rem;
    }

    a {
        padding: 1rem;
        color: inherit;
        text-decoration: none;

        &.is-current {
            font-weight: bold;
        }
    }
}
</style>
