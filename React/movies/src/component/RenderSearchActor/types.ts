import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    getSearchActorItem: string,
    setSearchActorItem: string,
    setLoadingState: string,
    setCurrentSelectId: string,
    setCastModalToggel: string
}

export interface actionCreatorType {
    getSearchActorItem: Function,
    setSearchActorItem: Function,
    setLoadingState: Function,
    setCurrentSelectId: Function,
    setCastModalToggel: Function
}

export interface objType {
    data: dataType,
    loadingState: any,
    selectId: any,
    castModalToggle: any
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