import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import md5 from 'md5'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, form, next) => {
  if (to.meta.requiresAuth) {
    let loginStatus = document.cookie
    let loginHashCheck = `loginStatus=${md5('goDash')}`
    loginStatus == loginHashCheck ? next() : next({
      path: '/',
      message: alert('此為管理者權限，請先登入此權限後再做操作。')
    })
  } else {
    next()
  }
})
