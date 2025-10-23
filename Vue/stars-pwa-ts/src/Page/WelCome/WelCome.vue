<template lang="pug">
    IonContentWrapper
        .layout
            .title-group
                .icon(:class="{ active: enterView }")
                    i.fas.fa-star.fa-5x
                .title(:class="{ active: enterView }") Stars App
            .loading-progress-outer
            .progress-outer
</template>
<style lang="scss" scoped>
    .layout {
        display: grid;
        grid-template-rows: 1fr 0fr;
        justify-content: center;
        align-items: center;
        height: 100%;

        .title-group {
            
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transform: scale(.8) translateY(10px);
                transition: .5s ease;

                i {
                    color: rgba(255, 255, 0, 1);
                    animation: iconShow 2s ease infinite;

                    @keyframes iconShow {
                        0% {
                            text-shadow: 0 0 0 rgba(255, 255, 0, 0);
                        }

                        50% {
                            text-shadow: 0 0 12px rgba(255, 255, 0, 1);
                        }

                        100% {
                            text-shadow: 0 0 0 rgba(255, 255, 0, 0);
                        }
                    }
                }

                &.active {
                    opacity: 1;
                    transform: scale(1) translateY(0px);
                }
            }

            .title {
                color: transparent;
                text-align: center;
                margin-top: 20px;
                font-size: 25px;
                font-style: italic;
                text-shadow: 0 0 6px rgba(255, 255, 255, 0);
                transform: scale(.8) translateY(-10px);
                transition: .5s ease;

                &.active {
                    text-shadow: 0 0 1px rgba(255, 255, 255, 1);
                    transform: scale(1) translateY(0px);
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useIonRouter, onIonViewDidEnter } from '@ionic/vue'
import { ProviderObjType } from '@/App.vue'
import { reducerAssimbleType } from '@/store/reducerAssimbleType'
import { IonContentWrapper } from '@/components'

export default defineComponent({
    components: {
        IonContentWrapper
    },
    setup(){

        const { setReducer, Fetch, $ } = inject<ProviderObjType>('NewProvider')!

        const router = useIonRouter()

        const enterView = ref<boolean>(false)

        const onInit: () => Promise<boolean> = async () => {

            try {

                const tempStars = localStorage.getItem('stars')

                setReducer('Base/currentSelectStar', tempStars || 'aries')

                const allStars = await Fetch.get<{ data: reducerAssimbleType['Base']['allStars']['value'] }>('/all_stars')

                if(allStars.data?.data){

                    const repack = Object.fromEntries(
                        $.maps(allStars.data?.data, row => [row.starNameEn, row.starNameZh])
                    )

                    setReducer('Base/starsKeyPare', repack)

                    setReducer('Base/allStars', allStars.data?.data || [])

                    return true
                }

            } catch(err) {
                return false
            }

            return false
        }

        onIonViewDidEnter(async () => {

            await $.useSleep(500)

            enterView.value = true

            const isOk = await onInit()

            await $.useSleep(1500)
            
            if(isOk) router.push('/star_forecast')
        })

        return { enterView }
    }
})
</script>