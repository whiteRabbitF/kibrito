import { createApp } from 'vue';
import App from '@src/App.vue';
import router from '@src/router/router.js';
import { createPinia } from 'pinia';
import i18n from '@src/localisation/localisation.js';
import 'normalize.css';


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(i18n);
app.mount('#app');



