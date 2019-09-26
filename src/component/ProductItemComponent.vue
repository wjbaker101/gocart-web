<template>
    <div
        class="product-item-component"
        :data-product-id="product.tpnc"
        @click.self="onClick">

        <div class="is-checked-container" v-if="hasCheckBox">
            <CheckBoxComponent
                :id="`${product.tpnc}-checkbox`"
                v-model="product.isChecked" />
        </div>
        <div class="image-container">
            <img class="product-image"
                :src="product.image"
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

<script>
    import CheckBoxComponent from '@/component/item/CheckBoxComponent.vue';

    import FoodIcon from '@/assets/icon/food.svg';

    export default {
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
        },

        methods: {
            onClick() {
                this.$router.push({
                    name: 'product-route',
                    params: { product: this.product },
                });
            },
        },
    }
</script>

<style lang="scss">
    .product-item-component {
        display: flex;
        margin: 0.5rem 0;
        padding: 0.5rem 1rem;
        border-radius: layout(border-radius);
        border-left: 4px solid theme(white);
        background-color: theme(white);
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        animation: anim animation(duration-short);

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
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
            border-left: 4px solid theme(secondary);

            .product-price {
                padding-left: 0.5rem;
                box-shadow: -2px 0 4px theme(white);
            }
        }

        .is-checked-container {
            padding-right: 1rem;
            pointer-events: all;
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
