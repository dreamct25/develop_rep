<template lang="pug">
.page-outer
    .frame(v-if="urlTemp")
        Player(ref="playerComponent",:videoUrl="urlTemp",:fromCollect="false",@getShowVideoInfoSwitch="getShowVideoInfoSwitch")
        .video-details-outer(:class="{ active:showVideoInfoSwitch }")
            .close-btn(v-if="rwdState",@click="getShowVideoInfoSwitch(false)")
                .line
                .line
            .video-details(v-for="(item,index) in videoDetails",:key="index")
                span {{ item.videoTitle }}
                span {{ formatLanguage('pages.video.views') }}：{{ formatLanguage(`pages.video.${item.videoViewsTimes.split('_').length > 2 ? 'viewTimesM' : 'viewTimes'}`,{ val:item.videoViewsTimes.replace(/_/g,'') }) }}
                span {{ formatLanguage('pages.video.channel') }}：{{ item.videoChannelTitle }}
                .cross-line
                span(v-html="item.videoDesc")
    AlertModal(:toggleModalStatus="toggleModalStatus",:withControll="false")
        template(v-slot:alert-modal-body-content)
            icon(icon="fa-solid fa-circle-xmark",class="fa-xl",color="#ff3333")
            |&nbsp; {{ formatLanguage('pages.video.operationError') }}
</template>
<style lang="scss" scoped>
    .page-outer {
        padding: 15px;

        .video-details-outer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 400px;
            z-index: 2;
            transform: translateX(410px);
            transition: .5s ease;

            .close-btn {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.7);
                background-color: red;
                width: 30px;
                height: 30px;
                border-radius: 50%;

                .line {
                    width: 60%;
                    height: 4px;
                    border-radius: 20px;
                    background-color: white;

                    &:nth-of-type(1){
                        transform: translateY(2.5px) rotate(45deg);
                    }

                    &:nth-of-type(2){
                        transform: translateY(-1.5px) rotate(-45deg);
                    }
                }
            }

            .video-details {
                margin: 10px;
                padding: 10px 0;
                line-height: 33px;
                height: 98%;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 20px;
                box-shadow:inset 0 0 5px 1px rgba(255, 255, 255, 0.7);
                overflow: hidden;

                .cross-line {
                    height: 2px;
                    background-color: rgb(255, 255, 255);
                    margin: 7px 15px 0 15px;
                    position: relative;

                    &::before {
                        content: '';
                        position: absolute;
                        top: -4px;
                        left: 0;
                        width: 10px;
                        height: 10px;
                        background-color: rgb(255, 255, 255);
                        transform: rotate(45deg);
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        top: -4px;
                        right: 0;
                        width: 10px;
                        height: 10px;
                        background-color: rgba(255, 255, 255);
                        transform: rotate(45deg);
                    }
                }

                span {
                    display: block;
                    padding: 0 15px;

                    &:nth-of-type(1) {
                        width: 100%;
                        font-size: 22px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    &:nth-of-type(2) {
                        font-size: 20px;
                        margin: 10px auto;
                    }

                    &:nth-of-type(3) {
                        font-size: 18px;
                    }

                    &:nth-of-type(4) {
                        overflow: hidden;
                        overflow-y: scroll;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 24;
                        -webkit-box-orient: vertical;
                        margin-top: 5px;
                        padding: 0 15px 8px 15px;
                        height: 85%;

                        &::-webkit-scrollbar {
                            width: 5px;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.7);
                        }
                    }
                }
            }

            @media screen and (max-width: 414px) {
                left: 0;
                width: 100%;
                transform: translateY(100%);
            }

            &.active{
                transform: translateX(0);

                @media screen and (max-width: 414px) {
                    transform: translateY(0);
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,inject } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { Modal as AlertModal,Player } from '../../component'
import { ProviderType } from '../../App.vue'
import { youtubeSingleDataTempType } from '../Home'
import { stateType } from './types'

export default defineComponent({
    components:{
        AlertModal,
        Player
    },
    setup(){
        const { formatLanguage } = inject<ProviderType>('NewProvider')
        const { params } = useRoute()
        const router = useRouter()

        const state:stateType = {
            urlTemp: ref(""),
            videoDetails: ref([]),
            toggleModalStatus: ref(false),
            showVideoInfoSwitch: ref(false),
            rwdState:ref(false),
            playerComponent: ref(undefined)
        }

        const getShowVideoInfoSwitch:(status:boolean) => void = status => {
            state.showVideoInfoSwitch.value = status
            state.playerComponent.value.showVideoInfoSwitch = status
        }
        

        onMounted(() => {
            state.rwdState.value = window.innerWidth <= 414

            if('postUrl' in params){
                state.urlTemp.value = params.postUrl as string
                state.videoDetails.value = JSON.parse(params.videoItem as string) as youtubeSingleDataTempType[]
            } else {
                state.toggleModalStatus.value = true
                setTimeout(() => state.toggleModalStatus.value = false,2001)
                setTimeout(() => router.push({ name:'home' }),2500)
            }            
        })

        return { ...state,getShowVideoInfoSwitch,formatLanguage }
    }
})

</script>