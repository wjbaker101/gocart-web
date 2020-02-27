import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: () => import('@frontend/view/ShoppingListView.vue'),
        },
        {
            path: '/search',
            component: () => import('@frontend/view/ProductSearchView.vue'),
        },
        {
            name: 'product-route',
            path: '/product',
            props: true,
            component: () => import('@frontend/view/ProductView.vue'),
        },
        {
            path: '/shop/search',
            component: () => import('@frontend/view/ShopSearchView.vue'),
        },
        {
            path: '/shop',
            component: () => import('@frontend/view/ShopView.vue'),
        },
        {
            path: '/scan',
            component: () => import('@frontend/view/BarcodeScannerView.vue'),
        },
        {
            path: '/help',
            component: () => import('@frontend/view/HelpView.vue'),
        },
    ],
});

export default router;
