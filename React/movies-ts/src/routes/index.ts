import { createElement } from 'react'
import { 
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router'
import { createHashHistory } from '@tanstack/history'
import $ from 'self-libraries'
import { 
    Home, 
    NotFound,
    Search,
    SingleVideoPreview,
    ComingSoonList
} from '@/pages'

const rootRoute = createRootRoute({
    component: Home,
    notFoundComponent: () => createElement(NotFound)
})

const routeSetting = {
    homeRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/'
    }),
    singlePreviewRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/single_preview',
        component: SingleVideoPreview
    }),
    searchRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/search',
        component: Search
    }),
    comingSoonListRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/coming_soon_list',
        component: ComingSoonList
    })
}

const routeTree = rootRoute.addChildren(
    $.maps(
        $.objDetails(routeSetting, 'values'), 
        row => row
    )
)

const routes = createRouter({ 
    routeTree, 
    history: createHashHistory()
})

export default routes