import './styles.scss'
import './lib/Library'
import $ from './lib/Library'

let hasOpenCard:boolean = false;
let cardFrt:HTMLDivElement | undefined, cardScd:HTMLDivElement | undefined;
let lock:boolean = false;
let cardTimes:number = 0;
let pageToken:string = '';
let pageUd:string = '';
let inputVal:string = '';
let rageTime:number = 0;
let rankingData:RankingDataType[] = []

interface RankingDataType {
    createTime:string
    key:string
    name:string
    time:number
}

const cardChage:({ target }:{ target:HTMLDivElement }) => void = ({ target }) => {
    // console.dir(target)
    if (lock === true) return
    if (target === cardFrt) return;

    $(target).addClass('card-turn')

    if (!hasOpenCard) {
        hasOpenCard = true
        cardFrt = target
        return
    }

    cardScd = target

    const [,matchI,] = (cardFrt?.childNodes[0].childNodes[0] as HTMLDivElement).className.split(' ')
    const [,matchII,] = (cardScd?.childNodes[0].childNodes[0] as HTMLDivElement).className.split(' ')

    if (matchI === matchII) {
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

    if(rageTime === 0){
        rageTime = +new Date()
    }

    if ((($('.card') as unknown as HTMLDivElement[]).length / 2) === cardTimes) {
        cardTimes = 0
        rageTime = +new Date() - rageTime
        initAddRankingModal(true,false)
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

const initAddRankingModal:(isOpen:boolean,isCreateRanking:boolean) => Promise<void> = async (isOpen,isCreateRanking) => {
    if(isCreateRanking){
        const res = await $.fetch.post<{ message:string }>('/card_game/v1/create_ranking',{
            headers: { 
                Authorization: pageToken,
                'Content-Type': 'application/json' 
            },
            data:{
                name: inputVal,
                time: Math.toFixedNum({ value:rageTime / 1000,toFloatPos:0 }),
                createTime: $.formatDateTime({ formatDate:new Date(),formatType: 'yyyy-MM-dd HH:mm:ss' })
            }
        })

        if(res.data.message === 'success'){
            inputVal = ''
            $('.input-box').val('')
        } else {
            console.log(res.data.message)
        }
    }

    if(isOpen){
        $('.ranking-modal').addClass('modal-toggle')
    } else {
        $('.ranking-modal').removeClass('modal-toggle')
    }

    if(!$('.modal').attr('class')!.split(' ').includes('modal-toggle') && !isOpen){
        initialModal(false,false)
        $('.modal').addClass('modal-toggle')
        rageTime = 0
    }
}

const initialModal:(isOnload:boolean,whenClose:boolean) => Promise<void> = async (isOnload,whenClose) => {
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

        await gerRankingData()
    }
}

const setInputVal:({ target }:{ target:HTMLInputElement }) => void = ({ target }) => inputVal = target.value

const gerRankingData:() => Promise<void> = async () => {
    const res = await $.fetch.get<{ data:RankingDataType[] }>('/card_game/v1/get_ranking',{
        headers: { Authorization: pageToken }
    })

    try {
        if(res.status >= 200 && res.status <= 399){
            rankingData = $.sort(res.data.data,(a,b) => +new Date(a.time) - + new Date(b.time))
            
            $('.ranking-list').html(rankingData.length > 0 ? `
                ${$.maps(rankingData,(item,index) => `
                    <div class="ranking-item ${index <= 2 ? 'with-crown' : ''}">
                        ${index <= 2 ? `<span><i class="fas fa-crown"></i></span>` : ''}
                        <span>${item.name}</span>
                        <span>${item.time} 秒</span>
                    </div>
                `).join('')}` : `
                    <div class="no-data">--- 無排名紀錄 ---</div>
                `)

        } else {
            throw new Error('fetch error')
        }
    } catch (error:any) {
        console.log(error.message ?? error)   
    }
}

$(document).useMounted(async () => {
    $.fetch.createBase({ baseUrl:'https://v4p0gs.deta.dev' })

    pageToken = await $.useSHA('SHA-256',$.createArray({ type: 'fake',item: { random: 10 }},() => (Math.random() * 100).toFixed(0))!.join(''))
    
    const pageTokenTemp = `${pageToken}&${$.useBase64('encode','/Memory_Card_Game' || window.location.pathname)}`

    const res = await $.fetch.post<{ ud:string }>('/pages/v1/on_in',{
        data: { token:pageTokenTemp }
    })

    pageUd = res.data.ud

    initialModal(true,false)

    $('.modal').addClass('modal-toggle')
    $('.again').listener('click', initialModal.bind(this,false,true))
    $('.close').listener('click', initialModal.bind(this,false,true))
    $('.ranking-confirm').listener('click', initAddRankingModal.bind(this,false,true))
    $('.ranking-cancel').listener('click', initAddRankingModal.bind(this,false,false))
    $('.cancel').listener('click',initialModal.bind(this,false,true))
    $('.input-box').listener('input',setInputVal)
    $('.switch-time-list').listener('click',({ target }) => {
        $(target).toggleClass('toggle')
        $('.ranking-list-outer-frame').toggleClass('toggle')
    })
    $(window).listener('click',({ target }) => target === $('.modal') && initialModal(false,true))
})