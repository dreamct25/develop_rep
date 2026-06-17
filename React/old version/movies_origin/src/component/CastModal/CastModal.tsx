import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { actionCreatorType, CastModalProps, dataType, combinedCreditsCastType, combinedCreditsCrewType, objType, reducerState, cssSetPropertys } from './types'
import { useHistory } from "react-router";
import componentEntries from '../CastModal'
import NoImage from "../NoImage/NoImage";
import Loading from "../Loading/Loading";

const openCC = require('opencc-js')

const convert = openCC.Converter({ from: 'cn', to: 'tw' })

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: cssSetPropertys
} = componentEntries

const CastModal: FunctionComponent<CastModalProps> = ({ postToggles, postId, postSetCastModalToggle }: CastModalProps): JSX.Element => {

    const { data, moviePostToggle, loadingState, postPath }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(["castModal", "data"]) as dataType,
        moviePostToggle: state.getIn(["castModal", "moviePostToggle"]) as boolean,
        loadingState: state.getIn(['castModal', 'loadingState']) as boolean,
        postPath: state.getIn(['castModal', 'postPath']) as string
    }))

    const route = useHistory()

    const {
        also_known_as,
        biography,
        birthday,
        name,
        place_of_birth,
        profile_path
    }: dataType = data

    const dispatch: Dispatch<any> = useDispatch()

    const modalSwitch: (status: boolean) => void = status => {
        postSetCastModalToggle(status)
        !status && dispatch(actionCreator.setSingleCastItem({}))
    }

    const moviePostToggles: (haveOpen: boolean) => void = haveOpen => {
        dispatch(actionCreator.setMoviePostToggle(haveOpen))
        !haveOpen && setTimeout(() => dispatch(actionCreator.setPostPath('')), 700)
    }

    const filterTranditionalChineseName: (item: string[]) => string = item => {
        const filterWord: string[] = item.filter((name: string) => new RegExp('^[\u4E00-\u9FA5]+$').test(name.replace(/·/g, '').trim()))
        const exportStr: string = filterWord.length !== 0 ? filterWord.map((word: string) => convert(word))[0] : ''
        return exportStr
    }

    const goSingleVideo: ([id, type]: [number, string]) => void = ([id, type]) => {
        route.push({ pathname: '/single_preview', search: `id=${id}&type=${type}` })
        modalSwitch(false)
    }

    const setLoadingState: (status: boolean) => void = status => dispatch(actionCreator.setLoadingState(status))

    const showMoviePost: (postPath: string) => void = postPath => {
        if (postPath === '' || postPath === null || postPath === undefined) {
            alert('無封面')
        } else {
            dispatch(actionCreator.setPostPath(postPath))
            setTimeout(() => moviePostToggles(true), 500)
        }
    }

    const repackArr: (arr: { [key: string]: any }[]) => any = arr => {
        let arrTemp: { [key: string]: any }[] = []
        arr.forEach((item: { [key: string]: any }) => arrTemp.push('first_air_date' in item ? { ...item, release_date: item.first_air_date } : item))
        arrTemp = arrTemp.sort((a: { [key: string]: any }, b: { [key: string]: any }): any => {
            let item: number | undefined
            if ('release_date' in a && 'release_date' in b) { item = Number(b.release_date.replace(/-/g, '')) - Number(a.release_date.replace(/-/g, '')) }
            return item
        })
        return arrTemp
    }

    const filterTheSame: (arr: combinedCreditsCrewType[]) => combinedCreditsCrewType[] = arr => {
        const arrTemp: combinedCreditsCrewType[] = []
        arr.forEach((item: combinedCreditsCrewType) => arrTemp.findIndex((find: combinedCreditsCrewType) => find.id === item.id) === -1 && arrTemp.push(item))
        return repackArr(arrTemp)
    }



    useEffect(() => {
        if (postToggles) {
            setLoadingState(true)
            dispatch(actionCreator.getSingleCastItem(postId))
            modalSwitch(postToggles)
        } else {
            modalSwitch(postToggles)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postToggles])

    useEffect(() => {
        'name' in data && setLoadingState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <Show>
            <div className={postToggles ? "cast-modal cast-modal-toggle" : "cast-modal"}>
                <div className="close" onClick={modalSwitch.bind(this, false)}>
                    <i className="fal fa-times"></i>
                </div>
                <div className="cast-modal-body">
                    <div className="cast-profile">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="img-outer">
                                    {profile_path !== null && profile_path !== undefined ? <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" /> : <NoImage text={'No Cast Image'} />}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="cast-details-outer">
                                    <div className="cast-details">
                                        <span>{also_known_as !== undefined && filterTranditionalChineseName(also_known_as) !== '' ? filterTranditionalChineseName(also_known_as) : name}</span>
                                        <span>{name}</span>
                                        <span>生日：{birthday === null ? '暫無出生資訊' : birthday}</span>
                                        <span>出生地：{place_of_birth === null ? '暫無出生地資訊' : place_of_birth}</span>
                                    </div>
                                </div>
                                <div className="cast-famous-video-outer">
                                    <div className="cast-famous-video-title">著名影視</div>
                                    <div className="cast-famous-video-list">
                                        {'combined_credits' in data && data.combined_credits?.crew.length !== 0 ? filterTheSame(data.combined_credits?.crew).map(({ id, title, name, original_title, original_name, poster_path, media_type }: combinedCreditsCrewType, index: number) => (
                                            <div key={index} className="cast-famous-video-list-item" onClick={goSingleVideo.bind(this, [id, media_type])}>
                                                {poster_path !== null && poster_path !== undefined ? <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" /> : <NoImage text={'No Image'} />}
                                                <div className="famous-title">
                                                    <div className="title-group">
                                                        <span>{media_type === "movie" ? title : name}</span>
                                                        <span>{media_type === "movie" ? original_title : original_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <div className="no-cast-famous-video">-- 暫無著名影視 --</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="cast-descript-outer">
                                    <div className="cast-descript-title">個人簡介</div>
                                    {biography === '' ? <div className="cast-no-descript">-- 暫無個人簡介 --</div> : <div className="cast-descript">{biography}</div>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="cast-movie-list-outer">
                                    <div className="title">主演</div>
                                    <div className="cast-movie-list-title">
                                        <span>電影</span>
                                        <span></span>
                                        <span>飾演角色</span>
                                        <span>日期</span>
                                    </div>
                                    <div className="cast-movie-list">
                                        {'combined_credits' in data && repackArr(data.combined_credits?.cast).map(({ id, title, name, original_title, original_name, character, release_date, poster_path, media_type }: combinedCreditsCastType, index: number) => (
                                            <div key={index} className="list-item">
                                                <div className="title" onClick={goSingleVideo.bind(this, [id, media_type])}>
                                                    <span>{media_type === "movie" ? title : name}</span>
                                                    <span>{media_type === "movie" ? original_title : original_name}</span>
                                                </div>
                                                <div className="movie-post" onClick={showMoviePost.bind(this, poster_path)}>{media_type === "movie" ? "電影封面" : "影集封面"}</div>
                                                <div>{character === '' ? '暫無飾演角色' : character}</div>
                                                <div>{release_date === '' || release_date === undefined ? '暫無日期' : release_date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading haveOpen={loadingState} />
            <div className={moviePostToggle ? "post-img-outer post-img-outer-toggle" : "post-img-outer"}>
                {postPath !== '' && <img src={`https://image.tmdb.org/t/p/original${postPath}`} alt="" />}
                <div className="close-img" onClick={moviePostToggles.bind(this, false)}>
                    <i className="fal fa-times"></i>
                </div>
            </div>
        </Show>
    )
}

export default CastModal