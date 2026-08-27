export type dataType = {
    Id: string,
    Name: string,
    Tel: string,
    Description: string,
    Add: string,
    Zipcode: string,
    Spec: string[]
    Grade: string,
    Region: string,
    Town: string,
    Picture1: string,
    Picdescribe1: string,
    Picture2: string,
    Picdescribe2: string
    Picture3: string,
    Picdescribe3: string,
    Parkinginfo: string,
    Serviceinfo: string[],
    CeilingPrice: number,
    LowestPrice: number,
    Px: number,
    Py: number,
    inCollect: boolean
}

export type loactionType = {
    latitude: any,
    longitude: any
}

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
    renderItem: dataType[]
}

export type paginationOptions = {
    pages: number | undefined,
    partPage: number,
    pageSize: number
}

export type selectType = {
    selectName: string,
    selectColumn: string,
    selectVals: string
}

export type modalContentType = {
    msTitle: string
    msContent: string
    msItem: { [key: string]: any }
}