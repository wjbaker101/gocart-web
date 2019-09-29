<template>
    <div id="app">
        <ProductComponent :product="expandedProduct" :isVisible="isProductExpanded" />

        <router-view @expandProduct="onExpandProduct" @viewChange="onViewChange" />
        <DashboardComponent />
    </div>
</template>

<script>
    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import DashboardComponent from '@/component/page/DashboardComponent.vue';
    import ProductComponent from '@/component/ProductComponent.vue';

    import shoppingListService from '@/service/ShoppingListService.js';

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
                currentView: null,
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

            async loadCache() {
                const shoppingList = await shoppingListService.loadShoppingList();

                if (shoppingList === null) {
                    return;
                }

                console.log('Loading cached shopping list:');
                console.log(shoppingList);

                this.$root.$data.addToShoppingList(shoppingList);
            },

            onViewChange(view) {
                this.currentView = view;
            },
        },

        async created() {
            await this.loadCache();
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
        font-family: 'Calibri', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 1px;
        line-height: 1.8em;
        color: theme(black-light);
        background-color: theme(grey);
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
        color: theme(black-dark);
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
