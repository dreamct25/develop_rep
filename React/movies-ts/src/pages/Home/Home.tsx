import { 
    useContext, 
    useEffect, 
    useRef, 
    useState,
    type MouseEventHandler
} from 'react'
import { Outlet, useNavigate, useLocation, useRouterState  } from '@tanstack/react-router'
import { RightBar, LeftBar } from '@/component'
import { StyledLayout, NewContext, type resultType } from '.'

const Home:FC = ():TSX => {

    const { $, getReducer, setReducer } = useContext(NewContext)

    const router = useNavigate()

    const route = useLocation()

    const errors = useRouterState()

    const { 
        currentSelectAtLeftBarType, 
        currentWindowInnerWidth,
        floatFooterPos
    } = getReducer(state => ({
        currentSelectAtLeftBarType: state.LeftBarReducer.currentSelectAtLeftBarType,
        currentWindowInnerWidth: state.HomeReducer.currentWindowInnerWidth,
        floatFooterPos: state.LeftBarReducer.floatFooterPos
    }))

    const currentPostType = {
        movie: ['title', 'original_title'],
        tv: ['name', 'original_name']
    }

    const selectListItem = [{
        selectText: '-- 類型 --',
        selectVal: ''
    }, {
        selectText: '電影',
        selectVal: 'movie'
    }, {
        selectText: '影集',
        selectVal: 'tv'
    }, {
        selectText: '演員',
        selectVal: 'actor'
    }]

    const [{
        data,
        singleData,
        isImgLoaded,
        isRwdListToTop,
        toggleSearchBarStatus,
        searchVal,
        selectVal,
        toggleErrorPageLayout
    }, setInitState] = useState<{
        data: { 
            page: number, 
            results: (resultType & Record<string, string>)[], 
            total_pages: number, 
            total_results: number 
        },
        singleData: resultType & Record<string, string> | undefined,
        isImgLoaded: boolean,
        isRwdListToTop: boolean,
        toggleSearchBarStatus: boolean,
        searchVal: string, 
        selectVal: string, 
        toggleErrorPageLayout: boolean
    }>({
        data: {
            page: 0,
            results: [],
            total_pages: 0,
            total_results: 0
        },
        singleData: undefined,
        isImgLoaded: false,
        isRwdListToTop: false,
        toggleSearchBarStatus: false,
        searchVal: '', 
        selectVal: '',
        toggleErrorPageLayout: false
    })

    const [currentRenderCenterListItemsIndex, setCurrentRenderCenterListItemsIndex] = useState<number>(0)
    
    const renderCenterBannerRef = useRef<HTMLDivElement>(null)
    const renderCenterBannerBodyRef = useRef<HTMLDivElement>(null)
    const renderCenterListRef = useRef<HTMLDivElement>(null)
    const renderCenterListItemsRef = useRef<HTMLDivElement[]>([])
    const windowResizeDebounceTimer = useRef<NodeJS.Timeout>(undefined)

    const goSinglePreviewVideo:(id: number) => void = id => {

        router({ 
            to: '/single_preview', 
            search: { id, type: currentSelectAtLeftBarType } 
        })
    }

    const initFetch: (val: 'movie' | 'tv') => Promise<void> = async val => {

        if((currentWindowInnerWidth || window.innerWidth) > 970) {

            if(!renderCenterBannerRef.current) return
        }

        setCurrentRenderCenterListItemsIndex(-1)

        const res = await $.fetch.get<typeof data>(
            `${import.meta.env.VITE_APP_API_URL}/discover/${val}`,
            {
                queryParams: {
                    api_key: import.meta.env.VITE_APP_API_KEY,
                    language: "zh-TW",
                    sort_by: val === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc',
                    page: 1,
                    include_adult: false,
                    'vote_count.gte': 90
                }
            }
        )

        if(res.data.results.length === 0) return

        if((currentWindowInnerWidth || window.innerWidth) > 970) {

            renderCenterBannerRef.current!.animate(
                { transform: 'scale(1.3)', opacity: 0 }, 
                { duration: 500, fill: 'forwards', easing: 'ease' }
            )

            await $.useSleep(500)

            const repackData = {
                ...res.data,
                results: $.sort(res.data.results, (a, b) => b.popularity - a.popularity)
            }

            const [item, ] = repackData.results

            setInitState(prevState => ({
                ...prevState,
                data: repackData,
                singleData: item
            }))

            return
        }

        if(!renderCenterListRef.current) return

        if(renderCenterListRef.current.scrollTop !== 0) {

            setInitState(prevState => ({
                ...prevState,
                isRwdListToTop: true
            }))

            $(renderCenterListRef.current).scrollToPos({ direction: 'top', scrollPos: 0, duration: 1200 })
            
            await $.useSleep(1200)
        }

        const repackData = {
            ...res.data,
            results: $.sort(res.data.results, (a, b) => b.popularity - a.popularity)
        }

        const [item, ] = repackData.results

        setInitState(prevState => ({
            ...prevState,
            data: repackData,
            singleData: item,
            isRwdListToTop: false
        }))
    }

    const pushSearchPage: MouseEventHandler<HTMLDivElement> = () => router({
        to: "/search",
        search: { 
            s: currentSelectAtLeftBarType === 'movie' ? 'popular_movie' : 'popular_tv', 
            type: currentSelectAtLeftBarType 
        }
    })

    const currentSelect: (id: number) => Promise<void> = async id => {

        if(!data) return

        const [filterItem] = $.filter(data.results, row => row.id === id)

        if(!filterItem) return

        if(JSON.stringify(filterItem) === JSON.stringify(singleData)) return

        renderCenterBannerRef.current!.animate(
            { transform: 'scale(1.3)', opacity: 0 }, 
            { duration: 500, fill: 'forwards', easing: 'ease' }
        )

        await $.useSleep(500)

        setInitState(prevState => ({
            ...prevState,
            singleData: filterItem
        }))
    }

    const resizeEventHandler: () => void = () => {

        if(renderCenterBannerBodyRef.current) {

            renderCenterBannerBodyRef.current.style.cssText = `--dynamic-width: ${
                window.innerWidth > 970 ? window.innerWidth - 200 - 292 - 25 : 700
            }px;`
        }
    
        clearTimeout(windowResizeDebounceTimer.current)

        windowResizeDebounceTimer.current = setTimeout(() => {

            setReducer(state => void(
                state.HomeReducer.currentWindowInnerWidth = window.innerWidth
            ), 'HomeReducer/setCurrentWindowInnerWidth')

        }, 100)
    }

    const setSearchVal: (
        type: 'searchVal' | 'selectVal', 
        { target } : { target: HTMLInputElement | HTMLSelectElement }
    ) => void = (type: string, { target }) => {

        setInitState(prevState => ({
            ...prevState,
            [type]: target.value
        }))
    }

    const enterSearch:(e: KeyboardEvent) => void = e => {
        
        if(e.keyCode === 13) {

            if(!selectVal) {

                alert('請選擇搜尋種類')

                return
            }

            router({
                to: "/search",
                search: { s: searchVal ,type: selectVal },
            })
        }
    }

    useEffect(() => {

        if(route.pathname === '/') initFetch('movie')

        setReducer(state => void(
            state.HomeReducer.toggleBarAnimate = !(route.pathname === "/")
        ), 'HomeReducer/setToggleBarAnimate')

    }, [route.pathname])

    useEffect(() => {

        setInitState(prevState => ({
            ...prevState,
            toggleErrorPageLayout: errors.matches.length === 1
        }))

    }, [errors.matches])

    useEffect(() => {

        setReducer(state => void(
            state.HomeReducer.toggleBarAnimate = currentWindowInnerWidth <= 970
        ), 'HomeReducer/setToggleBarAnimate')

        if(currentWindowInnerWidth <= 970 && data.results.length > 0) {

            const container = renderCenterListRef.current

            if(renderCenterListItemsRef.current.length === 0 && !container) return

            const observer = $.elementObserver(
                renderCenterListItemsRef.current, 
                {
                    watchRootElement: container,
                    threshold: 0.6
                },
                observerElementEntry => {

                    if (observerElementEntry.isIntersecting && observerElementEntry.intersectionRatio >= 0.6) {

                        const index = renderCenterListItemsRef.current.indexOf(observerElementEntry.target as HTMLDivElement)

                        if (index !== -1) setCurrentRenderCenterListItemsIndex(index)
                    }
                }
            )

            observer.allWatch()

            return () => observer.allUnWatch();
        }

    }, [currentWindowInnerWidth, data])

    useEffect(() => {

        if(!renderCenterBannerRef.current) return

        if(singleData) {

            if((currentWindowInnerWidth || window.innerWidth) < 970) return

            const imgUrl = `https://image.tmdb.org/t/p/original${singleData.backdrop_path}`

            const bgVal = window.getComputedStyle(renderCenterBannerRef.current).backgroundImage

            if(bgVal === `url("${imgUrl}")`) return       

            const img = new Image()
            img.src = imgUrl

            setInitState(prevState => ({
                ...prevState,
                isImgLoaded: false
            }))

            img.onload = ({ target }) => {
                const element = target as HTMLImageElement
                renderCenterBannerRef.current!.style.cssText = `--scale-bg: url('${element.src}');`

                renderCenterBannerRef.current!.animate(
                    { transform: 'scale(1)', opacity: 1 }, 
                    { duration: 500, fill: 'forwards', easing: 'ease' }
                )

                setInitState(prevState => ({
                    ...prevState,
                    isImgLoaded: true
                }))

                resizeEventHandler()
            }
        }

    }, [singleData, currentWindowInnerWidth])

    useEffect(() => {

        if(route.pathname === '/') initFetch(currentSelectAtLeftBarType)

    }, [currentSelectAtLeftBarType])

    $(window).on('resize', resizeEventHandler)
    $(window).on('keypress', enterSearch)

    return (
        <StyledLayout 
            className={toggleErrorPageLayout ? 'error-page-layout' : ''}
        >
            {
                route.pathname === '/' ? (
                    <div className='main'>
                        <LeftBar />
                        {
                            (
                                <>
                                    {
                                        (currentWindowInnerWidth || window.innerWidth) <= 970 && (
                                            <div className="rwd-header">
                                                <h1 className="title">Movies</h1>
                                            </div>
                                        )
                                    }
                                    <div className="render-center-outer">
                                        {
                                            (currentWindowInnerWidth || window.innerWidth) > 970 ? (
                                                <div className='pc-layout'>
                                                    <div className={singleData && isImgLoaded ? "is-loading-img" : "is-loading-img toggle"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                            <g className="spinner">
                                                                <circle className="path" cx="25" cy="25" r="20" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div 
                                                        className="render-center-banner" 
                                                        ref={renderCenterBannerRef} 
                                                    >
                                                        {
                                                            singleData && (
                                                                <div className="render-center-banner-body" ref={renderCenterBannerBodyRef}>
                                                                    <div className="title">
                                                                        <div className="preview-title">
                                                                            <div className='name'>{singleData[currentPostType[currentSelectAtLeftBarType][0]]}</div>
                                                                            {
                                                                                singleData[currentPostType[currentSelectAtLeftBarType][0]] !== 
                                                                                singleData[currentPostType[currentSelectAtLeftBarType][1]] &&
                                                                                <div className='sub-name'>{singleData[currentPostType[currentSelectAtLeftBarType][1]]}</div>
                                                                            }
                                                                        </div>
                                                                        <div 
                                                                            className="preview-video" 
                                                                            onClick={goSinglePreviewVideo.bind(this, singleData.id)}
                                                                        >
                                                                            預告片
                                                                            <i className="far fa-play-circle play-icon" />
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        singleData.overview && (
                                                                            <div className='desc'>{singleData.overview}</div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='rwd-layout'>
                                                    {
                                                        currentRenderCenterListItemsIndex === 0 && (
                                                            <div className="scroll-icon">
                                                                {
                                                                    navigator.userAgent.toLocaleLowerCase().includes('mobile') ? (
                                                                        <i className="far fa-hand-point-up"></i>
                                                                    ) : (
                                                                        <div className="mouse-icon">
                                                                            <div className="line"></div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    <div 
                                                        className={isRwdListToTop ? "render-center-list stop-snap" : "render-center-list"}
                                                        ref={renderCenterListRef}    
                                                    >
                                                        {$.maps(data.results, (row, index) => (
                                                            <div key={index} className="render-center-item-outer">
                                                                <div 
                                                                    className={currentRenderCenterListItemsIndex === index ? "render-center-item active" : "render-center-item"}
                                                                    ref={element => {

                                                                        if(!element) return

                                                                        renderCenterListItemsRef.current[index] = element
                                                                        element.style.cssText = `--scale-bg: url('https://image.tmdb.org/t/p/original${row.backdrop_path}');`
                                                                    }}
                                                                >
                                                                    <div 
                                                                        className="render-center-body"
                                                                        ref={element => {
                                        
                                                                            if(!element) return
                                                                        
                                                                            element.style.cssText = `--content-pos: ${floatFooterPos - element.offsetHeight}px;`
                                                                        }}
                                                                    >
                                                                        {
                                                                            currentRenderCenterListItemsIndex !== -1 && (
                                                                                <>
                                                                                    <div className={currentRenderCenterListItemsIndex === index ? "top toggle" : "top"}>
                                                                                        <div className="title">
                                                                                            <div className="preview-title">
                                                                                                <div className='left'>
                                                                                                    <div className='name'>{row[currentPostType[currentSelectAtLeftBarType][0]]}</div>
                                                                                                    {
                                                                                                        row[currentPostType[currentSelectAtLeftBarType][0]] !== 
                                                                                                        row[currentPostType[currentSelectAtLeftBarType][1]] &&
                                                                                                        <div className='sub-name'>{row[currentPostType[currentSelectAtLeftBarType][1]]}</div>
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="right">
                                                                                                    <div className="rate">{row.vote_average.toFixed(1)}<i className="fas fa-star stars" /></div>
                                                                                                    <div 
                                                                                                        className="preview-video" 
                                                                                                        onClick={goSinglePreviewVideo.bind(this, row.id)}
                                                                                                    >
                                                                                                        預覽
                                                                                                        <i className="far fa-play-circle play-icon" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="release-date">
                                                                                            {currentSelectAtLeftBarType === 'movie' ? '上映日期' : '首播日期'}：
                                                                                            {currentSelectAtLeftBarType === 'movie' ? row.release_date : row.first_air_date}
                                                                                        </div>
                                                                                    </div>
                                                                                    {
                                                                                        row.overview && (
                                                                                            <div className={currentRenderCenterListItemsIndex === index ? "bottom toggle" : "bottom"}>
                                                                                                <span className='desc'>{row.overview}</span>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                        {
                                                                            data.results.length - 1 === index && (
                                                                                <div 
                                                                                    className="more-info" 
                                                                                    onClick={pushSearchPage}
                                                                                >
                                                                                    更多熱門{currentSelectAtLeftBarType === 'movie' ? '電影' : '影集'}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <LeftBar withRwdMode={true} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={toggleSearchBarStatus ? "search-group-outer toggle" : "search-group-outer"}>
                                        <div className="search-group">
                                            <input 
                                                type="text" 
                                                value={searchVal} 
                                                onChange={setSearchVal.bind(undefined, 'searchVal')} 
                                            />
                                            <select 
                                                defaultValue=""
                                                onChange={setSearchVal.bind(undefined, 'selectVal')}
                                            >
                                                {
                                                    $.maps(selectListItem, ({ selectText, selectVal }, index) => (
                                                        <option 
                                                            key={index} 
                                                            value={selectVal}
                                                        >
                                                            {selectText}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div 
                                        className="search-btn" 
                                        onClick={setInitState.bind(undefined, prevState => ({ 
                                            ...prevState, 
                                            toggleSearchBarStatus: !toggleSearchBarStatus 
                                        }))}
                                    >
                                        <i className="fal fa-search" />
                                    </div>
                                </>
                            )
                        }
                        <RightBar
                            postData={data?.results || []}
                            postCurrentSelect={currentSelect}
                        />
                    </div>
                ) : (
                    <>
                        <div className='main'>
                            <Outlet />
                        </div>
                        <div className="footer">
                            <h6>CopyRight &copy; 2021 Alex Chen .</h6>
                        </div>
                    </>
                )
            }
        </StyledLayout>
    )
}

export default Home