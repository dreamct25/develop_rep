<template lang="pug">
    IonContentWrapper
        .layout
            .title 星座配對
            .picker-outer
                .picker-select(@click="() => {\
                    matchStarsSelectIPrevVal = matchStarsSelectIVal;\
                    toggleModalIStatus = true;\
                }")
                    .stars-title
                        .img-outer
                            img(:src="`/stars/img/stars_icon/${matchStarsSelectIVal}.png`")
                        .text {{ starsKeyPare ? starsKeyPare[matchStarsSelectIVal] : '' }}
                    .select-sign
                        i.far.fa-angle-up
                        i.far.fa-angle-down
                .middle-lines
                    .line
                    .line
                .picker-select(@click="() => {\
                    matchStarsSelectIIPrevVal = matchStarsSelectIIVal;\
                    toggleModalIIStatus = true;\
                }")
                    .stars-title
                        .img-outer
                            img(:src="`/stars/img/stars_icon/${matchStarsSelectIIVal}.png`")
                        .text {{ starsKeyPare ? starsKeyPare[matchStarsSelectIIVal] : '' }}
                    .select-sign
                        i.far.fa-angle-up
                        i.far.fa-angle-down
            .search-btn(@click="searchAction") 查詢
        Modal(addClass="forecast-modal",:toggleModalStatus="toggleModalIStatus")
            .top
                template(v-if="repackAllStars.length > 0")
                    IonPicker
                        IonPickerColumn(
                            :ref="overrideStyle.bind(this, {\
                                templateStr: '.picker-opts { width: 100% }',\
                                deep: true\
                            })"
                            :value="matchStarsSelectIVal",
                            @ionChange="starsPickerChange($event, 'matchStarsSelectIVal')"
                        )
                            IonPickerColumnOption(
                                v-for="(item, index) in repackAllStars"
                                :key="index",
                                :value="item.optionVal"
                            ) {{ item.option }}
            .bottom.mutiple
                .confirm-btn(@click="toggleModalIStatus = false") 確定
                .cancel-btn(@click="() => {\
                    matchStarsSelectIVal = matchStarsSelectIPrevVal;\
                    toggleModalIStatus = false;\
                }") 取消
        Modal(addClass="forecast-modal",:toggleModalStatus="toggleModalIIStatus")
            .top
                template(v-if="repackAllStars.length > 0")
                    IonPicker
                        IonPickerColumn(
                            :ref="overrideStyle.bind(this, {\
                                templateStr: '.picker-opts { width: 100% }',\
                                deep: true\
                            })"
                            :value="matchStarsSelectIIVal",
                            @ionChange="starsPickerChange($event, 'matchStarsSelectIIVal')"
                        )
                            IonPickerColumnOption(
                                v-for="(item, index) in repackAllStars"
                                :key="index",
                                :value="item.optionVal"
                            ) {{ item.option }}
            .bottom.mutiple
                .confirm-btn(@click="toggleModalIIStatus = false") 確定
                .cancel-btn(@click="() => {\
                    matchStarsSelectIIVal = matchStarsSelectIIPrevVal;\
                    toggleModalIIStatus = false;\
                }") 取消
</template>
<style lang="scss" scoped>
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        .title {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            text-align: center;
        }

        .picker-outer {
            display: grid;
            grid-template-columns: 1fr 50px 1fr;
            cursor: pointer;
            user-select: none;

            .middle-lines {
                position: relative;

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

            .picker-select {
                position: relative;
                padding: 4px 20px 5px 20px;
                border-radius: 20px;
                box-shadow: 0 0 0 .5px rgba(255,255,255,.5);
                margin: 16px 0;
                background-color: rgba(30,30,30,.5);

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
                        margin: 0 12px 0 12px;
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
        }

        .search-btn {
            background-color: rgba(30,30,30,.5);
            border-radius: 20px;
            box-shadow: inset 0 0 0 .5px rgba(255,255,255,.5);
            padding: 12px 0;
            cursor: pointer;
            user-select: none;
            text-align: center;
            width: 65%;
        }
    }
</style>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { IonPicker, IonPickerColumn, IonPickerColumnOption, onIonViewDidEnter, useIonRouter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'
import { IonContentWrapper, Modal } from '@/components'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'

export default defineComponent({
    components: {
        IonContentWrapper,
        IonPicker, 
        IonPickerColumn, 
        IonPickerColumnOption,
        Modal
    },
    setup(){
        
        const { getReducer, $, Utiles: { overrideStyle } } = inject<ProviderObjType>('NewProvider')!

        const { allStars, starsKeyPare } = getReducer(state => state.Base)

        const router = useIonRouter()

        const pageState:{
            matchStarsSelectIVal: Ref<string>,
            matchStarsSelectIPrevVal: Ref<string>,
            matchStarsSelectIIVal: Ref<string>,
            matchStarsSelectIIPrevVal: Ref<string>,
            starsKeyPare: reducerAssimbleType['Base']['starsKeyPare'],
            toggleModalIStatus: Ref<boolean>,
            toggleModalIIStatus: Ref<boolean>,
            repackAllStars: Ref<{ option: string, optionVal: string }[]>
        } = {
            matchStarsSelectIVal: ref('aries'),
            matchStarsSelectIPrevVal: ref(''),
            matchStarsSelectIIVal: ref('aries'),
            matchStarsSelectIIPrevVal: ref(''),
            toggleModalIStatus: ref(false),
            toggleModalIIStatus: ref(false),
            starsKeyPare,
            repackAllStars: ref([])
        }

        const method: {
            starsPickerChange(event:CustomEvent<{ value: string }>, type: 'matchStarsSelectIVal' | 'matchStarsSelectIIVal'): void,
            init(): void
            searchAction(): Promise<void>
        } = {
            starsPickerChange: (event, type) => {
                pageState[type].value = event.detail.value
            },
            init: () => {
                pageState.repackAllStars.value = $.maps(allStars.value, row => ({ option: row.starNameZh, optionVal: row.starNameEn }))
            },
            searchAction: async () => {
                router.push(`/star_match/details/${pageState.matchStarsSelectIVal.value}/${pageState.matchStarsSelectIIVal.value}`)
            }
        }

        onIonViewDidEnter(() => method.init())
        
        return { ...pageState, ...method, overrideStyle }
    }
})

</script>