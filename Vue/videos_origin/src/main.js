import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bootstrapWrap from 'bootstrap/dist/css/bootstrap-reboot.min.css'
import bootstrapGrid from 'bootstrap/dist/css/bootstrap-grid.min.css'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import videoJSCss from 'video.js/dist/video-js.min.css'
import videoJS from 'video.js/dist/video.min.js'
import videoYUJS from 'videojs-youtube/dist/Youtube.min.js'
import ModalCss from '../src/customPlugin/css/Modal.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
    bootstrapWrap,
    bootstrapGrid,
    bootstrapCss,
    videoJSCss,
    videoJS,
    videoYUJS,
    ModalCss,
    router,
    render: h => h(App)
}).$mount('#app')