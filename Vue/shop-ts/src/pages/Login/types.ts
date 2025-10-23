import { ComputedRef,Ref } from 'vue'

type UnwrapRef<T> = {
    [K in keyof T]: T[K] extends Ref<infer U> ? U : T[K];
};

export interface storeGetterType {
    // costItemOrder?: ComputedRef<costItemType[]>,
    // costCatagoryOrder?: ComputedRef<costCatagoryType[]>
    // incomeCatagoryOrder?: ComputedRef<incomeCatagoryType[]>
}

export interface storeTypeTemp {
    token: Ref<string>
    // costCatagory: costCatagoryType[],
    // incomeCatagory: incomeCatagoryType[]
}

export type UnwrapRefStoreTypeTemp<T> = {
    [K in keyof T]: T[K] extends Ref<infer U> ? U : T;
};

export interface storeTypeTempWithGetter extends storeGetterType {
    // costItem: costItemType[],
    // costCatagory: costCatagoryType[],
    // incomeCatagory: incomeCatagoryType[]
}

export type storeType<isWithGetter> = isWithGetter extends true ? storeTypeTempWithGetter : storeTypeTemp

export interface stateType {
    // pageIsLoaded: Ref<boolean>,
    // goOtherPage: Ref<boolean>,
    // openStatus: Ref<boolean>,
    // selectItem: Ref<{ selectName:string,selectUrl:string }[]>,
    // currentPath: Ref<string>,
    // isLoading: Ref<boolean>
}

export interface methodType {
    // goFunction(row:{ selectName:string,selectUrl:string }):void
    // getCostResults():Promise<void>
    // goCurrentPage(path:string):void
}