<template>
    <div class="shop-search-view">
        <HeaderComponent>
            <template v-slot:below>
                <div class="search-input-container">
                    <InputComponent
                        v-model="searchTerm"
                        placeholder="Tesco Extra"
                        @enter="onSearch" />
                </div>
            </template>
        </HeaderComponent>
        <div class="search-container">
            <p class="text-centered" v-show="!isLoaded && !isLoading">No results yet!</p>
            <p class="text-centered" v-show="isLoading">Searching...</p>
            <div class="search-results" v-show="isLoaded && searchResult !== null">
                <!-- <ProductItemComponent
                    v-bind:key="index"
                    v-for="(product, index) in searchResult"
                    :product="product"
                    hasCheckBox="true"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`"
                    @expandProduct="onExpandProduct" /> -->
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/api/API.js';

    import HeaderComponent from '@/component/page/HeaderComponent.vue';
    import InputComponent from '@/component/item/InputComponent.vue';
    import ProductItemComponent from '@/component/ProductItemComponent.vue';

    import searchResultStoreService from '@/service/SearchResultStoreService.js';

    export default {
        name: 'ProductSearchView',

        components: {
            HeaderComponent,
            InputComponent,
            ProductItemComponent,
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

                // const response = await API.searchProduct(this.searchTerm);

                // this.searchResult = response.data.result.map(p => ({
                //     ...p,
                //     quantity: 1,
                //     isChecked: false,
                // }));

                // console.log(this.searchResult);

                // this.$root.$data.setSearchResult({
                //     searchTerm: this.searchTerm,
                //     searchResult: this.searchResult,
                // });

                this.isLoaded = true;
                this.isLoading = false;
            },
        },

        async created() {
            this.$emit('viewChange', 'shop_search');
        },
    }
</script>

<style lang="scss">
    .shop-search-view {

        .search-input-container {
            padding-top: 1rem;

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
