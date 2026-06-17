import { Dispatch, FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { actionCreatorType, singleVideoItemType, singleVideoItemCastType, singleVideoItemReviewType, objType, reducerState, cssSetPropertys } from './types'
import Video from '../Video/Video'
import NoVideo from "../NoVideo/NoVideo"
import NoImage from "../NoImage/NoImage"
import CastModal from "../CastModal/CastModal"
import Loading from "../Loading/Loading"
import componentEntries from '../SingleVideoPreview'
import React from "react"

const openCC = require('opencc-js')

const convert = openCC.Converter({ from: 'cn', to: 'tw' })

const { actionCreator, styles: { Show } }: {
    actionCreator: actionCreatorType,
    styles: cssSetPropertys
} = componentEntries

const SingleVideoPreview: FunctionComponent<{}> = React.memo((): JSX.Element => {

    const { search }: { search: string } = useLocation()

    const useQuery: URLSearchParams = ((): URLSearchParams => new URLSearchParams(search))()

    const { singleVideoItem, singleVideoItemUrl, singleVideoItemReview, selectId, castModalToggel, loadingState, currentPostType }: objType = useSelector((state: reducerState): objType => ({
        singleVideoItem: state.getIn(['singleVideoPreview', 'singleVideoItem']) as singleVideoItemType | { [key: string]: any },
        singleVideoItemUrl: state.getIn(['singleVideoPreview', 'singleVideoItemUrl']) as { [key: string]: any },
        singleVideoItemReview: state.getIn(['singleVideoPreview', 'singleVideoItemReview']) as { [key: string]: any },
        selectId: state.getIn(['singleVideoPreview', 'selectId']) as number,
        castModalToggel: state.getIn(['singleVideoPreview', 'castModalToggel']) as boolean,
        loadingState: state.getIn(['singleVideoPreview', 'loadingState']) as boolean,
        currentPostType: state.getIn(['singleVideoPreview', 'currentPostType']).toJS() as { [key: string]: any }
    }))

    const dispatch: Dispatch<any> = useDispatch()

    const { overview, vote_average, genres }: singleVideoItemType | { [key: string]: any } = singleVideoItem

    const renderStar: (rate: number) => JSX.Element = rate => {
        let stars: number[] = []
        let splitFloat = Math.floor(rate)
        let getFloat: number = Number(String(rate).split('.')[1])
        for (let x = 0; x < splitFloat; x++) { stars = [...stars, x] }
        return (
            <div className="stars-group">
                {stars.map((num: number) => <i key={num} className="fas fa-star stars"></i>)}
                {getFloat > 1 ? <i className="fas fa-star-half-alt stars"></i> : ''}
            </div>
        )
    }

    const timeFormat: (time: string) => JSX.Element = time => {
        const [dates]: string[] = new Date(time).toJSON().split('T')
        return (<span className="time"><span>{dates}</span></span>)
    }

    const renderVideoDetailsType: (item: { [key: string]: any }[]) => string = item => item.map(({ name }: { [key: string]: any }) => convert(name)).join('、')

    const getSingleItems: () => void = () => dispatch(actionCreator.postCurrentId(Number(useQuery.get('id')), useQuery.get('type')!))

    const setCurrentSelectId: (id: number) => void = id => {
        dispatch(actionCreator.setCurrentSelectId(id))
        dispatch(actionCreator.setCastModalToggel(true))
    }

    const setCastModalToggel: (status: boolean) => void = status => dispatch(actionCreator.setCastModalToggel(status))

    const renderTextSwitch: (val: string) => any = val => currentPostType[val]

    const setLoadingState: (status: boolean) => void = status => dispatch(actionCreator.setLoadingState(status))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => dispatch(actionCreator.restAllObj()),[])

    useEffect(() => {
        dispatch(actionCreator.restAllObj())
        getSingleItems()
        return () => {
            dispatch(actionCreator.setLoadingState(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useQuery.get('id')])

    useEffect(() => {
        dispatch(actionCreator.setCastModalToggel(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        setLoadingState(!('results' in singleVideoItemUrl))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleVideoItemUrl])

    return (
        <Show>
            {'id' in singleVideoItemUrl && singleVideoItemUrl.results.length !== 0 ? <Video url={`https://www.youtube.com/watch?v=${singleVideoItemUrl.results[0].key}&autoplay=1`} /> : <NoVideo />}
            {'id' in singleVideoItem && <div className="single-container">
                <div className="container">
                    <div className="single-title">
                        <div className="title">
                            <div className="title-group">
                                <span>{singleVideoItem[renderTextSwitch(useQuery.get('type')!)![0]]}</span>
                                <span>{singleVideoItem[renderTextSwitch(useQuery.get('type')!)![1]]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="single-descript">
                        <div className="descript">{overview}</div>
                    </div>
                    <div className="single-else">
                        <div className={window.innerWidth > 414 ? 'row g-0' : 'row g-2'}>
                            <div className="col-md-4">
                                <div className="release-date">
                                    <span>{useQuery.get('type') === 'movie' ? '上映日期' : '首播日期'}</span>
                                    <span>{singleVideoItem[renderTextSwitch(useQuery.get('type')!)![2]]}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="rate">
                                    <span>評分</span>
                                    <div className="rate-star">
                                        <span>{renderStar(vote_average)}</span>
                                        <span>{vote_average} / 10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="video-type">
                                    <span>{useQuery.get('type') === 'movie' ? '電影類型' : '影集類型'}</span>
                                    <span>{renderVideoDetailsType(genres)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-cast-group-outer-fram">
                        <div className="single-cast-group-title">主要演員</div>
                        <div className="single-cast-group-outer">
                            <div className="single-cast-group">
                                {'id' in singleVideoItem ? singleVideoItem.credits.cast.map(({ id, profile_path, original_name, character }: singleVideoItemCastType, index: number) => (
                                    <div className="cast-card-outer" key={index}>
                                        <div className="cast-card" onClick={setCurrentSelectId.bind(this, id)}>
                                            <div className="cast-card-img">
                                                {typeof profile_path === 'string' ? <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" /> : <NoImage text={'No Cast Image'} />}
                                            </div>
                                            <div className="cast-title">
                                                <span>{original_name}</span>
                                                <span>飾演：{character}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : ""}
                            </div>
                        </div>
                    </div>
                    <div className="single-review-outer">
                        <div className="single-review-title">用戶評價</div>
                        <div className="single-review-item-outer">
                            <div className="single-review-item-title">
                                <span>用戶</span>
                                {window.innerWidth > 414 && <span>評價</span>}
                                <span>級分</span>
                                <span>留言時間</span>
                            </div>
                            {singleVideoItemReview.constructor.name === 'Object' && 'results' in singleVideoItemReview && singleVideoItemReview.results.length !== 0 ? singleVideoItemReview.results.map(({
                                author_details: { username, rating },
                                updated_at
                            }: singleVideoItemReviewType, index: number) => (
                                <div className="single-review-item" key={index}>
                                    <span>{username}</span>
                                    {window.innerWidth > 414 && <span>{rating === null ? '無評價' : renderStar(rating)}</span>}
                                    <span>{rating === null ? '無評分' : `${rating} / 10`}</span>
                                    <span>{timeFormat(updated_at)}</span>
                                </div>)
                            ) : <div className="no-review">-- 暫無評論 --</div>}
                        </div>
                    </div>
                    <div className="single-preview-footer">
                        <div className="icon"><i className="far fa-copyright"></i>Copy Right By Chen</div>
                    </div>
                </div>
                <Loading haveOpen={loadingState} />
                <CastModal postToggles={castModalToggel} postId={selectId} postSetCastModalToggle={setCastModalToggel} />
            </div>}
        </Show>
    )
})

export default SingleVideoPreview