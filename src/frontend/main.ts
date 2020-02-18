import Vue from 'vue';
import App from '@frontend/App.vue';

import VuePWAInstall from 'vue-pwa-install';

import appRouter from '@frontend/router/appRouter';
import appState from '@frontend/state/AppState';

import '@frontend/registerServiceWorker';

(async () => {
    await appState.init();

    Vue.config.productionTip = false;

    Vue.use(VuePWAInstall, {
        mixin: false,
    });

    new Vue({
        router: appRouter,
        render: h => h(App),
        data: appState,
    })
    .$mount('#app');
})();