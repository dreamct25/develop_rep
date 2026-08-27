import { Component, effect, inject, input, signal, WritableSignal, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import store from '@/app/store';
import { GetDataService } from '@/app/service';
import type { 
  dataType, 
  modalContentType, 
  LocationModalContentType, 
  GetAllDataParamsType 
} from '@/app/types'
import { AppLoading, AppAlertModal, AppLocationModal } from '../../component'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [CommonModule, AppLoading, AppAlertModal, AppLocationModal]
})

export class DetailsComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  getDataServic = inject(GetDataService)

  readonly store = inject(store)

  itemID = input<string>()

  state: {
    currentIndex: WritableSignal<number>
    haveOpen: WritableSignal<boolean>
    getSingleData: WritableSignal<dataType | undefined>
    haveLoading: WritableSignal<boolean>
    modalToggle: WritableSignal<boolean>
    lsModalToggle: WritableSignal<boolean>
    toggleFloatText: WritableSignal<boolean>
    backBtnToggle: WritableSignal<boolean>
    getCurrentSearch: WritableSignal<{
      searchVal: string,
      selectValI: string,
      selectValII: string,
      selectTextI: string,
      checked: boolean,
      haveValid: { message: string }
    } | undefined>
    lsObj: WritableSignal<LocationModalContentType>
    msObj: WritableSignal<modalContentType>
  } = {
    currentIndex: signal(-1),
    haveOpen:signal(false),
    getSingleData: signal(undefined),
    haveLoading: signal(false),
    modalToggle: signal(false),
    lsModalToggle: signal(false),
    toggleFloatText: signal(false),
    backBtnToggle: signal(false),
    getCurrentSearch: signal(undefined),
    lsObj: signal({
      msTitle: "",
      msContent: "",
      msItem: { url: "" }
    }),
    msObj: signal({
      msTitle: "",
      msContent: "",
      msItem: {}
    })
  }
  
  constructor() { 

    afterNextRender(async () => {
      await this.getData()
    })

    effect(() => {

      if(this.store.collect().isRemove) {
        this.matchHaveCollect()
      }
    })
  }

  toggleImg(index: number, haveOpen: boolean) {
    this.state.currentIndex.set(index)
    this.state.haveOpen.set(haveOpen)
  }

  async getData(): Promise<void> {

    if (!this.itemID()) {

      this.openModal(true, {
        msTitle: "提示",
        msContent: "操作錯誤",
        msItem: {}
      })

      return
    }
    
    this.state.haveLoading.set(true)
    
    const { data } = await this.getDataServic.single(this.itemID()!)
    
    this.state.haveLoading.set(false)

    this.state.backBtnToggle.set(true)

    this.getSingleItem(data)
  }

  getSingleItem(singleResult: dataType): void {

    if(!singleResult) return

    const { HotelName } = singleResult

    this.store.setCurrentSingleName(HotelName)

    this.state.getSingleData.set(singleResult) 
    
    this.matchHaveCollect()
  }

  goBack(): void {
    this.state.backBtnToggle.set(false)

    this.store.setCurrentSingleName('')
    
    setTimeout(() => {

      const tempQuery = this.store.currentQueryStr()

      const queryParams: GetAllDataParamsType = Object.fromEntries(
        tempQuery.split('&').map(row => {
          const [key, value] = row.split('=')
          return [key, value]
        })
      )
    
      this.router.navigate(["main"], { queryParams })
      
    }, 350)
  }

  goMap(): void {
    
    const { HotelName, PostalAddress: { ZipCode, City, Town, StreetAddress }, PositionLon, PositionLat } = this.state.getSingleData()

    this.state.lsModalToggle.set(true)
    
    this.state.lsObj.set({
      msTitle: HotelName,
      msContent: "",
      msItem: { detailsParams: { HotelName, Address: `${ZipCode} ${City}${Town}${StreetAddress}`, PositionLon, PositionLat } }
    })
  }

  addToCollect(item: dataType): void {

    const templeCollect = this.dataSet('get')

    const findCurrentCollectIndex = templeCollect.findIndex(tempItem => tempItem.HotelID === item.HotelID)

    if (findCurrentCollectIndex === -1) {

      this.state.getSingleData.update(prevState => ({
        ...prevState!,
        inCollect: true
      }))

      this.dataSet("set", item)
      
    } else {
      
      this.state.getSingleData.update(prevState => ({
        ...prevState!,
        inCollect: false
      }))

      this.dataSet("delete", findCurrentCollectIndex)
    }
    
    this.state.toggleFloatText.set(true)
    
    setTimeout(() => this.state.toggleFloatText.set(false), 800)
  }

  dataSet(action: 'get' | 'set' | 'delete', item: dataType | any = {}): dataType[] | undefined {

    if(action === "get") {
      return this.store.collect().list
    }
    
    if (action === "delete") {

      const deepCopy: dataType[] = JSON.parse(JSON.stringify(this.store.collect().list))
      
      deepCopy.splice(item, 1)

      this.store.setCollectList(deepCopy)
    }

    if (action === "set") {

      const deepCopy: dataType[] = JSON.parse(JSON.stringify(this.store.collect().list))

      this.store.setCollectList([
        item,
        ...deepCopy
      ])
    }

    this.matchHaveCollect()

    this.store.setCollectIsAdd(true)

    return
  }

  matchHaveCollect(): void {

    if(!this.state.getSingleData()) return

    if(this.store.collect().isRemove) {
      this.store.setCollectIsRemove(false)
    }

    const collectData: dataType[] = this.dataSet("get")!

    const [filterItem] = collectData.filter(row => row.HotelID === this.state.getSingleData().HotelID)

    if(!filterItem) {

      this.state.getSingleData.update(prevState => ({
        ...prevState!,
        inCollect: false
      }))

      return
    }

    this.state.getSingleData.update(prevState => ({
      ...prevState!,
      inCollect: true
    }))
  }

  openModal(haveOpen: boolean, msObj: modalContentType): void {
    this.state.modalToggle.set(haveOpen)
    this.state.msObj.set(msObj)
  }
}