<template>
    <div class="container">
        Hello Vue & Rollup !
        <div class="sd">aaaaa</div>
        <div class="count-text" :class="{ active:toggleClass }">{{ count }}</div>
        <div @click="addCount">Click</div>
    </div>
</template>
<style lang="scss" scoped>
    .container{
        color: red;
        .sd{
            color: blue;
        }
        .count-text{
            transition: .5s ease;

            &.active{
                color: blue;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,Ref,ref } from 'vue'

interface stateType {
    count:Ref<number>
    toggleClass:Ref<boolean>
}

interface methodType {
    addCount():void
}

export default defineComponent({
    setup(){
        const state:stateType = {
            count:ref(0),
            toggleClass:ref(false)
        }

        const method:methodType = {
            addCount:() => {
                state.count.value++
                state.toggleClass.value = !state.toggleClass.value
            }
        }

        return { ...state,...method }
    }    
})
</script>