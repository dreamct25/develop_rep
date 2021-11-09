import { Dispatch, FunctionComponent, useEffect } from "react";
import { StyledComponent } from "styled-components";
import { actionCreatorType } from './types'
import componentEntries from '../RenderSearchActor'
import { useDispatch, useSelector } from "react-redux";
import { Collection } from "immutable";
import NoImage from "../NoImage/NoImage";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import CastModal from "../CastModal/CastModal";

interface RenderSearchActorProps {
    postSearchVal: string
}

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface objType {
    data: any,
    loadingState: any,
    selectId: any,
    castModalToggle: any
}

interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

interface resultsItemType {
    id: number,
    name: string,
    profile_path: string,
}

const RenderSearchActor: FunctionComponent<RenderSearchActorProps> = ({ postSearchVal }: RenderSearchActorProps): JSX.Element => {
    const { data, loadingState, selectId, castModalToggle }: objType = useSelector((state: Collection<unknown, unknown>): objType => ({
        data: state.getIn(['renderSearchActor', 'data']),
        loadingState: state.getIn(['renderSearchActor', 'loadingState']),
        selectId: state.getIn(['renderSearchActor', 'selectId']),
        castModalToggle: state.getIn(['renderSearchActor', 'castModalToggle'])
    }))

    const dispatch: Dispatch<any> = useDispatch()

    const {
        page,
        total_pages,
        results,
        total_results
    }: dataType = data

    const goSingleActor: Function = (id: number): void => {
        dispatch(actionCreator.setCurrentSelectId(id))
        dispatch(actionCreator.setCastModalToggel(true))
    }

    const changePage = (page: number): void => {
        let obj = {
            searchVal: postSearchVal,
            page: page
        }
        dispatch(actionCreator.getSearchActorItem({ ...obj }))
        dispatch(actionCreator.setLoadingState(true))
    }

    const setCastModalToggle: Function = (status: number): void => dispatch(actionCreator.setCastModalToggel(status))

    useEffect(() => {
        dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        let obj = {
            searchVal: postSearchVal,
            page: page
        }
        dispatch(actionCreator.getSearchActorItem({ ...obj }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSearchVal])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(actionCreator.setCastModalToggel(false)), [])

    return (
        <Show>
            <div className="search-actor">
                <div className="search-actor-header">
                    <div className="search-actor-title">演員</div>
                    <div className="search-actor-totals">共 {total_results} 搜尋結果</div>
                </div>
                <div className="search-actor-body">
                    <div className="row g-0">
                        {'results' in data && total_results !== 0 ? results.map(({ id, name, profile_path, }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card"
                                    onClick={goSingleActor.bind(this, id)}
                                >
                                    <div className="poster-card-fram">查看詳情</div>
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
                <Loading haveOpen={loadingState} />
                <CastModal postToggles={castModalToggle} postId={selectId} postSetCastModalToggle={setCastModalToggle} />
            </div>
        </Show>
    )
}

export default RenderSearchActor