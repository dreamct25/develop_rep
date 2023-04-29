export interface initStoreStateType {
    memberList:string[],
}

export interface actionCreatorType {
    setMember(memberContent:string):{ type:string,memberContent:string }
}