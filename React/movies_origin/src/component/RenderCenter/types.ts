import { Action } from "redux";
import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    getSingleItem: string,
    changeBackPostSwitch: string
}

export interface actionCreatorType {
    getSingleItems: (singleData: { [key: string]: any }[]) => Action<any>,
    changeBackPostSwitch: (status: boolean) => Action<any>
}

export interface objType {
    singleData: {[key:string]:any}[],
    changeBackPostSwitch: boolean,
    currentPostType:{[key:string]:any}
}

export interface RenderCenterProps {
    postData:any[],
    postId:number,
    postHotItemType:string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any, {}, never>
}

export interface reducerState extends ReturnType<typeof store.getState> {}