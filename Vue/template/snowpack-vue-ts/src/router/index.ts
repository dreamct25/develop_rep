import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'
import PageI from '../container/PageI.vue'
import PageII from '../container/PageII.vue'

const routeSetting:RouteRecordRaw[] = [{
    path:'/',
    redirect: '/pageI'
},{
    path:'/pageI',
    component: PageI
},{
    path: '/pageII',
    component: PageII
}]

export default createRouter({
    routes: routeSetting,
    history: createWebHistory()
})