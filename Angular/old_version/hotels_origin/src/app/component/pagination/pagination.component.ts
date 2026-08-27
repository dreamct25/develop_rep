import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { paginationType } from '../../types/types'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  public paginationObjProps: paginationType = {
    totalLength: 0,
    partPage: 0,
    pageTotal: 0,
    pageTotalToArray: [],
    currentPage: 1,
    hasPrev: false,
    hasNext: true,
    pageSize: 0
  }
  @Output()
  public goCurrent: EventEmitter<{ pages: number | undefined, partPage: number, pageSize: number }> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.paginationObjProps != undefined) {
      if (this.paginationObjProps.currentPage <= this.paginationObjProps.pageTotal) {
        if (this.paginationObjProps.currentPage < this.paginationObjProps.pageSize) {
          //當前頁數小於總頁數
          let i = Math.min(this.paginationObjProps.pageSize, this.paginationObjProps.pageTotal);
          while (i) {
            this.paginationObjProps.pageTotalToArray = [i--, ...this.paginationObjProps.pageTotalToArray]
          }
        } else {
          //當前頁數大於顯示總頁數
          let middle = this.paginationObjProps.currentPage - Math.floor(this.paginationObjProps.pageSize / 2),
            //記錄起始位置
            i = this.paginationObjProps.pageSize;
          if (middle > this.paginationObjProps.pageTotal - this.paginationObjProps.pageSize) {
            middle = this.paginationObjProps.pageTotal - this.paginationObjProps.pageSize + 1;
          }
          while (i--) {
            this.paginationObjProps.pageTotalToArray = [...this.paginationObjProps.pageTotalToArray, middle++]
          }
        }
      }
    }
  }

  current(event: Event, pages: number) {
    event.preventDefault()
    let { partPage, pageSize } = this.paginationObjProps
    this.goCurrent.emit({ pages: pages, partPage: partPage, pageSize: pageSize })
  }
}
