import { Component, input, output, effect, untracked, signal, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { type paginationType } from '@/app/types'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppPagination {

  isWithLocal = input<boolean>(false)
  
  paginationObjWithLocalProps = model<paginationType>({
    totalLength: 0,
    partPage: 0,
    pageTotal: 0,
    pageTotalToArray: [],
    currentPage: 1,
    hasPrev: false,
    hasNext: true,
    pageSize: 0
  })

  paginationObjProps = input<{
    currentPage: number,
    totalPage: number
  }>({
    currentPage: 0,
    totalPage: 0
  })

  pageTotalToArray = signal<number[]>([])
  innerWidth = signal<number>(window.innerWidth)
  
  goCurrentWithLocal = output<{ pages: number | undefined, partPage: number, pageSize: number }>()
  goCurrent = output<number>()

  private resizeDebounceTimer: number
  
  constructor() {

    effect((onCleanUp) => {

      if(this.isWithLocal()){

        const { currentPage, pageTotal, pageSize, pageTotalToArray } = this.paginationObjWithLocalProps();

        if (currentPage <= pageTotal) {
          
          const tempArray: number[] = [];

          if (currentPage < pageSize) {
            // 當前頁數小於總預數
            let max = Math.min(pageSize, pageTotal);

            let i = 1;

            while (i <= max) {
              tempArray.push(i++);
            }

          } else {

            // 當前頁數大於總預數
            let middle = currentPage - Math.floor(pageSize / 2);
            let i = 0;

            if (middle > pageTotal - pageSize + 1) {
              middle = pageTotal - pageSize + 1;
            }

            if (middle < 1) middle = 1;

            while (i < pageSize) {
              tempArray.push(middle++);
              i++;
            }
          }

          // 2. 第一道防護：比對新算出來的 tempArray 跟原本物件裡的陣列是否完全一樣
          const oldArray = pageTotalToArray || [];
          const isChanged = oldArray.length !== tempArray.length || 
                            oldArray.some((val, idx) => val !== tempArray[idx]);

          // 3. 第二道防護：只有在「真的有變」的時候才更新，且必須用 untracked 包起來
          if (isChanged) {

            untracked(() => {
              this.paginationObjWithLocalProps.update(prevState => ({
                ...prevState,
                pageTotalToArray: tempArray
              }));
            });
          }
        }

        return
      }

      const pageSize = this.innerWidth() < 767 ? this.innerWidth() < 453 ? 3 : 5 : 10

      const { currentPage, totalPage } = this.paginationObjProps();

      if (currentPage <= totalPage) {
        
        const tempArray: number[] = [];

        if (currentPage < pageSize) {
          // 當前頁數小於總預數
          let max = Math.min(pageSize, totalPage);

          let i = 1;

          while (i <= max) {
            tempArray.push(i++);
          }

        } else {

          // 當前頁數大於總預數
          let middle = currentPage - Math.floor(pageSize / 2);
          let i = 0;

          if (middle > totalPage - pageSize + 1) {
            middle = totalPage - pageSize + 1;
          }

          if (middle < 1) middle = 1;

          while (i < pageSize) {
            tempArray.push(middle++);
            i++;
          }
        }

        this.pageTotalToArray.set(tempArray)
      }

      window.addEventListener('resize', this.resizeHandler.bind(this))

      onCleanUp(() => {
        window.removeEventListener('resize', this.resizeHandler.bind(this))
      })
    })
  }

  current(event: Event, pages: number): void {

    event.preventDefault()

    if(this.isWithLocal()) {

      const { partPage, pageSize } = this.paginationObjWithLocalProps()

      this.goCurrentWithLocal.emit({ pages, partPage, pageSize })

      return
    }
    
    this.goCurrent.emit(pages)
  }

  resizeHandler(): void {

    if(this.resizeDebounceTimer) clearTimeout(this.resizeDebounceTimer)

    this.resizeDebounceTimer = setTimeout(() => {
      this.innerWidth.set(window.innerWidth)
    }, 16)
  }
}
