import { Component, input, output, signal, effect, inject, type WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common'
import store from '@/app/store';
import { UtilesService } from '@/app/service'
import type { 
  dataType, 
  LocationModalContentType, 
  modalContentType, 
  paginationReturnParams, 
  paginationOptions 
} from '@/app/types';
import { PaginationMethod } from '@/app/class/paginationMethod';
import { AppInteractiveModal, AppPagination, AppLocationModal } from '../'

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    AppInteractiveModal, 
    AppPagination, 
    AppLocationModal
  ]
})

export class AppCollect {

  propsToggle = input<boolean>(false)

  postToggle = output<boolean>()

  utiles = inject(UtilesService)
  readonly store = inject(store)

  state: {
    collectListTemp: WritableSignal<dataType[]>
    currentId: WritableSignal<string>
    getPaginationParams: WritableSignal<paginationReturnParams | undefined>
    paginationOptions: WritableSignal<paginationOptions>
    currentDetailsIdTemp: WritableSignal<string[]>
    currentIndex: WritableSignal<number>
    detailsToggle: WritableSignal<boolean>
    lsModalToggle: WritableSignal<boolean>
    lsObj: WritableSignal<LocationModalContentType>
    iaModalToggle: WritableSignal<boolean>
    iaObj: WritableSignal<modalContentType>
  } = {
    collectListTemp: signal([]),
    currentId: signal(''), 
    getPaginationParams: signal(undefined),
    paginationOptions: signal({ pages: 1, partPage: 10, pageSize: window.innerWidth < 767 ? window.innerWidth < 405 ? 5 : 6 : 10 }),
    currentDetailsIdTemp: signal([]),
    currentIndex: signal(-1),
    detailsToggle: signal(false),
    lsModalToggle: signal(false),
    lsObj: signal({
      msTitle: "",
      msContent: "",
      msItem: { url: "" }
    }),
    iaModalToggle: signal(false),
    iaObj: signal({
      msTitle: "",
      msContent: "",
      msItem: { url: "" }
    })
  }

  constructor() {

    this.renderPagination(this.store.collect().list, this.state.paginationOptions())

    effect(() => {

      if(this.store.collect().isAdd) {

        this.renderPagination(this.store.collect().list, this.state.paginationOptions())

        this.store.setCollectIsAdd(false)
      }

      if(this.propsToggle()) {

        this.utiles.hideBodyScollBar(true)

        return
      }

      this.utiles.hideBodyScollBar(false)
    })
  }

  closeCollect(): void {
    this.postToggle.emit(false)
  }

  haveDeleteCollect(targetName: string, targetID: string): void {
    
    this.state.iaModalToggle.set(true)
    this.state.iaObj.set({
      msTitle: "提示",
      msContent: `確定要刪除 ${targetName}？`,
      msItem: { id: targetID }
    })
  }

  openDetails(id: string): void {

    const itemId = this.state.currentDetailsIdTemp().indexOf(id)
    
    if (itemId === -1) {

      this.state.currentDetailsIdTemp.update(prevState => ([
        ...prevState,
        id
      ]))

      return
    }

    this.state.currentDetailsIdTemp.update(prevState => {
      prevState.splice(itemId, 1)
      return prevState
    })
  }

  toggleImg(id: string, index: number): void {
    this.state.currentId.set(id)
    this.state.currentIndex.set(index)
  }

  goMap(item: dataType): void {

    const { HotelName, PositionLon, PositionLat, PostalAddress } = item
    
    this.state.lsModalToggle.set(true)
    
    this.state.lsObj.set({
      msTitle: HotelName,
      msContent: "",
      msItem: { 
        detailsParams: { 
          HotelName, 
          PositionLat, 
          PositionLon, 
          address: `${PostalAddress.ZipCode}${PostalAddress.City}${PostalAddress.Town}${PostalAddress.StreetAddress}`
        } 
      }
    })
  }

  deleteCollect(postItem: { targetID: string, haveDeleteState: boolean }): void {

    const { targetID, haveDeleteState } = postItem
    
    if (haveDeleteState) {

      const findItemIndex = this.store.collect().list.findIndex(({ HotelID }) => HotelID === targetID)

      this.dataSet("delete", findItemIndex)

      this.renderPagination(this.store.collect().list, this.state.paginationOptions())
    }

    this.state.iaModalToggle.set(false)
  }

  async renderPagination(data: dataType[], paginationOptions: paginationOptions): Promise<void> {

    this.utiles.scrollToPos(
      document.querySelector('html'),
      {
        direction: 'top',
        scrollPos: 0,
        duration: 1500
      }
    )

    await this.utiles.useSleep(1000)
    
    const { pages, partPage, pageSize } = paginationOptions
    
    this.state.getPaginationParams.set(
      new PaginationMethod().paginations(data, pages, partPage, pageSize)
    )

    this.state.collectListTemp.set(
      this.state.getPaginationParams()!.renderItem
    )
  }

  dataSet(action: 'get' | 'set' | 'delete', item: dataType | any = {}): dataType[] | undefined {

    if(action === "get") {
      return this.store.collect().list
    }
    
    if (action === "delete") {

      const deepCopy: dataType[] = JSON.parse(JSON.stringify(this.store.collect().list))
      
      deepCopy.splice(item, 1)

      this.store.setCollectList(deepCopy)

      this.store.setCollectIsRemove(true)
    }

    if (action === "set") {

      const deepCopy: dataType[] = JSON.parse(JSON.stringify(this.store.collect().list))

      this.store.setCollectList([
        item,
        ...deepCopy
      ])
    }

    return
  }
}
