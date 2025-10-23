<template lang="pug">
.reactive-modal-outer-frame(:class="{ active: modalParams.isOpen }")
    .reactive-modal-outer
        .header 訊息
        .body {{ modalParams.content }}
        .footer
            .confirm(@click="handler(true)") 確定
            .cancel(@click="handler(false)") 取消
</template>
<style lang="scss" scoped>
    .reactive-modal-outer-frame {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -2;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        transition: .5s ease;

        .reactive-modal-outer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
            max-width: 400px;
            background-color: white;
            border-radius: 5px;

            .header {
                padding: 10px;
                font-size: 18px;
                font-weight: bold;
                box-shadow: 0 -1px 0 1px rgba(30,30,30,.3);
            }

            .body {
                padding: 10px;
                text-align: center;
            }

            .footer {
                display: flex;
                justify-content: flex-end;
                padding: 5px;
                box-shadow: 0 1px 0 1px rgba(30,30,30,.3);

                .confirm {
                    padding: 5px 12px;
                    cursor: pointer;
                    user-select: none;
                    margin-right: 3px;
                    box-shadow: 0 0 0 .5px rgba(30, 30, 30, 0.3);
                    border-radius: 5px;
                }

                .cancel {
                    padding: 5px 12px;
                    cursor: pointer;
                    user-select: none;
                    margin-left: 3px;
                    box-shadow: 0 0 0 .5px rgba(30, 30, 30, 0.3);
                    border-radius: 5px;
                }
            }
        }

        &.active {
            opacity: 1;
            z-index: 10;
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs } from 'vue'

interface CustomModalProps {
    modalParams: {
        isOpen: boolean,
        content: string
    },
    handleEvent(status:boolean):void
}

export default defineComponent({
    props:['modalParams','handleEvent'],
    emits:['handleEvent'],
    setup(props:CustomModalProps,{ emit }){
        const propsRefs = toRefs(props)

        const handler:(status:boolean) => void = status => {
            emit('handleEvent',status)
        }

        return { ...propsRefs,handler }
    }
})
</script>