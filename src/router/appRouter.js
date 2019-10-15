import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: () => import('@/view/ShoppingListView.vue'),
        },
        {
            path: '/search',
            component: () => import('@/view/ProductSearchView.vue'),
        },
        {
            name: 'product-route',
            path: '/product',
            props: true,
            component: () => import('@/view/ProductView.vue'),
        },
        {
            path: '/shop/search',
            component: () => import('@/view/ShopSearchView.vue'),
        },
        {
            path: '/shop',
            component: () => import('@/view/ShopView.vue'),
        },
        {
            path: '/scan',
            component: () => import('@/view/BarcodeScannerView.vue'),
        },
    ],
});

export default router;
