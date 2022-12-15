import React,{ createContext,createElement,Suspense } from "react";
import { Route,Routes,Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import $ from './lib/Library'
import Fetch from './utiles/fetchConfig'
import route,{ RolePathRouteProps } from "./route";
import store from "./store";
import { Main,Error404,AdminMain } from './container'

export const NewContext = createContext<{
    $:$
    Fetch:typeof Fetch,
    getReducer:<T>(callBack:(state:ReturnType<typeof store.getState>) => T) => T,
    setReducer:(actionCreator:{[key:string]:any},actionName:string,value?:any) => void,
    changeWebTitle:(text:string) => TSX,
    rwdStatus:boolean
}>({
    $,
    Fetch,
    getReducer: callBack => callBack.call(callBack,store.getState()),
    setReducer: (acionCreator,actionName,value) => undefined,
    changeWebTitle: text => pug``,
    rwdStatus: false
})

const { Provider } = NewContext

const App:FC = ():TSX => {
    const createSelector = useSelector<ReturnType<typeof store.getState>>((state) => ({ ...state })) as ReturnType<typeof store.getState>
    const createDispatch = useDispatch()

    const getReducer:<T>(callBack:(state:ReturnType<typeof store.getState>) => T) => T = callBack => callBack.call(callBack,createSelector)
    const setReducer:(actionCreator:{[key:string]:any},actionName:string,value?:any) => void = (actionCreator,actionName,value) => value ? createDispatch(actionCreator[actionName](value)) : createDispatch(actionCreator[actionName]())

    const publicRoute = $.filter<RolePathRouteProps>(route,({ role }):any => role === 'public')
    const adminRoute = $.filter<RolePathRouteProps>(route,({ role }):any => role === 'admin')

    const rwdStatus = window.innerWidth <= 414
    const changeWebTitle:(text:string) => TSX = text => pug`
        Helmet
            title Hight On Life - #{text}
    `

    return pug`
        Provider(value={$,Fetch,getReducer,setReducer,rwdStatus,changeWebTitle})
            Suspense(fallback=${pug`div`})
                Routes
                    Route(path="/",element=createElement(Main))
                        // public
                        each item,index in publicRoute
                            Route(key=index,path=item.path,element=item.element)
                        Route(path="/",element=${pug`Navigate(replace=true,to="/article_all")`})
                    Route(path="/admin",element=createElement(AdminMain))
                        // admin
                        each item,index in adminRoute
                            Route(key=index,path=item.path,element=item.element)
                    Route(path="/err_404",element=createElement(Error404))
                    Route(path="*",element=${pug`Navigate(replace=true,to="/err_404")`})
    `
}

export default App