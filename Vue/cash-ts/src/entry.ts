import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from 'router'
import Toast from 'vue-toastification'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "vue-toastification/dist/index.css";
import './global.scss'

createApp(App).use(router).use(createPinia()).use(Toast,{  toastClassName: "custom-toast-class",timeout:1800,hideProgressBar: true }).mount('.app')