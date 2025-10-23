<template lang="pug">
.loading-outer(:class="{ toggle: toggleLoadingStatus }")
    .loading-circle
    .loading-text Loading
</template>
<style lang="scss" scoped>
    .loading-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-color: rgba(30,30,30,.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: .5s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .loading-circle {
            width: 250px;
            height: 250px;
            position: relative;

            &::before {
                width: 100%;
                height: 100%;
                content: "";
                border-radius: 50%;
                box-shadow: inset 0 0 10px 2px rgba(255,255,255,.5);
                position: absolute;
                left: 0;
                top: 0;
                -webkit-animation: animloader14 1.5s linear infinite;
                animation: animloader14 1.5s linear infinite;

                @keyframes animloader14 {
                    0% {
                        transform: scale(.35);
                        opacity: 0;
                    }

                    50% {
                        transform: scale(.65);
                        opacity: 1;
                    }

                    100% {
                        transform: scale(.95);
                        opacity: 0;
                    }
                }
            }

            &::after {
                content: "";
                width: 100%;
                height: 100%;
                border-radius: 50%;
                box-shadow: inset 0 0 10px 2px rgba(255,255,255,.5);
                position: absolute;
                left: 0;
                top: 0;
                -webkit-animation: animloader20 1.5s 1s linear infinite;
                animation: animloader20 1.5s 1s linear infinite;

                @keyframes animloader20 {
                    0% {
                        transform: scale(.35);
                        opacity: 0;
                    }

                    50% {
                        transform: scale(.65);
                        opacity: 1;
                    }

                    100% {
                        transform: scale(.95);
                        opacity: 0;
                    }
                }
            }
        }

        .loading-text {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 18px;
            font-weight: bold;
            font-style: italic;
            letter-spacing: 1px;
        }

        &.toggle {
            opacity: 1;
            z-index: 99;
        }
        
    }
</style>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props:['toggleLoadingStatus'],
    setup(props: { toggleLoadingStatus: boolean }){

        return { ...toRefs(props) }
    }
})
</script>