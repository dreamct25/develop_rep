import { SvelteRouter } from '@danielsharkov/svelte-router'
import { PageI,PageII } from '../container'

const routes = new SvelteRouter({
    window: window,
    basePath: '/',
    routes: {
        'root': {
            path: '/',
            component: PageI
        },
        'PageI': {
            path: '/pageI',
            component: PageI
        },
        'PageII': {
            path: '/pageII',
            component: PageII
        }
    },
})

export type SvelteRouters = typeof routes

export default routes