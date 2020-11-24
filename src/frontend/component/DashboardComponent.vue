<template>
    <nav role="navigation">
        <div class="pages-container content-width flex">
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
            <div class="current-page" :style="currentPageIndicatorStyle"></div>
        </div>
    </nav>
</template>

<script lang="ts">
import { computed, reactive, shallowReadonly, watch } from 'vue';
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

        const currentPageIndicator = reactive({
            position: '0px',
            isVisible: true,
        });

        watch(() => route.path, () => {
            switch (route.path) {
                case '/':
                    currentPageIndicator.isVisible = true;
                    currentPageIndicator.position = '0px';
                    break;
                case '/search':
                    currentPageIndicator.isVisible = true;
                    currentPageIndicator.position = '33.333%';
                    break;
                case '/shop':
                    currentPageIndicator.isVisible = true;
                    currentPageIndicator.position = '66.666%';
                    break;
                default:
                    currentPageIndicator.isVisible = false;
            }
        });

        const currentPageIndicatorStyle = computed(() => ({
            left: currentPageIndicator.position,
            opacity: currentPageIndicator.isVisible ? '1' : '0',
        }));

        return {
            dashboardPages,
            currentPageIndicatorStyle,
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
    border-top-left-radius: layout(border-radius);
    border-top-right-radius: layout(border-radius);
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

    .pages-container {
        position: relative;
    }

    .current-page {
        width: 33.333%;
        height: 2px;
        position: absolute;
        bottom: 0;
        border-top-left-radius: layout(border-radius);
        border-top-right-radius: layout(border-radius);
        background-color: theme(primary);
        opacity: 0;
        pointer-events: none;
        transition: left animation(duration-long), opacity animation(duration-short);
    }
}
</style>
