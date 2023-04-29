import { FC } from "react";
import { Main } from '../container/Main'
import { PageI } from '../container/PageI'
import { PageII } from '../container/PageII'

const routes:{ path:string,component:FC }[] = [{
    path:'/main',
    component: Main
},{
    path:'/pageI',
    component: PageI
},{
    path:'/pageII',
    component: PageII
}]

export default routes