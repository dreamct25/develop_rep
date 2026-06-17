import { Dispatch, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "immutable";
import { actionCreatorType, RenderSearchActorProps, resultsItemType, dataType, reducerState, objType, cssSetPropertys } from './types'
import { paginationOptions, paginations, paginationType } from "../../class/paginationMethod/paginationMethod";
import { paginationObjType } from '../Pagination/types'
import NoImage from "../NoImage/NoImage";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import CastModal from "../CastModal/CastModal";
import componentEntries from '../RenderSearchActor'

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: cssSetPropertys
} = componentEntries

const RenderSearchActor: FunctionComponent<RenderSearchActorProps> = ({ postSearchVal }: RenderSearchActorProps): JSX.Element => {
    const { data, newData, renderData, loadingState, selectId, castModalToggle, currentPageTemp, paginationOption, paginationObj }: objType = useSelector((state: reducerState): objType => ({
        data: state.getIn(['renderSearchActor', 'data']) as dataType,
        newData: state.getIn(['renderSearchActor', 'newData']) as resultsItemType[],
        renderData: state.getIn(['renderSearchActor', 'renderData']) as resultsItemType[],
        loadingState: state.getIn(['renderSearchActor', 'loadingState']) as boolean,
        selectId: state.getIn(['renderSearchActor', 'selectId']) as number,
        castModalToggle: state.getIn(['renderSearchActor', 'castModalToggle']) as boolean,
        currentPageTemp: state.getIn(['renderSearchActor', 'currentPageTemp']) as number,
        paginationOption: state.getIn(['renderSearchActor', 'paginationOption']) as paginationOptions,
        paginationObj: state.getIn(['renderSearchActor', 'paginationObj']) as paginationType
    }))

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

    const setCastModalToggle: (status: boolean) => void = status => dispatch(actionCreator.setCastModalToggel(status))

    const goSingleActor: (id: number) => void = id => {
        dispatch(actionCreator.setCurrentSelectId(id))
        dispatch(actionCreator.setCastModalToggel(true))
    }

    const renderPage: (pageOption: paginationOptions) => void = pageOption => dispatch(actionCreator.setPaginationOption(pageOption))

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
        if (newData.constructor.name === 'List' || newData.constructor.name === 't') {
            dispatch(actionCreator.setPaginationOption(pageOptionAuto))
            dispatch(actionCreator.getSearchActorItem({ searchVal: postSearchVal, page: page, totalPage: total_pages }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSearchVal, data])

    useEffect(() => () => {
        dispatch(actionCreator.setCastModalToggel(false))
        dispatch(actionCreator.setFullSearchActorItem(List([])))
        dispatch(actionCreator.setCurrentPageTemp(1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="search-actor">
                <div className="search-actor-header">
                    <div className="search-actor-title">演員</div>
                    <div className="search-actor-totals">共 {newData.length} 個搜尋結果</div>
                </div>
                <div className="search-actor-body">
                    <div className="row g-0">
                        {renderData.length !== 0 ? renderData.map(({ id, name, profile_path, }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card"
                                    onClick={goSingleActor.bind(this, id)}
                                >
                                    <div className="poster-card-fram">更多簡介</div>
                                    <div className="poster-img">
                                        {typeof profile_path === 'string' ? <div className="img" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${profile_path}')` }}></div> : <NoImage text={'No Poster Image'} />}
                                    </div>
                                    <div className="release-date">{name}</div>
                                </div>
                            </div>
                        )) : <div className="no-result">-- 無搜尋結果 --</div>}
                    </div>
                </div>
                <div className="search-actor-footer">
                    <div className="page-group">
                        {renderData.length !== 0 && <Pagination paginationObjProps={paginationProps} />}
                    </div>
                    <div className="icon"><i className="far fa-copyright"></i>Copy Right By Chen</div>
                </div>
                <Loading haveOpen={loadingState} />
                <CastModal postToggles={castModalToggle} postId={selectId} postSetCastModalToggle={setCastModalToggle} />
            </div>
        </Show>
    )
}

export default RenderSearchActor