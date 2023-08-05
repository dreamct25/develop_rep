import { Ref } from 'vue'

export interface stateType {
    testCountToggle: Ref<boolean>,
    showNum: Ref<string>,
    lastOnlyFinalCountData: Ref<{
        finalMonthCount: number,
        finalYearCount: number
    }>
    showCalText: Ref<string>
    showCal: Ref<boolean>,
    renderNumArray: Ref<string[]>,
    lastOnlyData: Ref<lastOnlyDataType>,
    currentNum: Ref<string>,
    isLoading: Ref<boolean>
}

export interface methodType {
    goBack():void,
    numCounter(num:number):void,
    deleteNum():void,
    deleteAll():void,
    countCounter():void,
    getData(year:number,month:number):Promise<void>
}

export interface lastOnlyDataType {
    currentMonthLast: number,
    currentYearLast: number
}