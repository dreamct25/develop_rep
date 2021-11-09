export interface actionType {
    setSearchTvItem: string,
    getSearchTvItem: string,
    setLoadingState: string
}

export interface actionCreatorType {
    setSearchTvItem: Function,
    getSearchTvItem: Function,
    setLoadingState: Function
}

export interface paramsObjType {
    api_key?: string,
    language?: string,
    page?: number,
    query?: string,
    include_adult?: boolean
}