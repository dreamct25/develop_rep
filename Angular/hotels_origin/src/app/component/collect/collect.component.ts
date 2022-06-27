import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { dataType, modalContentType, paginationReturnParams, paginationOptions } from 'src/app/types/types';
import { PaginationMethod } from '../class/paginationMethod';


@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit, OnChanges {

  @Input()
  public propsToggle: boolean = false

  @Output()
  public postToggle: EventEmitter<boolean> = new EventEmitter()

  public dataLocalStorge: dataType[] = []
  public dataLocalStorgeTemp: dataType[] = []
  public currentId?: string
  public getPaginationParams?: paginationReturnParams
  public paginationOptions: paginationOptions = { pages: 1, partPage: 10, pageSize: 10 }
  public currentDetailsIdTemp: string[] = []
  public currentIndex?: number
  public haveOpen: boolean = false
  public detailsToggle: boolean = false
  public lsModalToggle: boolean = false
  public lsObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: { url: "" }
  }
  public iaModalToggle: boolean = false
  public iaObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: { url: "" }
  }
  constructor() { }

  ngOnInit() {
    this.renderPagination(this.dataLocalStorge, this.paginationOptions)
  }

  ngOnChanges() {
    this.dataLocalStorge = this.dataSet("hotelCollect", "get")
    this.renderPagination(this.dataLocalStorge, this.paginationOptions)
  }

  closeCollect() {
    this.postToggle.emit(false)
  }

  haveDeleteCollect(targetName: string, targetID: string) {
    this.iaModalToggle = true
    this.iaObj = {
      msTitle: "提示",
      msContent: `確定要刪除 ${targetName}？`,
      msItem: { id: targetID }
    }
  }

  openDetails(id: string) {
    let itemId: number = this.currentDetailsIdTemp.indexOf(id)
    if (itemId === -1) {
      this.currentDetailsIdTemp = [...this.currentDetailsIdTemp, id]
    } else {
      this.currentDetailsIdTemp.splice(itemId, 1)
    }
  }

  toggleImg(id: string, index: number, haveOpen: boolean) {
    this.currentId = id
    this.currentIndex = index
    this.haveOpen = haveOpen
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

  deleteCollect(postItem: { [key: string]: any }) {
    let { targetID, haveDeleteState } = postItem
    if (haveDeleteState === true) {
      let dataLocalStorgeTemp: dataType[] = this.dataLocalStorge
      let findItemIndex = dataLocalStorgeTemp.findIndex(({ Id }: { Id: string }) => Id === targetID)
      dataLocalStorgeTemp.splice(findItemIndex, 1)
      this.dataLocalStorge = [...dataLocalStorgeTemp]
      this.dataSet("hotelCollect", "set", this.dataLocalStorge)
      this.dataLocalStorge = this.dataSet("hotelCollect", "get")
      this.renderPagination(this.dataLocalStorge, this.paginationOptions)
    }
    this.iaModalToggle = false
  }

  renderPagination(data: any, paginationOptions: paginationOptions) {
    let { pages, partPage, pageSize } = paginationOptions
    this.getPaginationParams = new PaginationMethod().paginations(data, pages, partPage, pageSize)
    this.dataLocalStorgeTemp = this.getPaginationParams.renderItem
  }

  dataSet(dataName: string, action: string, item: dataType[] | any = {}): dataType[] | [] {
    if (action === "get") {
      return this.dataLocalStorge = JSON.parse(localStorage.getItem(dataName)!) || []
    } else {
      this.dataLocalStorge = item
      localStorage.setItem(dataName, JSON.stringify(this.dataLocalStorge))
      return []
    }
  }
}
