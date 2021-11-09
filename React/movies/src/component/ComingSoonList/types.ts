export interface actionTypes {
    getItem:string,
    setItem:string,
    setMovieTitle:string,
    getItemPage:string,
    setLoadingState:string
}

export interface actionCreatorType {
    getItem:Function,
    setItem:Function,
    setMovieTitle:Function,
    getItemPage:Function,
    setLoadingState:Function
}