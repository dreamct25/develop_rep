import React,{ PureComponent } from 'react'
import styles from '../Pagination/styles'

const { Show } = styles

class Pagination extends PureComponent{
    render() {
     return(
        <Show>
            <nav className="pagination-outer" aria-label="Page navigation">
                <ul className="pagination justify-content-center align-items-center">
                    <li className={this.props.paginationObjProps.hasPage ? "page-item" : "page-item disabled"}>
                        <a className={this.props.paginationObjProps.hasPage ? "page-link page-link-active" : "page-link"} href="/#"
                        aria-label="Previous" onClick={this.getPage.bind(this,this.props.paginationObjProps.currentPage - 1)}>
                            <span aria-hidden="true">
                                <i className="far fa-chevron-double-left"></i>
                            </span>
                        </a>
                    </li>
                    {this.renderPage(this.props.paginationObjProps.pageTotal,this.props.paginationObjProps.currentPage)}
                    <li className={this.props.paginationObjProps.hasNext ? "page-item" : "page-item disabled"}>
                        <a className={this.props.paginationObjProps.hasNext ?"page-link page-link-active" : "page-link"} href="/#" 
                        aria-label="Next" onClick={this.getPage.bind(this,this.props.paginationObjProps.currentPage + 1)}>
                        <span aria-hidden="true">
                            <i className="far fa-chevron-double-right"></i>
                        </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Show>
     )   
    }
    renderPage(pageTotal,currentPage){
        let pageSize = window.innerWidth <= 414 ? 6 : 10
        let array = []
        if (currentPage <= pageTotal) {
            if (currentPage < pageSize) {
            //當前頁數小於總頁數
            let i = Math.min(pageSize, pageTotal);
                while (i) {
                    array = [
                        <li key={i}>
                            <a className={currentPage ===  i? "page-link active" : "page-link"} href="/#" onClick={this.getPage.bind(this,i)}>{i}</a>
                        </li>,...array
                    ]
                    i--
                }
            } else {
                //當前頁數大於顯示總頁數
                let middle = currentPage - Math.floor(pageSize / 2),
                //記錄起始位置
                i = pageSize;
                if (middle > pageTotal - pageSize) middle = pageTotal - pageSize + 1
                while (i--) {
                    array = [
                        ...array,
                        <li key={middle}>
                            <a className={currentPage === middle ? "page-link active" : "page-link"} href="/#" onClick={this.getPage.bind(this,middle)}>{middle}</a>
                        </li>
                    ]
                    middle++
                }
            }
        }

        return array
    }
    getPage(currentPage,el){
        el.preventDefault();
        this.props.paginationPartProps(currentPage)
    }
}

export default Pagination