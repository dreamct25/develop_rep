import { useEffect, useRef, useState, ChangeEventHandler, useContext, MouseEventHandler, MouseEvent } from 'react'
import { RgbaColorPicker,RgbaColor } from "react-colorful";
import { NewContext } from '@/App'
import { StyledLayout } from '.'
import { SwitchBar, Toast, Loading, Slide, Tooltip, DropDownList } from '@/component'

const MainThem:FC = ():TSX => {

    const { IndexedDB,formatLanguage,i18n, $ } = useContext(NewContext)

    const currentLang = i18n.language

    const languageList: {
        UILang: string;
        lang: string;
    }[] = [
        "English (en-US)|en",
        "繁體 (zh-TW)|zh"
    ].map(row => {
        const [UILang,lang] = row.split('|')
        return { UILang,lang }
    })

    const backgroundDisplayModeList: {
        selectName: string;
        selectValue: string;
    }[] = [
        { selectName: formatLanguage('backgroundDisplayModeOption.0'),selectValue: 'Fill' },
        { selectName: formatLanguage('backgroundDisplayModeOption.1'),selectValue: 'Tile' },
        { selectName: formatLanguage('backgroundDisplayModeOption.2'),selectValue: 'Fit' }
    ]

    const [{
        currentTimes,
        currentDate,
        browsPastList,
        toggleControlModal,
        toggleThemColorPicker,
        toggleClockColorPicker,
        toggleCalenderSlider,
        toggleLoadingStatus,
        toggleSettingBar,
        toggleShowPath,
        isUseAMPM,
        themColorRgba,
        clockColorRgba,
        clockFontSize,
        clockFontShadow,
        backgroundBlackMaskPercent,
        isLockSettingBar,
        displayTopSiteCount,
        showPath,
        browserUILang,
        backgroundDisplayMode,
        monthDays,
        isDisplaySearchBar,
        isDisplayTime
    },setInitState] = useState<{
        currentTimes: { hour: string,minute: string,seconds: string },
        currentDate: string
        browsPastList: chrome.topSites.MostVisitedURL[],
        toggleControlModal: boolean,
        toggleThemColorPicker: boolean,
        toggleClockColorPicker: boolean,
        toggleCalenderSlider: boolean,
        toggleLoadingStatus: boolean,
        toggleSettingBar: boolean,
        toggleShowPath: boolean,
        isUseAMPM: boolean,
        themColorRgba: RgbaColor,
        clockColorRgba: RgbaColor,
        clockFontSize: number,
        clockFontShadow: number,
        backgroundBlackMaskPercent: number,
        isLockSettingBar: boolean
        displayTopSiteCount: number,
        showPath: string,
        browserUILang: string,
        backgroundDisplayMode: string,
        monthDays: {
            monthCount: number;
            weekdays: number[];
            days: {
                month: number,
                day: number;
                dayType: {
                    prevMonth: boolean;
                    currentMonth: boolean;
                    nextMonth: boolean;
                    isHoliday: boolean
                    dayName: string
                };
            }[]
        }[]
        holidays: {
            month: number,
            day: number;
            dayType: {
                prevMonth: boolean;
                currentMonth: boolean;
                nextMonth: boolean;
                isHoliday: boolean
                dayName: string
            };
        }[],
        isDisplaySearchBar: boolean,
        isDisplayTime: boolean
    }>({
        currentTimes: { hour: '--', minute: '--', seconds: '--' },
        currentDate: '----',
        browsPastList: [],
        toggleControlModal: false,
        toggleThemColorPicker: false,
        toggleClockColorPicker: false,
        toggleCalenderSlider: false,
        toggleLoadingStatus: false,
        toggleSettingBar: false,
        toggleShowPath: false,
        isUseAMPM: false,
        themColorRgba: { r: 30, g: 30, b: 30, a: 0.5 },
        clockColorRgba: { r: 255, g: 255, b: 255, a: 1 },
        clockFontSize: 0,
        clockFontShadow: 0,
        backgroundBlackMaskPercent: 0,
        isLockSettingBar: false,
        displayTopSiteCount: 0,
        showPath: '',
        browserUILang: '',
        backgroundDisplayMode: 'Fill',
        monthDays: [],
        holidays: [],
        isDisplaySearchBar: true,
        isDisplayTime: true
    })

    let timer = useRef<any>(undefined)

    const calenderBodyDomRef = useRef<HTMLDivElement | null>(null)

    const themColorRgbaToStr = `rgba(${Object.values(themColorRgba).map(row => row).join(',')})`
    const clockColorRgbaToStr = `rgba(${Object.values(clockColorRgba).map(row => row).join(',')})`

    const { initializeIndexedDB,readFromIndexedDB,saveToIndexedDB } = IndexedDB

        const monthCounts = [
            1, 2, 3, 4, 5, 6,
            7, 8, 9, 10, 11, 12
        ]

    const weekdays = [0, 1, 2, 3, 4, 5, 6]

    const addZero: (num: number) => string = num => `${num < 10 ? `0${num}` : num}`

    const generateCalendar: (year: number) => Promise<void> = async (year) => {

        const holidayDisplayNameMatch: Record<string, string> = {
            ['開國紀念日']: '元旦',
            ['和平紀念日']: '二二八和平紀念日',
            ['國慶日']: '雙十節'
        }

        const monthDaysResult = $.maps(monthCounts, (monthCount, index) => {

            // 當月第一天是星期幾
            const firstDay = new Date(year, index, 1).getDay();

            // 當月總天數
            const daysInMonth = new Date(year, index + 1, 0).getDate();
            
            // 前一個月的總天數
            const daysInPrevMonth = new Date(year, index, 0).getDate();

            // 填充前一個月的日期
            const prev = $.createArray({ type: 'fake', item: { random: firstDay }},num => {
                
                return {
                    month: ((index + 1) - 1) === 0 ? 12 : (index + 1) - 1,
                    day: daysInPrevMonth - ((firstDay - 1) - num),
                    dayType: {
                        prevMonth: true,
                        currentMonth: false,
                        nextMonth: false,
                        isHoliday: false,
                        dayName: ''
                    },
                }
            })
            
            // 填充當月的日期
            const cur = $.createArray({ type: 'fake', item: { random: daysInMonth }},num => {
                
                return {
                    month: index + 1,
                    day: num + 1,
                    dayType: {
                        prevMonth: false,
                        currentMonth: true,
                        nextMonth: false,
                        isHoliday: false,
                        dayName: ''
                    }
                }
            })

            // 填充下個月的日期
            const daysAfter = 42 - (firstDay + daysInMonth);
            
            const next = $.createArray({ type: 'fake', item: { random: daysAfter }},num => {
                
                return {
                    month: (index + 2) > 12 ? 1 : (index + 2),
                    day: num + 1,
                    dayType: {
                        prevMonth: false,
                        currentMonth: false,
                        nextMonth: true,
                        isHoliday: false,
                        dayName: ''
                    }
                }
            })

            return {
                monthCount,
                weekdays,
                days: [...prev,...cur,...next]
            }
        });

        try {

            const result = await fetch(
                `https://raw.githubusercontent.com/ruyut/TaiwanCalendar/refs/heads/master/data/${year}.json`
            ).then(res => res)

            if(result.status !== 200) throw new Error()

            const data = await result.json() as {
                date: string
                description: string
                isHoliday: boolean
                week: string
            }[]

            const repack = $.maps(monthDaysResult, row => {

                row.days = $.maps(row.days, (daysRow => {

                    if(daysRow.dayType.currentMonth){

                        const matchDate = `${year}${addZero(daysRow.month)}${addZero(daysRow.day)}`
                        const specialDate = `${addZero(daysRow.month)}${addZero(daysRow.day)}`
                        const [filterItem] = $.filter(data, filterRow => filterRow.date === matchDate && filterRow.isHoliday === true)
        
                        if(filterItem){
                            daysRow.dayType.isHoliday = filterItem.isHoliday
                            daysRow.dayType.dayName = 
                                holidayDisplayNameMatch.hasOwnProperty(filterItem.description) ? 
                                    holidayDisplayNameMatch[filterItem.description] : filterItem.description

                            if(specialDate === '0404') daysRow.dayType.dayName = '兒童節'
                            
                            if(specialDate === '0405') daysRow.dayType.dayName = '清明節'
                        }
        
                        return daysRow
                    }

                    return daysRow
                }))

                return row
            })

            const holidaysResult = 
                $.maps(monthDaysResult, row => row.days)
                    .reduce((a, b) => a.concat(b),[])
                    .filter(row => row.dayType.isHoliday && row.dayType.dayName && row.dayType.currentMonth)

            setInitState(prevState => ({ 
                ...prevState, 
                monthDays: repack,
                holidays: holidaysResult
            }))

        } catch {

            const holidaysResult = 
                $.maps(monthDaysResult, row => row.days)
                .reduce((a, b) => a.concat(b),[])
                .map(daysRow => {

                    if(daysRow.dayType.currentMonth){

                        const matchDate = `${year}-${addZero(daysRow.month)}-${addZero(daysRow.day)}`

                        const getRest = new Date(matchDate)

                        if([0, 6].includes(getRest.getDay())) daysRow.dayType.isHoliday = true
        
                        return daysRow
                    }

                    return daysRow
                })
                .filter(row => row.dayType.isHoliday && row.dayType.dayName && row.dayType.currentMonth)

            setInitState(prevState => ({ 
                ...prevState, 
                monthDays: monthDaysResult,
                holidays: holidaysResult
            }))
        }
    }

    const setTime: () => void = () => {
        const [fullTime,] = new Date(+new Date() + (Math.abs(new Date().getTimezoneOffset()) * 60 * 1000)).toJSON().split('.')
        const [year,month,date,hour,minute,seconds] = fullTime.replace('T','-').replace(/:/g,'-').split('-')

        setInitState(prevState => ({
            ...prevState,
            currentTimes: {
                ...prevState.currentTimes,
                hour,
                minute,
                seconds
            },
            currentDate: `${year}-${month}-${date}`
        }))
    }

    const searchResult:(target:HTMLInputElement) => void = target => {
        chrome.search.query({ text: target.value,disposition: 'NEW_TAB' })
    }

    const getLocalImgSet:() => Promise<void> = async () => {

        try {
            const binaryData = await  readFromIndexedDB()
        
            const bodyBgImgDom = document.body
    
            if(binaryData){
                // 創建 Blob
                const blob = new Blob([binaryData], { type: 'image/jpeg' });
    
                // 創建 Blob URL
                const imageUrl = URL.createObjectURL(blob);
    
                // 顯示圖片
                bodyBgImgDom.style.setProperty('--bg', `url('${imageUrl}')`)
                return
            }
    
            bodyBgImgDom.style.setProperty('--bg', "url('/assets/default_bg.jpg')")
        } catch (error) {
            console.log(error)
        }
    }

    const getTopSiteResult:(count?: number) => Promise<void> = async count => {
        const result = await chrome.topSites.get()
    
        const deepCopy:chrome.topSites.MostVisitedURL[] = JSON.parse(JSON.stringify(result))
        const renderItems = 
            count !== undefined ? 
                count === 0 ? [] : deepCopy.filter((_,index) => count ? index <= count - 1 : index <= 7) 
            : deepCopy.filter((_,index) => index <= 7)
        
        setInitState(prevState => ({
            ...prevState,
            browsPastList: renderItems
        }))
    }

    const changeBgAction:ChangeEventHandler<HTMLInputElement> = async ({ target }:{ target: Record<string,any> }) => {
        const [selectedFile] = target.files as FileList;

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = async ({ target: readerTarget }) => {
                // 獲取二進制數據
                const binaryData = readerTarget!.result as ArrayBuffer;
            
                // 存儲二進制數據到 storage.local
                await saveToIndexedDB(binaryData);

                const imagePath = URL.createObjectURL(selectedFile);

                document.body.style.setProperty('--bg',  `url('${imagePath}')`)
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    }
    
    const changeBackgroundDisplayMode:(mode:string,isInit:boolean) => Promise<void> = async (mode,isInit) => {
        !isInit && await chrome.storage.local.set({ bgDisplayMode: mode })
        
        setInitState(prevState => ({ ...prevState, backgroundDisplayMode: mode || 'Fill' }))
    }

    const changeLang:(lang:string,isInit:boolean) => Promise<void> = async (lang,isInit) => {
        !isInit && await chrome.storage.local.set({ UILang: lang })
        
        await i18n.changeLanguage(lang)

        document.title = formatLanguage('webTitle')
    }
    
    const getChromeLocalSaveSettings: () => Promise<void> = async () => {
        const saveLang:{ UILang?: string } = await chrome.storage.local.get('UILang') 
        const saveIsUseAMPM:{ isUseAMPM?: string } = await chrome.storage.local.get('isUseAMPM')
        const saveThemColor:{ themColor?: RgbaColor } = await chrome.storage.local.get('themColor') 
        const saveClockColor:{ clockColor?: RgbaColor } = await chrome.storage.local.get('clockColor')
        const saveClockFontSize:{ clockFontSize?: number } = await chrome.storage.local.get('clockFontSize')
        const saveClockFontShadow:{ clockFontShadow?: number } = await chrome.storage.local.get('clockFontShadow')
        const saveIsLockSettingBar:{ isLockSettingBar?: boolean } = await chrome.storage.local.get('isLockSettingBar')
        const saveBackgroundBlackMaskPercent: { backgroundBlackMaskPercent?: number } = await chrome.storage.local.get('backgroundBlackMaskPercent')
        const saveBackgroundDisplayMode: { bgDisplayMode?: string } = await chrome.storage.local.get('bgDisplayMode')
        const saveDisplayTopSiteCount: { displayTopSiteCount?: number } = await chrome.storage.local.get('displayTopSiteCount')
        const saveIsDisplaySearchBar: { isDisplaySearchBar?: boolean } = await chrome.storage.local.get('isDisplaySearchBar')
        const saveIsDisplayTime: { isDisplayTime?: boolean } = await chrome.storage.local.get('isDisplayTime')

        saveLang?.UILang && changeLang(saveLang.UILang!,true)
        saveBackgroundDisplayMode?.bgDisplayMode && changeBackgroundDisplayMode(saveBackgroundDisplayMode.bgDisplayMode,true)

        setInitState(prevState => ({ 
            ...prevState,
            isUseAMPM: saveIsUseAMPM?.isUseAMPM ? true : false,
            themColorRgba: (() => {
                if(saveThemColor?.themColor){
                    const repackParamters = Object.fromEntries(
                        Object.entries(saveThemColor.themColor!).reverse()
                    ) as RgbaColor

                    return repackParamters
                }

                return prevState.themColorRgba
            })(),
            clockColorRgba: (() => {
                if(saveClockColor?.clockColor) {
                    const repackParamters = Object.fromEntries(
                        Object.entries(saveClockColor.clockColor!).reverse()
                    ) as RgbaColor

                    return repackParamters
                }

                return prevState.clockColorRgba
            })(),
            clockFontSize: saveClockFontSize?.clockFontSize ? saveClockFontSize.clockFontSize : 100,
            clockFontShadow: saveClockFontShadow?.clockFontShadow ? saveClockFontShadow.clockFontShadow : 8,
            isLockSettingBar: saveIsLockSettingBar?.isLockSettingBar !== undefined ? saveIsLockSettingBar.isLockSettingBar : true,
            toggleSettingBar: saveIsLockSettingBar?.isLockSettingBar !== undefined ? saveIsLockSettingBar.isLockSettingBar : true,
            backgroundBlackMaskPercent: 
                saveBackgroundBlackMaskPercent?.backgroundBlackMaskPercent !== undefined ? saveBackgroundBlackMaskPercent.backgroundBlackMaskPercent : 0,
            displayTopSiteCount: (() => {
                const count: number = saveDisplayTopSiteCount?.displayTopSiteCount !== undefined ? saveDisplayTopSiteCount.displayTopSiteCount : 8
                getTopSiteResult(count)
                return count
            })(),
            isDisplaySearchBar: saveIsDisplaySearchBar?.isDisplaySearchBar !== undefined ? saveIsDisplaySearchBar.isDisplaySearchBar : true,
            isDisplayTime: saveIsDisplayTime?.isDisplayTime !== undefined ? saveIsDisplayTime.isDisplayTime : true,
        }))
    }

    const initActions: () => Promise<void> = async () => {
        setInitState(prevState => ({ ...prevState,toggleLoadingStatus: true  }))

        await initializeIndexedDB()

        await getLocalImgSet()

        await getChromeLocalSaveSettings()

        await generateCalendar(new Date().getFullYear())

        setTime()

        setTimeout(() => {
            setInitState(prevState => ({ ...prevState,toggleLoadingStatus: false, browserUILang: chrome.i18n.getUILanguage()  }))
        },500)

        timer.current = setInterval(() => setTime(),1000)
    }

    const changeSwitchEvent:(type: 'AMORPM' | 'settingBar' | 'displaySearchBar' | 'displayTime') => Promise<void> = async type => {
        
        const switchType: Record<string,any> = {
            [type]: undefined,
            AMORPM: async () => {
                const isToggle = !isUseAMPM
                await chrome.storage.local.set({ isUseAMPM: isToggle  })
                setInitState(prevState => ({ ...prevState,isUseAMPM: isToggle  }))
            },
            settingBar: async () => {
                const isToggle = !isLockSettingBar
                await chrome.storage.local.set({ isLockSettingBar: isToggle  })
                setInitState(prevState => ({ ...prevState,isLockSettingBar: isToggle, toggleSettingBar: !toggleSettingBar  }))
            },
            displaySearchBar: async () => {
                const isToggle = !isDisplaySearchBar
                await chrome.storage.local.set({ isDisplaySearchBar: isToggle  })
                setInitState(prevState => ({ ...prevState,isDisplaySearchBar: isToggle  }))
            },
            displayTime: async () => {
                const isToggle = !isDisplayTime
                await chrome.storage.local.set({ isDisplayTime: isToggle  })
                setInitState(prevState => ({ ...prevState,isDisplayTime: isToggle  }))
            },
        }

        switchType[type] && switchType[type]()
    }

    const convertTime: (hour: string) => { hour: string, displayAMPM: string } | undefined = hour => {
        if(hour === '--') return
        let intHour = parseInt(hour)
        const usingAMOrPM = intHour >= 12 ? formatLanguage('AMPMDesc.PM') : formatLanguage('AMPMDesc.AM')
        intHour = intHour % 12
        intHour = intHour ? intHour : 12

        return {
            hour: intHour.toString(),
            displayAMPM: usingAMOrPM
        }
    }

    const colorPickerWhenChange: (type: 'them' | 'clock',pickColorRgba: RgbaColor) => void = (type, pickColorRgba) => {

        const pickType: Record<string,any> = {
            [type]: undefined,
            them: async () => {
                await chrome.storage.local.set({ themColor: pickColorRgba  })
                setInitState(prevState => ({ ...prevState, themColorRgba: pickColorRgba }))
            },
            clock: async () => {
                await chrome.storage.local.set({ clockColor: pickColorRgba  })
                setInitState(prevState => ({ ...prevState, clockColorRgba: pickColorRgba }))
            }
        }

        pickType[type] && pickType[type]()
    }

    const clockSetting: (type: 'size' | 'shadow' | 'blackMask' | 'topSiteCount',value: number) => void = (type, value) => {

        const pickType: Record<string,any> = {
            [type]: undefined,
            size: async () => {
                setInitState(prevState => ({ ...prevState, clockFontSize: value }))
                await chrome.storage.local.set({ clockFontSize: value  })
            },
            shadow: async () => {                
                setInitState(prevState => ({ ...prevState, clockFontShadow: value }))
                await chrome.storage.local.set({ clockFontShadow: value  })
            },
            blackMask: async () => {                
                setInitState(prevState => ({ ...prevState, backgroundBlackMaskPercent: value }))
                await chrome.storage.local.set({ backgroundBlackMaskPercent: value  })
            },
            topSiteCount: async () => {       
                setInitState(prevState => ({ ...prevState, displayTopSiteCount: value }))
                await getTopSiteResult(value)
                await chrome.storage.local.set({ displayTopSiteCount: value  })
            }
        }

        pickType[type] && pickType[type]()
    }

    const deleteTopSiteHistory:(url: string,target: MouseEvent) => Promise<void> = async (url,target) => {
        target.stopPropagation()
        await chrome.history.deleteUrl({ url })
        setTimeout(() => getTopSiteResult(displayTopSiteCount),200)
    }

    const useToggleSettingBar: (type: 'enter' | 'leave') => void = type => {
        if(isLockSettingBar) return

        setInitState(prevState => ({
            ...prevState,
            toggleSettingBar: type === 'enter' ? true : false
        }))
    }

    const useToggleShowPath:(url: string,status: boolean) => void = (url,status) => {
        setInitState(prevState => ({
            ...prevState,
            toggleShowPath: status,
            showPath: url
        }))
    }

    const convertDateShow: (datef: string) => { text: string, date: string } = datef => {
        const [year, month, date] = datef.split('-')

        const fullDateFormat = {
            [currentLang]: { year, month, date },
            zh: { year, month: parseInt(month) , date: parseInt(date) },
            en: { year, month: formatLanguage(`monthName.${parseInt(month) - 1}`), date }
        }[currentLang]

        return { text: formatLanguage('currentDateShow',fullDateFormat), date:`${parseInt(month)}${parseInt(date)}` }
    }

    useEffect(() => {
        document.body.className = {
            Fill: 'bg-fill',
            Tile: 'bg-tile',
            Fit: 'bg-fit'
        }[backgroundDisplayMode]!
    }, [backgroundDisplayMode])

    useEffect(() => {

        (async () => await initActions())()

        return () => { clearInterval(timer.current) }
        
    },[])

    return (
        <>
            <StyledLayout 
                useThemColor={themColorRgbaToStr}
                useClockColor={clockColorRgbaToStr}
                useClockFontSize={`${clockFontSize === 1 ? 100 : 100 + clockFontSize}`}
                useClockFontShadow={`${clockFontShadow}px`}
                useBackgroundBlackMaskPercente={backgroundBlackMaskPercent}
                topSiteShowCount={displayTopSiteCount}
            >
                <div className='back-layout'></div>
                <div className="front-layout">
                    <div className="left">
                        <div className="top">

                        </div>
                        <div className="medium">
                            <div className={isDisplayTime ? 'current-time' : 'current-time hidden'}>
                                <div className="top">
                                    {isUseAMPM ? <span className='display-amorpm'>{convertTime(currentTimes.hour)?.displayAMPM}</span>: ''}
                                    {isUseAMPM ? convertTime(currentTimes.hour)?.hour || '--' : currentTimes.hour}<span className='split-time'>:</span>{currentTimes.minute}
                                </div>
                                <div className="bottom">{convertDateShow(currentDate).text}</div>
                            </div>
                            <div className={isDisplaySearchBar ? 'search-bar' : 'search-bar hidden'}>
                                <i className="far fa-search search-icon"></i>
                                <input className="search-input" type="text" placeholder={formatLanguage('searchDesc')} onKeyPress={({ which,target }) => {
                                    const inputElement = target as HTMLInputElement
                                    if(which === 13 && inputElement.value !== '') searchResult(inputElement)
                                }} />
                            </div>
                            <div className="brows-past-list">
                                {browsPastList.length > 0 ? (
                                    browsPastList.map((row,index) => (
                                        <div className="list-item" 
                                            title={row.title} 
                                            key={index} 
                                            onClick={() => window.location.assign(row.url)}
                                            onMouseEnter={useToggleShowPath.bind(this,row.url,true)}
                                            onMouseLeave={useToggleShowPath.bind(this,row.url,false)}
                                        >
                                            <div className='delete-btn' title={formatLanguage('action.delete')} onClick={deleteTopSiteHistory.bind(this,row.url)}>
                                                <i className="far fa-times-circle"></i>
                                            </div>
                                            <div className="img-outer">
                                                <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${row.url}&size=24`} />
                                            </div>
                                            <div className="text-outer">
                                                <span>{row.title}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : null}
                            </div>
                        </div>
                        <div className="bottom">
                            
                        </div>
                    </div>
                    {/* tool bar */}
                    <div className="right" onMouseEnter={useToggleSettingBar.bind(this,'enter')} onMouseLeave={useToggleSettingBar.bind(this,'leave')}>
                        <div className={`tool-bar ${toggleSettingBar ? 'toggle' : ''}`}>
                            <div className='google-login-btn'
                                onClick={() => {
                                    window.open(`https://accounts.google.com?hl=${browserUILang}`,'',`popup,left=${(window.screen.width / 2) - ((450 / 2) + 10)},top=${(window.screen.height / 2) - ((612 / 2) + 30)},width=450,height=612`)
                                }}
                            >
                                <i className="fab fa-google"></i>
                            </div>
                            <div className="setting-btn" onClick={() => setInitState(prevState => ({ ...prevState,toggleControlModal: !toggleControlModal }))}>
                                <i className="fas fa-cog"></i>
                            </div>
                            <div className="calender-btn" onClick={() => {

                                const todayDom = document.querySelector<HTMLDivElement>('.highlight')!
                                const todayMonth = todayDom.parentNode!.parentNode as HTMLDivElement
                                $(calenderBodyDomRef.current).scrollToPos({ direction: 'top', scrollPos: todayMonth.offsetTop - todayMonth.offsetHeight / 3, duration: 0 })
                                setInitState(prevState => ({ ...prevState,toggleCalenderSlider: !toggleCalenderSlider }))
                            }}>
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                        </div>
                    </div>
                    {/* setting modal */}
                    <div className={`control-modal-outer ${toggleControlModal ? 'toggle' : ''}`}>
                        <div className="header">
                            {formatLanguage('setting')}
                            <div className="back-btn" onClick={() => setInitState(prevState => ({ ...prevState,toggleControlModal: false }))}>
                                <i className="far fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className="body">
                            <div className="list">
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('UILanguage')}</div>
                                    <div className="func-action">
                                        <DropDownList 
                                            bindValue={currentLang} 
                                            listItem={languageList.map(row => ({ selectName: row.UILang, selectValue: row.lang }))}
                                            changeEvent={lang => changeLang(lang,false)}
                                            useThemColor={themColorRgbaToStr}
                                        />
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('changeBackgroundImage')}</div>
                                    <div className="func-action">
                                        <div className="change-bg-btn">
                                            {formatLanguage('changeImage')}
                                            <input type="file" className="change-bg-input" accept="image/*" onChange={changeBgAction} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('backgroundDisplayMode')}</div>
                                    <div className="func-action">
                                        <DropDownList 
                                            bindValue={backgroundDisplayMode} 
                                            listItem={backgroundDisplayModeList} 
                                            changeEvent={mode => changeBackgroundDisplayMode(mode, false)} 
                                            useThemColor={themColorRgbaToStr}
                                        />
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('changeThemColor')}</div>
                                    <div className="func-action use-picker">
                                        <div className="color-picker-btn" onClick={() => setInitState(prevState => ({ ...prevState, toggleThemColorPicker: !toggleThemColorPicker }))}>
                                            {formatLanguage('changeColor')}
                                            <div className="color-box" style={{ backgroundColor: themColorRgbaToStr }}></div>
                                        </div>
                                        <div className={`picker-outer ${toggleThemColorPicker ? 'toggle' : ''}`}>
                                            <RgbaColorPicker color={themColorRgba} onChange={colorPickerWhenChange.bind(this, 'them')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('changeClockColor')}</div>
                                    <div className="func-action use-picker">
                                        <div className="color-picker-btn" onClick={() => setInitState(prevState => ({ ...prevState, toggleClockColorPicker: !toggleClockColorPicker }))}>
                                            {formatLanguage('changeColor')}
                                            <div className="color-box" style={{ backgroundColor: clockColorRgbaToStr }}></div>
                                        </div>
                                        <div className={`picker-outer ${toggleClockColorPicker ? 'toggle' : ''}`}>
                                            <RgbaColorPicker color={clockColorRgba} onChange={colorPickerWhenChange.bind(this, 'clock')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('changeClockSize')}</div>
                                    <div className="func-action use-range">
                                        <div className="range-input-outer size">
                                            <Slide min={1} max={100} slideNum={clockFontSize} changeEvent={clockSetting.bind(this, 'size')} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('changeClockShadow')}</div>
                                    <div className="func-action use-range">
                                        <div className="range-input-outer">
                                            <Slide min={0} max={10} slideNum={clockFontShadow} changeEvent={clockSetting.bind(this,'shadow')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('backgroundBlackMask')}</div>
                                    <div className="func-action use-range">
                                        <div className="range-input-outer">
                                            <Slide min={0} max={80} slideNum={backgroundBlackMaskPercent} changeEvent={clockSetting.bind(this,'blackMask')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('displayTopSiteCount')}</div>
                                    <div className="func-action use-range">
                                        <div className="range-input-outer">
                                            <Slide min={0} max={8} slideNum={displayTopSiteCount} changeEvent={clockSetting.bind(this,'topSiteCount')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('use24h')}</div>
                                    <div className="func-action">
                                        <div className="slide-btn-outer">
                                            <SwitchBar isSlide={!isUseAMPM} clickEvent={changeSwitchEvent.bind(this,'AMORPM')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('lockSettingBar')}</div>
                                    <div className="func-action">
                                        <div className="slide-btn-outer">
                                            <SwitchBar isSlide={isLockSettingBar} clickEvent={changeSwitchEvent.bind(this,'settingBar')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('displaySearchBar')}</div>
                                    <div className="func-action">
                                        <div className="slide-btn-outer">
                                            <SwitchBar isSlide={isDisplaySearchBar} clickEvent={changeSwitchEvent.bind(this,'displaySearchBar')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="func-name">{formatLanguage('displayTime')}</div>
                                    <div className="func-action">
                                        <div className="slide-btn-outer">
                                            <SwitchBar isSlide={isDisplayTime} clickEvent={changeSwitchEvent.bind(this,'displayTime')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* calendar modal */}
                    <div className={`calender-right-slider ${toggleCalenderSlider ? 'toggle' : ''}`}>
                        <div className="header">
                            <div className="title">{formatLanguage("almanac")}</div>
                            <div className="back-btn" onClick={() => setInitState(prevState => ({ ...prevState,toggleCalenderSlider: false }))}>
                                <i className="far fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className="body">
                            <div className="calendar-outer">
                                <div className="calendar" ref={calenderBodyDomRef}>
                                    {$.maps(monthDays, (row, rowIndex) => 
                                        <div className="month-outer" key={rowIndex}>
                                            <div className='month'>
                                                <div className='title'>{formatLanguage(`monthName.${row.monthCount - 1}`)}</div>
                                                <div className="weekdays">
                                                    {$.maps(row.weekdays, (weekdaysRow, wIndex) => <div className="weekday" key={wIndex}>{formatLanguage(`weekDaysShortName.${weekdaysRow}`)}</div>)}
                                                </div>
                                                <div className="days">{
                                                    $.maps(row.days, (daysRow, dIndex) => 
                                                        <div 
                                                            className={
                                                                `${daysRow.dayType.prevMonth || daysRow.dayType.nextMonth ? 'day other-month' : 'day'} ${
                                                                    !(daysRow.dayType.prevMonth || daysRow.dayType.nextMonth) && daysRow.dayType.isHoliday && daysRow.dayType.dayName ? 
                                                                    'holiday' : !(daysRow.dayType.prevMonth || daysRow.dayType.nextMonth) && daysRow.dayType.isHoliday ? 'normal-holiday' : ''
                                                                }
                                                                ${(dIndex + 1) % 7 === 0 ? 'last' : ''}
                                                                ${(convertDateShow(currentDate).date === `${daysRow.month}${daysRow.day}`) && daysRow.dayType.currentMonth ? 'highlight' : ''}
                                                                `
                                                            } 
                                                            key={dIndex}
                                                        >{daysRow.day}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className='day'>{formatLanguage(`weekDaysFullName.${new Date().getDay()}`)}</div>
                            <div className="date">{convertDateShow(currentDate).text}</div>
                            <div className='time'>
                                {isUseAMPM ? <span className='display-amorpm'>{convertTime(currentTimes.hour)?.displayAMPM}</span>: ''}
                                {isUseAMPM ? convertTime(currentTimes.hour)?.hour || '--' : currentTimes.hour}<span>：</span>{currentTimes.minute}<span>：</span>{currentTimes.seconds}
                            </div>
                        </div>
                    </div>
                    <div className={`show-path ${toggleShowPath ? 'toggle' : ''}`}>{decodeURIComponent(showPath)}</div>
                    <div className="copy-right">
                        <h6>{formatLanguage('copyRight')} &copy; 2024-02 Alex Chen .</h6>
                    </div>
                </div>
            </StyledLayout>
            <Toast themColor={themColorRgbaToStr} />
            <Loading loadingStatus={toggleLoadingStatus} loadingText={formatLanguage('loadingSetting')} />
        </>
    )
}

export default MainThem