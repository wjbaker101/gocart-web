<template>
    <div class="product-view" v-if="product">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>{{ product.name }}</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="view-content product-content">
            <section class="image">
                <img :src="largerImageUrl">
                <p><strong>£{{ product.price.toFixed(2) }}</strong></p>
            </section>
            <section>
                <ButtonComponent
                    class="add-remove-button"
                    :isSecondary="isProductInShoppingList"
                    @click.native="onAddClick">

                    {{ addButtonText }}
                </ButtonComponent>
            </section>
            <section>
                <label>Quantity:</label>
                <br>
                <NumberInputComponent label="Quantity" v-model="product.quantity" :min="1" :max="1000" />
            </section>
            <h2 v-if="productData && productData.ingredients">
                <span>Ingredients</span>
            </h2>
            <section v-if="productData && productData.ingredients">
                <p class="ingredients" v-html="productData.ingredients"></p>
            </section>
            <h2 v-if="productData && productData.nutritionalValue">
                <span>Nutritional Value</span>
            </h2>
            <section v-if="productData && productData.nutritionalValue">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{ productData.nutritionalValue.header.per100g }}</th>
                            <th>{{ productData.nutritionalValue.header.perServing }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(nutrient, index) in productData.nutritionalValue.values" :key="`nutrient-${index}`">
                            <td>{{ nutrient.name }}</td>
                            <td class="numerical">{{ nutrient.per100g }}</td>
                            <td class="numerical">{{ nutrient.perServing }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import TescoClient from '@frontend/api/TescoClient';
    import { OFFClient } from '@frontend/api/OFFClient';

    import {
        ITescoProduct,
        ITescoProductData,
    } from '@frontend/interface/ITescoProduct';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';
    import NumberInputComponent from '@frontend/component/item/NumberInputComponent.vue';

    export default Vue.extend({
        name: 'ProductView',

        components: {
            HeaderComponent,
            ButtonComponent,
            NumberInputComponent,
        },

        data() {
            return {
                product: null as (ITescoProduct | null),
                productData: null,
                isProductInShoppingList: false,
            }
        },

        computed: {
            largerImageUrl(): string {
                if (!this.product) return '';

                return this.product.image
                    .replace('90x90', '225x225')
                    .replace('http://', 'https://');
            },

            addButtonText(): string {
                if (this.isProductInShoppingList) {
                    return 'Remove from List';
                }

                return 'Add to List';
            },
        },

        async created(): Promise<void> {
            this.product = this.$root.$data.getCurrentProduct();

            if (!this.product) {
                return;
            }

            const fullShoppingList = {
                ...this.$root.$data.getUncheckedShoppingList(),
                ...this.$root.$data.getCheckedShoppingList(),
            };

            this.isProductInShoppingList =
                `id-${this.product.id}` in fullShoppingList;
        },

        async mounted() {
            if (!this.product.productData) {
                await this.getProductData();

                if (this.productData && !this.productData.ingredients) {
                    const moreProductData = await OFFClient.getProductData(this.productData.barcodeID);

                    if (moreProductData instanceof Error) return;

                    this.productData.ingredients = moreProductData.result.ingredients;
                    this.productData.nutritionalValue = {
                        header: {
                            per100g: 'Per 100g',
                            perServing: 'Per Serving',
                        },
                        values: moreProductData.result.nutrientValues,
                    };

                    this.product.productData = this.productData;
                }
            }
            else {
                this.productData = this.product.productData;
            }
        },

        methods: {
            onAddClick(): void {
                if (!this.product) {
                    return;
                }

                this.isProductInShoppingList = !this.isProductInShoppingList;

                if (this.isProductInShoppingList) {
                    this.$root.$data.addToUncheckedShoppingList(this.product);
                }
                else {
                    this.$root.$data.removeFromUncheckedShoppingList(this.product.id);
                    this.$root.$data.removeFromCheckedShoppingList(this.product.id);
                }
            },

            async getProductData(): Promise<void> {
                const response =
                    await TescoClient.getProductDataByTPNC(this.product.id);

                if (response instanceof Error) return;

                const result = response.result[0];

                const productData: ITescoProductData = {
                    barcodeID: result.gtin,
                    ingredients: result.ingredients?.join(', '),
                    nutritionalValue: result.calcNutrition ? {
                        header: {
                            per100g: result.calcNutrition.per100Header,
                            perServing: result.calcNutrition.perServingHeader,
                        },
                        values: result.calcNutrition.calcNutrients.map(n => ({
                            name: n.name,
                            per100g: n.valuePer100,
                            perServing: n.valuePerServing,
                        })),
                    } : undefined,
                };

                this.productData = productData;
                this.product.productData = productData;
            },
        },
    })
</script>

<style lang="scss">
    .product-view {

        .product-title-container {
            text-align: center;

            h2 {
                margin-bottom: 0;
            }
        }

        .product-content {

            .image {
                text-align: center;

                img {
                    border-radius: layout(border-radius);

                    @include box-shadow-small;
                }
            }

            .add-remove-button {
                width: 100%;
            }

            .ingredients {

                * {
                    vertical-align: baseline;
                }

                .allergen {
                    font-weight: bold;
                }
            }
        }
    }
</style>
