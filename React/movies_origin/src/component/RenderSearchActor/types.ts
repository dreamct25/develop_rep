import { List } from "immutable";
import { Action } from "redux";
import { StyledComponent } from "styled-components";
import { paginationOptions, paginationType } from "../../class/paginationMethod/paginationMethod";
import store from "../../store";

export interface actionTypes {
    getSearchActorItem: string,
    setSearchActorItem: string,
    setFullSearchActorItem: string
    setLoadingState: string,
    setCurrentSelectId: string,
    setCastModalToggel: string,
    setCurrentPageTemp: string,
    setPaginationOption: string,
    setPaginationObj: string,
    setRenderData: string
}

export interface actionCreatorType {
    getSearchActorItem: ({ searchVal, page, totalPage }: { [key: string]: string | number }) => Action<any>,
    setSearchActorItem: (obj: object) => Action<any>,
    setFullSearchActorItem: (item: { [key: string]: any }[] | List<never>) => Action<any>
    setLoadingState: (status: boolean) => Action<any>,
    setCurrentSelectId: (id: number) => Action<any>,
    setCastModalToggel: (status: boolean) => Action<any>,
    setCurrentPageTemp: (page: number) => Action<any>,
    setPaginationOption: (options: paginationOptions) => Action<any>,
    setPaginationObj: (obj: paginationType) => Action<any>,
    setRenderData: (item: { [key: string]: any }[]) => Action<any>
}

export interface objType {
    data: dataType,
    newData: resultsItemType[],
    renderData: resultsItemType[]
    loadingState: boolean,
    selectId: number,
    castModalToggle: boolean,
    currentPageTemp: number,
    paginationOption: paginationOptions
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
    name: string,
    profile_path: string,
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface RenderSearchActorProps {
    postSearchVal: string
}

export interface reducerState extends ReturnType<typeof store.getState> { }