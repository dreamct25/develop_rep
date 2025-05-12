<template lang="pug">
    teleport(to="#app")
       Transition(name="toggle")
           template(v-if="toggleToastStatus")
               .toast-outer
                    template(v-if="iconStatus ? true : false")
                        .icon
                            template(v-if="iconStatus === 'success'")
                                i.fas.fa-check-circle.success
                            template(v-if="iconStatus === 'info'")
                                i.fas.fa-info-circle.info
                            template(v-if="iconStatus === 'error'")
                                i.fas.fa-times-circle.error
                    div {{ toastText }}

</template>
<style lang="scss" scoped>

   .toast-outer {
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       z-index: 500;
       background-color: rgba(30,30,30,.5);
       backdrop-filter: blur(10px);
       -webkit-backdrop-filter: blur(10px);
       margin: 12px;
       border-radius: 5px;
       box-shadow: 0 0 0 .5px rgba(255,255,255,.7);

       .icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        margin-left: 16px;

        .success {
            color: rgb(0,221,0);
        }

        .info {
            color: rgb(0,187,255);
        }

        .error {
            color: rgb(255,51,51);
        }
       }

       div {
        padding: 12px 0;
        text-align: center;
       }
   }

   .toggle-enter-active,
   .toggle-leave-active {
       transition: opacity .5s ease, transform .5s ease;
   }

   .toggle-enter-from,
   .toggle-leave-to {
       opacity: 0;
       transform: translateY(-100%);
   }
</style>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props:['toggleToastStatus', 'toastText', 'iconStatus'],
    setup(props: { toggleToastStatus: boolean, toastText: string, iconStatus?: string }){

        const propsRefs = toRefs(props)

        return { ...propsRefs }
    }
})

</script>