<template lang="pug">
    teleport(to="#app")
        Transition(name="toggle")
            template(v-if="toggleLoadingStatus")
                .loading-outer
                    .loading
                        .icon
                            i.fas.fa-star.fa-5x
                        .text Loading
</template>
<style lang="scss" scoped>
    .loading-outer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background-color: rgba(30,30,30,.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;

                i {
                    color: rgba(255, 255, 0, 1);
                    animation: loadingStar 2s ease infinite;

                    @keyframes loadingStar {
                        0% {
                            text-shadow: 0 0 0 rgba(255, 255, 0, 0);
                            transform: scale(1);
                        }

                        25% {
                            text-shadow: 0 0 12px rgba(255, 255, 0, 1);
                            transform: scale(1.15) rotate(45deg);
                        }

                        50% {
                            text-shadow: 0 0 12px rgba(255, 255, 0, 1);
                            transform: scale(1.15) rotate(-45deg);
                        }

                        100% {
                            text-shadow: 0 0 0 rgba(255, 255, 0, 0);
                            transform: scale(1);
                        }
                    }
                }
            }

            .text {
                text-align: center;
                margin-top: 24px;
                font-size: 20px;
                font-weight: bold;
                font-style: italic;
            }
        }
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
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: ["toggleLoadingStatus"],
    setup(props: { toggleLoadingStatus: boolean }){

        const propsRefs = toRefs(props)

        return { ...propsRefs }
    }
})

</script>