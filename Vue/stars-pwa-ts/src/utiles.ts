import $ from '@/lib/Library'
import { Converter } from 'opencc-js'

interface respDataType {
    status: boolean,
    data: {
        type: string,
        name: string,
        title: string,
        time: string,
        todo: {
            yi: string,
            ji: string
        },
        fortune: {
            all: number,
            love: number,
            work: number,
            money: number,
            health: number
        },
        shortcomment: string,
        fortunetext: {
            all: string,
            love: string,
            work: string,
            money: string,
            health: string
        },
        luckynumber?: string,
        luckycolor?: string,
        luckyconstellation?: string,
        index: {
            all: string,
            love: string,
            work: string,
            money: string,
            health: string
        }
    }
}

interface repackResultType {
    fortuneDate: { month: string, date: string }
    canDo: string,
    noToDo: string,
    lucky?: {
        num: string, 
        color: string, 
        constellation: string 
    },
    fortune: {
        overall: {
            score: number,
            scoreDesc: string
        },
        love: {
            score: number,
            scoreDesc: string
        },
        work: {
            score: number,
            scoreDesc: string
        },
        wealth: {
            score: number,
            scoreDesc: string
        }
    }
}

class Utiles {

    private static fetchInfo:{ starName: string, time: 'today' | 'nextday' | 'week' | 'month' } = { starName: '', time: 'today' }

    private static convertlang: (text: string) => string = text => Converter({ from: 'cn', to: 'tw' })(text)

    public static overrideStyle(obj: { templateStr: string, deep?: boolean }, ionDom: { $el?: HTMLElement }): void{

        if(!ionDom?.$el) return

        if(!obj) {
            console.error('no parameters !')
            return
        }

        const { $el } = ionDom

        if(obj.deep){

            if ($el.shadowRoot) {
                const style = $.createDom('style', { textContent: obj.templateStr })
                $el.shadowRoot.append(style)
            }

            return
        }

        const style = $.createDom('style', { textContent: obj.templateStr })
        $el.append(style)
    }

    public static async fetchFortuneResult(starName: string, time: 'today' | 'nextday' | 'week' | 'month'): Promise<{ 
        status: string, message: string, result: repackResultType | undefined
    }> {

        let repackResult: repackResultType | undefined = undefined

        this.fetchInfo.starName = starName
        this.fetchInfo.time = time
        
        try {

            const resp = await fetch(`https://api.vvhan.com/api/horoscope?type=${starName}&time=${time}`)

            if(resp.status >= 200 && resp.status <= 399){

                const result: respDataType = await resp.json()

                const [month, date] = result.data.time.replace('月','-').replace('日','').split('-')
                
                repackResult = {
                    fortuneDate: { month, date },
                    canDo: this.convertlang(result.data.todo.yi),
                    noToDo: this.convertlang(result.data.todo.ji),
                    lucky: {
                        num: result.data?.luckynumber || '',
                        color: this.convertlang(result.data?.luckycolor || ''),
                        constellation: this.convertlang(result.data?.luckyconstellation || '')
                    },
                    fortune: {
                        overall: { 
                            score: result.data.fortune.all,
                            scoreDesc: this.convertlang(result.data.fortunetext.all)
                        },
                        love: { 
                            score: result.data.fortune.love,
                            scoreDesc: this.convertlang(result.data.fortunetext.love)
                        },
                        work: { 
                            score: result.data.fortune.work,
                            scoreDesc: this.convertlang(result.data.fortunetext.work)
                        },
                        wealth: { 
                            score: result.data.fortune.money,
                            scoreDesc: this.convertlang(result.data.fortunetext.money)
                        }
                    }
                }

                if(!repackResult.lucky?.num) delete repackResult.lucky

                return { status: 'success', message: 'success', result: repackResult }
            }

            throw new Error('fetch error')

        } catch(err: any) {
            // await $.useSleep(3000)
            // this.fetchFortuneResult(this.fetchInfo.starName, this.fetchInfo.time)
            console.log(err)
            return { status: 'error', message: err?.message || err, result: undefined }
        }
    }
}

class Fetch {
    static baseUrl: string = 'https://collect-service.vercel.app/stars/v1'

    private static bindUrl(url: string){
        return `${this.baseUrl}${url}`
    }
    
    static get<T>(url:string,setting?:{[key:string]:any}) {
        
        if(setting?.token) setting = {
            headers:{
                Authorization:`Bearer ${setting.token}`
            }
        }

        return $.fetch.get<T>(this.bindUrl(url),setting)
    }

    static post<T>(url:string,setting?:{[key:string]:any}) {
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

        return $.fetch.post<T>(this.bindUrl(url),setting!)
    }

    static put<T>(url:string,setting?:{[key:string]:any}) {
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

        return $.fetch.put<T>(this.bindUrl(url),setting!)
    }

    static delete<T>(url:string,setting?:{[key:string]:any}) {
        if('token' in setting!) {
            setting = {
                ...setting,
                headers:{
                    Authorization:`Bearer ${setting.token}`
                }
            }

            delete setting.token
        }

        return $.fetch.delete<T>(this.bindUrl(url),setting!)
    }
}

export { Fetch, Utiles }

