<template>
    <div class="shopping-list-view">
        <div class="shopping-list-container">
            <div class="heading-container">
                <p class="heading-left">Shopping List:</p>
                <p class="heading-right">({{ uncheckedProducts.length }})</p>
            </div>
            <div class="unchecked-products-container">
                <ProductItemComponent
                    v-bind:key="index"
                    v-for="(product, index) in uncheckedProducts"
                    :product="product"
                    hasCheckBox="true" />
            </div>
            <div class="heading-container">
                <p class="heading-left">Checked Items:</p>
                <p class="heading-right">({{ checkedProducts.length }})</p>
            </div>
            <div class="unchecked-products-container">
                <ProductItemComponent
                    v-bind:key="index"
                    v-for="(product, index) in checkedProducts"
                    :product="product"
                    hasCheckBox="true"
                    style="animation-duration: 0" />
            </div>
        </div>
    </div>
</template>

<script>
    import ShoppingListComponent from '@/component/ShoppingListComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    import productStoreService from '@/service/ProductStoreService.js';

    export default {
        name: 'ShoppingListView',

        components: {
            ShoppingListComponent,
            ProductItemComponent,
        },

        data() {
            return {
                initialShoppingList: {},
                shoppingListOrder: [],
            }
        },

        computed: {
            uncheckedProducts() {
                return this.shoppingListOrder
                    .map(tpnc => this.initialShoppingList[tpnc])
                    .filter(p => !p.isChecked);
            },

            checkedProducts() {
                return this.shoppingListOrder
                    .map(tpnc => this.initialShoppingList[tpnc])
                    .filter(p => p.isChecked);
            },
        },

        created() {
            this.initialShoppingList = this.$root.$data.getShoppingList();
            this.shoppingListOrder = this.$root.$data.getShoppingListOrder();
        },
    }
</script>

<style lang="scss">
    .shopping-list-view {

        .shopping-list-container {
            padding: 1rem;
        }

        .heading-container {
            display: flex;
            font-weight: bold;

            .heading-right {
                flex: 1;
                text-align: right;
            }
        }
    }
</style>

