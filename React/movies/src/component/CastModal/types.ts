export interface actionType {
    getSingleCastItem: string,
    setSingleCastItem: string,
    setMoviePostToggle: string,
    setLoadingState:string,
    setPostPath:string
}

export interface actionCreatorType {
    getSingleCastItem: Function,
    setSingleCastItem: Function,
    setMoviePostToggle: Function,
    setLoadingState:Function,
    setPostPath:Function
}