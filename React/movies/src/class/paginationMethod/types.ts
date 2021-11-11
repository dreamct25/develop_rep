export type paginationType = {
    totalLength: number,
    partPage: number,
    pageTotal: number,
    pageTotalToArray: number[],
    currentPage: number,
    hasPrev: boolean,
    hasNext: boolean,
    pageSize: number
}

export type paginationReturnParams = {
    pageObj: paginationType,
    renderItem: {[key:string]:any}[]
}

export type paginationOptions = {
    pages: number | undefined,
    partPage: number,
    pageSize: number
}