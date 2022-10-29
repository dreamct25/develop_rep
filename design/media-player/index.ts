import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

const player = document.querySelector('.player')! as HTMLVideoElement
let fileTemp:File;
let start = false

// 載入媒體檔案內容
const fileChange:({ target }:{ target:HTMLInputElement }) => void = ({  target }) => {
    const file = target.files!.item(0)!
    const fileSrc = window.URL.createObjectURL(file)
    fileTemp = file

    $('.progress').styles('set','flex-basis','0%')
    $('.player-outer').removeClass('player-outer-in')
    $('.sign-icon-outer').html('')
    $(player).styles('set','width',`${window.innerWidth-90}px`)
    $('.btn').toggleClass('btn-active')
    $('.switch').html(`<i class="fas fa-play"></i>`)
    $('.switch').toggleClass('switch-toggle')
    $('.video-name').texts(`File Name：${file.name.slice(0,-4)}`)

    if(file.type.slice(0, 5) === 'video'){
        $('.video-type').texts(`File Type：${file.type.slice(6,9)=='x-m'? 'mkv':file.type.slice(6,9)}`)
        $('.sign-icon-outer').html('<i class="fas fa-play movie-icon"></i>')
        setTimeout(() => $('.movie-icon').addClass('movie-icon-show'), 3000)
    } else {
        $('.video-type').texts(`File Type：${file.type.slice(6,11)=='mpeg'? 'mp3':file.type.slice(7,11)}`)
        $('.sign-icon-outer').html(`
            <div class="circle-outer">
                <div class="circle"></div>
            </div>
            <i class="fal fa-music music-icon"></i>
        `)
        setTimeout(() => $('.music-icon').addClass('music-icon-show'), 3000)
    }

    setTimeout(() => $(player).attr('src', fileSrc), 1000)
    setTimeout(() => $('.player-outer').addClass('player-outer-in'), 2000)
    setTimeout(() => $('.btn').styles('set','display','none'), 2100)
}

// 設定媒體播放器開關
const goSwitch:() => void = () => {
    player[player.paused ? 'play' : 'pause']();

    $(player)[(player as any).webkitDisplayingFullscreen ? 'removeListener' : 'listener']('click', goSwitch)

    fileTemp.type.slice(0, 5) === 'video' && movieIcon()
}

// 設定函式 startIconChange()
const startIconChange:({ target }:{ target:HTMLVideoElement }) => void = ({ target }) => {
    $('.switch').html(`<i class="${ target.paused ? 'fas fa-play' : 'fas fa-pause'}"></i>`)
    $('.switch').toggleClass('switch-toggle')
}

// 設定函式 progressCurrent()
const progressCurrent:() => void = () => {
    const current = (player.currentTime / player.duration) * 100
    $('.progress').styles('set','flex-basis',`${current}%`)
    musicIcon()
}

// 設定函式 movieIcon()
const movieIcon:() => void = () => {
    if (player.paused) {
        $('.sign-icon-outer').html('<i class="fas fa-pause movie-icon"></i>')
        setTimeout(() => $('.movie-icon').addClass('movie-icon-show'), 1);
    } else {
        $('.sign-icon-outer').html('<i class="fas fa-play movie-icon"></i>')
        $('.movie-icon').addClass('movie-icon-show')
        setTimeout(() => $('.movie-icon').removeClass('movie-icon-show'), 1);
    }
}

// 設定函式 musicIcon()
const musicIcon:() => void = () => {
    const num = player.currentTime
    if (fileTemp.type.slice(0, 5) == 'audio') {
        if (player.paused) {
            $('.music-icon').removeClass('music-trans')
            $('.music-icon').styles('set','color','rgb(185,185,185)')
            $('.circle').styles('set','opacity','0')
            $('.circle').removeClass('circle-active')
            $('.circle-outer').removeClass('circle-outer-active')
        } else {
            $('.music-icon').addClass('music-trans')
            $('.music-icon').styles('set','color',`rgb(${num*1.2-162},${num*1.4-81},${num*1.6})`)
            $('.circle').styles('set','opacity','1')
            $('.circle').styles('set','border-top',`7px solid rgb(${num*1.5-81},${num*1.4-162},${num*1.6})`)
            $('.circle').styles('set','border-bottom',`7px solid rgb(${num*1.5-81},${num*1.4-162},${num*1.6})`)
            $('.circle').addClass('circle-active')
            $('.circle-outer').addClass('circle-outer-active')
        }
    }
}

// 設定函式 clickSkip()
const clickSkip:({ offsetX }:MouseEvent) => void = ({ offsetX }) => {
    const { width } = $('.progress-outer').getDomPos()
    const skipTime = (offsetX / width) * player.duration
    player.currentTime = skipTime
}

const converTime:(timeRange:number) => string = timeRange => {
    const addZero = (num:number) => num < 10 ? `0${num}` : `${num}`
    const remainDay = timeRange / (24 * 60 * 60 * 1000)
    const remainDayFix = Math.floor(remainDay)
    const remainHour = (remainDay - remainDayFix) * 24
    const remainHourFix = Math.floor(remainHour)
    const remainMinute = (remainHour - remainHourFix) * 60
    const remainMinuteFix = Math.floor((remainHour - remainHourFix) * 60)
    const remainSecFix = Math.floor((remainMinute-remainMinuteFix) * 60)
    return `${addZero(remainHourFix)}:${addZero(remainMinuteFix)}:${addZero(remainSecFix)}`
}

// 設定函式 enaMessage()
const enaMessage:(event:MouseEvent) => void = event => {
    const posX = event.pageX - 18
    const posY = event.pageY - 29

    $('.message').styles('set','top',`${posY}px`)
    $('.message').styles('set','display','block')

    const { width } = $('.progress-outer').getDomPos()
    const [hour,minute,seconds] = converTime(((event.offsetX / width) * player.duration) * 1000).split(':')
    const dinamicCurrentTime = hour === '00' ? `${minute} : ${seconds}` : `${hour.split('')[1]} : ${minute} : ${seconds}`

    const { useStyle,text }:{ useStyle:string,text:string } = {
        [(event.target as HTMLElement).className]:{ useStyle:'',text:'' },
        'fas fa-play':{ useStyle:`${posX-2}px`,text:'Play' },
        'fas fa-pause':{ useStyle:`${posX-10}px`,text:'Pause' },
        'jump left':{ useStyle:`${posX-20}px`,text:'Rewind 20s' },
        'jump right':{ useStyle:`${posX-10}px`,text:'Skip 20s' },
        'progress-outer':{ useStyle:`${posX-8}px`,text:dinamicCurrentTime },
        'progress':{ useStyle:`${posX-8}px`,text:dinamicCurrentTime }
    }[(event.target as HTMLElement).className]

    if(useStyle && text){
        $('.message').styles('set','left',useStyle)
        $('.message').texts(text)
    }

    if((event.target as HTMLInputElement).name){
        const [volume,playbackRate] = $('.video') as unknown as HTMLInputElement[]

        if((event.target as HTMLInputElement).name === 'volume'){
            const { value } = volume
            $('.message').styles('set','left',`${posX-3}px`)
            $('.message').texts(`${(parseFloat(value) * 100).toFixed(0)}%`)
        } else {
            const { value } = playbackRate
            const pTextS = `${value}${(parseFloat(value) === 0.5 || parseFloat(value) === 1.5 ? '0' : '')}`
            const pTextL = `${value}${(parseFloat(value) === 1 ? '.00' : '')}`
            const pTextAll = parseFloat(value) !== 1 ? pTextS : pTextL
            $('.message').styles('set','left',`${posX-7}px`)
            $('.message').texts(`${pTextAll}x`)
        }
    }
}

// 頁面載入時觸發
$(document).useMounted(target => {
    $('.top-title').addClass('top-title-in')

    setTimeout(() => $('.bottom-title').addClass('bottom-title-in'), 1000);
    setTimeout(() => $('.btn').toggleClass('btn-active'), 2000);

    // 監聽頁面空白鍵
    $(target).listener('keydown', (event:KeyboardEvent) => {
        if(event.keyCode === 32){
            event.preventDefault()
            player[player.paused == false ? 'pause' : 'play']()
            movieIcon()
        }
    })

    // 監聽媒體播放器
    $(player).listener('click', goSwitch)
    $(player).listener('play', startIconChange)
    $(player).listener('pause', startIconChange)
    $(player).listener('timeupdate', progressCurrent)

    $(player).listener('mouseenter', () => {
        $('.player-controls').addClass('player-controls-active')
        $('.topbar').addClass('topbar-active')
    })

    $(player).listener('mouseout', () => {
        $('.player-controls').removeClass('player-controls-active')
        $('.topbar').removeClass('topbar-active')
    })

    // 監聽媒體播放器控制器
    $('.player-controls').listener('mouseover', () => {
        $('.player-controls').addClass('player-controls-active')
        $('.topbar').addClass('topbar-active')
    })

    $('.player-controls').listener('mouseout', () => {
        $('.player-controls').removeClass('player-controls-active')
        $('.topbar').removeClass('topbar-active')
        $('.message').styles('remove','left')
        $('.message').styles('remove','display')
        $('.message').texts('')
    })

    // 監聽媒體播放器播放按鈕
    $('.switch').listener('click', goSwitch)
    $('.switch').listener('mouseover', enaMessage)
    $('.switch').listener('mousemove', enaMessage)

    // 監聽媒體播放器快進與倒退按鈕
    $.each($('.jump') as unknown as HTMLDivElement[],(element:HTMLDivElement) => {
        $(element).listener('click', ({ target }:{ target:HTMLDivElement }) => player.currentTime += parseInt(target.dataset.jump!))
        $(element).listener('mouseover', enaMessage)
        $(element).listener('mousemove', enaMessage)
    })

    // 監聽媒體播放器音量與加速滑動條
    $.each($('.video') as unknown as HTMLInputElement[],(element:HTMLInputElement) => {
        $(element).listener('input', ({ target }:{ target:HTMLInputElement }) => (player as {[key:string]:any})[target.name] = target.value)
        $(element).listener('mouseover', enaMessage)
        $(element).listener('mousemove', enaMessage)
    })

    $('.progress').listener('mousemove', enaMessage)

    // 監聽媒體播放器進度條
    $('.progress-outer').listener('click', clickSkip)
    $('.progress-outer').listener('mousemove', e => start && clickSkip(e))
    $('.progress-outer').listener('mousedown', () => start = true)
    $('.progress-outer').listener('mouseup', () => start = false)
    $('.progress-outer').listener('mouseover', enaMessage)
    $('.progress-outer').listener('mousemove', enaMessage)

    // 監聽瀏覽本地媒體按鈕
    $('.upfile').listener('change', fileChange)

    // 監聽全屏按鈕
    $('.screen').listener('click', () => player.requestFullscreen())

    // 監聽更換媒體檔案圖示收闔按鈕
    $('.change-icon').listener('click', ({ target }:{ target:HTMLDivElement }) => {
        $('.changebar').toggleClass('changebar-active')
        $(target).toggleClass('change-icon-active')
    })

    // 監聽更換媒體檔案按鈕
    $('.changeV').listener('click', () => {
        $('.btn').styles('set','display','block')
        $('.player-outer').removeClass('player-outer-in')
        $('.change-icon').toggleClass('change-icon-active')
        $('.changebar').toggleClass('changebar-active')
        player.pause()
        $('.switch').toggleClass('switch-toggle')
        setTimeout(() => $('.btn').toggleClass('btn-active'), 1200)
    })
})