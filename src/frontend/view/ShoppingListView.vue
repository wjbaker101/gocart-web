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
                        :key="String(product.id)"
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
                    :key="product.id"
                    v-for="(product, index) in checkedShoppingList"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import draggable from 'vuedraggable';

    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ProductItemComponent from '@frontend/component/ProductItemComponent.vue';

    import BasketIcon from '@frontend/assets/icon/basket.svg';
    import UpChevronIcon from '@frontend/assets/icon/chevron-up.svg';
    import DownChevronIcon from '@frontend/assets/icon/chevron-down.svg';

    export default Vue.extend({
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
                get(): ITescoProduct[] {
                    return Object.values(this.$root.$data.getUncheckedShoppingList());
                },

                set(list: ITescoProduct[]) {
                    const newList = list.reduce((total, product) => ({
                        ...total,
                        [`id-${product.id}`]: product,
                    }), {});

                    this.$root.$data.setUncheckedShoppingList(newList);
                },
            },

            checkedShoppingList(): ITescoProduct[] {
                return Object.values<ITescoProduct>(this.$root.$data.getCheckedShoppingList())
                    .sort((a, b) => b.timesAddedToShoppingList - a.timesAddedToShoppingList);
            },

            loadAnimationDuration(): (index: number) => number {
                return (index: number) => {
                    if (index > 20) {
                        return 20 * 0.15;
                    }

                    return (index + 1) * 0.15;
                }
            },

            totalPrice(): string {
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
    })
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
