// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// 1. Gumawa ng Vue App instance
const app = createApp(App);

// 2. Gumawa ng Pinia instance
const pinia = createPinia();

// 3. I-connect ang Pinia sa Vue App BAGO mag-mount
app.use(pinia);

// 4. I-mount ang app sa HTML
app.mount('#app');