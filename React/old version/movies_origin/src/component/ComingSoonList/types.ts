import { Action } from "redux";
import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from '../../class/paginationMethod/paginationMethod'
import store from "../../store";

export interface actionTypes {
    getItem: string,
    setItem: string,
    setFullItem: string
    setLoadingState: string,
    setCurrentPageTemp:string
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData:string
}

export interface actionCreatorType {
    getItem:  (page: number, totalPage: number) => Action<any>,
    setItem: (obj: object) => Action<any>,
    setFullItem: (item: { [key: string]: any }[]) => Action<any>
    setLoadingState: (status: boolean) => Action<any>,
    setCurrentPageTemp:(page:number) => Action<any>,
    setPaginationOption: (options: paginationOptions) => Action<any>,
    setPaginationObj: (obj: paginationType) => Action<any>,
    setRenderData:(item:{[key:string]:any}[]) => Action<any>
}

export interface objType {
    data: dataType,
    newData: resultsItemType[],
    renderData:resultsItemType[],
    loadingState: boolean,
    currentPageTemp:number,
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