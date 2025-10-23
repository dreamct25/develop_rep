<template lang="pug">
.page-outer
    .desc-outer
        .title Fashion 起源
        .desc 
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
            |Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique dolor aliquid labore placeat aperiam cumque doloribus ipsam odit mollitia saepe impedit, earum laborum sed debitis molestiae neque fugit. Magnam.
</template>
<style lang="scss" scoped>
    .page-outer {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &::before {
            content: '';
            position: fixed;
            z-index: -2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("https://unsplash.com/photos/jAdtyxPDmvU/download?force=true&w=1920");
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
        }

        &::after {
            content: '';
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(30,30,30,.7);
        }
        
        .desc-outer {
            color: white;
            width: 65%;
            margin: 135px auto 40px auto;

            @media screen and (max-width: 414px) {
                width: 85%;
                margin: 100px auto 40px auto;
            }

            .title {
                font-size: 40px;
                position: relative;
                padding-bottom: 12px;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: .5px;
                    background-color: rgba(255,255,255,.7);
                }
            }

            .desc {
                padding-top: 12px;
                line-height: 35px;
                text-align: justify;
            }
        }
    }
</style>
<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    setup(){

    }
})

</script>