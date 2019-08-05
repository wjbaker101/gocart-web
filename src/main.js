import Vue from 'vue';
import App from '@/App.vue';

import appRouter from '@/router/appRouter.js';

import AppState from '@/state/AppState.js';

Vue.config.productionTip = false;

new Vue({
    router: appRouter,
    render: h => h(App),
    data: AppState,
})
.$mount('#app');
