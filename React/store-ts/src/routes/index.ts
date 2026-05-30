import { createElement } from 'react'
import { 
    Home, 
    Music, 
    MusicVideo, 
    Podcast, 
    Ebook, 
    Software, 
    NotFound 
} from '@/pages'
import { 
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router'
import { createHashHistory } from '@tanstack/history'
import $ from 'self-libraries'

const rootRoute = createRootRoute({
    component: Home,
    notFoundComponent: () => createElement(NotFound)
})

const routeSetting = {
    homeRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/'
    }),
    musicRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/music',
        component: Music
    }),
    musicVideoRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/music-video',
        component: MusicVideo
    }),
    podcastRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/podcast',
        component: Podcast
    }),
    ebookRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/ebook',
        component: Ebook
    }),
    softwareRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/software',
        component: Software
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