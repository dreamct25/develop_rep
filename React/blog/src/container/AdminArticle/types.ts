export interface articleDatasType {
    uuid: string
    articleContent: string
    articleShortContent: string
    articleTitle: string
    cardImg: string
    collectType: string
    createDate: string
    fullDate: string
    modifyDate: string
}

export interface valGroupsType {
    ud?:string
    articleTitle:string,
    articleContent:string,
    articleShortContent:string,
    cardImg: string
    collectType:string,
    fullDate:string,
    createDate?:string
}