import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Video from '../components/Video.vue'
import Collect from '../components/Collect.vue'
import VideoAll from '../components/VideoAll.vue'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/'
}, {
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/video',
    name: 'video',
    component: Video
}, {
    path: '/collect',
    name: 'collect',
    component: Collect
}, {
    path: '/video_all',
    name: 'video_all',
    component: VideoAll
}]

const router = new VueRouter({
    routes
})

export default router