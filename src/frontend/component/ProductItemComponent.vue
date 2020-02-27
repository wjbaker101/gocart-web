<template>
    <div
        class="product-item-component"
        @click.self="onClick">

        <div class="is-checked-container" v-if="hasCheckBox">
            <CheckBoxComponent
                :id="`${product.id}-checkbox`"
                v-model="product.isChecked"
                @input="onCheckUpdate" />
        </div>
        <div class="image-container">
            <img class="product-image"
                :src="productImage"
                v-if="!showPlaceholderImage">
            <div class="placeholder-image-container" v-else>
                <FoodIcon />
            </div>
        </div>
        <div class="product-name">
            <span>{{ product.name }}</span>
        </div>
        <div class="product-price">
            <span>£{{ product.price.toFixed(2) }}</span>
            <div v-if="product.quantity > 1" class="quantity-container">
                <strong>&times;{{ product.quantity }}</strong>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import CheckBoxComponent from '@frontend/component/item/CheckBoxComponent.vue';

    import FoodIcon from '@frontend/assets/icon/food.svg';

    export default Vue.extend({
        name: 'ProductItemComponent',

        props: ['product', 'hasCheckBox'],

        components: {
            CheckBoxComponent,
            FoodIcon,
        },

        computed: {
            showPlaceholderImage() {
                return this.product.image === null || this.product.image === '';
            },

            productImage() {
                return this.product.image.replace('http://', 'https://');
            },
        },

        methods: {
            onClick(): void {
                this.$root.$data.setCurrentProduct(this.product);
                this.$router.push({
                    name: 'product-route',
                });
            },

            onCheckUpdate(isChecked: boolean): void {
                if (isChecked) {
                    this.$root.$data.removeFromUncheckedShoppingList(String(this.product.id));
                    this.$root.$data.addToCheckedShoppingList(this.product);
                }
                else {
                    this.product.timesAddedToShoppingList += 1;

                    this.$root.$data.removeFromCheckedShoppingList(String(this.product.id));
                    this.$root.$data.addToUncheckedShoppingList(this.product);
                }
            },
        },
    })
</script>

<style lang="scss">
    .product-item-component {
        display: flex;
        margin: 0.5rem 0;
        padding: 0.5rem 1rem;
        border-radius: layout(border-radius);
        border: 2px solid transparent;
        background-color: theme(white);
        cursor: pointer;
        user-select: none;
        transition: box-shadow animation(duration-mid);
        animation: anim animation(duration-short);

        @include box-shadow-small;

        &.is-dragged,
        &.sortable-chosen {
            border-color: theme(accent);
        }

        @keyframes anim {
            from {
                opacity: 0;
                transform: translateX(-1rem);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        &:hover {
            @include box-shadow-small-hover;

            .product-price {
                padding-left: 0.5rem;
                box-shadow: -2px 0 4px theme(white);
            }
        }

        .is-checked-container {
            pointer-events: all;
            flex: 0 0 auto;
        }

        .image-container {
            height: 64px;
            margin-right: 0.5rem;
        }

        .placeholder-image-container {
            width: 64px;
            text-align: center;
            line-height: 64px;
            color: theme(primary);
        }

        .product-image {
            max-height: 64px;
            border-radius: layout(border-radius);
        }

        .product-name {
            overflow-x: hidden;
            white-space: nowrap;
            flex-grow: 1;
        }

        .product-price {
            padding-left: 0.5rem;
            box-shadow: -2px 0 4px theme(white);
        }

        .quantity-container {
            text-align: right;
        }

        & > * {
            margin: auto 0;
            pointer-events: none;
        }
    }
</style>
