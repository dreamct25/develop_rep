import { Collection } from "immutable"
import { Dispatch, FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { StyledComponent } from "styled-components"
import { actionCreatorType } from './types'
import Video from '../Video/Video'
import componentEntries from '../SingleVideoPreview'
import NoVideo from "../NoVideo/NoVideo"
import NoImage from "../NoImage/NoImage"
import CastModal from "../CastModal/CastModal"
import Loading from "../Loading/Loading"

const { actionCreator, styles: { Show } }: {
    actionCreator: actionCreatorType,
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface SingleVideoPreviewProps {

}

interface objType {
    singleVideoItem: any,
    singleVideoItemUrl: any,
    singleVideoItemReview: any,
    selectId: any,
    castModalToggel: any,
    loadingState: any
}

interface singleVideoItemType {
    overview: string,
    vote_average: number,
    genres: string[]
}

interface singleVideoItemCastType {
    id: number
    profile_path: string,
    original_name: string,
    character: string
}

interface singleVideoItemReviewType {
    author_details: {
        username: string,
        rating: number
    },
    updated_at: string
}

const SingleVideoPreview: FunctionComponent<SingleVideoPreviewProps> = (): JSX.Element => {
    const { search }: { search: string } = useLocation()
    const useQurey = ((): URLSearchParams => new URLSearchParams(search))()
    const { singleVideoItem, singleVideoItemUrl, singleVideoItemReview, selectId, castModalToggel, loadingState }: objType = useSelector((state: Collection<unknown, unknown>): objType => ({
        singleVideoItem: state.getIn(['singleVideoPreview', 'singleVideoItem']),
        singleVideoItemUrl: state.getIn(['singleVideoPreview', 'singleVideoItemUrl']),
        singleVideoItemReview: state.getIn(['singleVideoPreview', 'singleVideoItemReview']),
        selectId: state.getIn(['singleVideoPreview', 'selectId']),
        castModalToggel: state.getIn(['singleVideoPreview', 'castModalToggel']),
        loadingState: state.getIn(['singleVideoPreview', 'loadingState'])
    }))

    const dispatch: Dispatch<any> = useDispatch()

    const { overview, vote_average, genres }: singleVideoItemType = singleVideoItem

    const renderStar: Function = (rate: number): JSX.Element => {
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

    const timeFormat: Function = (time: string): JSX.Element => {
        const [dates, times]: string[] = new Date(time).toJSON().split('T')
        return (<span className="time"><span>{dates}</span><span>{times.split('.')[0].replace(/:/g, '：')}</span></span>)
    }

    const renderVideoDetailsType: Function = (item: { [key: string]: any }[]): string => item.map(({ name }: { [key: string]: any }) => {
        const openCC = require('opencc-js')
        const convert = openCC.Converter({ from: 'cn', to: 'tw' })
        return convert(name)
    }).join('、')

    const getSingleItems: Function = (): void => dispatch(actionCreator.postCurrentId(useQurey.get('id'), useQurey.get('type')))

    const setCurrentSelectId: Function = (id: number) => {
        dispatch(actionCreator.setCurrentSelectId(id))
        dispatch(actionCreator.setCastModalToggel(true))
    }

    const setCastModalToggel: Function = (status: boolean) => {
        dispatch(actionCreator.setCastModalToggel(status))
    }

    const renderTextSwitch: Function = (val: string): string[] | undefined => {
        switch (val) {
            case 'movie':
                return ['title', 'original_title', 'release_date']
            case 'tv':
                return ['name', 'original_name', 'first_air_date']
        }
    }

    const setLoadingState: Function = (status: boolean): void => {
        dispatch(actionCreator.setLoadingState(status))
    }

    useEffect(() => {
        getSingleItems()
        return () => {
            dispatch(actionCreator.restAllObj())
            dispatch(actionCreator.setLoadingState(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useQurey.get('id')])

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
            {'id' in singleVideoItemUrl && 'results' in singleVideoItemUrl ? <Video url={`https://www.youtube.com/watch?v=${singleVideoItemUrl.results[0].key}&autoplay=1`} /> : <NoVideo />}
            {'id' in singleVideoItem && <div className="single-container">
                <div className="container">
                    <div className="single-title">
                        <div className="title">
                            <div className="title-group">
                                <span>{singleVideoItem[renderTextSwitch(useQurey.get('type'))[0]]}</span>
                                <span>{singleVideoItem[renderTextSwitch(useQurey.get('type'))[1]]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="single-descript">
                        <div className="descript">{overview}</div>
                    </div>
                    <div className="single-else">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="release-date">
                                    <span>{useQurey.get('type') === 'movie' ? '上映日期' : '首播日期'}</span>
                                    <span>{singleVideoItem[renderTextSwitch(useQurey.get('type'))[2]]}</span>
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
                                    <span>{useQurey.get('type') === 'movie' ? '電影類型' : '影集類型'}</span>
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
                                <span>評價</span>
                                <span>級分</span>
                                <span>留言時間</span>
                            </div>
                            {singleVideoItemReview.constructor.name === 'Object' && 'results' in singleVideoItemReview && singleVideoItemReview.results.length !== 0 ? singleVideoItemReview.results.map(({
                                author_details: { username, rating },
                                updated_at
                            }: singleVideoItemReviewType, index: number) =>
                                <div className="single-review-item" key={index}>
                                    <span>{username}</span>
                                    <span>{rating === null ? '無評價' : renderStar(rating)}</span>
                                    <span>{rating === null ? '無評分' : `${rating} / 10`}</span>
                                    <span>{timeFormat(updated_at)}</span>
                                </div>
                            ) : <div className="no-review">-- 暫無評論 --</div>}
                        </div>
                    </div>
                </div>
                <Loading haveOpen={loadingState} />
                <CastModal postToggles={castModalToggel} postId={selectId} postSetCastModalToggle={setCastModalToggel} />
            </div>}
        </Show>
    )
}

export default SingleVideoPreview