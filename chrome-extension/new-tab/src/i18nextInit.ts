import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUrl from '/assets/i18n/en_US.json?url'
import zhUrl from '/assets/i18n/zh_TW.json?url'
import $ from './utiles/Library'

export default (callback: () => void): Promise<void> => 
    $.createPromiseAll([
        $.fetch.get<{ data: Record<string, any> }>(enUrl),
        $.fetch.get<{ data: Record<string, any> }>(zhUrl)
    ]).then(async ([{ data: en }, { data: zh }]) => {

        await i18next.use(initReactI18next).init({
            resources: {
                en : { translation : en },
                zh : { translation: zh }
            },
            lng: 'en',
            fallbackLng: 'zh',
            interpolation: {
                escapeValue: false
            }
        })

        callback.call(callback)
    })

