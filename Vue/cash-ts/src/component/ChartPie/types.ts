import { ChartBackgroundColorEnum } from '..'

export interface chartObjType {
    renderData: number[]
    categorys: string[],
    pieCategory: string,
    pieCategoryBackgroundColor: (keyof typeof ChartBackgroundColorEnum)[]
}

export interface ChartPieProps {
    chartObj:chartObjType
}