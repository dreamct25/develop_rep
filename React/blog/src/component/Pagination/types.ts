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

