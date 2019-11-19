<template>
    <div class="product-search-view">
        <HeaderComponent>
            <template v-slot:below>
                <div class="search-input-container">
                    <InputComponent
                        v-model="searchTerm"
                        placeholder="Apple Pie"
                        @enter="onSearch" />
                    <ButtonComponent class="search-button" @click="onSearch">
                        <SearchIcon />
                    </ButtonComponent>
                </div>
            </template>
            <template v-slot:right-side>
                <div class="sort-container" @click="isSortOptionsVisible = ! isSortOptionsVisible">
                    Sort Results
                    <SortIcon />
                    <div class="sort-options-container" :class="{ 'is-visible': isSortOptionsVisible }">
                        <ul>
                            <li>Alphabetical</li>
                            <li>Price</li>
                            <li>Health</li>
                        </ul>
                    </div>
                </div>
            </template>
        </HeaderComponent>
        <div class="search-container">
            <p class="text-centered" v-show="!isLoaded && !isLoading">No results yet!</p>
            <p class="text-centered" v-show="isLoading">Searching...</p>
            <div class="search-results" v-show="isLoaded && searchResult !== null">
                <ProductItemComponent
                    v-bind:key="index"
                    v-for="(product, index) in searchResult"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`"
                    @expandProduct="onExpandProduct" />
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/api/API.js';

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import InputComponent from '@/component/item/InputComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';
    import ButtonComponent from '@/component/item/ButtonComponent.vue';

    import SortIcon from '@/assets/icon/sort.svg';
    import SearchIcon from '@/assets/icon/search.svg';

    import searchResultStoreService from '@/service/SearchResultStoreService.js';

    export default {
        name: 'ProductSearchView',

        components: {
            HeaderComponent,
            InputComponent,
            ProductItemComponent,
            ButtonComponent,
            SortIcon,
            SearchIcon,
        },

        data() {
            return {
                searchTerm: '',
                isLoaded: false,
                isLoading: false,
                searchResult: null,
                isSortOptionsVisible: false,
            }
        },

        computed: {
            loadAnimationDuration() {
                return (index) => {
                    if (index > 20) {
                        return 20 * 0.15;
                    }

                    return (index + 1) * 0.15;
                }
            },
        },

        methods: {
            async onSearch() {
                if (this.searchTerm.length === 0) {
                    return;
                }

                this.isLoaded = false;
                this.isLoading = true;

                const response = await API.searchProduct(this.searchTerm);

                this.searchResult = response.data.result.map(p => ({
                    ...p,
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
            },

            onExpandProduct(product) {
                this.$emit('expandProduct', product);
            },

            getCachedSearchResult() {
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
        },

        async created() {
            this.getCachedSearchResult();
        },
    }
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
    }
</style>
