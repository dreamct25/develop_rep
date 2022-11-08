<template lang="pug">
.alert-modal-outer(:class="{ active:toggleModalStatus }")
    .alert-modal
        .alert-modal-header {{ formatLanguage('component.modal.title') }}
        .line
        .alert-modal-body
            slot(name="alert-modal-body-content")
        .line
        .alert-modal-footer(v-if="withControll")
            .confirm(@click="useConfirmEvent") {{ formatLanguage('component.modal.confirm') }}
            .cancel(:class="{ 'cancel-hide':useAlert }",@click="useCancelEvent") {{ formatLanguage('component.modal.cancel') }}
</template>
<style lang="scss">
    .alert-modal-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        transition: .5s ease;

        .alert-modal{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 400px;
            max-width: 95%;
            transform: translate(-50%,-50%);
            background-color: white;
            border-radius: 5px;
            overflow: hidden;

            .line{
                height: .5px;
                background-color: rgba(30,30,30,.3);
            }

            .alert-modal-header{
                padding: 5px 8px;
                font-weight: bold;
                font-size: 20px;
            }

            .alert-modal-body{
                padding: 12px;
                text-align: center;
            }

            .alert-modal-footer{
                display: flex;
                justify-content: flex-end;
                gap: 7px;
                padding: 5px;

                div{
                    border-radius: 5px;
                    padding: 5px;
                    width: 80px;
                    text-align: center;
                    box-shadow: 0 0 .5px .5px rgba(30,30,30,.3);
                    cursor: pointer;
                    user-select: none;
                    transition: .3s ease;

                    &.cancel-hide {
                        margin-right: -87px;
                    }
                }
            }
        }

        &.active{
            opacity: 1;
            z-index: 2;
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs,inject } from 'vue'
import { ProviderType } from '../App.vue'

export default defineComponent({
    props:['toggleModalStatus','confirmEvent','cancelEvent','withControll','useAlert'],
    setup(props:{
        toggleModalStatus:boolean,
        confirmEvent:Function,
        cancelEvent:Function,
        withControll:boolean,
        useAlert?:boolean
    },{ emit }){

        const { formatLanguage } = inject<ProviderType>('NewProvider')

        const method:{
            useConfirmEvent():void
            useCancelEvent():void
        } = {
            useConfirmEvent:() => {
                emit('confirmEvent',{ type:'confirm',status:false })
            },
            useCancelEvent:() => {
                emit('cancelEvent',{ type:'cancel',status:false })
            }
        }
        
        return { ...toRefs(props),...method,formatLanguage }
    }
})

</script>