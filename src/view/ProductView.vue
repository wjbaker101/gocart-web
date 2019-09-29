<template>
    <div class="product-view" v-if="productExists">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="product-title-container">
                    <!-- <a @click="$router.go(-1)" class="back-button-container">
                        <LeftArrowIcon />
                    </a> -->
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

<script>
    import LeftArrowIcon from '@/assets/icon/arrow-left.svg';

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import ButtonComponent from '@/component/item/ButtonComponent.vue';
    import NumberInputComponent from '@/component/item/NumberInputComponent.vue';

    export default {
        name: 'ProductView',

        props: ['product'],

        components: {
            LeftArrowIcon,
            HeaderComponent,
            ButtonComponent,
            NumberInputComponent,
        },

        data() {
            return {
                isProductInShoppingList: false,
            }
        },

        computed: {
            largerImageUrl() {
                return this.product.image.replace('90x90', '225x225');
            },

            description() {
                return this.product.description.replace('\n', '<br>');
            },

            addButtonText() {
                if (this.isProductInShoppingList) {
                    return 'Remove from List';
                }

                return 'Add to List';
            },

            productExists() {
                return this.product && this.product !== null;
            },
        },

        created() {
            if (!this.productExists) {
                return;
            }

            const shoppingList = this.$root.$data.getShoppingList();

            this.isProductInShoppingList = this.product.tpnc in shoppingList;
        },

        methods: {
            onAddClick() {
                this.isProductInShoppingList = !this.isProductInShoppingList;

                if (this.isProductInShoppingList) {
                    this.$root.$data.addToShoppingList({
                        [this.product.tpnc]: this.product,
                    });
                }
                else {
                    this.$root.$data.removeFromShoppingList(this.product.tpnc);
                }
            },
        },
    }
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

        // .product-title-container {
            // position: relative;
        //     padding: 1rem;
        //     padding-top: 0;
        //     text-align: center;
        //     background-color: theme(primary);
        //     border-bottom-right-radius: layout(border-radius);
        //     border-bottom-left-radius: layout(border-radius);
        //     color: theme(white);
        //     z-index: 10;

        //     &::before {
        //         content: '';
        //         height: 1px;
        //         position: absolute;
        //         bottom: 0;
        //         right: 0;
        //         left: 0;
        //         box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
        //         z-index: 8;
        //     }

        //     h2 {
        //         margin: 0;
        //         margin-bottom: 1rem;
        //     }

        //     .back-button-container {
        //         height: 100%;
        //         position: absolute;
        //         display: flex;
        //         padding: 0 1rem 2rem 1rem;
        //         top: 0;
        //         left: 0;
        //         cursor: pointer;
        //         transition: color animation(duration-mid);

        //         &:hover {
        //             color: theme(secondary);
        //         }

        //         & > * {
        //             margin: auto;
        //         }
        //     }
        // }

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
