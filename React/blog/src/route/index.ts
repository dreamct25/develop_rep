import { createElement } from 'react'
import { PathRouteProps } from 'react-router-dom'
import { ArticleAll,SingleArticle,AdminLogin,AdminArticle,AdminMsg } from '../container'

export interface RolePathRouteProps extends PathRouteProps { role:string }

export default [
    {
        path:'/article_all',
        element:createElement(ArticleAll),
        role:'public'
    },{
        path:'/single_article/:articleName',
        element:createElement(SingleArticle),
        role:'public'
    },{
        path:'/admin/login',
        element:createElement(AdminLogin),
        role:'admin'
    },{
        path:'/admin/article_all',
        element:createElement(AdminArticle),
        role:'admin'
    },{
        path:'/admin/msg_all',
        element:createElement(AdminMsg),
        role:'admin'
    }
] as RolePathRouteProps[]