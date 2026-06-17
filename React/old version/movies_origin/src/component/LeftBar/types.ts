import { Action } from "redux";
import { StyledComponent } from "styled-components";
import store from "../../store";

export interface actionType {
    getListItem: string,
    setListToggleAnimate:string,
    setSelectText:string
}

export interface actionCreatorType {
    getListItem: () => Action<any>,
    setListToggleAnimate:(status:boolean) => Action<any>,
    setSelectText:(txt:string) => Action<any>
}

export interface LeftBarProps {
    toggleBar: boolean,
    postCurrentSelectAtLeftBarType: Function
}

export interface objType {
    listItem: { titleName: string, titleVal: string }[],
    listToggleAnimate: boolean,
    selectText: string
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

export interface reducerState extends ReturnType<typeof store.getState> {}