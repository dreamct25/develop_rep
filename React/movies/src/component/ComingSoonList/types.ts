import store from "../../store";

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

export interface objType{
    data:dataType,
    movieTitle:string,
    loadingState:boolean
}

export interface dataType {
    page: number,
    total_pages: number
    results: resultsItemType[],
    total_results: number
}

export interface resultsItemType {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    media_type: string
}

export interface reducerState extends ReturnType<typeof store.getState> {}