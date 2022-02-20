import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation, TFunction } from "react-i18next";
import VideoJs from 'video.js'
import 'video.js/dist/video-js.min.css'
import $ from '../../lib/Library'
import { Container } from './styles'
import { collectItem, initStateType, alertBageType, RadioCollectProps } from './types'
import { postBackItemType, programListType } from '../../server/server_api/channel_api';
import Loading from "../Loading/Loading";
import AlertBageText from "../AlertBageText/AlertBageText";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Modal from "../Modal/Modal";

const RadioCollect: FunctionComponent<RadioCollectProps> = ({ 
    routeProps,
    language,
    setMainInitStateStatus 
}: RadioCollectProps): JSX.Element => {
    const [{
        collectData,
        filterCollectList,
        singleRadioSelect,
        showCollectList,
        showTooltip,
        currentChannel,
        player,
        playerVoice,
        deleteIdTemp,
        deleteItemTextTemp,
        currentSearch
    }, setInitState] = useState<initStateType>({
        collectData: [],
        filterCollectList: [],
        showCollectList: false,
        showTooltip: false,
        singleRadioSelect: {},
        player: null,
        playerVoice: 30,
        playState: false,
        currentChannel: '',
        deleteIdTemp: 0,
        deleteItemTextTemp: '',
        currentSearch: ''
    })

    const [{
        alertBageText,
        toggleAlertBageText
    }, setAlertBageGroup] = useState<alertBageType>({
        alertBageText: '',
        toggleAlertBageText: false
    })

    const [playState, setPlayState] = useState<boolean>(false)

    const [loadingState, setLoadingState] = useState<boolean>(false)

    const [toggleModal, setToggleModal] = useState<boolean>(false)

    const [isKeyDown, setIsKeyDown] = useState<boolean>(false)

    const [[currentDate, currentTime], setCurrentTime] = useState<string[]>($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-ddTHH：mm：ss' }).split('T'))

    const videoRef: React.MutableRefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null)

    const getDateTimer: React.MutableRefObject<any> = useRef<any>(null)

    const { t }: { t: TFunction<"translation", undefined> } = useTranslation()

    const formatLanguage: TFunction<"translation", undefined> = t

    if (!navigator.onLine) {
        routeProps.history.push({ pathname: '/wrong' })
        return
    }

    const getCollectData: () => void = () => {
        $.fetch({
            method: 'get',
            url: 'http://localhost:9870/db/get_collect_item',
            beforePost: () => setLoadingState(true),
            successFn: (data: collectItem[]) => {
                setInitState(initState => ({
                    ...initState,
                    collectData: data,
                    filterCollectList: data,
                    showCollectList: true,
                }))
                setMainInitStateStatus(mainInitState => ({
                    ...mainInitState,
                    topToggleStatus: true,
                    currentPath: routeProps.location.pathname
                }))
                setLoadingState(false)
            },
            errorFn: (err: any) => console.log(err)
        })
    }

    const delectColletcItem: (uuid: number) => void = uuid => {
        $.fetch({
            method: 'post',
            url: 'http://localhost:9870/db/delete_item',
            contentType: 'application/json',
            data: { uuid: uuid },
            beforePost: () => setLoadingState(true),
            successFn: ({ message }: { message: string }) => {
                if (message === 'delete success') {

                    setTimeout(() => {
                        setAlertBageGroup({
                            alertBageText: formatLanguage('deleteSuccess'),
                            toggleAlertBageText: true
                        })
                        getCollectData()
                    }, 650);

                } else {
                    setAlertBageGroup({
                        alertBageText: message,
                        toggleAlertBageText: true
                    })
                }
                setLoadingState(false)
            },
            errorFn: (err: any) => console.log(err)
        })
    }

    const selectCurrentChannel: (channelName: string, { target }: React.MouseEvent<HTMLElement>) => void = (channelName, { target }) => {
        ((target as Element).className === 'img') && $.fetch({
            method: 'post',
            url: 'http://localhost:9870/channel/get_single_channel',
            contentType: 'application/json',
            data: { selectChannelName: channelName },
            beforePost: () => setLoadingState(true),
            successFn: ({ data }: { data: postBackItemType | string }) => {
                if (typeof data === 'object') {
                    const { radioUrl, radioInfoList: [item] } = data
                    player.src({
                        src: radioUrl,
                        type: "application/x-mpegURL"
                    })
                    player.play()
                    setInitState(initState => ({
                        ...initState,
                        singleRadioSelect: item,
                        currentChannel: channelName,
                    }))
                    setLoadingState(false)
                } else {
                    setInitState(initState => ({ ...initState, currentChannel: channelName }))
                    setLoadingState(false)
                }

            },
            errorFn: (err: any) => { console.log(err) }
        })
    }

    const setCurrentVoice: (voiceVal: string) => void = voiceVal => {
        player.volume(Number(voiceVal) / 100)
        setInitState(initState => ({ ...initState, playerVoice: $.convert(voiceVal, 'number') }))
    }

    const setCurrentPlayState: (status: boolean) => void = status => {
        setPlayState(status)
        player[!playState ? 'play' : 'pause']()
    }

    const controlModal: (...parameters: any[]) => void = (...parameters) => {
        const [status, deleteId, deleteItemText] = parameters
        setInitState(initState => ({
            ...initState,
            deleteIdTemp: deleteId,
            deleteItemTextTemp: deleteItemText
        }))
        setToggleModal(status)
    }

    const setToggleModalFn: (status: boolean, method: string) => void = (status, method) => {
        if (method === 'confirm') {
            delectColletcItem(deleteIdTemp)
            setToggleModal(status)
        } else if (method === 'cancel') {
            setToggleModal(status)
        }
    }

    const prevOrNext: (type: string, e: React.MouseEvent<HTMLElement>) => void = (type, e) => {
        const currentPos: number = $.findIndexOfObj(filterCollectList, ({ radio_name }: collectItem) => radio_name === currentChannel)
        if (type === 'prev') {
            const posTemp: number = currentPos - 1
            posTemp >= 0 && selectCurrentChannel(filterCollectList[posTemp].radio_name, e)
        } else {
            const posTemp: number = currentPos + 1
            posTemp <= filterCollectList.length - 1 && selectCurrentChannel(filterCollectList[posTemp].radio_name, e)
        }
    }

    const toggleFunctionList: () => void = () => {
        setInitState(initState => ({ ...initState, showCollectList: !showCollectList }))
        setMainInitStateStatus(mainInitState => ({ ...mainInitState, topToggleStatus: !mainInitState.topToggleStatus }))
    }

    const toggleTooltip: (status: boolean) => void = status => setInitState(initState => ({ ...initState, showTooltip: status }))

    const countCurrentTimeIsPlay: (startTime: string, endTime: string) => boolean = (startTime, endTime) => {
        const [date, time]: string[] = new Date(+new Date() + (8 * 60 * 60 * 1000)).toJSON().split('T')
        const matchTime = +new Date([date, startTime].join(" ")) <= +new Date([date, time.split('.')[0]].join(" ")) && +new Date([date, time.split('.')[0]].join(" ")) <= +new Date([date, endTime].join(" "))
        return matchTime
    }

    const setCurrentSearchs: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void = ({ target: { value } }) => {
        const filterRadioList: collectItem[] = $.filter(collectData, ({ radio_name }: collectItem) => radio_name.match(value))

        setInitState(initState => ({
            ...initState,
            filterCollectList: value === "" ? collectData : filterRadioList,
            currentSearch: value
        }))
    }

    const setGetDateTimer: (status: boolean) => void = status => {
        if (status) {
            if (getDateTimer.current === null) getDateTimer.current = setInterval(() => setCurrentTime($.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-ddTHH：mm：ss' }).split('T')), 1000)
        } else {
            clearInterval(getDateTimer.current)
        }
    }

    const whenInputTypeing: (status: boolean) => void = status => setIsKeyDown(status)

    const whenKeyDown: ({ keyCode }: KeyboardEvent) => void = ({ keyCode }) => {
        const numCode:number[] = [32,38,40]
        if (!$.includes(numCode,keyCode)) return
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
        toggleAlertBageText && setTimeout(() => setAlertBageGroup(alertBageState => ({ ...alertBageState, toggleAlertBageText: false })), 1000);
    }, [toggleAlertBageText])

    useEffect(() => {
        if (player === null) {
            const videoJs = VideoJs(videoRef.current, {
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

            setInitState(initState => ({ ...initState, player: videoJs }))
        }
    }, [player])

    useEffect(() => {
        setGetDateTimer(Object.keys(singleRadioSelect).length > 0)
    }, [singleRadioSelect])

    useEffect(() => {
        getCollectData()
        return () => setGetDateTimer(false)
    }, [])

    $(window).on('keydown', whenKeyDown)

    return (
        <Container>
            <div className={showCollectList ? "collect-radio-center-outer toggle" : "collect-radio-center-outer"}>
                <div className="collect-radio-content">
                    <div className="colletct-single-radio-header">
                        <span>{singleRadioSelect.title}</span>
                        <div
                            className={showCollectList ? "toggle-right-list active" : "toggle-right-list"}
                            onClick={toggleFunctionList.bind(this)}
                            onMouseEnter={toggleTooltip.bind(this, true)}
                            onMouseLeave={toggleTooltip.bind(this, false)}
                        >
                            <div className={showCollectList ? "toggle-button active" : "toggle-button"}></div>
                            <div className={showTooltip ? `tooltip-${language} active` : `tooltip-${language}`}>{ formatLanguage(showCollectList ? 'closeFunctionList' : 'openFunctionList')}</div>
                        </div>
                    </div>
                    <div className="colletct-single-radio-body">
                        <div className="colletct-radio-controller">
                            {currentChannel === '' && <div className="at-start-tipe">{formatLanguage('radioDesc')}</div>}
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
                        </div>
                        <span className="current-program-date">{('showDate' in singleRadioSelect) && currentDate}&nbsp;&nbsp;{('showDate' in singleRadioSelect) && currentTime}</span>
                        <span>{singleRadioSelect.desc}</span>
                        {'programList' in singleRadioSelect && <div className="current-play-time-list-outer">
                            <div className="current-play-time-list-title">
                                <span>{formatLanguage('radioProgramList')}</span>
                                <span className="current-program-name">
                                    {$.maps(singleRadioSelect.programList, ({ start_time, end_time, name, on }: programListType) => (countCurrentTimeIsPlay(start_time, end_time) && on && formatLanguage('currentProgram',{ program : name})))}
                                </span>
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
            <div className={showCollectList ? "collect-list-outer-frame toggle" : "collect-list-outer-frame"}>
                <div className="search-collect-radio-outer">
                    <input
                        type="text"
                        value={currentSearch}
                        placeholder={formatLanguage('searchCollectionRadio')}
                        onChange={setCurrentSearchs}
                        onFocus={whenInputTypeing.bind(this, true)}
                        onBlur={whenInputTypeing.bind(this, false)}
                    />
                </div>
                <div className="collect-list-outer">
                    {filterCollectList.length > 0 ? filterCollectList.map(({ uuid, radio_name, radio_img_url, create_date }: collectItem) => (
                        <div className="collect-list-item" key={create_date} onClick={selectCurrentChannel.bind(this, radio_name)}>
                            <div className="img-outer">
                                <div className="img" style={{ backgroundImage: `url(${radio_img_url})` }}></div>
                                <div className="radio-title">{radio_name}</div>
                                <div className="delete-collect-btn" onClick={controlModal.bind(this, true, uuid, radio_name)}>
                                    <i className="fal fa-trash-alt"></i>
                                </div>
                                <div className={currentChannel === radio_name && playState === true ? "is-playing-frame toggle" : "is-playing-frame"}>
                                    <i className="fas fa-volume"></i>
                                </div>
                            </div>
                        </div>
                    )) : <div className="no-data">
                        <div>-- {formatLanguage('noSearchResults')} --</div>
                    </div>}
                </div>
            </div>
            <Modal modalProps={{
                modalTitle: formatLanguage('message'),
                toggleModal: toggleModal,
                setToggleModal: setToggleModalFn,
                renderText: formatLanguage('doYouWantToDelete',{ itemName: deleteItemTextTemp})
            }} />
            <AlertBageText text={alertBageText} toggleState={toggleAlertBageText} />
            <Loading loadingState={loadingState} />
        </Container>
    )
}

export default React.memo(RadioCollect)