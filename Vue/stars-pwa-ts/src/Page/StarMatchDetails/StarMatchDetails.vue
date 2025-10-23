<template lang="pug">
    IonContentWrapper
        .layout(:class="{ show: renderResult.length > 0 }")
            .top
                .stars-title
                    .img-outer
                        img(:src="`/stars/img/stars_icon/${currentMatchIStar}.png`")
                    .text {{ starsKeyPare ? starsKeyPare[currentMatchIStar] : '' }}
                .middle-lines
                    .line
                    .line
                .stars-title
                    .img-outer
                        img(:src="`/stars/img/stars_icon/${currentMatchIIStar}.png`")
                    .text {{ starsKeyPare ? starsKeyPare[currentMatchIIStar] : '' }}
            .middle-sign
                template(v-if="renderResult.length > 0")
                    .heart-line(:ref="e => starsMatchProgressDom = e")
                    i.fas.fa-heart.fa-3x.heart(:ref="e => starsMatchProgressHeartIconDom = e")
                    i.fas.fa-walking.fa-4x.left-person(:ref="e => starsMatchProgressLeftIconDom = e")
                    i.fas.fa-walking.fa-4x.right-person(:ref="e => starsMatchProgressRightIconDom = e")
            .middle
                template(v-if="renderResult.length > 0")
                    .content(v-for="(item, index) in renderResult",:key="index")
                        .content-inside
                            span(:ref="countingDyMl.bind(this, item.matchShortDesc)") {{ item.matchShortDesc }}
                            span {{ item.matchDesc.replace(/\\n/g, '\n') }}
            .bottom
                .back-btn(@click="goPrev") 返回
        Loading(:toggleLoadingStatus="isLoading")
</template>
<style lang="scss" scoped>
    .layout {
        display: grid;
        grid-template-rows: 0fr 0fr 1fr 0fr;
        gap: 12px;
        padding-bottom: 54px;
        height: 100%;
        opacity: 0;
        transition: .5s ease;

        &.show {
            opacity: 1;
        }

        .top {
            display: grid;
            grid-template-columns: 1fr 70px 1fr;
            padding-top: 6px;

            .middle-lines {
                position: relative;
                margin-top: 12px;

                .line {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40%;
                    height: 3px;
                    background-color: white;
                    border-radius: 5px;

                    &:first-child {
                        transform: translate(-50%, -50%) rotate(45deg);
                    }

                    &:last-child {
                        transform: translate(-50%, -50%) rotate(-45deg);
                    }
                }
            }
           
            .stars-title {
                display: flex;
                align-items: center;
                position: relative;
                padding: 15px 0 6px 0;
                cursor: pointer;
                user-select: none;

                &:first-child {
                    justify-content: flex-end;
                }

                &:last-child {
                    justify-content: flex-start;
                }

                .img-outer {
                    margin-bottom: -8px;

                    img {
                        filter: invert(.7) drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7));
                        width: 35px;
                    }
                }

                .text {
                    font-weight: bold;
                    text-align: center;
                    font-size: 30px;
                    margin-left: 14px;
                }
            }
        }

        .middle-sign {
            position: relative;
            padding-top: 85px;
            margin: 0 15%;
            
            .heart-line {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                transform: translate(0, -50%);
                background-color: transparent;
                margin: 0 auto;  
            }

            .heart {
                --heart-light-count: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(255,136,194);
                text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
                opacity: var(--heart-light-count);
                z-index: 1;
                transition: .5s ease;
            }

            .left-person {
                --leftPersonX: 0;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(var(--leftPersonX),-50%);
                color: rgb(255,136,194);
                text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
                z-index: 2;
                transition: .5s ease;
            }

            .right-person {
                --rightPersonX: 0;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(var(--rightPersonX),-50%) rotateY(180deg);
                color: rgb(255,136,194);
                text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
                z-index: 2;
                transition: .5s ease;
            }
        }

        .middle {
            position: relative;
            margin-top: 10px;

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

                .content-inside {
                    padding: unset;

                    span {
                        display: block;

                        &:first-child {
                            font-weight: bold;
                            font-size: 20px;
                            margin-bottom: 8px;
                            position: relative;

                            &::after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                right: 0;
                                left: 0;
                                height: .5px;
                                background-color: rgba(255, 255, 255, .5);
                                margin: 0 6px 0 var(--dyml);
                                pointer-events: none;
                            }
                        }

                        &:last-child {
                            white-space: pre-wrap;
                            line-height: 28px;
                            text-align: justify;
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
import { defineComponent, inject, ref, Ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useIonRouter, onIonViewDidEnter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'
import { IonContentWrapper, Loading } from '@/components'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'

export default defineComponent({
    components: {
        IonContentWrapper,
        Loading
    },
    setup(){
        const { Fetch, getReducer } = inject<ProviderObjType>('NewProvider')!

        const { starsKeyPare } = getReducer(state => state.Base)
        const router = useIonRouter()
        const route = useRoute()

        const pageState: {
            starsKeyPare: reducerAssimbleType['Base']['starsKeyPare']
            isLoading: Ref<boolean>,
            renderResult: Ref<{
                matchPercent: number
                matchDesc: string
                matchShortDesc: string
            }[]>
            currentMatchIStar: Ref<string>,
            currentMatchIIStar: Ref<string>,
            starTypeIconMapping: Ref<Record<string, string>>
            starsMatchProgressDom: Ref<HTMLDivElement | null>,
            starsMatchProgressLeftIconDom: Ref<HTMLDivElement | null>,
            starsMatchProgressRightIconDom: Ref<HTMLDivElement | null>,
            starsMatchProgressHeartIconDom: Ref<HTMLDivElement | null>
        } = {
            starsKeyPare,
            isLoading: ref(false),
            renderResult: ref([]),
            currentMatchIStar: ref(''),
            currentMatchIIStar: ref(''),
            starTypeIconMapping: ref({
                '火象星座': '🔥',
                '水象星座': '💧',
                '風象星座': '🌀',
                '土象星座': '🗻'
            }),
            starsMatchProgressDom: ref(null),
            starsMatchProgressLeftIconDom: ref(null),
            starsMatchProgressRightIconDom: ref(null),
            starsMatchProgressHeartIconDom: ref(null)
        }

        const method: {
            countingDyMl(descTitleText: string, element: HTMLSpanElement): void
            init(): Promise<void>
            goPrev(): void
        } = {
            countingDyMl: (descTitleText, element) => {
                if(!element) return
                const dyMlCounting = element.offsetWidth - (descTitleText.length * 20)
                element.style.setProperty('--dyml', `${Math.abs(dyMlCounting) + 10}px`)
            },
            init: async () => {

                if(route.params?.starsI && route.params?.starsII){

                    pageState.isLoading.value = true

                    pageState.currentMatchIStar.value = route.params.starsI as string
                    pageState.currentMatchIIStar.value = route.params.starsII as string
                    
                    const resp = await Fetch.get<{ data: {
                        matchPercent: number
                        matchDesc: string
                        matchShortDesc: string
                    }[] }>(`/matches/${pageState.currentMatchIStar.value}/${pageState.currentMatchIIStar.value}`)
                    
                    if(resp.data?.data){
                        pageState.renderResult.value = resp.data.data
                    }

                    pageState.isLoading.value = false
                }
            },
            goPrev: () => {
                router.navigate('/star_match','back','pop')
            }
        }

        watch([
            pageState.starsMatchProgressDom,
            pageState.starsMatchProgressHeartIconDom
        ], ([starsMatchProgressDom, starsMatchProgressHeartIconDom]) => {
            
            if(starsMatchProgressDom && starsMatchProgressHeartIconDom) {
                const [{ matchPercent }] = pageState.renderResult.value
                const percent = matchPercent / 100
                const heartIconWidthTotal = starsMatchProgressHeartIconDom.offsetWidth / 2
                const progressDomMoveTotal = (starsMatchProgressDom.offsetWidth / 2) - heartIconWidthTotal
                const iconDomWidth = pageState.starsMatchProgressLeftIconDom.value!.offsetWidth

                const move = (progressDomMoveTotal * percent) - (iconDomWidth + (iconDomWidth / 3))

                pageState.starsMatchProgressHeartIconDom.value!.style.setProperty('--heart-light-count', `${percent}`)
                pageState.starsMatchProgressRightIconDom.value!.style.setProperty('--rightPersonX', `${-move}px`)
                pageState.starsMatchProgressLeftIconDom.value!.style.setProperty('--leftPersonX', `${move}px`)
            }
        })

        onIonViewDidEnter(() => {
            method.init()
        })

        return { ...pageState, ...method }
    }
})

</script>