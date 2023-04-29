import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')

if ((import.meta as any).hot) (import.meta as any).hot.accept()