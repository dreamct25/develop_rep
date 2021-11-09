import { Collection } from "immutable";
import { Dispatch, FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { StyledComponent } from "styled-components";
import { actionCreatorType } from './types'
import NoImage from "../NoImage/NoImage";
import componentEntries from '../RenderSearchTv'
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";


interface RenderSearchTvProps {
    postSearchVal: string
}

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType,
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

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
    first_air_date: string,
    name: string,
    vote_average: number,
    media_type: string
}

interface objType {
    data: any,
    loadingState: any
}

interface RenderSearchTvProps {
    postSearchVal: string
}

const RenderSearchTv: FunctionComponent<RenderSearchTvProps> = ({ postSearchVal }: RenderSearchTvProps): JSX.Element => {
    const { data, loadingState }: objType = useSelector((state: Collection<unknown, unknown>): objType => ({
        data: state.getIn(['renderSearchTv', 'data']),
        loadingState: state.getIn(['renderSearchTv', 'loadingState'])
    }))

    const route = useHistory()

    const dispatch: Dispatch<any> = useDispatch()

    const {
        page,
        total_pages,
        results,
        total_results
    }: dataType = data

    const goSingleVideo: Function = (id: number) => {
        let obj: { [key: string]: any } = {
            pathname: '/single_preview',
            search: `id=${id}&type=tv`
        }
        route.push({ ...obj })
    }

    const changePage = (page: number) => {
        let obj = {
            searchVal: postSearchVal,
            page: page
        }
        dispatch(actionCreator.getSearchTvItem({ ...obj }))
        dispatch(actionCreator.setLoadingState(true))
    }

    useEffect(() => {
        dispatch(actionCreator.setLoadingState(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        let obj = {
            searchVal: postSearchVal,
            page: page
        }
        dispatch(actionCreator.getSearchTvItem({ ...obj }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSearchVal])

    return (
        <Show>
            <div className="search-tv">
                <div className="search-tv-header">
                    <div className="search-tv-title">影集</div>
                    <div className="search-tv-totals">共 {total_results} 搜尋結果</div>
                </div>
                <div className="search-tv-body">
                    <div className="row g-0">
                        {'results' in data && total_pages !== 0 ? results.map(({ id, original_title, poster_path, first_air_date, name, vote_average }: resultsItemType, index: number) => (
                            <div key={index} className="col-md-3">
                                <div className="poster-card" onClick={goSingleVideo.bind(this, id)}>
                                    <div className="poster-card-fram">查看詳情</div>
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
            </div>
        </Show>
    )
}

export default RenderSearchTv