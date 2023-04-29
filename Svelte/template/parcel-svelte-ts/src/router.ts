import { SvelteRouter } from '@danielsharkov/svelte-router'
import PageI from './container/PageI/PageI.svelte'
import PageII from './container/PageII/PageII.svelte'

const routes = new SvelteRouter({
    window: window,
    basePath: '/',
    routes: {
        'root': {
            path: '/',
            component: PageI
        },
        'Page_I': {
            path: '/pageI',
            component: PageI
        },
        'Page_II': {
            path: '/pageII',
            component: PageII
        }
    },
})

export type SvelteRouters = typeof routes

export default routes