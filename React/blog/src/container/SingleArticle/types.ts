export interface leaveMsgObjType {
    uuid:string,
    msgNickName:string,
    msgContent:string,
    createDate:string,
    resContentList:{
        resNickName:string,
        resContent:string,
        createDate:string,
    }[]
}