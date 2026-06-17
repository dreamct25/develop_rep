import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from '@tanstack/react-router'
import { Converter as LangConverter } from 'opencc-js'
import { InfinitiScroll, Loading, NoImage } from '@/component'
import { NewContext } from '@/App'
import { StyledLayout, type resultsItemType } from '.'

const ComingSoonList: FC = (): TSX => {

    const router = useNavigate()

    const { $ } = useContext(NewContext)

    const [{
        data, 
        renderData, 
        isLoadingStatus,
        currentPage,
        isInitFetch,
        catagoryId,
        genresList
    }, setInitState] = useState<{
        data: {
            page: number,
            total_pages: number
            results: resultsItemType[],
            total_results: number
        },
        renderData:resultsItemType[],
        isLoadingStatus: boolean,
        currentPage: number,
        isInitFetch: boolean,
        catagoryId: number,
        genresList: { genId: number, genName: string }[]
    }>({
        data: {
            page: 0,
            total_pages: 0,
            results: [],
            total_results: 0
        }, 
        renderData: [],
        isLoadingStatus: false,
        currentPage: 0,
        isInitFetch: true,
        catagoryId: -1,
        genresList: []
    })

    const catagoryListRef = useRef<HTMLDivElement>(null)
    const comingSoonMovieBodyRef = useRef<HTMLDivElement>(null)

    const goSingleVideo: (id: number) => void = id => router({ to: '/single_preview', search: { id, type: 'movie' }})

    const getItem: (isInit?: boolean) => Promise<void> = async isInit => {
        
        if((renderData.length === data.total_results) && currentPage > 1) return

        const page = currentPage + 1

        if(isInit) {

            let repackGenresList: typeof genresList = []
            
            const genresListRes = await $.fetch.get<{ genres: { id: number, name: string }[] }>(`${import.meta.env.VITE_APP_API_URL}/genre/movie/list`, {
                queryParams: {
                    language: 'zh',
                    api_key: import.meta.env.VITE_APP_API_KEY
                }
            })

            if(genresListRes.data) {

                const convert =  LangConverter({ from: 'cn', to: 'tw' })

                const { genres } = genresListRes.data

                repackGenresList = $.maps(genres, row => ({
                    genId: row.id,
                    genName: convert(row.name)
                })) 
            }

            setInitState(prevState => ({ 
                ...prevState, 
                isLoadingStatus: true, 
                isInitFetch: false,
                genresList: repackGenresList
            }))
        }

        const res = await $.fetch.get<typeof data>(`${import.meta.env.VITE_APP_API_URL}/discover/movie`, {
            queryParams: {
                api_key: import.meta.env.VITE_APP_API_KEY,
                language: "zh-TW",
                'primary_release_date.gte': $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd' }),
                sort_by: 'primary_release_date.asc',
                ...catagoryId !== -1 ? { with_genres: catagoryId } : {},
                page
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

    const scrollCatagoryFilterListHandler: (action: string) => void = action => {

        if(!catagoryListRef.current) return

        const catagoryListEement = catagoryListRef.current
        const catagoryListEementRect = catagoryListEement.getBoundingClientRect();
        const catagoryItemEements: HTMLDivElement[] = $.createArray({ type: 'new', item: catagoryListEement.querySelectorAll('.catagory-item') });

        const element = [...action === 'right' ? catagoryItemEements : catagoryItemEements.reverse()].find(row => {
            
            const itemRect = row.getBoundingClientRect()

            return action === 'right' ? 
                // 找到第一個「右邊界超出容器」的元素（被截斷的）
                itemRect.right > catagoryListEementRect.right :
                // 找到第一個「左邊界超出容器左側」的元素
                itemRect.left < catagoryListEementRect.left
        })

        if(!element) return

        const elementRect = element.getBoundingClientRect()

        const elementScrollLeft = catagoryListEement.scrollLeft + (action === 'right' ? (elementRect.left - catagoryListEementRect.left) : elementRect.right - catagoryListEementRect.right);

        $(catagoryListRef.current).scrollToPos({ direction: 'left', scrollPos: elementScrollLeft, duration: 1000 })
    }

    useEffect(() => {

        if(!isInitFetch) getItem()

    }, [catagoryId])

    useEffect(() => {

        getItem(true)
        
    }, [])

    return (
        <StyledLayout>
            <div className="coming-soon-movie-outer">
                <div className="coming-soon-movie-header">
                    <div className="title">即將上映電影</div>
                </div>
                <div className="catagory-list-outer-frame">
                    <div className="catagory-list-outer">
                        <div 
                            className="left-btn"
                            onClick={scrollCatagoryFilterListHandler.bind(undefined, 'left')}
                        >
                            <i className="fas fa-angle-left"></i>
                        </div>
                        <div className="catagory-list" ref={catagoryListRef}>
                            {
                                $.maps(genresList, (row, index) => (
                                    <div 
                                        key={index}
                                        className={catagoryId === row.genId ? "catagory-item active" : "catagory-item"}
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
                                                catagoryId: row.genId
                                            }))
                                        }
                                    >{row.genName}</div>
                                ))
                            }
                        </div>
                        <div 
                            className="right-btn" 
                            onClick={scrollCatagoryFilterListHandler.bind(undefined, 'right')}
                        >
                            <i className="fas fa-angle-right"></i>
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
                <div className="coming-soon-movie-body-outer">
                    <div className="coming-soon-movie-body" ref={comingSoonMovieBodyRef}>
                        {
                            renderData.length > 0 && comingSoonMovieBodyRef.current ? (
                                <div className="coming-soon-movie-list">
                                    <InfinitiScroll
                                        mountedElement={comingSoonMovieBodyRef.current}
                                        isFloatLoadingText={false}
                                        triggerOffset={200}
                                        list={renderData}
                                        currentPage={data.page}
                                        pageSize={20}
                                        totalPages={data.total_pages}
                                        loadMoreResultHandler={getItem}
                                        renderList={list => 
                                            $.maps(list, ({ id, poster_path, release_date, title, vote_average }, index) => (
                                                <div 
                                                    className="poster-card" 
                                                    key={index}
                                                    onClick={goSingleVideo.bind(this, id)}
                                                >
                                                    <div className="poster-card-mask">更多簡介</div>
                                                    <div className="poster-img">
                                                        {
                                                            poster_path ? (
                                                                <div 
                                                                    className="img" 
                                                                    style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}
                                                                />
                                                            ) : ( 
                                                                <NoImage text={'No Poster Image'} />
                                                            )
                                                        }
                                                    </div>
                                                    {
                                                        vote_average !== 0 && (
                                                            <div className="rate">
                                                                {vote_average.toFixed(1)} <i className="fas fa-star stars"></i>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="poster-title">
                                                        <span>片名：{title || '暫無資訊'}</span>
                                                    </div>
                                                    <div className="release-date">上映日期：{release_date || '暫無資訊'}</div>
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
                                                '無資料' : 
                                                '載入中'
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

export default ComingSoonList