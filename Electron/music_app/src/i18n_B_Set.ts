import { init, changeLanguage, t as formatLanuage } from 'i18next'
import en from './asset/i18n/en.json'
import zh from './asset/i18n/zh.json'

const resources = {
    'en': {
        translation: en.backend
    },
    'zh': {
        translation: zh.backend
    }
}

init({
    resources,
    lng: "zh", // 預設語言
    fallbackLng: "zh",
});

export { formatLanuage, changeLanguage }