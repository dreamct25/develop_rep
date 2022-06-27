import { StyledComponent } from "styled-components";
import { paginationOptions } from '../../class/paginationMethod/paginationMethod'

export interface paginationObjType {
    hasPrev: boolean,
    hasNext: boolean,
    currentPage: number,
    pageTotal: number,
    pageSize: number,
    partPage: number,
    postNext: (paginationOption: paginationOptions) => void
}

export interface PaginationProps {
    paginationObjProps: paginationObjType
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}