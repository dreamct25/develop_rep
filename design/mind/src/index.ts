import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
import './lib/Library'
import $,{ Self } from './lib/Library'
import { qItemsType,typeItemsType,progressItemType,countItemType } from './types'

let array:string[] = []
let strTemp:string = ""
let count:number = -1
let Qitems: qItemsType[] = []
let typeItems: typeItemsType[] = []

declare global {
    interface Window {
        choose(index: number,type:string): void
        backStep():void
        nextStep():void
        countingAllTest(): void
    }
}

// 設定點擊內容所加入的文字
window.choose = (index,type) => {

    if (type === "A") {
        $(($('.text-first') as unknown as Self[])[index]).addClass('texts-trans')

        $(($(".text-second") as unknown as Self[])[index]).removeClass('texts-trans')
        strTemp = {
            [`${count >= 0 && count <= 6}`]: 'E',
            [`${count >= 7 && count <= 13}`]: 'N',
            [`${count >= 14 && count <= 20}`]: 'F',
            [`${count >= 21 && count <= 27}`]: 'J'
        }["true"]
    } else {
        $(($(".text-second") as unknown as Self[])[index]).addClass('texts-trans')
        $(($('.text-first') as unknown as Self[])[index]).removeClass('texts-trans')
        
        strTemp = {
            [`${count >= 0 && count <= 6}`]: 'I',
            [`${count >= 7 && count <= 13}`]: 'S',
            [`${count >= 14 && count <= 20}`]: 'T',
            [`${count >= 21 && count <= 27}`]: 'P'
        }["true"]
    }

    if(count === 27){
        window.nextStep()
    }
}

const modalHide:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    $(target).addClass('confirm-active')
    setTimeout(() => $(target).removeClass('confirm-active'), 540);
    setTimeout(() => $('.custom-modal-outer').removeClass('modal-toggle'), 890)
}

// 設定點擊下一題時的函式內容
window.nextStep = () => {

    if (count >= 0 && !strTemp) {
        $('.custom-modal-outer').addClass('modal-toggle')
        return
    }

    count++

    count >= 1 && array.append(strTemp)

    strTemp = ''

    if(count === 0){

        const renderQ = $.maps(Qitems,({ qNum,qT,ansA,ansB }) => {
            const titleSet = window.innerWidth <= 768 ? qT.length > 20 ? 'text-justify' : 'text-center' : 'text-center'
            const ansASet = window.innerWidth <= 768 ? ansA.length > 16 ? 'text-justify' : 'text-center' : 'text-center'
            const ansBSet = window.innerWidth <= 768 ? ansB.length > 16 ? 'text-justify' : 'text-center' : 'text-center'

            return `<div class="Q-outer justify-content-center">
                <div class="row">
                    <div class="col-md-12">
                        <div class="quest ${titleSet}">${qT}</div>
                    </div>
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <span class="texts text-first ${ansASet}" onclick="choose(${qNum},'A')">${ansA}</span>
                                <span class="texts text-second ${ansBSet}" onclick="choose(${qNum},'B')">${ansB}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}).concat(`
            <div class="Q-outer justify-content-center">
                <div class="go-counting">
                    <div class="working-count-btn" onclick="countingAllTest()">計算結果</div>
                    <div class="change-ans-btn" onclick="backStep()">改變作答</div>
                </div>
            </div>
        `).concat(`
            <div class="prev prev-hide" onclick="backStep()">
                <i class="fas fa-2x fa-chevron-left"></i>
            </div>
            <div class="next" onclick="nextStep()">
                <i class="fas fa-2x fa-chevron-right"></i>
            </div>
        `).join('')

        $('.Q-outer-frame').html(renderQ)

        $('.start-btn').removeClass('start-btn-in')
        $('.start-btn-outer-frame').addClass('start-btn-outer-frame-hide')
        $('.explain').removeClass('explain-show')

        setTimeout(() => {
            $('.Q-outer-frame').addClass('Q-outer-frame-in')
        },699)
    }

    if(count === 29){
        count = -1
        array = []
        strTemp = ''

        $('.start-btn').removeClass('start-btn-in')
        $('.start-btn-outer-frame').addClass('start-btn-outer-frame-hide')

        $('.type-text-content').removeClass('type-text-content-in')
        setTimeout(() => {
            $('.type-text-content').styles('remove',"display", "flex")
            window.nextStep()
        },699)
    }

    if(count === 27){
        $('.next').addClass('next-hide')
    }

    if(count >= 1){
        $('.prev').removeClass('prev-hide')

        if(count >= 28){
            count = 28
            $('.prev').addClass('prev-hide')
        }

        $.each($('.Q-outer') as unknown as Self[],(slide => $(slide).styles('set','transform',`translateX(-${count * 100}%)`)));
    }
}

window.countingAllTest = () => {
    $('.Q-outer-frame').removeClass('Q-outer-frame-in')
    finalSum()
}

// 設定點擊上一題的函式內容
window.backStep = () => {
    count--
    
    if(count <= 0){
        count = 0
        $('.prev').addClass('prev-hide')

        $.each($('.Q-outer') as unknown as Self[],(slide => $(slide).styles('set','transform',`translateX(-${count * 100}%)`)));

        $(($('.text-first') as unknown as Self[])[count]).removeClass('texts-trans')

        $(($(".text-second") as unknown as Self[])[count]).removeClass('texts-trans')

        return
    }

    if(count === 27){
        $('.next').addClass('next-hide')
        $('.prev').removeClass('prev-hide')

        $.each($('.Q-outer') as unknown as Self[],(slide => $(slide).styles('set','transform',`translateX(-${count * 100}%)`)));
    
        $(($('.text-first') as unknown as Self[])[count]).removeClass('texts-trans')
    
        $(($(".text-second") as unknown as Self[])[count]).removeClass('texts-trans')
    }

    if(count <= 26) {
        $('.next').removeClass('next-hide')

        $.each($('.Q-outer') as unknown as Self[],(slide => $(slide).styles('set','transform',`translateX(-${count * 100}%)`)));
    
        $(($('.text-first') as unknown as Self[])[count]).removeClass('texts-trans')
    
        $(($(".text-second") as unknown as Self[])[count]).removeClass('texts-trans')
    }

    array.removeLast()
}

// 設定統計字數函式
const finalSum:() => void = () => {
    const countAll:countItemType[] = $.maps([
        ["E","外向"],
        ["I","內向"],
        ["N","直覺"],
        ["S","感覺"],
        ["T","理性"],
        ["F","情感"],
        ["J","判斷"],
        ["P","理解"]
    ],(item:string[],num:number) => {
        const [type,typeName] = item
        return { num,type,typeName,count: 0 }
    })

    const testText = $.maps(countAll,(item:countItemType) => {
        item.count = $.filter(array,filterItem => filterItem === item.type).length;
        return item.count >= 4 && item.type
    }).filter((str) => str !== false).join('')

    typeDetails(countAll,testText)
}


const isType:(text:string) => string = text => $.maps([
    ["E","外向","I","內向"],
    ["N","直覺","S","感覺"],
    ["T","理性","F","情感"],
    ["J","判斷","P","理解"]
],(item:string[]) => {
    const [typeSortA,typeNameA,typeSortB,typeNameB] = item

    if (text === typeSortA) return `${typeSortB} ( ${typeNameB} )`

    if (text === typeSortB) return `${typeSortA} ( ${typeNameA} )`

    return false
}).filter((str:string | boolean) => str !== false).join('') as string

const transType:(array:{ percent:number,maxType:string,minType:string }[]) => string = array => $.maps(array,({ maxType,minType }:{ maxType:string,minType:string }) => `
    <div class="col-md-6">
        <div class="percent">
        ${maxType} 
            <div class="progress-outer">
                <div class="progress-bar-custom">
                    <span>0 %<span>
                </div>
            </div>
        ${minType}
        </div>
    </div>
`).join('') as string

// 設定載入解析內容前與後
const typeDetails:(countAll:countItemType[], testText:string) => void = (countAll,testText) => {
    let loadingCount = 0

    $('.type-text-content').styles("set","display", "flex")
    
    setTimeout(() => {
        setTimeout(() => {
            const loading = setInterval(() => {
                if (loadingCount >= 5) {
                    $('.loading-font').texts('計算完成')
                    clearInterval(loading)
                } else {
                    loadingCount++
                }
            }, 1000);
        }, 10)
        
        $('.type-text-content').html(`
            <div class="loading-outer">
                <div class="loading"></div>
                <span class="loading-font">計算中</span>
            </div>`
        )
    }, 1000);

    setTimeout(() => $('.loading-outer').addClass('loading-outer-out'), 8000);

    const filterArray = $.maps(testText.split(""),str => {
        const filterItem = $.filter(countAll,({ type }:{ type:string }):any => type === str) as { num:number,type:string,typeName:string,count:number }[]
        
        return filterItem.length > 0 && (
            $.maps(filterItem,({ count,type,typeName }:countItemType) => ({
                percent: Math.floor(100 / (Math.floor((7 / count) * 100) / 100)),
                maxType: `${type} ( ${typeName} )`,
                minType: isType(type)
            })).at(0) 
        ) as progressItemType
    }).filter(item => item !== false) as progressItemType[]

    const dom = $.filter(typeItems,(item:typeItemsType):any => item.originsType === testText).map((item:typeItemsType) => `
        <div class="row">
            <div class="col-md-12">
                <span class="type-title">您的類型</span>
                <span class="type-origins">${item.originsType}</span>
                <span class="type-name">${item.nameType}</span>
                <span class="type-think">( ${item.thinkType} )</span>
                <div class="percent-outer">
                    <div class="row">
                        ${transType(filterArray)}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="type-think-details-group">
                            <span class="type-think-detailsA">${item.thinkTypeA}</span>
                            <span class="type-think-detailsA">${item.thinkTypeAa}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="type-think-details-group">
                            <span class="type-think-detailsB">${item.thinkTypeB}</span>
                            <span class="type-think-detailsB">${item.thinkTypeBb}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="type-think-details-group">
                            <span class="type-think-detailsC">${item.thinkTypeC}</span>
                            <span class="type-think-detailsC">${item.thinkTypeCc}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="type-think-details-group">
                            <span class="type-think-detailsD">${item.thinkTypeD}</span>
                            <span class="type-think-detailsD">${item.thinkTypeDd}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <ul class="type-content">
                    <li>性格總體描述</li>
                    <li>${item.explainType}</li>
                    <li>適合的職業類型</li>
                    <li>${item.explainObject}</li>
                </ul>
                <ul class="type-love">
                    <li>戀愛時</li>
                    <li>角色類型 - ${item.loveType}</li>
                    <li>${item.explainLove}</li>
                </ul>
                <ul class="type-fall-love">
                    <li>失戀時</li>
                    <li>${item.explainFallLove}</li>
                </ul>
            </div>
        </div>
    `).join('') as string

    dom && setTimeout(() => {
        scrollTop()
        $(".type-text-content").addClass('type-text-content-in').html(dom)
    },9500)

    dom && setTimeout(() => {
        $.each(filterArray,({ percent }:progressItemType, index:number) => {        
            setTimeout(() => {
                let countNum = 0
    
                const counter = setInterval(() => {
                    if (countNum === percent) {
                        clearInterval(counter)
                    } else {
                        countNum++
                        
                        $(($(".progress-bar-custom") as unknown as any[])[index]).styles('set','width',`${countNum}%`);
                        
                        $(($(".progress-bar-custom span") as unknown as any[])[index]).texts(`${countNum} %`);
                    }
                }, 16)
            }, 5000)
        })
    },9700)

    dom && setTimeout(() => {
        $('.start-btn').addClass('start-btn-in')
        $('.start-btn-outer-frame').removeClass('start-btn-outer-frame-hide')
        $(".start-btn").texts('重新測驗')

        array = []
    }, 26500);
}

// 設定滾動到底部時顯示按鈕函式
const scrolls:() => void = () => {
    const { top,height } = $('.start-btn-outer').getDomPos()
    const windowTop = window.scrollY
    const windowBottom = window.innerHeight + windowTop
    const nextY = top + height / 2
    if(count === -1){
        $(".start-btn")[nextY < windowBottom ? 'addClass' : 'removeClass']('start-btn-in')
    }
}

// 設定返回頂部函式
const scrollTop:() => void = () => $('body').scrollToTop({ scrollTop:0,duration:3000 })

// 設定畫面載入時函式
const loadIn:() => Promise<void> = async () => {
    const qItemsResult = await $.fetch.get<{ data: qItemsType[] }>('https://fordb-1-f6742337.deta.app/mind/v1/questions')

    Qitems = qItemsResult.data.data

    const typeItemsResult = await $.fetch.get<{ data: typeItemsType[] }>('https://fordb-1-f6742337.deta.app/mind/v1/final_test')

    typeItems = typeItemsResult.data.data

    const titleString = 'MBTI16種性格測驗'
    let strCountF = -1
    let strCountB = 0
    let strCountTemp = ""

    $('.title').addClass('title-in')
    $(".start-btn").texts('開始')

    const strIn = setInterval(() => {
        if (strCountF === titleString.length -1 && strCountB === titleString.length) {
            clearInterval(strIn)
            strCountTemp = ""
        } else {
            strCountTemp = strCountTemp.appendText(`${titleString.slice(strCountF+=1,strCountB+=1)}`)

            $('.title').texts(strCountTemp)
        }
    }, 300)

    $(".explain").addClass('explain-show')

    window.innerWidth <= 414 && $('.type-font-group').html(`
        <ul class="listA">
            <li>
                I . 心理能力的走向<br>
                你是「外向 E」( Extrovert )？
                <br>
                還是「內向 I」( Introvert )？
            </li>
            <li>
                II . 認識外在世界的方法
                <br>
                你是「感覺 S」( Sensing )？
                <br>
                還是「直覺 N」( Intuition )？
            </li>
            <li>
                III . 倚賴甚麼方式做決定
                <br>
                你是「理性 T」( Thinking )？
                <br>
                還是「情感 F」( Feeling )？
            </li>
            <li>
                IV . 生活方式和處事態度
                <br>
                你是「判斷 J」( Judging )？
                <br>
                還是「理解 P」( Perceiving )？
            </li>
        </ul>
        <ul class="listB mt-5">
            <li>
                請輕鬆作答便可
                <br>
                測驗結果可依個人官感參考
                <br>
                也可當成玩樂性質
            </li>
            <li>
                題目總共 28 題，請依直覺判斷喔~
                <br>
                感謝您的使用
            </li>
        </ul>
    `)
}

$(document).useMounted(() => {
    loadIn()
    
    // 監聽下一題按鈕
    $(".start-btn").listener('click', () => window.nextStep())

    $('.confirm').listener('click', modalHide)
    
    // 監聽畫面滾動時
    $(window).listener('scroll', scrolls)
})