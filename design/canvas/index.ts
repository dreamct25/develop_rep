import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

const canvas = $('.draw') as unknown as HTMLCanvasElement

// 設定預設値
let drawing = canvas.getContext('2d')! // 啟用畫布功能
let xLine = 0, // 線條位置迄始値
    yLine = 0
let drawingS = false // 畫線開關迄始値
let countDown:number = 5
let timer:number | undefined = undefined
let currentLineCap:string = 'round'

const initialSetting:() => void = () => {
    drawing.lineWidth = parseInt($('.line-change').val()!) * 0.5 // 迄始線寬
    drawing.strokeStyle = $('.color-panel').val()! // 線條迄始顏色
    drawing.globalAlpha = parseFloat((1 - (parseInt($('.opacity-change').val()!) / 100)).toFixed(2))
    $('.color-text').texts($('.color-panel').val()!) // 線條迄始顏色代碼文字顯示
    $('.color-text').styles('set','color',$('.color-panel').val()!)
    $('.line-text').texts($('.line-change').val()!) // 迄始線條數値顯示
    $('.opacity-text').texts($('.opacity-change').val()!) // 迄始線條透明値數値顯示
    $.each($('.cap-options .btn') as unknown as any[],(element:HTMLDivElement) => {
        const classItem = $.includes($(element).attr('class'),'active')
        const currentLineCap = ($(element).texts() as string).toLowerCase() as CanvasLineCap
        if(classItem){
            drawing.lineCap = currentLineCap as CanvasLineCap // 迄始線條樣式
            drawing.lineJoin = currentLineCap as CanvasLineJoin // 迄始線條轉折點樣式
        }
    })
}

// 橡皮擦功能觸發設定
const clearSwitch:() => void = () => {
    $(canvas).removeListener('mousedown', setDrawingPos)
    $(canvas).removeListener('mousemove', startDrawing)
    $(canvas).listener('mousemove', clearCanvas)
    $(canvas).listener('mouseup', configEventsWhenUseEraser)
}

const configEventsWhenUseEraser:() => void = () => {
    $(canvas).removeListener('mousemove', clearCanvas)
    $(canvas).removeListener('mouseup', configEventsWhenUseEraser)
    $(canvas).listener('mousedown', setDrawingPos)
    $(canvas).listener('mousemove', startDrawing)
    $(canvas).listener('mouseup', cancelDrawing)
}

// 橡皮擦功能細項與大小設定
const clearCanvas:({ offsetX,offsetY }:MouseEvent) => void = ({ offsetX,offsetY }) => {
    // 清除位置從該元素的位置 x、y 軸 -15，使刪除方塊位置居中
    drawing.clearRect(offsetX - 15, offsetY - 15, 30, 30);
}

const setDrawingPos:({ offsetX,offsetY }:MouseEvent) => void = ({ offsetX,offsetY }) => {
    drawingS = true;

    // ES6 賦値方式，將滑鼠點擊的該元素相對應 x、y 軸的位置値賦予到 xLine、yLine 兩個變數上
    [xLine, yLine] = [offsetX, offsetY]
    
    // $('.icon').removeClass('icon-active')
    // $('.group').removeClass('group-active')
}

const startDrawing:({ offsetX,offsetY }:MouseEvent) => void = ({ offsetX,offsetY }) => {
    if (!drawingS) return; // 如果 drawingS 變數値不等於 true 就不畫出線條，反之則畫出線條
    drawing.beginPath() // 產生線條路徑
    drawing.moveTo(xLine, yLine) // 線條迄始位置
    drawing.lineTo(offsetX, offsetY) // 線條終點位置
    drawing.stroke(); // 開始畫
    [xLine, yLine] = [offsetX, offsetY]
}

const cancelDrawing:() => void = () => drawingS = false

const setVal:({ target }:Event) => void = ({ target }) => {
    const { className,value } = (target as HTMLInputElement);

    if(className === 'color-panel'){
        drawing.strokeStyle = value
        $('.color-text').texts(value)
        $('.color-text').styles('set','color',value)
        $('.header').styles('set','opacity',value)
        $('.footer-text').styles('set','opacity',value)
    }

    if(className === 'line-change'){
        drawing.lineWidth = parseInt(value) * 0.5
        $('.line-text').texts(value)
    }

    if(className === 'opacity-change'){
        const opacitys = (1 - (parseInt(value) / 100)).toFixed(2)
        drawing.globalAlpha = parseFloat(opacitys)
        $('.opacity-text').texts(value)
        $('.header').styles('set','opacity',parseFloat(opacitys).toString())
        $('.footer-text').styles('set','opacity',parseFloat(opacitys).toString())
    }
}

$(document).useMounted(() => {
    $('.header').addClass('header-in')
    
    setTimeout(() => $(canvas).addClass('draw-in'), 1000)
    setTimeout(() => $('.footer-text').addClass('footer-text-in'), 2000)
    setTimeout(() => {
        $('.modal').addClass('modal-show')
        $('.count').texts(countDown.toString())

        timer = setInterval(() => {
            if(countDown === 0) {
                clearInterval(timer)
                $('.modal').removeClass('modal-show')
                return
            }
            countDown--
            $('.count').texts(countDown.toString())
        }, 1000)
    }, 3000)

    initialSetting()

    // 滑鼠點擊畫布時將 drawingS 改為 true，設定迄始位置
    $(canvas).listener('mousedown', setDrawingPos)

    // 滑鼠滑動時畫出現條，告知 js 要開始畫了
    $(canvas).listener('mousemove', startDrawing)

    // 滑鼠點擊鍵放開後，將 drawingS 改為 false 取消畫線
    $(canvas).listener('mouseup', cancelDrawing)

    // 變更線條粗細
    $('.line-change').listener('input', setVal)

    // 變更線條透明度
    $('.opacity-change').listener('input', setVal)

    // 變更線條顏色
    $('.color-panel').listener('change', setVal)

    // 變更線條樣式
    $.each($('.cap-options .btn') as unknown as any[],(element:HTMLDivElement,index:number) => 
        $(element).listener('click',({ target }:MouseEvent) => {
            drawing.lineCap =  ($(target as HTMLDivElement).texts() as string).toLowerCase() as CanvasLineCap
            $.each($('.cap-options .btn') as unknown as any[],(item:HTMLDivElement,itemIndex:number) => $(item)[index === itemIndex ? 'addClass' : 'removeClass']('active'))
        })
    )

    // 使用橡皮擦，與文字提示切換
    $('.eraser-text').listener('click', ({ target }:Event) => {
        const element = (target as HTMLDivElement);
        const elementStatus:boolean = $(element).texts() === 'ON'

        $(canvas)[elementStatus ? 'removeListener' : 'listener']('mousedown', clearSwitch)
        $(target!)[elementStatus ? 'removeClass' : 'addClass']('active')
        $(target!).texts(elementStatus ? 'OFF' : 'ON')
    })

    // 點擊觸發顯示設定版面
    $('.tools').listener('click',({ target }:{ target:HTMLDivElement }) => {
        $('.float-bar').toggleClass('active')
        $(target).toggleClass('active')
    })

    $('.full-panel').listener('click',({ target }:{ target:HTMLDivElement }) => {
        const classItem = $.includes(($('.draw').attr('class') as string).split(' '),'full')

        $('.draw').attr('width',classItem ? 1366 : window.innerWidth)
        $('.draw').attr('height',classItem ? 768 : window.innerHeight)
        $('.draw')[classItem ? 'removeClass' : 'addClass']('full')
        $(target)[classItem ? 'removeClass' : 'addClass']('active')
        initialSetting()
    })

    // 點擊清除整個畫布內容
    $('.clear').listener('click', () => drawing.clearRect(0, 0, canvas.width, canvas.width))
})