import Vue from 'vue';
import App from '@frontend/App.vue';

import appRouter from '@frontend/router/appRouter';
import appState from '@frontend/state/AppState';

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