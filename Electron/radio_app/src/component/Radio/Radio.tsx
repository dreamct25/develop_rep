import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TFunction, useTranslation } from 'react-i18next'
import VideoJs, { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.min.css'
import $ from '../../lib/Library'
import { Container } from './styles'
import { initStateType, RadioProps } from './types'
import { postBackItemType, channelItemType, channelRankItemType, programListType } from '../../server/server_api/channel_api'
import Loading from "../Loading/Loading";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import AlertBageText from "../AlertBageText/AlertBageText";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import internetAvailable from 'internet-available'

const Radio: FunctionComponent<RadioProps> = ({ mainInitState, setMainInitStateStatus }: RadioProps): JSX.Element => {
    const [initState, setInitState] = useState<initStateType>({
        player: null,
        radioList: [],
        filterRadioList: [],
        radioRankList: [],
        showfilterRadioList: false,
        showTooltip: false,
        playerVoice: 30,
        currentChannel: '',
        currentSearch: '',
        loadingState: false,
        singleRadioSelect: {},
        alertBageText: '',
        toggleAlertBageText: false,
    })

    const [loadingState, setLoadingState] = useState<boolean>(false)

    const [playState, setPlayState] = useState<boolean>(false)

    const [isKeyDown, setIsKeyDown] = useState<boolean>(false)

    const [[currentDate, currentTime], setCurrentTime] = useState<string[]>($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-ddTHH：mm：ss' }).split('T'))

    const videoRef: React.MutableRefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null)

    const getDateTimer: React.MutableRefObject<any> = useRef<any>(null)

    const { t }: { t: TFunction<"translation", undefined> } = useTranslation()

    const formatLang: TFunction<"translation", undefined> = t

    const route = useHistory()

    if (!navigator.onLine) {
        route.push({ pathname: '/wrong' })
        return
    }

    const {
        player,
        radioList,
        radioRankList,
        filterRadioList,
        showfilterRadioList,
        showTooltip,
        playerVoice,
        currentChannel,
        currentSearch,
        singleRadioSelect,
        alertBageText,
        toggleAlertBageText,
    } = initState

    const getAllChannel: () => void = () => {
        $.fetch({
            method: 'get',
            url: 'http://localhost:9870/channel/get_channel',
            beforePost: () => setLoadingState(true),
            successFn: ({ data }: {
                data: {
                    channels: channelItemType[],
                    rankItem: channelRankItemType[]
                } | string
            }) => {
                if (typeof data !== 'string') {
                    setInitState({
                        ...initState,
                        radioList: data.channels,
                        filterRadioList: data.channels,
                        radioRankList: $.sort(data.rankItem, (a: channelRankItemType, b: channelRankItemType) => $.convert(a.channel_rank, 'number') - $.convert(b.channel_rank, 'number')),
                        showfilterRadioList: true
                    })

                    setLoadingState(false)

                    setMainInitStateStatus({
                        ...mainInitState,
                        topToggleStatus: true,
                        currentPath: '/radio'
                    })
                }
            },
            errorFn: (err: any) => { console.log(err) }
        })
    }

    const seletctChannel: ({ currentChannel, currentId, currentImgUrl }: { currentChannel: string, currentId: string, currentImgUrl: string }, { target }?: React.MouseEvent<HTMLElement>) => void = ({ currentChannel, currentId, currentImgUrl }, { target }) => {
        const mathClassList: string[] = [
            'radio-list-item',
            'img',
            'channel-title',
            'radio-rank-list-item-title',
            'prev-btn',
            'next-btn',
            'fas fa-backward',
            'fas fa-forward'
        ];

        if (currentId === '' && $.includes(mathClassList, (target as Element).className)) {
            $.fetch({
                method: 'post',
                url: 'http://localhost:9870/channel/get_single_channel',
                headers: { "Content-Type": "application/json" },
                data: { selectChannelName: currentChannel },
                beforePost: () => setLoadingState(true),
                successFn: ({ data }: { data: postBackItemType | string }) => {
                    if (typeof data === 'object') {
                        const { radioUrl, radioInfoList: [item] } = data
                        player.src({
                            src: radioUrl,
                            type: "application/x-mpegURL"
                        })
                        player.play()
                        setInitState({
                            ...initState,
                            singleRadioSelect: item,
                            currentChannel: currentChannel
                        })
                        setLoadingState(false)
                    } else {
                        setInitState({ ...initState, currentChannel: currentChannel })
                        setLoadingState(false)
                    }

                },
                errorFn: (err: any) => { console.log(err) }
            })
        } else {
            ((target as Element).className === 'fal fa-heart' || (target as Element).className === 'add-collect-btn') && addCollectToDb({
                channelTitle: currentChannel,
                channelImgUrl: currentImgUrl
            })
        }
    }

    const setCurrentVoice: (voiceVal: string) => void = voiceVal => {
        player.volume(Number(voiceVal) / 100)
        setInitState({ ...initState, playerVoice: $.convert(voiceVal, 'number') })
    }

    const setCurrentSearchs: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void = ({ target: { value } }) => {
        const filterRadioList: channelItemType[] = $.filter(radioList, ({ channel_title }: channelItemType) => channel_title.match(value))
        setInitState({
            ...initState,
            filterRadioList: value === "" ? radioList : filterRadioList,
            currentSearch: value,
        })
    }

    const setCurrentPlayState: (status: boolean) => void = status => {
        setPlayState(status)
        player[!playState ? 'play' : 'pause']()
    }

    const prevOrNext: (type: string, e: React.MouseEvent<HTMLDivElement>) => void = (type, e) => {
        const currentPos: number = $.findIndexOfObj(filterRadioList, ({ channel_title }: channelItemType) => channel_title === currentChannel)
        if (type === 'prev') {
            const posTemp: number = currentPos - 1
            posTemp >= 0 && seletctChannel({
                currentChannel: filterRadioList[posTemp].channel_title,
                currentId: '',
                currentImgUrl: ''
            }, e)
        } else {
            const posTemp: number = currentPos + 1
            posTemp <= filterRadioList.length - 1 && seletctChannel({
                currentChannel: filterRadioList[posTemp].channel_title,
                currentId: '',
                currentImgUrl: ''
            }, e)
        }
    }

    const addCollectToDb: ({ channelTitle, channelImgUrl }: { channelTitle: string, channelImgUrl: string }) => void = ({ channelTitle, channelImgUrl }) => {
        if (channelImgUrl === '') return
        $.fetch({
            method: 'post',
            url: 'http://localhost:9870/db/get_collect_single_item',
            headers: { "Content-Type": "application/json" },
            data: {
                radio_name: channelTitle,
                isSingleCheck: true,
            },
            beforePost: () => setLoadingState(true),
            successFn: (data: { message: string, data?: { [key: string]: any }[], haveTheSame?: boolean }) => {
                if (data.message === 'search success') {
                    data.haveTheSame ? setInitState({
                        ...initState,
                        alertBageText: formatLang('alreadyInCollection'),
                        toggleAlertBageText: true
                    }) : addItem()
                } else {
                    setInitState({
                        ...initState,
                        alertBageText: data.message,
                        toggleAlertBageText: true
                    })
                }
                setLoadingState(false)
            },
            errorFn: (err: any) => { console.log(err) }
        })

        const addItem: () => void = () => $.fetch({
            method: 'post',
            url: 'http://localhost:9870/db/add_item',
            headers: { "Content-Type": "application/json" },
            data: {
                radio_name: channelTitle,
                radio_img_url: channelImgUrl
            },
            beforePost: () => setLoadingState(true),
            successFn: ({ message }: { message: string }) => {
                if (message === 'add success') {
                    setInitState({
                        ...initState,
                        alertBageText: formatLang('addSuccess'),
                        toggleAlertBageText: true
                    })
                } else {
                    setInitState({
                        ...initState,
                        alertBageText: message,
                        toggleAlertBageText: true
                    })
                }
                setLoadingState(false)
            },
            errorFn: (err: any) => { console.log(err) }
        })
    }

    const countCurrentTimeIsPlay: (startTime: string, endTime: string) => boolean = (startTime, endTime) => {
        const [date, time]: string[] = new Date(+new Date() + (8 * 60 * 60 * 1000)).toJSON().split('T')
        const matchTime = +new Date([date, startTime].join(" ")) <= +new Date([date, time.split('.')[0]].join(" ")) && +new Date([date, time.split('.')[0]].join(" ")) <= +new Date([date, endTime].join(" "))
        return matchTime
    }

    const toggleRightList: () => void = () => {
        setMainInitStateStatus({ ...mainInitState, topToggleStatus: !mainInitState.topToggleStatus })
        setInitState({ ...initState, showfilterRadioList: !showfilterRadioList })
    }

    const toggleTooltip: (status: boolean) => void = status => setInitState({ ...initState, showTooltip: status })

    const setGetDateTimer: (status: boolean) => void = status => {
        if (status) {
            if (getDateTimer.current === null) getDateTimer.current = setInterval(() => setCurrentTime($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-ddTHH：mm：ss' }).split('T')), 1000)
        } else {
            clearInterval(getDateTimer.current)
        }
    }

    const whenInputTypeing: (status: boolean) => void = status => setIsKeyDown(status)

    const whenKeyDown: ({ keyCode }: KeyboardEvent) => void = ({ keyCode }) => {
        if (!isKeyDown) {
            const keyCodeSet: { [key: string]: any } = {
                '32': (): void => setCurrentPlayState(!playState),
                '38': (): void => setCurrentVoice(`${playerVoice === 100 ? playerVoice : playerVoice + 1}`),
                '40': (): void => setCurrentVoice(`${playerVoice === 0 ? playerVoice : playerVoice - 1}`)
            }
            keyCodeSet[$.convert(keyCode, 'string')]()
        }
    }

    useEffect(() => {
        if (toggleAlertBageText) {
            setTimeout(() => {
                setInitState({ ...initState, toggleAlertBageText: false })
            }, 1200);
        }
    }, [toggleAlertBageText])

    useEffect(() => {
        if (player === null) {
            const videoJs: VideoJsPlayer = VideoJs(videoRef.current, {
                defaultVolume: playerVoice / 100,
                autoplay: false,
                controls: false,
            })

            videoJs.on('loadstart', () => setLoadingState(true))
            videoJs.on('loadeddata', () => setLoadingState(false))
            videoJs.on('playing', () => {
                setPlayState(true)
                setLoadingState(false)
            })
            videoJs.on('waiting', () => {
                setLoadingState(true)
                setPlayState(false)
            })

            setInitState({ ...initState, player: videoJs })
        }
    }, [player])

    useEffect(() => {
        setGetDateTimer(Object.keys(singleRadioSelect).length > 0)
    }, [singleRadioSelect])

    useEffect(() => {
        setMainInitStateStatus({ ...mainInitState, currentPath: '/radio' })
        getAllChannel()
        return () => setGetDateTimer(false)
    }, [])

    $(window).on('keydown', whenKeyDown)

    return (
        <Container>
            <div className={showfilterRadioList ? "radio-list-outer-frame toggle" : "radio-list-outer-frame"}>
                <div className="search-radio-outer">
                    <input
                        type="text"
                        value={currentSearch}
                        placeholder={formatLang('searchRadio')}
                        onChange={setCurrentSearchs}
                        onFocus={whenInputTypeing.bind(this, true)}
                        onBlur={whenInputTypeing.bind(this, false)}
                    />
                </div>
                <div className="radio-list-outer">
                    {filterRadioList.length > 0 ? $.maps(filterRadioList, ({
                        channel_title,
                        channel_id,
                        channel_image
                    }: channelItemType) => (
                        <div
                            className="radio-list-item"
                            key={channel_id}
                            onClick={seletctChannel.bind(this, {
                                currentChannel: channel_title,
                                currentId: '',
                                currentImgUrl: ''
                            })}
                        >
                            <div className="img-outer">
                                <div className="img" style={{ backgroundImage: `url('https://hichannel.hinet.net/upload/radio/channel/${channel_image}')` }}></div>
                                <div className="radio-title">{channel_title}</div>
                                <div className="add-collect-btn" onClick={seletctChannel.bind(this, {
                                    currentChannel: channel_title,
                                    currentId: channel_id,
                                    currentImgUrl: `https://hichannel.hinet.net/upload/radio/channel/${channel_image}`
                                })}>
                                    <i className="fal fa-heart"></i>
                                </div>
                                <div className={currentChannel === channel_title && playState === true ? "is-playing-frame toggle" : "is-playing-frame"}>
                                    <i className="fas fa-volume"></i>
                                </div>
                            </div>
                        </div>
                    )) : <div className="no-data">
                        <div>-- {formatLang('noSearchResults')} --</div>
                    </div>}
                </div>
            </div>
            <div className={showfilterRadioList ? "radio-rank-list-outer-frame toggle" : "radio-rank-list-outer-frame"}>
                <div className="radio-rank-list-title">{formatLang('topRadioRack')}</div>
                <div className="radio-rank-list-item-outer-frame">
                    <div className="radio-rank-list-item-outer">
                        {radioRankList.length > 0 && $.maps(radioRankList, ({
                            channel_title,
                            channel_id,
                            channel_rank
                        }: channelRankItemType) => (
                            <div
                                className="radio-rank-list-item"
                                key={channel_id}
                                onClick={seletctChannel.bind(this, {
                                    currentChannel: channel_title,
                                    currentId: '',
                                    currentImgUrl: ''
                                })}
                            >
                                <div className="radio-rank-list-item-title">No.{$.convert(channel_rank, 'number') < 10 ? `0${channel_rank}` : channel_rank}&nbsp;&nbsp;{channel_title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={showfilterRadioList ? "radio-center-outer toggle" : "radio-center-outer"}>
                <div className="radio-content">
                    <div className="single-radio-header">
                        <span>{singleRadioSelect.title}</span>
                        <div
                            className={showfilterRadioList ? "toggle-right-list active" : "toggle-right-list"}
                            onClick={toggleRightList.bind(this)}
                            onMouseEnter={toggleTooltip.bind(this, true)}
                            onMouseLeave={toggleTooltip.bind(this, false)}
                        >
                            <div className={showfilterRadioList ? "toggle-button active" : "toggle-button"}></div>
                            <div className={showTooltip ? "tooltip active" : "tooltip"}>{formatLang(showfilterRadioList ? 'closeFunctionList':'openFunctionList')}</div>
                        </div>
                    </div>
                    <div className="single-radio-body">
                        {currentChannel === '' && <div className="at-start-tipe">請點擊黑框內右上角開起功能選單，並選擇要收聽的電台</div>}
                        <div className="radio-controller" style={{ display: currentChannel !== '' ? 'block' : 'none' }}>
                            <AudioPlayer
                                audioPlayerProps={{
                                    audioPlayer: videoRef,
                                    audioVoice: playerVoice,
                                    audioState: playState,
                                    setCurrentVoice: setCurrentVoice,
                                    setCurrentPlayState: setCurrentPlayState,
                                    prevOrNext: prevOrNext,
                                }}
                            />
                        </div>
                        <span className="current-program-date">{('showDate' in singleRadioSelect) && currentDate}&nbsp;&nbsp;{('showDate' in singleRadioSelect) && currentTime}</span>
                        <span>{singleRadioSelect.desc}</span>
                        {'programList' in singleRadioSelect && <div className="current-play-time-list-outer">
                            <div className="current-play-time-list-title">
                                <span>{formatLang('radioProgramList')}</span>
                                <span className="current-program-name">{$.maps(singleRadioSelect.programList, ({ start_time, end_time, name, on }: programListType) => (countCurrentTimeIsPlay(start_time, end_time) && on && formatLang('currentProgram',{ program : name })))}</span>
                            </div>
                            <div className="current-play-time-list">
                                {$.maps(singleRadioSelect.programList, ({ start_time, end_time, name, on }: programListType, index: number) => (
                                    on ?
                                        <div
                                            className={countCurrentTimeIsPlay(start_time, end_time) ? "current-play-time-list-item active" : "current-play-time-list-item"}
                                            key={index}
                                        >
                                            {start_time} ～ {end_time}&nbsp;&nbsp;&nbsp;{name}
                                        </div> :
                                        <div
                                            className="current-play-time-list-item already-play"
                                            key={index}
                                        >
                                            {start_time} ～ {end_time}&nbsp;&nbsp;&nbsp;{name}
                                        </div>

                                ))}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <AlertBageText text={alertBageText} toggleState={toggleAlertBageText} />
            <Loading loadingState={loadingState} />
        </Container>
    )
}

export default React.memo(Radio)