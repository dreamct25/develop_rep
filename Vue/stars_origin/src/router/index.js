import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Main.vue'
import Fortune from '../components/Fortune.vue'
import Match from '../components/Match.vue'
import Explain from '../components/Explain.vue'
import Nav from '../components/Nav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[{
      path:'nav',
      name:'Nav',
      component:Nav
    },{
      path:'fortune',
      name:'Fortune',
      component:Fortune
    },{
      path:'match',
      name:'Match',
      component:Match
    },{
      path:'explain',
      name:'explain',
      component:Explain
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
