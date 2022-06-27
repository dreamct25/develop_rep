import { Action } from 'redux';
import { StyledComponent } from 'styled-components';
import store from '../../store'

export interface actionType {
    setRightBarSearchVal: string,
    setRightBarSelectVal: string,
    setSearchBarToggleAnimate: string
}

export interface actionCreatorType {
    setRightBarSearchVal: (val: string) => Action<any>,
    setRightBarSelectVal: (val: string) => Action<any>,
    setSearchBarToggleAnimate: (status: boolean) => Action<any>
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
    selectListItem: { selectText: string, selectVal: string }[],
    currentPostType: { [key: string]: any }
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any, {}, never>
}

export interface reducerState extends ReturnType<typeof store.getState> { }