import { Component, signal, inject, effect, type WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UtilesService } from '@/app/service'
import store from '@/app/store';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppFilterBox {

  readonly store = inject(store)
  utiles = inject(UtilesService)

  state: {
    modalContentOuterHeightToggle: WritableSignal<boolean>
    modalContentOuterToggle: WritableSignal<boolean>
    modalContentToggle: WritableSignal<boolean>
    selectListToggle: WritableSignal<boolean>
    openListToggleI: WritableSignal<boolean>
    openListToggleII: WritableSignal<boolean>
  } = {
    modalContentOuterHeightToggle: signal(false),
    modalContentOuterToggle: signal(false),
    modalContentToggle: signal(false),
    selectListToggle: signal(false),
    openListToggleI: signal(false),
    openListToggleII: signal(false),
  }

  constructor() {

    effect(() => {

      if(this.store.filterBox().modalToggle) {

        this.utiles.hideBodyScollBar(true)

        return
      }

      this.utiles.hideBodyScollBar(false)
    })
  }

  checkBoxToggles(): void {
    this.store.setFilterBoxCheckBoxToggle(!this.store.filterBox().checkBoxToggle)
  }

  selectListValI({ columnText, columnName, currentIndex }: { columnText: string, columnName: string, currentIndex: number }): void {

    this.store.setFilterBoxSelectListValI({
      columnText: columnText === '全部' ? '' : columnText, 
      columnName, 
      currentIndex
    })

    setTimeout(() => this.state.openListToggleI.set(false), 650)
  }

  selectListValII({ columnText, columnName, currentIndex }: { columnText: string, columnName: string, currentIndex: number }): void {

    this.store.setFilterBoxSelectListValII({
      columnText: columnText === '不限定' ? '' : columnText, 
      columnName, 
      currentIndex
    })

    setTimeout(() => this.state.openListToggleII.set(false), 650)
  }

  closeModal(e: PointerEvent): void {
    const element = e.target as HTMLDivElement
    
    if(element.classList.contains('filter-box-outer-frame-active')) {
      this.store.setFilterBoxModalToggle(false)
    }
  }

  closeModalWithAction(): void {
    this.store.setFilterBoxSearhAction(true)
  }
}
