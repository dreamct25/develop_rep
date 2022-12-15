export interface initStoreType {
    articleData:articleObjType[]
}

export interface returnStoreType {
    articleData:articleObjType[]
}

export interface articleObjType {
    articleTitle: string
    articleShortContent: string
    cardImg: string
    collectType: string
    createDate: string
    fullDate: string
    uuid: string
}