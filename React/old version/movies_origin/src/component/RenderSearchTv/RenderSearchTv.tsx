import { Dispatch, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { List } from "immutable";
import { paginationOptions, paginations, paginationType } from "../../class/paginationMethod/paginationMethod";
import { paginationObjType } from "../Pagination/types";
import { actionCreatorType, RenderSearchTvProps, dataType, objType, reducerState, resultsItemType, cssSetPropertys, filterPropsType } from './types'
import NoImage from "../NoImage/NoImage";
import componentEntries from '../RenderSearchTv'
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType,
    styles: cssSetPropertys
} = componentEntries

const RenderSearchTv: FunctionComponent<RenderSearchTvProps> = ({ postSearchVal }: RenderSearchTvProps): JSX.Element => {
    const { data, newData, renderData, loadingState, currentPageTemp, paginationOption, paginationObj, filterListItem, filterValue, filterListToggle }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(['renderSearchTv', 'data']) as dataType,
        newData: state.getIn(['renderSearchTv', 'newData']) as resultsItemType[],
        renderData: state.getIn(['renderSearchTv', 'renderData']) as resultsItemType[],
        loadingState: state.getIn(['renderSearchTv', 'loadingState']) as boolean,
        currentPageTemp: state.getIn(['renderSearchTv', 'currentPageTemp']) as number,
        paginationOption: state.getIn(['renderSearchTv', 'paginationOption']) as paginationOptions,
        paginationObj: state.getIn(['renderSearchTv', 'paginationObj']) as paginationType,
        filterListItem: state.getIn(['renderSearchTv', 'filterListItem']).toJS() as filterPropsType[],
        filterValue: state.getIn(['renderSearchTv', 'filterValue']) as { [key: string]: any },
        filterListToggle: state.getIn(['renderSearchTv', 'filterListToggle']) as boolean
    }))

    const route = useHistory()

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

    const goSingleVideo: (id: number) => void = id => route.push({ pathname: '/single_preview', search: `id=${id}&type=tv` })

    const renderPage: (pageOption: paginationOptions) => void = pageOption => dispatch(actionCreator.setPaginationOption(pageOption))

    const initalData: (haveAdult: boolean) => void = haveAdult => {
        dispatch(actionCreator.setPaginationOption(pageOptionAuto))
        dispatch(actionCreator.getSearchTvItem({ searchVal: postSearchVal, page: page, totalPage: total_pages, haveAdult: haveAdult }))
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
                        dispatch(actionCreator.setFullSearchTvItem(
                            newData.filter(
                                ({ first_air_date }: { first_air_date: string }) => first_air_date !== undefined && first_air_date !== ''
                            ).sort(
                                (a: { first_air_date: string }, b: { first_air_date: string }) => Number(b.first_air_date.split("-").join("")) - Number(a.first_air_date.split("-").join(""))
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
                        dispatch(actionCreator.setFullSearchTvItem(
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

    useEffect(() => {
        renderData.length !== 0 && dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderData])

    useEffect(() => {
        (newData.constructor.name === 'List' || newData.constructor.name === 't') && initalData(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSearchVal, data])

    useEffect(() => () => {
        dispatch(actionCreator.setFullSearchTvItem(List([])))
        route.location.pathname === '/main' && dispatch(actionCreator.setCurrentPageTemp(1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="search-tv">
                <div className="search-tv-header">
                    <div className="search-tv-title">影集</div>
                    <div className={postSearchVal !== 'popular_tv' ? 'search-tv-header-middle-group' : 'search-tv-header-middle-group search-tv-header-middle-group-toggle' }>
                        <div className="search-tv-totals">共 {newData.length} 個搜尋結果</div>
                        {postSearchVal !== 'popular_tv' && <div className="filter-group-outer">
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
                <div className="search-tv-body">
                    <div className="row g-0">
                        {renderData.length !== 0 ? renderData.map(({ id, poster_path, first_air_date, name, vote_average }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card" onClick={goSingleVideo.bind(this, id)}>
                                    <div className="poster-card-fram">更多簡介</div>
                                    <div className="poster-img">
                                        {typeof poster_path === 'string' ? <div className="img" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}></div> : <NoImage text={'No Poster Image'} />}
                                    </div>
                                    <div className="rate">{vote_average} <i className="fas fa-star stars"></i></div>
                                    <div className="poster-title">片名：{name === '' ? '暫無資訊' : name}</div>
                                    <div className="release-date">日期：{first_air_date === '' || first_air_date === undefined ? '暫無資訊' : first_air_date}</div>
                                </div>
                            </div>
                        )) : <div className="no-result">-- 無搜尋結果 --</div>}
                    </div>
                </div>
                <div className="search-tv-footer">
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

export default RenderSearchTv