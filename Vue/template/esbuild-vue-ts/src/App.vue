<template lang="pug">
.container
    .title Hello Vue & Esbuild !
    .count(:class="{ toggle:toggleColor }") {{ count }}
    |{{ count }}{{ (count % 2) !== 0 ? ' is odd number' : " is't odd number" }}
    br
    |{{ count }}{{ (count % 2) === 0 ? ' is even number' : " is't even number" }}
    Main(:isColorChange="toggleColor")
    .add-btn(@click="addCount") Add Count
</template>
<style lang="scss" scoped>
    .container{
        .title{
            color: red;
            font-size: 50px;
        }
        .count{
            color: red;
            transition: .5s ease;
            font-size: 20px;

            &.toggle{
                color: blue;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import Main from './Main.vue'

export default defineComponent({
    components: {
        Main
    },
    setup(){
        const state = {
            count: ref<number>(0),
            toggleColor: ref<boolean>(false)
        }

        const method:{
            addCount():void
        } = {
            addCount: () => {
                state.count.value += 1
                state.toggleColor.value = !state.toggleColor.value
            }
        }

        return { ...state,...method }
    }
})

</script>

