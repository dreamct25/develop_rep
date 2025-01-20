import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/assert/i18n/en_US.json'
import zh from '@/assert/i18n/zh_TW.json'

const result = {
    en : {
        translation : en
    },
    zh : {
        translation: zh
    }
}

i18next.use(initReactI18next).init({
    resources: result,
    lng: 'en',
    fallbackLng: 'zh',
    interpolation: {
        escapeValue: false
    }
})