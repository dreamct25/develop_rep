export interface resContentListType {
    resMsgID: number
    resMsgNickName: string
    resMsgContent: string
    createDate: string
}

export interface msgDataObjType {
    uuid: string
    articleTitle:string
    articleID: string
    createDate: string
    modifyDate: string
    msgContent: string
    msgNickName: string
    resContentList:resContentListType[]
}

export interface valGroupsType {
    mud:string,
    msgNickName:string,
    msgContent:string,
    articleID:string,
    resContentList:resContentListType[],
    createDate:string
}