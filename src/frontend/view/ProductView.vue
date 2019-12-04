<template>
    <div class="product-view" v-if="product">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <h2>{{ product.name }}</h2>
                </div>
            </template>
        </HeaderComponent>
        <div class="product-container">
            <img class="product-image" :src="largerImageUrl">
            <p><strong>£{{ product.price.toFixed(2) }}</strong></p>
            <p>
                <ButtonComponent
                    :isSecondary="isProductInShoppingList"
                    @click.native="onAddClick">

                    {{ addButtonText }}
                </ButtonComponent>
            </p>
            <div class="flex-container">
                <label class="form-label">Quantity:</label>
                <NumberInputComponent label="Quantity" v-model="product.quantity" :min="1" :max="1000" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    import LeftArrowIcon from '@frontend/assets/icon/arrow-left.svg';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';
    import NumberInputComponent from '@frontend/component/item/NumberInputComponent.vue';

    export default Vue.extend({
        name: 'ProductView',

        components: {
            LeftArrowIcon,
            HeaderComponent,
            ButtonComponent,
            NumberInputComponent,
        },

        data() {
            return {
                product: null as (ITescoProduct | null),
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

        .product-image {
            border-radius: layout(border-radius);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .product-container {
            max-width: 720px;
            margin: auto;
            padding: 1rem;
            text-align: center;

            .form-label {
                margin: auto;
                font-weight: bold;
                text-align: initial;
            }
        }
    }
</style>
