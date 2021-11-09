import store from "../../store";

export interface actionType {
    getListItem: string,
    setListToggleAnimate:string,
    setSelectText:string
}

export interface actionCreatorType {
    getListItem: Function,
    setListToggleAnimate:Function,
    setSelectText:Function
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

export interface reducerState extends ReturnType<typeof store.getState> {}