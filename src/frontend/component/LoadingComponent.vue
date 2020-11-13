<template>
    <div class="loading-component">
        <LoadingIcon large />
        <p v-if="label">{{ label }}</p>
        <slot />
    </div>
</template>

<script lang="ts">
import LoadingIcon from '@/component/icon/LoadingIcon.vue';

export default {
    name: 'LoadingComponent',

    components: {
        LoadingIcon,
    },

    props: {
        label: String,
    },
}
</script>

<style lang="scss">
.loading-component {
    padding: 2rem 0.5rem;
    text-align: center;

    .icon-loading {
        color: theme(primary);
    }
}
</style>
