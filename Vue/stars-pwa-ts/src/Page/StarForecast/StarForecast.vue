<template lang="pug">
    IonContentWrapper
        .layout(:class="{ toggle: startPredictFortuneToday }")
            .top
                .block-1(@click="() => {\
                    currentSelectPrevStar = currentSelectStar;\
                    toggleModalStatus = true;\
                }")
                    .img-outer
                        img(:src="`/stars/img/stars_icon/${currentSelectStar}.png`")
                    .stars-title {{ starsKeyPare ? starsKeyPare[currentSelectStar] : '' }}
                    .select-sign
                        i.far.fa-angle-up
                        i.far.fa-angle-down
                .block-2(v-if="startPredictFortuneToday")
                    .title 本日運勢
                    .group
                        .list
                            .list-row
                                .stars-title 整體運勢
                                .stars-outer
                                    template(v-for="(num, index) in 5",:key="index")
                                        i.fas.fa-star.star.light(v-if="num <= startPredictFortuneToday.fortune.overall.score")
                                        i.far.fa-star.star(v-else)
                            .list-row
                                .stars-title 愛情運勢
                                .stars-outer
                                    template(v-for="(num, index) in 5",:key="index")
                                        i.fas.fa-star.star.light(v-if="num <= startPredictFortuneToday.fortune.love.score")
                                        i.far.fa-star.star(v-else)
                            .list-row
                                .stars-title 工作運勢
                                .stars-outer
                                    template(v-for="(num, index) in 5",:key="index")
                                        i.fas.fa-star.star.light(v-if="num <= startPredictFortuneToday.fortune.work.score")
                                        i.far.fa-star.star(v-else)
                            .list-row
                                .stars-title 財運運勢
                                .stars-outer
                                    template(v-for="(num, index) in 5",:key="index")
                                        i.fas.fa-star.star.light(v-if="num <= startPredictFortuneToday.fortune.wealth.score")
                                        i.far.fa-star.star(v-else)
            .bottom(v-if="startPredictFortuneToday")
                .box(@click="goDetails('today')") 
                    div 詳細本日說明 ({{ fortuneDates.today }})
                    div 
                        i.fas.fa-angle-right
                .box(@click="goDetails('nextday')") 
                    div 明日運勢 ({{ fortuneDates.tomorrow }})
                    div 
                        i.fas.fa-angle-right
                .box(@click="goDetails('week')") 
                    div 本周運勢 ({{ fortuneDates.week }})
                    div 
                        i.fas.fa-angle-right
                .box(@click="goDetails('month')") 
                    div 本月運勢 ({{ fortuneDates.month }})
                    div 
                        i.fas.fa-angle-right
        Loading(:toggleLoadingStatus="isLoading")
        Modal(addClass="forecast-modal",:toggleModalStatus="toggleModalStatus")
            .top
                template(v-if="repackAllStars.length > 0")
                    IonPicker
                        IonPickerColumn(
                            :ref="overrideStyle.bind(this, {\
                                templateStr: '.picker-opts { width: 100% }',\
                                deep: true\
                            })"
                            :value="currentSelectStar",
                            @ionChange="starsPickerChange"
                        )
                            IonPickerColumnOption(
                                v-for="(item, index) in repackAllStars"
                                :key="index",
                                :value="item.optionVal"
                            ) {{ item.option }}
            .bottom.mutiple
                .confirm-btn(@click="closeModal(true)") 確定
                .cancel-btn(@click="closeModal(false)") 取消
</template>
<style lang="scss" scoped>

    .layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        opacity: 0;
        transition: .5s ease;

        &.toggle {
            opacity: 1;
        }

        .top {
            padding: 24px 12px 0 12px;

            .block-1 {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                padding-bottom: 34px;
                cursor: pointer;
                user-select: none;

                .img-outer {
                    margin-bottom: -8px;

                    img {
                        filter: invert(.7) drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7));
                        width: 50px;
                    }
                }

                .stars-title {
                    font-weight: bold;
                    text-align: center;
                    font-size: 35px;
                    margin-left: 18px;
                }

                .select-sign {
                    display: flex;
                    flex-direction: column;
                    margin-left: 8px;
                    padding-top: 6px;

                    i {
                        &:first-child {
                            margin-bottom: -6px;
                        }
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: .5px;
                    background-color: rgba(255,255,255,.7);
                }
            }
            
            .block-2 {
                padding: 16px 0;

                .title {
                    text-align: center;
                    font-size: 22px;
                    margin-bottom: 12px;
                }

                .group {
                    display: flex;
                    justify-content: center;

                    .list {

                        line-height: 34px;

                        .list-row {
                            display: flex;

                            .stars-title {
                                font-size: 18px;
                                margin-right: 6px;
                            }

                            .stars-outer {

                                .star {
                                    margin-left: 6px;
                                    color: transparent;
                                    text-shadow: 0 0 .5px rgba(255,255,255,.5);
                                    
                                    &.light {
                                        color: rgb(255,255,51);
                                        filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.7));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .bottom {
            display: grid;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            gap: 12px;
            padding: 12px;

            .box {
                height: 50px;
                background-color: rgba(30,30,30,.5);
                border-radius: 20px;
                box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5);
                display: grid;
                grid-template-columns: 1fr 0fr;
                align-items: center;
                cursor: pointer;
                user-select: none;
                position: relative;
                overflow: hidden;

                div {

                    &:first-child {
                        text-align: center;
                    }

                    &:last-child {
                        position: absolute;
                        top: 50%;
                        right: 0;
                        margin-right: 14px;
                        transform: translateY(-50%);

                        i {
                            font-size: 26px;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .forecast-modal {
        display: grid;
        grid-template-rows: 1fr 0fr;
        background-color: rgba(0,0,0,1) !important;

        .top {

            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(0,0,0,.7);
        }

        .bottom {
            padding: 12px;
            background-color: rgba(0,0,0,.7);

            &.mutiple {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            
            .confirm-btn,
            .cancel-btn {
                text-align: center;
                padding: 12px 0;
                box-shadow: 0 0 0 1px rgba(255,255,255,.3);
                border-radius: 20px;
                cursor: pointer;
                user-select: none;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent, inject, ref, Ref, onMounted } from 'vue'
import { 
    onIonViewDidEnter, 
    onIonViewWillLeave, 
    useIonRouter, 
    IonPicker, 
    IonPickerColumn, 
    IonPickerColumnOption
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import { ProviderObjType } from '@/App.vue'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'
import { IonContentWrapper, Loading, Modal } from '@/components'

export default defineComponent({
    components: {
        IonContentWrapper,
        IonPicker,
        IonPickerColumn,
        IonPickerColumnOption,
        Loading,
        Modal
    },
    setup(){

        const { getReducer, setReducer, $, Utiles } = inject<ProviderObjType>('NewProvider')!

        const { 
            currentSelectStar, 
            startPredictFortuneToday, 
            allStars, 
            isSettingStars,
            starsKeyPare
        } = getReducer(state => state.Base)

        const router = useIonRouter()
        const route = useRoute()

        const pageState: {
            imgStarName: Ref<string>,
            starsKeyPare: reducerAssimbleType['Base']['starsKeyPare']
            startPredictFortuneToday: reducerAssimbleType['Base']['startPredictFortuneToday']
            currentSelectStar: reducerAssimbleType['Base']['currentSelectStar']
            currentSelectPrevStar: Ref<string>,
            fortuneDates: Ref<{ today: string, tomorrow: string, week: string, month: string }>,
            toggleModalStatus: Ref<boolean>
            isLoading: Ref<boolean>,
            repackAllStars: Ref<{ option: string, optionVal: string }[]>
        } = {
            imgStarName: ref(''),
            starsKeyPare,
            startPredictFortuneToday,
            currentSelectStar,
            currentSelectPrevStar: ref(''),
            fortuneDates: ref({
                today: '',
                tomorrow: '',
                week: '',
                month: ''
            }),
            toggleModalStatus: ref(false),
            isLoading: ref(false),
            repackAllStars: ref([])
        }

        const method: {
            onInit(): Promise<void>,
            fetchResult(dynamicGetting: boolean): Promise<void>,
            closeModal(status: boolean): Promise<void>
            goDetails(type: 'today' | 'nextday' | 'week' | 'month'): void
            starsPickerChange(event:CustomEvent<{ value: string }>):void
        } = {
            onInit: async () => {

                pageState.repackAllStars.value = $.maps(allStars.value, row => ({ option: row.starNameZh, optionVal: row.starNameEn }))

                const currentDate = new Date()

                const [todayMonth, todayDate] = $.formatDateTime({ formatDate: currentDate, formatType: 'MM-dd' }).split('-')
                const addOneDate = currentDate.calculateFullDateTime(undefined, undefined, 1)!
                const [tomorrowMonth, tomorrowDate] = $.formatDateTime({ formatDate: addOneDate, formatType: 'MM-dd' }).split('-')
                const getWeekFirstDate = new Date(currentDate)

                getWeekFirstDate.setDate(currentDate.getDate() - currentDate.getDay())

                const getWeekLastDate = new Date(getWeekFirstDate)

                getWeekLastDate.setDate(getWeekFirstDate.getDate() + 6)

                const [weekFirstMonth, weekFirstDate] = $.formatDateTime({ formatDate: getWeekFirstDate, formatType: 'MM-dd' }).split('-')
                const [weekLastMonth, weekLastDate] = $.formatDateTime({ formatDate: getWeekLastDate, formatType: 'MM-dd' }).split('-')

                pageState.fortuneDates.value = {
                    today: `${parseInt(todayMonth)} 月 ${parseInt(todayDate)}`,
                    tomorrow: `${parseInt(tomorrowMonth)} 月 ${parseInt(tomorrowDate)}`,
                    week: `${parseInt(weekFirstMonth)} 月 ${parseInt(weekFirstDate)} ~ ${parseInt(weekLastMonth)} 月 ${parseInt(weekLastDate)}`,
                    month: `${parseInt(todayMonth)} 月`
                }

                await method.fetchResult(isSettingStars.value)
            },
            fetchResult: async dynamicGetting => {

                pageState.isLoading.value = true

                if(currentSelectStar.value){

                    if(!startPredictFortuneToday.value || dynamicGetting){

                        const resp = await Utiles.fetchFortuneResult(currentSelectStar.value, 'today')

                        setReducer('Base/startPredictFortuneToday', resp.result)

                        if(isSettingStars.value) setReducer('Base/isSettingStars', false)
                    }
                }

                pageState.isLoading.value = false
            },
            closeModal: async status => {

                if(status){
                    await method.fetchResult(true)
                } else {
                    setReducer('Base/currentSelectStar', pageState.currentSelectPrevStar.value)
                }

                pageState.toggleModalStatus.value = false
            },
            goDetails: type => {
                router.push(`/star_forecast/details/${currentSelectStar.value}/${type}`)
            },
            starsPickerChange: event => {
                setReducer('Base/currentSelectStar', event.detail.value)
            }
        }

        onMounted(() => {
            const tempStars = localStorage.getItem('stars')

            setReducer('Base/currentSelectStar', tempStars || 'aries')
        })

        onIonViewDidEnter(() => method.onInit())

        onIonViewWillLeave(() => {

            if(route.path.match('/star_forecast/details')) return

            const tempStars = localStorage.getItem('stars')

            setReducer('Base/currentSelectStar', tempStars || 'aries')
        })

        
        return { ...pageState, ...method, overrideStyle: Utiles.overrideStyle  }
    }
})

</script>