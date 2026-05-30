export interface SearchDataResult {
    music: {
        trackId: number,
        artistName: string,
        trackName: string,
        artworkUrl100: string,
        primaryGenreName: string, // 分類
        trackTimeMillis: number
        releaseDate: string
        collectionName: string
    }[],
    ["music-video"]: {
        trackId: number,
        artistName: string,
        trackName: string,
        artworkUrl100: string,
        primaryGenreName: string,
        trackTimeMillis: number
        releaseDate: string,
        previewUrl?: string
    }[],
    podcast: {
        trackId: number,
        artworkUrl600: string,
        collectionName: string, // 專輯
        genres: string[], // 系列
        primaryGenreName: string, // 類型
    }[],
    ebook: {
        trackId: number,
        artistName: string,
        trackName: string,
        artworkUrl100: string,
        genres: string[], // 系列
        description: string,
        releaseDate: string,
    }[],
    software: {
        trackId: number,
        trackName: string,
        artworkUrl100: string,
        genres: string[], // 系列
        sellerName: string
    }[]
}

export interface SearchResp<T extends keyof SearchDataResult> {
    resultCount: number,
    results: SearchDataResult[T]
}

export interface initStoreType {
    searchResult: {
        [K in keyof SearchDataResult]: {
            category: K,
            data: SearchResp<K>['results']
        }
    }[keyof SearchDataResult][]
    search: string
}