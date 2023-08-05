import { Ref } from 'vue'

export interface stateType {
    dateInputVals: Ref<{
        year: string | null,
        month: string | null,
        date: string | null
    }>,
    costInputVals: Ref<{
        costName: string | null,
        costCash: string | null,
        costType: string | null,
        costTypeDesc: string | null,
        costWay: string | null,
        costWayDesc: string | null
    }>,
    pageAnimate: Ref<boolean>,
    costColumn: Ref<boolean>,
    disabledHidden: Ref<boolean>,
    isEditMode: Ref<boolean>,
    isLoading: Ref<boolean>
}

export interface methodType {
  goBack():void,
  createCost():Promise<void>,
  updateCost():Promise<void>,
  getSingleCost(uuid:string):Promise<void>
}

export interface singleExpenditureDataType {
    amount:number
    cashType: string
    cashWay: string 
    createDate: string
    uuid: string
    name: string
    wayCategory: string
    wayFullDate: string
}