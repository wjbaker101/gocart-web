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
                <p class="heading-right"><span class="counter-number">{{ uncheckedShoppingList.length }}</span></p>
            </div>
            <draggable
                class="unchecked-products-container"
                tag="div"
                v-model="uncheckedShoppingList"
                v-bind="draggableOptions">
                <transition-group type="transition" name="flip-list">
                    <ProductItemComponent
                        :key="product.tpnc"
                        v-for="(product, index) in uncheckedShoppingList"
                        :product="product"
                        hasCheckBox="true"
                        :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
                </transition-group>
            </draggable>
            <div class="heading-container checked-items-container" :class="{ 'is-hidden': isCheckedHidden }">
                <p class="heading-left">
                    <span>Checked Items: </span>
                    <em v-if="isCheckedHidden">(Hidden)</em>
                </p>
                <p class="heading-right">
                    <span class="counter-number">{{ checkedShoppingList.length }}</span>
                    <span class="show-hide-checked-container" @click="isCheckedHidden = !isCheckedHidden">
                        <UpChevronIcon class="hide-checked" />
                        <DownChevronIcon class="show-checked" />
                    </span>
                </p>
            </div>
            <div class="checked-products-container" v-if="!isCheckedHidden">
                <ProductItemComponent
                    :key="product.tpnc"
                    v-for="(product, index) in checkedShoppingList"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    import BasketIcon from '@/assets/icon/basket.svg';
    import UpChevronIcon from '@/assets/icon/chevron-up.svg';
    import DownChevronIcon from '@/assets/icon/chevron-down.svg';

    export default {
        name: 'ShoppingListView',

        components: {
            draggable,

            HeaderComponent,
            ProductItemComponent,
            BasketIcon,
            UpChevronIcon,
            DownChevronIcon,
        },

        data() {
            return {
                isCheckedHidden: false,

                draggableOptions: {
                    animation: 0,
                    disabled: false,
                    ghostClass: 'is-dragged',
                },
            }
        },

        computed: {
            uncheckedShoppingList: {
                get() {
                    return Object.values(this.$root.$data.getUncheckedShoppingList());
                },

                set(list) {
                    const newList = list.reduce((total, product) => ({
                        ...total,
                        [`id-${product.tpnc}`]: product,
                    }), {});

                    this.$root.$data.setUncheckedShoppingList(newList);
                },
            },

            checkedShoppingList() {
                return Object.values(this.$root.$data.getCheckedShoppingList())
                    .sort((a, b) => b.timesAddedToShoppingList - a.timesAddedToShoppingList);
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
                if (this.uncheckedShoppingList.length === 0) {
                    return 'Empty!';
                }

                const total = this.uncheckedShoppingList
                    .map(p => p.price * p.quantity)
                    .reduce((total, p) => total + p)
                    .toFixed(2);

                return `£${total}`;
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
