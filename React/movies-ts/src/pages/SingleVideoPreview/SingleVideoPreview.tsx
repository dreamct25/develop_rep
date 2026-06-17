import { useState, useEffect, useContext } from "react"
import { useSearch } from '@tanstack/react-router'
import { Converter as LangConverter } from 'opencc-js'
import { NewContext } from '@/App'
import { Video, NoImage, CastModal, Loading } from '@/component'
import { StyledLayout, type singleVideoItemType, type singleVideoItemReviewType } from '.'

const SingleVideoPreview:FC = (): TSX => {

    const { $, getReducer } = useContext(NewContext)

    const query = useSearch({ from: '/single_preview' }) as {
        id: number,
        type: 'movie' | 'tv'
    }

    const { currentWindowInnerWidth } = getReducer(state => state.HomeReducer)

    const currentPostType = {
        movie: ['title', 'original_title', 'release_date'],
        tv: ['name', 'original_name', 'first_air_date']
    }

    const [{
        singleVideoItem,
        singleVideoItemUrl,
        singleVideoItemReview,
        selectId,
        toggleCastModalStatus,
        isLoadingStatus
    }, setInitState] = useState<{
        singleVideoItem: singleVideoItemType | undefined,
        singleVideoItemUrl: string,
        singleVideoItemReview: singleVideoItemReviewType[],
        selectId: number,
        toggleCastModalStatus: boolean,
        isLoadingStatus: boolean
    }>({
        singleVideoItem: undefined,
        singleVideoItemUrl: '',
        singleVideoItemReview: [],
        selectId: -1,
        toggleCastModalStatus: false,
        isLoadingStatus: false
    })

    const renderStars: (rate: number) => TSX = rate => {

        const [fullCount, floatCount] = rate.toFixed(1).split('.')
        
        const lessCount = 10 - parseInt(fullCount) - (parseInt(floatCount) > 1 ? 1 : 0)

        const allStars = [
            ...$.createArray(
                { type: 'fake', item: { random: parseInt(fullCount) } }, 
                num => (
                    <i key={num + 1} className="fas fa-star stars" />
                )
            ),
            parseInt(floatCount) > 1 && (
                <i className="fas fa-star-half-alt stars" />
            ),
            ...$.createArray(
                { type: 'fake', item: { random: lessCount } }, 
                num => (
                    <i key={num + 1000} className="far fa-star stars" />
                )
            )
        ]

        return (
            <div className="stars-group">
                {...$.filter(allStars, row => row !== false)}
            </div>
        )
    }

    const renderVideoDetailsType: (item: { id: number, name: string }[]) => string = item => {

        const convert = LangConverter({ from: 'cn', to: 'tw' })

        return $.maps(item, ({ name }) => convert(name)).join('、')
    }

    const getSingleItems: () => Promise<void> = async () => {

        setInitState(prevState => ({
            ...prevState,
            isLoadingStatus: true
        }))

        try {

            if(singleVideoItemUrl) {

                setInitState(prevState => ({
                    ...prevState,
                    singleVideoItem: undefined,
                    singleVideoItemUrl: '',
                    singleVideoItemReview: []
                }))
            }

            const baseReqUrl = `${import.meta.env.VITE_APP_API_URL}/${query.type}/${query.id}`

            const allRes = await Promise.all([
                // getSingleVideoItem
                $.fetch.get<singleVideoItemType>(baseReqUrl, {
                    queryParams: {
                        api_key: import.meta.env.VITE_APP_API_KEY,
                        language: "zh-TW",
                        append_to_response: "credits"
                    }
                }),
                // getSingleVideoUrl
                $.fetch.get<{ results: { key: string, name: string }[] }>(`${baseReqUrl}/videos`, {
                    queryParams: {
                        api_key: import.meta.env.VITE_APP_API_KEY
                    }
                }),
                // getSingleReiview
                $.fetch.get<{ results: singleVideoItemReviewType[] }>(`${baseReqUrl}/reviews`, {
                    queryParams: {
                        api_key: import.meta.env.VITE_APP_API_KEY
                    }
                })
            ])

            const [result1, result2, result3] = allRes

            if(!result1.data || !result2.data || !result3.data) throw new Error()

            const [filterTrailerItem] = result2.data.results.filter(({ name }) => name.match('Official') || name.match('Trailer'))

            setInitState(prevState => ({
                ...prevState,
                singleVideoItem: result1.data,
                singleVideoItemUrl: filterTrailerItem ? `https://www.youtube.com/watch?v=${filterTrailerItem.key}` : '',
                singleVideoItemReview: result3.data.results
            }))

            const result1Data = JSON.parse(JSON.stringify(result1.data)) as Record<string, string>

            document.title = result1Data[currentPostType[query.type][0]];
            
        } catch(e) {
            console.log(e)
        }

        setInitState(prevState => ({
            ...prevState,
            isLoadingStatus: false
        }))
    }

    const setCurrentSelectId: (id: number) => void = id => {

        setInitState(prevState => ({
            ...prevState,
            selectId: id,
            toggleCastModalStatus: true
        }))
    }

    const setToggleCastModalStatus: (status: boolean) => void = status => {

        setInitState(prevState => ({
            ...prevState,
            toggleCastModalStatus: status
        }))
    }

    const singleCastGroupOuterOnWheelRef:(element: HTMLDivElement | null) => void = element => {
        
        if(!element) return
                            
        element!.onwheel = event => {

            event.preventDefault()

            element.scrollLeft += event.deltaY
        }
    }

    useEffect(() => {

        getSingleItems()

    }, [query.id])

    return (
        <StyledLayout>
            {
                singleVideoItemUrl ? (
                    <Video url={singleVideoItemUrl} />
                ) : (
                     <div className="no-video">
                        <div className="no-video-title">-- No Trailer --</div>
                        <div className="no-video-frame"></div>
                    </div>
                )
            }
            {
                singleVideoItem && (
                    <div className="single-container">
                        <div className="single-title">
                            <div className="title">
                                <div className="title-group">
                                    <span>{$.typeFix<Record<string, string>, singleVideoItemType>(singleVideoItem)[currentPostType[query.type][0]]}</span>
                                    <span>{$.typeFix<Record<string, string>, singleVideoItemType>(singleVideoItem)[currentPostType[query.type][1]]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="single-descript">
                            <div className="descript">{singleVideoItem.overview}</div>
                        </div>
                        <div className="single-else">
                            <div className="release-date">
                                <span>{query.type === 'movie' ? '上映日期' : '首播日期'}</span>
                                <span>{$.typeFix<Record<string, string>, singleVideoItemType>(singleVideoItem)[currentPostType[query.type][2]]}</span>
                            </div>
                            <div className="rate">
                                <span>評分</span>
                                {
                                    singleVideoItem.vote_average > 0 ? (
                                        <div className="rate-star">
                                            {renderStars(singleVideoItem.vote_average)}
                                        </div>
                                    ) : (
                                        <span>無評分</span>
                                    )
                                }
                            </div>
                            <div className="video-type">
                                <span>{query.type === 'movie' ? '電影類型' : '影集類型'}</span>
                                <span>{renderVideoDetailsType(singleVideoItem.genres)}</span>
                            </div>
                        </div>
                        <div className="single-cast-group-outer-fram">
                            <div className="single-cast-group-title">主要演員</div>
                            <div 
                                className="single-cast-group-outer" 
                                ref={singleCastGroupOuterOnWheelRef}
                            >
                                <div className="single-cast-group">
                                    {
                                        $.maps(
                                            singleVideoItem.credits.cast, 
                                            ({ id, profile_path, original_name, character }, index) => (
                                                <div className="cast-card-outer" key={index}>
                                                    <div 
                                                        className="cast-card" 
                                                        onClick={setCurrentSelectId.bind(undefined, id)}
                                                    >
                                                        <div className="cast-card-img">
                                                            {
                                                                profile_path ? (
                                                                    <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" />
                                                                ) : (
                                                                    <NoImage text={'No Cast Image'} fontSize={18} />
                                                                )
                                                            }
                                                        </div>
                                                        <div className="cast-title">
                                                            <span>{original_name}</span>
                                                            <span>{character ? `飾演：${character}` : character}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="single-review-outer">
                            <div className="single-review-title">用戶評價</div>
                            <div className="single-review-item-outer">
                                <div className="single-review-item-title">
                                    <span>用戶</span>
                                    <span>評價</span>
                                    <span>留言時間</span>
                                </div>
                                {
                                    singleVideoItemReview.length > 0 ? 
                                        $.maps(singleVideoItemReview, ({
                                            author_details: { username, rating },
                                            updated_at
                                        }, index) => (
                                            <div className="single-review-item" key={index}>
                                                <span>{username}</span>
                                                {
                                                    (currentWindowInnerWidth || window.innerWidth) > 768 ? (
                                                        <span>{rating ? renderStars(rating) : '無評分'}</span>
                                                    ) : (
                                                        <span>
                                                            {
                                                                rating ? 
                                                                    <>
                                                                        <i className="fas fa-star" />
                                                                        {rating} / 10
                                                                    </> : 
                                                                    '無評分'
                                                            }
                                                        </span>
                                                    )
                                                }
                                                
                                                <span>{$.formatDateTime({ formatDate: updated_at, formatType: 'yyyy-MM-dd' })}</span>
                                            </div>)
                                        ) : <div className="no-review">-- 無評論 --</div>
                                }
                            </div>
                        </div>
                        <Loading isLoading={isLoadingStatus} />
                        <CastModal 
                            postToggleCastModalStatus={toggleCastModalStatus} 
                            postSelectId={selectId} 
                            postSetToggleCastModalStatus={setToggleCastModalStatus}
                        />
                    </div>
                )
            }
        </StyledLayout>
    )
}

export default SingleVideoPreview