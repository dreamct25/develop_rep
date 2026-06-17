export interface initStoreType {
    toggleBarAnimate: boolean,
    currentWindowInnerWidth: number
}

export interface resultType {
    id: number,
    backdrop_path: string, 
    poster_path: string,
    release_date?: string,
    first_air_date?: string
    vote_average: number,
    overview: string,
    popularity: number
}