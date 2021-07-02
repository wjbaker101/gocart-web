import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router/AppRouter';

import '@/registerServiceWorker';

createApp(App)
    .use(router)
    .mount('#app');
