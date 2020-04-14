<template>
    <div class="product-search-view">
        <HeaderComponent>
            <template v-slot:below>
                <div class="search-input-container">
                    <input ref="productSearchInput"
                            v-model="searchTerm"
                            placeholder="Apple Pie"
                            @keypress.enter="onSearch"
                            type="search">
                    <ButtonComponent class="search-button" @click="onSearch">
                        <SearchIcon />
                    </ButtonComponent>
                </div>
            </template>
            <template v-slot:right-side>
                <div class="sort-container" @click="isSortOptionsVisible = ! isSortOptionsVisible">
                    Sort Results
                    <SortIcon />
                    <SearchSortComponent
                        :isVisible="isSortOptionsVisible"
                        @sortChange="onSortChange" />
                </div>
            </template>
        </HeaderComponent>
        <div class="search-container">
            <p class="text-centered" v-show="!isLoaded && !isLoading">No results yet!</p>
            <p class="text-centered" v-show="isLoading">Searching...</p>
            <p class="text-centered" v-show="isLoaded && !isLoading && searchResult.length === 0">Sorry, no products found!</p>
            <div class="search-results" v-show="isLoaded && searchResult !== null">
                <ProductItemComponent
                    :key="product.id"
                    v-for="(product, index) in firstSearchResults"
                    :product="product"
                    :hasCheckBox="false"
                    :hasAddToList="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`"
                    @expandProduct="onExpandProduct" />
                <div class="freeform-container">
                    <p>Can't find the product you're looking for?</p>
                    <p>
                        <ButtonComponent @click="addFreeformText()">Add as Freeform Text</ButtonComponent>
                    </p>
                </div>
                <div v-if="searchResult && searchResult.length > 3">
                    <ProductItemComponent
                        :key="product.id"
                        v-for="(product, index) in restOfSearchTerms"
                        :product="product"
                        :hasCheckBox="false"
                        :hasAddToList="true"
                        :style="`animation-duration: ${loadAnimationDuration(index)}s`"
                        @expandProduct="onExpandProduct" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import { v4 as uuid } from 'uuid';

    import TescoClient from '@frontend/api/TescoClient';
    import { TescoProductService } from '@frontend/service/TescoProductService';
    import { EventService, Events } from '@frontend/service/EventService';

    import { IResponseEntity } from '@common/interface/IResponseEntity';
    import { ITescoProduct } from '@frontend/interface/ITescoProduct';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ProductItemComponent from '@frontend/component/ProductItemComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';
    import SearchSortComponent from '@frontend/component/search-view/SearchSortComponent.vue';

    import SortIcon from '@frontend/assets/icon/sort.svg';
    import SearchIcon from '@frontend/assets/icon/search.svg';

    export default Vue.extend({
        name: 'ProductSearchView',

        components: {
            HeaderComponent,
            ProductItemComponent,
            ButtonComponent,
            SearchSortComponent,
            SortIcon,
            SearchIcon,
        },

        data() {
            return {
                searchResult: null as (ITescoProduct[] | null),
                searchTerm: '',
                isLoaded: false,
                isLoading: false,
                isSortOptionsVisible: false,
            }
        },

        computed: {
            firstSearchResults(): ITescoProduct[] {
                if (this.searchResult === null) {
                    return [];
                }

                if (this.searchResult.length < 3) {
                    return this.searchResult;
                }

                return this.searchResult.filter((r: any, i: number) => i < 3);
            },

            restOfSearchTerms(): ITescoProduct[] {
                if (this.searchResult === null) {
                    return [];
                }

                if (this.searchResult.length < 3) {
                    return [];
                }

                return this.searchResult.filter((r: any, i: number) => i >= 3);
            },

            loadAnimationDuration(): (index: number) => number {
                return (index: number) => {
                    if (index > 20) {
                        return 20 * 0.15;
                    }

                    return (index + 1) * 0.15;
                }
            },
        },

        methods: {
            async onSearch(): Promise<void> {
                const productSearchInput: HTMLInputElement
                        = this.$refs.productSearchInput;

                if (this.searchTerm.length === 0) {
                    productSearchInput.focus();

                    return;
                }

                this.isLoaded = false;
                this.isLoading = true;

                productSearchInput.blur();

                const response =
                        await TescoClient.getGrocerySearch(this.searchTerm);

                if (response instanceof Error) {
                    productSearchInput.focus();
                    return;
                }

                if (response.result.length === 0) {
                    productSearchInput.focus();
                    this.isLoaded = true;
                    this.searchResult = [];
                }

                this.searchResult = response.result.map(product => ({
                    ...product,
                    description: product.description ? product.description.join('<br>') : '',
                    quantity: 1,
                    isChecked: false,
                    timesAddedToShoppingList: 0,
                }));

                this.$root.$data.setSearchResult({
                    searchTerm: this.searchTerm,
                    searchResult: this.searchResult,
                });

                this.isLoaded = true;
                this.isLoading = false;

                await this.getProductData();
            },

            onExpandProduct(product: ITescoProduct): void {
                this.$emit('expandProduct', product);
            },

            async getProductData(): Promise<void> {
                const tpncList = this.searchResult
                        .map((r: ITescoProduct) => r.id);

                const productDataResult =
                        await TescoClient.getMultiProductDataByTPNC(tpncList);

                if (productDataResult instanceof Error) {
                    return;
                }

                this.searchResult.forEach((searchResult: ITescoProduct) => {
                    const product = productDataResult.result
                            .find(p => Number(p.tpnc) === searchResult.id);

                    if (product) {
                        TescoProductService.addDataToExistingProduct(
                                searchResult,
                                product);
                    }
                });
            },

            getCachedSearchResult(): void {
                if (this.searchResult !== null) {
                    return;
                }

                const cache = this.$root.$data.getSearchResult();

                if (cache === null) {
                    return;
                }

                this.searchResult = cache.searchResult;
                this.searchTerm = cache.searchTerm;

                this.isLoaded = true;
                this.isLoading = false;
            },

            onSortChange(sort: (a: ITescoProduct, b: ITescoProduct) => number):
                    void {

                if (!this.searchResult || this.searchResult.length === 0) {
                    return;
                }

                this.searchResult = this.searchResult.sort(sort);
            },

            addFreeformText() {
                this.$root.$data.addToUncheckedShoppingList({
                    id: `freeform-${uuid()}`,
                    name: this.searchTerm,
                    image: '',
                    price: 0,
                    description: '',
                    quantity: 1,
                    isChecked: false,
                    timesAddedToShoppingList: 0,
                    isFreeform: true,
                });

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Added as Freeform Text!');
            },
        },

        async created(): Promise<void> {
            this.getCachedSearchResult();
        },
    })
</script>

<style lang="scss">
    .product-search-view {
        position: relative;

        .sort-container {
            position: relative;
            margin-left: auto;
            display: table;
            cursor: pointer;
            user-select: none;

            ul {
                margin: 0;
                list-style: none;
                padding-left: 0;
            }
        }

        .sort-options-container {
            position: absolute;
            bottom: 0;
            right: 0;
            pointer-events: none;
            padding: 1rem;
            transform: translateY(100%);
            z-index: 10;
            text-align: initial;
            background-color: theme(white);
            color: theme(black);
            border-left: 3px solid theme(secondary);
            border-radius: layout(border-radius);
            box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.5);
            opacity: 0;

            &.is-visible {
                opacity: 1;
                pointer-events: all;
            }
        }

        .search-input-container {
            padding-top: 1rem;
            display: flex;

            .search-input {
                flex: 1;
                border-radius: layout(border-radius);
            }

            .search-button {
                flex: 0 0 auto;
                margin-left: 0.5rem;
            }
        }

        .search-container {
            padding: 1rem;
        }

        .freeform-container {
            padding: 1rem 0;
            text-align: center;
        }
    }
</style>
