import $,{ fetchClassReturnType } from '../lib/Library'

$.fetch?.createBase({
    baseUrl:'https://fordb-1-f6742337.deta.app/blog/v1',
    // baseUrl:'http://localhost:9999/blog/v1',
    baseHeaders:{}
})

class Fetch {
    static get = <T>(url:string,setting?:{[key:string]:any}):Promise<fetchClassReturnType<T>> => {
        if(setting?.token) setting = {
            headers:{
                Authorization:`Bearer ${setting.token}`
            }
        }

        return $.fetch?.get<T>(url,setting) as Promise<fetchClassReturnType<T>>
    }
    static post = <T>(url:string,setting?:{[key:string]:any}):Promise<fetchClassReturnType<T>> => {
        if('token' in setting!) {
            setting = {
                ...setting,
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${setting.token}`
                }
            }

            delete setting.token
        }

        return $.fetch?.post<T>(url,setting) as Promise<fetchClassReturnType<T>>
    }
}

export default Fetch