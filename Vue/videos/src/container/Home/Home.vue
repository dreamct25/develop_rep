<template lang="pug">
.page-outer
    .container-fluid
        .row.no-gutters
            .col-lg-3.col-md-4(v-for="(items,index) in youtubeData",:key="index")
                .video-list-outer
                    .video-img-outer
                        img(:src="items.videoImgUrl")
                        span {{ items.videoResolution }}
                        span {{ items.videoDuration }}
                    .video-text
                        .video-text-header
                            span(class="video-name",@click="goVideo(items.videoID)",:title="items.videoTitle") {{ items.videoTitle }}
                            span(class="stars",
                                :class="{ 'stars-active': items.haveCollect }",
                                @click="setCollect(items)"
                            )
                                icon(icon="fa-solid fa-star")
                        .video-text-body
                            span {{ items.videoChannelTitle }}
                        .video-text-footer
                            span {{ items.videoUploadDate }}
                            span {{ formatLanguage('pages.home.views') }}：{{ formatLanguage(`pages.home.${items.videoViewsTimes.split('_').length > 2 ? 'viewTimesM' : 'viewTimes'}`,{ val:items.videoViewsTimes.replace(/_/g,'') }) }}
                            
    .btn-group(v-for="(page,index) in pagesToken",:key="index")
        .prev(
            v-if="page.prev",
            :class="{ 'btn-active':prevAnimate }",
            @click="getYoutube(searchText,page.prev, 'prev')"
        ) {{ formatLanguage('pages.home.prevPage') }}
        .next(
            v-if="page.next",
            :class="{ 'btn-active':nextAnimate }",
            @click="getYoutube(searchText,page.next, 'next')"
        ) {{ formatLanguage('pages.home.nextPage') }}
    .collect-alert-text(:class="{ 'collect-alert-text-toggle':toggleCollectAlert }") {{ collectAlertText }}
</template>
<style lang="scss" scoped>
    .page-outer {
        padding: 25px 10px;
        .video-list-outer {
            overflow: hidden;
            margin: 10px;
            color: white;
            background-color: rgb(60, 60, 60);
            border-radius: 10px;
            transition: 0.7s ease;
            transform: scale(1);
            box-shadow: 0 0 3px 1px rgba(30, 30, 30, 0.7);
            opacity: 0;
            animation: video-show 1s linear forwards;

            @keyframes video-show {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }

             @media screen and (min-width: 768px) {
                &:hover {
                    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
                    transform: scale(1.05);

                    .video-img-outer {
                        img {
                            transform: scale(1.5);
                        }
                    }
                }
            }

            span {
                display: block;
                padding: 0 8px 0 8px;
            }

            .video-img-outer {
                overflow: hidden;
                position: relative;

                img {
                    margin: -10% 0;
                    width: 100%;
                    height: 100%;
                    transform: scale(1);
                    transition: 20s ease;
                }

                span{

                    &:nth-of-type(1) {
                        padding: 0 8px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: rgba(0, 0, 0, 0.7);
                        color: white;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                        transform: translate(-20%, 30%);
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        border-radius: 5px;
                    }

                    &:nth-of-type(2) {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        transform: translate(1%, 5%);
                        padding: 3px 8px 2px 8px;
                        border-radius: 5px 0 0 0;
                        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                        background-color: rgba(0, 0, 0, 0.7);
                        color: white;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
            }

            .video-text {
                padding: 8px;
                line-height: 30px;
                border-top: 1px solid rgba(255, 255, 255, 0.7);

                span {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .video-text-header {
                    display: flex;
                    justify-content: space-between;
                    span{

                        &:nth-of-type(1) {
                            width: unset;
                            cursor: pointer;
                            user-select: none;
                            color: white;
                            font-weight: bold;
                            transition: 0.7s ease;

                            &:hover{
                                cursor: pointer;
                                user-select: none;
                                color: rgb(0, 255,255);
                            }
                        }

                        &:nth-of-type(2) {
                            width: unset;
                            display: block;
                            overflow: unset;
                            text-overflow: unset;
                            -webkit-line-clamp: unset;
                            -webkit-box-orient: unset;
                            cursor: pointer;
                            user-select: none;
                            transition: 0.7s ease;

                            &.stars-active {
                                color: yellow;
                            }
                        }

                        
                    }
                }

                .video-text-body {

                    span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    }
                }

                .video-text-footer {
                    display: flex;
                    justify-content: space-between;

                    span{
                        &:nth-of-type(1) {
                            text-align: left;
                        }

                        &:nth-of-type(2) {
                            text-align: right;
                        }

                        .text-right {
                            text-align: right !important;
                        }
                    }
                }
            }
        }
        
        .btn-group {
            display: flex;
            justify-content: center;
            margin: 15px auto 0 auto;

            .prev,
            .next {
                margin: 0 5px;
                padding: 3px 45px;
                color: white;
                background-color: black;
                border-radius: 5px;
                font-size: 20px;
                cursor: pointer;
                user-select: none;
                transition: 0.5s ease;
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                    0 0 0 0 rgba(255, 255, 255, 0.7);

                &.btn-active {
                    color: black;
                    box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.7),
                        0 0 3px 0 rgba(255, 255, 255, 0.7);
                    background-color: white;
                }
            }
        }
        
        .collect-alert-text {
            border-radius: 5px;
            box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
            padding: 6px 15px 5px 15px;
            background-color: white;
            opacity: 0;
            transition: 0.7s ease;
            color: black;
            position: fixed;
            z-index: -1;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 18px;
            font-weight: bold;

            &.collect-alert-text-toggle {
                opacity: 1;
                z-index: 3;
                top: 2%;
            }

            @media screen and (max-width: 414px) {
                left: 0;
                right: 0;
                transform: unset;
                margin: 0 9px;
                text-align: center;

                &.collect-alert-text-toggle {
                    top: 1%;
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,onMounted,Ref,ref,inject,watch } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderType } from '../../App.vue'
import {
    youtubeVideosDataType,
    youtubeVideosObj,
    youtubeVideoSingleDataType,
    youtubeSingleDataTempType,
    youtubeVideoSingleObj,
    returnStoreType,
    collectDataType,
    stateType,
    methodType
} from '.'

export default defineComponent({
    setup(){
        const { $,setReducer,getReducer,formatLanguage } = inject<ProviderType>('NewProvider')
        const router = useRouter()

        const vuex = getReducer<returnStoreType>('HomeReducer',state => ({ ...state }))

        const state:stateType = {
            searchText: ref(''),
            youtubeDataTemp: ref([]),
            youtubeData: ref([]),
            collectTemp: ref([]),
            pagesToken: ref([]),
            prevAnimate: ref(false),
            nextAnimate: ref(false),
            toggleCollectAlert: ref(false),
            collectAlertText: ref(''),
            currentToken: ref({
                token: undefined,
                tokenStr: undefined,
                backName: "",
            }),
        }

        const method:methodType = {
            videoTimeFormat: timeText => {
                const timeTextTemp = timeText.replace(/PT/g,'').replace(/S/g,'').replace(/M/g,':').replace(/H/g,':').split(':')
                
                const durationFormat = $.maps(timeTextTemp,num => parseInt(num) < 10 ? `0${num}` : num ? num : '00') as string[]

                return {
                    '1': `00 : ${durationFormat.join('')}`,
                    '2': durationFormat.join(' : '),
                    '3': durationFormat.join(' : ').slice(1,durationFormat.join(' : ').length)
                }[durationFormat.length.toString()]
            },
            dateTimeFormat:dateText => $.formatDateTime({ formatDate:dateText,formatType:'yyyy-MM-dd' }) as string,
            viewTimesFormat:num => parseInt(num) >= 10000 ?  `${num.slice(0, num.toString().length - 4)}__` : `${num}_`,
            textFormat:text => text.replace(/(?:\r\n|\r|\n)/g, "<br/>"),
            goVideo:id => {
                const postUrl = `http://www.youtube.com/watch?v=${id}`;
                const videoItem = $.filter(state.youtubeData.value,((item:any):any => item.videoID === id));

                setReducer('HomeReducer/setTokenGroup',state.currentToken)

                router.push({
                    name:'video',
                    params: { postUrl, videoItem:JSON.stringify(videoItem) }
                })
            },
            getSearch:(haveToken, searchText) => {
                state.pagesToken.value = [];

                $.fetch.get<youtubeVideosDataType>(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${searchText}&pageToken=${haveToken.replace(/&pageToken=/, "")}&maxResults=12&key=${process.env.API_KEY}`)
                    .then((res) => {
                        const { nextPageToken:next,prevPageToken:prev } = res.data

                        method.getSearchSingleDetails(res.data.items)

                        state.pagesToken.value = [...state.pagesToken.value,{ prev,next }]
                    });
            },
            getSearchSingleDetails: data => {
                state.youtubeDataTemp.value = []
                state.youtubeData.value = []

                const promisArr = $.maps(data, ({ id:{ videoId }}:youtubeVideosObj) => $.fetch.get<youtubeVideoSingleDataType>(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${process.env.API_KEY}`).then(res => res.data)) as Promise<youtubeVideoSingleDataType>[]

                $.createPromiseAll(promisArr as any).then((resDatas:[youtubeVideoSingleDataType]) => {
                    state.youtubeDataTemp.value = $.maps(resDatas,({ items }:youtubeVideoSingleDataType) => {
                        const [obj] = items

                        return items.length > 0 && {
                            videoChannelID:obj?.snippet.channelId,
                            videoChannelTitle:obj?.snippet.channelId,
                            videoID:obj?.id,
                            videoResolution:obj?.contentDetails.definition.toUpperCase(),
                            videoImgUrl:obj?.snippet.thumbnails.high?.url,
                            videoTitle:obj?.snippet.localized.title,
                            videoDesc:method.textFormat(obj?.snippet.localized.description),
                            videoDuration:method.videoTimeFormat(obj?.contentDetails.duration),
                            videoUploadDate:method.dateTimeFormat(obj?.snippet.publishedAt),
                            videoViewsTimes:method.viewTimesFormat(obj?.statistics.viewCount),
                            haveCollect:false
                        }
                    }).filter((item:youtubeSingleDataTempType | boolean) => item !== false)

                    state.youtubeData.value = $.maps(state.youtubeDataTemp.value,(row:youtubeSingleDataTempType) => {
                        const [filterItem]:youtubeSingleDataTempType[] = $.filter(state.collectTemp.value,(item: youtubeSingleDataTempType): any => item.videoID === row.videoID) as any
                        row.haveCollect = filterItem ? true : row.haveCollect
                        return row
                    }) as youtubeSingleDataTempType[]
                })
            },
            setCollect: obj => {
                const { videoImgUrl,videoID,videoTitle,videoChannelTitle,videoViewsTimes,videoDesc } = obj
            
                const pos = $.findIndexOfObj(state.collectTemp.value,(collect:youtubeSingleDataTempType):any => collect.videoID === videoID)

                if(pos === -1){
                    state.collectTemp.value = [
                        ...state.collectTemp.value,
                        {
                            videoImgUrl,
                            videoID,
                            videoUrl:`http://www.youtube.com/watch?v=${videoID}`,
                            videoTitle,
                            videoChannelTitle,
                            videoViewsTimes,
                            videoDesc,
                            videoCurrentPlay: false
                        }
                    ]
                } else {
                    state.collectTemp.value.splice(pos,1)
                }

                state.collectAlertText.value = formatLanguage(pos === -1 ? 'pages.home.hasAddedToCollection' : 'pages.home.hasRemoveFromCollection')
                state.toggleCollectAlert.value = true

                setTimeout(() => state.toggleCollectAlert.value = false,800);

                state.youtubeData.value = $.maps(state.youtubeData.value,(row:youtubeSingleDataTempType) => {
                    const [filterItem]:youtubeSingleDataTempType[] = $.filter(state.collectTemp.value,(item: collectDataType): any => item.videoID === row.videoID) as any
                    row.haveCollect = filterItem ? true : false
                    return row
                }) as youtubeSingleDataTempType[]

                localStorage.setItem("item", JSON.stringify(state.collectTemp.value));
                state.collectTemp.value = JSON.parse(localStorage.getItem("item")) || [];
            },
            tokenOption: (token,tokenStr) => {
                state.currentToken.value = { token,tokenStr,backName: 'home'}

                return {
                    [tokenStr]:'',
                    prev:((str:string) => {
                        state.prevAnimate.value = true;
                        setTimeout(() => (state.prevAnimate.value = false), 500);
                        return `${str}=${token}`
                    })('&pageToken'),
                    next:((str:string) => {
                        state.nextAnimate.value = true;
                        setTimeout(() => (state.nextAnimate.value = false), 500);
                        return `${str}=${token}`
                    })('&pageToken')
                }[tokenStr]
            },
            getYoutube:(searchText,token,tokenStr) => {
                const haveToken = method.tokenOption(token, tokenStr);

                if (searchText) {
                    method.getSearch(haveToken, searchText);
                    return;
                }

                $.fetch.get<youtubeVideoSingleDataType>(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=12&regionCode=us&videoCategoryId=10${haveToken}&key=${process.env.API_KEY}`).then(res => {
                    const { items,prevPageToken:prev,nextPageToken:next } = res.data
                    state.youtubeDataTemp.value = []
                    state.youtubeData.value = []
                    state.pagesToken.value = []

                    const datas = $.maps(items,({ id,snippet,contentDetails,statistics }:youtubeVideoSingleObj) => ({
                        videoChannelID: snippet.channelId,
                        videoChannelTitle: snippet.channelTitle,
                        videoID: id,
                        videoResolution: contentDetails.definition.toUpperCase(),
                        videoImgUrl: snippet.thumbnails.high.url,
                        videoTitle: snippet.localized.title,
                        videoDesc: method.textFormat(snippet.localized.description),
                        videoDuration: method.videoTimeFormat(contentDetails.duration),
                        videoUploadDate: method.dateTimeFormat(snippet.publishedAt),
                        videoViewsTimes: method.viewTimesFormat(statistics.viewCount),
                        haveCollect: false,
                    })) as youtubeSingleDataTempType[]

                    state.pagesToken.value = [{ prev,next }]

                    state.youtubeDataTemp.value = [...state.youtubeDataTemp.value,...datas]
                
                    state.youtubeData.value = $.maps(state.youtubeDataTemp.value,(row:youtubeSingleDataTempType) => {
                        const [filterItem]:youtubeSingleDataTempType[] = $.filter(state.collectTemp.value,(item: youtubeSingleDataTempType): any => item.videoID === row.videoID) as any
                        row.haveCollect = filterItem ? true : row.haveCollect
                        return row
                    }) as youtubeSingleDataTempType[]
                })
                
                $("html, body").scrollToTop({ scrollTop:0,duration:1000 });
            }
        }

        watch(vuex,item => {
            const { searchText } = item
            state.searchText.value = searchText
        })

        watch(state.searchText,val => {
            method.getYoutube(val,state.currentToken.value.token, state.currentToken.value.tokenStr);
        })

        onMounted(() => {
            if (vuex.value.tokenGroup.token) {
                state.currentToken.value.token = vuex.value.tokenGroup.token;
                state.currentToken.value.tokenStr = vuex.value.tokenGroup.tokenStr;
            }

            state.collectTemp.value = $.localData('get','item')
            method.getYoutube(vuex.value.searchText,state.currentToken.value.token, state.currentToken.value.tokenStr);
        })

        return { ...state,...method,formatLanguage }
    }
})
</script>