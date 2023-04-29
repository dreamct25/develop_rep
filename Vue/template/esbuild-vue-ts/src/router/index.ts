import { createRouter,createWebHistory } from 'vue-router'
import { PageI,PageII } from '../container'

export default createRouter({
    history:createWebHistory(),
    routes:[{
        path:'/',
        redirect:'/pageI'
    },{
        path:'/pageI',
        name:'pageI',
        component:PageI
    },{
        path:'/pageII',
        name:'pageII',
        component:PageII
    }]
})