import { useEffect, useState, useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import $ from '@/lib/Library'
import { StyledLayout, InitStateType } from '.'

const Main: FC = ():TSX => {

    const[{
        monthDays,
        holidays,
        currentYear,
        isScroll,
        currentSelectDate,
        highlightDate
    }, setInitState] = useState<InitStateType>({
        monthDays: [],
        holidays: [],
        currentYear: new Date().getFullYear(),
        isScroll: false,
        currentSelectDate: '',
        highlightDate: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isScrollRef = useRef<boolean>(false)

    const scrollSnapDebounceTimer = useRef<any>(undefined)

    const debounceTimer = useRef<any>(undefined)

    const isScrollEventHandle = useRef<boolean>(false)

    const isDesktop = !navigator.userAgent.toLocaleLowerCase().includes('mobile') || !navigator.userAgent.toLocaleLowerCase().includes('iphone')

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
                monthName,
                weekdays,
                days: [...prev,...cur,...next]
            }
        });

        try {

            setIsLoading(true)

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

        setIsLoading(false)
    }

    const currentSelectHoliday: (month: number, day: number) => void = (month, day) => {

        const [filterItem] = $.filter(holidays, filterRow => filterRow.month === month && filterRow.day === day)

        setInitState(prevState => {

            const currentSelectDateTemp = filterItem ? `${addZero(filterItem.month)}/${addZero(filterItem.day)}` : ''
            const highlightDateTemp = filterItem ? `${addZero(filterItem.month)}/${addZero(filterItem.day)}` : ''

            if(prevState.currentSelectDate === currentSelectDateTemp || prevState.highlightDate === highlightDateTemp) return prevState
            
            return {
                ...prevState,
                currentSelectDate: filterItem ? `${addZero(filterItem.month)}/${addZero(filterItem.day)}` : '',
                highlightDate: filterItem ? `${filterItem.month}${filterItem.day}` : ''
            }
        })
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
                        onScroll={e => {

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

                                            currentSelectHoliday(parseInt(month), parseInt(date))

                                            clearTimeout(debounceTimer.current)

                                            debounceTimer.current = setTimeout(() => {
                                                isScrollEventHandle.current = false
                                            }, 200)
                                        }
                                    }
                                }
                        }}
                        ref={element => {

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
                        }}
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

    useEffect(() => {
        generateCalendar(currentYear)
        document.title = `${currentYear} 年曆`
    }, [currentYear])

    useEffect(() => {
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
    }, [])

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
                                                (highlightDate === `${daysRow.month}${daysRow.day}`) && daysRow.dayType.currentMonth ? 'highlight' : ''
                                            ].filter(cssText => cssText !== '').join(' ')
                                        } 
                                        key={dIndex}
                                        onClick={currentSelectHoliday.bind(this, daysRow.month, daysRow.day)}
                                    >{daysRow.day}</div>
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
        </StyledLayout>
    )
}

export default Main