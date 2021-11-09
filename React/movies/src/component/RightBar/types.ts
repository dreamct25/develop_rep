import store from '../../store'

export interface actionType {
    setRightBarSearchVal: string,
    setRightBarSelectVal: string,
    setSearchBarToggleAnimate: string
}

export interface actionCreatorType {
    setRightBarSearchVal: Function,
    setRightBarSelectVal: Function,
    setSearchBarToggleAnimate: Function
}

export interface RightBarProps {
    toggleBar: boolean
    postData: any,
    postCurrentSelect: Function,
    postCurrentSearch: Function,
    currentHotItemType: string
}

export interface objType {
    rightBarSearchVal: string,
    rightBarSelectVal: string,
    searchBarToggleAnimate: boolean,
    selectListItem: { selectText:string,selectVal:string }[]
}

export interface reducerState extends ReturnType<typeof store.getState> {}