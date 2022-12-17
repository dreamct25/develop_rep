import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const result = {
    en: {
        translation: {
            "enLang":'English ( en-US )',
            zhLang:'Zhongwen ( zh-TW )',
            jpLang:'Japan ( ja-JP )',
            krLang:'Korea ( ko-KR )',
            countDownText: '{{day}} day {{hh}} h {{mm}} m {{ss}} s',
            titleText: 'To {{year}} New Year',
            titleTextChange: 'Happy New Year !',
            middleText: 'To {{year}} New Year'
        }
    },
    zh: {
        translation: {
            enLang:'英文 ( en-US )',
            zhLang:'中文 ( zh-TW )',
            jpLang:'日文 ( ja-JP )',
            krLang:'韓文 ( ko-KR )',
            countDownText: '{{day}} 天 {{hh}} 小時 {{mm}} 分 {{ss}} 秒',
            titleText: '{{year}} 跨年倒數',
            titleTextChange: '新年快樂 !',
            middleText: '{{year}} 跨年倒數'
        }
    },
    jp: {
        translation: {
            enLang:'英語 ( en-US )',
            zhLang:'中国語 ( zh-TW )',
            jpLang:'日本語 ( ja-JP )',
            krLang:'韓国語 ( ko-KR )',
            countDownText: '{{day}} 日 {{hh}} 時間 {{mm}} 分 {{ss}} 秒',
            titleText: '{{year}} 新年カウントダウン',
            titleTextChange: 'あけましておめでとう !',
            middleText: '{{year}} 新年カウントダウン'
        }
    },
    kr: {
        translation: {
            enLang:'영어 ( en-US )',
            zhLang:'중국인 ( zh-TW )',
            jpLang:'일본어 ( ja-JP )',
            krLang:'대한민국 ( ko-KR )',
            countDownText: '{{day}} 일 {{hh}} 시간 {{mm}} 분 {{ss}} 초',
            titleText: '{{year}} 새해 카운트다운',
            titleTextChange: '새해 복 많이 받으세요 !',
            middleText: '{{year}} 새해 카운트다운'
        }
    }
}

i18n.use(initReactI18next).init({
    resources: result,
    lng: 'en',
    fallbackLng: 'zh',
    interpolation: {
        escapeValue: false
    }
})

export default i18n
