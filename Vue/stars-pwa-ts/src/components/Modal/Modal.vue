<template lang="pug">
     teleport(to="#app")
        Transition(name="toggle")
            template(v-if="toggleModalStatus")
                .modal-outer(:class="addClass")
                    slot

</template>
<style lang="scss" scoped>

    .modal-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 500;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .toggle-enter-active,
    .toggle-leave-active {
        transition: opacity .5s ease;
    }

    .toggle-enter-from,
    .toggle-leave-to {
        opacity: 0;
    }
</style>
<script lang="ts">
import { defineComponent , toRefs } from 'vue'

export default defineComponent({
    props: ['addClass','toggleModalStatus'],
    setup(props: { addClass: string ,toggleModalStatus: boolean }){

        const propsRefs = toRefs(props)
        
        return { ...propsRefs }
    }
})

</script>