import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { actionCreatorType } from './types'
import { StyledComponent } from "styled-components";
import componentEntries from '../CastModal'
import NoImage from "../NoImage/NoImage";
import { useHistory } from "react-router";
import Loading from "../Loading/Loading";

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface CastModalProps {
    postToggles:boolean
    postId: number,
    postSetCastModalToggle: Function
}

interface dataType {
    id: number,
    also_known_as: string[],
    biography: string,
    birthday: string,
    name: string,
    place_of_birth: string,
    profile_path: string
}

interface combinedCreditsType {
    id: number
    title: string,
    original_title: string,
    character: string,
    release_date: string,
    poster_path: string,
    media_type: string
}

interface objType {
    data: any,
    moviePostToggle: any,
    loadingState:any,
    postPath:any
}

const CastModal: FunctionComponent<CastModalProps> = ({ postToggles,postId, postSetCastModalToggle }: CastModalProps): JSX.Element => {

    const { data, moviePostToggle,loadingState,postPath }: objType = useSelector((state: Immutable.Collection<unknown, unknown>): objType => ({
        data: state.getIn(["castModal", "data"]),
        moviePostToggle: state.getIn(["castModal", "moviePostToggle"]),
        loadingState:state.getIn(['castModal','loadingState']),
        postPath:state.getIn(['castModal','postPath'])
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

    const modalSwitch: Function = (status: boolean): void => {
        postSetCastModalToggle(status)
        !status && dispatch(actionCreator.setSingleCastItem({}))
    }

    const moviePostToggles: Function = (haveOpen: boolean): void => {
        dispatch(actionCreator.setMoviePostToggle(haveOpen))
        !haveOpen && setTimeout(() => dispatch(actionCreator.setPostPath('')),700) 
    }

    const filterTranditionalChineseName: Function = (item: string[]):string => {
        const filterWord:string[] = item.filter((name: string) => new RegExp('^[\u4E00-\u9FA5]+$').test(name.replace(/·/g, '').trim()))
        const openCC = require('opencc-js')
        const convert = openCC.Converter({ from: 'cn', to: 'tw' })
        return filterWord.map((word:string) => convert(word))[0]
    }


    const goSingleVideo: Function = (...item: any[]): void => {
        const [id, type]: number[] | string[] = item
        let obj: { [key: string]: any } = {
            pathname: '/single_preview',
            search: `id=${id}&type=${type}`
        }
        route.push({ ...obj })
    }

    const setLoadingState:Function = (status:boolean):void => {
        dispatch(actionCreator.setLoadingState(status))
    }

    const showMoviePost:Function = (postPath:string):void => {
        dispatch(actionCreator.setPostPath(postPath))
        setTimeout(() => moviePostToggles(true),500)
    } 

    useEffect(() => {
        if(postToggles){
            setLoadingState(true)
            dispatch(actionCreator.getSingleCastItem(postId))
            modalSwitch(postToggles)
        }
        
        return modalSwitch(postToggles)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postToggles])

    useEffect(() => {
        'name' in data && setLoadingState(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    return (
        <Show>
            <div className={postToggles ? "cast-modal-outer cast-modal-outer-toggle" : "cast-modal-outer"}>
                <div className="cast-modal">
                    <div className="close" onClick={modalSwitch.bind(this, false)}>
                        <i className="fal fa-times"></i>
                    </div>
                    <div className="cast-modal-body">
                        <div className="cast-profile">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <div className="cast-profile-left">
                                        <div className="img-outer">
                                            {profile_path !== null && profile_path !== undefined ? <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" /> : <NoImage text={'No Poster Image'} />}
                                        </div>
                                        <div className="cast-details">
                                            <span>{also_known_as !== undefined && filterTranditionalChineseName(also_known_as)}</span>
                                            <span>{name}</span>
                                            <span>生日：{birthday}</span>
                                            <span>出生地：{place_of_birth}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="cast-profile-right">
                                        <div className="cast-movie-list-outer">
                                            <div className="title">主演</div>
                                            <div className="cast-movie-list-title">
                                                <span>電影</span>
                                                <span></span>
                                                <span>飾演角色</span>
                                                <span>日期</span>
                                            </div>
                                            <div className="cast-movie-list">
                                                {'combined_credits' in data && data.combined_credits.cast.sort((a: { release_date: string }, b: { release_date: string }) => {
                                                    if ('release_date' in a && 'release_date' in b) {
                                                        return Number(b.release_date.replace(/-/g, '')) - Number(a.release_date.replace(/-/g, ''))
                                                    } else {
                                                        return a
                                                    }
                                                }).map(({ id, title, original_title, character, release_date, poster_path, media_type }: combinedCreditsType, index: number) => (
                                                    <div key={index} className="list-item">
                                                        <div className="title" onClick={goSingleVideo.bind(this, id, media_type)}>
                                                            <span>{title}</span>
                                                            <span>{original_title}</span>
                                                        </div>
                                                        <div className="movie-post" onClick={showMoviePost.bind(this,poster_path)}>電影封面</div>
                                                        <div>{character === '' ? '暫無飾演角色' : character}</div>
                                                        <div>{release_date === '' ? '暫無日期' : release_date}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="cast-descript-outer">
                                        <div className="cast-descript-title">個人簡介</div>
                                        {biography === '' ? <div className="cast-no-descript">-- 暫無個人簡介 --</div> : <div className="cast-descript">{biography}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loading haveOpen={loadingState} />
                <div className={moviePostToggle ? "post-img-outer post-img-outer-toggle" : "post-img-outer"}>
                    { postPath !== '' || postPath !== undefined ? <img src={`https://image.tmdb.org/t/p/original${postPath}`} alt="" /> : <NoImage text={'No Poster Image'} />}
                    <div className="close-img" onClick={moviePostToggles.bind(this,false)}>
                        <i className="fal fa-times"></i>
                    </div>
                </div>
            </div>
        </Show>
    )
}

export default CastModal