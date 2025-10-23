<template lang="pug">
    IonContentWrapper
        .layout
            .title 選擇查詢星座
            .picker-select(@click="() => {\
                searchStarsSelectPrevVal = searchStarsSelectVal;\
                toggleModalStatus = true;\
            }")
                .stars-title
                    .img-outer
                        img(:src="`/stars/img/stars_icon/${searchStarsSelectVal}.png`")
                    .text {{ starsKeyPare ? starsKeyPare[searchStarsSelectVal] : '' }}
                .select-sign
                    i.far.fa-angle-up
                    i.far.fa-angle-down
            .search-btn(@click="searchAction") 查詢
        Modal(addClass="forecast-modal",:toggleModalStatus="toggleModalStatus")
            .top
                template(v-if="repackAllStars.length > 0")
                    IonPicker
                        IonPickerColumn(
                            :ref="overrideStyle.bind(this, {\
                                templateStr: '.picker-opts { width: 100% }',\
                                deep: true\
                            })"
                            :value="searchStarsSelectVal",
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
                    searchStarsSelectVal = searchStarsSelectPrevVal;\
                    searchStarsSelectPrevVal = '';\
                    toggleModalStatus = false;\
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
        }

        .picker-select {
            position: relative;
            padding: 4px 6px;
            border-radius: 20px;
            box-shadow: 0 0 0 .5px rgba(255,255,255,.5);
            width: 65%;
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
            searchStarsSelectVal: Ref<string>,
            searchStarsSelectPrevVal: Ref<string>
            starsKeyPare: reducerAssimbleType['Base']['starsKeyPare'],
            toggleModalStatus: Ref<boolean>,
            repackAllStars: Ref<{ option: string, optionVal: string }[]>
        } = {
            searchStarsSelectVal: ref('aries'),
            searchStarsSelectPrevVal: ref(''),
            toggleModalStatus: ref(false),
            starsKeyPare,
            repackAllStars: ref([])
        }

        const method: {
            starsPickerChange(event:CustomEvent<{ value: string }>): void,
            init(): void
            searchAction(): Promise<void>
        } = {
            starsPickerChange: event => {
                pageState.searchStarsSelectVal.value = event.detail.value
            },
            init: () => {
                pageState.repackAllStars.value = $.maps(allStars.value, row => ({ option: row.starNameZh, optionVal: row.starNameEn }))
            },
            searchAction: async () => {
                router.push(`/star_explain/details/${pageState.searchStarsSelectVal.value}`)
            }
        }

        onIonViewDidEnter(() => method.init())
        
        return { ...pageState, ...method, overrideStyle }
    }
})

</script>