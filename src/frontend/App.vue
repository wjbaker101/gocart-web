<template>
    <router-view />
    <DashboardComponent />
</template>

<script lang="ts">
import DashboardComponent from '@/component/DashboardComponent.vue';

export default {
    name: 'App',

    components: {
        DashboardComponent,
    },
}
</script>

<style lang="scss">
@import '@/style/webstyle.scss';
</style>
