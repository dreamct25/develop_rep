import './styles.scss'
import $, { Self } from './lib/Library'

let selectTemp = -1
let timer: (number | undefined) = undefined

const initalRightBarItem: (data: string[]) => void = data => {

    const filterColumnCondition = ['CET','CST6CDT','EET','EST','EST5EDT','Etc','HST','MET','MST','MST7MDT','PST8PDT','WET']
    
    const filterAreas = $.filter(
        $.maps(data, row => {
        
            if(
                filterColumnCondition.includes(row) || 
                row.includes('Etc/') || 
                row.includes('Arctic/') || 
                !row.includes('/')
            ) return undefined
            
            const [area, city] = row.split('/')

            return { area, city }
        
        }),
        row => row !== undefined
    ) as { area:string, city:string }[]

    const areaBlock = $.sum(filterAreas, ((a, b) => {

        const index = a.findIndex(row => row.area === b.area)

        if(index !== -1) {
           
            a[index].city = [...a[index].city, b.city.replace(/_/g,' ')]

            return a
        } 

        return a.concat({ area: b.area, city: [b.city.replace(/_/g,' ')] })
        
    }), [] as { area:string, city:string[] }[])

    const areaBlockDoms = $.maps(areaBlock, ({ area, city }, indexI) => 
        $.createDom({ 
            elementTag: 'div',
            className: 'select-outer',
            treeNodes: [
                $.createDom({
                    elementTag: 'div', 
                    className: 'select-area',
                    textContent: area,
                    onclick: toggleOption.bind(undefined, indexI)
                }),
                $.createDom({ 
                    elementTag: 'div',
                    className: 'select-list',
                    treeNodes: $.maps(new Set(city).toArray<string>(), (singleCity, indexII) => 
                        $.createDom({
                            elementTag: 'div',
                            className: 'options',
                            textContent: singleCity,
                            onclick: selectCity.bind(undefined, indexI, indexII, `${area}/${singleCity.replace(/\s/g, '_')}`)
                        })
                    )
                })
            ]
        })
    )

    $('.select-group').append(
        ...[
            $.createDom({
                elementTag: 'div',
                className: 'toggle-bar-btn',
                textContent: 'Country',
                onclick: toggleBar,
                treeNodes: [
                    $.createDom({
                        elementTag: 'i',
                        className:'fal fa-angle-up'
                    })
                ]
            }),
            ...areaBlockDoms
        ]
    )
}

const toggleBar: () => void = () => {

    const findClass = $('.select-group').attr('class')
    const props = !$.includes(findClass, 'active') ? 'addClass':'removeClass'

    $('.select-group')[props]('active')
    $('.toggle-bar-btn')[props]('active')

    if(props === 'removeClass'){

        selectTemp = -1

        $.each($('.select-list') as unknown as HTMLDivElement[], item => $(item)[props]('list-toggle'))

        $.each($('.options') as unknown as HTMLDivElement[], item => $(item)[props]('active'))
    }
}

const toggleOption: (inIndex: number) => void = inIndex => {

    const isTheSame = selectTemp !== inIndex
    
    if(isTheSame){
        
        selectTemp = inIndex

        $.each(
            $('.select-list') as unknown as HTMLDivElement[], 
            (item, index) => $(item)[index === inIndex ? 'addClass' : 'removeClass']('list-toggle')
        )
    
        return
    }
    
    $(
        (
            $('.select-list') as unknown as HTMLDivElement[]
        )[inIndex]
    ).removeClass('list-toggle')

    selectTemp = -1
}

const selectCity: (listIndex: number, optionIndex: number, path: string) => Promise<void> = async (listIndex, optionIndex, path) => {
    
    $.each($('.options') as unknown as HTMLDivElement[], item => $(item).removeClass('active'));
    
    (
        $(
            (
                $('.select-list') as unknown as HTMLDivElement[]
            )[listIndex]
        ).child(optionIndex) as Self
    ).addClass('active')

    $('.loading-outer').addClass('active')

    const res = await $.fetch.get<{ data: { current_utc_offset_seconds: number } }>(
        'https://proxy-service-three.vercel.app/test/clock/timezone/local', 
        {
            queryParams: {
                timeZone: path
            }
        }
    )

    if(res.data.data) {

        $('.seconds').addClass('animate')
        $('.minute').addClass('animate')
        $('.hour').addClass('animate')

        const { length, [length - 1]: city } = path.split('/')

        timeSet(res.data.data.current_utc_offset_seconds, city.replace(/_/g,' '))
    }

    await $.useSleep(1500)

    $('.seconds').removeClass('animate')
    $('.minute').removeClass('animate')
    $('.hour').removeClass('animate')

    $('.loading-outer').removeClass('active')
}

// 設定 timeSet 函式
const timeSet: (areaTime?: number, city?: string) => void = (areaTime = 8 * 60 * 60, city = 'Taipei') => {
    
    const weekendTextItems: Record<number, string> = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        0: 'Sunday'
    }

    clearInterval(timer)

    timer = setInterval(() => {

        // 格式化時間
        const [year, month, date, hour, minute, seconds] = $.formatDateTime({ 
            formatDate: new Date(),
            formatType: 'yyyy-MM-dd-HH-mm-ss',
            localCountryTime:areaTime / 60 / 60 
        }).split('-')

        const weekTextIndex = new Date(+new Date() + (areaTime * 1000)).getUTCDay()

        // 圓 360 度每分鐘 60 秒，每秒為 6 度 
        const secondsDeg = parseInt(seconds) * 6

        // 圓 360 度每分鐘 60 秒，每分鐘為 6 度 + 每分鐘 60 秒/每秒 6 度 = 12 度
        const minuteDeg = parseInt(minute) * 6 + parseInt(seconds) * 6 / 60

        // 圓 360 度每小時鐘 60 分鐘，每小時為 12 度 + 每小時 60 分鐘每分鐘 2 度 = 14 度
        const hourDeg = parseInt(hour) * 30 + parseInt(minute) * 30 / 60

        // 設定旋轉角度與軸心 icon 隨指針旋轉的每秒度數
        $('.seconds').styles('set', '--second-rotate-count', `${secondsDeg}deg`)
        $('.minute').styles('set', '--minute-rotate-count', `${minuteDeg}deg`)
        $('.hour').styles('set', '--hour-rotate-count', `${hourDeg}deg`)
        $('.point-icon').styles('set', '--second-point-rotate-count', `${secondsDeg}deg`)

        // 顯示年月日時間
        $('.time-show').texts(`${year}-${month}-${date}\n${hour}：${minute}：${seconds}`)

        $('.city-show').texts(city)

        // 顯示星期
        $('.time-show-day').texts(weekendTextItems[weekTextIndex])
        
    },1000)
}

const init: () => Promise<void> = async () => {

    // 啟用 timeSet 函式
    timeSet();

    $('.loading-outer').addClass('active')

    const res = await $.fetch.get<{ data: string[] }>('https://proxy-service-three.vercel.app/test/clock/timezone')

    if(res.data.data.length > 0) initalRightBarItem(res.data.data)

    await $.useSleep(1500)

    $('.loading-outer').removeClass('active')

    $('.title').addClass('title-in')

    await $.useSleep(1000)

    $('.clock-outer').addClass('clock-outer-in')

    await $.useSleep(1500)

    // 視窗載入時啟用載入動畫
    $('.city-show').addClass('city-show-in')
    $('.time-show-day').addClass('time-show-day-in')
    $('.time-show').addClass('time-show-in')
}

$(document).useMounted(init)