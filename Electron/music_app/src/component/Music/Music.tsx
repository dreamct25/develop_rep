import { useEffect, useRef, useState, useContext, ChangeEventHandler, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
    AiOutlineSearch, 
    AiFillStar as AiFillStarIcon,
    AiOutlineQrcode as AiOutlineQrcodeIcon
} from "react-icons/ai";
import { PiPlaylistLight as PiPlaylistLightIcon } from "react-icons/pi";
import { IoMdAdd as IoMdAddIcon, IoIosSettings as IoIosSettingsIcon } from "react-icons/io";
import { GiLinkedRings as GiLinkedRingsIcon } from "react-icons/gi";
import { ReactSortable } from "react-sortablejs";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'
import 'tippy.js/animations/scale-subtle.css';
import { NewContext } from '@/UI/MainView/App'
import { StyledLayout } from '.'
import { Modal, Input } from "@/component";
import { actionCreator, actionCreator as MainActionCreator, initStoreType } from '@/component/Main'
import { ipcRenderer } from "electron";

const Music: FC = (): TSX => {
    const { setReducer, $, socketClient, toast, getReducer, formatLanguage } = useContext(NewContext)
    const { 
        isPlayStatus, 
        songSwitchControl, 
        playFunctionsActionNum, 
        themColorRgbaStr,
        currentPlaySongDetails
    } = getReducer(state => state.MainReducer)
    const router = useNavigate()
    const [params, _] = useSearchParams()
    const currentSelctCollectID = params.get('collect_id')

    const [{
        searchText,
        searchCollectText,
        searchResult,
        collectListResult,
        collectListSongResult,
        isListModalEditActionStatus,
        toggleListModalActionStatus,
        toggleDeleteListModalStatus,
        collectInfos,
        currentSelectCollectInfos,
        deleteCollectSingleItem,
        stopClickWhenCollectDrag,
        isRemoteStart
    }, setInitState] = useState<{
        searchText: string,
        searchCollectText: string,
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
            collect_bg: string,
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
        collectInfos: {
            name: string,
            desc: string,
            collect_uuid: number
        },
        currentSelectCollectInfos: {
            name: string,
            desc: string,
            bgColor: string,
            collect_uuid: number
        },
        isListModalEditActionStatus: boolean,
        toggleListModalActionStatus: boolean,
        toggleDeleteListModalStatus: boolean,
        deleteCollectSingleItem: {
            collect_uuid: number,
            collect_name: string
        },
        stopClickWhenCollectDrag: boolean,
        isRemoteStart: boolean
    }>({
        searchText: '',
        searchCollectText: '',
        searchResult: [],
        collectListResult: [],
        collectListSongResult: [],
        collectInfos: {
            name: '',
            desc: '',
            collect_uuid: -1
        },
        currentSelectCollectInfos: {
            name: '',
            desc: '',
            bgColor: '',
            collect_uuid: -1
        },
        isListModalEditActionStatus: false,
        toggleListModalActionStatus: false,
        toggleDeleteListModalStatus: false,
        deleteCollectSingleItem: {
            collect_uuid: -1,
            collect_name: ''
        },
        stopClickWhenCollectDrag: false,
        isRemoteStart: false
    })

    const debunceSearch = useRef<NodeJS.Timeout>(undefined)
    const collectListResultRef = useRef<typeof collectListResult>([])
    const searchResultRef = useRef<typeof searchResult>([])
    const searchTextRef = useRef<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const songSwitchControlRef = useRef<initStoreType['songSwitchControl']>({
        isPlayInCollect: false,
        isClick: false,
        canGoPrev: false,
        canGoNext: false,
        songIndex: -1,
        isGoAction: false,
        fromRemote: false
    })

    const setInputVal:(type:'searchText' | 'seachCollectText', event: ChangeEvent<HTMLInputElement>) => void = (type, event) => {
        const { value } = event.target
    
        setInitState(prevState => ({
            ...prevState,
            [type]: value
        }))
    }

    const contextListMenu:(
        type: string, 
        status: boolean, 
        collectSongDetails?: typeof searchResult[0],
        collectUID?: number
    ) => void = (type, status, collectSongDetails, collectUID) => {

        const action: Record<string, () => void> = {
            'action-collect-list': () => {
                ipcRenderer.send('show-context-menu',{ type, status, subMenuResult: [], collectSongDetails: undefined , collectUID })
            },
            'song-row': () => {
                const repack = collectListResult.map(({ uuid, collect_name }) => ({ collect_uuid: uuid, collect_name  }))

                ipcRenderer.send('show-context-menu',{ type, status, subMenuResult: repack, collectSongDetails })
            },
            'collect-song-row': () => {
                const repack = collectListResult.map(({ uuid, collect_name }) => ({ collect_uuid: uuid, collect_name  }))

                ipcRenderer.send('show-context-menu',{ type, status, subMenuResult: repack, collectSongDetails })
            }
        }

        action[type]()
    }

    const searchAction:() => void = () => {

        setIsSearching(true)
        setInitState(prevState => ({ ...prevState, searchResult: [] }))
        
        socketClient.emit('search_song',{ searchText: searchTextRef.current })
    }

    const toggleCollectSaveModal:(status: boolean, method: string) => Promise<void> = async (status, method) => {

        const [action, type] = method.split('|')

        if(type === 'confirm'){

            if(action === 'create'){
                ipcRenderer.send('createSongCollectList',{
                    collect_name: collectInfos.name, 
                    collect_desc: collectInfos.desc
                })
            }

            if(action === 'edit'){
                ipcRenderer.send('editSongCollectList',{
                    collect_uuid: collectInfos.collect_uuid,
                    collect_name: collectInfos.name, 
                    collect_desc: collectInfos.desc
                })
            }

            if(action === 'delete'){
                ipcRenderer.send('deleteSongCollectList',{
                    uuid: deleteCollectSingleItem.collect_uuid
                })
            }
        }

        await $.useSleep(300)

        setInitState(prevState => ({
            ...prevState,
            toggleListModalActionStatus: status,
            toggleDeleteListModalStatus: status,
            collectInfos: { name: '', desc: '', collect_uuid: -1 },
            deleteCollectSingleItem: { collect_uuid: -1, collect_name: '' },
            isListModalEditActionStatus: false
        }))
    }

    const renderCollectList:() => TSX | TSX[] = () => {

        if(searchCollectText) {

            const filterItem = $.filter(collectListResult,row => row.collect_name.match(searchCollectText) as any)

            if(filterItem.length > 0){
            
                return $.maps(filterItem, (row, index) => (
                    <div 
                        className="list-item" 
                        key={index}
                        onContextMenu={(e) => {
                            e.stopPropagation()
                            contextListMenu('action-collect-list', true, undefined, row.uuid)
                        }}
                        onClick={() => {
                            ipcRenderer.send('getSongCollectWithSongList', { song_collect_uuid: row.uuid })
                            setInitState(prevState => ({ 
                                ...prevState, 
                                currentSelectCollectInfos: { 
                                    name: row.collect_name,
                                    desc: row.collect_desc,
                                    bgColor: row.collect_bg,
                                    collect_uuid: row.uuid
                                }
                            }))
                            router({ pathname: '/music', search: `collect_id=${row.uuid}` })
                        }}
                    >
                        <div className="title">{row.collect_name}</div>
                    </div>
                ))
            }

            return (<div className="no-filter-result">查無播放列表</div>)
        }

        return $.maps(collectListResult, (row, index) => (
            <div 
                className="list-item" 
                key={index}
                onContextMenu={(e) => {
                    e.stopPropagation()
                    contextListMenu('action-collect-list', true, undefined, row.uuid)
                }}
                onClick={() => {
                    ipcRenderer.send('getSongCollectWithSongList', { song_collect_uuid: row.uuid })
                    setInitState(prevState => ({ 
                        ...prevState, 
                        currentSelectCollectInfos: { 
                            name: row.collect_name,
                            desc: row.collect_desc,
                            bgColor: row.collect_bg,
                            collect_uuid: row.uuid
                        }
                    }))
                    router({ pathname: '/music', search: `collect_id=${row.uuid}` })
                }}
            >
                <div className="title">{row.collect_name}</div>
            </div>
        ))
    }

    const initPage: () => Promise<void> = async () => {

        //#region socket listens
        socketClient.on('respRemoteIsStart',(result: { isStart: boolean }) => {

            setInitState(prevState => ({
                ...prevState,
                isRemoteStart: result.isStart
            }))
            
            if(!result.isStart) {
                setReducer(MainActionCreator, 'setSongSwitchControl',{
                    ...songSwitchControlRef.current,
                    fromRemote: false
                })
            }

            toast.info(formatLanguage(`component.Music.${result.isStart ? 'remoteToastMsgOn' : 'remoteToastMsgOff'}`))
        })

        socketClient.on('respSearchResult',result => {

            setIsSearching(false)

            setInitState(prevState => ({
                ...prevState,
                searchResult: result
            }))
            console.log(result)
        })
        //#endregion socket listens

        //#region ipcRenderer listens
        ipcRenderer.on('contextMenuEditCollectOpen',(_, status, collectUID) => {
            const [filterItem] = $.filter(collectListResultRef.current,row => row.uuid === collectUID)

            setInitState(prevState => ({ 
                ...prevState, 
                toggleListModalActionStatus: status,
                isListModalEditActionStatus: status,
                collectInfos: {
                    name: filterItem.collect_name,
                    desc: filterItem.collect_desc,
                    collect_uuid: filterItem.uuid
                },
            }))
        })

        ipcRenderer.on('contextMenuDeleteCollectOpen',(_, status, collectUID) => {
            const [filterItem] = $.filter(collectListResultRef.current,row => row.uuid === collectUID)

            setInitState(prevState => ({ ...prevState, 
                toggleDeleteListModalStatus: status, 
                deleteCollectSingleItem: {
                    collect_uuid: filterItem.uuid,
                    collect_name: filterItem.collect_name
                }
            }))
        })

        //#region song_collect_list CRUD
        ipcRenderer.on('respGetSongCollectList',(_, result) => {

            setInitState(prevState => ({
                ...prevState,
                collectListResult: result
            }))
        })

        ipcRenderer.on('respCreateSongCollectList',(_, result: { message: string }) => {

            const [message, collecName] = result.message.split('|')
            
            if(message === 'already have') {

                toast.error("已有相同播放列表")

                return
            }

            toast.success(`${collecName} 播放列表建立成功`)

            socketClient.emit('update_remote_song_collect_list')

            ipcRenderer.send('getSongCollectList')

        })

        ipcRenderer.on('respEditSongCollectList',(_, result: { message: string }) => {

            const [message, collectName] = result.message.split('|')

            if(message === 'already have') {

                toast.error("已有相同播放列表")

                return
            } 
            
            toast.success(`${collectName} 播放列表修改成功`)
            
            socketClient.emit('update_remote_song_collect_list')
            
            ipcRenderer.send('getSongCollectList')
        })

        ipcRenderer.on('respDeleteSongCollectList',(_, result) => {

            searchAction()

            router({ pathname: '/music', search: '' })

            socketClient.emit('update_remote_song_collect_list')

            ipcRenderer.send('getSongCollectList')

        })
        //#endregion

        ipcRenderer.on('respAddSongUpdateView',(_, result) => {
            const songPos = $.findIndexOfObj(searchResultRef.current,row => row.songId === result.songId)
            
            if(songPos !== -1){
                searchResultRef.current[songPos].isSongInCollect = true

                const deepCopy = JSON.parse(JSON.stringify(searchResultRef.current))

                setInitState(prevState => ({ ...prevState, searchResult: deepCopy }))
            }
        })
        
        ipcRenderer.on('respAddSongToCollect',(_, result) => {

            const [message, collectName] = result.message.split('|')

            if(message === 'already have') {

                toast.error(formatLanguage('component.Music.addSongError',{ collectName }))
                
                return
            }

            toast.success(formatLanguage('component.Music.addSongSuccess',{ collectName }))
        })

        ipcRenderer.on('respDeleteFromCollect',(_, result) => {

            const [message, collectName] = result.message.split('|')

            toast.success(formatLanguage('component.Music.deleteSongSuccess',{ collectName }))
        })

        ipcRenderer.on('respGetSongCollectWithSongList',(_, result) => {
            setInitState(prevState => ({
                ...prevState,
                collectListSongResult: result
            }))
        })
        //#endregion ipcRenderer listens
        
        ipcRenderer.send('getSongCollectList')
    }

    useEffect(() => {

        if(songSwitchControl.isClick){

            if(songSwitchControl.fromRemote){

                setReducer(MainActionCreator, 'setSongSwitchControl', {
                    ...songSwitchControl,
                    isClick: false
                })

                return
            }

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

                console.log('the end')

                nextSongItem = deepCopyItem[0]

                setReducer(MainActionCreator, 'setSongSwitchControl', {
                    ...songSwitchControl,
                    songIndex: -1,
                    canGoPrev: false,
                    canGoNext: false,
                    isClick: false,
                    isGoAction: false
                })

                setReducer(MainActionCreator, 'setCurrentPlaySongDetails',{
                    songId: nextSongItem.song_id,
                    songName: nextSongItem.song_name,
                    artist: nextSongItem.song_art,
                    songThumUrl: nextSongItem.song_thum_url
                })

                setReducer(actionCreator, 'setIsPlayStatus', false)

                return
            }

            setReducer(MainActionCreator, 'setSongSwitchControl', {
                ...songSwitchControl,
                // songIndex: playFunctionsActionNum === 2 ? songIndex : songSwitchControl.songIndex,
                songIndex,
                canGoPrev: prevItem !== undefined,
                canGoNext: nextItem !== undefined,
                isClick: false,
                isGoAction: false
            })

            setReducer(MainActionCreator, 'setCurrentPlaySongDetails', songSwitchControl.isGoAction ? {
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
            } : currentPlaySongDetails)

            // setTimeout(() => {
            //     setInitState(prevState => ({ ...prevState, currentSelectSonyId: '' }))
            // }, 200)
        }

        songSwitchControlRef.current = songSwitchControl

    }, [songSwitchControl])

    useEffect(() => {

        searchTextRef.current = searchText

        if(!searchText) {
            setIsSearching(false)
            setInitState(prevState => ({ ...prevState, searchResult: [] }))
            return
        }

        clearTimeout(debunceSearch.current)

        debunceSearch.current = setTimeout(() => {
            if(currentSelctCollectID) router({ pathname: '/music', search: '' })
            searchAction()
        },500)

    }, [searchText])

    useEffect(() => {

        if(currentSelctCollectID) {

            const [filterItem] = $.filter(collectListResult, row => row.uuid === parseInt(currentSelctCollectID))

            if(filterItem) {
                setInitState(prevState => ({
                    ...prevState,
                    currentSelectCollectInfos: {
                        name: filterItem.collect_name,
                        desc: filterItem.collect_desc,
                        bgColor: filterItem.collect_bg,
                        collect_uuid: filterItem.uuid
                    }
                }))
            }
        }

        collectListResultRef.current = JSON.parse(JSON.stringify(collectListResult))
    }, [collectListResult])

    useEffect(() => {
        searchResultRef.current = JSON.parse(JSON.stringify(searchResult))
    }, [searchResult])

    useEffect(() => { initPage() }, [])

    return (
        <StyledLayout themColorRgba={themColorRgbaStr}>
            <div className="layout">
                <div className="left">
                    <div className="collect-list">
                        {
                            collectListResult.length > 0 ? (
                                <div className="list-outer-frame">
                                    <div>
                                        <div className="current-path-outer">
                                            <div className={currentSelctCollectID ? 'play-list-title active' : 'play-list-title'}>
                                                <div>{formatLanguage('component.Music.playList')}</div>
                                                <div 
                                                    className="add-list-icon"
                                                    onClick={
                                                        setInitState.bind(this, (prevState => ({ 
                                                            ...prevState, 
                                                            toggleListModalActionStatus: true
                                                        })))
                                                    }
                                                >
                                                    <IoMdAddIcon />
                                                </div>
                                            </div>
                                            <div 
                                                className={currentSelctCollectID ? 'find-song-btn active' : 'find-song-btn'} 
                                                onClick={() => {
                                                    searchAction()
                                                    router({ pathname: '/music', search: '' })
                                                }
                                            }>
                                                {formatLanguage('component.Music.backToFindMusic')}
                                            </div>
                                        </div>
                                        <div className="search-collect-outer">
                                            <AiOutlineSearch />
                                            <input type="text" placeholder={formatLanguage('component.Music.searchCollectList')} onChange={setInputVal.bind(this, 'searchCollectText')} />
                                        </div>
                                    </div>
                                    <div className="list-outer">{renderCollectList()}</div>
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
                                    >{formatLanguage('component.Music.createPlayList')}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        <div className="search-outer">
                            <AiOutlineSearch />
                            <input type="text" placeholder={formatLanguage('component.Music.whatKindSongSearch')} value={searchText} onChange={setInputVal.bind(this, 'searchText')} />
                        </div>
                        <div className="right-outer">
                            <Tippy 
                                theme="light-border" 
                                content={formatLanguage('component.Main.settingBar.setting')} 
                                animation="scale-subtle"
                            >
                                <div className="setting-btn" onClick={setReducer.bind(this, MainActionCreator, 'setToggleSettingListStatus', true)}>
                                    <IoIosSettingsIcon />
                                </div>
                            </Tippy>
                            <Tippy
                                theme="light-border" 
                                content={formatLanguage('component.Music.remoteConnectQRCode')}
                                animation="scale-subtle"
                            >
                                <div className="open-qr-btn" onClick={setReducer.bind(this, MainActionCreator, 'setToggleQRCodeModalStatus', true)}>
                                    <AiOutlineQrcodeIcon />
                                </div>
                            </Tippy>
                            <Tippy
                                theme="light-border"  
                                content={formatLanguage('component.Music.remoteConnected',{ status: formatLanguage(`component.Music.${isRemoteStart ? 'remoteOn' : 'remoteOff'}`) })}
                                animation="scale-subtle"
                            >
                                <div className={isRemoteStart ? 'is-remote-connect active' : 'is-remote-connect'}>
                                    <GiLinkedRingsIcon />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                    <div className="bottoms">
                        {
                            !currentSelctCollectID ? (
                                <div className="search-song-outer">
                                    <div className="list-outer">
                                        {
                                            !isSearching && searchResult.length > 0 ? searchResult.map((row, index) => (
                                                <div 
                                                    className={
                                                        isPlayStatus && currentPlaySongDetails.songId === row.songId ? 'list-row active' : 'list-row'
                                                    }
                                                    key={index} 
                                                    onClick={() => {
                                                        setInitState(prevState => ({
                                                            ...prevState,
                                                            currentSelectSonyId: row.songId
                                                        }))
            
                                                        setReducer(MainActionCreator, 'setCurrentPlaySongDetails', {
                                                            songId: row.songId,
                                                            songName: row.songName,
                                                            artist: row.artist,
                                                            songThumUrl: row.songThum
                                                        })

                                                        setReducer(MainActionCreator, 'setSongSwitchControl', {
                                                            ...songSwitchControl,
                                                            songIndex: index,
                                                            isClick: true,
                                                            isPlayInCollect: false,
                                                            fromRemote: false
                                                        })
                                                    }}
                                                    onContextMenu={contextListMenu.bind(this, 'song-row', true, row)}
                                                >
                                                    <div className="img-outer" style={{ backgroundImage: `url(${row.songThum})` }}></div>
                                                    <div className="info">
                                                        <div>{row.songName}</div>
                                                        <div>{row.artist}</div>
                                                    </div>
                                                    {
                                                        (
                                                            isPlayStatus && currentPlaySongDetails.songId === row.songId
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
                                                <div className="is-searching">{formatLanguage('component.Music.searching')}</div>
                                            ) : (
                                                <div className="no-data">{formatLanguage('component.Music.noSearchResults')}</div>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="collect-song-outer">
                                    <div className="list-top">
                                        <div className="icon" style={{ backgroundColor: currentSelectCollectInfos.bgColor }}>
                                            <PiPlaylistLightIcon />
                                        </div>
                                        <div className="list-desc">
                                            <div className="title">{currentSelectCollectInfos.name}</div>
                                            <div className="desc">{currentSelectCollectInfos.desc}</div>
                                        </div>
                                    </div>
                                    <div className="list-bottom">
                                        <ReactSortable
                                            list={collectListSongResult as []}
                                            setList={(newsItem) => {
                                                setInitState(prevState => ({
                                                    ...prevState,
                                                    collectListSongResult: newsItem
                                                }))
                                            }}
                                            onStart={() => {
                                                setInitState(prevState => ({
                                                    ...prevState,
                                                    stopClickWhenCollectDrag: true
                                                }))
                                            }}
                                            onEnd={(evt) => {

                                                setInitState(prevState => ({
                                                    ...prevState,
                                                    stopClickWhenCollectDrag: false
                                                }))

                                                const replaceItem = { 
                                                    songUUID: collectListSongResult[evt.oldIndex].song_uuid, 
                                                    songSortNum: collectListSongResult[evt.oldIndex].song_sort_num 
                                                }
                                                const replaceItemTo = { 
                                                    songUUID: collectListSongResult[evt.newIndex].song_uuid, 
                                                    songSortNum: collectListSongResult[evt.newIndex].song_sort_num 
                                                }

                                                ipcRenderer.send("sortSongFromCollect", { replaceItem, replaceItemTo, song_collect_uuid: currentSelctCollectID })
                                            }}
                                            animation={150}
                                            easing="ease"
                                        >
                                            {
                                                collectListSongResult.length > 0 ? $.maps(collectListSongResult, (row, index) => (
                                                    <div 
                                                        className={
                                                            isPlayStatus && currentPlaySongDetails.songId === row.song_id ? 'list-row active' : 'list-row'
                                                        }
                                                        key={index} 
                                                        onClick={() => {
                                                            if(stopClickWhenCollectDrag) return

                                                            setInitState(prevState => ({
                                                                ...prevState,
                                                                currentSelectSonyId: row.song_id
                                                            }))

                                                            setReducer(MainActionCreator, 'setCurrentPlaySongDetails', {
                                                                songId: row.song_id,
                                                                songName: row.song_name,
                                                                artist: row.song_art,
                                                                songThumUrl: row.song_thum_url
                                                            })

                                                            setReducer(MainActionCreator, 'setSongSwitchControl', {
                                                                ...songSwitchControl,
                                                                songIndex: index,
                                                                isClick: true,
                                                                isPlayInCollect: true,
                                                                fromRemote: false
                                                            })
                                                        }}
                                                        onContextMenu={contextListMenu.bind(this, 'collect-song-row', true, row)}
                                                    >
                                                        <div className="img-outer" style={{ backgroundImage: `url(${row.song_thum_url})` }}></div>
                                                        <div className="info">
                                                            <div>{row.song_name}</div>
                                                            <div>{row.song_art}</div>
                                                        </div>
                                                        {
                                                            (
                                                                isPlayStatus && currentPlaySongDetails.songId === row.song_id
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
                                                    </div>
                                                )) : (
                                                    <div className="no-data">
                                                        <div 
                                                            className="no-song-btn" 
                                                            onClick={() => {
                                                                router({ pathname: '/music', search: '' })
                                                                searchAction()
                                                            }
                                                        }>{formatLanguage('component.Music.goToFindSong')}</div>
                                                    </div>
                                                )
                                            }
                                        </ReactSortable>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal
                modalTitle={formatLanguage(`component.Music.${isListModalEditActionStatus ? 'editPlayList' : 'createPlayList'}`)}
                toggleModal={toggleListModalActionStatus}
                setToggleModal={(status, method) => {
                    toggleCollectSaveModal(status, `${isListModalEditActionStatus ? 'edit' : 'create'}|${method}`)
                }}
                withOptions
            >
                <Input 
                    label={formatLanguage('component.Music.playListName')}
                    labelAlign="default" 
                    inputStyle="default" 
                    usingType="input"
                    type="input"
                    align=""
                    inputValTemp={collectInfos.name}
                    useStyle="white"
                    size="md" 
                    changeEvent={({ target: { value } }) => {
                        setInitState(prevState => ({
                            ...prevState,
                            collectInfos: {
                                ...prevState.collectInfos,
                                name: value
                            }
                        }))
                    }} 
                />
                <Input 
                    label={formatLanguage('component.Music.playListDesc')}
                    labelAlign="default"
                    inputStyle="default"
                    usingType="input"
                    type="input"
                    inputValTemp={collectInfos.desc}
                    useStyle="white"
                    align=""
                    size="md"
                    withoutMb
                    changeEvent={({ target: { value } }) => {
                        setInitState(prevState => ({
                            ...prevState,
                            collectInfos: {
                                ...prevState.collectInfos,
                                desc: value
                            }
                        }))
                    }} 
                />
            </Modal>
            <Modal
                modalTitle={formatLanguage('component.Music.deletePlayList')}
                toggleModal={toggleDeleteListModalStatus}
                setToggleModal={(status, method) => {
                    toggleCollectSaveModal(status, `delete|${method}`)
                }}
                withOptions
            >
                <div>{formatLanguage('component.Music.doYouWantToDeletePlayList', { playListName: deleteCollectSingleItem.collect_name })}</div>
            </Modal>
        </StyledLayout>
    )
}

export default Music