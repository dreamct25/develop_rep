import { paginationType, paginationReturnParams, dataType } from "../../types/types"
export class PaginationMethod {

    constructor() { }

    public paginations = (currentItem: dataType[], pages: number | undefined, partPage: number, pageSize: number): paginationReturnParams => {
        let pagination: paginationType = {
            totalLength: 0,
            partPage: 0,
            pageTotal: 0,
            pageTotalToArray: [],
            currentPage: 1,
            hasPrev: false,
            hasNext: true,
            pageSize: 0
        }
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

        let currentItemTemp: dataType[] = currentItem
        currentItem = []
        currentItemTemp.forEach((item, index) => {
            let num = index + 1;
            if (num >= minPage && num <= maxPage) currentItem = [...currentItem, item];
        });
        return { pageObj: pagination, renderItem: currentItem }
    }
}
