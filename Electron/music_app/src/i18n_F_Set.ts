import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './asset/i18n/en.json'
import zh from './asset/i18n/zh.json'

const resources = {
    'en': {
        translation: en.frontend
    },
    'zh': {
        translation: zh.frontend
    }
}

use(initReactI18next).init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
        escapeValue: false,
    }
})