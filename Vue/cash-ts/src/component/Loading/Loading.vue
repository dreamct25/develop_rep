<template lang="pug">
.loading(:class="{ active: loadingStatus }")
    .loading-circle
        svg(className="fsg",width="100%",height="100%")
            defs
                linearGradient(id="a1",x1="0%",y1="0%",x2="100%",y2="100%")
                    stop(offset="10%",stop-color="rgb(255,255,255)")
                    stop(offset="50%",stop-color="rgb(200,200,200)",stop-opacity=".5")
                    stop(offset="70%",stop-color="rgb(0,0,0)",stop-opacity="0")
                    stop(offset="90%",stop-color="rgb(0,0,0)",stop-opacity="0")
                    stop(offset="100%",stop-color="rgb(0,0,0)",stop-opacity="0")
            circle(cx="105",cy="105",r="100",stroke-width="6",stroke="url(#a1)",fill="none")
    .loading-text Loading
</template>
<style lang="scss" scoped>
    .loading{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        transition: .5s ease;
        backdrop-filter: blur(10px);
        background-color: rgba(30,30,30,.5);

        .loading-circle{

            svg{
                width: 210px;
                height: 210px;
                transform:rotate(0deg);
                animation: loadingFram 1s linear infinite;
            }
            
            @keyframes loadingFram {
                0%{
                    transform:rotate(0deg);
                }
                100%{
                    transform:rotate(360deg);
                }
            }
        }

        .loading-text{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            letter-spacing: 3px;
            font-style: italic;
            color: white;
            font-weight: bold;
            font-size: 18px;
        }

        &.active{
            opacity: 1;
            z-index: 15;
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs } from 'vue'
export default defineComponent({
    props:['loadingStatus'],
    setup(props:{ loadingStatus:boolean }){
        
        const propsRefs = toRefs(props)

        return { ...propsRefs }
    }
})
</script>