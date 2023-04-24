import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";   
import 'primeicons/primeicons.css';  
import './assets/app.css'


import InputText from 'primevue/inputtext';

const app = createApp(App)
app.use(PrimeVue);
app.component('InputText',InputText);

app.mount('#app');