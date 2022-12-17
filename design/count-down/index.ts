import './styles.scss'
import defaultAnimate from './asset/default.json'
import activeAnimate from './asset/active.json'
import { loadFull } from 'tsparticles'
import { IOptions, RecursivePartial, SingleOrMultiple, tsParticles } from 'tsparticles-engine'
import AlpineI18n from 'alpinejs-i18n'
import Alpine from 'alpinejs'

declare global {
    interface Window {
        Alpine: typeof Alpine
        AlpineI18n: typeof AlpineI18n
    }
}

window.Alpine = Alpine

Alpine.plugin(AlpineI18n)

window.AlpineI18n.create('en',{
	en: {
        enLang:'English ( en-US )',
        zhLang:'Zhongwen ( zh-TW )',
        jpLang:'Japan ( ja-JP )',
        krLang:'Korea ( ko-KR )',
        countDownText: '{day} day {hh} h {mm} m {ss} s',
        titleText: 'To {year} New Year',
        titleTextChange: 'Happy New Year !',
        middleText: 'To {year} New Year'
	},
	zh: {
        enLang:'英文 ( en-US )',
        zhLang:'中文 ( zh-TW )',
        jpLang:'日文 ( ja-JP )',
        krLang:'韓文 ( ko-KR )',
        countDownText: '{day} 天 {hh} 小時 {mm} 分 {ss} 秒',
        titleText: '{year} 跨年倒數',
        titleTextChange: '新年快樂 !',
        middleText: '{year} 跨年倒數'
	},
    jp: {
        enLang:'英語 ( en-US )',
        zhLang:'中国語 ( zh-TW )',
        jpLang:'日本語 ( ja-JP )',
        krLang:'韓国語 ( ko-KR )',
        countDownText: '{day} 日 {hh} 時間 {mm} 分 {ss} 秒',
        titleText: '{year} 新年カウントダウン',
        titleTextChange: 'あけましておめでとう !',
        middleText: '{year} 新年カウントダウン'
	},
    kr: {
        enLang:'영어 ( en-US )',
        zhLang:'중국인 ( zh-TW )',
        jpLang:'일본어 ( ja-JP )',
        krLang:'대한민국 ( ko-KR )',
        countDownText: '{day} 일 {hh} 시간 {mm} 분 {ss} 초',
        titleText: '{year} 새해 카운트다운',
        titleTextChange: '새해 복 많이 받으세요 !',
        middleText: '{year} 새해 카운트다운'
    }
})

Alpine.data('initData',() => ({
    data:{
        timer: null,
        isChangeBg: false,
        currentCountText:{
            dd:'',
            hh:'',
            mm:'',
            ss:''
        },
        newYear:'',
        remainContentText:'',
        remainTitleAnimate: false,
        remainContentAnimate: false,
        languageOptionLayoutAnimate: false,
        footerAnimate: false,
        languageGroup:['zh','en','jp','kr'],
        toggleLanguageList: false
    },
    async init() {
        const vm = this
    
        await loadFull(tsParticles)

        tsParticles.load("tsparticles", defaultAnimate as SingleOrMultiple<RecursivePartial<IOptions>>)
        
        tsParticles.domItem(0)?.play()

        this.changeSomthing()

        setTimeout(() => vm.data.remainTitleAnimate = true,1001)
        setTimeout(() => vm.data.remainContentAnimate = true,1491)
        setTimeout(() => vm.data.languageOptionLayoutAnimate = true,1981)
        setTimeout(() => vm.data.footerAnimate = true,2471)
    },
    addZero:(num:number) => num >= 10 ? num : `0${num}`,
    changeSomthing():void {
        const vm = this
    
        clearInterval(this.data.timer)

        this.data.timer = setInterval(() => {
            const newYearTime = new Date()
            newYearTime.setFullYear(new Date().getFullYear() + 1,0,1)
            newYearTime.setHours(0,0,0,0)

            const endTime = +newYearTime
            const startTime = +new Date()
            
            const timeRange = Math.abs(endTime - startTime)
            const day = timeRange / (24 * 60 * 60 * 1000)
            const dayFix = Math.floor(day)
            const hour = (day - dayFix) * 24
            const hourFix = Math.floor(hour)
            const minute = (hour - hourFix) * 60
            const minuteFix = Math.floor((hour - hourFix) * 60)
            const secondesFix = Math.floor((minute - minuteFix) * 60)

            vm.data.currentCountText = {
                dd: dayFix.toString(),
                hh: hourFix.toString(),
                mm: vm.addZero(minuteFix),
                ss: vm.addZero(secondesFix)
            }

            vm.data.newYear = newYearTime.getFullYear()
    
            if(31536000000 -  timeRange <= 300000) {
                if(!this.data.isChangeBg){
                    tsParticles.load("tsparticles", activeAnimate as SingleOrMultiple<RecursivePartial<IOptions>>).then(() => this.data.isChangeBg = true)
                        tsParticles.domItem(0)?.play();
                }
            } else {
                if(this.data.isChangeBg){
                    tsParticles.load("tsparticles", defaultAnimate as SingleOrMultiple<RecursivePartial<IOptions>>).then(() => this.data.isChangeBg = false)
                    tsParticles.domItem(0)?.play()
                }
            }
        },1000)
    },
    changeLanguage(lang:string):void {
        window.AlpineI18n.locale = lang
        this.data.toggleLanguageList = false

        document.title = {
            en: 'New Year Count Down',
            zh: '跨年倒數',
            jp: '新年カウントダウン',
            kr: '새해 카운트다운'
        }[lang] as string
    },
    toggleLanguageListShow(){ this.data.toggleLanguageList = !this.data.toggleLanguageList }
}))

Alpine.start()