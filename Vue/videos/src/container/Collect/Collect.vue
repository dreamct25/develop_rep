<template lang="pug">
.page-outer
    .container-fluid
        .header-collect
            h1 {{ formatLanguage('pages.collect.title') }}
        .row.board(:class="{ 'justify-content-end':rwdStateOnPad,'justify-content-center':!rwdStateOnPad }")
            .col-md-10
                .search-collect-outer
                    .play-all(v-if="collect.length > 0")
                        router-link(:to="{ name: 'video_all', params: { fromCollect: true } }") {{ formatLanguage('pages.collect.playAll') }}
                    input(
                        type="text",
                        v-model="searchText"
                        :placeholder="formatLanguage('pages.collect.searchCollectsVideoName')",
                        :disabled="collect.length === 0"
                    )
        .row.justify-content-center(v-if="!rwdState")
            .col-md-10
                .collect-grid-outer
                    .collect-grid-header
                        div(v-for="(val,index) in ['','pages.collect.videoChannel','pages.collect.videoName','pages.collect.videoLink','pages.collect.views','pages.collect.DelectCollect']",:key="index") {{ val ? formatLanguage(val) : val }}
                    .collect-grid-body
                        .collect-grid(v-if="collectTemp.length > 0",v-for="(item, index) in collectTemp",:key="index")
                            span
                                img(:src="item.videoImgUrl")
                            span {{ item.videoChannelTitle }}
                            span {{ item.videoTitle }}
                            span(@click="goVideo(item.videoUrl, item.videoID)") {{ item.videoUrl }}
                            span {{ formatLanguage(`pages.collect.${item.videoViewsTimes.split('_').length > 2 ? 'viewTimesM' : 'viewTimes'}`,{ val:item.videoViewsTimes.replace(/_/g,'') }) }}
                            span
                                icon(icon="fa-solid fa-times",@click="showDeleteModal(item.videoID)")
                        .collect-grid.no-data(v-else) {{ formatLanguage('pages.collect.noCollect') }}

                    .collect-grid-footer
                        div(v-if="searchCount > 0") {{ formatLanguage('pages.collect.findVideo',{ val:searchCount }) }}
                        div {{ formatLanguage('pages.collect.collectTotal',{ val:collect.length }) }}
        .table-outer-rwd(v-else)
            .collect-count-outer
                div(v-if="searchCount > 0") {{ formatLanguage('pages.collect.findVideo',{ val:searchCount }) }}
                div {{ formatLanguage('pages.collect.collectTotal',{ val:collect.length }) }}
            .collect-list-outer(v-for="(item, index) in collectTemp",:key="index")
                .row.no-gutters
                    .col-md-12
                        .img-outer
                            img(:src="item.videoImgUrl")
                    .collect-body
                        .row.no-gutters
                            .col-3
                                span {{ formatLanguage('pages.collect.videoChannel') }}
                            .col-9
                                span {{ item.videoChannelTitle }}
                            .col-3
                                span {{ formatLanguage('pages.collect.videoName') }}
                            .col-9
                                span {{ item.videoTitle }}
                            .col-3
                                span {{ formatLanguage('pages.collect.videoLink') }}
                            .col-9
                                span(@click="goVideo(item.videoUrl, item.videoID)") {{ item.videoUrl }}
                            .col-3
                                span {{ formatLanguage('pages.collect.views') }}
                            .col-9
                                span {{ formatLanguage(`pages.collect.${item.videoViewsTimes.split('_').length > 2 ? 'viewTimesM' : 'viewTimes'}`,{ val:item.videoViewsTimes.replace(/_/g,'') }) }}
                .collect-footer
                    span(@click="showDeleteModal(item.videoID)") {{ formatLanguage('pages.collect.DelectCollect') }}
        nav(class="pagination-outer",aria-label="Page navigation",v-if="collectTemp.length > 0")
            ul(class="pagination justify-content-center align-items-center")
                li(class="page-item",:class="{ disabled: !paginationItem.hasPage }")
                    a(
                        class="page-link",
                        :class="{ 'page-link-active': paginationItem.hasPage }",
                        @click.prevent="getCollect(paginationItem.currentPage - 1)",
                        href="#",
                        aria-label="Previous"
                    )
                        span(aria-hidden="true")
                            icon(icon="fa-solid fa-chevron-left")
                li(
                    class="page-item",
                    v-for="(pages, index) in paginationItem.pageTotal",
                    :key="index",
                    :class="{ active: paginationItem.currentPage === pages }"
                )
                    a(class="page-link",href="#",@click.prevent="getCollect(pages)") {{ pages }}
                li(class="page-item",:class="{ disabled: !paginationItem.hasNext }")
                    a(
                        class="page-link",
                        :class="{ 'page-link-active': paginationItem.hasNext }",
                        @click.prevent="getCollect(paginationItem.currentPage + 1)",
                        href="#",
                        aria-label="Next"
                    )
                        span(aria-hidden="true")
                            icon(icon="fa-solid fa-chevron-right")
    Modal(
        :toggleModalStatus="toggleModalStatus",
        :withControll="true",
        :useAlert="toggleAlertStatus"
        @confirmEvent="deleteCollect",
        @cancelEvent="deleteCollect"
    )
        template(v-slot:alert-modal-body-content) {{ message }}
</template>
<style lang="scss" scoped>
    .page-outer {
        .header-collect {
            text-align: center;
            color: white;
            margin: 40px 0 20px 0;
        }

        .search-collect-outer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 10px;

            .play-all {
                a {
                    display: block;
                    padding: 5px 15px;
                    color: white;
                    background-color: black;
                    border-radius: 10px;
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                    margin: 0 15px;

                    &:hover{
                        text-decoration: none;
                    }
                }
            }

            input[type="text"] {
                -webkit-appearance: none;
                color: white;
                margin-right: 1px;
                transition: 0.7s ease;
                padding: 5px 8px;
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.8);
                background-color: black;
                text-align: center;
                border: none;
                outline: none;
                border-radius: 10px;
                transition: 0.7s ease;

                &:focus {
                    box-shadow: inset 0 0 5px 1px rgba(255, 255, 255, 0.8);
                }

                &::placeholder {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 15px;
                }
            }

            @media screen and (max-width: 1024px) {
                .play-all {
                    padding: 5px 15px 0 15px;
                }

                input[type="text"] {
                    padding-top: 5px;
                }

                .search-btn {
                    padding: 5px 15px 3px 15px;
                }
            }
        }

        .collect-grid-outer {

            .collect-grid-header {
                display: grid;
                grid-template-columns: 172px 200px 350px auto 100px 100px;
                grid-template-rows: auto;
                color: white;
                font-size: 18px;
                text-align: center;
                text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
                padding: 10px 0 20px 0;
            }

            .collect-grid-body {
                display: grid;
                grid-template-columns: auto;
                grid-template-rows: auto;
                grid-row-gap: 20px;

                .collect-grid {
                    display: grid;
                    grid-template-columns: 172px 200px 350px auto 100px 100px;
                    grid-template-rows: auto;
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 10px;
                    text-align: center;
                    overflow: hidden;
                    box-shadow: 0 0 5px 1px rgba(60, 60, 60, 0.7);
                    transform: scale(1);
                    transition: 0.7s ease;

                    span {
                        display: block;
                        color: black;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding: 35px 5px 35px 5px;

                        &:nth-of-type(1) {
                            position: relative;
                            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                            transition: 0.7s ease;

                            img {
                                width: 100%;
                                position: absolute;
                                top: -18%;
                                left: 0;
                                right: 0;
                                bottom: 0;
                            }
                        }

                        &:nth-of-type(4) {
                            position: relative;
                            cursor: pointer;
                            user-select: none;
                            transition: 0.7s ease;

                            span {
                                position: absolute;
                                transform: translateX(5.5%);
                                top: 70%;
                                left: 50%;
                                width: 0;
                                height: 2px;
                                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                                background-color: rgba(255, 255, 255, 0);
                                transition: 0.7s ease;
                                border-radius: 20px;
                                padding: 0;
                            }

                            &:hover {
                                text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);

                                span {
                                    left: 0%;
                                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.7);
                                    width: 90%;
                                    background-color: rgba(255, 255, 255, 0.7);
                                }
                            }
                        }

                        &:nth-of-type(6) {
                            position: relative;
                            border-radius: 0 10px 10px 0;

                            svg {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                font-size: 20px;
                                transform: translate(-50%, -45%) scale(1);
                                transition: 0.35s ease;
                                cursor: pointer;
                                user-select: none;

                                &:hover {
                                    transform: translate(-50%, -45%) scale(1.5);
                                }
                            }
                        }
                    }

                    &:hover {
                        transform: scale(1.05);
                        box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.7);

                        span{

                            &:nth-of-type(1) {
                                box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.7);
                            }
                        }
                    }

                    &.no-data {
                        display: block;
                        color: white;
                        background-color: transparent;
                        text-align: center;
                        box-shadow: 0 0 0 0 rgba(60, 60, 60, 0.7);
                        padding: 40px 0 20px 0;
                        font-weight: bold;

                        &:hover {
                            transform: unset;
                            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
                        }
                    }
                }
            }
            .collect-grid-footer {
                color: white;
                text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
                padding: 20px 0 10px 0;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                justify-content: flex-end;
            }
        }

        @media screen and (max-width: 768px) {
            .table-outer-rwd {
                .collect-count-outer {
                    display: flex;
                    justify-content: flex-end;
                    color: white;
                    font-size: 18px;
                }

                .collect-list-outer {
                    overflow: hidden;
                    background-color: rgba(255, 255, 255, 0.8);
                    margin: 15px 0 15px 0;
                    border-radius: 10px;
                    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.7),0 0 7px 2px rgba(255, 255, 255, 0.5);

                    .img-outer {
                        overflow: hidden;

                        img {
                            width: 100%;
                            margin: -10% auto;
                        }
                    }
                    .collect-body {
                        line-height: 30px;
                        padding: 4px 10px 4px 10px;
                        box-shadow: inset 0 0 2px 0 rgba(30, 30, 30, 0.7);

                        .col-3 {

                            span {
                                display: block;
                                text-align: center;
                            }
                        }

                        .col-9 {

                            span {
                                display: block;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }
                    }

                    .collect-footer {

                        span {
                            display: block;
                            text-align: center;
                            background-color: red;
                            color: white;
                            padding: 10px 0 10px 0;
                        }
                    }
                }
            }
        }

        .pagination-outer {
            margin: 30px 0 30px 0;

            .page-item {

                .page-link {
                    color: white;
                    z-index: unset !important;
                    background-color: rgba(0, 0, 0, 0.7);
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                    padding: 3px 20px 3px 20px;
                    border-radius: 10px;
                    margin: 0 3px 0 3px;
                    border: none;
                    transition: 0.7s ease;

                    span {
                        display: block;
                        font-size: 11px;
                        padding: 4px 0 3px 0;
                    }

                    &:hover {
                        color: black !important;
                        background-color: rgba(255, 255, 255, 0.9) !important;
                    }
                }

                &:first-child {

                    .page-link {
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        background-color: rgba(150, 150, 150, 0.7);
                    }

                    .page-link-active {
                        background-color: rgba(0, 0, 0, 0.7);
                    }
                }

                &:last-child {

                    .page-link {
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                        background-color: rgba(150, 150, 150, 0.7);
                    }

                    .page-link-active {
                        background-color: rgba(0, 0, 0, 0.7);
                    }
                }
            }

            @media screen and (max-width: 414px) {
                margin: 25px 0 0 0;
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref,onMounted,inject,watch } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from '../../component'
import { ProviderType } from '../../App.vue'
import { returnStoreType,stateType,methodType,paginationObjType,collectTempType } from './types'

export default defineComponent({
    components:{
        Modal
    },
    setup(){
        const { $,setReducer,getReducer,formatLanguage } = inject<ProviderType>('NewProvider')
        const vuex = getReducer<returnStoreType>('HomeReducer',state => ({ ...state }))
        const router = useRouter()

        const state:stateType = {
            collect: ref([]),
            collectTemp: ref([]),
            collectPageTemp: ref([]),
            rwdState: ref(false),
            rwdStateOnPad: ref(false),
            searchText: ref(''),
            searchCount: ref(0),
            message: ref(''),
            hasConfirm: ref(false),
            indexTemp: ref(-1),
            filterArray: ref([]),
            toggleModalStatus: ref(false),
            toggleAlertStatus: ref(false),
            paginationItem: ref({}),
        }

        const method:methodType = {
            paginationPart: pages => {
                const paginationObj:paginationObjType = {}

                paginationObj.totalLength = state.collectTemp.value.length;

                paginationObj.partPage = 8;

                paginationObj.pageTotal = Math.ceil(paginationObj.totalLength / 8);

                pages = pages || 1;

                paginationObj.currentPage = pages;

                paginationObj.beforPage = paginationObj.currentPage > 1;
                
                paginationObj.afterPage = paginationObj.currentPage < paginationObj.totalLength;
                
                if (paginationObj.currentPage === paginationObj.pageTotal) paginationObj.afterPage = false;
                
                if (paginationObj.currentPage > paginationObj.pageTotal) paginationObj.currentPage = paginationObj.pageTotal;

                const minPage = paginationObj.currentPage * paginationObj.partPage - paginationObj.partPage + 1;
                
                const maxPage = paginationObj.currentPage * paginationObj.partPage;

                const partArrayTemp = JSON.parse(JSON.stringify(state.collectTemp.value));

                state.paginationItem.value = paginationObj

                const partArray = $.maps(partArrayTemp,(item:collectTempType,index:number) => (index + 1) >= minPage && (index + 1) <= maxPage && item)
                    .filter((item:collectTempType | boolean) => item !== false) as collectTempType[]
                return partArray
            },
            getCollect: pages => {
                state.collect.value = $.localData('get','item')
                state.collectTemp.value = state.collect.value;

                state.collectTemp.value = method.paginationPart(pages);
            },
            goVideo: (postUrl,id) => {
                const videoItem:string = JSON.stringify($.filter(state.collect.value,((item:collectTempType):any => item.videoID === id)));

                vuex.value.tokenGroup.backName = 'collect'
                setReducer('HomeReducer/setTokenGroup',vuex.value.tokenGroup)

                router.push({
                    name: "video",
                    params: { postUrl, videoItem },
                });
            },
            showDeleteModal: id => {
                state.toggleModalStatus.value = true
                if(state.toggleAlertStatus.value) state.toggleAlertStatus.value = false
                const pos:number = $.findIndexOfObj(state.collect.value,({ videoID }:collectTempType):any => videoID === id)
                const { videoTitle } = state.collect.value[pos]
                state.indexTemp.value = pos
                state.message.value = formatLanguage('pages.collect.deleteBeforeText',{ val:videoTitle })
            },
            deleteCollect: ({ type,status }) => {
                if(type === 'confirm'){
                    if(state.indexTemp.value !== -1){
                        state.collect.value.remove(state.indexTemp.value)
                        state.collectTemp.value = state.collect.value
                        $.localData('set','item',state.collect.value)

                        state.toggleModalStatus.value = status
                        state.indexTemp.value = -1

                        setTimeout(() => {
                            state.toggleAlertStatus.value = true
                        },490)
                        

                        setTimeout(() => {
                            state.toggleModalStatus.value = true
                            state.message.value = formatLanguage('pages.collect.deleteAfterText');
                        },601)

                    } else {
                        state.toggleModalStatus.value = status
                    }
                } else {
                   state.toggleModalStatus.value = status
                   state.indexTemp.value = -1
                }
            }
        }

        watch(state.searchText,val => {
            if (!val) {
                state.searchCount.value = 0;
                state.collectTemp.value = state.collect.value;
                return
            }

            const filterItem:collectTempType[] = $.filter(state.collect.value,({ videoTitle }:collectTempType):any => videoTitle.toLowerCase().match(state.searchText.value))
            state.collectTemp.value = filterItem
            state.searchCount.value = filterItem.length
        })

        onMounted(() => {
            state.rwdState.value = window.innerWidth <= 768
            state.rwdStateOnPad.value = window.innerWidth > 414 && window.innerWidth <= 768
            method.getCollect()
        })

        return { ...state,...method,formatLanguage }
    }
})
</script>