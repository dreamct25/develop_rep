export interface combinedCreditsCastType {
    id: number
    title: string,
    name:string,
    original_title: string,
    original_name: string,
    character: string,
    release_date?: string,
    first_air_date?:string,
    poster_path: string,
    media_type: string
}

export interface famouseVideosType {
    adult: boolean
    id: number,
    title?: string,
    original_title?: string,
    name: string,
    original_name?: string,
    poster_path: string,
    vote_average: number,
    media_type: 'movie' | 'tv'
    first_air_date?: string,
    release_date?: string
}