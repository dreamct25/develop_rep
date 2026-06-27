import { 
    createRootRoute,
    createRoute,
    createRouter,
    redirect
} from '@tanstack/react-router'
import { createHashHistory } from '@tanstack/history'
import $ from '@/utils/Library'
import { 
    Main,
    Converter,
    ColorPicker,
    ColorCard,
    ImageColorPicker
} from '@/pages'

const rootRoute = createRootRoute({
    component: Main,
    // notFoundComponent: () => createElement(NotFound)
})

const routeSetting = {
    homeRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/',
        beforeLoad: 
            redirect.bind(undefined,{ to: '/converter', replace: true })
    }),
    converterRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/converter',
        component: Converter
    }),
    colorPickerRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/picker',
        component: ColorPicker
    }),
    colorCardRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/color_card',
        component: ColorCard
    }),
    imageColorPickerRoute: createRoute({
        getParentRoute: () => rootRoute,
        path: '/image_picker',
        component: ImageColorPicker
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