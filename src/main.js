import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { createPinia } from 'pinia';
import primeVue from 'primevue/config';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app=createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.use(primeVue);
app.mount('#app');

