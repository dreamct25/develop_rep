import { paginationType, paginationReturnParams } from "./types"
class PaginationMethod {
    public pagination: paginationType = {
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        pageTotalToArray: [],
        currentPage: 1,
        hasPrev: false,
        hasNext: true,
        pageSize: 0
    }

    constructor() { }

    public paginations = (currentItem: {[key:string]:any}[], pages: number | undefined, partPage: number, pageSize: number): paginationReturnParams => {
        const { pagination } = this
        pagination.totalLength = currentItem.length;
        pagination.partPage = partPage
        pagination.pageTotal = Math.ceil(
            pagination.totalLength / pagination.partPage
        );
        pagination.pageSize = pageSize
        pages = pages === undefined ? 1 : pages

        pagination.currentPage = pages;
        pagination.hasPrev = pagination.currentPage > 1;
        pagination.hasNext = pagination.currentPage < pagination.totalLength;

        if (pagination.currentPage === pagination.pageTotal) pagination.hasNext = false
        if (pagination.currentPage > pagination.pageTotal) pagination.currentPage = pagination.pageTotal
        const minPage = pagination.currentPage * pagination.partPage - pagination.partPage + 1;
        const maxPage = pagination.currentPage * pagination.partPage;

        let currentItemTemp: {[key:string]:any}[] = currentItem
        currentItem = []
        currentItemTemp.forEach((item:{[key:string]:any}, index:number) => {
            let num = index + 1;
            if (num >= minPage && num <= maxPage) currentItem = [...currentItem, item];
        });
        return { pageObj: pagination, renderItem: currentItem }
    }
}

export function paginations(
        currentItem: {[key:string]:any}[], 
        pages: number | undefined, 
        partPage: number, 
        pageSize: number
    ):paginationReturnParams { return new PaginationMethod().paginations(
        currentItem,pages, partPage, pageSize
    )}
