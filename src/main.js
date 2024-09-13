import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue';
import vuetify from './vuetify'; 

const app = createApp(App);
app.use(HighchartsVue);
app.use(vuetify);
app.mount('#app');