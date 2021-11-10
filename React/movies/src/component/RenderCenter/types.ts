import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionTypes {
    getSingleItem: string,
    changeBackPostSwitch: string
}

export interface actionCreatorType {
    getSingleItems: Function,
    changeBackPostSwitch: Function
}

export interface objType {
    singleData: {[key:string]:any}[],
    changeBackPostSwitch: boolean,
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any, {}, never>
}

export interface reducerState extends ReturnType<typeof store.getState> {}