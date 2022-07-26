import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { result } from './assets/i18n'

i18n.use(initReactI18next).init({
    resources:result,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
        escapeValue: false
    }
})

export default i18n
