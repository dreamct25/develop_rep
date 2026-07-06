import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nextHttpBackend from 'i18next-http-backend'

i18next.
    use(initReactI18next)
    .use(i18nextHttpBackend)
    .init({
        lng: 'zh',
        fallbackLng: 'zh',
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: './static/i18n/{{lng}}.json'
        },
    })

export default i18next
