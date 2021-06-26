<template>
    <router-view />
    <DashboardComponent />
    <SideModalComponent />
</template>

<script lang="ts">
import DashboardComponent from '@/component/DashboardComponent.vue';
import SideModalComponent from '@/component/modal/SideModalComponent.vue';

export default {
    name: 'App',

    components: {
        DashboardComponent,
        SideModalComponent,
    },
}
</script>

<style lang="scss">
@import '@/style/webstyle.scss';
</style>
