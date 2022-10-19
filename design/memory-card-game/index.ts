import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

let hasOpenCard:boolean = false;
let cardFrt:HTMLDivElement | undefined, cardScd:HTMLDivElement | undefined;
let lock:boolean = false;
let cardTimes:number = 0;

const cardChage:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    if (lock === true) return
    if (target === cardFrt) return;

    $(target).addClass('card-turn')

    if (!hasOpenCard) {
        hasOpenCard = true
        cardFrt = target
        return
    }

    cardScd = target

    if ($(cardFrt!).attr('data-target') === $(cardScd!).attr('data-target')) {
        disableEvent()
        return
    }

    lock = true

    setTimeout(() => {
        $(cardFrt!).removeClass('card-turn')
        $(cardScd!).removeClass('card-turn')
        reset()
    }, 1000)
}

const disableEvent:() => void = () => {
    cardTimes += 1

    if ((($('.card') as unknown as HTMLDivElement[]).length / 2) === cardTimes) {
        cardTimes = 0
        initialModal(false,false)
        $('.modal').addClass('modal-toggle')
    }

    $(cardFrt!).removeListener('click', cardChage)
    $(cardScd!).removeListener('click', cardChage)
    reset()
}

const reset:() => void = () => {
    hasOpenCard = false
    lock = false
    cardFrt = undefined
    cardScd = undefined
}

const resetAll:() => void = () => {
    $.each($('.card') as unknown as any[],(card:HTMLDivElement) => {
        $(card).styles('set','order', Math.floor(Math.random() * 16).toString())
        $(card).listener('click', cardChage)
        $(card).removeClass('card-turn')
    })
}

const initialModal:(isOnload:boolean,whenClose:boolean) => void = (isOnload,whenClose) => {
    if(!whenClose){
        $('.header-text').texts({
            '':'遊戲說明',
            '遊戲說明':'您要再來一局嗎'
        }[$('.header-text').texts()!])
    
        $('.modal-content').html({
            '':'點擊卡片對應相同的卡片的圖案<br>直到將整面卡面配對正確',
            '點擊卡片對應相同的卡片的圖案直到將整面卡面配對正確':'您已將卡牌全數對應成功瞜，恭喜 !<br>雖然只是個小遊戲，還是很感謝您的遊玩 !'
        }[$('.modal-content').texts()!])
    
        $('.again').texts({
            '':'確定',
            '確定':'再來一局'
        }[$('.again').texts()!])
    
        if(!$.includes(($('.cancel').attr('class') as string).split(' '),'active') && !isOnload){
            $('.cancel').addClass('active')
            $('.cancel').texts('取消')
        }
    } else {
        $('.modal').removeClass('modal-toggle')
        resetAll()
    }
}

$(document).useMounted(() => {
    initialModal(true,false)
    $('.modal').addClass('modal-toggle')
    $('.again').listener('click', () => initialModal(false,true))
    $('.close').listener('click', () => initialModal(false,true))
    $('.cancel').listener('click',() => initialModal(false,true))
    $(window).listener('click',({ target }) => target === $('.modal') && initialModal(false,true))
})