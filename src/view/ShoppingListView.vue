<template>
    <div class="shopping-list-view">
        <div class="shopping-list-container">
            <div class="heading-container">
                <p class="heading-left">Shopping List:</p>
                <p class="heading-right">({{ uncheckedProducts.length }})</p>
            </div>
            <div class="unchecked-products-container">
                <ProductItemComponent
                    v-bind:key="product.tpnc"
                    v-for="(product, index) in uncheckedProducts"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </div>
            <div class="heading-container">
                <p class="heading-left">Checked Items:</p>
                <p class="heading-right">({{ checkedProducts.length }})</p>
            </div>
            <div class="unchecked-products-container">
                <ProductItemComponent
                    v-bind:key="product.tpnc"
                    v-for="(product, index) in checkedProducts"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </div>
        </div>
    </div>
</template>

<script>
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    export default {
        name: 'ShoppingListView',

        components: {
            ProductItemComponent,
        },

        data() {
            return {
                initialShoppingList: {},
                shoppingListOrder: [],
            }
        },

        computed: {
            shoppingList() {
                return this.shoppingListOrder
                    .map(tpnc => this.initialShoppingList[tpnc]);
            },

            uncheckedProducts() {
                return this.shoppingList
                    .filter(p => !p.isChecked);
            },

            checkedProducts() {
                return this.shoppingList
                    .filter(p => p.isChecked);
            },

            loadAnimationDuration() {
                return (index) => {
                    if (index > 20) {
                        return 20 * 0.15;
                    }

                    return (index + 1) * 0.15;
                }
            },
        },

        created() {
            this.initialShoppingList = this.$root.$data.getShoppingList();
            this.shoppingListOrder = this.$root.$data.getShoppingListOrder();

            console.log(this.initialShoppingList);
            console.log(this.shoppingListOrder);
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

