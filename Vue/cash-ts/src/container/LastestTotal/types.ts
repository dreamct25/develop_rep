import { Ref } from 'vue'

export interface methodType {
    goBack():void,
    getData(year:string,month:string):Promise<void>,
    dateSetting(): Promise<void>
}

export interface stateType {
   lastTotalToggle: Ref<boolean>,
   lastTotalData: Ref<LastTotalDataType>
   currentDate: Ref<string>,
   isLoading: Ref<boolean>
}

export interface LastTotalDataType {
    currentMonthExpenditureCount: number, 
    currentYearExpenditureCount: number,  
    currentMonthExpenditureMax: number,
    currentYearExpenditureMax: number,
    currentMonthIncomeCount: number,      
    currentYearIncomeCount: number,       
    currentMonthIncomeMax: number,
    currentYearIncomeMax: number,
    currentMonthLast: number,             
    currentYearLast: number
}