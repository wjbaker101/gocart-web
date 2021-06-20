<template>
    <header role="banner">
        <div class="content-width flex align-center">
            <div
                class="back-button flex flex-auto"
                v-if="backButton"
                @click="onBack"
            >
                <LeftArrowIcon mid />
            </div>
            <h1 class="flex-auto margin-auto">GoCart</h1>
            <div class="header-right flex-1 margin-auto">
                <slot name="header-right" />
            </div>
        </div>
        <div class="header-bottom content-width">
            <slot name="header-bottom" />
        </div>
    </header>
    <main role="main">
        <div class="content-width">
            <slot />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import LeftArrowIcon from '@/component/icon/ArrowLeftIcon.vue';

export default defineComponent({
    name: 'PageContainerComponent',

    components: {
        LeftArrowIcon,
    },

    props: {
        backButton: Boolean,
    },

    setup() {
        const router = useRouter();

        return {
            onBack() {
                router.back();
            },
        }
    },
})
</script>

<style lang="scss">
header[role=banner] {
    padding: 1rem 0.5rem;
    background-color: theme(primary);
    color: theme(white);
    border-bottom-right-radius: layout(border-radius);
    border-bottom-left-radius: layout(border-radius);
    box-shadow: 1px 3px 15px rgba(0, 0, 0, 0.15);
    z-index: 10;

    .back-button {
        margin: -0.5rem;
        margin-right: 0;
        padding: 0.5rem;
        cursor: pointer;
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
    }

    .header-right {
        text-align: right;
        line-height: 1em;

        span,
        .icon {
            vertical-align: middle;
        }

        .icon {
            margin-right: 0.5rem;
        }
    }

    .header-bottom > * {
        margin-top: 1rem;
    }
}

main[role=main] {
    padding-bottom: 0.5rem;
}

.content-width {
    max-width: layout(content-width);
    margin-right: auto;
    margin-left: auto;
}
</style>
