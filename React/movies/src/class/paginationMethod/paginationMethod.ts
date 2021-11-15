export interface paginationType {
    totalLength: number,
    partPage: number,
    pageTotal: number,
    currentPage: number,
    hasPrev: boolean,
    hasNext: boolean,
    pageSize: number
}

export interface paginationReturnParams {
    pageObj: paginationType,
    renderItem: { [key: string]: any }[]
}

export interface paginationOptions {
    pages: number | undefined,
    partPage: number,
    pageSize: number
}


export type paginationsParamsType = [{ [key: string]: any }[],number | undefined,number,number]

const PaginationMethod:{
    pagination:paginationType,
    paginations:(...params:paginationsParamsType) => paginationReturnParams
} = {
    pagination:{
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 1,
        hasPrev: false,
        hasNext: true,
        pageSize: 0
    },
    paginations(...params:paginationsParamsType): paginationReturnParams {
        let [currentItem, pages, partPage, pageSize] = params
        this.pagination.totalLength = currentItem.length;
        this.pagination.partPage = partPage
        this.pagination.pageTotal = Math.ceil(
            this.pagination.totalLength / this.pagination.partPage
        );
        this.pagination.pageSize = pageSize
        pages = pages === undefined ? 1 : pages

        this.pagination.currentPage = pages;
        this.pagination.hasPrev = this.pagination.currentPage > 1;
        this.pagination.hasNext = this.pagination.currentPage < this.pagination.totalLength;

        if (this.pagination.currentPage === this.pagination.pageTotal) this.pagination.hasNext = false
        if (this.pagination.currentPage > this.pagination.pageTotal) this.pagination.currentPage = this.pagination.pageTotal
        const minPage = this.pagination.currentPage * this.pagination.partPage - this.pagination.partPage + 1;
        const maxPage = this.pagination.currentPage * this.pagination.partPage;

        let currentItemTemp: { [key: string]: any }[] = currentItem
        currentItem = []
        currentItemTemp.forEach((item: { [key: string]: any }, index: number) => {
            let num = index + 1;
            if (num >= minPage && num <= maxPage) currentItem = [...currentItem, item];
        });

        return { pageObj: this.pagination, renderItem: currentItem }
    }
}

export const paginations:(...params:paginationsParamsType) => paginationReturnParams = (...params:paginationsParamsType): paginationReturnParams => PaginationMethod.paginations(...params)
