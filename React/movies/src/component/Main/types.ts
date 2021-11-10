import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionType {
    getItem: string,
    postItem: string,
    getSingleItem: string,
    currentSelect: string,
    toggleBarAnimate: string,
    setSearchVal: string,
    setHotItemType:string
}

export interface actionCreatorType {
    postItemVal: Function,
    getSingleMovie: Function,
    getCurrentSelect: Function
    setToggleBarAnimate: Function,
    setSearchVal: Function,
    setHotItemType:Function
}

export interface objType {
    data: {[key:string]:any},
    imgId: number,
    toggleBarAnim: boolean,
    search: { searchVal: string, selectVal: string },
    hotItemType: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {} 