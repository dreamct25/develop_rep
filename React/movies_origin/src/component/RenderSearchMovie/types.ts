import { List } from "immutable";
import { Action } from "redux";
import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import store from "../../store";

export interface actionType {
    setSearchMovieItem: string,
    setFullSearchMovieItem: string
    getSearchMovieItem: string,
    setLoadingState: string,
    setCurrentPageTemp: string,
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData: string,
    setFilterValue: string,
    setFilterListToggleAnimate: string
}

export interface actionCreatorType {
    getSearchMovieItem: ({ searchVal, page, totalPage, haveAdult }: { [key: string]: string | number | boolean }) => Action<any>,
    setSearchMovieItem: (obj: { [key: string]: any }) => Action<any>,
    setFullSearchMovieItem: (item: { [key: string]: any }[] | List<never>) => Action<any>,
    setLoadingState: (status: boolean) => Action<any>,
    setCurrentPageTemp: (page: number) => Action<any>,
    setPaginationOption: (options: paginationOptions) => Action<any>,
    setPaginationObj: (obj: paginationType) => Action<any>,
    setRenderData: (item: { [key: string]: any }[]) => Action<any>,
    setFilterValue: (obj: { [key: string]: any }) => Action<any>,
    setFilterListToggleAnimate: (status: boolean) => Action<any>
}

export interface paramsObjType {
    api_key?: string,
    language?: string,
    page?: number,
    query?: string,
    include_adult?: boolean
}

export interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

export interface filterPropsType {
    title: string,
    disTitle: string
    value: string
}

export interface resultsItemType {
    adult: boolean
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    media_type: string
}

export interface objType {
    data: dataType,
    newData: resultsItemType[],
    renderData: resultsItemType[]
    loadingState: boolean,
    currentPageTemp: number,
    paginationOption: paginationOptions
    paginationObj: paginationType,
    filterListItem: filterPropsType[],
    filterValue: { [key: string]: any },
    filterListToggle: boolean
}

export interface RenderSearchMovieProps {
    postSearchVal: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> { }