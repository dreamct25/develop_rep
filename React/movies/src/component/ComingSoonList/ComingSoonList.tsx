import { Dispatch, FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { StyledComponent } from "styled-components";
import componentEntries from '../ComingSoonList'
import Loading from "../Loading/Loading";
import NoImage from "../NoImage/NoImage";
import Pagination from "../Pagination/Pagination";
import { actionCreatorType } from './types'

const {
    actionCreator,
    styles:{ Show }
}: { 
    actionCreator:actionCreatorType
    styles:{ Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface objType{
    data:any,
    movieTitle:any,
    loadingState:any
}

interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

interface resultsItemType {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    media_type: string
}

const ComingSoonList:FunctionComponent<{}> = ():JSX.Element => {

    const { data,movieTitle,loadingState }:objType = useSelector((state: Immutable.Collection<unknown, unknown>): objType => ({
        data: state.getIn(["comingSoonList", "data"]),
        movieTitle:state.getIn(["comingSoonList","movieTitle"]),
        loadingState:state.getIn(["comingSoonList","loadingState"])
    }))

    const refPos = useRef<HTMLDivElement>(null)

    const route = useHistory()

    const dispatch:Dispatch<any> = useDispatch()

    const {
        page,
        total_pages,
        results,
        total_results
    }: dataType = data

    const goSingleVideo: Function = (id: number) => {
        let obj: { [key: string]: any } = {
            pathname: '/single_preview',
            search: `id=${id}&type=movie`
        }
        route.push({ ...obj })
    }

    const setMovieTitle: Function = (title: string, toggle: boolean, { screenX, screenY }: React.MouseEvent) => {
        if (title !== undefined) {
            dispatch(actionCreator.setMovieTitle(toggle ? title : ''))
            if (refPos.current !== null) refPos.current!.style.cssText = `top:${screenY - 125}px;left:${screenX - 18}px;`
        }
    }

    const changePage = (page: number) => {
        dispatch(actionCreator.getItem(page))
        dispatch(actionCreator.setLoadingState(true))
    }

    useEffect(() => {
        dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        dispatch(actionCreator.getItem(1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Show>
            <div className="coming-soon-movie-outer">
                <div className="coming-soon-movie-header">
                    <div className="title">即將上映</div>
                    <div className="totals">共 {total_results} 電影</div>
                </div>
                <div className="coming-soon-movie-body">
                    <div className="row g-0">
                        {'results' in data && results.map(({ id, original_title, poster_path, release_date, title, vote_average }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card"
                                    onClick={goSingleVideo.bind(this, id)}
                                    onMouseMove={setMovieTitle.bind(this, title, true)}
                                    onMouseLeave={setMovieTitle.bind(this, title, false)}
                                >
                                    <div className="poster-card-fram">查看詳情</div>
                                    <div className="poster-img">
                                        {typeof poster_path === 'string' ? <div className="img" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}></div> : <NoImage text={'No Poster Image'} />}
                                    </div>
                                    <div className="rate">{vote_average} <i className="fas fa-star stars"></i></div>
                                    <div className="poster-title">片名：{title === null ? '暫無資訊' : title}</div>
                                    <div className="release-date">日期：{release_date === null ? '暫無資訊' : release_date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="coming-soon-movie-footer">
                    <div className="page-group">
                        {'results' in data && <Pagination paginationObjProps={{
                            hasPrev: page === 1 ? false : true,
                            hasNext: page === total_pages ? false : true,
                            pageTotal: total_pages,
                            pageSize: 10,
                            currentPage: page,
                            postNext: changePage
                        }} />}
                    </div>
                </div>
                {movieTitle !== '' && <div ref={refPos} className={movieTitle !== "" ? "show-movie-title show-movie-title-toggle" : "show-movie-title"}>{movieTitle}</div>}
                <Loading haveOpen={loadingState} />
            </div>
        </Show>
    )
}

export default ComingSoonList