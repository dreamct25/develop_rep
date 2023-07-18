<template>
    <div>
        12345sdfdsfdd
        <div>{{ count }}</div>
        <div @click="addCount">Add Count</div>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref,onMounted } from 'vue'

export default defineComponent({
    setup(){
        
        const state = {
            count:ref<number>(0)
        }
        const method = {
            addCount:() => state.count.value += 1
        }

        return { ...state,...method }
    }
})
</script>