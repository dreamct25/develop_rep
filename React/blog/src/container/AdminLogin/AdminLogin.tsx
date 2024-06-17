import React, { ChangeEvent, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { NewContext } from '../../App'
import { CustomInput } from '../../component'
import { Container,actionCreator } from '.'

const AdminLogin:FC = ():TSX => {
    const { $,Fetch,setReducer,changeWebTitle } = useContext(NewContext)
    const router = useNavigate()
    const [{
        acName,
        pwdTemp,
        pwd
    },setInitState] = useState<{
        acName:string,
        pwdTemp:string,
        pwd:string
    }>({
        acName:'',
        pwdTemp:'',
        pwd:''
    })

    const acNameRef = useRef<string>(acName)
    const pwdRef = useRef<string>(pwd)

    const setVal:(type:string,{ target }:ChangeEvent<HTMLInputElement>) => Promise<void> = async (type,{ target }) => {
        const obj:{[key:string]:any} = {}

        if(type === 'pwdTemp'){
            obj[type] = target.value;
            const toSHA256 = await $.useSHA('SHA-256',target.value)
            obj.pwd = toSHA256
        } else {
            obj[type] = target.value
        }
        
        setInitState(prevState => ({ ...prevState,...obj }))
    }

    const login:() => void = () => {
        Fetch.post<{ message:string,ac:string,token:string }>('/login',{
            data:{ acName:acNameRef.current,pwd:pwdRef.current }
        }).then(({ data }) => {
            setReducer(actionCreator,'setAuthInfo',{ ac:data?.ac,token:data?.token })
            sessionStorage.setItem('temp',JSON.stringify({ ac:data?.ac,token:data?.token }))

            router({ pathname:'/admin/article_all' })
        }).catch(err => alert('error'))
    }

    const enterLogin:({ keyCode }:KeyboardEvent) => void = ({ keyCode }) => keyCode === 13 && login()

    useEffect(() => {
        acNameRef.current = acName
        pwdRef.current = pwd
    }, [acName,pwd])

    useEffect(() => {
        if(sessionStorage.getItem('temp')){
            const auth = JSON.parse(sessionStorage.getItem('temp')!)
            setReducer(actionCreator,'setAuthInfo',auth)
        }

        $(window).listener('keypress',enterLogin)

        return () => $(window).removeListener('keypress',enterLogin)
    }, [])

    return pug`
        Container
            |#{changeWebTitle('後台登入')}
            .login-layout
                .header 登入系統
                .input-group
                    CustomInput(
                        label="帳號"
                        className=acName ? 'lock' : '',
                        type="text",
                        bindVal=acName,
                        changeEvent=setVal.bind(this,'acName')
                    )
                    CustomInput(
                        label="密碼"
                        className=pwdTemp ? 'lock' : '',
                        type="password",
                        bindVal=pwdTemp,
                        changeEvent=setVal.bind(this,'pwdTemp')
                    )
                .login-btn(onClick=login) 登入
    `
}

export default AdminLogin