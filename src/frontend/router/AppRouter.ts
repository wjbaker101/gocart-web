import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import ProductView from '@/view/product/Product.view.vue';
import ProductSearchView from '@/view/product-search/ProductSearch.view.vue';
import ShopView from '@/view/shop/Shop.view.vue';
import ShopSearchView from '@/view/shop-search/ShopSearch.view.vue';
import ShoppingListView from '@/view/shopping-list/ShoppingList.view.vue';
import UserView from '@/view/user/User.view.vue';
import UserLoginView from '@/view/user-login/UserLogin.view.vue';

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
        name: 'product_search',
        path: '/search',
        component: ProductSearchView,
        props: true,
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
    {
        path: '/user/login',
        component: UserLoginView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
