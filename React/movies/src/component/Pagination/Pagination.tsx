import { FunctionComponent } from "react";
import { StyledComponent } from "styled-components";
import styles from './styles'

const { Show }: { Show: StyledComponent<"div", any, {}, never> } = styles

interface paginationObjType {
    hasPrev: boolean,
    hasNext: boolean,
    currentPage: number,
    totalLength?: number,
    partPage?: number,
    pageTotal: number,
    pageSize: number,
    postNext:(currentPage:number) => void
}

interface PaginationProps {
    paginationObjProps:paginationObjType
}

const Pagination:FunctionComponent<PaginationProps> = ({ paginationObjProps }:PaginationProps):JSX.Element => {

    const {
        hasPrev,
        hasNext,
        currentPage,
        totalLength,
        partPage,
        pageTotal,
        pageSize,
        postNext
    }:paginationObjType = paginationObjProps

    const current:Function = (currentPage:number,e:Event):void => {
        e.preventDefault()
        postNext(currentPage)
    }

    const renderPage:Function = ():JSX.Element[] => {
        let pageTotalToArray:number[] = []

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
            pageTotalToArray.map((pages:number,index:number) => (
                <li className="page-item" key={index}>
                    {
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a className={currentPage === pages ? "page-link active" : "page-link"} href="#" onClick={current.bind(this,pages)}>{pages}</a>
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
                        <a className={hasPrev ? "page-link page-link-active" : "page-link"} href="/#" onClick={current.bind(this,currentPage - 1)}>
                            <span aria-hidden="true"><i className="far fa-chevron-double-left"></i></span>
                        </a>
                    </li>
                    {renderPage()}
                    <li className={!hasNext ? "page-item disabled" : "page-item"}>
                        <a className={hasNext ? "page-link page-link-active" : "page-link"} href="/#" onClick={current.bind(this,currentPage + 1)}>
                            <span aria-hidden="true"><i className="far fa-chevron-double-right"></i></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Show>
    )
}

export default Pagination