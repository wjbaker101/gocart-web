<template>
    <div class="shopping-list-view">
        <HeaderComponent>
            <template v-slot:right-side>
                <div @click="setLocked(!isLocked)">
                    <BasketIcon />
                    <LockIcon class="lock-icon icon-small" :class="{ 'is-locked': isLocked }" />
                    <span class="total-price">{{ displayPrice }}</span>
                </div>
            </template>
        </HeaderComponent>
        <div class="zerostate-shopping-view view-content" v-if="isShoppingListEmpty" :class="{ 'is-expanded': showZeroStateContent }">
            <section class="text-centered">
                <BasketIcon class="zerostate-shopping-basket icon-xlarge" />
                <p><strong>Your shopping list is empty!</strong></p>
                <p class="show-content-link" @click="showZeroStateContent = !showZeroStateContent">
                    <InfoIcon class="info" />
                    <span>What Now?</span>
                    <UpChevronIcon class="up-arrow" />
                    <DownChevronIcon class="down-arrow" />
                </p>
            </section>
            <div class="zerostate-expanded-content">
                <h2>Step 1</h2>
                <section>
                    <p>Search for the products you want and add them to your list.</p>
                </section>
                <h2>Step 2</h2>
                <section>
                    <p>During a shop, tap the checkbox of a product in order to move it to the "checked list".</p>
                    <p>This way, you'll know what products to buy next!</p>
                </section>
            </div>
        </div>
        <div class="shopping-list-container" v-else>
            <div class="heading-container">
                <p class="heading-left">Shopping List:</p>
                <p class="heading-right"><span class="counter-number">{{ uncheckedShoppingList.length }}</span></p>
            </div>
            <draggable
                    class="unchecked-products-container"
                    tag="div"
                    v-model="uncheckedShoppingList"
                    v-bind="draggableOptions"
                    @start="setDeleteDragging($event, true, 'unchecked')"
                    @end="setDeleteDragging($event, false, 'unchecked')">
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
            <draggable
                    class="checked-products-container"
                    v-if="!isCheckedHidden"
                    v-model="checkedShoppingList"
                    v-bind="draggableOptions"
                    :group="{ put: [] }"
                    @start="setDeleteDragging($event, true, 'checked')"
                    @end="setDeleteDragging($event, false, 'checked')">
                <ProductItemComponent
                    :key="product.id"
                    v-for="(product, index) in checkedShoppingList"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`" />
            </draggable>
            <div ref="deleteProductContainer"
                class="delete-product-container"
                :class="{ 'is-visible': isDeleteDragging, 'is-over': isDeleteDragOver, }"
                @dragover="onDragOver"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @drop="onDrop"
                @dragdrop="onDrop"
            >
                <BinIcon />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import draggable from 'vuedraggable';

    import { EventService, Events } from '@frontend/service/EventService';

    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ProductItemComponent from '@frontend/component/ProductItemComponent.vue';

    import BasketIcon from '@frontend/assets/icon/basket.svg';
    import BinIcon from '@frontend/assets/icon/bin.svg';
    import UpChevronIcon from '@frontend/assets/icon/chevron-up.svg';
    import DownChevronIcon from '@frontend/assets/icon/chevron-down.svg';
    import InfoIcon from '@frontend/assets/icon/info.svg';
    import LockIcon from '@frontend/assets/icon/lock.svg';

    export default Vue.extend({
        name: 'ShoppingListView',

        components: {
            draggable,

            HeaderComponent,
            ProductItemComponent,
            BasketIcon,
            BinIcon,
            UpChevronIcon,
            DownChevronIcon,
            InfoIcon,
            LockIcon,
        },

        data() {
            return {
                isCheckedHidden: false,

                draggableOptions: {
                    delay: 300,
                    animation: 0,
                    disabled: false,
                    ghostClass: 'is-dragged',
                },

                showZeroStateContent: false,

                isLocked: false,
                savedTotalPrice: 0,

                isDeleteDragging: false,
                deleteProductID: null,
                isDeleteDragOver: false,
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

            isShoppingListEmpty(): boolean {
                return this.uncheckedShoppingList.length === 0
                        && this.checkedShoppingList.length === 0;
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
                    .map((p: ITescoProduct) => p.price * p.quantity)
                    .reduce((total: number, p: number) => total + p)
                    .toFixed(2);

                return `£${total}`;
            },

            displayPrice(): string {
                if (this.isLocked) {
                    return this.savedTotalPrice;
                }

                return this.totalPrice;
            },
        },

        created() {
            const isTotalPriceLocked = this.$root.$data.isTotalPriceLocked();

            this.setLocked(isTotalPriceLocked.locked, false);
            this.savedTotalPrice = isTotalPriceLocked.totalValue;

            document.addEventListener('touchend', this.onTouchUp);
            document.addEventListener('touchmove', this.onTouchMove);
        },

        destroyed() {
            document.removeEventListener('touchend', this.onTouchUp);
            document.removeEventListener('touchmove', this.onTouchMove);
        },

        methods: {
            setLocked(isLocked: boolean, update: boolean = true): void {
                this.isLocked = isLocked;

                if (this.isLocked) {
                    this.savedTotalPrice = this.totalPrice;
                }

                if (update) {
                    this.$root.$data.setTotalPriceLocked(this.isLocked, this.savedTotalPrice);
                }
            },

            setDeleteDragging(event: any, isDragging: boolean, source: string): void {
                this.isDeleteDragging = isDragging;

                if (source === 'unchecked' && event.oldIndex < this.uncheckedShoppingList.length) {
                    this.deleteProductID = this.uncheckedShoppingList[event.oldIndex].id;
                }
                else if (source === 'checked' && event.oldIndex < this.checkedShoppingList.length) {
                    this.deleteProductID = this.checkedShoppingList[event.oldIndex].id;
                }
            },

            onDragOver(event: Event): void {
                event.preventDefault();
            },

            onDragEnter(event: Event): void {
                this.isDeleteDragOver = true;

                event.preventDefault();
            },

            onDragLeave(event: Event): void {
                this.isDeleteDragOver = false;

                event.preventDefault();
            },

            onDrop(event: Event): void {
                this.removeProduct();

                event.preventDefault();
            },

            onTouchMove(event: TouchEvent): void {
                const { clientX, clientY } = event.changedTouches[0];

                if (this.isOverBin(clientX, clientY)) {
                    this.isDeleteDragOver = true;
                }
                else {
                    this.isDeleteDragOver = false;
                }
            },

            onTouchUp(event: TouchEvent): void {
                const { clientX, clientY } = event.changedTouches[0];

                if (!this.isOverBin(clientX, clientY)) {
                    return;
                }

                this.removeProduct();
            },

            removeProduct(): void {
                if (this.deleteProductID === null) {
                    return;
                }

                if (!this.isDeleteDragging) {
                    return;
                }

                this.$root.$data.removeFromUncheckedShoppingList(this.deleteProductID);
                this.$root.$data.removeFromCheckedShoppingList(this.deleteProductID);

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Product has been removed!');

                this.isDeleteDragOver = false;
            },

            isOverBin(x: number, y: number): boolean {
                const { top, left } = this.$refs.deleteProductContainer.getBoundingClientRect();
                const { offsetWidth, offsetHeight } = this.$refs.deleteProductContainer;

                if (x < left || x > left + offsetWidth) {
                    return false;
                }

                if (y < top || y > top + offsetHeight) {
                    return false;
                }

                return true;
            },
        },
    })
</script>

<style lang="scss">
    .shopping-list-view {

        .right-side {
            flex: 0 0 auto;
            cursor: pointer;
        }

        .lock-icon {
            opacity: 0;
            vertical-align: top;
            color: theme(secondary);
            transition: opacity animation(duration-short);

            &.is-locked {
                opacity: 1;
            }
        }

        .total-price {
            margin-left: 0.25rem;
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

        .zerostate-shopping-view {
            padding-top: 25vh;
            transition: padding-top animation(duration-short);

            .show-content-link {
                cursor: pointer;
            }

            &.is-expanded {
                padding-top: 15vh;

                .zerostate-expanded-content {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
                }

                .up-arrow {
                    display: initial;
                }

                .down-arrow {
                    display: none;
                }
            }

            .zerostate-expanded-content {
                clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
                transition: clip-path animation(duration-mid);
            }

            .info {
                color: theme(primary);
                margin-right: 0.5rem;
            }

            .up-arrow,
            .down-arrow {
                margin-left: 0.5rem;
            }

            .up-arrow {
                display: none;
            }
        }

        .zerostate-shopping-basket {
            color: theme(primary);
        }

        .delete-product-container {
            position: fixed;
            bottom: 6rem;
            left: 1rem;
            right: 1rem;
            text-align: center;
            border-radius: layout(border-radius);
            background-color: theme(negative);
            color: theme(white);
            opacity: 0;
            pointer-events: none;
            transform: translateY(1rem);
            z-index: 8;
            transition: opacity animation(duration-mid), transform animation(duration-short);

            @include box-shadow-small;

            .product-item-component {
                display: none;
            }

            svg {
                margin: 1.5rem 0;
                pointer-events: none;
            }

            &.is-visible {
                opacity: 1;
                pointer-events: all;
                transform: translateY(0);
            }

            &.is-over {
                outline: 4px solid theme(negative);
                outline-offset: 3px;
            }
        }
    }
</style>
