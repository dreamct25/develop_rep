<template lang="pug">
    IonContentWrapper
        .layout
            .top
                |CopyRight &copy; 2021-09 v3.0.0
                br
                | PWA Designer - Alex Chen .
            .bottom
                .back-btn(@click="goPrev") 返回
</template>
<style lang="scss" scoped>
    .layout {
        display: grid;
        grid-template-rows: 1fr 0fr;
        gap: 12px;
        padding: 0 12px 54px 12px;
        height: 100%;

        .top {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-style: italic;
            font-size: 22px;
            line-height: 30px;
        }

        .bottom {

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
import { defineComponent } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { IonContentWrapper } from '@/components'

export default defineComponent({
    components: {
        IonContentWrapper,
    },
    setup(){

        const router = useIonRouter()

        const goPrev: () => void = () => {
            router.navigate('/setting','back','pop')
        }
        
        return { goPrev }
    }
})

</script>