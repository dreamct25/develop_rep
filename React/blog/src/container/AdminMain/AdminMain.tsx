import React, { useContext, useEffect } from "react";
import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import { NewContext } from '../../App'
import { parseJwt } from '../../utiles/des'
import { Container,actionCreator } from '.'

const AdminMain:FC = ():TSX => {
    const { Fetch,setReducer } = useContext(NewContext)
    const router = useNavigate()
    const { pathname } = useLocation()
    const sessionStorageTemp = JSON.parse(sessionStorage.getItem('temp')!) || undefined

    const logout:(token:string) => void = token => {
        Fetch.get<{ message:string }>('/logout',{ token }).then(({ data }) => {
            console.log(data?.message)
            setReducer(actionCreator,'setAuthInfo',{ ac:'',token:'' })

            sessionStorage.removeItem('temp')
            
            router({ pathname:'/admin/login' })
        })
    }

    const goDashboardSwitch:() => void = () => {
        const [,,path] = pathname.split('/')

        router({ pathname: path === 'article_all' ? '/admin/msg_all' : '/admin/article_all' })
    }

    useEffect(() => {
        if(sessionStorageTemp){
            const { token } = sessionStorageTemp
            const { timesTemp } = parseJwt(token)

            const isOnTime = (+new Date() - timesTemp) / 1000 / 60 / 60 > 2

            if(isOnTime){
                logout(token)
            } else {
                setReducer(actionCreator,'setAuthInfo',sessionStorageTemp)

                if(pathname === '/admin' || pathname === '/admin/login'){
                    router({ pathname:'/admin/article_all' })
                } else {
                    router({ pathname:location.pathname },{ replace:true })
                }
            }    
        } else {
            router({ pathname:'/admin/login' })
        }
    },[])

    return pug`
        .container-fluid
            Container
                .header
                    h1 後台#{pathname === '/admin/login' ? '' : pathname === '/admin/article_all' ? '文章' : '留言'}管理
                .main
                    Outlet
                if sessionStorageTemp
                    .right-top-group
                        .dashboard-switch-btn(onClick=goDashboardSwitch) #{pathname === '/admin/article_all' ? '留言管理' : '文章管理'}
                        .logout-btn(onClick=logout.bind(this,sessionStorageTemp.token)) 登出
    `
}

export default AdminMain