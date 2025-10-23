import { Ref } from 'vue'
import { chartObjType } from '../../component'

export interface stateType {
    chooseCost: Ref<boolean>,
    currentYear: Ref<string>,
    chartObj: Ref<chartObjType>,
    everyExpenditureMonthData: Ref<everyExpenditureMonthDataType[]>,
    isLoading: Ref<boolean>
}

export interface methodType {
    goBack():void
    getData(year:string):Promise<void>
}

export interface everyExpenditureMonthDataType {
    month:number,
    total:number
}