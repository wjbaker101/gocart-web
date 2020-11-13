import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router/AppRouter';
import store from '@/store/AppStore';

import '@/registerServiceWorker';

(async () => {
    await store.dispatch('INIT');

    createApp(App)
        .use(store)
        .use(router)
        .mount('#app');
})();
