import './styles.scss'
import './lib/Library'
import $ from './lib/Library'
import type { timeZoneDataType } from './types'

let selectTemp:number = -1
let timer:(number | undefined) = undefined

const initalRightBarItem:(data:string[]) => void = data => {

    let areaBlock:{ area:string,city:string[] }[] = []
    const filterColumnCondition = ['CET','CST6CDT','EET','EST','EST5EDT','Etc','HST','MET','MST','MST7MDT','PST8PDT','WET']
    
    $.each(data,(item:string) => $.findIndexOfObj(areaBlock,items => items.area === item.split('/')[0]) === -1 && !$.includes(filterColumnCondition,item.split('/')[0]) && areaBlock.append({ area:item.split('/')[0],city:[] }))

    $.each(areaBlock,({ area,city }:{ area:string,city:string[] }) => $.each(data,(item:string) => area === item.split('/')[0] && city.append(item)))

    const toggleBarBtnArrow = $.createDom('i',{ className:'fal fa-angle-up' })

    const toggleBarBtn = $.createDom('div',{
        className:'toggle-bar-btn',
        textContent:'Country',
        onclick:toggleBar.bind(this)
    })

    $(toggleBarBtn).appendDom(toggleBarBtnArrow)
    $('.select-group').appendDom(toggleBarBtn)

    $.each(areaBlock,({ area,city },indexI) => {
        const seletOuter = $.createDom('div',{ className:'select-outer' })
        const selectList = $.createDom('div',{ className:'select-list' })

        const areas = $.createDom('div',{ 
            className:'select-area',
            textContent:area,
            onclick:toggleOption.bind(this,indexI)
        })
        
        $.each(city,(item,indexII) => {
            const citys = $.createDom('div',{ 
                className:'options',
                textContent:item.split('/')[item.split('/').length - 1].replace(/_/g,' '),
                onclick:selectCity.bind(this,indexI,indexII,item)
            })
            $(selectList).appendDom(citys)
        })

        $(seletOuter).appendDom(areas)
        $(seletOuter).appendDom(selectList)
        $('.select-group').appendDom(seletOuter)
    })
}

const toggleBar = () => {
    const findClass = $('.select-group').attr('class')
    const props = !$.includes(findClass,'active') ? 'addClass':'removeClass'
    $('.select-group')[props]('active')
    $('.toggle-bar-btn')[props]('active')
    if(props === 'removeClass'){
        selectTemp = -1
        $.each($('.select-list') as unknown as any[],item => $(item)[props]('list-toggle'))
        $.each($('.options') as unknown as any[],item => $(item)[props]('active'))
    }
}

const toggleOption:(inIndex:number) => void = inIndex => {
    const isTheSame = selectTemp !== inIndex
    
    if(isTheSame){
        selectTemp = inIndex
        $.each($('.select-list') as unknown as any[],(item:object,index:number) => $(item)[index === inIndex ? 'addClass' : 'removeClass']('list-toggle'))
    }else{
        $(($('.select-list') as unknown as any[])[inIndex]).removeClass('list-toggle')
        selectTemp = -1
    }
}

const selectCity:(listIndex:number,optionIndex:number,path:string) => void = (listIndex,optionIndex,path) => {
    $.each($('.options') as unknown as any[],item => $(item).removeClass('active'));
    ($(($('.select-list')  as unknown as any[])[listIndex]).child(optionIndex) as any).addClass('active')

    $.fetch!<timeZoneDataType>({
        method:'get',
        url:`https://worldtimeapi.org/api/timezone/${path}`,
        beforePost:()=> $('.loading-outer').addClass('active'),
        successFn:({ data }) => {
            console.log(data)
            timeSet(data!.raw_offset,path.split('/')[path.split('/').length - 1].replace(/_/g,' '))
        },
        excuteDone:() => setTimeout(() => $('.loading-outer').removeClass('active'),1500),
        errorFn:(err) => $.console('log',err.statusText)
    })
}

// 設定 timeSet 函式
const timeSet:(areaTime?:number,city?:string) => void = (areaTime = 8 * 60 * 60,city = 'Taipei') => {
    const weekendTextItems:{[key:string]:any} = {
        '1':'Monday',
        '2':'Tuesday',
        '3':'Wednesday',
        '4':'Thursday',
        '5':'Friday',
        '6':'Saturday',
        '0':'Sunday'
    }

    clearInterval(timer)

    timer = setInterval(() => {
        // 設定時間物件
        const [year,month,date,hour,minute,seconds] = ($.formatDateTime({ formatDate:new Date(),formatType:'yyyy-MM-dd-HH-mm-ss',localCountryTime:areaTime / 60 / 60 }) as string).split('-')

        // 圓 360 度每分鐘 60 秒，每秒為 6 度 
        const secondsDeg = parseInt(seconds) * 6

        // 圓 360 度每分鐘 60 秒，每分鐘為 6 度 + 每分鐘 60 秒/每秒 6 度 = 12 度
        const minuteDeg = parseInt(minute) * 6 + parseInt(seconds) * 6 / 60

        // 圓 360 度每小時鐘 60 分鐘，每小時為 12 度 + 每小時 60 分鐘每分鐘 2 度 = 14 度
        const hourDeg = parseInt(hour) * 30 + parseInt(minute) * 30 / 60

        // 設定旋轉角度與軸心 icon 隨指針旋轉的每秒度數
        $('.seconds').styles('set','transform',`rotate(${secondsDeg}deg)`)
        $('.minute').styles('set','transform',`rotate(${minuteDeg}deg)`)
        $('.hour').styles('set','transform',`rotate(${hourDeg}deg)`)
        $('.point-icon').styles('set','transform',`rotate(${secondsDeg}deg)`)

        // 顯示年月日時間
        $('.time-show').html(`${year}－${month}－${date}<br>${hour}：${minute}：${seconds}`)

        $('.city-show').texts(city)

        // 顯示星期
        $('.time-show-day').texts(weekendTextItems[new Date(+new Date() + (areaTime * 1000)).getUTCDay()])
        
    },1000)
}

// 視窗載入時啟用載入動畫
$(document).useMounted(() => {
    $.fetch!<string[]>({
        method:'get',
        url:'https://worldtimeapi.org/api/timezone',
        beforePost:()=> $('.loading-outer').addClass('active'),
        successFn:({ data }) => initalRightBarItem(data!),
        excuteDone:() => setTimeout(() => $('.loading-outer').removeClass('active'),1500),
        errorFn:(err:any) => $.console('log',err.statusText)
    })

    $('.title').addClass('title-in')
    setTimeout(() => $('.clock-outer').addClass('clock-outer-in'), 1000);
    setTimeout(() => {
        $('.city-show').addClass('city-show-in')
        $('.time-show-day').addClass('time-show-day-in')
        $('.time-show').addClass('time-show-in')
    }, 1500);

    // 啟用 timeSet 函式
    timeSet();
})