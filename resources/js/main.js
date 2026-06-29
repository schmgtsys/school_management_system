import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import Bootstrap JS bundle (includes Popper)
import 'bootstrap';

// Import core style sheet
import './styles/app.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
