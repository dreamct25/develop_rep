import { useEffect, useState, useContext } from "react";
import { useNavigate } from '@tanstack/react-router'
import { NoImage, Loading } from '@/component'
import { NewContext } from '@/App'
import { StyledLayout, type combinedCreditsCastType, type famouseVideosType } from '.'

const CastModal: FC<{
    postToggleCastModalStatus: boolean, 
    postSelectId: number, 
    postSetToggleCastModalStatus: (status: boolean) => void
}> = ({ postToggleCastModalStatus, postSelectId, postSetToggleCastModalStatus }): TSX => {

    const router = useNavigate()

    const { $ } = useContext(NewContext)

    const [{
        data, 
        moviePostToggle, 
        isLoadingStatus, 
        postPath
    }, setIniState] = useState<{
        data: {
            id: number,
            also_known_as: string[],
            biography: string,
            birthday: string,
            name: string,
            original_name?: string,
            place_of_birth: string,
            profile_path: string,
            combined_credits?:{ 
                cast: combinedCreditsCastType[]
            }
            famouseVideos: famouseVideosType[]
        } | undefined,
        moviePostToggle: boolean, 
        isLoadingStatus: boolean, 
        postPath: string
    }>({
        data: undefined, 
        moviePostToggle: false, 
        isLoadingStatus: false, 
        postPath: ''
    })

    const toggleModalStatus: (status: boolean) => void = status => {
        
        postSetToggleCastModalStatus(status)

        if(!status) {

            setTimeout(() => {

                setIniState(prevState => ({
                    ...prevState,
                    data: undefined
                }))

            }, 700)
        }
    }

    const moviePostToggles: (isOpen: boolean) => void = isOpen => {

        setIniState(prevState => ({
            ...prevState,
            moviePostToggle: isOpen
        }))

        if(!isOpen) {

            setTimeout(() => {

                setIniState(prevState => ({
                    ...prevState,
                    postPath: ''
                }))

            }, 700)
        }
    }

    const goSingleVideo: ([id, type]: [number, string]) => void = ([id, type]) => {

        router({ to: '/single_preview', search: { id, type } })
        
        toggleModalStatus(false)
    }

    const showMoviePost: (postPath?: string) => void = postPath => {

        if (!postPath) {

            alert('無封面')

            return
        }

        setIniState(prevState => ({
            ...prevState,
            postPath
        }))

        setTimeout(() => moviePostToggles(true), 500)
    }

    const repackArr: (arr: combinedCreditsCastType[]) => combinedCreditsCastType[] = arr => {
        
        const arrTemp = $.maps(arr, item => 
            item?.first_air_date ? { ...item, release_date: item.first_air_date } : item
        )
        
        return $.sort(arrTemp, (a, b) => {

            if (a?.release_date && b?.release_date) { 
                return parseInt(b.release_date.replace(/-/g, '')) - parseInt(a.release_date.replace(/-/g, '')) 
            }

            return 0
        })
    }

    const getSingleCastItemResult: (postSelectId: number) => Promise<void> = async postSelectId => {

        setIniState(prevState => ({
            ...prevState,
            isLoadingStatus: true
        }))

        const res = await $.fetch.get<
            Exclude<typeof data, undefined>
        >(`${import.meta.env.VITE_APP_API_URL}/person/${postSelectId}`, {
            queryParams: {
                api_key: import.meta.env.VITE_APP_API_KEY,
                language: "zh-TW",
                append_to_response: 'combined_credits',
            }
        })

        if(res.data) {

            const singleActorItem: {
                known_for: famouseVideosType[];
                original_name: string;
                name: string;
            } = {
                known_for: [],
                original_name: '',
                name: ''
            }

            const { length, [length - 1]: actorName } = res.data.also_known_as

            const searchPersonInfoRes = await $.fetch.get<{ 
                results: {
                    id: number,
                    known_for: famouseVideosType[], 
                    original_name: string,
                    name: string
                }[] 
            }>(`${import.meta.env.VITE_APP_API_URL}/search/person`, {
                queryParams: {
                    api_key: import.meta.env.VITE_APP_API_KEY,
                    language: "zh-TW",
                    query: actorName,
                    include_adult: true
                }
            })

            if(searchPersonInfoRes.data) {

                if(searchPersonInfoRes.data.results.length > 0) {

                    const { results } = searchPersonInfoRes.data

                    const [filterSingleActorItem] = $.filter(results, row => row.id === postSelectId)

                    if(filterSingleActorItem) {
                        singleActorItem.known_for = filterSingleActorItem.known_for
                        singleActorItem.name = filterSingleActorItem.name
                        singleActorItem.original_name = filterSingleActorItem.original_name
                    }
                }
            }

            setIniState(prevState => ({
                ...prevState,
                data: {
                    ...res.data,
                    name: singleActorItem.name || res.data.name,
                    original_name: singleActorItem.original_name || res.data.also_known_as[res.data.also_known_as.length - 1],
                    famouseVideos: singleActorItem.known_for.length > 0 ? singleActorItem.known_for : []
                } 
            }))

            toggleModalStatus(postToggleCastModalStatus)
        }

        setIniState(prevState => ({
            ...prevState,
            isLoadingStatus: false
        }))
    }

    useEffect(() => {

        if (postToggleCastModalStatus) {

            getSingleCastItemResult(postSelectId)
            toggleModalStatus(postToggleCastModalStatus)

            document.body.style.cssText = 'overflow: hidden;'

            return
        }

        document.body.style.cssText = ''

    }, [postToggleCastModalStatus])

    return (
        <StyledLayout 
            profilePath={data?.profile_path ? `https://image.tmdb.org/t/p/original${data.profile_path }` : ''}
        >
            <div className={postToggleCastModalStatus ? "cast-modal cast-modal-toggle" : "cast-modal"}>
                <div 
                    className="close" 
                    onClick={toggleModalStatus.bind(undefined, false)}
                >
                    <i className="fal fa-times"></i>
                </div>
                <div className="cast-modal-body">
                    {
                        data ? (
                            <div className="cast-profile">
                                <div className="cast-details-outer">
                                    <div className="img-outer">
                                        {
                                            data.profile_path ? (
                                                <div className="img" />
                                            ) : (
                                                <NoImage text={'No Cast Image'} />
                                            )
                                        }
                                    </div>
                                    <div className="cast-details">
                                        <div className="top">
                                            <span>{data.name}</span>
                                            {
                                                data?.original_name ? 
                                                    data?.original_name !== data.name ? (
                                                        <span>{data.original_name}</span>
                                                    ) : false 
                                                    : false
                                            }
                                        </div>
                                        <div className="bottom">
                                            <span>
                                                <i className="fas fa-birthday-cake" />
                                                {data.birthday || '無資訊'}
                                            </span>
                                            <span>
                                                <i className="fas fa-map-marked-alt" />
                                                {data.place_of_birth || '無資訊'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cast-famous-video-outer">
                                    <div className="cast-famous-video-title">著名影視</div>
                                    <div className="cast-famous-video-list">
                                        {
                                            data.famouseVideos.length > 0 ? 
                                                $.maps(data.famouseVideos, ({ 
                                                    id, 
                                                    title, 
                                                    name, 
                                                    original_title, 
                                                    original_name, 
                                                    poster_path, 
                                                    media_type 
                                                }, index) => (
                                                        <div 
                                                            key={index} 
                                                            className="cast-famous-video-list-item" 
                                                            onClick={goSingleVideo.bind(this, [id, media_type])}
                                                        >
                                                            {
                                                                poster_path && poster_path ? (
                                                                    <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
                                                                ) : (
                                                                    <NoImage text={'No Image'} />
                                                                )
                                                            }
                                                            <div className="famous-title">
                                                                <div className="title-group">
                                                                    <span>{media_type === "movie" ? title : name}</span>
                                                                    <span>{media_type === "movie" ? original_title : original_name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ) : <div className="no-cast-famous-video">-- 無著名影視 --</div> 
                                        }
                                    </div>
                                </div>
                                <div className="cast-movie-list-outer">
                                    <div className="title">主演</div>
                                    <div className="cast-movie-list-title">
                                        <span>電影</span>
                                        <span></span>
                                        <span>飾演角色</span>
                                        <span>日期</span>
                                    </div>
                                    <div className="cast-movie-list">
                                        {
                                            data.combined_credits?.cast ? 
                                                $.maps(repackArr(data.combined_credits.cast), ({ 
                                                    id, 
                                                    title, 
                                                    name, 
                                                    original_title, 
                                                    original_name, 
                                                    character, 
                                                    release_date, 
                                                    poster_path, 
                                                    media_type 
                                                }, index) => (
                                                    <div key={index} className="list-item">
                                                        <div 
                                                            className="title" 
                                                            onClick={goSingleVideo.bind(undefined, [id, media_type])}
                                                        >
                                                            <span>{media_type === "movie" ? title : name}</span>
                                                            <span>{media_type === "movie" ? original_title : original_name}</span>
                                                        </div>
                                                        <div 
                                                            className="movie-post" 
                                                            onClick={showMoviePost.bind(undefined, poster_path)}
                                                        >
                                                            {media_type === "movie" ? "電影封面" : "影集封面"}
                                                        </div>
                                                        <div>{character || '無飾演角色'}</div>
                                                        <div>{release_date || '無日期'}</div>
                                                    </div>
                                                )
                                            ) : <div>無飾演角色</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : <div>無資料</div>
                    }
                </div>
            </div>
            <Loading isLoading={isLoadingStatus} />
            <div className={moviePostToggle ? "post-img-outer post-img-outer-toggle" : "post-img-outer"}>
                <div className="img-outer">
                    {
                        postPath && (
                            <img src={`https://image.tmdb.org/t/p/original${postPath}`} alt="" />
                        )
                    }
                    <div 
                        className="close-img" 
                        onClick={moviePostToggles.bind(undefined, false)}
                    >
                        <i className="fal fa-times"></i>
                    </div>
                </div>
            </div>
        </StyledLayout>
    )
}

export default CastModal