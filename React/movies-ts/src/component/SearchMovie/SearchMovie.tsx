import { useState, useContext, useEffect, useRef } from "react";
import { useSearch, useNavigate } from '@tanstack/react-router'
import { Converter as LangConverter } from 'opencc-js'
import { InfinitiScroll, Loading, NoImage } from '@/component'
import { NewContext } from '@/App'
import { StyledLayout, type resultsItemType } from '.'

const RenderSearchMovie: FC = (): TSX => {

    const { $ } = useContext(NewContext)

    const query = useSearch({ from: '/search' }) as {
        s: string,
        type: string
    }

    const router = useNavigate()

    const pathQuerySearchVal = query.s

    const [{
        data,
        renderData,
        isLoadingStatus,
        currentPage,
        isInitFetch,
        filterValue,
        catagoryId,
        genresList
    }, setInitState] = useState<{
        data: {
            page: number,
            total_pages: number
            results: resultsItemType[],
            total_results: number
        },
        renderData: resultsItemType[]
        isLoadingStatus: boolean,
        currentPage: number,
        isInitFetch: boolean,
        filterValue: { 
            isAdult: boolean, 
            sortRule: string,
            type: string
        },
        catagoryId: number,
        genresList: { genId: number, genName: string }[]
    }>({
        data: {
            page: 0,
            total_pages: 0,
            results: [],
            total_results: 0
        },
        renderData:[],
        isLoadingStatus: false,
        currentPage: 0,
        isInitFetch: true,
        filterValue:{
            isAdult: false, 
            sortRule: '',
            type: ''
        },
        catagoryId: -1,
        genresList: []
    })

    const filterListItem: {
        title: string,
        value: "adult" | "date" | "rate"
    }[] = [{
        title: filterValue.isAdult ? '取消成人項' : '包含成人項',
        value: 'adult'
    }, {
        title: filterValue.sortRule.match('date.asc') ? '反序日期項' : '順序日期項',
        value: 'date'
    }, {
        title: filterValue.sortRule.match('average.asc') ? '最高評分項' : '最低評分項',
        value: 'rate'
    }]

    const catagoryListRef = useRef<HTMLDivElement>(null)
    const filterItemListRef = useRef<HTMLDivElement>(null)
    const movieBodyRef = useRef<HTMLDivElement>(null)

    const goSingleVideo: (id: number) => void = id => {
        router({ to: '/single_preview', search: { id, type: 'movie' } })
    }

    const getSearchMovieItem: (isInit?: boolean) => Promise<void> = async isInit => {

        const url = pathQuerySearchVal === 'popular_movie' ? 
            `${import.meta.env.VITE_APP_API_URL}/discover/movie` :
            `${import.meta.env.VITE_APP_API_URL}/search/movie`
        
        const paramsObj: {
            include_adult: boolean,
            query?: string,
            sort_by?: string,
            ['vote_count.gte']?: number,
            language?: string
        } = {
            ...pathQuerySearchVal === 'popular_movie' ? 
                {
                    include_adult: filterValue.isAdult,
                    sort_by: filterValue.sortRule,
                    'vote_count.gte': 90
                } : {
                    query: pathQuerySearchVal,
                    include_adult: false,
                    language: 'zh-TW'
                }
        }

        if((renderData.length === data.total_results) && currentPage > 1) return

        const page = currentPage + 1

        if(isInit) {

            let repackGenresList: typeof genresList = []

            if(pathQuerySearchVal === 'popular_movie') {

                const genresListRes = await $.fetch.get<{ 
                    genres: { id: number, name: string }[] 
                }>(`${import.meta.env.VITE_APP_API_URL}/genre/movie/list`, {
                    queryParams: {
                        language: 'zh',
                        api_key: import.meta.env.VITE_APP_API_KEY
                    }
                })

                if(genresListRes.data) {

                    const convert = LangConverter({ from: 'cn', to: 'tw' })

                    const { genres } = genresListRes.data

                    repackGenresList = $.maps(genres, row => ({
                        genId: row.id,
                        genName: convert(row.name)
                    })) 
                }
            }

            setInitState(prevState => ({ 
                ...prevState, 
                isLoadingStatus: false, 
                isInitFetch: false,
                genresList: repackGenresList
            }))
        }

        const res = await $.fetch.get<typeof data>(url , {
            queryParams: {
                api_key: import.meta.env.VITE_APP_API_KEY,
                language: "zh-TW",
                page,
                ...catagoryId !== -1 ? { with_genres: catagoryId } : {},
                ...paramsObj
            }
        })

        if(res.data) {

            const renderDataTemp = new Set([...renderData, ...res.data.results]).toArray<resultsItemType>()

            setInitState(prevState => ({
                ...prevState,
                data: res.data,
                renderData: renderDataTemp,
                currentPage: page
            }))
        }

        if(isInit) setInitState(prevState => ({ ...prevState, isLoadingStatus: false }))
    }

    const setFilterValue: (value: string) => void = value => {

        setInitState(prevState => {

            const prevStateTemp = {
                ...prevState,
                data: {
                    page: 0,
                    total_pages: 0,
                    results: [],
                    total_results: 0
                },
                renderData:[],
                currentPage: 0,
                filterValue: {
                    isAdult: false,
                    sortRule: '',
                    type: value === 'reset' || prevState.filterValue.isAdult ? '' : value
                }
            }

            if(value === 'adult') {

                prevStateTemp.filterValue.isAdult = !prevState.filterValue.isAdult

                return prevStateTemp
            }

            if(value === 'date') {

                prevStateTemp.filterValue.sortRule = 
                    filterValue.sortRule.includes('.asc') ? 
                        'primary_release_date.desc' : 
                        'primary_release_date.asc'

                return prevStateTemp
            }

            if(value === 'rate') {

                prevStateTemp.filterValue.sortRule = 
                    filterValue.sortRule.includes('.asc') ? 
                        'vote_average.desc' : 
                        'vote_average.asc'

                return prevStateTemp
            }

            return prevStateTemp
        })
    }

    const scrollFilterListHandler: (action: 'right' | 'left', filterType: string) => void = (action, filterType)  => {

        if(!catagoryListRef.current) return

        const listChildClassName = filterType === 'catagory' ? '.catagory-item' : '.filter-item'

        const listEement = filterType === 'catagory' ? catagoryListRef.current : filterItemListRef.current
        
        if(!listEement) return
        
        const listEementRect = listEement.getBoundingClientRect();
        const listItemEements = $.createArray({ type: 'new', item: listEement.querySelectorAll(listChildClassName) }) as HTMLDivElement[];

        const element = [...action === 'right' ? listItemEements : listItemEements.reverse()].find(row => {
            
            const singleElementRect = row.getBoundingClientRect()

            return action === 'right' ? 
                // 找到第一個「右邊界超出容器」的元素（被截斷的）
                singleElementRect.right > listEementRect.right :
                // 找到第一個「左邊界超出容器左側」的元素
                singleElementRect.left < listEementRect.left
        })

        if(!element) return

        const elementRect = element.getBoundingClientRect()

        const elementScrollLeft = listEement.scrollLeft + (elementRect[action] - listEementRect[action]);

        $(listEement).scrollToPos({ direction: 'left', scrollPos: elementScrollLeft, duration: 1000 })
    }

    const catagorySelectHandler:(catagoryId: number) => Promise<void> = async catagoryId => {

        setInitState(prevState => ({
            ...prevState,
            data: {
                page: 0,
                total_pages: 0,
                results: [],
                total_results: 0
            },
            renderData: [],
            currentPage: 0,
            catagoryId
        }))
    }

    useEffect(() => {

        if(!isInitFetch) getSearchMovieItem()

    }, [filterValue, catagoryId])

    useEffect(() => {

        getSearchMovieItem(true)

    }, [pathQuerySearchVal])

    return (
        <StyledLayout>
            <div className={pathQuerySearchVal === 'popular_movie' ? "search-movie" : "search-movie toggle"}>
                <div className="search-movie-header">
                    <div className={pathQuerySearchVal === 'popular_movie' ? "search-movie-title" : "search-movie-title with-search"}>
                        {
                            pathQuerySearchVal === 'popular_movie' ? (
                                <div>熱門電影</div>
                            ) : (
                                <>
                                    <div>搜尋電影</div>
                                    <div>包含：{pathQuerySearchVal}</div>
                                </>
                            )
                        }
                    </div>
                    <div className="search-movie-totals">共 {data?.total_results || 0} 部電影</div>
                </div>
                <div className="search-filter-group">
                    <div className="top-filter">
                        <div className="catagory-list-outer-frame">
                            <div className="catagory-list-outer">
                                <div 
                                    className="left-btn"
                                    onClick={scrollFilterListHandler.bind(undefined, 'left', 'catagory')}
                                >
                                    <i className="fas fa-angle-left" />
                                </div>
                                <div className="catagory-list" ref={catagoryListRef}>
                                    {
                                        $.maps(genresList, (row, index) => (
                                            <div 
                                                key={index}
                                                className={catagoryId === row.genId ? "catagory-item active" : "catagory-item"}
                                                onClick={catagorySelectHandler.bind(undefined, row.genId)}
                                            >
                                                {row.genName}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div 
                                    className="right-btn" 
                                    onClick={scrollFilterListHandler.bind(undefined, 'right', 'catagory')}
                                >
                                    <i className="fas fa-angle-right" />
                                </div>
                            </div>
                            <div 
                                className="catagory-reset-btn"
                                onClick={
                                    setInitState.bind(undefined, prevState => ({
                                        ...prevState,
                                        data: {
                                            page: 0,
                                            total_pages: 0,
                                            results: [],
                                            total_results: 0
                                        },
                                        renderData: [],
                                        currentPage: 0,
                                        catagoryId: -1
                                    }))
                                }
                            >{catagoryId === -1 ? '未篩選' : '重置'}</div>
                        </div>
                    </div>
                    <div className="bottom-filter">
                        <div className="filter-item-list-outer-frame">
                            <div className="filter-item-list-outer">
                                <div 
                                    className="left-btn"
                                    onClick={scrollFilterListHandler.bind(undefined, 'left', 'filter')}
                                >
                                    <i className="fas fa-angle-left" />
                                </div>
                                <div className="filter-item-list" ref={filterItemListRef}>
                                    {
                                        $.maps(filterListItem, ({ title, value }, index) => (
                                            <div 
                                                key={index} 
                                                className={filterValue.type === value ? "filter-item active" : "filter-item"} 
                                                onClick={setFilterValue.bind(undefined, value)}
                                            >
                                                {title}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div 
                                    className="right-btn" 
                                    onClick={scrollFilterListHandler.bind(undefined, 'right', 'filter')}
                                >
                                    <i className="fas fa-angle-right" />
                                </div>
                            </div>
                            <div 
                                className="filter-item-reset-btn" 
                                onClick={setFilterValue.bind(undefined, 'reset')}
                            >
                                {!filterValue.isAdult && !filterValue.sortRule ? '未篩選' : '重置'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-movie-body-outer">
                    <div className="search-movie-body" ref={movieBodyRef}>
                        {
                            renderData.length > 0 && movieBodyRef.current ? (
                                <div className="movie-list">
                                    <InfinitiScroll
                                        mountedElement={movieBodyRef.current}
                                        isFloatLoadingText={false}
                                        triggerOffset={200}
                                        list={renderData}
                                        currentPage={data.page}
                                        pageSize={renderData.length < 20 ? renderData.length : 20}
                                        totalPages={data.total_pages}
                                        loadMoreResultHandler={getSearchMovieItem}
                                        renderList={list => 
                                            $.maps(list, ({ id, poster_path, release_date, title, vote_average }, index) => (
                                                <div 
                                                    className="poster-card"
                                                    key={index}
                                                    onClick={goSingleVideo.bind(undefined, id)}
                                                >
                                                    <div className="poster-card-mask">更多簡介</div>
                                                    <div className="poster-img">
                                                        {
                                                            poster_path ? ( 
                                                                <div 
                                                                    className="img"
                                                                    ref={element => { 
                                                                        
                                                                        if(element) element.style.cssText = `--poster-img: url('https://image.tmdb.org/t/p/original${poster_path}');`
                                                                    }}
                                                                />
                                                            ) : ( 
                                                                <NoImage text={'No Poster Image'} />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="rate">{vote_average.toFixed(1)} <i className="fas fa-star stars" /></div>
                                                    <div className="poster-title">
                                                        <span>片名：{title || '暫無資訊'}</span>
                                                    </div>
                                                    <div className="release-date">日期：{release_date || '暫無資訊'}</div>
                                                </div>
                                            ))
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="no-result">
                                    {
                                        isLoadingStatus ? 
                                            '載入中' : 
                                            !isLoadingStatus && renderData.length === 0 ? 
                                                pathQuerySearchVal ? 
                                                    '-- 無搜尋結果 --' : '無資料' 
                                                    : '載入中'
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Loading isLoading={isLoadingStatus} />
        </StyledLayout>
    )
}

export default RenderSearchMovie