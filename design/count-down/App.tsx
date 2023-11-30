import React,{ useCallback, useEffect, useRef, useState } from 'react'
import { loadFull } from 'tsparticles'
import { IOptions, RecursivePartial, Engine } from 'tsparticles-engine'
import Particles from 'react-particles'
import { useTranslation } from 'react-i18next'
import defaultAnimate from './asset/default.json'
import activeAnimate from './asset/active.json'
import { Styles } from './styles'

const App:FC = ():TSX => {
    const timer = useRef<any>(null)

    const { t,i18n } = useTranslation()

    const { language } = i18n

    const languageGroup: string[] = ['zh','en','jp','kr']

    const [{
        currentCountText,
        newYear,
        remainTitleAnimate,
        remainContentAnimate,
        languageOptionLayoutAnimate,
        footerAnimate,
        toggleLanguageList
    },setInitState] = useState<{
        currentCountText: {
            dd: string;
            hh: string;
            mm: string;
            ss: string;
        };
        newYear: string;
        remainTitleAnimate: boolean;
        remainContentAnimate: boolean;
        languageOptionLayoutAnimate: boolean;
        footerAnimate: boolean;
        toggleLanguageList: boolean;
    }>({
        currentCountText:{ dd:'',hh:'',mm:'',ss:'' },
        newYear:'',
        remainTitleAnimate: false,
        remainContentAnimate: false,
        languageOptionLayoutAnimate: false,
        footerAnimate: false,
        toggleLanguageList: false
    })

    const isChangeBg = useRef<boolean>(false)

    const changeSomthing:() => void = () => {
        const addZero:(num:number) => string = num => num >= 10 ? num.toString() : `0${num}`

        clearInterval(timer.current)
        
        timer.current = setInterval(() => {
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

            setInitState(prevState => ({
                ...prevState,
                currentCountText:{
                    dd: dayFix.toString(),
                    hh: hourFix.toString(),
                    mm: addZero(minuteFix),
                    ss: addZero(secondesFix)
                },
                newYear:newYearTime.getFullYear().toString()
            }))

            isChangeBg.current = (31536000000 - timeRange) <= 300000
        },1000)

        setTimeout(() => setInitState(prevState => ({ ...prevState,remainTitleAnimate:true })),1001)
        setTimeout(() => setInitState(prevState => ({ ...prevState,remainContentAnimate:true })),1491)
        setTimeout(() => setInitState(prevState => ({ ...prevState,languageOptionLayoutAnimate:true })),1981)
        setTimeout(() => setInitState(prevState => ({ ...prevState,footerAnimate:true })),2471)
    }

    const toggleLanguageListShow:() => void = () => setInitState(prevState => ({ ...prevState,toggleLanguageList: !toggleLanguageList }))

    const changeLanguage:(lang:string) => void = lang => {
        i18n.changeLanguage(lang)

        setInitState(prevState => ({ ...prevState,toggleLanguageList: false }))

        localStorage.setItem('lang',lang)

        document.title = {
            en: 'New Year Count Down',
            zh: '跨年倒數',
            jp: '新年カウントダウン',
            kr: '새해 카운트다운'
        }[lang] as string
    }

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    useEffect(() => {
        if(localStorage.getItem('lang')){
            const currentLang = localStorage.getItem('lang')!
            changeLanguage(currentLang)
            return
        }

        localStorage.setItem('lang',i18n.language)

    }, [localStorage.getItem('lang')])

    useEffect(() => {
        changeSomthing()
    }, [])
    return (
        <Styles>
            <Particles init={particlesInit} options={(isChangeBg.current ? activeAnimate : defaultAnimate) as RecursivePartial<IOptions>} />
            <div className={ languageOptionLayoutAnimate ? 'language-option-layout active' : 'language-option-layout'}>
                <div className="current-language-outer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <line x1="48" y1="112" x2="336" y2="112" />
                        <line x1="192" y1="64" x2="192" y2="112" />
                        <polyline points="272 448 368 224 464 448" />
                        <line x1="301.5" y1="384" x2="434.5" y2="384" />
                        <path d="M281.3,112S257,206,199,277,80,384,80,384" />
                        <path d="M256,336s-35-27-72-75-56-85-56-85" />
                    </svg>
                    <div className="current-language" onClick={toggleLanguageListShow}>{t(`${language}Lang`)}</div>
                </div>
                <div className="language-option-list-outer">
                    <div className={ toggleLanguageList ? 'language-option-list active' : 'language-option-list'}>
                        {languageGroup.map((val:string,index:number) => <div className={ language === val ? 'options active' : 'options' } key={index} onClick={changeLanguage.bind(this,val)}>{t(`${val}Lang`)}</div>)}
                    </div>
                </div>
            </div>
            <div className="center">
                <div className={ remainTitleAnimate ? 'remain-title active' : 'remain-title' }>{t(isChangeBg.current ? 'titleTextChange' : 'titleText',{ year:newYear })}</div>
                <div className={ isChangeBg.current ? 'remain-middle active' : 'remain-middle' }>{t(isChangeBg.current ? 'middleText' : '',{ year:newYear })}</div>
                <div className={ remainContentAnimate ? 'remain-text active' : 'remain-text' }>{t('countDownText',{ day:currentCountText.dd,hh:currentCountText.hh,mm:currentCountText.mm,ss:currentCountText.ss })}</div>
            </div>
            <div className={ footerAnimate ? 'footer active' : 'footer' }>CopyRight &copy; 2022-12 Alex Chen.</div>
        </Styles>
    )
}

export default App