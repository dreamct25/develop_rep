export interface toDoItemType {
    createDate: string
    createTime: string
    hasFinish: boolean
    id: number
    title: string
}

export interface deleteToDoItemType extends toDoItemType {
    deleteTime:string
    deleteDate:string
}

export interface paginationObjType {
    totalLength?:number,
    partPage?:number,
    pageTotal?:number,
    currentPage?:number,
    beforPage?:boolean,
    afterPage?:boolean
}