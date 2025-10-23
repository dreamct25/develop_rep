import React,{ MouseEvent,useContext } from "react";
import { NewContext } from '../../App'
import { Container,PaginationProps } from '.'

const Pagination: FC<PaginationProps> = (props): TSX => {
    const { $ } = useContext(NewContext)
    const {
        hasPrev,
        hasNext,
        currentPage,
        pageTotal,
        pageSize,
        partPage,
        postNext
    } = props

    const current: (currentPage: number, e: MouseEvent) => void = (currentPage, e) => {
        e.preventDefault()
        postNext({ pages:currentPage,partPage:partPage,pageSize:pageSize })
    }

    const renderPageTags: () => number[] = () => {
        let pageTotalToArray: number[] = []

        if (props) {
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

        return pageTotalToArray
    }

    return pug`
        Container
            nav(className="pagination-outer",aria-label="Page navigation")
                ul(className="pagination justify-content-center align-items-center")
                    li(className=!hasPrev ? "page-item disabled" : "page-item")
                        a(className=hasPrev ? "page-link page-link-active" : "page-link",href="/#",onClick=current.bind(this, currentPage - 1))
                            span(aria-hidden="true")
                                i(className="far fa-chevron-double-left")
                    each pages,index in renderPageTags()
                        li(className="page-item",key=index)
                            a(className=currentPage === pages ? "page-link active" : "page-link",href="#",onClick=current.bind(this, pages)) #{pages}
                    li(className=!hasNext ? "page-item disabled" : "page-item")
                        a(className=hasNext ? "page-link page-link-active" : "page-link",href="/#",onClick=current.bind(this, currentPage + 1))
                            span(aria-hidden="true")
                                i(className="far fa-chevron-double-right")
    `
}

export default Pagination