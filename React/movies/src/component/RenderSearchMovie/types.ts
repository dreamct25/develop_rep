import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionType {
    setSearchMovieItem: string,
    getSearchMovieItem: string,
    setLoadingState: string,
}

export interface actionCreatorType {
    setSearchMovieItem: Function,
    getSearchMovieItem: Function,
    setLoadingState: Function,
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
    release_date: string,
    title: string,
    vote_average: number,
    media_type: string
}

export interface objType {
    data: dataType,
    loadingState: boolean
}

export interface RenderSearchMovieProps {
    postSearchVal: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}