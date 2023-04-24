import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";   
import 'primeicons/primeicons.css';  
import './assets/app.css'

import ProgressBar from 'primevue/progressbar';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

const app = createApp(App)
app.use(PrimeVue);

app.component('InputText',InputText);
const toast = 'Toast';
app.component(toast,Toast);
app.component('ProgressBar',ProgressBar);


app.mount('#app');