<template lang="pug">
    IonContentWrapper
        .layout(:class="{ show: startPredictFortuneTypeI || startPredictFortuneTypeII }")
            .top
                .title {{ titleMatch[currentSelectDayType] }}
            .middle
                template(v-if="startPredictFortuneTypeI")
                    .content
                        .group-i
                            .list
                                .list-row
                                    .stars-title 整體
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeI.fortune.overall.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 愛情
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeI.fortune.love.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 工作
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeI.fortune.work.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 財運
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeI.fortune.wealth.score")
                                            i.far.fa-star.star(v-else)
                        .group-ii
                            div
                                span 事宜：{{ startPredictFortuneTypeI.canDo }}
                                span 不宜：{{ startPredictFortuneTypeI.noToDo }}
                                span 幸運色：{{ startPredictFortuneTypeI.lucky.color }}
                                span 幸運數字：{{ startPredictFortuneTypeI.lucky.num }}
                                span 帶來幸運的星座：{{ startPredictFortuneTypeI.lucky.constellation }}
                        .group-iii
                            .list-row 
                                .title 整體運
                                .desc {{ startPredictFortuneTypeI.fortune.overall.scoreDesc }}
                            .list-row  
                                .title 愛情運
                                .desc {{ startPredictFortuneTypeI.fortune.love.scoreDesc }}
                            .list-row 
                                .title 工作運
                                .desc {{ startPredictFortuneTypeI.fortune.work.scoreDesc }}
                            .list-row  
                                .title 財運
                                .desc {{ startPredictFortuneTypeI.fortune.wealth.scoreDesc }}
                template(v-if="startPredictFortuneTypeII")
                    .content
                        .group-i
                            .list
                                .list-row
                                    .stars-title 整體
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeII.fortune.overall.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 愛情
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeII.fortune.love.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 工作
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeII.fortune.work.score")
                                            i.far.fa-star.star(v-else)
                                .list-row
                                    .stars-title 財運
                                    .stars-outer
                                        template(v-for="(num, index) in 5",:key="index")
                                            i.fas.fa-star.star.light(v-if="num <= startPredictFortuneTypeII.fortune.wealth.score")
                                            i.far.fa-star.star(v-else)
                        .group-ii
                            div
                                span 事宜：{{ startPredictFortuneTypeII.canDo }}
                                span 不宜：{{ startPredictFortuneTypeII.noToDo }}
                        .group-iii
                            .list-row  
                                .title 整體運
                                .desc {{ startPredictFortuneTypeII.fortune.overall.scoreDesc }}
                            .list-row  
                                .title 愛情運
                                .desc {{ startPredictFortuneTypeII.fortune.love.scoreDesc }}
                            .list-row  
                                .title 工作運
                                .desc {{ startPredictFortuneTypeII.fortune.work.scoreDesc }}
                            .list-row  
                                .title 財運
                                .desc {{ startPredictFortuneTypeII.fortune.wealth.scoreDesc }}
            .bottom
                .back-btn(@click="goPrev") 返回
        Loading(:toggleLoadingStatus="isLoading")
</template>
<style lang="scss" scoped>

    .layout {
        display: grid;
        grid-template-rows: 0fr 1fr 0fr;
        gap: 12px;
        padding-bottom: 54px;
        height: 100%;
        opacity: 0;
        transition: .5s ease;

        &.show {
            opacity: 1;
        }

        .top {

            .title {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                padding: 12px 0 0 0;
            }
        }

        .middle {
            position: relative;

            .content {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 0 6px 0 12px;
                margin-right: 6px;

                .group-i {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 12px;

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

                .group-ii {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 22px;
                    line-height: 32px;

                    span {
                        display: block;
                        font-size: 18px;
                    }
                }

                .group-iii {
                    position: relative;
                    padding-top: 12px;

                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: .5px;
                        background-color: rgba(255,255,255, .5);
                    }

                    .list-row {

                        .title {
                            font-size: 20px;
                            font-weight: bold;
                            margin: 20px 0 6px 0;
                        }

                        .desc {
                            line-height: 26px;
                        }

                        &:first-child {

                            .title {
                                margin: 0 0 6px 0;
                            }
                        }
                    }
                }
            }
        }

        .bottom {
            
            padding: 0 12px;

            .back-btn {
                background-color: rgba(30,30,30,.5);
                border-radius: 20px;
                box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5);
                padding: 12px 0;
                cursor: pointer;
                user-select: none;
                text-align: center;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent, inject, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIonRouter, onIonViewDidEnter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'
import { IonContentWrapper, Loading } from '@/components'

export default defineComponent({
    components: {
        IonContentWrapper,
        Loading
    },
    setup(){

        const { Utiles } = inject<ProviderObjType>('NewProvider')!

        const router = useIonRouter()
        const route = useRoute()

        const pageState: {
            currentSelectDayStars: Ref<string>,
            currentSelectDayType: Ref<'today' | 'nextday' | 'week' | 'month'>,
            startPredictFortuneTypeI: reducerAssimbleType['Base']['startPredictFortuneToday'],
            startPredictFortuneTypeII: Omit<reducerAssimbleType['Base']['startPredictFortuneToday'], 'lucky'>,
            isLoading: Ref<boolean>,
            titleMatch: Ref<Record<'today' | 'nextday' | 'week' | 'month', any>>
        } = {
            currentSelectDayStars: ref(''),
            currentSelectDayType: ref('today'),
            titleMatch: ref({
                today: "本日說明",
                nextday: "明日運勢",
                week: "本周運勢",
                month: "本月運勢"
            }),
            isLoading: ref(false),
            startPredictFortuneTypeI: ref(undefined),
            startPredictFortuneTypeII: ref(undefined)
        }

        const method: {
            onInit(): Promise<void>,
            goPrev(): void
        } = {
            onInit: async () => {

                if(route.params?.stars && route.params?.dayType){

                    pageState.isLoading.value = true
                    pageState.currentSelectDayStars.value = route.params.stars as string
                    pageState.currentSelectDayType.value = route.params.dayType as keyof typeof pageState.titleMatch.value
                    
                    const resp = await Utiles.fetchFortuneResult(pageState.currentSelectDayStars.value, pageState.currentSelectDayType.value)

                    if(['today','nextday'].includes(pageState.currentSelectDayType.value)){

                        pageState.startPredictFortuneTypeI.value = resp.result

                    } else {

                        pageState.startPredictFortuneTypeII.value = resp.result
                    }
                    

                    pageState.isLoading.value = false
                }
            },
            goPrev: () => router.navigate('/star_forecast','back','pop')
        }

        onIonViewDidEnter(() => {
            method.onInit()
        })

        return { ...pageState, ...method }
    }
})

</script>