import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

let stayNumArray:string[] = []
let renderNumArray:string[] = []
const viewer = $('.display-num');

const inputItems:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    const matchMathIconRule = {
        "+": /([+])\1/,
        "-": /([-])\1/,
        "*": /([*])\1/,
        "/": /([/])\1/
    }

    // for number
    if(target.dataset.num){
        stayNumArray.append(target.dataset.num)
        renderNumArray.append(target.dataset.num)

        if(renderNumArray.range(0,2).join('') === '00'){
            renderNumArray.removeLast()
            return
        }

        viewer.texts(renderNumArray.join(''))
    }

    // for operation
    if(target.dataset.math){
        renderNumArray = []

        if(target.dataset.math !== '='){
            let continuousCounting:boolean = false

            stayNumArray.append(target.dataset.math)

            if(stayNumArray.join('').split('')[0] === '-'){
                const stayNumArrayTemp = JSON.parse(JSON.stringify(stayNumArray.join('').split('')))
                stayNumArrayTemp[0] = 'x'
                stayNumArray = stayNumArrayTemp
                renderNumArray = ['-']
            }

            const matchMathIconTest = new RegExp((matchMathIconRule as {[key:string]:any})[target.dataset.math!])

            matchMathIconTest.test(stayNumArray.join('')) && stayNumArray.removeLast()

            const filterMathIcon = $.filter(stayNumArray,(icon:string):any => icon === '+' || icon === '-' || icon === '*' || icon === '/') as string[]

            if(filterMathIcon.length >= 2 && stayNumArray[0] !== '-'){
                stayNumArray = stayNumArray.removeLast()
                continuousCounting = true
            }

            const [prevVal,nextVal] = stayNumArray.join('').split(continuousCounting ? filterMathIcon[0] : target.dataset.math)
            
            if(nextVal && continuousCounting){
                const isNegativeNumber:number = $.includes(prevVal,'x') ? -parseFloat(prevVal.replace('x','')) : parseFloat(prevVal)

                const matchIconEqual = {
                    "+": isNegativeNumber + parseFloat(nextVal),
                    "-": isNegativeNumber - parseFloat(nextVal),
                    "*": isNegativeNumber * parseFloat(nextVal),
                    "/": isNegativeNumber / parseFloat(nextVal)
                }[continuousCounting ? filterMathIcon[0] : target.dataset.math]
        
                renderNumArray = matchIconEqual!.toString().split('')

                stayNumArray = [matchIconEqual!.toString(),target.dataset.math]

                viewer.texts(renderNumArray.join(''))

                renderNumArray = []
            }
        } else {
            const filterMathIcon = $.filter(stayNumArray,(icon:string):any => icon === '+' || icon === '-' || icon === '*' || icon === '/') as string[]
            const [prevVal,nextVal] = stayNumArray.join('').split(filterMathIcon.join(''))

            if (filterMathIcon.length === 0) return

            if(stayNumArray.join('').split('')[0] === '-'){
                const stayNumArrayTemp = JSON.parse(JSON.stringify(stayNumArray.join('').split('')))
                stayNumArrayTemp[0] = 'x'
                stayNumArray = stayNumArrayTemp
            }

            const isNegativeNumber = $.includes(prevVal,'x') ? -parseFloat(prevVal.replace('x','')) : parseFloat(prevVal)

            const matchIconEqual = {
                "+": isNegativeNumber + parseFloat(nextVal),
                "-": isNegativeNumber - parseFloat(nextVal),
                "*": isNegativeNumber * parseFloat(nextVal),
                "/": isNegativeNumber / parseFloat(nextVal)
            }[filterMathIcon.join('')]
    
            renderNumArray = matchIconEqual!.toString().split('')

            stayNumArray = [matchIconEqual!.toString()]

            viewer.texts(renderNumArray.join(''))

            renderNumArray = []
        }
    }
}

const restDisplayNum:() => void = () => {
    stayNumArray = []
    renderNumArray = []
    viewer.texts('0')
}

const removeLastDisplayNum:() => void = () => {
    if(viewer.texts()!.split('').length !== 1) {
        stayNumArray = viewer.texts()!.split('')
        renderNumArray = viewer.texts()!.split('')
        stayNumArray.removeLast()
        renderNumArray.removeLast()
        viewer.texts(renderNumArray.join(''))
    } else {
        stayNumArray = []
        renderNumArray = []
        viewer.texts('0')
    }
}

const powerToggle:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    $(target).toggleClass("power-link")
    $(".display-num").toggleClass("display-num-on")

    if($.includes(target.className.split(" "),'power-link')){
        $('.ac').listener('click',restDisplayNum)
        $('.back').listener('click',removeLastDisplayNum)
        $.each($('.btns') as unknown as any[],item => $(item).listener('click',inputItems))
    } else {
        $('.ac').removeListener('click',restDisplayNum)
        $('.back').removeListener('click',removeLastDisplayNum)
        $.each($('.btns') as unknown as any[],item => $(item).removeListener('click',inputItems))
    }
}

$(document).useMounted(() => {
    $(".power").listener("click", powerToggle)
    $(($('.icon-group .icon') as unknown as any[])[2]).listener('click',() => $('.main').toggleClass('full'))
})
