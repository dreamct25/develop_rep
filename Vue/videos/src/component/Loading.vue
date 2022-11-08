<template lang="pug">
.loading-outer(:class="{ 'loading-outer-active': loadingStatus }")
    .left-line(:class="{ active: loadingStatus }")
    .loading
        .loading-text Loading
    .right-line(:class="{ active: loadingStatus }")
</template>
<style lang="scss" scoped>
    .loading-outer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color:white;
        background-color: rgba(0,0,0,.5);
        backdrop-filter: blur(10px);
        z-index: -1;
        opacity: 0;
        transition: .7s ease;

        .right-line{
            position: absolute;
            top: 50%;
            left: 0;
            background-color: white;
            width:0;
            height: 2px;
            transition: .7s ease;
            opacity: 0;

            &.active{
                width:42vw;
                animation: rightLight 1s linear infinite;

                @media screen and (max-width: 414px) {
                    width: 36vw;
                }
            }

            @keyframes rightLight {
                0% { opacity: 0; }

                50%{ opacity: 1; }

                100%{ opacity: 0; }
            }
        }

        .left-line{
            position: absolute;
            top: 50%;
            right: 0;
            background-color: white;
            width:0;
            height: 2px;
            opacity: 0;
            transition: .7s ease;

            &.active{
                width:42vw;
                animation: leftLight 1s linear infinite;
                
                @media screen and (max-width: 414px) {
                    width: 36vw;
                }
            }

            @keyframes leftLight {
                0% { opacity: 0; }

                50%{ opacity: 1; }

                100%{ opacity: 0; }
            }
        }

        .loading{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 130px;
            height: 130px;

            .loading-text{
                font-size: 20px;
                padding: 0 8px 8px 0;
            }
        }

        &.loading-outer-active{
            z-index: 10;
            opacity: 1;
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs } from 'vue'

export default defineComponent({ props:['loadingStatus'],setup:(props) => ({ ...toRefs(props) }) })
</script>
