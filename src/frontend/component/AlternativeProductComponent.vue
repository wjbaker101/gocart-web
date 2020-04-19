<template>
    <div
        class="alternative-product-component"
        @click="onClick"
        :class="{
            'is-cheaper': isCheaper,
            'is-healthier': isHealthier,
        }"
    >
        <div class="benefit-container">
            <div class="healthier">Healthier</div>
            <div class="cheaper">Cheaper</div>
        </div>
        <div class="image-container">
            <img :src="product.image">
        </div>
        <p>{{ product.name }}</p>
        <p class="price">£{{ product.price.toFixed(2) }}</p>
        <p>
            <ButtonComponent
                @click="onAddClick"
                :isSecondary="isInList"
            >
                {{ addButtonText }}
            </ButtonComponent>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';

    export default Vue.extend({
        name: 'AlternativeProductComponent',

        props: ['product', 'originalProduct'],

        components: {
            ButtonComponent,
        },

        data() {
            return {
                isInList: false,
            }
        },

        computed: {
            addButtonText(): string {
                if (this.isInList) {
                    return 'Remove';
                }

                return 'Add';
            },

            isCheaper(): boolean {
                return this.product.price < this.originalProduct.price;
            },

            isHealthier(): boolean {
                if (!this.product.productData
                        || !this.originalProduct.productData) {

                    return false;
                }

                return this.product.productData.healthScore >
                    this.originalProduct.productData.healthScore;
            },
        },

        created() {
            const uncheckedList = this.$root.$data.getUncheckedShoppingList();
            const checkedList = this.$root.$data.getCheckedShoppingList();

            this.isInList = uncheckedList[`id-${this.product.id}`]
                    || checkedList[`id-${this.product.id}`];
        },

        methods: {
            onClick(): void {
                this.$root.$data.setCurrentProduct(this.product);
                this.$router.push({
                    name: 'product-route',
                });
            },

            onAddClick(): void {
                if (!this.product) {
                    return;
                }

                this.isInList = !this.isInList;

                if (this.isInList) {
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
    .alternative-product-component {
        min-width: 250px;
        padding: 1rem 2rem;
        position: relative;
        display: inline-block;
        text-align: center;
        background-color: theme(white);
        white-space: pre-wrap;
        cursor: pointer;

        .benefit-container {
            position: absolute;
            top: -0;
            left: 0.5rem;
            transform: translateY(-50%);
            color: theme(white);

            .cheaper,
            .healthier {
                padding: 0.25rem 0.5rem;
                border-radius: layout(border-radius);
            }

            .cheaper {
                display: none;
                background-color: #171796;
            }

            .healthier {
                display: none;
                background-color: #176417;
                margin-right: 0.5rem;
            }
        }

        &.is-cheaper,
        &.is-healthier {
            .benefit-container {
                opacity: 1;
                pointer-events: all;
            }
        }

        &.is-cheaper .benefit-container .cheaper {
            display: initial;
        }

        &.is-healthier .benefit-container .healthier {
            display: initial;
        }

        &.is-healthier {
            outline: 0.25rem solid rgba(23, 100, 23, 0.3);
        }

        &.is-cheaper {
            outline: 0.25rem solid rgba(23, 23, 150, 0.3);
        }

        @include box-shadow-small;

        & + .alternative-product-component {
            margin-left: 1rem;
        }

        .image-container img {
            border-radius: layout(border-radius);

            @include box-shadow-small;
        }

        .price {
            font-weight: bold;
        }
    }
</style>
