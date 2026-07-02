import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .mount('#app')
