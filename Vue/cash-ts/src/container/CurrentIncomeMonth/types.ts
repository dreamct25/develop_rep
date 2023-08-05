import { Ref } from 'vue'
import { chartObjType } from '../../component'

export interface incomeHistoryDataType {
    uuid: string,
    name: string,
    cashWay: string,
    amount: number,
    wayFullDate: string,
    createDate: string
  }
  
export interface showIncomeGroupDataType {
    uuid: string,
    name: string,
    cashWay: string,
    amount: number,
    wayFullDate: string
}

export interface stateType {
    showIncomeGroup:Ref<showIncomeGroupDataType[]>,
    allIncomeCount: Ref<number>,
    dateInputVal: Ref<string>,
    titleDateVal: Ref<{ year:string,month:string }>
    incomeHistory: Ref<incomeHistoryDataType[]>
    incomeHistorySumList: Ref<{
        cashWayName: string,
        cashWayTotal: number,
        cashWayBarColor: string
    }[]>
    currentIncomeToggle: Ref<boolean>,
    chartObj: Ref<chartObjType>,
    isRenderChart: Ref<boolean>,
    isLoading: Ref<boolean>,
    modalParams: Ref<{
    isOpen: boolean,
    content: string,
    uuid: string
    }>
}

export interface methodType {
    goBack():void,
    getData(year:string,month:string):Promise<void>,
    changeTab(status:boolean):void,
    goEdit(uuid:string):void,
    goDelete(row:showIncomeGroupDataType):void,
    modalEvent(status:boolean):Promise<void>
}