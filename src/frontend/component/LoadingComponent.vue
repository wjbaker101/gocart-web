<template>
    <div class="loading-component">
        <div class="logo-container">
            <LogoIcon class="loading-logo" />
        </div>
        <p v-if="label">{{ label }}</p>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LogoIcon from '@/component/icon/LogoIcon.vue';

export default defineComponent({
    name: 'LoadingComponent',

    components: {
        LogoIcon,
    },

    props: {
        label: String,
    },
})
</script>

<style lang="scss">
.loading-component {
    padding: 2rem 0.5rem;
    text-align: center;

    .loading-logo {
        margin-bottom: -1rem;
        animation: loading-logo 3s infinite;
    }

    @keyframes loading-logo {
        0% {
            opacity: 0;
            transform: translateX(-5rem);
        }

        40% {
            opacity: 1;
            transform: translateX(0);
        }

        60% {
            opacity: 1;
            transform: translateX(0);
        }

        100% {
            opacity: 0;
            transform: translateX(5rem);
        }
    }
}
</style>
