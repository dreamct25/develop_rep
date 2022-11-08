<template lang="pug">
div
    .header(v-if="!rwdState",:class="{ active:toggleBar }")
        .title(@click="goHome")
            icon(icon="fa-solid fa-film")
            h1 Videos
        .nav-bar
            .nav-bar-sessionI(v-if="navBarSwitch",:class="{ 'nav-bar-hide': navBarAnimate }")
                .go-collect(:class="{ 'go-collect-hide':route.name === 'collect' }")
                    router-link(to="/collect") {{ formatLanguage('pages.app.myCollect') }}
                .search-bar-outer(:class="{ 'search-bar-hide':route.name === 'collect' }")
                    input(type="text",,v-model="searchText",:placeholder="formatLanguage('pages.app.placeText')",@keypress="transToPartail")
                    .search-icon-outer
                        icon(icon="fa-solid fa-magnifying-glass")
                .language-outer
                    .language-select(@click="togglelanguageList = !togglelanguageList")
                        icon(icon="fa-solid fa-globe")
                        |&nbsp;{{ formatLanguage(`pages.app.lang.${locale}`) }}
                    .language-list-outer(:class="{ 'toggle-language-list':togglelanguageList }")
                        .language-list
                            div(@click="changeLanguage('en')") {{ formatLanguage('pages.app.lang.en') }}
                            div(@click="changeLanguage('tw')") {{ formatLanguage('pages.app.lang.tw') }}
            .nav-bar-sessionII(v-else,:class="{ 'nav-bar-show': navBarAnimate }")
                .row.no-gutters
                    .col-12
                        .d-flex
                            .back(@click="backPage") {{ formatLanguage('pages.app.back') }}
                            .language-outer
                                .language-select(@click="togglelanguageList = !togglelanguageList")
                                    icon(icon="fa-solid fa-globe")
                                    |&nbsp;{{ formatLanguage(`pages.app.lang.${locale}`) }}
                                .language-list-outer(:class="{ 'toggle-language-list':togglelanguageList }")
                                    .language-list
                                        div(@click="changeLanguage('en')") {{ formatLanguage('pages.app.lang.en') }}
                                        div(@click="changeLanguage('tw')") {{ formatLanguage('pages.app.lang.tw') }}
    .header-rwd(v-else)
        .row.no-gutters.justify-content-between
            .title(@click="goHome")
                icon(icon="fa-solid fa-film")
                h1 Videos
            .nav-bar-sessionI(v-if="navBarSwitch",:class="{ 'nav-bar-show': !navBarAnimate && route.name === 'home' }")
                .search-icon-outer(@click="toggleFloatSearchBar = !toggleFloatSearchBar")
                    icon(icon="fa-solid fa-magnifying-glass")
                .language-outer
                    .language-select(@click="togglelanguageList = !togglelanguageList")
                        icon(icon="fa-solid fa-globe")
                        |&nbsp;{{ formatLanguage(`pages.app.lang.${locale}`) }}
                    .language-list-outer(:class="{ 'toggle-language-list':togglelanguageList }")
                        .language-list
                            div(@click="changeLanguage('en')") {{ formatLanguage('pages.app.lang.en') }}
                            div(@click="changeLanguage('tw')") {{ formatLanguage('pages.app.lang.tw') }}
            .nav-bar-sessionII(v-else,:class="{ 'nav-bar-show': navBarAnimate }")
                .back(@click="backPage") {{ formatLanguage('pages.app.back') }}
                .language-outer
                    .language-select(@click="togglelanguageList = !togglelanguageList")
                        icon(icon="fa-solid fa-globe")
                        |&nbsp;{{ formatLanguage(`pages.app.lang.${locale}`) }}
                    .language-list-outer(:class="{ 'toggle-language-list':togglelanguageList }")
                        .language-list
                            div(@click="changeLanguage('en')") {{ formatLanguage('pages.app.lang.en') }}
                            div(@click="changeLanguage('tw')") {{ formatLanguage('pages.app.lang.tw') }}
            .float-search-bar-outer(:class="{ active:toggleFloatSearchBar && route.name === 'home' }")
                    .search-bar
                        .close-btn(@click="toggleFloatSearchBar = false")
                            icon(icon="fa-solid fa-chevron-left")
                        input(type="text",v-model="searchText",:placeholder="formatLanguage('pages.app.placeText')",@keypress="transToPartail")
                        .search-btn(@click="transToPartail")
                            icon(icon="fa-solid fa-magnifying-glass")
    .nav-bar-rwd(v-if="rwdState")
        .row.no-gutters
            .col-6
                .routes(@click="currentLink('home')")
                    .routes-line(:class="{ 'routes-line-active': route.name === 'home' }")
                    router-link(to="/")
                        icon(icon="fa-solid fa-home")
                        |首頁
            .col-6
                .routes(@click="currentLink('collect')")
                    .routes-line(:class="{ 'routes-line-active': route.name === 'collect' }")
                    router-link(to="/collect")
                        icon(icon="fa-solid fa-heart")
                        |{{ formatLanguage('pages.app.myCollect') }}
    router-view
    .footer
        h6 &copy; {{ formatLanguage('pages.app.CopyRight') }}
</template>
<style lang="scss">
    html {
        box-shadow: inset 0 0 2000px 2000px rgb(0, 0, 0);
        min-height: 100vh;

        body {
            background-color: transparent;
            padding-top: 0;
            transition: 1s ease;

            .app {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  

                .header {
                    position: sticky;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1;
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 15px 8px 0;
                    background: linear-gradient(180deg,rgba(0,0,0,1),rgba(0,0,0,.8),rgba(0,0,0,.6),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
                    transition: .5s ease;
                    
                    .title {
                        display: flex;
                        align-items: center;
                        font-size: 40px;
                        cursor: pointer;
                        user-select: none;
                        
                        svg {
                            pointer-events: none;
                            color: white;
                            margin: 0 15px;
                        }
                        
                        h1 {
                            pointer-events: none;
                            color: white;
                            margin-bottom: 0;
                        }
                    }
                    
                    .nav-bar {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        
                        .nav-bar-sessionI {
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            transform: translateY(0px);
                            opacity: 1;
                            transition: 0.7s ease;
                            
                            .go-collect {
                                transform: translateY(0px);
                                transition: 0.7s ease;

                                a {
                                    color: white;
                                    transition: .5s ease;

                                    &:hover {
                                        text-decoration: none;
                                    }

                                    &.router-link-exact-active {
                                        color: rgb(0, 255, 255);
                                    }
                                }

                                &.go-collect-hide {
                                    transform: translateY(-200px);
                                }
                            }

                            &.nav-bar-hide {
                                opacity: 0;
                                transform: translateY(-200px);
                            }

                            .search-bar-outer {
                                position: relative;
                                transform: translateY(0px);
                                transition: .7s ease;

                                input {
                                    border: none;
                                    outline: none;
                                    width: 35px;
                                    box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.8),0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    background-color: transparent;
                                    color: white;
                                    font-size: 18px;
                                    border-radius: 20px;
                                    padding: 5px 0 3px 34px;
                                    cursor: pointer;
                                    user-select: none;
                                    transition: .7s ease;

                                    &:focus {
                                        cursor: text;
                                        user-select: none;
                                        width: 250px;
                                        box-shadow: inset 0 0 5px 1px rgba(255, 255, 255, 0.8),0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    }

                                    &::placeholder {
                                        color: rgba(255, 255, 255, 0.7);
                                        font-size: 18px;
                                    }
                                }

                                .search-icon-outer {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    color: white;
                                    font-size: 19px;
                                    transform: translate(9px,4px);
                                    pointer-events: none;
                                }

                                &.search-bar-hide {
                                    transform: translateY(-200px);
                                }
                            }

                            .language-outer {
                                position: relative;
                                color: white;

                                .language-select {
                                    padding: 5px 10px;
                                    box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    border-radius: 5px;
                                    cursor: pointer;
                                    user-select: none;
                                }

                                .language-list-outer {
                                    position: absolute;
                                    top: 40px;
                                    left: 0;
                                    right: 0;
                                    background-color: rgba(30, 30, 30, 0.7);
                                    border-radius: 5px;
                                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    max-height: 0;
                                    opacity: 0;
                                    overflow: hidden;
                                    transition: .5s ease;

                                    .language-list {
                                        text-align: center;
                                        div {
                                            box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, 0.7);
                                            padding: 10px 0;
                                            cursor: pointer;
                                            user-select: none;
                                        }
                                    }

                                    &.toggle-language-list {
                                        opacity: 1;
                                        max-height: 100vh;
                                    }
                                }
                            }
                        }

                        .nav-bar-sessionII {
                            transform: translateY(-200px);
                            transition: 0.7s ease;
                            
                            .back {
                                background-color: rgba(0, 0, 0, 0.7);
                                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                                border-radius: 10px;
                                padding: 5px 22px 5px 22px;
                                margin: 0 15px;
                                color: white;
                                text-align: center;
                                cursor: pointer;
                                user-select: none;
                            }

                            .language-outer {
                                position: relative;
                                color: white;

                                .language-select {
                                    padding: 5px 10px;
                                    box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    border-radius: 5px;
                                    cursor: pointer;
                                    user-select: none;
                                }

                                .language-list-outer {
                                    position: absolute;
                                    top: 40px;
                                    left: 0;
                                    right: 0;
                                    background-color: rgba(30, 30, 30, 0.7);
                                    border-radius: 5px;
                                    box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.7);
                                    max-height: 0;
                                    opacity: 0;
                                    overflow: hidden;
                                    transition: .5s ease;

                                    .language-list {
                                        text-align: center;
                                        div {
                                            box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, 0.7);
                                            padding: 10px 0;
                                            cursor: pointer;
                                            user-select: none;
                                        }
                                    }

                                    &.toggle-language-list {
                                        opacity: 1;
                                        max-height: 100vh;
                                    }
                                }
                            }

                            &.nav-bar-show {
                                transform: translateY(0px);
                            }
                        }   
                    }

                    &.active {
                        top: -100%;
                    }
                }

                .header-rwd {
                    position: sticky;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1;
                    justify-content: space-between;
                    padding: 8px 8px 8px 3px;
                    background: linear-gradient(180deg,rgba(0,0,0,1),rgba(0,0,0,.8),rgba(0,0,0,.6),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
                    
                    .title {
                        display: flex;
                        align-items: center;
                        font-size: 30px;
                        
                        svg {
                            pointer-events: none;
                            color: white;
                            margin: 0 7px;
                        }
                        
                        h1 {
                            pointer-events: none;
                            color: white;
                            margin-bottom: 0;
                            font-size: 30px;
                        }
                    }

                    .language-outer {
                        position: relative;
                        color: white;

                        .language-select {
                            padding: 6px 10px;
                            box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.7);
                            border-radius: 5px;
                            cursor: pointer;
                            user-select: none;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }

                        .language-list-outer {
                            position: absolute;
                            top: 40px;
                            left: 0;
                            right: 0;
                            background-color: rgba(30, 30, 30, 0.7);
                            border-radius: 5px;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.7);
                            max-height: 0;
                            opacity: 0;
                            overflow: hidden;
                            transition: .5s ease;

                            .language-list {
                                text-align: center;
                                div {
                                    box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, 0.7);
                                    padding: 10px 0;
                                    cursor: pointer;
                                    user-select: none;
                                }
                            }

                            &.toggle-language-list {
                                opacity: 1;
                                max-height: 100vh;
                            }
                        }
                    }

                    .nav-bar-sessionI {
                        display: grid;
                        grid-template-columns: auto auto;
                        gap: 6px;
                        transform: translateY(-200px);
                        transition: 0.7s ease;

                        .search-icon-outer {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.7);
                            padding: 0 10px;
                            border-radius: 50%;

                            svg {
                                color: white;
                            }
                        }

                        &.nav-bar-show {
                            transform: translateY(0px);
                        }
                    }
                    
                    .nav-bar-sessionII {
                        display: grid;
                        grid-template-columns: auto auto;
                        gap: 6px;
                        transform: translateY(-200px);
                        transition: 0.7s ease;
                        
                        .back {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            background-color: rgba(0, 0, 0, 0.7);
                            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.7);
                            border-radius: 10px;
                            padding: 0 10px;
                            width: 100%;
                            color: white;
                            text-align: center;
                            cursor: pointer;
                            user-select: none;
                        }

                        &.nav-bar-show {
                            transform: translateY(0px);
                        }
                    }

                    .float-search-bar-outer {
                        position: fixed;
                        top: -10%;
                        left: 0;
                        right: 0;
                        transition: .5s ease;
                        background-color: rgb(30,30,30,.5);
                        backdrop-filter: blur(10px);

                        .search-bar {
                            display: flex;

                            .close-btn {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                padding: 0 9px;
                                color: white;
                                font-size: 22px;
                            }

                            input {
                                border: none;
                                outline: none;
                                color: white;
                                background: transparent;
                                width: 100%;
                                padding: 8px 0;
                                font-size: 20px;

                                &::placeholder {
                                    color: rgba(255, 255, 255, 0.7);
                                }
                            }

                            .search-btn {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                padding: 0 9px;
                                color: white;
                                font-size: 22px;
                            }
                        }

                        &.active {
                            top: 0;
                        }
                    }
                }
                

                .nav-bar-rwd {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: white;
                    box-shadow: inset 0 0 2000px 2000px rgba(0, 0, 0, 0.8),
                    0 0 15px 15px rgba(0, 0, 0, 0.8);
                    z-index: 1;
                    .routes {
                        position: relative;
                        
                        a {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            font-size: 12px;
                            padding: 0 0 8px 0;
                            transition: 0.7s ease;
                            color: white;

                            svg {
                                font-size: 20px;
                                margin: 2px auto;
                            }

                            &:hover {
                                text-decoration: none;
                            }
                        }

                        &.router-link-exact-active {
                            color: rgb(0, 255, 255);
                            text-decoration: none;
                        }

                        .routes-line {
                            position: absolute;
                            top: 94%;
                            left: 50%;
                            right: 0;
                            bottom: 0;
                            width: 0;
                            height: 3px;
                            background-color: rgba(0, 255, 255, 0);
                            transition: 0.7s ease;

                            &.routes-line-active {
                                background-color: rgba(0, 255, 255, 1);
                                left: 0;
                                width: 100%;
                            }
                        }
                    }
                }

                .footer {
                    text-align: center;
                    color: white;
                    padding: 8px 0 30px 0;
                    
                    h6 {
                        font-size: 18px;
                        margin-bottom: 0;
                    }
                }
            }
        }

        &::after {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            content: "";
            background-image: url("https://unsplash.com/photos/4QmSdCP4bhM/download?force=true&w=1920");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            filter: blur(10px);
        }
    }
</style>
<script lang="ts">
import { defineComponent,Ref,ref,watch,onMounted,onUnmounted,readonly,provide,reactive,computed,ComputedRef,toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import $ from './lib/Library'

interface stateType {
    searchText:Ref<string>
    rwdState:Ref<boolean>
    scrollTemp: Ref<string>,
    searBarAnimate: Ref<boolean>,
    navBarSwitch: Ref<boolean>,
    navBarAnimate: Ref<boolean>,
    childrenOrder: Ref<number>,
    routeLineAimate: Ref<boolean>,
    togglelanguageList: Ref<boolean>,
    toggleFloatSearchBar: Ref<boolean>,
    scrollPosTemp: Ref<number>,
    toggleBar: Ref<boolean>
}

interface methodType {
    currentLink(currentText:string):void
    transToPartail(event:Event):void
    changeLanguage(useLang:string):void
    goHome():void
    backPage():void
    scrollEvent(event:Event):void
}

export interface ProviderType {
    $:$
    getReducer<T>(reducerName:string,callBack:(states:T) => T):ComputedRef<T>
    setReducer(actionName: string, value?: any):void;
    formatLanguage(text:string,replace?:{[key:string]:any}):string
}

export default defineComponent({
    setup(){
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const { t,locale } = useI18n()

        const formatLanguage:(text:string,replace:{[key:string]:any}) => string = (text,replace) => replace ? t(text,replace) : t(text)
        
        provide('NewProvider',readonly(
            reactive<ProviderType>({
                $:$,
                getReducer<T>(reducerName:string,callBack:(states:T) => T){
                    return computed<T>(() => callBack.call(callBack,store.state[reducerName]))
                },
                setReducer:(actionName: string, value?: any) => value ? store.dispatch(actionName, value) : store.dispatch(actionName, value),
                formatLanguage
            })
        ))

        const state:stateType = {
            searchText: ref(''),
            rwdState: ref(false),
            scrollTemp: ref(''),
            searBarAnimate: ref(false),
            navBarSwitch: ref(true),
            navBarAnimate: ref(false),
            childrenOrder: ref(2),
            routeLineAimate: ref(false),
            togglelanguageList: ref(false),
            toggleFloatSearchBar: ref(false),
            scrollPosTemp: ref(0),
            toggleBar: ref(false)
        }

        const method:methodType = {
            currentLink:currentText => {
                if(currentText === 'collect'){
                    setTimeout(() => {
                        state.navBarAnimate.value = true;
                        setTimeout(() => {
                            state.navBarAnimate.value = false;
                            state.navBarSwitch.value = true;
                        }, 700);
                    }, 1000);
                }
            },
            transToPartail:event => {
                if($.typeOf(event) === 'KeyboardEvent'){
                    if((event as KeyboardEvent).keyCode !== 13){
                        return
                    }
                }

                state.toggleFloatSearchBar.value = false

                store.dispatch('HomeReducer/setSearchText',state.searchText.value)
            },
            changeLanguage: useLang => {
                locale.value = useLang
                state.togglelanguageList.value = false
            },
            goHome: () => router.push('/'),
            backPage:() => {
                state.navBarAnimate.value = false
                setTimeout(() => {
                    state.navBarSwitch.value = true
                    state.navBarAnimate.value = true

                    setTimeout(() => {
                        state.navBarAnimate.value = false
                    },201)
                },701)

                route.name === 'video_all' ? router.back() : router.push('/')
            },
            scrollEvent: () => {
                state.toggleBar.value = !(window.scrollY < state.scrollPosTemp.value)
                state.scrollPosTemp.value = window.scrollY
            }
        }

        watch(() => route.name,pathName => {
            state.searBarAnimate.value = pathName !== 'home'

            if(pathName === 'video' || pathName === 'video_all'){
                state.navBarAnimate.value = true
                setTimeout(() => {
                    state.navBarSwitch.value = false
                    state.navBarAnimate.value = false

                    setTimeout(() => {
                        state.navBarAnimate.value = true
                    },201)
                },701)
            }
            
            pathName === 'home' && state.navBarAnimate.value && method.backPage()
        })

        onMounted(() => {
            state.rwdState.value = window.innerWidth <= 414
            $(window).listener('scroll',method.scrollEvent)
        })

        onUnmounted(() => {
            $(window).removeListener('scroll',method.scrollEvent)
        })

        return { ...state,...method,formatLanguage,locale,route }
    }
})
</script>