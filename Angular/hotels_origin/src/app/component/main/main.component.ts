import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetDataService } from 'src/app/service/getData.service';
import { loactionType, paginationReturnParams, dataType, paginationOptions, paginationType, modalContentType } from '../../types/types'
import { PaginationMethod } from '../class/paginationMethod'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public data: { message: string, data: any }[] = []
  public dataOnly: dataType[] = []
  public dataOnlyTemp: dataType[] = []
  public filterData: dataType[] = []
  public locationRange: loactionType = { latitude: 0, longitude: 0 }
  public posMember?: number
  public getPaginationParams?: paginationReturnParams
  public backPaginationParams!: paginationType
  public haveLoading: boolean = false
  public modalToggle: boolean = false
  public startSearching: boolean = true
  public searchParams: any[] = []
  public msObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: {}
  }

  constructor(
    public getDataServic: GetDataService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getData()
    this.route.queryParamMap.subscribe((paramsMap: Params) => {
      if (paramsMap.params["backPaginationParams"] !== undefined) this.backPaginationParams = JSON.parse(paramsMap.params["backPaginationParams"])
      if (paramsMap.params["searchItems"] !== undefined) {
        this.searchParams = paramsMap.params["searchItems"]
        if (this.searchParams[this.searchParams.length - 1] !== null && this.searchParams[this.searchParams.length - 1] !== undefined) this.searchParams[this.searchParams.length - 1] = JSON.parse(this.searchParams[this.searchParams.length - 1])
        this.searchItem(this.searchParams)
      }
    })
  }

  async getData() {
    this.haveLoading = true
    this.data = await this.getDataServic.datas()
    this.haveLoading = false
    this.dataOnly = this.data[0].data
    this.route.queryParamMap.subscribe((paramsMap: Params) => paramsMap.params["searchItems"] === undefined && this.getLocationAndRender())
  }

  async getLocationAndRender() {
    this.posMember = await navigator.geolocation.watchPosition(
      this.successGetLoaction.bind(this),
      this.errorGetLocation.bind(this),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
    )
    this.renderPagination(this.dataOnly, {
      pages: 1,
      partPage: window.innerWidth < 767 ? 8 : 12,
      pageSize: window.innerWidth < 767 ? 6 : 10
    })
  }

  renderPagination(data: any, paginationOptions: paginationOptions) {
    this.dataOnlyTemp = data
    let { pages, partPage, pageSize } = paginationOptions
    this.getPaginationParams = new PaginationMethod().paginations(this.dataOnlyTemp, pages, partPage, pageSize)
  }

  successGetLoaction(pos: { coords: { latitude: number, longitude: number } }) {
    this.locationRange.latitude = pos.coords.latitude.toFixed(3)
    this.locationRange.longitude = pos.coords.longitude.toFixed(3)
    let { latitude, longitude } = this.locationRange
    this.dataOnly = this.dataOnly.filter(({ Px, Py }: { Px: number, Py: number }) => (Px + 0.08 >= longitude && Px - 0.08 <= longitude) && (Py + 0.08 >= latitude && Py - 0.08 <= latitude))
    navigator.geolocation.clearWatch(this.posMember!)
  }

  errorGetLocation() {
    this.openModal(true, {
      msTitle: "提示",
      msContent: "如要搜尋附近旅店請開啟 GPS",
      msItem: {}
    })
  }

  goSingleInfo(id: string) {
    this.router.navigate(["/details"], {
      queryParams: {
        itemID: id,
        pageObj: JSON.stringify(this.getPaginationParams?.pageObj),
        currentSearch: this.searchParams.length === 0 ? null : JSON.stringify(this.searchParams)
      }
    })
  }
  searchItem([searchVal, selectValI, selectValII, selectTextI, checked, haveValid]: any[]) {
    let backPaginationParamsTemp: { [key: string]: any } = this.backPaginationParams === undefined ?
      { currentPage: 1, partPage: window.innerWidth < 767 ? 8 : 12, pageSize: window.innerWidth < 767 ? 6 : 10 } :
      this.backPaginationParams

    let { currentPage, partPage, pageSize } = backPaginationParamsTemp

    if (this.searchParams.length === 0) {
      this.renderPagination(this.dataOnly, {
        pages: currentPage,
        partPage: partPage,
        pageSize: pageSize
      })
      return
    }

    if (searchVal === "" && selectTextI !== "全部") {
      this.openModal(true, {
        msTitle: "提示",
        msContent: "如要搜尋所有旅店請選擇全部，並清除搜尋內容",
        msItem: {}
      })
    } else if (haveValid !== null && selectTextI !== "全部") {
      this.openModal(true, {
        msTitle: "提示",
        msContent: haveValid.messageText,
        msItem: {}
      })
    } else {
      if (selectValI === "") {
        this.filterData = checked ? this.dataOnly.filter((item: any) => item[selectValI] !== null && item.Picture1 !== "") : this.dataOnly
        this.filterData = searchVal === "" ? this.filterData : this.filterData.filter(({ Name, Add, Description, Region, Town }: dataType) =>
          Name !== null && Name.includes(searchVal) ||
          Add !== null && Add.includes(searchVal) ||
          Description !== null && Description.includes(searchVal) ||
          Region !== null && Region.includes(searchVal) ||
          Town !== null && Town.includes(searchVal))
        this.filterData = selectValII === "" ? this.filterData : this.filterData.filter(({ Name }: dataType) => Name.indexOf(selectValII) !== -1)
        this.renderPagination(this.filterData, {
          pages: currentPage,
          partPage: partPage,
          pageSize: pageSize
        })
      } else {
        this.filterData = checked ? this.dataOnly.filter((item: any) => item[selectValI].includes(searchVal) && item.Picture1 !== "") : this.dataOnly.filter((item: any) => item[selectValI].includes(searchVal))
        this.filterData = selectValII === "" ? this.filterData : this.filterData.filter(({ Name }: dataType) => Name.includes(selectValII))
        this.renderPagination(this.filterData, {
          pages: currentPage,
          partPage: partPage,
          pageSize: pageSize
        })
      }
    }
  }

  openModal(haveOpen: boolean, msObj: modalContentType) {
    this.modalToggle = haveOpen
    this.msObj = msObj
  }
}
