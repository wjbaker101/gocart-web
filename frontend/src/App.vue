<template>
    <router-view />
    <DashboardComponent />
    <SideModalComponent />
</template>

<script lang="ts">
import DashboardComponent from '@/component/DashboardComponent.vue';
import SideModalComponent from '@/component/modal/SideModalComponent.vue';

import { usePwaInstallPrompt } from '@/use/PwaInstallPrompt.use';

export default {
    name: 'App',

    components: {
        DashboardComponent,
        SideModalComponent,
    },

    setup() {
        usePwaInstallPrompt();
    },
}
</script>

<style lang="scss">
@import '@/style/webstyle.scss';
</style>
