import { Dispatch, FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { actionCreatorType, objType, dataType, resultsItemType, reducerState, cssSetPropertys } from './types'
import componentEntries from '../ComingSoonList'
import Loading from "../Loading/Loading";
import NoImage from "../NoImage/NoImage";
import Pagination from "../Pagination/Pagination";
import { paginations, paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: cssSetPropertys
} = componentEntries

const ComingSoonList: FunctionComponent<{}> = (): JSX.Element => {

    const { data, newData, movieTitle, loadingState, paginationOption, paginationObj }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(["comingSoonList", "data"]) as dataType,
        newData: state.getIn(["comingSoonList", "newData"]) as resultsItemType[],
        movieTitle: state.getIn(["comingSoonList", "movieTitle"]) as string,
        loadingState: state.getIn(["comingSoonList", "loadingState"]) as boolean,
        paginationOption: state.getIn(["comingSoonList", "paginationOption"]).toJS() as paginationOptions,
        paginationObj: state.getIn(["comingSoonList", "paginationObj"]) as paginationType
    }))

    const refPos = useRef<HTMLDivElement>(null)

    const route = useHistory()

    const dispatch: Dispatch<any> = useDispatch()

    const {
        total_pages,
        total_results
    }: dataType = data

    const {
        pageTotal,
        currentPage,
        hasPrev,
        hasNext,
        pageSize
    }: paginationType = paginationObj

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

    const changePage = (pageObj: paginationOptions) => {
        dispatch(actionCreator.setPaginationOption(pageObj))
        dispatch(actionCreator.setLoadingState(true))
    }

    useEffect(() => {
        const { pages, partPage, pageSize }: paginationOptions = paginationOption
        const { pageObj, renderItem } = paginations(newData, pages, partPage, pageSize)
        // console.log(pageObj, renderItem)
        dispatch(actionCreator.setPaginationObj(pageObj))
        dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData])

    useEffect(() => {
        dispatch(actionCreator.getItem(1, total_pages))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="coming-soon-movie-outer">
                <div className="coming-soon-movie-header">
                    <div className="title">即將上映</div>
                    <div className="totals">共 {total_results} 電影</div>
                </div>
                <div className="coming-soon-movie-body">
                    <div className="row g-0">
                        {newData.map(({ id, original_title, poster_path, release_date, title, vote_average }: resultsItemType, index: number) => (
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
                        {newData.length !== 0 && <Pagination paginationObjProps={{
                            hasPrev: hasPrev,
                            hasNext: hasNext,
                            pageTotal: pageTotal,
                            pageSize: pageSize,
                            currentPage: currentPage,
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