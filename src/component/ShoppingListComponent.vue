<template>
    <div class="shopping-list-container">
        <h2>Search Result</h2>
        <article class="card" v-bind:key="index" v-for="(product, index) in productSearchResult" :data-product-id="product.tpnc">
            <div class="image-container">
                <img class="product-image" :src="product.image">
            </div>
            <div class="product-name">
                <div>
                    <span>{{ product.name }}</span>
                </div>
            </div>
            <div class="product-price">
                <span>£{{ product.price.toFixed(2) }}</span>
            </div>
        </article>
    </div>
</template>

<script>
    import API from '@/api/API.js';

    export default {
        name: 'ShoppingListComponent',

        props: [ 'shoppingList' ],

        data() {
            return {
                productSearchResult: [],
            }
        },

        computed: {
            checkedProducts: function() {
                return this.shoppingList.filter(product => product.checked);
            },

            uncheckedProducts: function() {
                return this.shoppingList.filter(product => !product.checked);
            },
        },

        async mounted() {
            const response = await API.searchProduct('ketchup');

            this.productSearchResult = response.data.result;

            this.$emit('productSelected', this.productSearchResult[0]);
        },
    }
</script>

<style lang="scss">
    article {
        display: flex;
        overflow-x: hidden;

        & > * {
            flex: 1;
            margin: auto 0;
            word-wrap: none;
            flex-grow: 100%;
        }

        & + article {
            margin-top: 0.5rem;
        }

        & > .image-container,
        & > .product-price {
            flex: 0 0 auto;
        }

        & > .product-price {
            position: relative;
            background-color: theme(white);
            z-index: 1;
        }

        span,
        img {
            vertical-align: middle;
        }
    }
</style>
