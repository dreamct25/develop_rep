import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Main from '../components/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
