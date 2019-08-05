<template>
    <div id="app">
        <ProductComponent :product="expandedProduct" :isVisible="isProductExpanded" />
        <HeaderComponent />
        <router-view @expandProduct="onExpandProduct" />
        <DashboardComponent />
    </div>
</template>

<script>
    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import DashboardComponent from '@/component/page/DashboardComponent.vue';
    import ProductComponent from '@/component/ProductComponent.vue';

    export default {
        name: 'App',

        components: {
            HeaderComponent,
            DashboardComponent,
            ProductComponent,
        },

        data() {
            return {
                expandedProduct: null,
                isProductExpanded: false,
            }
        },

        methods: {
            onExpandProduct(product) {
                this.expandedProduct = product;
                this.isProductExpanded = true;
            },

            hideProduct() {
                this.expandedProduct = null;
                this.isProductExpanded = false;
            },
        },
    }
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
        font-family: 'Raleway', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 1px;
        line-height: 1.8em;
        color: theme(black-light);
        background-color: theme(white);
        overflow: hidden;
    }

    #app {
        max-height: calc(100vh - 92px);
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
        line-height: 1.25em;
    }

    // .card {
    //     display: flex;
    //     padding: 1rem;
    //     background-color: theme(white);
    //     box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    //     border-radius: layout(border-radius);
    // }

    .flex-container {
        display: flex;
        margin: 1rem 0;

        & > * {
            flex: 1;
        }
    }
</style>
