import { useEffect, useRef, useState, useContext, ChangeEventHandler, MouseEventHandler, createElement } from "react";
import { useTranslation, Trans } from 'react-i18next'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { IoEarthOutline } from "react-icons/io5";
import { 
    PiPlayCircleLight as PiPlayCircleLightIcon, 
    PiPauseCircleLight as PiPauseCircleLightIcon, 
    PiSkipForwardBold as PiSkipForwardBoldIcon, 
    PiSkipBackBold as PiSkipBackBoldIcon
} from "react-icons/pi";
import {
    AiOutlineSearch as AiOutlineSearchIcon,
    AiFillSound as AiFillSoundIcon, 
    AiFillStar as AiFillStarIcon
} from "react-icons/ai";
import { SlLoop as SlLoopIcon } from "react-icons/sl";
import { ImLoop as ImLoopIcon } from "react-icons/im";
import { LiaRandomSolid as LiaRandomSolidIcon } from "react-icons/lia";
import { 
    // FaAngleDown as FaAngleDownIcon,
    FaAngleUp as FaAngleUpIcon
} from "react-icons/fa6";
import { NewContext } from '@/UI/MusicStreamRemote/App'
import { Loading } from '@/component/Loading'
import { StyledLayout } from ".";
import langList from '@/asset/i18n/lang_list.json'

interface initStateType{
    playerVolume: number,
    currentIp:string,
    currentAction:string,
    isPlayStatus: boolean,
    languageToggleListStatus:boolean,
    language:string,
    appInfo:{ author: string, version: string },
    searchText: string,
    searchResult: {
        songUUID: number,
        artist: string
        songId: string
        songName: string
        songThum:string,
        isSongInCollect: boolean
    }[],
    collectListResult: {
        uuid: number,
        collect_name: string, 
        collect_desc: string,
        create_date: string
    }[],
    collectListSongResult: {
        song_collect_uuid: number,
        song_uuid: number,
        song_id: string,
        song_name: string,
        song_art: string,
        song_sort_num: number,
        song_thum_url: string,
        create_date: string
    }[],
    togglePlayerStatus: boolean,
    currentSelectSong: {
        songId: string,
        songName: string,
        artist: string,
        songThumUrl: string
    },
    toggleControlBarStatus: boolean,
    songSwitchControl: {
        isPlayInCollect: boolean,
        isClick: boolean,
        canGoPrev: boolean,
        canGoNext: boolean,
        songIndex: number,
        isGoAction: boolean
    },
    playFunctionsActionNum: number
}

const controlFunsGroups:{ className: string, iconTSX: FC, actionNum: number }[] = [{
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

const Remote:FC = (): TSX => {
    const { socketClient, $ } = useContext(NewContext)
    const { t: formatLanguage, i18n } = useTranslation()

    const [{
        playerVolume,
        currentIp,
        currentAction,
        isPlayStatus,
        languageToggleListStatus,
        language,
        searchText,
        appInfo,
        searchResult,
        collectListResult,
        collectListSongResult,
        currentSelectSong,
        togglePlayerStatus,
        toggleControlBarStatus,
        songSwitchControl,
        playFunctionsActionNum
    },setInitState] = useState<initStateType>({
        playerVolume: 0,
        currentIp:'',
        currentAction:'search-action',
        isPlayStatus: false,
        languageToggleListStatus: false,
        language:'zh',
        searchText: '',
        appInfo: { author: '', version: '' },
        searchResult: [],
        collectListResult: [],
        collectListSongResult: [],
        togglePlayerStatus: false,
        currentSelectSong: {
            songId: '',
            songName: '',
            artist: '',
            songThumUrl: ''
        },
        toggleControlBarStatus: false,
        songSwitchControl: {
            isPlayInCollect: false,
            isClick: false,
            canGoPrev: false,
            canGoNext: false,
            songIndex: -1,
            isGoAction: false
        },
        playFunctionsActionNum: -1
    })

    const debunceSearch = useRef<NodeJS.Timeout>(undefined)
    const debunceChangeVoice = useRef<NodeJS.Timeout>(undefined)
    const collectListResultRef = useRef<typeof collectListResult>([])
    const searchResultRef = useRef<typeof searchResult>([])
    const searchTextRef = useRef<string>('')
    const songSwitchControlRef = useRef<initStateType['songSwitchControl']>({
        isPlayInCollect: false,
        isClick: false,
        canGoPrev: false,
        canGoNext: false,
        songIndex: -1,
        isGoAction: false
    })

    const playFunctionsActionNumRef = useRef<number>(-1)

    const [isSearching, setIsSearching] = useState<boolean>(false)

    const [loadSetting, setLoadSetting] = useState<boolean>(false)

    const changeVoice:(value:number) => void = value => {

        setInitState(prevState => ({ 
            ...prevState,
            playerVolume: value / 100,
        }))
    }

    const setLanguageToggleList:() => void = () => setInitState(initState => ({ ...initState,languageToggleListStatus:!languageToggleListStatus }))

    const setCurrentLanguage:(val:string) => void = val => {
        setInitState(initState => ({ ...initState, language: val,languageToggleListStatus:!languageToggleListStatus }))

        socketClient.emit('update_user_setting',{ uuid:1,language:val,remote_language:val })

        socketClient.emit('remote_language_setting', { language:val })
    }

    const changePlayState:MouseEventHandler<HTMLDivElement> = () => {

        console.log(currentSelectSong)

        setInitState(prevState => ({ 
            ...prevState,isPlayStatus: !isPlayStatus,
            songSwitchControl: {
                ...prevState.songSwitchControl,
                isClick: true,
                songIndex: (songSwitchControl.songIndex === -1 && !isPlayStatus) ? 0 : songSwitchControl.songIndex
            }
        }))
        
        socketClient.emit('post_current_play_status',{ playStatus: !isPlayStatus })
    }

    const changeSong:(songRow: {
        songId: string,
        songName: string,
        artist: string,
        songThum: string,
        songIndex: number
    },isPlayInCollect: boolean) => void = (songRow, isPlayInCollect) => {

        const ouputSong = {
            songId: songRow.songId,
            songName: songRow.songName,
            artist: songRow.artist,
            songThumUrl: songRow.songThum
        }

        setInitState(prevState => ({
            ...prevState,
            currentSelectSong: ouputSong,
            togglePlayerStatus: true,
            songSwitchControl: {
                ...prevState.songSwitchControl,
                isPlayInCollect,
                songIndex: songRow.songIndex,
                isClick: true
            }
        }))
    }

    const setInputVal:ChangeEventHandler<HTMLInputElement> = event => {
        const { value } = event.target
    
        setInitState(prevState => ({
            ...prevState,
            searchText: value
        }))
    }

    const whenRemoteStart:() => void = () => {

        socketClient.emit('remote_is_start', { remoteStatus: true })

        socketClient.emit('get_user_setting')

        socketClient.emit('get_version')

        socketClient.emit('getSongCollectList_socket')
    }

    const initView:() => Promise<void> = async () => {

        setLoadSetting(true)

        setInitState(prevState => ({
            ...prevState,
            currentIp: window.location.host,
        }))

        socketClient.on('respGetVersion',(result: initStateType['appInfo']) => {
            setInitState(prevState => ({ ...prevState,appInfo: result }))
        })

        socketClient.on('respGetCurrentSetting',(valuse) => {

            setInitState(prevState => ({
                ...prevState,
                playerVolume: valuse.playerVolume,
                currentSelectSong: valuse.currentPlaySongDetails,
                isPlayStatus: valuse.isPlayStatus,
                language: valuse.language
            }))
        })

        socketClient.on('respGetUserSettingToRemote', (result: Record<string, any>[]) => {

            if (result.length > 0) {

                const [{ remote_language }] = result

                setInitState(prevState => ({
                    ...prevState,
                    language: remote_language
                }))
            }

            setLoadSetting(false)
        })

        socketClient.on('respSearchResult',result => {

            setIsSearching(false)

            setInitState(prevState => ({
                ...prevState,
                searchResult: result
            }))
        })

        socketClient.on('respGetSongCollectList_socket',(result) => {

            setInitState(prevState => ({
                ...prevState,
                collectListResult: result
            }))
        })

        socketClient.on('respGetSongCollectWithSongList_socket',(result) => {

            setInitState(prevState => ({
                ...prevState,
                collectListSongResult: result
            }))
        })

        socketClient.on('respToRemoteGoNextSong',() => {

            if(!songSwitchControlRef.current.canGoNext) return

            setInitState(prevState => ({
                ...prevState,
                songSwitchControl: {
                    ...songSwitchControlRef.current,
                    songIndex: 
                        playFunctionsActionNumRef.current === 1 ? 
                        songSwitchControlRef.current.songIndex
                        : songSwitchControlRef.current.songIndex + 1,
                    isClick: true,
                    isGoAction: true
                }
            }))
        })

        await $.useSleep(2000)

        whenRemoteStart()
    }

    useEffect(() => {
        playFunctionsActionNumRef.current = playFunctionsActionNum
    }, [playFunctionsActionNum])

    useEffect(() => {

        if(currentIp){

            clearTimeout(debunceChangeVoice.current)

            debunceChangeVoice.current = setTimeout(() => {

                socketClient.emit('set_voice', { voiceVal: playerVolume })

            },500)
        }
    },[playerVolume])

    useEffect(() => {

        const ouputSong = {
            songId: currentSelectSong.songId,
            songName: currentSelectSong.songName,
            artist: currentSelectSong.artist,
            songThumUrl: currentSelectSong.songThumUrl
        }

        socketClient.emit('set_playing_song',{ songInfo: ouputSong })

    }, [currentSelectSong])

    useEffect(() => {

        searchTextRef.current = searchText

        if(!searchText) {
            setIsSearching(false)
            setInitState(prevState => ({ ...prevState, searchResult: [] }))
            return
        }

        clearTimeout(debunceSearch.current)

        debunceSearch.current = setTimeout(() => {
            setIsSearching(true)
            setInitState(prevState => ({ ...prevState, searchResult: [] }))
            
            socketClient.emit('search_song',{ searchText: searchTextRef.current })
        },500)

    }, [searchText])

    useEffect(() => {

        if(songSwitchControl.isClick){

            const deepCopyItem: Record<string,any>[] = JSON.parse(JSON.stringify(songSwitchControl.isPlayInCollect ? collectListSongResult : searchResult))

            let prevItem:Record<string,any> = {}
            let nextItem:Record<string,any> = {}
            let nextSongItem:Record<string,any> = {}
            let songIndex: number = songSwitchControl.songIndex

            prevItem = deepCopyItem[songIndex - 1]
            nextItem = deepCopyItem[songIndex + 1]
            nextSongItem = deepCopyItem[songIndex]

            if(playFunctionsActionNum === 2){

                if(songIndex === deepCopyItem.length) songIndex = 0
                if(songIndex === -1) songIndex = deepCopyItem.length - 1

                prevItem = {}
                nextItem = {}
                nextSongItem = deepCopyItem[songIndex]
            }

            if(playFunctionsActionNum === -1 && (deepCopyItem.length === songIndex)){

                nextSongItem = deepCopyItem[0]

                setInitState(prevState => ({ 
                    ...prevState, 
                    currentSelectSonyId: '',
                    songSwitchControl: {
                        ...songSwitchControl,
                        ssongIndex: -1,
                        canGoPrev: false,
                        canGoNext: false,
                        isClick: false,
                        isGoAction: false
                    },
                    currentSelectSong: {
                        songId: nextSongItem.song_id,
                        songName: nextSongItem.song_name,
                        artist: nextSongItem.song_art,
                        songThumUrl: nextSongItem.song_thum_url
                    },
                    isPlayStatus: false
                }))

                return
            }

            setInitState(prevState => ({ 
                ...prevState, 
                currentSelectSonyId: '',
                songSwitchControl: {
                    ...songSwitchControl,
                    songIndex,
                    canGoPrev: prevItem !== undefined,
                    canGoNext: nextItem !== undefined,
                    isClick: false,
                    isGoAction: false
                },
                currentSelectSong: prevState.songSwitchControl.isGoAction ? {
                    ...songSwitchControl.isPlayInCollect ? {
                        songId: nextSongItem.song_id,
                        songName: nextSongItem.song_name,
                        artist: nextSongItem.song_art,
                        songThumUrl: nextSongItem.song_thum_url
                    } : {
                        songId: nextSongItem.songId,
                        songName: nextSongItem.songName,
                        artist: nextSongItem.artist,
                        songThumUrl: nextSongItem.songThum
                    }
                } : prevState.currentSelectSong
            }))
        }

        songSwitchControlRef.current = songSwitchControl

    }, [songSwitchControl])


    useEffect(() => {
        collectListResultRef.current = JSON.parse(JSON.stringify(collectListResult))
    }, [collectListResult])

    useEffect(() => {
        searchResultRef.current = JSON.parse(JSON.stringify(searchResult))
    }, [searchResult])

    useEffect(() => { i18n.changeLanguage(language) }, [language])

    useEffect(() => {
        initView()
    },[])

    window.onbeforeunload = () => {
        socketClient.emit('remote_is_start', { remoteStatus: false })
    }

    useEffect(() => {
        console.log(currentSelectSong)
    }, [currentSelectSong])

    return(
        <StyledLayout>
            <div className="header">
                <h1>Music Stream Remote</h1>
            </div>
            <div className="main">
               <div className="top">
                    <div 
                        className={currentAction === 'search-action' ? 'search-action active' : 'search-action'}
                        onClick={setInitState.bind(this,prevState => ({ ...prevState, currentAction: 'search-action' }))}
                    >
                        {formatLanguage('remote.search')}
                    </div>
                    <div 
                        className={currentAction === 'playlist-action' || currentAction === 'playlist-song-action' ? 'playlist-action active' : 'playlist-action'}
                        onClick={setInitState.bind(this,prevState => ({ ...prevState, currentAction: 'playlist-action' }))}
                    >
                        {formatLanguage('remote.playList')}
                    </div>
               </div>
               <div className="bottom">
                    {
                        {
                            'search-action' : (
                                <div className={togglePlayerStatus ? 'template-search when-playing' : 'template-search'}>
                                    <div className="search-outer">
                                        <AiOutlineSearchIcon />
                                        <input type="text" placeholder={formatLanguage('remote.whatKindSongSearch')} value={searchText} onChange={setInputVal} />
                                    </div>
                                    <div className="list-outer">
                                        {
                                            !isSearching && searchResult.length > 0 ? searchResult.map((row, index) => (
                                                <div 
                                                    className={isPlayStatus && currentSelectSong.songId === row.songId ? 'list-row active' : 'list-row'}
                                                    key={index} 
                                                    onClick={changeSong.bind(this, { ...row, songIndex: index }, false)}
                                                    // onContextMenu={contextListMenu.bind(this, 'song-row', true, row)}
                                                >
                                                    <div className="img-outer" style={{ backgroundImage: `url(${row.songThum})` }}></div>
                                                    <div className="info">
                                                        <div>{row.songName}</div>
                                                        <div>{row.artist}</div>
                                                    </div>
                                                    {
                                                        (
                                                            isPlayStatus && currentSelectSong.songId === row.songId
                                                        ) && (
                                                            <div className="music-progress-outer">
                                                                <div className="music-progress">
                                                                    <span className="active-1"></span>
                                                                    <span className="active-2"></span>
                                                                    <span className="active-3"></span>
                                                                    <span className="active-4"></span>
                                                                    <span className="active-5"></span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="is-in-collect">{row.isSongInCollect && <AiFillStarIcon />}</div>
                                                </div>
                                            )) : (isSearching && searchResult.length === 0) ? (
                                                <div className="is-searching">{formatLanguage('remote.searching')}</div>
                                            ) : (
                                                <div className="no-data">{formatLanguage('remote.noSearchResults')}</div>
                                            )
                                        }
                                    </div>
                                </div>
                            ),
                            'playlist-action': (
                                <div className={togglePlayerStatus ? 'template-playlist when playing' : 'template-playlist'}>
                                    {
                                        collectListResult.length > 0 ? (
                                            <div className="list-outer-frame">
                                                
                                                <div className="list-outer">
                                                    {
                                                        $.maps(collectListResult,(row,index) => (
                                                            <div 
                                                                className="list-item" 
                                                                key={index}
                                                                onContextMenu={(e) => {
                                                                    e.stopPropagation()
                                                                    // contextListMenu('action-collect-list', true, undefined, row.uuid)
                                                                }}
                                                                onClick={() => {
                                                                    setInitState(prevState => ({
                                                                        ...prevState,
                                                                        currentSelectPlayListId: row.uuid,
                                                                        currentAction: 'playlist-song-action'
                                                                    }))

                                                                    socketClient.emit('getSongCollectWithSongList_socket', { song_collect_uuid: row.uuid })
                                                                    // router({ pathname: '/music', search: `collect_id=${row.uuid}` })
                                                                }}
                                                            >
                                                                <div className="title">{row.collect_name}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="create-list-btn-outer">
                                                <div 
                                                    className="create-list-btn"
                                                    onClick={() => {
                                                        setInitState(prevState => ({ 
                                                            ...prevState, 
                                                            toggleListModalActionStatus: true
                                                        }))
                                                    }}
                                                >無播放清單</div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) ,
                            'playlist-song-action': (
                                <div className={togglePlayerStatus ? 'template-playlist-song when-playing' : 'template-playlist-song'}>
                                    <div className="list-outer">
                                        {
                                            collectListSongResult.length > 0 ? $.maps(collectListSongResult, (row, index) => (
                                                <div 
                                                    className={isPlayStatus && currentSelectSong.songId === row.song_id ? 'list-row active' : 'list-row'}
                                                    key={index} 
                                                    onClick={changeSong.bind(this, {
                                                        songId: row.song_id,
                                                        songName: row.song_name,
                                                        artist: row.song_art,
                                                        songThum: row.song_thum_url,
                                                        songIndex: index
                                                    }, true)}
                                                    // onContextMenu={contextListMenu.bind(this, 'collect-song-row', true, row)}
                                                >
                                                    <div className="img-outer" style={{ backgroundImage: `url(${row.song_thum_url})` }}></div>
                                                    <div className="info">
                                                        <div>{row.song_name}</div>
                                                        <div>{row.song_art}</div>
                                                    </div>
                                                    {
                                                        (
                                                            isPlayStatus && currentSelectSong.songId === row.song_id
                                                        )  && (
                                                            <div className="music-progress-outer">
                                                                <div className="music-progress">
                                                                    <span className="active-1"></span>
                                                                    <span className="active-2"></span>
                                                                    <span className="active-3"></span>
                                                                    <span className="active-4"></span>
                                                                    <span className="active-5"></span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )) : (
                                                <div className="no-songs">{formatLanguage('remote.noSongs')}</div>
                                            )
                                        }
                                    </div>
                                    <div 
                                        className="back"
                                        onClick={() => {
                                            setInitState(prevState => ({
                                                ...prevState,
                                                currentSelectPlayListId: -1,
                                                currentAction: 'playlist-action'
                                            }))
                                        }}
                                    >
                                        {formatLanguage('common.back')}
                                    </div>
                                </div>
                            ),
                        }[currentAction]
                    }
               </div>
                <div className={`player-control-outer ${togglePlayerStatus ? 'toggle' : ''} ${toggleControlBarStatus ? 'full-mode' : ''}`}>
                    <div className="full">
                        <div className="song-top">
                            <div className="them-img" style={{ backgroundImage: `url(${currentSelectSong.songThumUrl})` }}></div>
                            <div className="song-info">
                                <div>{currentSelectSong.songName}</div>
                                <div>{currentSelectSong.artist}</div>
                            </div>
                        </div>
                        <div className="song-bottom">
                            <div className="controls">
                                <div 
                                    className={songSwitchControl.canGoPrev ? 'prev-song-btn' : 'prev-song-btn disabled'}
                                    onClick={() => {
                                        if(!songSwitchControl.canGoPrev) return
                                        
                                        setInitState(prevState => ({
                                            ...prevState,
                                            songSwitchControl: {
                                                ...songSwitchControl,
                                                songIndex: songSwitchControl.songIndex - 1,
                                                isClick: true,
                                                isGoAction: true
                                            }
                                        }))
                                    }}
                                >
                                    <PiSkipBackBoldIcon />
                                </div>
                                <div className="play-btn" onClick={changePlayState}>
                                    {isPlayStatus ? <PiPauseCircleLightIcon /> : <PiPlayCircleLightIcon />}
                                </div>
                                <div 
                                    className={songSwitchControl.canGoNext ? 'next-song-btn' : 'next-song-btn disabled'}
                                    onClick={() => {

                                        if(!songSwitchControl.canGoNext) return

                                        setInitState(prevState => ({
                                            ...prevState,
                                            songSwitchControl: {
                                                ...songSwitchControl,
                                                songIndex: songSwitchControl.songIndex + 1,
                                                isClick: true,
                                                isGoAction: true
                                            }
                                        }))
                                    }}
                                >
                                    <PiSkipForwardBoldIcon />
                                </div>
                            </div>
                            <div className="voice-control-outer">
                                <AiFillSoundIcon  />
                                <Slider 
                                    handleRender={renderProps => (
                                        <div {...renderProps.props}>
                                            <div className='tooltip'>{(playerVolume * 100).toFixed(0)}</div>
                                        </div>
                                    )}
                                    min={0}
                                    max={100}
                                    onChange={changeVoice}
                                    value={playerVolume * 100}
                                />
                            </div>
                            <div className="song-functions">
                                {
                                    $.maps(controlFunsGroups, ((row, index) => (
                                        <div 
                                            className={`${row.className} icon ${playFunctionsActionNum === -1 ? '' : row.actionNum === playFunctionsActionNum ? 'active' : 'disabled'}`}
                                            key={index}
                                            onClick={() => {

                                                if(playFunctionsActionNum !== -1 && playFunctionsActionNum !== row.actionNum) return

                                                if(row.actionNum === 1 && playFunctionsActionNum === -1) {
                                                    socketClient.emit('set_playing_loop', true)
                                                } else if(row.actionNum === 1 && playFunctionsActionNum === 1) {
                                                    socketClient.emit('set_playing_loop', false)
                                                }


                                                console.log(row.actionNum)

                                                setInitState(prevState => ({
                                                    ...prevState,
                                                    playFunctionsActionNum: playFunctionsActionNum === -1 ? row.actionNum : -1,
                                                    songSwitchControl: {
                                                        ...prevState.songSwitchControl,
                                                        isClick: true
                                                    }
                                                }))
                                            }}
                                        >
                                            {createElement(row.iconTSX)}
                                        </div>
                                    )))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="min">
                        <div className="them-img" style={{ backgroundImage: `url(${currentSelectSong.songThumUrl})` }}></div>
                        <div className="song-info">
                            <div>{currentSelectSong.songName}</div>
                            <div>{currentSelectSong.artist}</div>
                        </div>
                    </div>
                    <div 
                        className={toggleControlBarStatus ? 'action-angle toggle' : 'action-angle'} 
                        onClick={() => {
                            setInitState(prevState => ({
                                ...prevState,
                                toggleControlBarStatus: !toggleControlBarStatus
                            }))
                        }}
                    >
                        <FaAngleUpIcon className="icon" />
                    </div>
                </div>
                <div className="player-control-action-frame"></div>
            </div>
            <div className="footer">
                <h6>
                    <Trans 
                        i18nKey='remote.copyRight'
                        components={{ br: <br />, div: <div /> }}
                        values={{ author: appInfo.author, version: appInfo.version }}
                    />
                </h6>
            </div>
            <div className="change-language-list">
                <div 
                    className="change-language-switch"
                    onClick={setLanguageToggleList}
                >
                    <IoEarthOutline />
                    &nbsp;
                    {formatLanguage('remote.changeLanguage')}
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
            <Loading isInMobile loadingStatus={loadSetting} infoText={formatLanguage('component.Main.getSetting')} />
        </StyledLayout>
    )
}

export default Remote