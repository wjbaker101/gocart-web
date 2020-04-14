<template>
    <div class="alternative-product-component" @click="onClick">
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

        props: ['product'],

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
        display: inline-block;
        text-align: center;
        background-color: theme(white);
        white-space: pre-wrap;
        cursor: pointer;

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
