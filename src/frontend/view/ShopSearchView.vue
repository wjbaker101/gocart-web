<template>
    <PageContainerComponent backButton>
        <template #header-bottom>
            <div class="flex flex-animate">
                <input
                    ref="searchTextbox"
                    type="search"
                    placeholder="London"
                    class="shop-search-view-search-textbox"
                    v-model="searchTerm"
                    @keyup.enter="onSearch"
                >
                <ButtonComponent
                    class="flex-auto shop-search-view-reset-search-button"
                    :class="{ 'is-visible': searchTerm.length > 0 }"
                    @click="onClearSearch"
                    isSecondary
                >
                    &times;
                </ButtonComponent>
            </div>
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
                <ShopComponent
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
import ShopComponent from '@/component/ShopComponent.vue';
import ButtonComponent from '@/component/item/ButtonComponent.vue';
import QuestionMarkCircleIcon from '@/component/icon/QuestionMarkCircleIcon.vue';
import SearchIcon from '@/component/icon/SearchIcon.vue';

import { TescoService } from '@/service/Tesco.service';
import { UseScrollPosition } from '@/use/ScrollPosition.use';

import { Shop } from '@/model/Shop.model';

export default defineComponent({
    name: 'ShopSearchView',

    components: {
        PageContainerComponent,
        LoadingComponent,
        ShopComponent,
        ButtonComponent,
        QuestionMarkCircleIcon,
        SearchIcon,
    },

    setup() {
        const searchTextbox = ref<HTMLInputElement | null>(null);

        const searchTerm = ref<string>('');
        const isSearching = ref<boolean>(false);
        const shops = ref<Shop[] | null>(null);

        const openShop = ref<string>('');

        onMounted(() => {
            searchTextbox.value?.focus();
        });

        UseScrollPosition('ShopSearchView');

        return {
            searchTextbox,
            searchTerm,
            isSearching,
            shops,
            openShop,

            async onSearch() {
                if (searchTerm.value === null)
                    return;

                if (searchTerm.value.trim().length < 3)
                    return;

                searchTextbox.value?.blur();

                isSearching.value = true;

                const searchShops =
                    await TescoService.getNearbyShops(searchTerm.value);

                isSearching.value = false;

                if (searchShops instanceof Error) {
                    shops.value = null;

                    searchTextbox.value?.focus();
                }
                else {
                    shops.value = searchShops;

                    if (shops.value.length === 0) {
                        searchTextbox.value?.focus();
                    }
                }
            },

            onClearSearch() {
                searchTerm.value = '';
                searchTextbox.value?.focus();
            },

            onOpen(shopName: string) {
                openShop.value = shopName;
            },

            onClose() {
                openShop.value = '';
                searchTextbox.value?.focus();
            },
        }
    },
})
</script>

<style lang="scss">
.shop-search-view {

    &-search-textbox {
        text-transform: capitalize;
    }

    &-reset-search-button {
        margin-left: 0.5rem;
        overflow: hidden;

        &:not(.is-visible) {
            flex: 0;
            padding: 0;
            margin: 0;
        }
    }

    .shop-list {
        padding-top: 0.5rem;
    }
}
</style>
