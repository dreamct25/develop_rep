<template lang="pug">
teleport(to="#app")
    .toast-outer-frame(ref="toastOuterFrameRef")
</template>
<style lang="scss">

   .toast-outer-frame {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        width: 390px;
        margin: 0 auto;
        z-index: 400;

        @media screen and (max-width: 430px) {
            width: auto;
        }

        .toast-message-box {
            position: relative;
            margin: 6px;
            padding: 12px;
            display: grid;
            grid-template-columns: 0fr 1fr;
            gap: 8px;
            opacity: 0;
            transform: translateY(-100%) scale(.5);
            color: white;
            backdrop-filter: blur(6px);
            box-shadow: 0 0 2px 0px rgba(255, 255, 255, .5);
            border-radius: 5px;
            background-color: rgba(30, 30, 30, .5);
            align-items: center;

            .box-text {
                text-align: center;
                word-break: break-word;
                white-space: pre-line;
                line-height: 24px;
            }

            i {

                &.success {
                    color: rgb(0,221,0);
                    font-size: 20px;
                }

                &.error {
                    color: rgb(255,51,51);
                    font-size: 20px;
                }

                &.info {
                    color: rgb(0,221,221);
                    font-size: 20px;
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent, ref, nextTick, render, h, inject, Fragment } from 'vue'
import { type ProviderObjType } from '@/App.vue'

export default defineComponent<any>({
    expose: ['show'],
    setup(){

        const { $ } = inject<ProviderObjType>('NewProvider')!

        const toastOuterFrameRef = ref<HTMLDivElement | null>(null)

        const show:(toastText: string, iconStatus: string) => Promise<void> = async (toastText, iconStatus) => {

            await nextTick()

            if(!toastOuterFrameRef.value) return

            if(toastText === '') return

            const duration = 2500

            const signIcon: Record<string, string> = {
                'success': 'fas fa-check-circle success',
                'error': 'fas fa-times-circle error',
                'info': 'fas fa-info-circle info'
            }

            const toastMessageBox = $.createDom('div', {
                className: 'toast-message-box'
            })

            render(
                h(Fragment, null, [
                    h('i', { class: signIcon[iconStatus] }),
                    h('div', {
                        class: 'box-text',
                        textContent: toastText
                    })
                ]),
                toastMessageBox
            )

            toastOuterFrameRef.value.prepend(toastMessageBox)

            toastMessageBox.animate(
                { transform: 'translateY(0%) scale(1)', opacity: 1 }, 
                { duration: 500, fill: 'forwards', easing: 'ease' }
            )

            await $.useSleep(duration)

            toastMessageBox.animate(
                { transform: 'translateY(-100%) scale(.5)', opacity: 0 }, 
                { duration: 500, fill: 'forwards', easing: 'ease' }
            )

            await $.useSleep(duration)

            toastMessageBox.remove()
        }

        return { toastOuterFrameRef, show }
    }
})

</script>