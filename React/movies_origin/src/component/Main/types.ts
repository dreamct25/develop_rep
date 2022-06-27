import { Action } from "redux";
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
    postItemVal: (obj: object,val:string) => Action<any>,
    getSingleMovie: (id: number) => Action<any>,
    getCurrentSelect: (id: number) => Action<any>
    setToggleBarAnimate: (status: boolean) => Action<any>,
    setSearchVal: (val: { [key: string]: any }) => Action<any>,
    setHotItemType:(val:string) => Action<any>
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