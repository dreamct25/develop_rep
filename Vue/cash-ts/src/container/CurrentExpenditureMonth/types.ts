import { Ref } from 'vue'
import { chartObjType } from '../../component'

export interface expenditureHistoryDataType {
    uuid: string,
    name: string,
    cashType: string,
    cashWay: string,
    amount: number,
    wayFullDate: string,
    createDate: string
}
  
export interface showCostGroupDataType {
    uuid: string,
    name: string,
    cashType: string,
    cashWay: string,
    amount: number,
    wayFullDate: string
}

export interface stateType {
    showCostGroup:Ref<showCostGroupDataType[]>,
    allCostCount: Ref<number>,
    dateInputVal: Ref<string>,
    titleDateVal: Ref<{ year:string,month:string }>
    expenditureHistory: Ref<expenditureHistoryDataType[]>
    billHistorySumList: Ref<{
        categoryName: string,
        categoryTotal: number,
        categoryBarColor: string
    }[]>
    currentCost: Ref<boolean>,
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
    changeTab(status:boolean):void
    goEdit(uuid:string):void,
    goDelete(row:showCostGroupDataType):void,
    modalEvent(status:boolean):Promise<void>
}