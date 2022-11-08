import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import { Home,Video,Collect,VideoAll } from '../container'

const routeSetting:RouteRecordRaw[] = [{
    path:'/:catchAll(.*)',
    redirect: '/'
},{
    path:'/',
    name:'home',
    component: Home
},{
    path:'/video',
    name:'video',
    component: Video
},{
    path:'/collect',
    name:'collect',
    component: Collect
},{
    path:'/video_all',
    name:'video_all',
    component: VideoAll
}]

export default createRouter({
    history: createWebHistory(),
    routes: routeSetting
})