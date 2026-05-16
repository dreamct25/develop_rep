import { useEffect, useState, useRef, useContext, UIEventHandler } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuBellRing, LuBellOff } from "react-icons/lu";
import IndexedDB from "@/IndexedDBHelper"
import { NewContext } from '@/App'
import { StyledLayout, InitStateType } from '.'
import packageJson from '../../../package.json'
import { CustomInput, CustomTextArea, SwitchBar } from '@/component'

const Main: FC = ():TSX => {

    const { $, isPWA, isDesktop } = useContext(NewContext)

    const[{
        monthDays,
        holidays,
        currentYear,
        isScroll,
        isAllowScrollEventModalContent,
        isEnableAlert,
        currentScrollEventModalContentPos,
        currentSelectDate,
        currentSelectDateInAllEventList,
        highlightDate,
        toggleEventsListStatus,
        toggleSingleEventsModalStatus,
        currentSingleEventsModalView,
        filterEventsListResult,
        eventsListResult,
        eventTitle,
        eventContent,
        eventTime,
        eventUpdateItem,
        deleteEventId,
        toggleDeleteEventLayoutStatus,
        toggleDeleteEventAllListLayoutStatus
    }, setInitState] = useState<InitStateType>({
        monthDays: [],
        holidays: [],
        currentYear: new Date().getFullYear(),
        isScroll: false,
        isAllowScrollEventModalContent: false,
        isEnableAlert: false,
        currentScrollEventModalContentPos: 0,
        currentSelectDate: '',
        currentSelectDateInAllEventList: '',
        highlightDate: '',
        toggleEventsListStatus: false,
        toggleSingleEventsModalStatus: false,
        currentSingleEventsModalView: 'list',
        eventsListResult: [],
        filterEventsListResult: [],
        eventsModalMode: 'add',
        eventTitle: '',
        eventContent: '',
        eventTime: { h: '', m: '', s: '' },
        eventUpdateItem: undefined,
        deleteEventId: -1,
        toggleDeleteEventLayoutStatus: false,
        toggleDeleteEventAllListLayoutStatus: false
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isScrollRef = useRef<boolean>(false)

    const scrollSnapDebounceTimer = useRef<NodeJS.Timeout>(undefined)

    const allowScrollEventModalContentDebounceTimer = useRef<NodeJS.Timeout>(undefined)

    const resizeSingleDataModalSetPosDebounceTimer = useRef<NodeJS.Timeout>(undefined)

    const checkIsShowNotificationTimer = useRef<NodeJS.Timeout>(undefined)

    const debounceTimer = useRef<NodeJS.Timeout>(undefined)

    const isScrollEventHandle = useRef<boolean>(false)

    const currentSelectDateDebunce = useRef<NodeJS.Timeout>(undefined)

    const singleDateEventModalRef = useRef<HTMLDivElement>(null)

    const monthNames = [
        '1 月', '2 月', '3 月', '4 月', '5 月', '6 月',
        '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'
    ]

    const weekdays = ['日', '一', '二', '三', '四', '五', '六']

    const addZero: (num: number) => string = num => `${num < 10 ? `0${num}` : num}`

    const generateCalendar: (year: number) => Promise<void> = async (year) => {

        const holidayDisplayNameMatch: Record<string, string> = {
            ['開國紀念日']: '元旦',
            ['和平紀念日']: '二二八和平紀念日',
            ['國慶日']: '雙十節'
        }

        const monthDaysResult = $.maps(monthNames, (monthName, index) => {

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
                        isHaveEvent: false,
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
                        isHaveEvent: false,
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
                        isHaveEvent: false,
                        dayName: ''
                    }
                }
            })

            return {
                monthName,
                weekdays,
                days: [...prev,...cur,...next]
            }
        });

        let eventsResult: InitStateType["eventsListResult"] | undefined

        if(isPWA) {
            eventsResult = await getEventsListResult('get all')
        }

        try {

            setIsLoading(true)

            const result = await $.fetch.get<{
                date: string,
                week: string,
                isHoliday: boolean,
                description: string
            }[]>(
                'https://raw.githubusercontent.com/ruyut/TaiwanCalendar/refs/heads/master/data',
                { routeParams: { year: `${year}.json` } }
            )

            if(result.status !== 200) throw new Error()

            const data = result.data

            const repack = $.maps(monthDaysResult, row => {

                row.days = $.maps(row.days, (daysRow => {

                    if(eventsResult) {

                        $.each(eventsResult, eventsDataRow => {

                            if(eventsDataRow.eventDate === `${currentYear}-${addZero(daysRow.month)}-${addZero(daysRow.day)}`) {
                                daysRow.dayType.isHaveEvent = true
                            }
                        })
                    }

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

            const repack = $.maps(monthDaysResult, row => {

                row.days = $.maps(row.days, (daysRow => {

                    if(eventsResult) {

                        $.each(eventsResult, eventsDataRow => {

                            if(eventsDataRow.eventDate === `${currentYear}-${addZero(daysRow.month)}-${addZero(daysRow.day)}`) {
                                daysRow.dayType.isHaveEvent = true
                            }
                        })
                    }

                    return daysRow
                }))

                return row
            })

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
                monthDays: repack,
                holidays: holidaysResult
            }))
        }

        setIsLoading(false)
    }

    const currentSelectHoliday: (month: number, day: number, isClick: boolean) => void = (month, day, isClick) => {

        const [filterItem] = $.filter(holidays, filterRow => filterRow.month === month && filterRow.day === day)

        const isClickHoliday = filterItem ? true : false

        setInitState(prevState => {

            let highlightDateTemp = ''

            const currentSelectDateTemp = filterItem ? `${addZero(filterItem.month)}/${addZero(filterItem.day)}` : `${addZero(month)}/${addZero(day)}`
            
            if(isPWA) {
                highlightDateTemp = `${month}${day}`
            } else {
                highlightDateTemp = filterItem ? `${filterItem.month}${filterItem.day}` : `${addZero(month)}/${addZero(day)}`
            }
            
            if(
                (prevState.currentSelectDate === currentSelectDateTemp || 
                prevState.highlightDate === highlightDateTemp) && !isPWA
            ) return prevState

            return {
                ...prevState,
                currentSelectDate: currentSelectDateTemp,
                highlightDate: highlightDateTemp,
            }
        })

        if(!isPWA) return

        if(!isClick) return

        if(!isClickHoliday) {

            setInitState(prevState => ({
                ...prevState,
                toggleSingleEventsModalStatus: true
            }))

            return
        }

        clearTimeout(currentSelectDateDebunce.current)

        currentSelectDateDebunce.current = setTimeout(() => {

            setInitState(prevState => ({
                ...prevState,
                toggleSingleEventsModalStatus: true
            }))

        }, 1000)
    }

    const rowOuterOnWheelRef:(element: HTMLDivElement | null) => void = element => {
        
        if(!element) return
                            
        element!.onwheel = event => {

            event.preventDefault()

            const element = event.target as HTMLDivElement


            if(element.className === 'row-outer'){
                element.scrollLeft += event.deltaY
                return
            }

            if(element.className === 'row'){
                element.parentElement!.scrollLeft += event.deltaY
                return
            }
    
            element.parentElement!.parentElement!.scrollLeft += event.deltaY
        }
    }

    const holidayDescRowOuterScrollEventHandler: UIEventHandler<HTMLDivElement> = e => {
        
        const element = e.target as HTMLDivElement

        if(!e.target) return

        const doms = element.querySelectorAll<HTMLDivElement>('.row .desc-date')

        if(doms.length > 1) {

            const toArrDoms = $.createArray({ type: 'new', item: doms }) as HTMLDivElement[]

            const filterDom = toArrDoms.filter((dom, domIndex) => {
                const plusInEnd = domIndex === toArrDoms.length - 1 ? 50 : 0
                return element.scrollLeft >= ((dom.parentElement!.offsetWidth + 12) * domIndex) - 62 - plusInEnd
            })

            if(filterDom.length !== 0) {

                const filterSingleDateDom = filterDom[filterDom.length - 1]

                if(currentSelectDate !== filterSingleDateDom.textContent) {

                    isScrollEventHandle.current = true

                    const [month, date] = filterSingleDateDom.textContent.split('/')

                    currentSelectHoliday(parseInt(month), parseInt(date), false)

                    clearTimeout(debounceTimer.current)

                    debounceTimer.current = setTimeout(() => {
                        isScrollEventHandle.current = false
                    }, 200)
                }
            }
        }
    }

    const holidayDescRowOuterScrollEventRefHandler: (filterItem: InitStateType['monthDays'][0]['days'], element: HTMLDivElement) => void = (filterItem, element) => {
     
        if(element) {

            if(isScrollEventHandle.current) return
            
            if(filterItem.length > 1) rowOuterOnWheelRef(element)

            const doms = element.querySelectorAll<HTMLDivElement>('.row .desc-date')

            if(doms.length > 1) {

                const toArr = $.createArray({ type: 'new', item: doms }) as HTMLDivElement[]

                const [filterDom] = $.filter(toArr, dom => dom.textContent === currentSelectDate)
                
                const filterDomPos = toArr.indexOf(filterDom)

                if(!filterDom) return

                $.each($.createArray({ type: 'new', item: element.children }) as HTMLDivElement[], child => $(child).removeClass('with-snap'))
                
                $(element).scrollToPos({ 
                    direction: 'left', 
                    scrollPos: ((filterDom.parentElement!.offsetWidth + 12) * filterDomPos) - 55,
                    duration: 1500
                })

                clearTimeout(scrollSnapDebounceTimer.current)

                scrollSnapDebounceTimer.current = setTimeout(() => {
                    $.each($.createArray({ type: 'new', item: element.children }) as HTMLDivElement[], child => $(child).addClass('with-snap'))
                }, 1500)
            }
        }
    }

    const renderOnlyHoliday: (dayRow: InitStateType['monthDays'][0]['days']) => TSX = dayRow => {

        const filterItem = $.filter(dayRow, row => row.dayType.dayName !== '')

        return (
            <div className="holiday-desc-outer">
                {
                    <div 
                        className="row-outer" 
                        style={{ 
                            gridTemplateColumns: 
                                filterItem.length === 0 ? '1fr' : 
                                filterItem.length === 1 ? '1fr' : 
                                $.createArray({ type: 'fake', item: { random: filterItem.length } },() => '250px' ).join(' ')
                        }}
                        onScroll={holidayDescRowOuterScrollEventHandler}
                        ref={holidayDescRowOuterScrollEventRefHandler.bind(undefined, filterItem)}
                    >
                        {filterItem.length !== 0 ? $.maps(filterItem, (row, index) => (
                            <div 
                                className='row with-snap'
                                key={index}
                            >
                                <div className='desc-date'>{addZero(row.month)}/{addZero(row.day)}</div>
                                <div>
                                    <span ref={element => {
                                        
                                        if(element) {

                                            const parentElement = element.parentElement

                                            if(parentElement) {

                                                parentElement.classList.remove('move')
                                                
                                                if(element.offsetWidth !== parentElement.offsetWidth) {
                                                    
                                                    const paddingSpace = 6.2

                                                    parentElement.classList.add('move')
                                                    
                                                    element.style.cssText = `
                                                        --move: ${parentElement.offsetWidth - paddingSpace}px;
                                                        --padding-space: ${paddingSpace}px;
                                                    `
                                                }
                                            }
                                        }
                                    }}>{row.dayType.dayName}</span>
                                </div>
                            </div>
                            
                        )) : (
                            <div className='no-holiday'>本月無節慶日</div>
                        )}
                    </div> 
                }
            </div>
        )
    }

    const changeYear:(action: 'prev' | 'next') => void = action => {

        setInitState(prevState => {

            if(prevState.currentSelectDate){
                prevState.currentSelectDate = ''
                prevState.highlightDate = ''
            }

            if(action === 'next'){

                prevState.currentYear += 1

                return { ...prevState }
            }

            prevState.currentYear -= 1

            return { ...prevState }
        })
    }

    const checkEventCanUsingAlert: () => boolean = () => 
        +new Date(
            $.formatDateTime({ 
                formatDate: new Date(), 
                formatType: 'yyyy-MM-dd' 
            })
        ) <= +new Date(
            $.formatDateTime({ 
                formatDate: `${currentYear}/${currentSelectDate}`, 
                formatType: 'yyyy-MM-dd' 
            })
        )

    const notificationAction: (title: string, desc: string, actionType: 'init' | 'actionMsg' | 'showEventNotification') => Promise<void> = async (title, desc, actionType) => {
        
        const reg = await navigator.serviceWorker.ready

        if(!reg.active) return

        if(actionType === 'init') {
            
            reg.active.postMessage({
                type: actionType,
                messageTitle: title
            })

            return
        }

        reg.active.postMessage({
            type: actionType,
            msg: `${title}\n${desc}`
        })
    }

    const getEventsListResult: (method: 'get all' | 'filter single') => Promise<InitStateType['eventsListResult'] | undefined> = async method => {

            const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

            await indexedDb.init()

            const result = await indexedDb.getAll<InitStateType['eventsListResult']>()

            if(result.length === 0) {

                setInitState(prevState => ({
                    ...prevState,
                    eventsListResult: [],
                    filterEventsListResult: []
                }))

                return
            }

            if(method === 'get all') {

                setInitState(prevState => ({
                    ...prevState,
                    eventsListResult: result
                }))

                return result
            }

            const [month, date] = currentSelectDate.split('/')

            const filterItem = $.filter(result, row => row.eventDate === `${currentYear}-${month}-${date}`)

            setInitState(prevState => ({
                ...prevState,
                filterEventsListResult: filterItem
            }))
    }

    const confirmEvents: (type: 'add' | 'update') => Promise<void> = async type => {

        if(type === 'add') {
            
            const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

            await indexedDb.init()

            const [month, date] = currentSelectDate.split('/')

            const eventAlertTime = +new Date(
                currentYear,
                parseInt(month) - 1,
                parseInt(date),
                parseInt(eventTime.h),
                parseInt(eventTime.m),
                parseInt(eventTime.s)
            )

            const insertItem = {
                type: 'add',
                title: eventTitle,
                desc: eventContent,
                isEnableAlert,
                isNotic: false,
                eventDate: `${currentYear}-${month}-${date}`,
                eventAlertTime: isEnableAlert ? eventAlertTime : 0,
                createTime: $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' }),
                updateTime: '',
            }

            const addAction = await indexedDb.add(insertItem)

            if(addAction) {

                await notificationAction(
                    '新增成功', 
                    `已在 ${insertItem.eventDate} 新增了代辦事項：\n${insertItem.title}`,
                    'actionMsg'
                )
            }
        } 
        
        if(type === 'update') {

            if(eventUpdateItem) {

                const filterItem = $.filter(filterEventsListResult, row => row.id === eventUpdateItem.id)

                if(filterItem.length > 0) {

                    const [item] = filterItem

                    const [month, date] = currentSelectDate.split('/')

                    const eventAlertTime = +new Date(
                        currentYear,
                        parseInt(month) - 1,
                        parseInt(date),
                        parseInt(eventTime.h),
                        parseInt(eventTime.m),
                        parseInt(eventTime.s)
                    )

                    const tempTitle = item.title

                    item.title = eventTitle
                    item.desc = eventContent
                    item.isEnableAlert = isEnableAlert
                    

                    item.updateTime = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' })
                    
                    if(+new Date(item.eventAlertTime) !== +new Date(eventAlertTime)) {
                        item.isNotic = false
                        item.eventAlertTime = isEnableAlert ? eventAlertTime : 0
                    }

                    const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

                    await indexedDb.init()

                    const updateAction = await indexedDb.put(item)

                    if(updateAction) {

                        await notificationAction(
                            '更新成功', 
                            `已更新 ${item.eventDate} - ${tempTitle} 代辦事項內容`,
                            'actionMsg'
                        )
                    }
                }
            }
        }

        await generateCalendar(currentYear)

        await getEventsListResult('filter single')

        singleEventModalContentViewAction('list')
    }

    const showDeleteEventsLayout: (id: number) => Promise<void> = async id => {

        const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

        await indexedDb.init()

        const result = await indexedDb.getSingle<InitStateType['eventsListResult'][0]>(id)

        if(!result) return

        setInitState(prevState => ({
            ...prevState,
            eventTitle: result.title,
            deleteEventId: result.id,
            toggleDeleteEventLayoutStatus: true,
            toggleDeleteEventAllListLayoutStatus: toggleEventsListStatus
        }))
    }

    const confirmDeleteInfo: (type: 'confirm' | 'cancel') => Promise<void> = async type => {

        if(type === 'confirm') {

            const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

            await indexedDb.init()

            const result = await indexedDb.getSingle<InitStateType['eventsListResult'][0]>(deleteEventId)

            if(!result) return

            const deleteAction = await indexedDb.delete(deleteEventId)

            if(deleteAction) {

                await notificationAction(
                    '刪除成功', 
                    `已刪除 ${result.eventDate} - ${result.title} 代辦事項`,
                    'actionMsg'
                )
            }

            await generateCalendar(currentYear)

            await getEventsListResult('filter single')
        }

        setInitState(prevState => ({
            ...prevState,
            deleteEventId: -1,
            toggleDeleteEventLayoutStatus: false,
            toggleDeleteEventAllListLayoutStatus: false,
            eventTitle: ''
        }))
    }

    const openEventsList: () => void = () => {

        setInitState(prevState => ({ 
            ...prevState, 
            toggleEventsListStatus: true 
        }))

        getEventsListResult('get all')
    }

    const singleEventModalContentViewAction: (
        currentView: 'list' | 'else', 
        updateItem?: InitStateType['eventsListResult'][0], 
        isAllEventListToggle?: boolean
    ) => void = (currentView, updateItem, isAllEventListToggle) => {

        if(!singleDateEventModalRef.current) return

        $(singleDateEventModalRef.current).scrollToPos({
            direction: 'left',
            scrollPos: currentView === 'list' ? 0 : singleDateEventModalRef.current.offsetWidth,
            duration: 500
        })

        const updateRow:Record<string, any> = { 
            currentSingleEventsModalView: currentView, 
            ...updateItem ? { 
                eventUpdateItem: updateItem,
                eventTitle: updateItem.title,
                eventContent: updateItem.desc,
                isEnableAlert: updateItem.isEnableAlert,
                eventTime: {
                    h: updateItem.eventAlertTime ? `${new Date(updateItem.eventAlertTime).getHours()}` : '',
                    m: updateItem.eventAlertTime ? `${new Date(updateItem.eventAlertTime).getMinutes()}` : '',
                    s: updateItem.eventAlertTime ? `${new Date(updateItem.eventAlertTime).getSeconds()}` : ''
                }
            } : {
                eventUpdateItem: undefined,
                isEnableAlert: false,
                currentSelectDateInAllEventList: '',
                eventTitle: '',
                eventContent: '',
                eventTime: { h: '', m: '', s: '' }
            }
        }

        if(isAllEventListToggle && updateItem) {

            updateRow.toggleSingleEventsModalStatus = isAllEventListToggle
            updateRow.currentSelectDateInAllEventList = updateItem.eventDate
        }

        setInitState(prevState => ({
            ...prevState,
            ...updateRow,
            isAllowScrollEventModalContent: true,
        }))

        clearTimeout(allowScrollEventModalContentDebounceTimer.current)
        
        allowScrollEventModalContentDebounceTimer.current = setTimeout(() => 
            setInitState(prevState => ({ 
                ...prevState, 
                isAllowScrollEventModalContent: false,
                currentScrollEventModalContentPos: singleDateEventModalRef.current!.scrollLeft
            }))
        , 500)
    }

    const singleEventModalInputChangeHandler: (type: 'eventTitle' | 'eventContent', { target } : { target: HTMLInputElement | HTMLTextAreaElement }) => void = (type, { target }) => {
        
        setInitState(prevState => ({
            ...prevState,
            [type]: target.value
        }))
    }

    const deriveKey = async (ps: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> => {
        const encoder = new TextEncoder();
        const baseKey = await crypto.subtle.importKey(
            "raw", encoder.encode(ps), "PBKDF2", false, ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
            baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
        );
    }

    const encryptData = async (text: string, ps: string): Promise<string> => {
        const encoder = new TextEncoder();
        
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const aesKey = await deriveKey(ps, salt);
        
        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv }, aesKey, encoder.encode(text)
        );

        const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        result.set(salt, 0);
        result.set(iv, salt.length);
        result.set(new Uint8Array(encrypted), salt.length + iv.length);

        const rawString = String.fromCharCode(...result);

        return btoa(rawString);
    }

    const decryptData = async (context: string, ps: string): Promise<string> => {
        const decoder = new TextDecoder();

        const binaryStr = atob(context);
        const combined = new Uint8Array(binaryStr.length).map((_, i) => binaryStr.charCodeAt(i));

        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const ciphertext = combined.slice(28);

        const aesKey = await deriveKey(ps, salt);
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv }, aesKey, ciphertext
        );

        return decoder.decode(decrypted);
    }

    const importEventsDataInputEventHandler: (event: Event) => Promise<void> = async event => {

        const element = event.target as HTMLInputElement

        if(!element.files) return

        const { length, [length - 1]: file } = element.files;
        const fileText = await file.text();

        try {
            
            const decodeText = await decryptData(fileText, 'hello#')

            const decodeJsonData = JSON.parse(decodeText) as InitStateType['eventsListResult']

            const result = await getEventsListResult('get all')

            if(!result) {

                const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

                await indexedDb.init()

                await $.createPromiseAll($.maps(decodeJsonData, async row => await indexedDb.add(row)))

                await getEventsListResult('get all')

                await notificationAction(
                    '匯入完成', 
                    `成功將資料匯入行事曆中\n共匯入 ${decodeJsonData.length} 筆資料`,
                    'actionMsg'
                )

                return
            }

            const filterNotTheSameData = $.filter(
                $.maps(decodeJsonData, row => {
                    const [filterItem] = $.filter(result, filterRow => JSON.stringify(row) === JSON.stringify(filterRow))

                    if(filterItem) return undefined

                    return row
                }),
                row => row !== undefined
            )

            if(filterNotTheSameData.length === 0) {
                
                await notificationAction(
                    '匯入完成', 
                    '無更新的資料',
                    'actionMsg'
                )

                return
            }
            
            const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

            await indexedDb.init()

            await $.createPromiseAll($.maps(filterNotTheSameData, async row => await indexedDb.add(row)))

            await getEventsListResult('get all')

            await notificationAction(
                '匯入完成', 
                `成功資料匯入行事曆中\n共匯入 ${filterNotTheSameData.length} 筆資料`,
                'actionMsg'
            )
            
        } catch(err: any) {
            
            await notificationAction(
                '匯入失敗', 
                `檔案 ${file.name} 資料內容異常`,
                'actionMsg'
            )
        }
    }

    const exportEventsData: () => Promise<void> = async () => {

        const result = await getEventsListResult('get all')

        if(!result) return

        const currentTime = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyyMMdd_HHmmss' }) 

        const outputJson = JSON.stringify(result, null, 2);
        const encodeJson = await encryptData(outputJson, 'hello#')

        const blob = new Blob([encodeJson], { type: "text/plain" });

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `events-data_${currentTime}.bak`;
        a.click();

        URL.revokeObjectURL(a.href);

        await notificationAction(
            '匯出完成', 
            `已成功將檔案 events-data_${currentTime}.bak 匯出至下載資料夾中`,
            'actionMsg'
        )
    }

    const importEventsData: () => Promise<void> = async () => {

        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".bak";

        input.onchange = importEventsDataInputEventHandler

        input.click();
    }

    const resetSingleDataModalPosWhenResizeHandler: () => void = () => {
        
        if(!singleDateEventModalRef.current) return

        const rect = singleDateEventModalRef.current.getBoundingClientRect()
       
        setInitState(prevState => ({
            ...prevState,
            isAllowScrollEventModalContent: true
        }))

        singleDateEventModalRef.current.scrollLeft = currentSingleEventsModalView === 'list' ? 0 : rect.width

        clearTimeout(resizeSingleDataModalSetPosDebounceTimer.current)

        resizeSingleDataModalSetPosDebounceTimer.current = setTimeout(() => {
            
            setInitState(prevState => ({
                ...prevState,
                isAllowScrollEventModalContent: false,
                currentScrollEventModalContentPos: singleDateEventModalRef.current!.scrollLeft
            }))

        }, 1000)
    }

    const checkIsShowNotification:() => Promise<void> = async () => {
        
        const currentTime = +new Date()

        const indexedDb = new IndexedDB('calanderDataDB', 'info-cache')

        await indexedDb.init()

        const result = await indexedDb.getAll<{
            type: string,
            id: number,
            title: string,
            desc: string,
            isEnableAlert: boolean,
            isNotic: boolean,
            eventDate: string,
            eventAlertTime: number,
            createTime: string,
            updateTime: string
        }[]>()

        if(result.length > 0) {

            const filterNoticeMsg = $.filter(result, row => row.isEnableAlert)

            if(filterNoticeMsg.length > 0) {

                $.each(filterNoticeMsg, async row => {

                    if(row.isNotic) return

                    if(currentTime >= row.eventAlertTime) {

                        row.isNotic = true

                        notificationAction('提醒代辦事項', `${row.title}\n${row.desc}`, 'showEventNotification')
                    }

                    await indexedDb.put(row)
                })

                clearInterval(checkIsShowNotificationTimer.current)

                checkIsShowNotificationTimer.current = setInterval(checkIsShowNotification, 1000)
            }

            return
        }

        clearInterval(checkIsShowNotificationTimer.current)

        checkIsShowNotificationTimer.current = setInterval(checkIsShowNotification, 1000)
    }

    const whenInPWA: () => void = () => {
        location.reload()
    }

    const initAction: () => Promise<void> = async () => {

        window.onscroll = () => {

            if(window.scrollY > 45 && !isScrollRef.current){
                isScrollRef.current = true
                setInitState(prevState => ({ ...prevState, isScroll: true }));
                return
            }

            if(window.scrollY < 45 && isScrollRef.current){
                isScrollRef.current = false
                setInitState(prevState => ({ ...prevState, isScroll: false }));
            }         
        }

        if(isPWA) {

            const isNotFirstUse = localStorage.getItem('isNotFirstUse')

            document.onkeydown = (event) => {
            
                if(event.keyCode === 123) {
                    event.preventDefault()
                    return false
                }
            }

            if(!isNotFirstUse) {
                alert('如需起用行事曆提醒功能請先允許該站通知')
                localStorage.setItem('isNotFirstUse', 'true')
            }
            
            await notificationAction('--- ◎ 行 事 曆 通 知 ◎ ---', '', 'init')

            await Notification.requestPermission()

            await checkIsShowNotification()
        }
    }

    useEffect(() => {
        
        if(toggleSingleEventsModalStatus) getEventsListResult('filter single')
        
        document.body.style.cssText = (toggleSingleEventsModalStatus || toggleEventsListStatus) ? 'overflow: hidden;' : ''

    }, [toggleSingleEventsModalStatus, toggleEventsListStatus])

    useEffect(() => {

        generateCalendar(currentYear)
        
        document.title = isPWA ? `v${packageJson.version}` : `${currentYear} 年曆`
    
    }, [currentYear])

    useEffect(() => {

        initAction()

        window.matchMedia('(display-mode: standalone)').addEventListener('change', whenInPWA)

        return () => {
            clearInterval(checkIsShowNotificationTimer.current)
            window.matchMedia('(display-mode: standalone)').removeEventListener('change', whenInPWA)
        }

    }, [])

    $(window).on('resize', resetSingleDataModalPosWhenResizeHandler)

    return (
        <StyledLayout isDesktop={isDesktop}>
            <div className={isScroll ? 'info-outer toggle' : 'info-outer'}>
                <div className="year"> {currentYear} 年曆</div>
            </div>
            <div className={isScroll ? 'info-outer-fixed toggle' : 'info-outer-fixed'}>
                <div className="year"> {currentYear} 年曆</div>
            </div>
            <div className="calendar">
                {$.maps(monthDays, (row, rowIndex) => 
                    <div className="month-outer" key={rowIndex}>
                        <div className='month'>
                            <div className='title'>{row.monthName}</div>
                            <div className="weekdays">
                                {$.maps(row.weekdays, (weekdaysRow, wIndex) => <div className="weekday" key={wIndex}>{weekdaysRow}</div>)}
                            </div>
                            <div className="days">{
                                $.maps(row.days, (daysRow, dIndex) => 
                                    <div 
                                        className={
                                            [
                                                daysRow.dayType.prevMonth || daysRow.dayType.nextMonth ? 'day other-month' : 'day',
                                                !(daysRow.dayType.prevMonth || daysRow.dayType.nextMonth) && daysRow.dayType.isHoliday && daysRow.dayType.dayName ? 
                                                    'holiday' : !(daysRow.dayType.prevMonth || daysRow.dayType.nextMonth) && daysRow.dayType.isHoliday ? 'normal-holiday' : '',
                                                (highlightDate === `${daysRow.month}${daysRow.day}`) && daysRow.dayType.currentMonth ? 'highlight' : '',
                                                isPWA ? 'in-pwa' : ''
                                            ].filter(cssText => cssText !== '').join(' ')
                                        } 
                                        key={dIndex}
                                        onClick={() => {
                                            if(daysRow.dayType.prevMonth || daysRow.dayType.nextMonth) return
                                            
                                            currentSelectHoliday(daysRow.month, daysRow.day, true)
                                        }}
                                    >
                                        <span>{daysRow.day}</span>
                                        {daysRow.dayType.isHaveEvent && <div className="is-have-event-circle"></div>}
                                    </div>
                                )}
                            </div>
                        </div>
                        {renderOnlyHoliday(row.days)}
                    </div>
                )}
            </div>
            <div className="footer">
                <h6>CopyRight &copy; 2024-10 Alex Chen.</h6>
            </div>
            <div className="back-fill">
                <div 
                    className={isDesktop ? 'icon d' : 'icon m'} 
                    onClick={changeYear.bind(this, 'prev')}
                >
                    <FaAngleLeft />
                </div>
                <div className="fill-box-outer">
                    <div className="fill-box"></div>
                    <div className="fill-box"></div>
                    <div className="fill-box"></div>
                    <div className="fill-box"></div>
                </div>
                <div 
                    className={isDesktop ? 'icon d' : 'icon m'} 
                    onClick={changeYear.bind(this, 'next')}
                >
                    <FaAngleRight />
                </div>
            </div>
            <div className={isLoading ? 'loading-outer toggle' : 'loading-outer'}>
                <div className="loading-text"></div>
            </div>
            {isPWA && (
                <>
                    <div 
                        className="open-event-list-btn" 
                        onClick={openEventsList}
                    >
                        <CiBoxList />
                    </div>
                    <div 
                        className={toggleEventsListStatus ? 'event-list-outer-frame toggle' : 'event-list-outer-frame'}
                        onClick={({ target }) => {
                            const element = target as HTMLDivElement
                            const elementClassList = $.createArray({ type: 'new', item: element.classList })

                            if(!elementClassList.includes('event-list-outer-frame')) return
                            
                            setInitState(prevState => ({ 
                                ...prevState, 
                                toggleEventsListStatus: false 
                            }))
                        }}
                    >
                        <div className="event-list-outer">
                            <div className="event-list">
                                {
                                    eventsListResult.length > 0 ? (
                                        $.maps(eventsListResult, (row, index) => (
                                            <div className="event-items" key={index}>
                                                <div className="title-groups">
                                                    <div className="title">{row.title}</div>
                                                    <div className="btn-groups">
                                                        <div className="is-alert icon">
                                                            {row.isEnableAlert ? <LuBellRing /> : <LuBellOff />}
                                                        </div>
                                                        <div className="edit-btn" onClick={singleEventModalContentViewAction.bind(undefined, 'else', row, true)}>
                                                            <MdEdit />
                                                        </div>
                                                        <div className="delete-event-btn" onClick={showDeleteEventsLayout.bind(undefined, row.id)}>
                                                            <FaRegTrashAlt />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">{row.desc}</div>
                                                <div className="create-date">建立日期：{row.updateTime || row.createTime}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-data">無待辦事項<br />請點擊日期後新增</div>
                                    )
                                }
                            </div>
                            <div className="events-btn-groups">
                                <div 
                                    className={eventsListResult.length > 0 ? "events-export-btn" : "events-export-btn disabled"} 
                                    onClick={exportEventsData}
                                >
                                    匯出
                                </div>
                                <div className="events-import-btn" onClick={importEventsData}>匯入</div>
                            </div>
                            <div className={toggleDeleteEventAllListLayoutStatus ? "delete-layout toggle" : "delete-layout"}>
                                <div className='info-title'>確定要刪除 {eventTitle} 待辦事項嗎 ?</div>
                                <div className="btn-groups">
                                    <div 
                                        className="confirm-btn" 
                                        onClick={confirmDeleteInfo.bind(undefined, 'confirm')}
                                    >
                                        確定
                                    </div>
                                    <div 
                                        className="back-btn" 
                                        onClick={confirmDeleteInfo.bind(undefined, 'cancel')}
                                    >
                                        取消
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        className={toggleSingleEventsModalStatus ? 'single-date-event-modal-outer toggle' : 'single-date-event-modal-outer'}
                        onClick={({ target }) => {
                            const element = target as HTMLDivElement
                            const elementClassList = $.createArray({ type: 'new', item: element.classList })

                            if(!elementClassList.includes('single-date-event-modal-outer')) return

                            setInitState(prevState => ({ 
                                ...prevState, 
                                toggleSingleEventsModalStatus: false, 
                                eventTitle: '',
                                eventContent: '',
                                isEnableAlert: false,
                                eventTime: { h: '', m: '', s: '' }
                            }))

                            singleEventModalContentViewAction('list')
                        }}
                    >
                        <div 
                            className="single-date-event-modal" 
                        >
                            <div className="top">
                                <div className="current-select-date">{currentSelectDateInAllEventList || $.formatDateTime({ formatDate: `${currentYear}/${currentSelectDate}`, formatType: 'yyyy-MM-dd' })}</div>
                                    <div
                                        className={currentSingleEventsModalView === 'else' ? 'add-btn hidden' : 'add-btn'} 
                                    >
                                    <div className="svg-outer">
                                        <IoIosAddCircleOutline 
                                            onClick={singleEventModalContentViewAction.bind(undefined, 'else', undefined, undefined)} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="bottom"
                                ref={singleDateEventModalRef}
                                onScroll={({ target }) => {

                                    if(!isAllowScrollEventModalContent) {
                                        const el = (target as HTMLDivElement)
                                        el.scrollLeft = currentScrollEventModalContentPos
                                    }
                                }}
                            >
                                <div className={currentSingleEventsModalView === 'list' ? 'left active' : 'left'}>
                                    {
                                        filterEventsListResult.length > 0 ? (
                                            <>
                                                <div className="filter-list-outer">
                                                    <div className="filter-list">
                                                        {
                                                            $.maps(filterEventsListResult, (row, index) => (
                                                                <div className="filter-items" key={index}>
                                                                    <div className="title-groups">
                                                                        <div className="title">{row.title}</div>
                                                                        <div className="btn-groups">
                                                                            <div className="is-alert icon">
                                                                                {row.isEnableAlert ? <LuBellRing /> : <LuBellOff />}
                                                                            </div>
                                                                            <div className="edit-btn" onClick={singleEventModalContentViewAction.bind(undefined, 'else', row, undefined)}>
                                                                                <MdEdit />
                                                                            </div>
                                                                            <div className="delete-event-btn" onClick={showDeleteEventsLayout.bind(undefined, row.id)}>
                                                                                <FaRegTrashAlt />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">{row.desc}</div>
                                                                    <div className="create-date">建立日期：{row.updateTime.replace(/:/g, ' : ') || row.createTime.replace(/:/g, ' : ')}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className={toggleDeleteEventLayoutStatus ? "delete-layout toggle" : "delete-layout"}>
                                                    <div className='info-title'>確定要刪除 {eventTitle} 待辦事項嗎 ?</div>
                                                    <div className="btn-groups">
                                                        <div 
                                                            className="confirm-btn" 
                                                            onClick={confirmDeleteInfo.bind(undefined, 'confirm')}
                                                        >
                                                            確定
                                                        </div>
                                                        <div 
                                                            className="back-btn" 
                                                            onClick={confirmDeleteInfo.bind(undefined, 'cancel')}
                                                        >
                                                            取消
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="no-data">
                                                <div className="info">該日無辦事項</div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div 
                                    className={currentSingleEventsModalView === 'else' ? 'right active' : 'right'} 
                                >
                                    <div className="title">
                                        <div className='title-text'>{!eventUpdateItem ? '新增待辦事項' : `修改待辦事項 - ${eventUpdateItem?.title}`}</div>
                                        <div className={checkEventCanUsingAlert() ? "switch-is-alert" : "switch-is-alert disabled"}>
                                            <span>{isEnableAlert ? '啟用提醒' : '無提醒'}</span>
                                            <SwitchBar 
                                                isSlide={checkEventCanUsingAlert() ? isEnableAlert : false} 
                                                isDisabled={!checkEventCanUsingAlert()}
                                                clickEvent={() => {

                                                    if(!checkEventCanUsingAlert()) return

                                                    setInitState(prevState => ({
                                                        ...prevState,
                                                        isEnableAlert: !prevState.isEnableAlert
                                                    }))
                                                }} 
                                            />
                                        </div>
                                    </div>
                                    <div className="input-groups">
                                        <CustomInput 
                                            label='待辦標題' 
                                            type="input"
                                            labelAlign="default"
                                            usingType="input"
                                            useStyle="white"
                                            inputStyle="default"
                                            inputVal={eventTitle} 
                                            changeEvent={singleEventModalInputChangeHandler.bind(undefined, 'eventTitle')} 
                                        />
                                        <CustomTextArea 
                                            label='待辦內容'
                                            labelAlign="default"
                                            usingType="input"
                                            useStyle="white"
                                            inputStyle="default"
                                            inputVal={eventContent} 
                                            changeEvent={singleEventModalInputChangeHandler.bind(undefined, 'eventContent')} 
                                        />
                                        <div className="time-groups">
                                            <div className="label">啟用提醒時間</div>
                                            <div className='time-inputs'>
                                                <CustomInput 
                                                    label='時' 
                                                    labelAlign="default"
                                                    usingType="list"
                                                    align="center"
                                                    useStyle="white"
                                                    size='sm'
                                                    type="text"
                                                    disabled={!isEnableAlert}
                                                    marginBottom={1}
                                                    inputStyle="default"
                                                    selectedRowTemp={eventTime.h}
                                                    inputVal=''
                                                    options={
                                                        $.createArray(
                                                            { type: 'fake', item: { random: 24 }},
                                                            num => ({
                                                                key: `${(num + 1) === 24 ? '00' : (num + 1)}`,
                                                                value: `${(num + 1) === 24 ? '00' : (num + 1)}`
                                                            })
                                                        )
                                                    }
                                                    getOptionVal={value => {

                                                        setInitState(prevState => ({
                                                            ...prevState,
                                                            eventTime: {
                                                                ...prevState.eventTime,
                                                                h: value
                                                            }
                                                        }))
                                                    }} 
                                                />
                                                <CustomInput 
                                                    label='分' 
                                                    labelAlign="default"
                                                    usingType="list"
                                                    useStyle="white"
                                                    align="center"
                                                    size='sm'
                                                    type="text"
                                                    disabled={!isEnableAlert}
                                                    marginBottom={1}
                                                    inputStyle="default"
                                                    selectedRowTemp={eventTime.m}
                                                    options={
                                                        $.createArray(
                                                            { type: 'fake', item: { random: 60 }},
                                                            num => ({
                                                                key: `${num === 0 ? '00' : num}`,
                                                                value: `${num === 0 ? '00' : num}`
                                                            })
                                                        )
                                                    }
                                                    getOptionVal={value => {
                                                        setInitState(prevState => ({
                                                            ...prevState,
                                                            eventTime: {
                                                                ...prevState.eventTime,
                                                                m: value
                                                            }
                                                        }))
                                                    }} 
                                                />
                                                <CustomInput 
                                                    label='秒' 
                                                    labelAlign="default"
                                                    usingType="list"
                                                    useStyle="white"
                                                    align="center"
                                                    size='sm'
                                                    type="text"
                                                    disabled={!isEnableAlert}
                                                    marginBottom={1}
                                                    inputStyle="default"
                                                    selectedRowTemp={eventTime.s}
                                                    options={
                                                        $.createArray(
                                                            { type: 'fake', item: { random: 60 }},
                                                            num => ({
                                                                key: `${num === 0 ? '00' : num}`,
                                                                value: `${num === 0 ? '00' : num}`
                                                            })
                                                        )
                                                    }
                                                    getOptionVal={value => {
                                                        setInitState(prevState => ({
                                                            ...prevState,
                                                            eventTime: {
                                                                ...prevState.eventTime,
                                                                s: value
                                                            }
                                                        }))
                                                    }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-groups">
                                        <div 
                                            className="confirm-btn" 
                                            onClick={confirmEvents.bind(undefined, !eventUpdateItem ? 'add' : 'update')}
                                        >
                                            確定
                                        </div>
                                        <div 
                                            className="back-btn" 
                                            onClick={singleEventModalContentViewAction.bind(undefined, 'list', undefined, undefined)}
                                        >
                                            返回
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </StyledLayout>
    )
}

export default Main