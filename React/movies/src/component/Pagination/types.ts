import { StyledComponent } from "styled-components";

export interface paginationObjType {
    hasPrev: boolean,
    hasNext: boolean,
    currentPage: number,
    totalLength?: number,
    partPage?: number,
    pageTotal: number,
    pageSize: number,
    postNext:(currentPage:number) => void
}

export interface PaginationProps {
    paginationObjProps:paginationObjType
}

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}