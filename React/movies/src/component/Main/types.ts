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