import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router'
import { App } from './App'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(Toast,{ toastClassName: "custom-toast-class",timeout: 2500,hideProgressBar: true })
    .mount('#app')