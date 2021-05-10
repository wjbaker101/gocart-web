import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import ProductSearchView from '@/view/ProductSearchView.vue';
import ProductView from '@/view/ProductView.vue';
import ShoppingListView from '@/view/ShoppingListView.vue';
import ShopSearchView from '@/view/ShopSearchView.vue';
import ShopView from '@/view/ShopView.vue';
import UserView from '@/view/UserView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: ShoppingListView,
    },
    {
        path: '/product',
        component: ProductView,
    },
    {
        path: '/search',
        component: ProductSearchView,
    },
    {
        path: '/shop',
        component: ShopView,
    },
    {
        path: '/shop/search',
        component: ShopSearchView,
    },
    {
        path: '/user',
        component: UserView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
