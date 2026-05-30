import { 
    useContext, 
    useEffect, 
    useRef, 
    useState, 
    type ChangeEventHandler, 
    type UIEventHandler 
} from 'react'
import { Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { Volume2, VolumeOff } from 'lucide-react'
import { StyledLayout, NewContext, type SearchResp } from '.'
import { 
    Carousel,
    Loading,
    SingleMusicInfoModal,
    SingleMusicVideoInfoModal,
    SinglePodcastInfoModal,
    SingleSoftwareInfoModal,
    SingleEbookInfoModal
} from '@/component'

const Home:FC = ():TSX => {

    const { $, getReducer, setReducer } = useContext(NewContext)

    const router = useNavigate()

    const route = useLocation()

    const { searchResult } = getReducer(state => state.HomeReducer)

    const [{
        inputVal,
        toggleLoadingStatus,
        loadingProgressCount,
        isLockSearchInput,
        toggleVideoVoice,
        toggleSingleMusicInfoModalStatus,
        toggleSingleMusicVideoInfoModalStatus,
        toggleSinglePodcastInfoModalStatus,
        toggleSingleSoftwareInfoModalStatus,
        toggleSingleEbookInfoModalStatus,
        singleData,
        isFirstSearchDone
    }, setInitState] = useState<{
        inputVal: string,
        toggleLoadingStatus: boolean,
        loadingProgressCount: number,
        isLockSearchInput: boolean,
        toggleVideoVoice: boolean,
        toggleSingleMusicInfoModalStatus: boolean,
        toggleSingleMusicVideoInfoModalStatus: boolean,
        toggleSinglePodcastInfoModalStatus: boolean,
        toggleSingleSoftwareInfoModalStatus: boolean,
        toggleSingleEbookInfoModalStatus: boolean,
        singleData: any,
        isFirstSearchDone: boolean
    }>({
        inputVal: '',
        toggleLoadingStatus: false,
        loadingProgressCount: 0,
        isLockSearchInput: false,
        toggleVideoVoice: false,
        toggleSingleMusicInfoModalStatus: false,
        toggleSingleMusicVideoInfoModalStatus: false,
        toggleSinglePodcastInfoModalStatus: false,
        toggleSingleSoftwareInfoModalStatus: false,
        toggleSingleEbookInfoModalStatus: false,
        singleData: undefined,
        isFirstSearchDone: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [{
        toggleBar
    }, setScrollEventState] = useState<{
        toggleBar: boolean,
        scrollPosTemp: number
    }>({
        toggleBar: false,
        scrollPosTemp: -1
    })

    const [autoPlayVideoPos, setAutoPlayVideoPos] = useState<number>(-1)
    const [previewItemActiveIndex, setPreviewItemActiveIndex] = useState(0);

    const previewItemOuterRef = useRef<HTMLDivElement>(null);
    const previewItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressTimer = useRef<NodeJS.Timeout>(undefined)
    const scrollDebounceTimer = useRef<NodeJS.Timeout>(undefined)

    const selectItemHandler: (lookupId: number, category: string) => Promise<void> = async (lookupId, category) => {

        setIsLoading(true)
        
        const actionStatus: string = {
            [category]: '',
            music: 'toggleSingleMusicInfoModalStatus',
            'music-video': 'toggleSingleMusicVideoInfoModalStatus',
            podcast: 'toggleSinglePodcastInfoModalStatus',
            software: 'toggleSingleSoftwareInfoModalStatus',
            ebook: 'toggleSingleEbookInfoModalStatus'
        }[category]

        const res = await $.fetch.get<{ data: { results: any[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        if(res.status >= 200 && res.status <= 399) {

            if(res.data.data.results.length > 0) {

                const [result] = res.data.data.results

                setInitState(prevState => ({
                    ...prevState,
                    [actionStatus]: !(prevState as Record<string, any>)[actionStatus],
                    singleData: result,
                    ...category === 'music-video' ? { toggleVideoVoice: false } : { toggleVideoVoice }
                }))
            }
        }

        setIsLoading(false)
    }

    const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {

        setInitState(prevState => ({
            ...prevState,
            inputVal: target.value
        }))
    }

    const searchResultHandler: () => Promise<void> = async () => {

        setReducer(state => void(state.HomeReducer.searchResult = []), 'HomeReducer/setSearchResults')

        setInitState(prevState => ({ ...prevState, isLockSearchInput: true }))

        if(!isFirstSearchDone) setInitState(prevState => ({ ...prevState, isFirstSearchDone: true }))

        clearInterval(progressTimer.current)

        progressTimer.current = setInterval(() => {

            setInitState(prevState => {

                if(prevState.loadingProgressCount >= 80){
                    clearInterval(progressTimer.current)
                    return { ...prevState }
                }

                prevState.loadingProgressCount += 8

                return { ...prevState }
            })

        }, 1000)

        setReducer(state => void(state.HomeReducer.search = inputVal), 'HomeReducer/setSearchVal')

        await $.useSleep(1050)

        setInitState(prevState => ({ ...prevState, toggleLoadingStatus: true }))

        const { data: musicResult } = await $.fetch.get<{ data: SearchResp<'music'> }>(
            `${import.meta.env.VITE_APP_API_URL}/test/store/search`, 
            {
                queryParams: {
                    term: inputVal,
                    media: 'music',
                    country: 'tw',
                    limit: 30
                }
            }
        )

        const { data: musiceVideoResult } = await $.fetch.get<{ data: SearchResp<'music-video'> }>(
            `${import.meta.env.VITE_APP_API_URL}/test/store/search`, 
            {
                queryParams: {
                    term: inputVal,
                    media: 'musicVideo',
                    country: 'tw',
                    limit: 30
                }
            }
        )

        const { data: podcastResult } = await $.fetch.get<{ data: SearchResp<'podcast'> }>(
            `${import.meta.env.VITE_APP_API_URL}/test/store/search`, 
            {
                queryParams: {
                    term: inputVal,
                    media: 'podcast',
                    country: 'tw',
                    limit: 30
                }
            }
        )

        const { data: ebookResult } = await $.fetch.get<{ data: SearchResp<'ebook'> }>(
            `${import.meta.env.VITE_APP_API_URL}/test/store/search`,
            {
                queryParams: {
                    term: inputVal,
                    media: 'ebook',
                    country: 'tw',
                    limit: 30
                }
            }
        )
        
        const { data: softwareResult } = await $.fetch.get<{ data: SearchResp<'software'> }>(
            `${import.meta.env.VITE_APP_API_URL}/test/store/search`,
            {
                queryParams: {
                    term: inputVal,
                    media: 'software',
                    country: 'tw',
                    limit: 30
                }
            }
        )

        if(
            musicResult.data.resultCount > 0 ||
            musiceVideoResult.data.resultCount > 0 ||
            podcastResult.data.resultCount > 0 ||
            ebookResult.data.resultCount > 0 ||
            softwareResult.data.resultCount > 0
        ) {

            setReducer(state => 
                void(state.HomeReducer.searchResult = [
                    {
                        category: 'music',
                        data: musicResult.data.results
                    }, {
                        category: 'music-video',
                        data: musiceVideoResult.data.results
                    }, {
                        category: 'podcast',
                        data: podcastResult.data.results
                    }, {
                        category: 'ebook',
                        data: ebookResult.data.results
                    }, {
                        category: 'software',
                        data: softwareResult.data.results
                    }
                ])
            , 'HomeReducer/setSearchResults')
        }

        clearInterval(progressTimer.current)

        setInitState(prevState => ({ ...prevState, loadingProgressCount: 100 }))

        await $.useSleep(800)

        setInitState(prevState => ({ ...prevState, toggleLoadingStatus: false }))

        await $.useSleep(1300)

        setInitState(prevState => ({ ...prevState, loadingProgressCount: 0 }))

        setInitState(prevState => ({ ...prevState, isLockSearchInput: false }))
    }

    const goMorePage:(path: string) => void = path => {
        router({ to: path })
    }

    const enterSearch:(e: KeyboardEvent) => void = (e) => {
        if(e.keyCode === 13) searchResultHandler()
    }

    const videoRefHandler: (insideRowIndex: number, element: HTMLVideoElement) => void = (insideRowIndex, element) => {

        if(!element) return

        element.volume = 1

        if(element.duration !== 0 && previewItemActiveIndex !== 1) {

            element.pause()

            return
        }

        if(autoPlayVideoPos === insideRowIndex) {

            if(element.paused) {

                if(previewItemActiveIndex === 1) {

                    if(element?.play) element.play()
                }
            }

        } else {

            if(element.played) {

                element.currentTime = 0

                if(previewItemActiveIndex === 1) element.pause()
            }
        }

        if(toggleSingleMusicVideoInfoModalStatus) {
            
            element.pause()
        }
    }

    const scrollEventHandler:  UIEventHandler<HTMLDivElement> = () => {

        clearTimeout(scrollDebounceTimer.current)

        if(route.pathname === '/') {

            if(!previewItemOuterRef.current) return

            const previewItemOuterScrollY = previewItemOuterRef.current.scrollTop

            if(previewItemOuterScrollY > 50) {

                scrollDebounceTimer.current = setTimeout(() => {

                    setScrollEventState(prevState => ({
                        ...prevState,
                        toggleBar: !(previewItemOuterScrollY < prevState.scrollPosTemp),
                        scrollPosTemp: previewItemOuterScrollY
                    }))

                }, 100)
            }

            return
        }

        if(window.scrollY > 50) {

            scrollDebounceTimer.current = setTimeout(() => {

                setScrollEventState(prevState => ({
                    ...prevState,
                    toggleBar: !(window.scrollY < prevState.scrollPosTemp),
                    scrollPosTemp: window.scrollY
                }))

            }, 100)
        }
    }

    useEffect(() => {

        if(searchResult.length === 0) return

        const container = previewItemOuterRef.current

        if(previewItemRefs.current.length === 0 && !container) return 

        const observer = $.elementObserver(
            previewItemRefs.current, 
            {
                watchRootElement: container,
                threshold: 0.6
            },
            observerElementEntry => {

                if (observerElementEntry.isIntersecting && observerElementEntry.intersectionRatio >= 0.6) {

                    const index = previewItemRefs.current.indexOf(observerElementEntry.target as HTMLDivElement)

                    if (index !== -1) setPreviewItemActiveIndex(index)
                }
            }
        )

        observer.allWatch()

        return () => observer.allUnWatch();
        
    }, [searchResult])

    useEffect(() => {
    
        if(toggleBar) {

            setScrollEventState(prevState => ({
                ...prevState,
                toggleBar: false,
                scrollPosTemp: -1
            }))
        }
    
    }, [route.pathname])

    if(route.pathname === '/') $(window).on('keypress', enterSearch)

    if(route.pathname !== '/') $(window).on('scroll', scrollEventHandler as any)

    return (
        <StyledLayout 
            progressCount={loadingProgressCount}
            toggleLoadingStatus={toggleLoadingStatus}
        >
            <div className={toggleBar ? "header toggle" : "header"}>
                <div className="logo" onClick={goMorePage.bind(undefined, '/')}>Store</div>
            </div>
            <div className="main">
                {
                    route.pathname === '/' ? (
                        <>
                            <div className="page">
                                <div className="search-preview-outer">
                                    <div 
                                        className="preview-item-outer" 
                                        ref={previewItemOuterRef} 
                                        onScroll={scrollEventHandler}
                                    >
                                        {
                                            searchResult.length > 0 ? (
                                                $.maps(searchResult, (row, index) => 
                                                    (
                                                        <div 
                                                            ref={(el) => { previewItemRefs.current[index] = el }} 
                                                            className={row.data.length > 0 ? `preview-item ${row.category}` : 'preview-item hidden'} 
                                                            key={index}
                                                        >
                                                            <div className="title-group">
                                                                <div className="title">{
                                                                    row.category
                                                                        .replace('music-video', 'Music Video')
                                                                        .replace('music', 'Music')
                                                                        .replace('podcast', 'Podcast')
                                                                        .replace('ebook', 'Ebook')
                                                                        .replace('software', 'Software')
                                                                    }</div>
                                                                <div 
                                                                    className='more-btn' 
                                                                    onClick={goMorePage.bind(undefined, `/${row.category}?s=${inputVal}`)}
                                                                >
                                                                    More
                                                                </div>
                                                            </div>
                                                            <div className={`item-list ${row.category}`}>
                                                                {{
                                                                    'music': 
                                                                        row.category === 'music' && 
                                                                        row.data.length > 0 &&
                                                                            (
                                                                                <Carousel>
                                                                                    {
                                                                                        $.maps(row.data.length >= 6 ? row.data.slice(0, 6) : row.data, (insideRow, insideRowIndex) => (
                                                                                            <div 
                                                                                                className='item-outer embla__slide' 
                                                                                                key={insideRowIndex} 
                                                                                                onClick={selectItemHandler.bind(undefined, insideRow.trackId, row.category)}
                                                                                            >
                                                                                                <div className="item" ref={element => {

                                                                                                    if(!element) return

                                                                                                    if(insideRow?.artworkUrl100) {

                                                                                                        const imgPlaceHolder = element.querySelector('.img .img-place-holder') as HTMLDivElement
                                                                                                        const imgBackgroundTarget = element.querySelector('.img') as HTMLImageElement

                                                                                                        const imgTemp = new Image()
                                                                                                        imgTemp.src = insideRow.artworkUrl100.replace(/100x100/g,"640x640")

                                                                                                        imgTemp.onload = () => {
                                                                                                            imgBackgroundTarget.style.cssText = `--bg: url('${insideRow.artworkUrl100.replace(/100x100/g,"640x640")}');`
                                                                                                            imgPlaceHolder.classList.remove('toggle')
                                                                                                        }
                                                                                                    }
                                                                                                }}>
                                                                                                    <div className="img">
                                                                                                        <div className="img-place-holder toggle">
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                                                                                <g className="spinner">
                                                                                                                    <circle className="path" cx="25" cy="25" r="20" />
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>{insideRow.artistName} - {insideRow.trackName}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </Carousel>
                                                                            )
                                                                    , 'music-video':
                                                                        row.category === 'music-video' && 
                                                                        row.data.length > 0 && 
                                                                            (
                                                                                <Carousel scrollActionHandler={embla => {
                                                                                    if(embla) setAutoPlayVideoPos(embla.selectedScrollSnap())
                                                                                }}>
                                                                                    {
                                                                                        $.maps(row.data.length >= 6 ? row.data.slice(0, 6) : row.data, (insideRow, insideRowIndex) => (
                                                                                            <div 
                                                                                                className="item-outer embla__slide"
                                                                                                key={insideRowIndex} 
                                                                                                onClick={event => {
                                                                                                    const element = event.target as HTMLDivElement
                                                                                                    
                                                                                                    const classList = $.createArray({ type: 'new', item: element.classList })

                                                                                                    if(!classList.includes('muted-btn')) selectItemHandler(insideRow.trackId, row.category)
                                                                                                }}
                                                                                            >
                                                                                                <div className='item' ref={element => {

                                                                                                    if(!element) return

                                                                                                    if(insideRow?.artworkUrl100) {

                                                                                                        const imgPlaceHolder = element.querySelector('.img .img-place-holder') as HTMLDivElement
                                                                                                        const imgBackgroundTarget = element.querySelector('.img') as HTMLImageElement

                                                                                                        const imgTemp = new Image()
                                                                                                        imgTemp.src = insideRow.artworkUrl100.replace(/100x100/g,"640x640")

                                                                                                        imgTemp.onload = () => {
                                                                                                            imgBackgroundTarget.style.cssText = `--bg: url('${insideRow.artworkUrl100.replace(/100x100/g,"640x640")}');`
                                                                                                            imgPlaceHolder.classList.remove('toggle')
                                                                                                        }
                                                                                                    }
                                                                                                }}>
                                                                                                    {insideRow?.previewUrl ? 
                                                                                                        (
                                                                                                            <div className='video-outer' ref={element => {

                                                                                                                if(!element) return

                                                                                                                const video = element.querySelector('video')

                                                                                                                video!.onloadedmetadata = () => {
                                                                                                                    element.classList.add('toggle')
                                                                                                                }
                                                                                                            }}>
                                                                                                                <div 
                                                                                                                    className="muted-btn" 
                                                                                                                    onClick={setInitState.bind(undefined, prevState => ({ ...prevState, toggleVideoVoice: !toggleVideoVoice }))}
                                                                                                                >
                                                                                                                    {toggleVideoVoice ? <Volume2 /> : <VolumeOff />}
                                                                                                                </div>
                                                                                                                <video
                                                                                                                    className={(autoPlayVideoPos === insideRowIndex) && previewItemActiveIndex === 1 ? "toggle" : ""}
                                                                                                                    playsInline
                                                                                                                    muted={!toggleVideoVoice}
                                                                                                                    autoPlay={previewItemActiveIndex === 1}
                                                                                                                    loop
                                                                                                                    src={insideRow.previewUrl}
                                                                                                                    ref={videoRefHandler.bind(undefined, insideRowIndex)}
                                                                                                                />
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                            <div></div>
                                                                                                        )
                                                                                                    }
                                                                                                    <div className="img">
                                                                                                        <div className="img-place-holder toggle">
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                                                                                <g className="spinner">
                                                                                                                    <circle className="path" cx="25" cy="25" r="20" />
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>{insideRow.artistName} - {insideRow.trackName}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </Carousel>
                                                                            )
                                                                    , 'podcast': 
                                                                        row.category === 'podcast' && 
                                                                        row.data.length > 0 &&
                                                                            (
                                                                                <Carousel>
                                                                                    {
                                                                                        $.maps(row.data.length >= 6 ? row.data.slice(0, 6) : row.data, (insideRow, insideRowIndex) => (
                                                                                            <div 
                                                                                                className="item-outer embla__slide"
                                                                                                key={insideRowIndex}
                                                                                                onClick={selectItemHandler.bind(undefined, insideRow.trackId, row.category)}
                                                                                            >
                                                                                                <div className='item' ref={element => {

                                                                                                    if(!element) return

                                                                                                    if(insideRow?.artworkUrl600) {

                                                                                                        const imgPlaceHolder = element.querySelector('.img .img-place-holder') as HTMLDivElement
                                                                                                        const imgBackgroundTarget = element.querySelector('.img') as HTMLImageElement

                                                                                                        const imgTemp = new Image()
                                                                                                        imgTemp.src = insideRow.artworkUrl600.replace(/100x100/g,"640x640")

                                                                                                        imgTemp.onload = () => {
                                                                                                            imgBackgroundTarget.style.cssText = `--bg: url('${insideRow.artworkUrl600.replace(/100x100/g,"640x640")}');`
                                                                                                            imgPlaceHolder.classList.remove('toggle')
                                                                                                        }
                                                                                                    }
                                                                                                }}>
                                                                                                    <div className="img">
                                                                                                        <div className="img-place-holder toggle">
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                                                                                <g className="spinner">
                                                                                                                    <circle className="path" cx="25" cy="25" r="20" />
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div>類型：{insideRow.primaryGenreName}</div>
                                                                                                    <div>
                                                                                                        <span>{insideRow.collectionName}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </Carousel>
                                                                            )
                                                                    , 'ebook': 
                                                                        row.category === 'ebook' && 
                                                                        row.data.length > 0 &&
                                                                            (
                                                                                <Carousel>
                                                                                    {
                                                                                        $.maps(row.data.length >= 6 ? row.data.slice(0, 6) : row.data, (insideRow, insideRowIndex) => (
                                                                                            
                                                                                            <div 
                                                                                                className="item-outer embla__slide"
                                                                                                key={insideRowIndex}
                                                                                                onClick={selectItemHandler.bind(undefined, insideRow.trackId, row.category)}
                                                                                            >
                                                                                                <div className='item' ref={element => {

                                                                                                    if(!element) return

                                                                                                    if(insideRow?.artworkUrl100) {

                                                                                                        const imgPlaceHolder = element.querySelector('.img .img-place-holder') as HTMLDivElement
                                                                                                        const imgBackgroundTarget = element.querySelector('.img') as HTMLImageElement

                                                                                                        const imgTemp = new Image()
                                                                                                        imgTemp.src = insideRow.artworkUrl100.replace(/100x100/g,"640x640")

                                                                                                        imgTemp.onload = () => {
                                                                                                            imgBackgroundTarget.style.cssText = `--bg: url('${insideRow.artworkUrl100.replace(/100x100/g,"640x640")}');`
                                                                                                            imgPlaceHolder.classList.remove('toggle')
                                                                                                        }
                                                                                                    }
                                                                                                }}
                                                                                                >
                                                                                                    <div className="img">
                                                                                                        <div className="img-place-holder toggle">
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                                                                                <g className="spinner">
                                                                                                                    <circle className="path" cx="25" cy="25" r="20" />
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>分類：{insideRow.genres}</span>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>{insideRow.artistName} - {insideRow.trackName}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </Carousel>
                                                                            )
                                                                    , 'software':
                                                                        row.category === 'software' && 
                                                                        row.data.length > 0 &&
                                                                            (
                                                                                <Carousel>
                                                                                    {
                                                                                        $.maps(row.data.length >= 6 ? row.data.slice(0, 6) : row.data, (insideRow, insideRowIndex) => (
                                                                                            <div 
                                                                                                className="item-outer embla__slide"
                                                                                                key={insideRowIndex}
                                                                                                onClick={selectItemHandler.bind(undefined, insideRow.trackId, row.category)}
                                                                                            >
                                                                                                <div className='item' ref={element => {

                                                                                                    if(!element) return

                                                                                                    if(insideRow?.artworkUrl100) {

                                                                                                        const imgPlaceHolder = element.querySelector('.img .img-place-holder') as HTMLDivElement
                                                                                                        const imgBackgroundTarget = element.querySelector('.img') as HTMLImageElement

                                                                                                        const imgTemp = new Image()
                                                                                                        imgTemp.src = insideRow.artworkUrl100.replace(/100x100/g,"640x640")

                                                                                                        imgTemp.onload = () => {
                                                                                                            imgBackgroundTarget.style.cssText = `--bg: url('${insideRow.artworkUrl100.replace(/100x100/g,"640x640")}');`
                                                                                                            imgPlaceHolder.classList.remove('toggle')
                                                                                                        }
                                                                                                    }
                                                                                                }}>
                                                                                                    <div className="img">
                                                                                                        <div className="img-place-holder toggle">
                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                                                                                <g className="spinner">
                                                                                                                    <circle className="path" cx="25" cy="25" r="20" />
                                                                                                                </g>
                                                                                                            </svg>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>{insideRow.trackName}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </Carousel>
                                                                            )
                                                                }[row.category]}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                isFirstSearchDone && (
                                                    <div className="no-data">
                                                        {isLockSearchInput ? '搜尋中' : '無搜尋資料'}
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <Loading toggleLoadingStatus={isLoading} />
                            <div className={isFirstSearchDone ? "input-frame" : "input-frame toggle"}>
                                <input 
                                    type="text" 
                                    disabled={isLockSearchInput} 
                                    value={inputVal} 
                                    onChange={inputChangeHandler} 
                                    placeholder='請輸入搜尋內容'
                                />
                                <div className="progress"></div>
                            </div>
                            <div className="footer inside">
                                <h6>CopyRight &copy; 2021-01 Alex Chen .</h6>
                            </div>
                            <SingleMusicInfoModal
                                singleData={toggleSingleMusicInfoModalStatus ? singleData : undefined}
                                toggleSingleMusicModalStatus={toggleSingleMusicInfoModalStatus}
                                setToggleSingleMusicModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleMusicInfoModalStatus: false }))}
                            />
                            <SingleMusicVideoInfoModal
                                singleData={toggleSingleMusicVideoInfoModalStatus ? singleData : undefined}
                                toggleSingleMusicVideoModalStatus={toggleSingleMusicVideoInfoModalStatus}
                                setToggleSingleMusicVideoModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleMusicVideoInfoModalStatus: false }))}
                            />
                            <SinglePodcastInfoModal
                                singleData={toggleSinglePodcastInfoModalStatus ? singleData : undefined}
                                toggleSinglePodcastModalStatus={toggleSinglePodcastInfoModalStatus}
                                setToggleSinglePodcastModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSinglePodcastInfoModalStatus: false }))}
                            />
                            <SingleSoftwareInfoModal
                                singleData={toggleSingleSoftwareInfoModalStatus ? singleData: undefined}
                                toggleSingleSoftwareModalStatus={toggleSingleSoftwareInfoModalStatus}
                                setToggleSingleSoftwareModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleSoftwareInfoModalStatus: false }))}
                            />
                            <SingleEbookInfoModal 
                                singleData={toggleSingleEbookInfoModalStatus ? singleData: undefined}
                                toggleSingleEbookModalStatus={toggleSingleEbookInfoModalStatus}
                                setToggleSingleEbookModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleEbookInfoModalStatus: false }))}
                            />
                        </>
                    ) : (
                        <>
                            <Outlet />
                            <div className={toggleBar ? "footer outside toggle" : "footer outside"}>
                                <h6>CopyRight &copy; 2021-01 Alex Chen .</h6>
                            </div>
                        </>
                    )
                }
            </div>
        </StyledLayout>
    )
}

export default Home