import { useState, useContext, useEffect, useRef } from "react";
import { useSearch } from "@tanstack/react-router";
import { NewContext } from '@/App'
import { InfinitiScroll, CastModal, Loading, NoImage } from '@/component'
import { StyledLayout, type resultsItemType } from '.'


const SearchActor: FC = (): TSX => {

    const { $ } = useContext(NewContext)

    const query = useSearch({ from: '/search' }) as {
        s: string,
        type: string
    }

    const pathQuerySearchVal = query.s

    const [{
        data, 
        renderData, 
        isLoadingStatus, 
        selectId, 
        toggleCastModalStatus,
        currentPage
    }, setInitState] = useState<{
        data: {
            page: number,
            total_pages: number
            results: resultsItemType[],
            total_results: number
        },
        renderData: resultsItemType[]
        isLoadingStatus: boolean,
        selectId: number,
        toggleCastModalStatus: boolean,
        currentPage: number
    }>({
        data: {
            page: 0,
            total_pages: 0,
            results: [],
            total_results: 0
        },
        renderData: [],
        isLoadingStatus: false,
        selectId: -1,
        toggleCastModalStatus: false,
        currentPage: 0
    })

    const actorBodyRef = useRef<HTMLDivElement>(null)

    const setToggleCastModalStatus: (status: boolean) => void = status => {
        
        setInitState(prevState => ({
            ...prevState,
            toggleCastModalStatus: status
        }))
    }

    const goSingleActor: (id: number) => void = id => {
        
        setInitState(prevState => ({
            ...prevState,
            selectId: id,
            toggleCastModalStatus: true
        }))
    }

    const getSearchActorItem: (isInit?: boolean) => Promise<void> = async isInit => {

        if((renderData.length === data.total_results) && currentPage > 1) return

        const page = currentPage + 1

        if(isInit) setInitState(prevState => ({ ...prevState, isLoadingStatus: false }))

        const res = await $.fetch.get<typeof data>(`${import.meta.env.VITE_APP_API_URL}/search/person`, {
            queryParams: {
                api_key: import.meta.env.VITE_APP_API_KEY,
                language: "zh-TW",
                page,
                query: pathQuerySearchVal,
                include_adult: true
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

    useEffect(() => {
        getSearchActorItem(true)
    }, [pathQuerySearchVal])

    return (
        <StyledLayout>
            <div className="search-actor">
                <div className="search-actor-header">
                    <div className="search-actor-title">演員</div>
                    <div className="search-actor-totals">共 {data?.total_results || 0} 位演員</div>
                </div>
                <div className="search-actor-body-outer">
                    <div className="search-actor-body" ref={actorBodyRef}>
                        {
                            renderData.length > 0 && actorBodyRef.current ? (
                                <div className="actor-list">
                                    <InfinitiScroll
                                        mountedElement={actorBodyRef.current}
                                        isFloatLoadingText={false}
                                        triggerOffset={200}
                                        list={renderData}
                                        currentPage={data.page}
                                        pageSize={20}
                                        totalPages={data.total_pages}
                                        loadMoreResultHandler={getSearchActorItem}
                                        renderList={list => 
                                            $.maps(list, ({ id, name, profile_path }, index) => (
                                                <div 
                                                    className="poster-card"
                                                    key={index}
                                                    onClick={goSingleActor.bind(undefined, id)}
                                                >
                                                    <div className="poster-card-mask">更多簡介</div>
                                                    <div className="poster-img">
                                                        {
                                                            profile_path ? 
                                                                <div 
                                                                    className="img" 
                                                                    style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${profile_path}')` }}
                                                                /> : 
                                                                <NoImage text={'No Poster Image'} />
                                                        }
                                                    </div>
                                                    <div className="poster-title">{name}</div>
                                                </div>
                                            ))
                                        }
                                    />
                                </div>
                            )  : (
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
            <CastModal 
                postToggleCastModalStatus={toggleCastModalStatus} 
                postSelectId={selectId} 
                postSetToggleCastModalStatus={setToggleCastModalStatus} 
            />
        </StyledLayout>
    )
}

export default SearchActor