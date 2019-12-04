<template>
    <div class="shop-search-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="search-input-container">
                    <InputComponent
                        v-model="searchTerm"
                        placeholder="London"
                        @enter="onSearch" />
                </div>
            </template>
        </HeaderComponent>
        <div class="search-container">
            <p class="text-centered" v-show="!isLoaded && !isLoading">No results yet!</p>
            <p class="text-centered" v-show="isLoading">Searching...</p>
            <div class="search-results" v-show="isLoaded && searchResult !== null">
                <ShopItemComponent
                    v-bind:key="index"
                    v-for="(shop, index) in searchResult"
                    :style="`animation-duration: ${loadAnimationDuration(index)}s`"
                    :shop="shop"
                    :isExpanded="shop.isExpanded"
                    @click.native="expandShop(shop)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import TescoClient from '@frontend/api/TescoClient';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import InputComponent from '@frontend/component/item/InputComponent.vue';
    import ShopItemComponent from '@frontend/component/ShopItemComponent.vue';
    import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';

    interface IStoreLocationExpandable extends IStoreLocationResponseResult {
        isExpanded: boolean,
    }

    export default Vue.extend({
        name: 'ShopSearchView',

        components: {
            HeaderComponent,
            InputComponent,
            ShopItemComponent,
        },

        data() {
            return {
                searchResult: null as (IStoreLocationExpandable[] | null),
                searchTerm: '',
                isLoaded: false,
                isLoading: false,
                isSortOptionsVisible: false,
                expandedShop: null as (IStoreLocationExpandable | null),
            }
        },

        computed: {
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
                if (this.searchTerm.length === 0) {
                    return;
                }

                this.isLoaded = false;
                this.isLoading = true;

                const response = await TescoClient.getNearbyShops(this.searchTerm);

                if (response instanceof Error) {
                    return;
                }

                this.searchResult = response.result.map(s => ({
                    ...s,
                    isExpanded: false,
                }));

                this.isLoaded = true;
                this.isLoading = false;
            },

            expandShop(shop: IStoreLocationExpandable): void {
                const expanded = shop.isExpanded;

                if (this.expandedShop) {
                    this.expandedShop.isExpanded = false;
                }

                shop.isExpanded = !expanded;
                this.expandedShop = shop;
            },
        },

        async created() {
            this.$emit('viewChange', 'shop_search');
        },
    })
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

        .search-results {
            padding: 0 1rem;
        }
    }
</style>
