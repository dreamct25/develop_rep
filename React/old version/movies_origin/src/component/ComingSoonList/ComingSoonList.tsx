import { Dispatch, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { actionCreatorType, objType, dataType, resultsItemType, reducerState, cssSetPropertys } from './types'
import { paginations, paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import { paginationObjType } from "../Pagination/types";
import Loading from "../Loading/Loading";
import NoImage from "../NoImage/NoImage";
import Pagination from "../Pagination/Pagination";
import componentEntries from '../ComingSoonList'

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: cssSetPropertys
} = componentEntries

const ComingSoonList: FunctionComponent<{}> = (): JSX.Element => {

    const { data, newData,renderData, loadingState,currentPageTemp, paginationOption, paginationObj }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(["comingSoonList", "data"]) as dataType,
        newData: state.getIn(["comingSoonList", "newData"]) as resultsItemType[],
        renderData: state.getIn(["comingSoonList","renderData"]) as resultsItemType[],
        loadingState: state.getIn(["comingSoonList", "loadingState"]) as boolean,
        currentPageTemp: state.getIn(["comingSoonList", "currentPageTemp"]) as number,
        paginationOption: state.getIn(["comingSoonList", "paginationOption"]) as paginationOptions,
        paginationObj: state.getIn(["comingSoonList", "paginationObj"]) as paginationType
    }))

    const route = useHistory()

    const dispatch: Dispatch<any> = useDispatch()

    const {
        total_pages,
    }: dataType = data

    const {
        pageTotal,
        currentPage,
        hasPrev,
        hasNext,
        pageSize,
        partPage
    }: paginationType = paginationObj

    const pageOptionAuto:paginationOptions = window.innerWidth > 414 ? { pages: currentPageTemp, partPage: 20, pageSize: 10 } : { pages: currentPageTemp, partPage: 10, pageSize: 6 }

    const goSingleVideo: (id: number) => void = id => route.push({ pathname: '/single_preview',search: `id=${id}&type=movie` })

    const renderPage:(pageOption:paginationOptions) => void = pageOption => dispatch(actionCreator.setPaginationOption(pageOption))

    const paginationProps:paginationObjType = {
        hasPrev: hasPrev,
        hasNext: hasNext,
        pageTotal: pageTotal,
        pageSize: pageSize,
        partPage: partPage,
        currentPage: currentPage,
        postNext: pageObj => {
            renderPage(pageObj)
            dispatch(actionCreator.setLoadingState(true))
        }
    }

    useEffect(() => {
        const { pages,partPage,pageSize } = paginationOption
        const { pageObj, renderItem } = paginations(newData, pages, partPage, pageSize)
        dispatch(actionCreator.setCurrentPageTemp(pages!))
        dispatch(actionCreator.setPaginationObj(pageObj))
        dispatch(actionCreator.setRenderData(renderItem))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paginationOption])

    useEffect(() => {
        renderPage(pageOptionAuto)
        dispatch(actionCreator.setLoadingState(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData])

    useEffect(() => {
        renderData.length !== 0 && dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[renderData])

    useEffect(() => {
        if(newData.constructor.name === 'List' || newData.constructor.name === 't'){
            dispatch(actionCreator.setPaginationOption(pageOptionAuto))
            dispatch(actionCreator.getItem(1, total_pages))
            dispatch(actionCreator.setLoadingState(true))
        }
        return () => { route.location.pathname === '/main' && dispatch(actionCreator.setCurrentPageTemp(1)) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <Show>
            <div className="coming-soon-movie-outer">
                <div className="coming-soon-movie-header">
                    <div className="title">即將上映</div>
                    <div className="totals">共 {newData.length} 部電影</div>
                </div>
                <div className="coming-soon-movie-body">
                    <div className="row g-0">
                        {renderData.length !== 0 && renderData.map(({ id, poster_path, release_date, title, vote_average }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card" onClick={goSingleVideo.bind(this, id)}>
                                    <div className="poster-card-fram">更多簡介</div>
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
                        {renderData.length !== 0 && <Pagination paginationObjProps={paginationProps} />}
                    </div>
                    <div className="icon"><i className="far fa-copyright"></i>Copy Right By Chen</div>
                </div>
                <Loading haveOpen={loadingState} />
            </div>
        </Show>
    )
}

export default ComingSoonList