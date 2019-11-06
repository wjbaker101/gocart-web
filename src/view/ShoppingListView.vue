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
                <p class="heading-right"><span class="counter-number">{{ uncheckedProducts.length }}</span></p>
            </div>
            <div class="unchecked-products-container">
                <ProductItemComponent
                    v-bind:key="product.tpnc"
                    v-for="(product, index) in uncheckedProducts"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </div>
            <div class="heading-container checked-items-container" :class="{ 'is-hidden': isCheckedHidden }">
                <p class="heading-left">
                    <span>Checked Items: </span>
                    <em v-if="isCheckedHidden">(Hidden)</em>
                </p>
                <p class="heading-right">
                    <span class="counter-number">{{ checkedProducts.length }}</span>
                    <span class="show-hide-checked-container" @click="isCheckedHidden = !isCheckedHidden">
                        <UpChevronIcon class="hide-checked" />
                        <DownChevronIcon class="show-checked" />
                    </span>
                </p>
            </div>
            <div class="unchecked-products-container" v-if="!isCheckedHidden">
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
    import UpChevronIcon from '@/assets/icon/chevron-up.svg';
    import DownChevronIcon from '@/assets/icon/chevron-down.svg';

    export default {
        name: 'ShoppingListView',

        components: {
            HeaderComponent,
            ProductItemComponent,
            BasketIcon,
            UpChevronIcon,
            DownChevronIcon,
        },

        data() {
            return {
                initialShoppingList: {},
                shoppingListOrder: [],
                isCheckedHidden: false,
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

        async created() {
            this.initialShoppingList = await this.$root.$data.getShoppingList();
            this.shoppingListOrder = await this.$root.$data.getShoppingListOrder();
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

        .checked-items-container.is-hidden {
            .show-checked {
                display: initial;
            }

            .hide-checked {
                display: none;
            }
        }

        .show-hide-checked-container {
            margin-left: 0.5rem;
            cursor: pointer;

            .show-checked {
                display: none;
            }
        }
    }
</style>
