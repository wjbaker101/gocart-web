<template>
    <nav role="navigation">
        <div class="expanded-navigation content-width" v-if="isExpanded">
            <router-link
                :class="{ 'is-current': currentPage == expandedPage.link }"
                :key="`expanded-page-${index}`"
                v-for="(expandedPage, index) in expandedPages"
                :to="expandedPage.link"
            >
                <div>
                    <component :is="expandedPage.icon" />
                    <span>{{ expandedPage.title }}</span>
                </div>
            </router-link>
        </div>
        <div class="pages-container content-width flex">
            <router-link
                class="flex-1"
                :class="{ 'is-current': currentPage == dashboardPage.link }"
                :key="`dashboard-page-${index}`"
                v-for="(dashboardPage, index) in dashboardPages"
                :to="dashboardPage.link"
            >
                <component :is="dashboardPage.icon" />
                <div>{{ dashboardPage.title }}</div>
            </router-link>
            <!-- <a
                class="flex-1"
                @click="isExpanded = !isExpanded"
            >
                <CogIcon />
                <div>Settings</div>
            </a> -->
            <div class="current-page" :style="currentPageIndicatorStyle"></div>
        </div>
    </nav>
    <div
        class="expanded-nav-backdrop"
        :class="{ 'is-visible': isExpanded }"
        @click="closeExpanded"
    ></div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, shallowReadonly, watch } from 'vue';
import { useRoute } from 'vue-router';

import CogIcon from '@/component/icon/CogIcon.vue';
import ListIcon from '@/component/icon/ListIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';
import ShopIcon from '@/component/icon/ShopIcon.vue';
import UserIcon from '@/component/icon/UserIcon.vue';

interface DashboardPage {
    title: string,
    link: string,
    icon: any,
}

export default defineComponent({
    name: 'DashboardComponent',

    components: {
        CogIcon,
    },

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

        const expandedPages = shallowReadonly<DashboardPage[]>([
            {
                title: 'Your User',
                link: '/user',
                icon: UserIcon,
            },
        ]);

        const currentPageIndicator = reactive({
            position: '0px',
            isVisible: true,
        });

        const isExpanded = ref<boolean>(false);

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

            isExpanded.value = false;
        });

        const currentPageIndicatorStyle = computed(() => ({
            left: currentPageIndicator.position,
            opacity: currentPageIndicator.isVisible ? '1' : '0',
        }));

        const currentPage = computed<string>(() => route.path);

        return {
            isExpanded,
            dashboardPages,
            expandedPages,
            currentPageIndicatorStyle,
            currentPage,

            closeExpanded() {
                isExpanded.value = false;
            },
        }
    },
})
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
    user-select: none;
    z-index: 10;

    a {
        padding: 1rem;
        color: inherit;
        text-decoration: none;
        cursor: pointer;

        &.is-current {
            font-weight: bold;
        }
    }

    .pages-container {
        position: relative;

        .icon {
            margin-bottom: 0.5rem;
        }
    }

    .current-page {
        width: 33.333%;
        height: 4px;
        position: absolute;
        bottom: 0;
        border-top-left-radius: layout(border-radius);
        border-top-right-radius: layout(border-radius);
        background-color: theme(primary);
        opacity: 0;
        pointer-events: none;
        transition: left animation(duration-long), opacity animation(duration-short);
    }

    .expanded-navigation {
        text-align: left;

        a {
            padding: 0;

            div {
                padding: 1rem;
                border-radius: layout(border-radius);

                &:hover {
                    background-color: theme(primary);
                    color: theme(white);
                }
            }

            .icon {
                margin-right: 0.5rem;
                vertical-align: middle;
            }

            &.is-current {
                font-weight: bold;
            }
        }
    }
}

.expanded-nav-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(10, 10, 40, 0.5);
    opacity: 0;
    pointer-events: none;
    z-index: 9;

    &.is-visible {
        opacity: 1;
        pointer-events: all;
    }
}
</style>
