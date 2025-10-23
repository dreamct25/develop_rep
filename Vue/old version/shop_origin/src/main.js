import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, form, next) => {
  if (to.meta.requiresAuth) {
    let loginPowerItem = router.app.$children[0].$children[0].isLoginItem
    let loginState = router.app.$children[0].$children[0].loginStatus
    let power = router.app.$children[0].$children[0].powerHave
    if(loginPowerItem.length == 0 && loginState == false){
      next({
        path: '/',
        message: alert("錯誤操作！")
      })
      return
    }else{
      Boolean(power) == true ? next() : next({
        path: '/',
        message: alert('此為管理者權限，請先登入此權限後再做操作。')
      })
    }
  } else {
    next()
  }
})