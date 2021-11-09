export interface actionType {
    setSearchMovieItem: string,
    getSearchMovieItem: string,
    setLoadingState: string,
}

export interface actionCreatorType {
    setSearchMovieItem: Function,
    getSearchMovieItem: Function,
    setLoadingState: Function,
}

export interface paramsObjType {
    api_key?: string,
    language?: string,
    page?: number,
    query?: string,
    include_adult?: boolean
}