import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
import './lib/Library'
import $ from './lib/Library'
import { qItemsType,typeItemsType,progressItemType,countItemType } from './types'
import Qitems from '../public/json/qItems.json'
import typeItems from '../public/json/typeItems.json'

let array:string[] = []
let strTemp:string = ""
let count:number = -1
let switchs:boolean | null = false
let stopTimeSet:number;

// 設定點擊內容所加入的文字
const choose:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    switchs = true

    if (target.dataset.choose === "A") {
        $(".text-first").addClass('texts-trans')
        $(".text-second").removeClass('texts-trans')

        strTemp = {
            [`${count >= 0 && count <= 6}`]: 'E',
            [`${count >= 7 && count <= 13}`]: 'N',
            [`${count >= 14 && count <= 20}`]: 'F',
            [`${count >= 21 && count <= 27}`]: 'j'
        }["true"]
    } else {
        $(".text-second").addClass('texts-trans')
        $(".text-first").removeClass('texts-trans')
        
        strTemp = {
            [`${count >= 0 && count <= 6}`]: 'I',
            [`${count >= 7 && count <= 13}`]: 'S',
            [`${count >= 14 && count <= 20}`]: 'T',
            [`${count >= 21 && count <= 27}`]: 'P'
        }["true"]
    }
}

const modalHide:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    $(target).addClass('confirm-active')
    setTimeout(() => $(target).removeClass('confirm-active'), 540);
    setTimeout(() => $('.custom-modal-outer').removeClass('modal-toggle'), 890)
}

// 設定點擊下一題時的函式內容
const nextStep:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    if (!switchs && count !== -2 && count !== -1) {
        $('.custom-modal-outer').addClass('modal-toggle')
        return

    } else if (($(".Q-outer").attr('class') as string).split(' ').length >= 3) {
        $(".Q-outer").removeClass('Qadd-in').addClass('Qadd-out')

        setTimeout(() => {
            $(".text-first").removeClass('texts-trans')
            $(".text-second").removeClass('texts-trans')
        }, 900)

        stopTimeSet = setTimeout(() => {
            $(".Q-outer").removeClass('Qadd-out').addClass('Qadd-in')
        }, 1000)

    } else {
        setTimeout(() => $(".Q-outer").addClass('Qadd-in'), 1000)
        $(".Q-outer").removeClass('Qadd-out')
    }

    if (count <= 0) {
        $(target).addClass('next-trans')
        setTimeout(() => $(target).removeClass('next-trans'), 490)
    } else {
        $(target).addClass('next-trans-pos').removeClass('next-trans')
        setTimeout(() => $(target).removeClass('next-trans-pos'), 490)
    }

    if (count === -1) {
        $(target).addClass('next-trans')
        $(target).styles('set','opacity','0')

        $(".explain").removeClass('explain-show')

        $(window).removeListener('scroll', scrolls)

        scrollTop()

        setTimeout(() => {
            $(target).removeClass('next-trans')
            $(target).styles('set','opacity','1')
        }, 1000)

        setTimeout(() => $(".explain").styles("set","display", "none"), 1001);

        setTimeout(() => $(".Q-outer").styles("set","display", "block"), 1003);
    } else if (count === -2) {
        strTemp = ''

        $(target).addClass('next-move-out')

        $(".type-text-content").addClass('type-text-content-hide')
        
        $(window).listener('scroll', scrolls)
        
        scrollTop()
        
        setTimeout(() => {
            $(".explain").styles("set","display", "block")
            $(".type-text-content").styles("set","display", "")
            $(".type-text-content").texts("")
            $(target).addClass('next-small')
        }, 990);
        
        setTimeout(() => {
            $(".explain").addClass('explain-show')
            $(".type-text-content").removeClass('type-text-content-hide').removeClass('type-text-content-in')
            $(target).removeClass('next-move-out').removeClass('next-move')
        }, 1110);
        
        setTimeout(() => {
            $(target).removeClass('next-small')
            $(".next").texts('開始')
            $(target).styles('set','opacity','1')
        }, 1310);
    }

    switchs = false
    
    count++
    
    count >= 1 && array.append(strTemp)

    setTimeout(() => {
        if (count === 28) {
            count = -2

            clearTimeout(stopTimeSet)
            setTimeout(() => finalSum(), 500)

            $(target).removeClass('next-active').removeClass('btn-start')
            $(target).styles('set','opacity','0')
            $(".prev").removeClass('prev-active').removeClass('btn-start')
            $(target).addClass('next-trans-hide')
        } else if (count > -1) {
            const { qNum,qT,ansA,ansB } = Qitems[count] as qItemsType

            $(".quest").texts(qT)
            $(".text-first").texts(ansA)
            $(".text-second").texts(ansB)

            if (qNum === 0 && count === 0) {
                $(target).texts('下一題')
                $(target).addClass('btn-start')
                $(".text-first").removeClass('texts-hide')
                $(".text-second").removeClass('texts-hide')
            } else if (qNum === 1 && count === 1) {
                $(target).addClass('next-active')
                $(".prev").addClass('prev-active').addClass('btn-start')
                $(".prev").texts('上一題')
            } else if (qNum === 27 && count === 27) {
                $(target).texts('查詢結果')
            }
        }
    }, 900)
    setTimeout(() => {
        const { quest,chooseFt,chooseSd } = textLength()
        $(".quest").styles("set","text-align", quest)
        $(".text-first").styles("set","text-align", chooseFt)
        $(".text-second").styles("set","text-align", chooseSd)
    }, 910)
}

// 設定點擊上一題的函式內容
const backStep:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    count--
    if (count === 0) {
        $(".next").removeClass('next-active')
        $(".prev").removeClass('prev-active')
    } else if (count >= 0) {
        $(target).addClass('prev-trans-pos')
        setTimeout(() => $(target).removeClass('prev-trans-pos'), 490)
    }
    if (($(".Q-outer").attr('class') as string).split(' ').length >= 3) {

        $(".Q-outer").addClass('Qremove-in').removeClass('Qadd-in')

        setTimeout(() => {
            $(".text-first").removeClass('texts-trans')
            $(".text-second").removeClass('texts-trans')
        }, 900)

        setTimeout(() => {
            $(".Q-outer").removeClass('Qremove-in').addClass('Qadd-in')
        }, 1000)
    }

    array.removeLast()

    setTimeout(() => {
        const { qNum,qT,ansA,ansB } = Qitems[count] as qItemsType

        $(".quest").texts(qT)
        $(".text-first").texts(ansA)
        $(".text-second").texts(ansB)

        qNum === 27 && $(".next").texts('下一題')

    }, 900)

    setTimeout(() => {
        const { quest,chooseFt,chooseSd } = textLength()
        $(".quest").styles("set","text-align", quest)
        $(".text-first").styles("set","text-align", chooseFt)
        $(".text-second").styles("set","text-align", chooseSd)
    }, 910)
}

const textLength:() => { quest:string,chooseFt:string,chooseSd:string } = () => {
    const questText = $(".quest").texts() as string
    const textFirst = $(".text-first").texts() as string
    const textSecond = $(".text-second").texts() as string

    return window.innerWidth <= 768 ? {
        quest: questText.length > 16 ? 'justify' : 'center',
        chooseFt: textFirst.length > 17 ? 'justify' : 'center',
        chooseSd: textSecond.length > 17 ? 'justify' : 'center'
    } : {
        quest: questText.length > 27 ? 'justify' : 'center',
        chooseFt: textFirst.length > 27 ? 'justify' : 'center',
        chooseSd: textSecond.length > 27 ? 'justify' : 'center'
    }
}

// 設定統計字數函式
const finalSum:() => void = () => {
    const countAll = $.maps([
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
    }) as countItemType[]


    const testText = $.maps(countAll,(item:countItemType) => {
        item.count = $.filter(array,(filterItem:string):any => filterItem === item.type).length;
        return item.count >= 4 && item.type
    }).filter((str:string | boolean) => str !== false).join('') as string

    typeDetails(countAll,testText)
}

const isType:(text:string) => string = text => $.maps([
    ["E","外向","I","內向"],
    ["N","直覺","S","感覺"],
    ["T","理性","F","情感"],
    ["J","判斷","P","理解"]
],(item:string[]) => {
    const [a,aName,b,bName] = item
    if (text === a) {
        return `${b} ( ${bName} )`
    } else if (text === b) {
        return `${a} ( ${aName} )`
    } else {
        return false
    }
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
    
    $(".Q-outer").styles("set","display", "")
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

    const filterArray = $.maps(testText.split(""),(str:string) => {
        const filterItem = $.filter(countAll,({ type }:{ type:string }):any => type === str) as { num:number,type:string,typeName:string,count:number }[]
        
        return filterItem.length > 0 &&
            (arr => arr[0])($.maps(filterItem,(
                { count,type,typeName }:countItemType
            ) => ({
                percent: Math.floor(100 / (Math.floor((7 / count) * 100) / 100)),
                maxType: `${type} ( ${typeName} )`,
                minType: isType(type)
            })) as progressItemType[])
    }).filter((item:object | boolean) => item !== false) as progressItemType[]

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
        setTimeout(() => {
            $(".prev").removeClass('next-trans-hide')
            $(".next").addClass('next-move').removeClass('next-trans-hide')
        }, 200);
        $(".next").texts('重新測驗')

        array = []
    }, 26500);
}

// 設定滾動到底部時顯示按鈕函式
const scrolls:() => void = () => {
    const { top,height } = $('.next-outer').getDomPos()
    const windowTop = window.scrollY
    const windowBottom = window.innerHeight + windowTop
    const nextY = top + height / 2
    nextY < windowBottom ? $(".next").addClass('next-in') : $(".prev").removeClass('next-in')
}

// 設定返回頂部函式
const scrollTop:() => void = () => $('body').scrollToTop({ scrollTop:0,duration:3000 })

// 設定畫面載入時函式
const loadIn:() => void = () => {
    const titleString = 'MBTI16種性格測驗'
    let strCountF = -1
    let strCountB = 0
    let strCountTemp = ""

    $('.title').addClass('title-in')
    $(".next").texts('開始')

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

    // 監聽選項內按鈕
    $.each($(".texts") as unknown as any[],(element:HTMLDivElement) => $(element).listener('click',choose))
    
    // 監聽上一題按鈕
    $(".prev").listener('click', backStep)
    
    // 監聽下一題按鈕
    $(".next").listener('click', nextStep)

    $('.confirm').listener('click', modalHide)
    
    // 監聽畫面滾動時
    $(window).listener('scroll', scrolls)
})