import Vue from 'vue';
import App from '@/App.vue';

import appRouter from '@/router/appRouter.js';

import appState from '@/state/appState.js';

(async () => {
    await appState.init();

    Vue.config.productionTip = false;

    new Vue({
        router: appRouter,
        render: h => h(App),
        data: appState,
    })
    .$mount('#app');
})();