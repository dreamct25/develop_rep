import { ComputedRef,Ref } from 'vue'

export interface costItemType {
    key: string,
    order: number,
    names: string
}

export interface costCatagoryType {
    key: string,
    order: number,
    ways: string
}

export interface incomeCatagoryType {
    key: string,
    order: number,
    ways: string
}

export interface storeGetterType {
    costItemOrder?: ComputedRef<costItemType[]>,
    costCatagoryOrder?: ComputedRef<costCatagoryType[]>
    incomeCatagoryOrder?: ComputedRef<incomeCatagoryType[]>
}

export interface storeTypeTemp {
    costItem: costItemType[],
    costCatagory: costCatagoryType[],
    incomeCatagory: incomeCatagoryType[]
}

export interface storeTypeTempWithGetter extends storeGetterType {
    costItem: costItemType[],
    costCatagory: costCatagoryType[],
    incomeCatagory: incomeCatagoryType[]
}

export type storeType<isWithGetter> = isWithGetter extends true ? storeTypeTempWithGetter : storeTypeTemp 

export interface stateType {
    pageIsLoaded: Ref<boolean>,
    goOtherPage: Ref<boolean>,
    openStatus: Ref<boolean>,
    selectItem: Ref<{ selectName:string,selectUrl:string }[]>,
    currentPath: Ref<string>,
    isLoading: Ref<boolean>
}

export interface methodType {
    goFunction(row:{ selectName:string,selectUrl:string }):void
    getCostResults():Promise<void>
    goCurrentPage(path:string):void
}