import { List } from "immutable";
import { Action } from "redux";
import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import store from "../../store";

export interface actionType {
    setSearchTvItem: string,
    setFullSearchTvItem: string
    getSearchTvItem: string,
    setLoadingState: string,
    setCurrentPageTemp: string,
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData: string,
    setFilterValue: string,
    setFilterListToggleAnimate: string
}

export interface actionCreatorType {
    getSearchTvItem: ({ searchVal, page, totalPage }: { [key: string]: string | number | boolean }) => Action<any>,
    setSearchTvItem: (obj: { [key: string]: any }) => Action<any>,
    setFullSearchTvItem: (item: { [key: string]: any }[] | List<never>) => Action<any>,
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

export interface filterPropsType {
    title: string,
    disTitle: string
    value: string
}

export interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

export interface resultsItemType {
    id: number,
    original_title: string,
    poster_path: string,
    first_air_date: string,
    name: string,
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

export interface RenderSearchTvProps {
    postSearchVal: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> { }