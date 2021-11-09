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