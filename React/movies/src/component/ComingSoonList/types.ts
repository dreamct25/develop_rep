import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'
import store from "../../store";

export interface actionTypes {
    getItem: string,
    setItem: string,
    setFullItem: string
    setMovieTitle: string,
    getItemPage: string,
    setLoadingState: string,
    setPaginationOption: string,
    setPaginationObj: string
}

export interface actionCreatorType {
    getItem: Function,
    setItem: Function,
    setFullItem: Function
    setMovieTitle: Function,
    getItemPage: Function,
    setLoadingState: Function,
    setPaginationOption: Function,
    setPaginationObj: Function
}

export interface objType {
    data: dataType,
    newData: resultsItemType[]
    movieTitle: string,
    loadingState: boolean,
    paginationOption: paginationOptions,
    paginationObj: paginationType
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

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> { }