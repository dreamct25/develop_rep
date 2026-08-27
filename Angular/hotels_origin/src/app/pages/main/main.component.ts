import { Component, input, inject, signal, WritableSignal, effect, computed, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { watchState } from '@ngrx/signals'
import store from '@/app/store';
import { GetDataService, UtilesService } from '@/app/service';
import type { 
  loactionType, 
  paginationReturnParams, 
  dataType, 
  paginationOptions, 
  paginationType, 
  modalContentType, 
  GetAllDataParamsType 
} from '@/app/types'
import { PaginationMethod } from '@/app/class/paginationMethod'
import { AppLoading, AppPagination, AppAlertModal, AppRenderItem } from '../../component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    AppLoading, 
    AppPagination, 
    AppAlertModal, 
    AppRenderItem
  ]
})

export class MainComponent {

  getDataServic = inject(GetDataService)
  utiles = inject(UtilesService)

  readonly store = inject(store)
  router = inject(Router)
  route = inject(ActivatedRoute)

  page = input<string>()
  per_page = input<string>()
  have_img = input<boolean>()
  s = input<string>()
  col = input<string>()
  type = input<string>()

  pageDynamic = computed(() => this.page())
  perPageDynamic = computed(() => this.per_page())

  haveImgDynamic = computed(() => this.have_img())
  searchValDynamic = computed(() => this.s())
  filterColumnDynamic = computed(() => this.col())
  filterTypeDynamic = computed(() => this.type())

  state: {
    dataOnly: WritableSignal<dataType[]>
    dataOnlyTemp: WritableSignal<dataType[]>
    locationRange: WritableSignal<loactionType>
    posMember: WritableSignal<number | undefined>
    getPaginationParams: WritableSignal<paginationReturnParams | undefined>
    haveLoading: WritableSignal<boolean>
    modalToggle: WritableSignal<boolean>
    startSearching: WritableSignal<boolean>
    searchParams: WritableSignal<GetAllDataParamsType | undefined>
    msObj: WritableSignal<modalContentType>
    pagination: WritableSignal<{
      currentPage: number,
      totalPage: number
    }>
  } = {
    dataOnly: signal([]),
    dataOnlyTemp: signal([]),
    locationRange: signal({ latitude: 0, longitude: 0 }),
    posMember: signal(undefined),
    getPaginationParams: signal(undefined),
    haveLoading: signal(false),
    modalToggle: signal(false),
    startSearching: signal(true),
    searchParams: signal(undefined),
    msObj: signal({
      msTitle: "",
      msContent: "",
      msItem: {}
    }),
    pagination: signal({
      currentPage: 0,
      totalPage: 0
    })
  }

  constructor() {

    effect(() => {

      const filterBoxVal = this.store.filterBox()

      const statusCode = filterBoxVal.searchCheckStatusCode
      const forceRenderCount = filterBoxVal.forceRenderCount

      if(statusCode >= 0) {

        const haveValid = filterBoxVal.searchErrorMessages

        if (statusCode === 1) {
      
          this.openModal(true, {
            msTitle: "提示",
            msContent: "如要搜尋所有旅店請選擇全部，並清除搜尋內容",
            msItem: {}
          })
        } 
        
        if (statusCode === 2) {
          
          this.openModal(true, {
            msTitle: "提示",
            msContent: haveValid.message,
            msItem: {}
          })
        }

        if(statusCode === 0) return

        this.store.setFilterBoxSearchCheckStatusCode(0)

        return
      }

      if(filterBoxVal.modalToggle) return

      if (this.pageDynamic() && this.perPageDynamic() && this.store.filterBox().forceRenderCount >= 0) {

        const tempQuery = this.store.currentQueryStr()

        let query: GetAllDataParamsType | undefined = undefined

        query = {
          page: parseInt(this.pageDynamic()!), 
          per_page: parseInt(this.perPageDynamic()!),
          have_img: this.haveImgDynamic(),
          s: this.searchValDynamic(),
          col: this.filterColumnDynamic(),
          type: this.filterTypeDynamic()
        }

        const queryStr = Object.entries(query)
          .map(([key, value]) => value ? `${key}=${value}` : '')
          .filter(row => row !== '')
          .join('&')

        if(tempQuery === queryStr) {

          query = Object.fromEntries(
            tempQuery.split('&').map(row => {
              const [key, value] = row.split('=')
              return [key, value]
            })
          ) as GetAllDataParamsType

        } else {
          this.store.setCurrentQueryStr(queryStr)
        }

        this.state.searchParams.set(query)

        this.getData(
          this.state.searchParams()!
        )

        return
      }

      this.router.navigate(['/main'], {
        queryParams: {
          page: 1, 
          per_page: window.innerWidth < 767 ? 8 : 20,
        }
      })

      this.getData({
        page: 1, 
        per_page: window.innerWidth < 767 ? 8 : 20,
      })

      const queryStr = Object.entries({
        page: 1, 
        per_page: window.innerWidth < 767 ? 8 : 20,
        have_img: this.haveImgDynamic(),
        s: this.searchValDynamic(),
        col: this.filterColumnDynamic(),
        type: this.filterTypeDynamic()
      })
        .map(([key, value]) => value ? `${key}=${value}` : '')
        .filter(row => row !== '')
        .join('&')

      this.store.setCurrentQueryStr(queryStr)

      this.state.searchParams.set({
        page: 1, 
        per_page: window.innerWidth < 767 ? 8 : 20,
      })
    })
  }

  async getData(params: GetAllDataParamsType): Promise<void> {
    
    this.state.haveLoading.set(true)

    this.utiles.scrollToPos(
      document.querySelector('html'),
      {
        direction: 'top',
        scrollPos: 0,
        duration: 1500
      }
    )

    await this.utiles.useSleep(1000)
    
    const { data: payload } = await this.getDataServic.datas(params)

    if(!payload) return

    const { data, totalPage } = payload

    this.state.haveLoading.set(false)
    this.state.dataOnly.set(data)

    this.state.pagination.set({
      currentPage: parseInt(this.pageDynamic()!) || 1,
      totalPage
    })

    if(!this.searchValDynamic() && !this.store.isShowGPSModalStatus()) {
      this.store.setIsShowGPSModalStatus(true)
      this.getLocationAndRender()
    }
  }

  async getLocationAndRender() {

    this.state.posMember.set(
      navigator.geolocation.watchPosition(
        this.successGetLoaction.bind(this),
        this.errorGetLocation.bind(this),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      )
    )
  }

  successGetLoaction(pos: { coords: { latitude: number, longitude: number } }): void {

    const { latitude, longitude } = pos.coords

    const latitudeTemp = parseFloat(latitude.toFixed(3))
    const longitudeTemp = parseFloat(longitude.toFixed(3))

    this.state.locationRange.set({
      latitude: latitudeTemp,
      longitude: longitudeTemp
    })

    this.state.dataOnly.set(
      this.state.dataOnly()
        .filter(({ Px, Py }) => 
          (Px + 0.08 >= longitudeTemp && Px - 0.08 <= longitudeTemp) && 
          (Py + 0.08 >= latitudeTemp && Py - 0.08 <= latitudeTemp)
        )
    )

    if(!this.state.posMember()) return

    navigator.geolocation.clearWatch(this.state.posMember()!)
  }

  errorGetLocation(): void {
    
    this.openModal(true, {
      msTitle: "提示",
      msContent: "如要搜尋附近旅店請開啟 GPS",
      msItem: {}
    })
  }

  goSingleInfo(id: string): void {
    this.router.navigate(["/details", id])
  }

  goNext(page: number): void {

    this.state.searchParams.update(prevState => ({
      ...prevState,
      page,
      per_page: prevState!.per_page
    }))

    this.store.setFilterBoxForceRenderCount(this.store.filterBox().forceRenderCount + 1)

    this.router.navigate(['/main'], {
      queryParams: {
        ...this.state.searchParams()
      }
    })
  }

  openModal(haveOpen: boolean, msObj: modalContentType): void {
    this.state.modalToggle.set(haveOpen)
    this.state.msObj.set(msObj)
  }
}
