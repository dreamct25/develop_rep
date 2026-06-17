export interface singleVideoItemType {
    overview: string,
    vote_average: number,
    genres: { id: number, name: string }[],
    credits: {
        cast: {
            id: number
            profile_path: string,
            original_name: string,
            character: string
        }[]
    }
}

export interface singleVideoItemReviewType {
    author_details: {
        username: string,
        rating: number
    },
    updated_at: string
}