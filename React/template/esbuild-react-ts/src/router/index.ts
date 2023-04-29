import { createElement } from 'react'
import { RouteProps } from 'react-router-dom'
import { PageI,PageII } from '../container'

const router:RouteProps[] = [{
    path:'/pageI',
    element:createElement(PageI)
},{
    path:'/pageII',
    element:createElement(PageII)
}]

export default router