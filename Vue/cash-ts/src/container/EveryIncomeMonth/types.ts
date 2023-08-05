import { Ref } from 'vue'
import { chartObjType } from '../../component'

export interface stateType {
    chooseIncomeToggle: Ref<boolean>,
    currentYear: Ref<string>,
    chartObj: Ref<chartObjType>,
    everyIncomeMonthData: Ref<everyIncomeMonthDataType[]>,
    isLoading: Ref<boolean>
}

export interface methodType {
    goBack():void
    getData(year:string):Promise<void>
}

export interface everyIncomeMonthDataType {
    month:number,
    total:number
}