import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionType {
    setSearchTvItem: string,
    getSearchTvItem: string,
    setLoadingState: string
}

export interface actionCreatorType {
    setSearchTvItem: Function,
    getSearchTvItem: Function,
    setLoadingState: Function
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
    loadingState: boolean
}

export interface RenderSearchTvProps {
    postSearchVal: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}