<template>
    <div class="shopping-list-view">
        <HeaderComponent>
            <template v-slot:right-side>
                <BasketIcon />
                <span class="total-price">{{ totalPrice }}</span>
            </template>
        </HeaderComponent>
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
    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    import BasketIcon from '@/assets/icon/basket.svg';

    export default {
        name: 'ShoppingListView',

        components: {
            HeaderComponent,
            ProductItemComponent,
            BasketIcon,
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

            totalPrice() {
                if (this.uncheckedProducts.length === 0) {
                    return 'Empty!';
                }

                const total = this.uncheckedProducts
                    .map(p => p.price * p.quantity)
                    .reduce((total, p) => total + p)
                    .toFixed(2);

                return `£${total}`;
            },
        },

        created() {
            this.$emit('viewChange', 'shopping_list');

            this.initialShoppingList = this.$root.$data.getShoppingList();
            this.shoppingListOrder = this.$root.$data.getShoppingListOrder();
        },

        watch: {
            uncheckedProducts(to, from) {
                this.$emit('viewChange', 'shopping_list');
                console.log('change');
            },
        },
    }
</script>

<style lang="scss">
    .shopping-list-view {

        .total-price {
            margin-left: 0.5rem;
        }

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
