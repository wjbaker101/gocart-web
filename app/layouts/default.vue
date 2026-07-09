<template>
    <div class="h-full">
        <header class="top-0 right-0 left-0 z-10 fixed bg-slate-100 shadow-md shadow-slate-100 p-2 pb-0">
            <div class="bg-primary shadow-lg p-4 rounded-xl text-text-light">
                <div class="items-center grid grid-cols-[1fr_auto_1fr] mx-auto max-w-4xl">
                    <h1 class="font-bold text-2xl">GoCart</h1>
                    <div></div>
                    <div class="justify-self-end">
                        <ShoppingBasketIcon class="inline-block mr-2 mb-0.5 size-4 align-middle" />
                        <span class="align-middle">£{{ totalPrice.toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </header>
        <div class="grid pt-[72px] pb-[81px] min-h-full">
            <slot></slot>
        </div>
        <footer class="right-0 bottom-0 left-0 fixed bg-slate-50 shadow-lg border-slate-200 border-t rounded-t-xl">
            <div class="grid grid-cols-4 mx-auto max-w-4xl text-center">
                <FooterButtonComponent to="/">
                    <ListIcon class="mx-auto mb-3 size-5" />
                    <p>List</p>
                </FooterButtonComponent>
                <FooterButtonComponent to="/search">
                    <SearchIcon class="mx-auto mb-3 size-5" />
                    <p>Search</p>
                </FooterButtonComponent>
                <FooterButtonComponent to="/shop">
                    <StoreIcon class="mx-auto mb-3 size-5" />
                    <p>Shop</p>
                </FooterButtonComponent>
                <FooterButtonComponent to="/settings">
                    <SettingsIcon class="mx-auto mb-3 size-5" />
                    <p>Settings</p>
                </FooterButtonComponent>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ListIcon, SearchIcon, StoreIcon, ShoppingBasketIcon, SettingsIcon } from '@lucide/vue';

import FooterButtonComponent from '~/components/page/FooterButtonComponent.vue';

const shoppingList = useShoppingList();

const totalPrice = computed(() => shoppingList.value.items
    .filter(x => !x.isChecked)
    .reduce((total, x) => total += x.data.price * x.quantity, 0));
</script>