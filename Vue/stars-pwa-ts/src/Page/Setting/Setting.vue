<template lang="pug">
    IonContentWrapper
        .layout
            .top
                .title 設定你的星座
                .picker-select(@click="() => {\
                    settingStarsSelectPrevVal = settingStarsSelectVal;\
                    toggleModalStatus = true;\
                }")
                    .stars-title
                        .img-outer(v-if="settingStarsSelectVal")
                            img(:src="`/stars/img/stars_icon/${settingStarsSelectVal}.png`")
                        .text {{ starsKeyPare ? settingStarsSelectVal ? starsKeyPare[settingStarsSelectVal] : '－－ 尚未設定 －－' : '' }}
                    .select-sign
                        i.far.fa-angle-up
                        i.far.fa-angle-down
                .setting-btn(@click="saveSetting") 確定
            .bottom
                .about-btn(@click="goAbout") 關於此 PWA
        Modal(addClass="forecast-modal",:toggleModalStatus="toggleModalStatus")
            .top
                template(v-if="repackAllStars.length > 0")
                    IonPicker
                        IonPickerColumn(
                            :ref="overrideStyle.bind(this, {\
                                templateStr: '.picker-opts { width: 100% }',\
                                deep: true\
                            })"
                            :value="settingStarsSelectVal",
                            @ionChange="starsPickerChange"
                        )
                            IonPickerColumnOption(
                                v-for="(item, index) in repackAllStars"
                                :key="index",
                                :value="item.optionVal"
                            ) {{ item.option }}
            .bottom.mutiple
                .confirm-btn(@click="toggleModalStatus = false") 確定
                .cancel-btn(@click="() => {\
                    settingStarsSelectVal = settingStarsSelectPrevVal;\
                    toggleModalStatus = false;\
                }") 取消
        Toast(:toggleToastStatus="toggleToastStatus", :toastText="toastText", :iconStatus="toastIconStatus")
</template>
<style lang="scss" scoped>
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        .top {
            width: 65%;

            .title {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 2px;
                text-align: center;
            }

            .picker-select {
                position: relative;
                padding: 4px 6px;
                border-radius: 20px;
                box-shadow: 0 0 0 .5px rgba(255,255,255,.5);
                margin: 16px 0;
                background-color: rgba(30,30,30,.5);
                cursor: pointer;
                user-select: none;

                .stars-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .img-outer {
                        width: 30px;

                        img {
                            filter: invert(.7) drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7));
                            margin-top: 6px;
                        }
                    }

                    .text {
                        text-align: center;
                        font-size: 18px;
                        padding: 7px 12px;
                    }
                }

                .select-sign {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    padding-right: 6px;
                    transform: translate(-50%,-50%);

                    i {
                        display: block;

                        &:first-child {
                            margin-bottom: -6px;
                        }
                    }
                }
            }

            .setting-btn {
                background-color: rgba(30,30,30,.5);
                border-radius: 20px;
                box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5);
                padding: 12px 0;
                cursor: pointer;
                user-select: none;
                text-align: center;
            }
        }

        .bottom {
            position: relative;
            width: 65%;
            margin-top: 12px;
            padding-top: 12px;

            .about-btn {
                background-color: rgba(30,30,30,.5);
                border-radius: 20px;
                box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5);
                padding: 12px 0;
                cursor: pointer;
                user-select: none;
                text-align: center;
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                height: .5px;
                background-color: rgba(255,255,255,.3);
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from 'vue'
import { IonPicker, IonPickerColumn, IonPickerColumnOption, onIonViewDidEnter, useIonRouter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'
import { IonContentWrapper, Modal, Toast } from '@/components'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'

export default defineComponent({
    components: {
        IonContentWrapper,
        IonPicker, 
        IonPickerColumn, 
        IonPickerColumnOption,
        Modal,
        Toast
    },
    setup(){
        
        const { getReducer, setReducer, $, Utiles: { overrideStyle } } = inject<ProviderObjType>('NewProvider')!

        const { currentSelectStar, allStars, starsKeyPare, isSettingStars } = getReducer(state => state.Base)

        const router = useIonRouter()

        const pageState:{
            settingStarsSelectVal: Ref<string>,
            settingStarsSelectPrevVal: Ref<string>
            starsKeyPare: reducerAssimbleType['Base']['starsKeyPare'],
            toggleModalStatus: Ref<boolean>,
            toggleToastStatus: Ref<boolean>,
            toastIconStatus: Ref<string>,
            toastText: Ref<string>,
            repackAllStars: Ref<{ option: string, optionVal: string }[]>
            currentSelectStar: typeof currentSelectStar
        } = {
            settingStarsSelectVal: ref(''),
            settingStarsSelectPrevVal: ref(''),
            toggleModalStatus: ref(false),
            toggleToastStatus: ref(false),
            toastText: ref(''),
            toastIconStatus: ref(''),
            currentSelectStar,
            starsKeyPare,
            repackAllStars: ref([])
        }

        const method: {
            starsPickerChange(event:CustomEvent<{ value: string }>): void,
            init(): void
            saveSetting(): Promise<void>,
            goAbout(): void
        } = {
            starsPickerChange: event => {
                pageState.settingStarsSelectVal.value = event.detail.value
            },
            init: () => {

                pageState.repackAllStars.value = $.maps(allStars.value, row => ({ option: row.starNameZh, optionVal: row.starNameEn }))

                pageState.settingStarsSelectVal.value = localStorage.getItem('stars') || ''
            },
            saveSetting: async () => {

                pageState.toggleToastStatus.value = true

                if(!pageState.settingStarsSelectVal.value) {

                    pageState.toastIconStatus.value = 'info'

                    pageState.toastText.value = '您尚未選擇預設星座'

                } else {
                    setReducer('Base/currentSelectStar', pageState.settingStarsSelectVal.value)

                    localStorage.setItem('stars', pageState.settingStarsSelectVal.value)
                   
                    pageState.toastIconStatus.value = 'success'

                    pageState.toastText.value = 
                        `已將預設星座改為：${starsKeyPare.value![pageState.settingStarsSelectVal.value]}`
                }

                await $.useSleep(2500)

                pageState.toggleToastStatus.value = false
                pageState.toastIconStatus.value = ''

                await $.useSleep(500)
            },
            goAbout: () => {
                router.push('/setting/about')
            }
        }

        watch(currentSelectStar, (cur, prev) => {
            
            if(cur !== prev || !localStorage.getItem('stars')) {
                
                if(isSettingStars.value) return

                setReducer('Base/isSettingStars', true)
            }
        })

        onIonViewDidEnter(() => method.init())
        
        return { ...pageState, ...method, overrideStyle }
    }
})

</script>