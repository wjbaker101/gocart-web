<template>
    <div class="shop-search-view">
        <HeaderComponent :hasBackButton="true">
            <template v-slot:below>
                <div class="search-input-container">
                    <input
                        ref="shopSearchInput"
                        v-model="searchTerm"
                        placeholder="London"
                        @keypress.enter="onSearch"
                        type="search">
                    <ButtonComponent class="search-button" @click="onSearch">
                        <SearchIcon />
                    </ButtonComponent>
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
    import { LocationClient } from '@frontend/api/LocationClient';

    import HeaderComponent from '@frontend/component/page/HeaderComponent.vue';
    import ButtonComponent from '@frontend/component/item/ButtonComponent.vue';
    import ShopItemComponent from '@frontend/component/ShopItemComponent.vue';

    import SearchIcon from '@frontend/assets/icon/search.svg';

    import { IStoreLocationResponseResult } from '@common/interface/response/IStoreLocationResponse';
import { EventService, Events } from '../service/EventService';

    interface IStoreLocationExpandable extends IStoreLocationResponseResult {
        isExpanded: boolean,
    }

    export default Vue.extend({
        name: 'ShopSearchView',

        components: {
            HeaderComponent,
            ButtonComponent,
            ShopItemComponent,
            SearchIcon,
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
                const shopSearchInput: HTMLInputElement
                        = this.$refs.shopSearchInput;

                if (this.searchTerm.length === 0) {
                    shopSearchInput.focus();

                    return;
                }

                this.isLoaded = false;
                this.isLoading = true;

                shopSearchInput.blur();

                const response = await TescoClient.getNearbyShops(this.searchTerm);

                if (response instanceof Error) {
                    shopSearchInput.focus();
                    return;
                }

                if (response.result.length === 0) {
                    shopSearchInput.focus();
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

            requestLocation() {
                if (!navigator.geolocation) {
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                        this.onLocationSuccess,
                        this.onLocationFailure);
            },

            async onLocationSuccess(location: Position): Promise<void> {
                const { latitude, longitude } = location.coords;

                const response =
                        await LocationClient.getPostcode(latitude, longitude);

                this.searchTerm = response.result;

                EventService.$emit(Events.EVENT_POPUP_SHOW, 'Using your current location!');

                await this.onSearch();
            },

            onLocationFailure(error: PositionError): void {

            },
        },

        async created() {
            this.$emit('viewChange', 'shop_search');
        },

        async mounted() {
            await this.requestLocation();
        },
    })
</script>

<style lang="scss">
    .shop-search-view {

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
            padding: 1rem 0;
        }

        .search-results {
            padding: 0 1rem;
        }
    }
</style>
