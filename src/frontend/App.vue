<template>
    <div id="app">
        <router-view />
        <DashboardComponent />
        <AddToHomeScreenComponent />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import DashboardComponent from '@frontend/component/page/DashboardComponent.vue';
    import ProductComponent from '@frontend/component/ProductComponent.vue';
    import AddToHomeScreenComponent from '@frontend/component/AddToHomeScreenComponent.vue';

    export default Vue.extend({
        name: 'App',

        components: {
            DashboardComponent,
            AddToHomeScreenComponent,
        },
    })
</script>

<style lang="scss">
    html,
    body {
        height: 100%;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        vertical-align: middle;
    }

    body {
        margin: 0;
        font-size: 16px;
        font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 1px;
        line-height: 1.8em;
        color: theme(black-light);
        background-color: theme(grey-light);
        overflow: hidden;
        padding-bottom: 77px;
    }

    #app {
        height: 100%;
        overflow: auto;
    }

    .text-centered { text-align: center; }

    .icon {
        width: 1rem;
        height: 1rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h1, h2, h3, h4, h5, h6 {
        color: theme(black-dark);
        line-height: 1.25em;
    }

    .flex-container {
        display: flex;
        margin: 1rem 0;

        & > * {
            flex: 1;
        }
    }

    @import './style/components/input.scss';
</style>
