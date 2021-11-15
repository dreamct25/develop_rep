import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import store from "../../store";

export interface actionType {
    setSearchTvItem: string,
    setFullSearchTvItem:string
    getSearchTvItem: string,
    setLoadingState: string,
    setCurrentPageTemp:string,
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData:string,
    setFilterValue:string,
    setFilterListToggleAnimate:string
}

export interface actionCreatorType {
    setSearchTvItem: Function,
    setFullSearchTvItem:Function,
    getSearchTvItem: Function,
    setLoadingState: Function,
    setCurrentPageTemp:Function,
    setPaginationOption: Function,
    setPaginationObj: Function,
    setRenderData:Function,
    setFilterValue:Function,
    setFilterListToggleAnimate:Function
}

export interface paramsObjType {
    api_key?: string,
    language?: string,
    page?: number,
    query?: string,
    include_adult?: boolean
}

export interface filterPropsType {
    title:string,
    disTitle:string
    value:string
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
    newData:resultsItemType[],
    renderData:resultsItemType[]
    loadingState: boolean,
    currentPageTemp:number,
    paginationOption:paginationOptions
    paginationObj:paginationType,
    filterListItem:filterPropsType[],
    filterValue:{[key:string]:any},
    filterListToggle:boolean
}

export interface RenderSearchTvProps {
    postSearchVal: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}