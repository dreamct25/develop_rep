import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './asset/i18n/en.json'
import zh from './asset/i18n/zh.json'

const result = {
    'en': {
        translation: en
    },
    'zh': {
        translation: zh
    }
}

i18n.use(initReactI18next).init({
    resources: result,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
        escapeValue: false,
    }
})

export default i18n