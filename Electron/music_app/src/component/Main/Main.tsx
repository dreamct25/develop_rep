import { useEffect, useState, createElement, useContext, useRef, ChangeEventHandler, KeyboardEventHandler } from "react";
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom'
import { Trans } from 'react-i18next'
import { ipcRenderer } from "electron";
import ReactPlayer from "react-player";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { RgbaColorPicker } from "react-colorful";
import { ToastContainer } from 'react-toastify';
import { 
    PiPlayCircleLight as PiPlayCircleLightIcon, 
    PiPauseCircleLight as PiPauseCircleLightIcon, 
    PiSkipForwardBold as PiSkipForwardBoldIcon, 
    PiSkipBackBold as PiSkipBackBoldIcon
} from "react-icons/pi";
import { 
    IoMdClose as IoMdCloseIcon
} from "react-icons/io"
import { 
    MdZoomOutMap as MdZoomOutMapIcon, 
    MdOutlinePersonalVideo as MdOutlinePersonalVideoIcon 
} from "react-icons/md";
import { AiFillSound as AiFillSoundIcon } from "react-icons/ai";
import { SlLoop as SlLoopIcon } from "react-icons/sl";
import { ImLoop as ImLoopIcon } from "react-icons/im";
import { FiMinus as FiMinusIcon } from "react-icons/fi";
import { LiaRandomSolid as LiaRandomSolidIcon } from "react-icons/lia";
import { 
    FaAngleLeft as FaAngleLeftIcon,
    FaAngleRight as FaAngleRightIcon
} from "react-icons/fa6";
import { NewContext } from '@/UI/MainView/App'
import $ from '@/utilities/lib/Library'
import langList from '@/asset/i18n/lang_list.json'
import { Music, NetworkWrong, Modal, QRCodeModal, VideoModeModal, Loading } from "@/component";
import { StyledLayout, actionCreator } from '.'
// import AppInfo from '@/asset/version.json'

interface initStateType {
    language: string
    fullscreenStatus: boolean,
    toggleModal: boolean,
    toggleCopyRightModal: boolean,
    languageToggleListStatus:boolean,
    moveXY:{ baseX: number,baseY: number }
    appInfo:{ author: string, version: string },
    playerDuration: number,
    playerEndDuration: number,
    playerVolume: number,
    remoteIp: string,
    toggleVideoModalStatus: boolean,
    bgImagePathTemp: string,
    bgBlurPec: number,
    bgMaskPec: number,
    toggleThemColorPicker: boolean,
    playingLoopFromRemote: boolean,
    isInVideosFrame: boolean
}


const Main: FC = (): TSX => {
    const { 
        getReducer, 
        socketClient, 
        setReducer, 
        formatLanguage,
        i18n: { changeLanguage }
    } = useContext(NewContext)

    const { 
        currentPlaySongDetails, 
        toggleSettingListStatus, 
        toggleQRCodeModalStatus,
        isPlayStatus,
        songSwitchControl,
        playFunctionsActionNum,
        themColorRgba,
        themColorRgbaStr
    } = getReducer(state => state.MainReducer)

    const route = useNavigate()

    const [{
        language,
        fullscreenStatus,
        toggleModal,
        toggleCopyRightModal,
        languageToggleListStatus,
        moveXY,
        appInfo,
        playerDuration,
        playerEndDuration,
        playerVolume,
        remoteIp,
        toggleVideoModalStatus,
        bgImagePathTemp,
        bgBlurPec,
        bgMaskPec,
        toggleThemColorPicker,
        playingLoopFromRemote,
        isInVideosFrame
    }, setInitState] = useState<initStateType>({
        language: 'zh',
        fullscreenStatus: false,
        toggleModal: false,
        toggleCopyRightModal: false,
        languageToggleListStatus: false,
        moveXY:{ baseX: -1, baseY: -1 },
        appInfo: { author: '', version: '' },
        playerDuration: 0,
        playerEndDuration: 0,
        playerVolume: 0,
        remoteIp: '',
        toggleVideoModalStatus: false,
        bgImagePathTemp: '',
        bgBlurPec: 10,
        bgMaskPec: 0,
        toggleThemColorPicker: false,
        playingLoopFromRemote: false,
        isInVideosFrame: false
    })

    const [loadSetting, setLoadSetting] = useState<boolean>(false)

    const playerDomRef = useRef<ReactPlayer>(null)

    const debunceAsyncWithRemote = useRef<NodeJS.Timeout>(undefined)

    const debunceWhenMouseMoveInVideoFrame = useRef<NodeJS.Timeout>(undefined)

    const isPlayStatusRef = useRef<boolean>(false)

    const playerDurationRef = useRef<number>(0)

    const controlRightFunsGroups:{ className: string, iconTSX: FC, actionNum: number }[] = [{
        className: 'single-loop-controll',
        iconTSX: SlLoopIcon,
        actionNum: 1
    },{
        className: 'loop-playlist-controll',
        iconTSX: ImLoopIcon,
        actionNum: 2
    },{
        className: 'radom-playlist-controll',
        iconTSX: LiaRandomSolidIcon,
        actionNum: 3
    }]

    const dragStart: ({ nativeEvent: { button, x, y } }: React.MouseEvent<HTMLDivElement>) => void = ({ nativeEvent: { button, x, y } }) => button === 0 && setInitState(initState => ({ ...initState,moveXY:{ baseX: x, baseY: y } }))

    const dragEnd: () => void = () => {
        setInitState(initState => ({ ...initState,moveXY:{ baseX: -1, baseY: -1 } }))
        $(document).on('mousemove', () => { });
    }

    const moveEvent: (_: HTMLDocument,{ screenX, screenY }: MouseEvent) => void = (_,{ screenX, screenY }) => {
        const { baseX, baseY } = moveXY
        ipcRenderer.send('setPosition', { dragX: screenX - baseX, dragY: screenY - baseY })
    }

    const fullScreenToggle: () => void = () => {
        setInitState(initState => ({ ...initState, fullscreenStatus: !fullscreenStatus }))
        ipcRenderer.send('setFullscreen', !fullscreenStatus)
        setReducer(actionCreator, 'setIsFullScreen', !fullscreenStatus)
    }

    const minScreen: () => void = () => ipcRenderer.send('setMinScreen')

    const renderLang: (lang: string) => string = lang => {
        const [filterItem] = $.filter(langList,row => row.lang === lang)
        return filterItem.langDesc
    }

    const setToggleModalFn: (status: boolean, method: string) => void = (status, method) => {
        method === 'confirm' && !toggleCopyRightModal && setTimeout(() => ipcRenderer.send('closeApp'), 700);
        method === 'confirm' && toggleCopyRightModal && setInitState(initState => ({ ...initState, toggleModal: false, toggleCopyRightModal: false }));
        method === 'copyRight' ? setInitState(initState => ({
            ...initState,
            toggleModal: false,
            toggleCopyRightModal: status
        })) : setInitState(initState => ({
            ...initState,
            toggleModal: status,
        }))
    }

    const setCurrentLanguage:(val:string) => void = val => {
        setInitState(initState => ({ ...initState, language: val,languageToggleListStatus:!languageToggleListStatus }))
        setUserSetting('lang', val)
    } 

    const goPage: (pathname: string) => void = pathname => route({ pathname: navigator.onLine ? pathname : '/wrong' })

    const setUserSetting:<T>(
        type: 'lang' | 'bg_buf' | 'bg_blur_pec' | 'bg_mask_pec' | 'them_color' | 'player_volume' ,
        val?: T
    ) => void = (type,val) => {

        const action:Record<typeof type, () => void> = {
            lang: () => {
                const data = { uuid: 1, language: val, remote_language: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
            bg_buf: () => {
                const data = { uuid: 1, bg_buf: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
            bg_blur_pec: () => {
                const data = { uuid: 1, bg_blur_pec: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
            bg_mask_pec: () => {
                const data = { uuid: 1, bg_mask_pec: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
            them_color: () => {
                const data = { uuid: 1, them_color: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
            player_volume: () => {
                const data = { uuid: 1, player_volume: val, type };

                ipcRenderer.send('updateUserSetting', data);
            },
        }

        action[type]()
    }

    const formatTime: (seconds: number) => string = seconds => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60).toFixed(0);
        const secs = Math.floor(seconds % 60).toFixed(0);

        if (hours > 0) return `${hours.toFixed(0).padStart(2, '0')} : ${minutes.padStart(2, '0')} : ${secs.padStart(2, '0')}`;
        
        return `${minutes.padStart(2, '0')} : ${secs.padStart(2, '0')}`;
    }

    const changeBgAction:ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
        
        const [selectedFile] = target.files;

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = async ({ target: readerTarget }) => {

                const binaryData = readerTarget.result;

                setUserSetting('bg_buf', binaryData)

                const imagePath = URL.createObjectURL(selectedFile);

                setInitState(prevState => ({
                    ...prevState,
                    bgImagePathTemp: imagePath
                }))
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    }

    const whenKeyDown: (_: Window, event: KeyboardEvent) => void = (_, event) => {

        const target = event.target as Document

        if(target.nodeName === 'BODY') {

            if (event.key === " " && !event.ctrlKey && !event.altKey && !event.metaKey) {
                event.preventDefault();
            }
    
            const action:Record<number, () => void> = {
                [event.keyCode]: () => {},
                32: () => {
                    setReducer(actionCreator, 'setIsPlayStatus', !isPlayStatus)
                },
                37: () => {
                    playerDurationRef.current -= 10
                    playerDomRef.current.seekTo(playerDurationRef.current <= 0 ? 0 : playerDurationRef.current , 'seconds')
                },
                38: () => {
                    setInitState(prevState => ({
                        ...prevState,
                        playerVolume: playerVolume >= 1 ? 1 : playerVolume + 0.05
                    }))
                },
                39: () => {
                    playerDurationRef.current += 10
                    playerDomRef.current.seekTo(playerDurationRef.current >= playerEndDuration ? playerEndDuration : playerDurationRef.current, 'seconds')
                },
                40: () => {
                    setInitState(prevState => ({
                        ...prevState,
                        playerVolume: playerVolume <= 0 ? 0 : playerVolume - 0.05
                    }))
                }
            }
    
            action[event.keyCode]()
        }
    }

    const initView: () => Promise<void> = async () => {

        try {
            await fetch("https://proxy-service-three.vercel.app/uts/check_net");

        } catch(e){

            goPage('/wrong')
            return
        }

        goPage('/music')

        ipcRenderer.on('getCopyrightInfo', () => setToggleModalFn(true, 'copyRight'))

        ipcRenderer.on('respGetUserSetting',async (_,data: {
            language: string,
            player_volume: number,
            bg_buf?: ArrayBuffer,
            bg_blur_pec?: number,
            bg_mask_pec?: number,
            them_color?: string
        }[]) => {

            if(data.length > 0){

                const [{ language, player_volume , bg_buf, bg_blur_pec, bg_mask_pec, them_color }] = data

                if(language) setInitState(prevState => ({ ...prevState,language }))

                if(player_volume) setInitState(prevState => ({ ...prevState,playerVolume: player_volume }))

                if(bg_buf !== null) {
                    // 創建 Blob
                    const blob = new Blob([bg_buf], { type: 'image/jpeg' });
        
                    // 創建 Blob URL
                    const imageUrl = URL.createObjectURL(blob);

                    setInitState(prevState => ({ ...prevState,bgImagePathTemp: imageUrl }))
                }

                if(bg_blur_pec !== null) setInitState(prevState => ({ ...prevState,bgBlurPec: bg_blur_pec }))

                if(bg_mask_pec !== null) setInitState(prevState => ({ ...prevState,bgMaskPec: bg_mask_pec }))

                if(them_color !== null) setReducer(actionCreator, 'setThemColorRgba',JSON.parse(them_color))
            }

            await $.useSleep(500)

            setLoadSetting(false)
        })

        socketClient.on('respWhenChangeLaguageFromRemote',({ language }:{ language:string }) => {
            setInitState(prevState => ({ ...prevState,language }))
        })

        socketClient.on('respGetVersion',(result: initStateType['appInfo']) => {
            setInitState(prevState => ({ ...prevState,appInfo: result }))
        })

        socketClient.on('respGetRemoteIp',(result: { currentIp: string }) => {
            const remotePath = `http://${result.currentIp}:10987/music_stream_remote`
            setInitState(prevState => ({ ...prevState,remoteIp: remotePath }))
        })

        socketClient.on('respSetPlayingFromRemote',(result: { songInfo: typeof currentPlaySongDetails }) => {
            setReducer(actionCreator, 'setCurrentPlaySongDetails', result.songInfo)

            setReducer(actionCreator, 'setSongSwitchControl', {
                ...songSwitchControl,
                fromRemote: true
            })
        })
        
        socketClient.on('respSetVoiceFromRemote',(result: { voiceVal: number }) => {
            setInitState(prevState => ({ ...prevState, playerVolume: result.voiceVal }))
        })

        socketClient.on('respSetPlayingLoopFromRemote',(action: boolean) => {

            setInitState(prevState => ({
                ...prevState,
                playingLoopFromRemote: action
            }))
        })

        socketClient.on('respSetPlayStatusFromRemote',(result: { playStatus: boolean }) => {

            setReducer(actionCreator, 'setSongSwitchControl', {
                ...songSwitchControl,
                isClick: true,
                fromRemote: true
            })

            setReducer(actionCreator, 'setIsPlayStatus', result.playStatus || false)
        })

        setLoadSetting(true)

        await $.useSleep(2000)

        socketClient.emit('get_version')

        socketClient.emit('get_remote_ip')

        ipcRenderer.send('getUserSetting')
    }

    useEffect(() => {
        setReducer(
            actionCreator, 
            'setIsPlayStatus', 
            (currentPlaySongDetails.songId !== '' && songSwitchControl.songIndex !== -1) ||
            (currentPlaySongDetails.songId !== '' && songSwitchControl.fromRemote)
        )
    }, [currentPlaySongDetails.songId])

    useEffect(() => {
        changeLanguage(language)
    }, [language])

    useEffect(() => {
        const { baseX, baseY } = moveXY;
        (baseX !== -1 && baseY !== -1) && $(document).on('mousemove', moveEvent);
    }, [moveXY])

    useEffect(() => {

        if(remoteIp){

            clearTimeout(debunceAsyncWithRemote.current)

            debunceAsyncWithRemote.current = setTimeout(() => 

                socketClient.emit('post_current_setting',{
                    playerVolume,
                    currentPlaySongDetails,
                    isPlayStatus,
                    language    
                })

            ,500)
        }
    },[playerVolume, isPlayStatus, language])

    useEffect(() => {
        isPlayStatusRef.current = isPlayStatus
    }, [isPlayStatus])

    useEffect(() => {
        initView()
    }, [])

    $(window).on('keydown', whenKeyDown)

    return (
        <StyledLayout
            bgPath={bgImagePathTemp}
            bgBlurPec={bgBlurPec}
            bgMaskPec={bgMaskPec}
            isFullscreen={fullscreenStatus}
            themColorRgba={themColorRgbaStr}
            getSettingStatus={true}
        >
            <ToastContainer 
                className='custom-toast'
                position="top-center"
                autoClose={2000}
                hideProgressBar
                closeButton={false}
                closeOnClick
                pauseOnHover
            />
            {/* top-navbar */}
            <div className="top-bar" onMouseDown={dragStart} onMouseUp={dragEnd}>
                <div className="top-bar-title">
                    <img src="/asset/icon/radio-waves.png" />
                    <span>{formatLanguage('component.Main.radio')}</span>
                </div>
                <div className="top-bar-controller">
                    {process.platform !== 'darwin' && <div className="abount-text" onClick={setToggleModalFn.bind(this,true, 'copyRight')}>{formatLanguage('component.Main.about')}</div>}
                    <div className="min" onClick={minScreen}>
                        <FiMinusIcon className="min-icon" />
                    </div>
                    <div className="full" onClick={fullScreenToggle}>
                        <MdZoomOutMapIcon className="full-icon" />
                    </div>
                    <div className="close" onClick={setToggleModalFn.bind(this, true, 'closeApp')}>
                        <IoMdCloseIcon className="close-icon" />
                    </div>
                </div>
            </div>
            {/* top-navbar end */}
            {/* main-layout */}
            <div className={`main-layout ${currentPlaySongDetails.songId ? 'toggle' : ''} ${toggleVideoModalStatus ? 'toggle-view-video' : ''}`}>
                {/* music search and collect */}
                <div className="top">
                    <Routes>
                        <Route path="/music" element={createElement(Music)} />
                        <Route path="/wrong" element={createElement(NetworkWrong)} />
                        <Route path="/" element={createElement(Navigate, { replace: true, to: '/music' })} />
                    </Routes>
                </div>
                {/* music search and collect end */}
                {/* bottom player controller layout */}
                <div className="bottom">
                    <div className="player-layout">
                        <div className="left">
                            <div style={{ backgroundImage: `url(${currentPlaySongDetails.songThumUrl})` }}></div>
                            <div>
                                <span>{currentPlaySongDetails.songName}</span>
                                <span>{currentPlaySongDetails.artist}</span>
                            </div>
                        </div>
                        <div className="medium">
                            <div className="top">
                                <div 
                                    className={songSwitchControl.canGoPrev ? 'prev-song-btn' : 'prev-song-btn disabled'}
                                    onClick={() => {
                                        if(!songSwitchControl.canGoPrev) return
                                        
                                        setReducer(actionCreator, 'setSongSwitchControl', {
                                            ...songSwitchControl,
                                            songIndex: songSwitchControl.songIndex - 1,
                                            isClick: true,
                                            isGoAction: true,
                                            fromRemote: false
                                        })
                                    }}
                                >
                                    <PiSkipBackBoldIcon />
                                </div>
                                <div className="play-btn" onClick={() => {

                                    setReducer(actionCreator, 'setSongSwitchControl', {
                                        ...songSwitchControl,
                                        isClick: true,
                                        songIndex: (songSwitchControl.songIndex === -1 && !isPlayStatus) ? 0 : songSwitchControl.songIndex
                                    })

                                    setReducer(actionCreator, 'setIsPlayStatus', !isPlayStatus)
                                }}>
                                    {isPlayStatus ? <PiPauseCircleLightIcon /> : <PiPlayCircleLightIcon />}
                                </div>
                                <div 
                                    className={songSwitchControl.canGoNext ? 'next-song-btn' : 'next-song-btn disabled'}
                                    onClick={() => {

                                        if(!songSwitchControl.canGoNext) return

                                        setReducer(actionCreator, 'setSongSwitchControl', {
                                            ...songSwitchControl,
                                            songIndex: songSwitchControl.songIndex + 1,
                                            isClick: true,
                                            isGoAction: true,
                                            fromRemote: false
                                        })
                                    }}
                                >
                                    <PiSkipForwardBoldIcon />
                                </div>
                            </div>
                            <div className="bottoms">
                                <div>{formatTime(playerDuration)}</div>
                                <Slider 
                                    // handleRender={renderProps => (<div {...renderProps.props}>
                                    //     <div className='tooltip'>{slideNum}</div>
                                    // </div>)}
                                    min={0}
                                    max={playerEndDuration}
                                    onChange={(val: number) => {
                                        playerDomRef.current.seekTo(val, 'seconds')
                                        
                                        setInitState(prevState => ({ 
                                            ...prevState,
                                            playerDuration: val,
                                        }))
                                    }}
                                    value={playerDuration}
                                />
                                <div>{formatTime(playerEndDuration - 1)}</div>
                            </div>
                        </div>
                        {/* song functions */}
                        <div className="right">
                            <div className="control-left">
                                <div className="voice-control">
                                    <AiFillSoundIcon  />
                                    <Slider 
                                        handleRender={renderProps => (
                                            <div {...renderProps.props}>
                                                <div className='tooltip'>{(playerVolume * 100).toFixed(0)}</div>
                                            </div>
                                        )}
                                        min={0}
                                        max={100}
                                        onChange={(val: number) => {

                                            const v = val / 100

                                            setInitState(prevState => ({ 
                                                ...prevState,
                                                playerVolume: v,
                                            }))

                                            setUserSetting('player_volume', v)
                                        }}
                                        value={playerVolume * 100}
                                    />
                                </div>
                            </div>
                            <div className="control-right">
                                {
                                    $.maps(controlRightFunsGroups, ((row, index) => (
                                        <div 
                                            className={`${row.className} icon ${playFunctionsActionNum === -1 ? '' : row.actionNum === playFunctionsActionNum ? 'active' : 'disabled'}`}
                                            key={index}
                                            onClick={() => {

                                                if(playFunctionsActionNum !== -1 && playFunctionsActionNum !== row.actionNum) return

                                                setReducer(actionCreator, 'setPlayFunctionsActionNum', playFunctionsActionNum === -1 ? row.actionNum : -1)

                                                setReducer(actionCreator, 'setSongSwitchControl', {
                                                    ...songSwitchControl,
                                                    isClick: true,
                                                    fromRemote: false
                                                })
                                            }}
                                        >
                                            {createElement(row.iconTSX)}
                                        </div>
                                    )))
                                }
                                <div 
                                    className="video-mode icon"
                                    onClick={
                                        setInitState.bind(this, prevState => ({
                                            ...prevState,
                                            toggleVideoModalStatus: true,
                                            playerVideoDuration: playerDuration
                                        }))
                                    }
                                >
                                    <MdOutlinePersonalVideoIcon />
                                </div>
                            </div>
                        </div>
                        {/* song functions end */}
                    </div>
                </div>
                {/* bottom player controller layout end */}
            </div>
            {/* main-layout end */}
            {/* close application modal */}
            <Modal
                modalTitle={formatLanguage('common.prompt')}
                toggleModal={toggleModal}
                setToggleModal={setToggleModalFn}
                withOptions
            >
                <div>{formatLanguage('component.Main.doYouWantToCloseApplication')}</div>
            </Modal>
            {/* close application modal end */}
            {/* about application description */}
            <Modal
                modalTitle={''}
                toggleModal={toggleCopyRightModal}
                setToggleModal={setToggleModalFn}
                withOptions={false}
                onlyInfo
            >
                <div className="scroll-content">
                    <Trans 
                        i18nKey='component.Main.disclaimer'
                        components={{ br: <br />, strong: <strong />, div: <div /> }}
                        values={{ author: appInfo.author, version:  appInfo.version }}
                    />
                </div>
                <Trans 
                    i18nKey='component.Main.copyRight'
                    components={{ br: <br />, div: <div /> }}
                    values={{ author: appInfo.author, version:  appInfo.version }}
                />
            </Modal>
            {/* about application description end*/}
            {/* QRCode modal */}
            <QRCodeModal
                value={remoteIp}
                toggleModal={toggleQRCodeModalStatus}
                closeCodeModal={val => setReducer(actionCreator, 'setToggleQRCodeModalStatus', val)}
                renderText={
                    <Trans 
                        i18nKey='component.QRCodeModal.qrDesc'
                        components={{ br: <br /> }}
                    />
                }
            />
            {/* QRCode modal end */}
            {/* working video with sound */}
            <VideoModeModal 
                toggleModalStatus={toggleVideoModalStatus}
            >
                <div 
                    className="video-modal"
                    onMouseMove={() => {

                        if(isInVideosFrame){
                            
                            clearTimeout(debunceWhenMouseMoveInVideoFrame.current)
                
                            debunceWhenMouseMoveInVideoFrame.current = setTimeout(() => {

                                if(!isPlayStatusRef.current) return

                                setInitState(prevState => ({
                                    ...prevState,
                                    isInVideosFrame: false
                                }))

                            },2500)

                            return
                        }

                        setInitState(prevState => ({
                            ...prevState,
                            isInVideosFrame: true
                        }))
                    }}
                >
                    <ReactPlayer
                        ref={playerDomRef}
                        url={`http://www.youtube.com/watch?v=${currentPlaySongDetails.songId}&cc_load_policy=0&cc_lang_pref=zh`}
                        style={{
                            zIndex: -1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: 'none'
                        }}
                        width={'100%'}
                        height={'100%'}
                        playing={isPlayStatus}
                        volume={playerVolume}
                        onProgress={obj => {
                            playerDurationRef.current = obj.playedSeconds
                            setInitState(prevState => ({ 
                                ...prevState,
                                playerDuration: obj.playedSeconds,
                            }))
                        }}
                        onPlay={() => {
                            setInitState(prevState => ({
                                ...prevState,
                                isInVideosFrame: false
                            }))
                        }}
                        onPause={() => {
                            setInitState(prevState => ({
                                ...prevState,
                                isInVideosFrame: true
                            }))
                        }}
                        loop={songSwitchControl.fromRemote ? playingLoopFromRemote : playFunctionsActionNum === 1}
                        onEnded={() => {

                            if(songSwitchControl.fromRemote){
                                socketClient.emit('go_next_song_to_remote')
                                return
                            }

                            setReducer(actionCreator, 'setSongSwitchControl', {
                                ...songSwitchControl,
                                songIndex: songSwitchControl.songIndex + 1,
                                isClick: true,
                                isGoAction: true
                            })
                        }}
                        onReady={({ getDuration }) => {

                            // document.querySelectorAll('iframe').forEach(element => element.contentWindow.postMessage('*','*'))

                            setInitState(prevState => ({ 
                                ...prevState,
                                playerDuration: 0,
                                playerEndDuration: getDuration()
                            }))
                        }}
                    />
                    <div className={isInVideosFrame ? 'black-mask' : 'black-mask hidden'}></div>
                    <div className={isInVideosFrame ? 'song-info' : 'song-info small'}>
                        <div className="img" style={{ backgroundImage: `url(${currentPlaySongDetails.songThumUrl})` }}></div>
                        <div className="info">
                            <span>{currentPlaySongDetails.songName}</span>
                            <span>{currentPlaySongDetails.artist}</span>
                        </div>
                    </div>
                    <div className={isInVideosFrame ? 'close-video-modal-btn' : 'close-video-modal-btn hidden'} onClick={
                        setInitState.bind(this, prevState => ({
                            ...prevState,
                            toggleVideoModalStatus: false
                        }))
                    }>
                        <IoMdCloseIcon />
                    </div>
                    <div className={isInVideosFrame ? 'play-btn' : 'play-btn hidden'} onClick={() => {

                        setReducer(actionCreator, 'setSongSwitchControl', {
                            ...songSwitchControl,
                            isClick: true,
                            songIndex: (songSwitchControl.songIndex === -1 && !isPlayStatus) ? 0 : songSwitchControl.songIndex
                        })

                        setReducer(actionCreator, 'setIsPlayStatus', !isPlayStatus)
                    }}>
                        {isPlayStatus ? <PiPauseCircleLightIcon /> : <PiPlayCircleLightIcon />}
                    </div>
                    {
                        !songSwitchControl.fromRemote && <div 
                            className={isInVideosFrame ? 'prev-btn' : 'prev-btn hidden'}
                            onClick={() => {

                                if(!songSwitchControl.canGoPrev) return
                                
                                setReducer(actionCreator, 'setSongSwitchControl', {
                                    ...songSwitchControl,
                                    songIndex: songSwitchControl.songIndex - 1,
                                    isClick: true,
                                    isGoAction: true,
                                    fromRemote: false
                                })
                            }}
                        >
                            <FaAngleLeftIcon />
                        </div>
                    }
                    {
                        !songSwitchControl.fromRemote && <div 
                            className={isInVideosFrame ? 'next-btn' : 'next-btn hidden'}
                            onClick={() => {
                                if(!songSwitchControl.canGoNext) return
                                
                                setReducer(actionCreator, 'setSongSwitchControl', {
                                    ...songSwitchControl,
                                    songIndex: songSwitchControl.songIndex + 1,
                                    isClick: true,
                                    isGoAction: true,
                                    fromRemote: false
                                })
                            }}
                        >
                            <FaAngleRightIcon />
                        </div>
                    }
                </div>
            </VideoModeModal>
            {/* working video with sound */}
            {/* setting navbar */}
            <div className={toggleSettingListStatus ? "setting-list-outer-frame toggle" : "setting-list-outer-frame"}>
                <div className="setting-list-outer">
                    <div className="top">
                        <div className="title">{formatLanguage('component.Main.settingBar.setting')}</div>
                        <div className="close-btn" onClick={setReducer.bind(this, actionCreator, 'setToggleSettingListStatus', false)}>
                            <IoMdCloseIcon />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="list-outer">
                            <div className="list-row">
                                <div className="left-title">{formatLanguage('component.Main.settingBar.changeLanguage')}</div>
                                <div className="right-option">
                                    <div className="change-language-list">
                                        <div 
                                            className="change-language-switch"
                                            onClick={
                                                setInitState.bind(this,initState => ({ 
                                                    ...initState,
                                                    languageToggleListStatus:!languageToggleListStatus 
                                                }))
                                            }
                                        >
                                            {renderLang(language)}
                                        </div>
                                        <div className={languageToggleListStatus ? "language-list-item-outer toggle" : "language-list-item-outer"}>
                                            {
                                                $.maps(langList,(row,index) => (
                                                    <div 
                                                        className={language === row.lang ? "language-list-item active" : "language-list-item"}
                                                        onClick={setCurrentLanguage.bind(this,row.lang)}
                                                        key={index}
                                                    >
                                                        {row.langDesc}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-row">
                                <div className="left-title">{formatLanguage('component.Main.settingBar.changeBg')}</div>
                                <div className="right-option">
                                    <div className="change-bg-btn">
                                        {formatLanguage('component.Main.settingBar.pickImg')}
                                        <input type="file" className="change-bg-input" accept="image/*" onChange={changeBgAction} />
                                    </div>
                                </div>
                            </div>
                            <div className="list-row with-slide">
                                <div className="left-title">{formatLanguage('component.Main.settingBar.changeBgBlur')}</div>
                                <div className="right-option">
                                    <Slider 
                                        min={0}
                                        max={100}
                                        onChange={(val: number) => {
                                            setInitState(prevState => ({ 
                                                ...prevState,
                                                bgBlurPec: val / 10,
                                            }))
                                        }}
                                        onChangeComplete={() => {
                                            setUserSetting('bg_blur_pec', bgBlurPec)
                                        }}
                                        value={bgBlurPec * 10}
                                    />
                                </div>
                            </div>
                            <div className="list-row with-slide">
                                <div className="left-title">{formatLanguage('component.Main.settingBar.changeBgMask')}</div>
                                <div className="right-option">
                                    <Slider 
                                        min={0}
                                        max={80}
                                        onChange={(val: number) => {
                                            setInitState(prevState => ({ 
                                                ...prevState,
                                                bgMaskPec: val / 100,
                                            }))
                                        }}
                                        onChangeComplete={() => {
                                            setUserSetting('bg_mask_pec', bgMaskPec)
                                        }}
                                        value={bgMaskPec * 100}
                                    />
                                </div>
                            </div>
                            <div className="list-row">
                                <div className="left-title">{formatLanguage('component.Main.settingBar.changeMainThemColor')}</div>
                                <div className="right-option with-picker">
                                    <div className="color-picker-btn" onClick={() => setInitState(prevState => ({ ...prevState, toggleThemColorPicker: !toggleThemColorPicker }))}>
                                        <div className="color-box" style={{ backgroundColor: themColorRgbaStr }}></div>
                                        {formatLanguage('component.Main.settingBar.pickColor')}
                                    </div>
                                    <div className={`picker-outer ${toggleThemColorPicker ? 'toggle' : ''}`}>
                                        <RgbaColorPicker color={themColorRgba} onChange={pickColorRgba => {
                                            setReducer(actionCreator, 'setThemColorRgba', pickColorRgba)
                                            setUserSetting('them_color',JSON.stringify(pickColorRgba))
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* setting navbar end */}
            <Loading loadingStatus={loadSetting} infoText={formatLanguage('component.Main.getSetting')} />
        </StyledLayout>
    )
}

export default Main