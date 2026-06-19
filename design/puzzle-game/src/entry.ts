import './reset.scss'
import './style.scss'
import $ from 'self-libraries'

const canvas = document.getElementById('puzzle') as HTMLCanvasElement
const changeImg = new Image()

let level = 2
let completed = false
let step = 0
let sec = 0
let min = 0
let timer: number | null = null
let boardPart: { x: number; y: number }[][]
let emptyPos = { x: 0, y: 0 }
let renderImgWidth = 0
let renderImgHeight = 0

const pos = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

const shuffleBoard: () => void = () => {

    const shuffTimes = 800

    completed = false

    $.createArray({ type: 'fake', item: { random: shuffTimes } }, () => {
        
        const list = []

        if (emptyPos.x > 0)
        list.push({ x: emptyPos.x - 1, y: emptyPos.y })

        if (emptyPos.x < level - 1)
        list.push({ x: emptyPos.x + 1, y: emptyPos.y })

        if (emptyPos.y > 0)
        list.push({ x: emptyPos.x, y: emptyPos.y - 1 })

        if (emptyPos.y < level - 1)
        list.push({ x: emptyPos.x, y: emptyPos.y + 1 })

        const next = list[Math.floor(Math.random() * list.length)]

        reflashImage(emptyPos, next, false)
    })
}

const setBoard: () => void = () => {
  
    if (timer) {
        clearInterval(timer)
        timer = null
    }

    step = 0
    sec = 0
    min = 0

    $('.step-count').texts('0')
    $('.time-count').texts('00：00')

    boardPart = $.createArray(
        { type: 'fake', item: { random: level } }, i =>
        $.createArray(
            { type: 'fake', item: { random: level } }, j => ({
                x: i, y: j
            })
        )
    )

    emptyPos = {
        x: level - 1,
        y: level - 1
    }

    shuffleBoard()
}

const renderBoard: () => void = () => {

    if(!canvas.getContext('2d')) return

    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)

    const cellWidth = renderImgWidth / level
    const cellHeight = renderImgHeight / level

    const drawWidth = canvas.width / level
    const drawHeight = canvas.height / level

    for (let i = 0; i < level; i++) {

        for (let j = 0; j < level; j++) {

        if (i === emptyPos.x && j === emptyPos.y && !completed) continue

        const tile = boardPart[i][j]

        canvas.getContext('2d')!.drawImage(
            changeImg,

            // source (original image)
            tile.y * cellWidth,
            tile.x * cellHeight,
            cellWidth,
            cellHeight,

            // destination (canvas)
            j * drawWidth,
            i * drawHeight,
            drawWidth,
            drawHeight
        )
        }
    }
}

const reflashImage: (a: typeof emptyPos, b: typeof emptyPos, check?: boolean) => void = (a, b, check = true) => {
  
    const tmp = boardPart[a.x][a.y]

    boardPart[a.x][a.y] = boardPart[b.x][b.y]
    boardPart[b.x][b.y] = tmp

    emptyPos = { ...b }

    if (check) {

        completed = boardPart.every((row, i) =>
            row.every((tile, j) => tile.x === i && tile.y === j)
        )
    }
}

const goBackHandler: () => Promise<void> = async () => {

    $('.main').addClass('hide-scroll')

    $('.puzzle-outer-frame').removeClass('puzzle-in')

    await $.useSleep(800)

    $('.back').addClass('back-in')

    $('#file').val('')
}

const whenClickCanvasHandler: (event: MouseEvent) => void = ({ clientY, clientX }) => {

    const { top, left } = canvas.getBoundingClientRect()

    const x = Math.floor(
        (clientY - top) / (canvas.height / level)
    )

    const y = Math.floor(
        (clientX - left) / (canvas.width / level)
    )

    if (pos(x, y, emptyPos.x, emptyPos.y) === 1) {

        step++

        $('.step-count').texts(`${step}`)

        reflashImage(emptyPos, { x, y })
        renderBoard()
    }

    if (completed) {
        
        if (timer) {

            console.log(timer)
            
            clearInterval(timer)
            timer = null
        }
        
        $('.modal').addClass('modal-toggle')
        
        return
    }

    if (timer) return

    timer = setInterval(() => {

        sec++

        if (sec >= 60) {
            sec = 0
            min++
        }

        $('.time-count').texts(
            `${String(min).padStart(2, '0')}：${String(sec).padStart(2, '0')}`
        )
        
    }, 1000)
}

const changeImgOnLoadHandler: () => Promise<void> = async () => {

    $('.back').removeClass('back-in')

    await $.useSleep(800)

    renderImgWidth = changeImg.naturalWidth
    renderImgHeight = changeImg.naturalHeight

    const canvasMaxSize = 650

    const scale = Math.min(
        canvasMaxSize / renderImgWidth,
        canvasMaxSize / renderImgHeight,
        1
    )

    canvas.width = renderImgWidth * scale
    canvas.height = renderImgHeight * scale

    $('.puzzle-outer').styles('set', '--outer-width', `${renderImgWidth * scale}px`)
    $('.puzzle-outer').styles('set', '--outer-height', `${renderImgHeight * scale}px`)

    setBoard()
    renderBoard()

    $('.puzzle-outer-frame').addClass('puzzle-in')

    await $.useSleep(800)

    $('.main').removeClass('hide-scroll')
}

const uploadImgHandler: (event: Event) => void = ({ target }) => {
  
    const fileList = (target as HTMLInputElement).files

    if(!fileList) return
    
    const [file] = fileList

    if (!file) return

    const url = URL.createObjectURL(file);

    $('.preview-img-outer img').attr('src', url)

    changeImg.src = url

    if(changeImg.onload) changeImg.onload = null

    changeImg.onload = changeImgOnLoadHandler
}

const changeGameLevelHandler: (event: Event) => void = ({ target }) => {

    const { value } = (target as HTMLSelectElement)
    
    level = parseInt(value)

    setBoard()
    renderBoard()
}

const afterGameDoneChooseHanlder: (isConfirm: boolean) => void = isConfirm => {

    if(isConfirm) {
        setBoard()
        renderBoard()
    }

    $('.modal').removeClass('modal-toggle')
}

const init: () => void = () => {

    $('.back').addClass('back-in')
    $('.main').addClass('hide-scroll')
    $('.footer').addClass('footer-in')

    $(canvas).listener('click', whenClickCanvasHandler)
    $('#file').listener('change', uploadImgHandler)
    $('.set-level').listener('change', changeGameLevelHandler)
    $('.go-back').listener('click', goBackHandler)
    $('.modal-footer .confirm').listener('click', afterGameDoneChooseHanlder.bind(undefined, true))
    $('.modal-footer .cancel').listener('click', afterGameDoneChooseHanlder.bind(undefined, false))
}

$(document).useMounted(init)

