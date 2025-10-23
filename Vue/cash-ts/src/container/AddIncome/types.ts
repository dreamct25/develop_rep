import { Ref } from 'vue'

export interface stateType {
    dateInputVals: Ref<{
        year: string | null,
        month: string | null,
        date: string | null
    }>,
    getInputVals: Ref<{
        getName:string | null,
        getCash:string | null,
        getCashWay:string | null,
        getCashWayDesc:string | null
    }>,
    getCashGroup: Ref<boolean>,
    disabledHidden: Ref<boolean>,
    isEditMode: Ref<boolean>,
    isLoading: Ref<boolean>
}

export interface singleIncomeDataType {
  amount:number
  cashType: string
  cashWay: string 
  createDate: string
  uuid: string
  name: string
  wayCategory: string
  wayFullDate: string
}

export interface methodType {
  goBack():void,
  createIncome():Promise<void>,
  updateIncome():Promise<void>,
  getSingleIncome(uuid:string):Promise<void>
}