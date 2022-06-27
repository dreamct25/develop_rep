import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetDataService } from 'src/app/service/getData.service';
import { dataType, paginationType, modalContentType } from '../../types/types'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public data: { message: string, data: any }[] = []
  public dataOnly: dataType[] = []
  public currentIndex?: number
  public haveOpen: boolean = false
  public getSingleData: dataType[] | any = []
  public pageObjTemp?: paginationType
  public haveLoading: boolean = false
  public modalToggle: boolean = false
  public lsModalToggle: boolean = false
  public toggleFloatText: boolean = false
  public backBtnToggle: boolean = false
  public dataLocalStorge: dataType[] | [] = this.dataSet("hotelCollect", "get")
  public getCurrentSearch: any[] = []
  public lsObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: { url: "" }
  }
  public msObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: {}
  }
  constructor(public route: ActivatedRoute, public router: Router, public getDataServic: GetDataService) { }

  ngOnInit() {
    this.getData()
  }

  toggleImg(index: number, haveOpen: boolean) {
    this.currentIndex = index
    this.haveOpen = haveOpen
  }

  async getData() {
    this.haveLoading = true
    this.data = await this.getDataServic.datas()
    this.haveLoading = false
    this.dataOnly = this.data[0].data
    this.route.queryParamMap.subscribe((paramsMap: Params) => {
      if (paramsMap.params["itemID"] === undefined) {
        this.openModal(true, {
          msTitle: "提示",
          msContent: "操作錯誤",
          msItem: {}
        })
      } else {
        this.backBtnToggle = true
        this.pageObjTemp = JSON.parse(paramsMap.params["pageObj"])
        if (paramsMap.params["currentSearch"] !== null && paramsMap.params["currentSearch"] !== undefined) this.getCurrentSearch = JSON.parse(paramsMap.params["currentSearch"])
        this.getSingleItem(paramsMap.params["itemID"])
      }
    })
  }

  getSingleItem = (id: string) => {
    this.getSingleData = this.dataOnly.filter(({ Id }: { Id: string }) => Id === id)
    let [{ Name }] = this.getSingleData
    sessionStorage.setItem("singleName", Name)
    this.matchHaveCollect()
  }
  goBack() {
    this.backBtnToggle = false
    sessionStorage.removeItem("singleName")
    setTimeout(() => {
      this.router.navigate(["main"], {
        queryParams: {
          backPaginationParams: JSON.stringify(this.pageObjTemp),
          searchItems: this.getCurrentSearch
        }
      })
    }, 700)
  }
  goMap({ name, px, py }: { name: string, px: number, py: number }) {
    let urls: string = `https://maps.google.com/?q=${name}&output=svembed&hl=zh-TW`
    this.lsModalToggle = true
    this.lsObj = {
      msTitle: name,
      msContent: "",
      msItem: { url: urls, detailsParams: { name: name, px: px, py: py } }
    }
  }
  addToCollect([item]: dataType[]) {
    let haveItem: number = this.dataLocalStorge.findIndex((tempItem: dataType) => tempItem.Id === item.Id)
    if (haveItem === -1) {
      this.getSingleData[0].inCollect = true
      this.dataSet("hotelCollect", "set", item)
    } else {
      let findCurrentCollectIndex = this.dataLocalStorge.findIndex(({ Id }: { Id: string }) => Id === item.Id)
      this.getSingleData[0].inCollect = false
      this.dataSet("hotelCollect", "delete", findCurrentCollectIndex)
    }
    this.toggleFloatText = true
    setTimeout(() => this.toggleFloatText = false, 800)
  }
  dataSet(dataName: string, action: string, item: dataType | any = {}): dataType[] | any {
    if (action === "get") {
      return this.dataLocalStorge = JSON.parse(localStorage.getItem(dataName)!) || []
    } else if (action === "delete") {
      this.dataLocalStorge.splice(item, 1)
      localStorage.setItem(dataName, JSON.stringify(this.dataLocalStorge))
    } else {
      this.dataLocalStorge = [item, ...this.dataLocalStorge]
      localStorage.setItem(dataName, JSON.stringify(this.dataLocalStorge))
    }
  }
  matchHaveCollect() {
    let collectData: dataType[] = JSON.parse(localStorage.getItem("hotelCollect")!) || []
    if (collectData.length !== 0) {
      collectData.forEach((collect: dataType) => {
        let findCollectIndex = this.getSingleData.findIndex((datas: dataType) => datas.Id === collect.Id)
        if (findCollectIndex !== -1) this.getSingleData[findCollectIndex].inCollect = true
      })
    }
  }

  openModal(haveOpen: boolean, msObj: modalContentType) {
    this.modalToggle = haveOpen
    this.msObj = msObj
  }
}
// google get map example url
// https://www.google.com.tw/maps/place/DECATHLON+%E8%BF%AA%E5%8D%A1%E5%84%82+%E5%8F%B0%E5%8C%97%E5%85%A7%E6%B9%96%E5%BA%97/@25.0565767,121.5712388,15z/data=!4m8!1m2!3m1!2z5Lit6I-v6LOT5aOr5Y2X5riv5pyN5YuZ5bug!3m4!1s0x3442ac1555555555:0x62ec76169c690054!8m2!3d25.0603309!4d121.5766177
