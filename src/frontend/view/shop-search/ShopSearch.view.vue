<template>
    <PageContainerComponent backButton>
        <template #header-bottom>
            <SearchComponent ref="searchComponent" placeholder="London" @search="onSearch" />
        </template>
        <div class="shop-search-view">
            <section v-if="isSearching">
                <LoadingComponent>
                    <p>Finding shops near you,<br> give me a second...</p>
                </LoadingComponent>
            </section>
            <section class="zero-state" v-else-if="shops === null">
                <SearchIcon massive />
                <p><strong>Enter a specific location,</strong>
                <br>I'll try and find a Tesco shop nearby!</p>
            </section>
            <section class="zero-state" v-else-if="shops.length === 0">
                <QuestionMarkCircleIcon massive />
                <p><strong>Sorry, I didn't find anything,</strong>
                <br>Try something different!</p>
            </section>
            <div class="shop-list" v-else>
                <ShopResultComponent
                    :key="`shop-${index}`"
                    v-for="(shop, index) in shops"
                    :shop="shop"
                    :isOpen="shop.name === openShop"
                    @open="onOpen"
                    @close="onClose"
                />
            </div>
        </div>
    </PageContainerComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import PageContainerComponent from '@/component/PageContainerComponent.vue';
import LoadingComponent from '@/component/LoadingComponent.vue';
import ShopResultComponent from '@/view/shop-search/component/ShopResult.component.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import SearchComponent from '@/component/SearchComponent.vue';
import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';

import { shopsApi } from '@/api/shops/Shops.api';
import { useScrollPosition } from '@/use/ScrollPosition.use';

import { Shop } from '@/model/Shop.model';

export default defineComponent({
    name: 'ShopSearchView',

    components: {
        PageContainerComponent,
        LoadingComponent,
        ShopResultComponent,
        ButtonComponent,
        SearchComponent,
        QuestionMarkCircleIcon,
        SearchIcon,
    },

    setup() {
        useScrollPosition('ShopSearchView');

        const searchComponent = ref<typeof SearchComponent | null>(null);

        const isSearching = ref<boolean>(false);
        const shops = ref<Shop[] | null>(null);

        const openShop = ref<string>('');

        onMounted(() => {
            searchComponent.value?.focus();
        });

        return {
            searchComponent,
            isSearching,
            shops,
            openShop,

            async onSearch(searchTerm: string) {
                if (searchTerm.trim().length < 3)
                    return;

                searchComponent.value?.blur();

                isSearching.value = true;

                const searchShops = await shopsApi.getNearbyShops(searchTerm);

                isSearching.value = false;

                if (searchShops instanceof Error) {
                    shops.value = null;

                    searchComponent.value?.focus();
                }
                else {
                    shops.value = searchShops;

                    if (shops.value.length === 0)
                        searchComponent.value?.focus();
                }
            },

            onOpen(shopName: string) {
                openShop.value = shopName;
            },

            onClose() {
                openShop.value = '';
                searchComponent.value?.focus();
            },
        }
    },
})
</script>

<style lang="scss">
.shop-search-view {

    .shop-list {
        padding-top: 0.5rem;
    }
}
</style>
