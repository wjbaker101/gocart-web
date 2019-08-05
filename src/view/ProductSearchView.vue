<template>
    <div class="product-search-view">
        <div class="search-input-container">
            <InputComponent
                v-model="searchTerm"
                placeholder="Search for a product"
                @enter="onSearch" />
        </div>
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

    import InputComponent from '@/component/item/InputComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    import searchResultStoreService from '@/service/SearchResultStoreService.js';
    import productStoreService from '@/service/ProductStoreService.js';

    export default {
        name: 'ProductSearchView',

        components: {
            InputComponent,
            ProductItemComponent,
        },

        data() {
            return {
                searchTerm: '',
                isLoaded: false,
                isLoading: false,
                searchResult: null,
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
                    isChecked: true,
                }));

                console.log(this.searchResult);

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

        .search-input-container {
            padding: 1rem;
            padding-top: 0;
            background-color: theme(primary);
            border-bottom-right-radius: layout(border-radius);
            border-bottom-left-radius: layout(border-radius);
            color: theme(white);
            box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);

            .search-input {
                width: 100%;
                border-radius: layout(border-radius);
            }
        }

        .search-container {
            padding: 1rem 0;
        }
    }
</style>
