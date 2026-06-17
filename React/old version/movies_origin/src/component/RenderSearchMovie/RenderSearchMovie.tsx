import { Dispatch, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "immutable";
import { useHistory } from "react-router";
import { paginationOptions, paginations, paginationType } from "../../class/paginationMethod/paginationMethod";
import { paginationObjType } from "../Pagination/types";
import { actionCreatorType, objType, RenderSearchMovieProps, dataType, resultsItemType, reducerState, cssSetPropertys, filterPropsType } from './types'
import NoImage from "../NoImage/NoImage";
import componentEntries from '../RenderSearchMovie'
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType,
    styles: cssSetPropertys
} = componentEntries

const RenderSearchMovie: FunctionComponent<RenderSearchMovieProps> = ({ postSearchVal }: RenderSearchMovieProps): JSX.Element => {
    const { data, newData, renderData, loadingState, currentPageTemp, paginationOption, paginationObj, filterListItem, filterValue, filterListToggle }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(['renderSearchMovie', 'data']) as dataType,
        newData: state.getIn(['renderSearchMovie', 'newData']) as resultsItemType[],
        renderData: state.getIn(['renderSearchMovie', 'renderData']) as resultsItemType[],
        currentPageTemp: state.getIn(['renderSearchMovie', 'currentPageTemp']) as number,
        paginationOption: state.getIn(['renderSearchMovie', 'paginationOption']) as paginationOptions,
        paginationObj: state.getIn(['renderSearchMovie', 'paginationObj']) as paginationType,
        loadingState: state.getIn(['renderSearchMovie', 'loadingState']) as boolean,
        filterListItem: state.getIn(['renderSearchMovie', 'filterListItem']).toJS() as filterPropsType[],
        filterValue: state.getIn(['renderSearchMovie', 'filterValue']) as { [key: string]: any },
        filterListToggle: state.getIn(['renderSearchMovie', 'filterListToggle']) as boolean
    }))

    const route = useHistory<any>()

    const dispatch: Dispatch<any> = useDispatch()

    const { page, total_pages }: dataType = data

    const {
        pageTotal,
        currentPage,
        hasPrev,
        hasNext,
        pageSize,
        partPage
    }: paginationType = paginationObj

    const paginationProps: paginationObjType = {
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

    const pageOptionAuto: paginationOptions = window.innerWidth > 414 ? { pages: currentPageTemp, partPage: 20, pageSize: 10 } : { pages: currentPageTemp, partPage: 10, pageSize: 6 }

    const goSingleVideo: (id: number) => void = id => route.push({ pathname: '/single_preview', search: `id=${id}&type=movie` })

    const renderPage: (pageOption: paginationOptions) => void = pageOption => dispatch(actionCreator.setPaginationOption(pageOption))

    const initalData: (haveAdult: boolean) => void = haveAdult => {
        dispatch(actionCreator.setPaginationOption(pageOptionAuto))
        dispatch(actionCreator.getSearchMovieItem({ searchVal: postSearchVal, page: page, totalPage: total_pages, haveAdult: haveAdult }))
        dispatch(actionCreator.setLoadingState(true))
    }

    const setFilterValue: Function | ((value: string) => void) = value => {
        let filterValueTemp: { [key: string]: any } = filterValue
        filterValueTemp[value] = !filterValueTemp[value]
        dispatch(actionCreator.setFilterValue(filterValueTemp))
        changeData(value)
    }

    const setFilterListToggleAnimate: Function | (() => void) = () => dispatch(actionCreator.setFilterListToggleAnimate(!filterListToggle))

    const changeData: (value: string) => void = value => {
        switch (value) {
            case 'adult':
                initalData(filterValue[value])
                break;
            case 'date':
                if (filterValue[value]) {
                    dispatch(actionCreator.setLoadingState(true))
                    setTimeout(() => {
                        dispatch(actionCreator.setFullSearchMovieItem(
                            newData.filter(
                                ({ release_date }: { release_date: string }) => release_date !== undefined && release_date !== ''
                            ).sort(
                                (a: { release_date: string }, b: { release_date: string }) => Number(b.release_date.split("-").join("")) - Number(a.release_date.split("-").join(""))
                            )
                        ))
                    }, 300);
                } else {
                    dispatch(actionCreator.setLoadingState(true))
                    setTimeout(() => initalData(false), 300)
                }
                break;
            case 'rate':
                if (filterValue[value]) {
                    dispatch(actionCreator.setLoadingState(true))
                    setTimeout(() => {
                        renderPage(pageOptionAuto)
                        dispatch(actionCreator.setFullSearchMovieItem(
                            newData.sort((a: { vote_average: number }, b: { vote_average: number }) => b.vote_average - a.vote_average)
                        ))
                    }, 300);
                } else {
                    dispatch(actionCreator.setLoadingState(true))
                    setTimeout(() => initalData(false), 300);
                }
                break;
        }
    }

    useEffect(() => {
        const { pages, partPage, pageSize } = paginationOption
        const { pageObj, renderItem } = paginations(newData, pages, partPage, pageSize)
        dispatch(actionCreator.setCurrentPageTemp(pages!))
        dispatch(actionCreator.setPaginationObj(pageObj))
        dispatch(actionCreator.setRenderData(renderItem))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationOption])

    useEffect(() => {
        renderPage(pageOptionAuto)
        dispatch(actionCreator.setLoadingState(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData])

    useEffect((): any => {
        renderData.length !== 0 && dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderData])

    useEffect(() => {
        (newData.constructor.name === 'List' || newData.constructor.name === 't') && initalData(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSearchVal, data])


    useEffect(() => {
        dispatch(actionCreator.setFilterValue({ adult: false, date: false, rate: false }))
        return () => {
            dispatch(actionCreator.setFullSearchMovieItem(List([])))
            route.location.pathname === '/main' && dispatch(actionCreator.setCurrentPageTemp(1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="search-movie">
                <div className="search-movie-header">
                    <div className="search-movie-title">電影</div>
                    <div className={postSearchVal !== 'popular_movie' ? 'search-movie-header-middle-group' : 'search-movie-header-middle-group search-movie-header-middle-group-toggle' }>
                        <div className="search-movie-totals">共 {newData.length} 個搜尋結果</div>
                        {postSearchVal !== 'popular_movie' && <div className="filter-group-outer">
                            <div className="filter-group">
                                <div className={filterListToggle ? "filter-btn filter-btn-toggle" : "filter-btn"} onClick={setFilterListToggleAnimate.bind(this)}>進階篩選</div>
                                <div className={filterListToggle ? "filter-list filter-list-toggle" : "filter-list"}>
                                    {filterListItem.map(({ title, disTitle, value }: filterPropsType, index: number) => (
                                        <div key={index} className="filter-list-item" onClick={setFilterValue.bind(this, value)}>{filterValue[value] ? disTitle : title}</div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="search-movie-body">
                    <div className="row g-0">
                        {renderData.length !== 0 ? renderData.map(({ id, original_title, poster_path, release_date, title, vote_average }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card"
                                    onClick={goSingleVideo.bind(this, id)}
                                >
                                    <div className="poster-card-fram">更多簡介</div>
                                    <div className="poster-img">
                                        {typeof poster_path === 'string' ? <div className="img" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}></div> : <NoImage text={'No Poster Image'} />}
                                    </div>
                                    <div className="rate">{vote_average} <i className="fas fa-star stars"></i></div>
                                    <div className="poster-title">片名：{title === null ? '暫無資訊' : title}</div>
                                    <div className="release-date">日期：{release_date === null ? '暫無資訊' : release_date}</div>
                                </div>
                            </div>
                        )) : <div className="no-result">-- 無搜尋結果 --</div>}
                    </div>
                </div>
                <div className="search-movie-footer">
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

export default RenderSearchMovie