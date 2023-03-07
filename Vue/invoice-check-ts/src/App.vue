<template lang="pug">
.container
    .header
        h1 統一發票開獎號碼
    Main(:rwdStatus="rwdStatus")
    .footer
        h6 &copy; CopyRight 2023-03 Alex Chen .
</template>
<style lang="scss">
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    html{
        display: flex;
        flex-direction: column;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        min-height: 100vh;

        body{

            .header{

                h1{
                    font-size: 45px;
                    color: white;
                    text-align: center;
                    padding: 30px 0 25px 0;
                    text-shadow: 0 1px 1px rgba(0,0,0,.7);

                    @media screen and (max-width:414px) {
                        font-size: 35px;
                    }
                }
            }

            .footer{
                color: white;
                text-align: center;
                text-shadow: 0 1px 1px rgba(0,0,0,.7);
                padding: 20px 0 25px 0;
            }
        }

        &::before{
            content:'';
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: -1;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        &::after{
            content:'';
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: -2;
            background-image: url("https://unsplash.com/photos/UX-mCYFC1cA/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjM4MDkxOTc2&force=true&w=1920");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref,Ref,onMounted,provide,readonly,reactive } from 'vue'
import Main from './component/Main.vue'
import $ from './lib/Library'
import { ProviderObjType } from './types'

export default defineComponent({
    components: { Main },
    setup(){
        provide("provideMethod",readonly(
            reactive<ProviderObjType>({ $ })
        ));

        const state:{
            rwdStatus:Ref<boolean>
        } = {
            rwdStatus:ref(false)
        }

        onMounted(() => {
            state.rwdStatus.value = window.innerWidth <= 414
        })

        return { ...state }
    }
})

</script>

