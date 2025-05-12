<template lang="pug">
    IonContentWrapper
        .layout(:class="{ show: renderResult.length > 0 }")
            .top
                .stars-title
                    .img-outer
                        img(:src="`/stars/img/stars_icon/${currentSearchStar}.png`")
                    .text {{ starsKeyPare ? starsKeyPare[currentSearchStar] : '' }}
            .middle
                template(v-if="renderResult.length > 0")
                    .content(v-for="(item, index) in renderResult",:key="index")
                        .top
                            .top-content
                                div 時間區間：{{ item.starBirth }}
                                div 守護星：{{ item.starGuard }}
                                div 黃道十二宮：{{ item.starPose }}
                                div 宮位代表：{{ item.starPoseRep }}
                                div 
                                    span 宮位解釋：
                                    span {{ item.starPoseDec }}
                                div 象位：{{ item.starType }} {{ starTypeIconMapping[item.starType] }}
                        .bottom
                            div 
                                span 生活
                                span {{ item.starLife.replace(/\\n/g, '\n') }}
                            div 
                                span 交友
                                span {{ item.starFriend.replace(/\\n/g, '\n') }}
                            div 
                                span 愛情
                                span {{ item.starLove.replace(/\\n/g, '\n') }}
                            div 
                                span 婚姻
                                span {{ item.starMarry.replace(/\\n/g, '\n') }}
                            div 
                                span 建議
                                span {{ item.starAdvice.replace(/\\n/g, '\n') }}
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
           
            .stars-title {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                padding: 15px 0 6px 0;
                cursor: pointer;
                user-select: none;

                .img-outer {
                    margin-bottom: -8px;

                    img {
                        filter: invert(.7) drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7));
                        width: 50px;
                    }
                }

                .text {
                    font-weight: bold;
                    text-align: center;
                    font-size: 35px;
                    margin-left: 18px;
                }
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

                .top {
                    line-height: 30px;

                    .top-content {

                        div {

                            &:nth-child(5){
                                display: grid;
                                grid-template-columns: 80px auto;

                                span {
                                    
                                    &:last-child {
                                        text-align: justify;
                                    }
                                }

                                @media screen and (max-width: 414px) {
                                    grid-template-columns: 85px auto;

                                    span {
                                    
                                        &:first-child {
                                            white-space: nowrap;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .bottom {
                    padding: unset;
                    
                    div {
                        margin-top: 30px;

                        &:first-child {
                            margin-top: 16px;
                        }
                        
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
                                    margin: 0 6px 0 50px;
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
                starAdvice: string
                starBirth: string
                starFriend: string
                starGuard: string
                starLife: string
                starLove: string
                starMarry: string
                starPose: string
                starPoseDec: string
                starPoseRep: string
                starType: string
            }[]>
            currentSearchStar: Ref<string>,
            starTypeIconMapping: Ref<Record<string, string>>
        } = {
            starsKeyPare,
            isLoading: ref(false),
            renderResult: ref([]),
            currentSearchStar: ref(''),
            starTypeIconMapping: ref({
                '火象星座': '🔥',
                '水象星座': '💧',
                '風象星座': '🌀',
                '土象星座': '🗻'
            })
        }

        const method: {
            init(): Promise<void>
            goPrev(): void
        } = {
            init: async () => {

                if(route.params?.stars){

                    pageState.isLoading.value = true
                    
                    const resp = await Fetch.get<{ data: {
                        starAdvice: string
                        starBirth: string
                        starFriend: string
                        starGuard: string
                        starLife: string
                        starLove: string
                        starMarry: string
                        starPose: string
                        starPoseDec: string
                        starPoseRep: string
                        starType: string
                    }[] }>(`/explain/${route.params.stars}`)
                    
                    if(resp.data?.data){
                        pageState.renderResult.value = resp.data.data
                        pageState.currentSearchStar.value = route.params.stars as string
                    }

                    pageState.isLoading.value = false
                }
            },
            goPrev: () => {
                router.navigate('/star_explain','back','pop')
            }
        }

        onIonViewDidEnter(() => {
            method.init()
        })

        return { ...pageState, ...method }
    }
})

</script>