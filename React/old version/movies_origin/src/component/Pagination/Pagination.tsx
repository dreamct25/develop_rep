import React, { FunctionComponent } from "react";
import { PaginationProps, paginationObjType, cssSetPropertys } from './types'
import styles from './styles'

const { Show }: cssSetPropertys = styles

const Pagination: FunctionComponent<PaginationProps> = ({ paginationObjProps }: PaginationProps): JSX.Element => {

    const {
        hasPrev,
        hasNext,
        currentPage,
        pageTotal,
        pageSize,
        partPage,
        postNext
    }: paginationObjType = paginationObjProps

    const current: (currentPage: number, e: React.MouseEvent) => void = (currentPage, e) => {
        e.preventDefault()
        postNext({ pages:currentPage,partPage:partPage,pageSize:pageSize })
    }

    const renderPageTags: () => JSX.Element[] = () => {
        let pageTotalToArray: number[] = []

        if (paginationObjProps !== undefined) {
            if (currentPage <= pageTotal) {
                if (currentPage < pageSize) {
                    //當前頁數小於總頁數
                    let i = Math.min(pageSize!, pageTotal);
                    while (i) {
                        pageTotalToArray = [i--, ...pageTotalToArray]
                    }
                } else {
                    //當前頁數大於顯示總頁數
                    let middle = currentPage - Math.floor(pageSize / 2)
                    //記錄起始位置
                    let i = pageSize;
                    if (middle > pageTotal - pageSize) {
                        middle = pageTotal - pageSize! + 1;
                    }
                    while (i--) {
                        pageTotalToArray = [...pageTotalToArray, middle++]
                    }
                }
            }
        }

        return (
            pageTotalToArray.map((pages: number, index: number) => (
                <li className="page-item" key={index}>
                    {
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a className={currentPage === pages ? "page-link active" : "page-link"} href="#" onClick={current.bind(this, pages)}>{pages}</a>
                    }
                </li>)
            )
        )

    }

    return (
        <Show>
            <nav className="pagination-outer" aria-label="Page navigation">
                <ul className="pagination justify-content-center align-items-center">
                    <li className={!hasPrev ? "page-item disabled" : "page-item"}>
                        <a className={hasPrev ? "page-link page-link-active" : "page-link"} href="/#" onClick={current.bind(this, currentPage - 1)}>
                            <span aria-hidden="true"><i className="far fa-chevron-double-left"></i></span>
                        </a>
                    </li>
                    {renderPageTags()}
                    <li className={!hasNext ? "page-item disabled" : "page-item"}>
                        <a className={hasNext ? "page-link page-link-active" : "page-link"} href="/#" onClick={current.bind(this, currentPage + 1)}>
                            <span aria-hidden="true"><i className="far fa-chevron-double-right"></i></span>
                        </a>
                    </li>
                </ul>
                <div className="page-text">第 { currentPage } / { pageTotal } 頁</div>
            </nav>
        </Show>
    )
}

export default Pagination