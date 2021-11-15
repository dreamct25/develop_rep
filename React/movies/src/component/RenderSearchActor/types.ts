import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import store from "../../store";

export interface actionTypes {
    getSearchActorItem: string,
    setSearchActorItem: string,
    setFullSearchActorItem:string
    setLoadingState: string,
    setCurrentSelectId: string,
    setCastModalToggel: string,
    setCurrentPageTemp:string,
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData:string
}

export interface actionCreatorType {
    getSearchActorItem: Function,
    setSearchActorItem: Function,
    setFullSearchActorItem:Function
    setLoadingState: Function,
    setCurrentSelectId: Function,
    setCastModalToggel: Function,
    setCurrentPageTemp:Function,
    setPaginationOption: Function,
    setPaginationObj: Function,
    setRenderData:Function
}

export interface objType {
    data: dataType,
    newData:resultsItemType[],
    renderData:resultsItemType[]
    loadingState: boolean,
    selectId: number,
    castModalToggle: boolean,
    currentPageTemp: number,
    paginationOption:paginationOptions
    paginationObj:paginationType
}

export interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

export interface resultsItemType {
    id: number,
    name: string,
    profile_path: string,
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface RenderSearchActorProps {
    postSearchVal: string
}

export interface reducerState extends ReturnType<typeof store.getState> {}