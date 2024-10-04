export interface PaginationProps {
    hasPrev: boolean,
    hasNext: boolean,
    currentPage: number,
    pageTotal: number,
    pageSize: number,
    partPage: number,
    postNext: (paginationOption: {
        pages: number | undefined,
        partPage: number,
        pageSize: number
    }) => void
}

export interface paginationType {
    totalLength?: number,
    partPage?: number,
    pageTotal?: number,
    currentPage?: number,
    hasPrev?: boolean,
    hasNext?: boolean,
    pageSize?: number
}

export interface paginationReturnParams<T> {
    pageObj: paginationType,
    renderItem: T[]
}

export interface paginationOptions {
    pages: number | undefined,
    partPage: number,
    pageSize: number
}


type paginationsParamsType<T> = [T[],number | undefined,number,number]

class PaginationMethod {
    private static setting:paginationType = {
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 1,
        hasPrev: false,
        hasNext: true,
        pageSize: 0
    }

    static createParts<T>(...params:paginationsParamsType<T>): paginationReturnParams<T> {
        let [currentItem, pages, partPage, pageSize] = params

        this.setting.totalLength = currentItem.length;
        this.setting.partPage = partPage
        this.setting.pageTotal = Math.ceil(
            this.setting.totalLength / this.setting.partPage
        );
        this.setting.pageSize = pageSize
        pages = pages === undefined ? 1 : pages

        this.setting.currentPage = pages;
        this.setting.hasPrev = this.setting.currentPage > 1;
        this.setting.hasNext = this.setting.currentPage < this.setting.totalLength;

        if (this.setting.currentPage === this.setting.pageTotal) this.setting.hasNext = false
        if (this.setting.currentPage > this.setting.pageTotal) this.setting.currentPage = this.setting.pageTotal
        const minPage = this.setting.currentPage * this.setting.partPage - this.setting.partPage + 1;
        const maxPage = this.setting.currentPage * this.setting.partPage;

        const currentItemTemp: T[] = currentItem
        
        const renderItem = currentItemTemp.map((item: T, index: number) => {
            return (index + 1 >= minPage && index + 1 <= maxPage) && item
        }).filter(item => item !== false) as T[];

        return { pageObj: this.setting, renderItem }
    }
}

export default PaginationMethod