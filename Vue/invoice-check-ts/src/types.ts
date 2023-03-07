import QrScanner from 'qr-scanner'
import { Ref } from 'vue'
import $ from './lib/Library'

export interface ProviderObjType {
    $:$
}

export interface invoiceDataType {
    betweenMonth: number[]
    description: { splyAwards: string, spAwards: string, topAwards: string | string[] }
    publishDate: string,
    year: string
}

export interface invoiceDataRepackType {
    betweenMonth: number[]
    description: { splyAwards: string, spAwards: string, topAwards: string[] }
    publishDate: string,
    year: string
}

export interface invoiceDateDataType {
    label:string,
    value:string
}

export interface awardsDateRangeDataType {
    monthRange: string,
    monthDate: string[]
}

export interface staticAwardsDataType { title:string,desc:string }

export interface stateType {
    respResult:Ref<invoiceDataRepackType[]>
    renderData:Ref<invoiceDataRepackType[]>
    toggleInvoiceDateList:Ref<boolean>
    invoiceDateData:Ref<invoiceDateDataType[]>
    currentChoiceDate:Ref<string>
    renderAwardsDateRange:Ref<string[]>
    staticAwardsData:Ref<staticAwardsDataType[]>
    videoRef:Ref<HTMLVideoElement | undefined>
    QrSannerRef:Ref<QrScanner | undefined>
    toggleSannerFrame:Ref<boolean>
    toggleBadgeContent:Ref<{ status:boolean,content:string }>
    loadingStatus:Ref<boolean>
}

export interface methodType {
    getData():Promise<void>,
    repackRenderData(arr:invoiceDataType[]):invoiceDataRepackType[]
    changeInvoiceDate(val:string):void
    createAwardsDateRangeData(fullDate:string):string[]
    createStaticAwardsData():staticAwardsDataType[]
    openScanner():void
    closeScanner():void
    qrResult(result:QrScanner.ScanResult):void
    controlBadgeCotent(content:string):void
}