<template>
    <div class="modal-outer" :class="{ 'active': toggleModal }">
        <div class="modal">
            <div class="modal-body">Hello !</div>
            <div class="modal-footer">
                <div @click="useToggleModalStatus">Cancel</div>
                <div @click="useToggleModalStatus">Confirm</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .modal-outer{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        opacity: 0;
        z-index: -1;
        transition: .5s ease;

        .modal{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 300px;
            max-width: 95%;
            background-color: white;
            border-radius: 5px;

            .modal-body{
                padding: 10px;
            }
            .modal-footer{
                display: flex;
                div{
                    width: 50%;
                    cursor: pointer;
                    user-select: none;
                    padding: 5px;
                    font-weight: bold;
                    text-align: center;
                }
            }
        }

        &.active{
            opacity: 1;
            z-index: 5;
        }
    }
</style>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

interface methodType {
    useToggleModalStatus():void
}

export default defineComponent({
    props:["toggleModal"],
    emits:["toggleModalStatus"],
    setup(props,{ emit }){
        
        const method:methodType = {
            useToggleModalStatus:() => emit('toggleModalStatus',false) 
        }

        return { ...toRefs(props), ...method }
    }
})
</script>
