import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Main } from '../container/Main'

const routeSetting:RouteRecordRaw[] = [{
    path:'/',
    redirect: '/main'
},{
    path:'/main',
    name:'Main',
    component: Main
}]

export default createRouter({
    history: createWebHistory(),
    routes: routeSetting
})