import $ from '../lib/Library'

$.fetch.createBase({
    baseUrl: process.env.APP_API!,
    baseHeaders: {}
})

class Fetch {
    static get = <T>(url:string,setting?:{[key:string]:any}) => {
        if(setting?.token) setting = {
            headers:{
                Authorization:`Bearer ${setting.token}`
            }
        }

        return $.fetch.get<T>(url,setting)
    }
    static post = <T>(url:string,setting?:{[key:string]:any}) => {
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

        return $.fetch.post<T>(url,setting!)
    }
    static put = <T>(url:string,setting?:{[key:string]:any}) => {
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

        return $.fetch.put<T>(url,setting!)
    }
    static delete = <T>(url:string,setting?:{[key:string]:any}) => {
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

        return $.fetch.delete<T>(url,setting!)
    }
}

export default Fetch