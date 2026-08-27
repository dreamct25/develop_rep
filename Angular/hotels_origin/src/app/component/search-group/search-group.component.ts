import { Component, WritableSignal, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FieldTree, form, FormField, required, validate } from '@angular/forms/signals';
import store from '@/app/store';
import { GetDataService } from '@/app/service';
import type { selectType, modalContentType, GetAllDataParamsType } from '@/app/types'

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.scss'],
  standalone: true,
  imports: [CommonModule, FormField]
})

export class AppSearchGroup {

  router = inject(Router)
  readonly store = inject(store)

  selectValGroup = signal<{
    searchVal: string,
    selectValI: string,
    selectValII: string
  }>({
    searchVal: '',
    selectValI: '',
    selectValII: ''
  })

  state: {
    valGroup: FieldTree<{
      searchVal: string
    }>
    selectTextI: WritableSignal<string>
    selectTextII: WritableSignal<string>
    selectListToggle: WritableSignal<boolean>
    openListToggleI: WritableSignal<boolean>
    openListToggleII: WritableSignal<boolean>
    currentIndexI: WritableSignal<number>
    currentIndexII: WritableSignal<number>
    checkBoxToggle: WritableSignal<boolean>
    modalToggle: WritableSignal<boolean>
    msObj: WritableSignal<modalContentType>
  } = {

    valGroup: form(this.selectValGroup, fied => {
      required(fied.searchVal, { message: '請輸入搜尋文字' })
      validate(fied.searchVal, ({ value }) => this.testVal(value()))
    }),
    selectTextI: signal("全部"),
    selectTextII: signal("不限定"),
    selectListToggle: signal(false),
    openListToggleI: signal(false),
    openListToggleII: signal(false),
    currentIndexI: signal(0),
    currentIndexII: signal(0),
    checkBoxToggle: signal(false),
    modalToggle: signal(false),
    msObj: signal({
      msTitle: "",
      msContent: "",
      msItem: {}
    })
  }

  private selectListItem: selectType[] = [
    {
      selectName: "全部",
      selectColumn: "",
      selectVals: ""
    }, {
      selectName: "依名稱",
      selectColumn: "Name",
      selectVals: ""
    }, {
      selectName: "依地址",
      selectColumn: "Add",
      selectVals: ""
    }, {
      selectName: "依縣市",
      selectColumn: "Region",
      selectVals: ""
    }, {
      selectName: "依地區",
      selectColumn: "Town",
      selectVals: ""
    }
  ]

  private hotelTypeItem: selectType[] = [
    {
      selectName: "不限定",
      selectColumn: "Name",
      selectVals: ""
    }, {
      selectName: "旅館",
      selectColumn: "Name",
      selectVals: "旅"
    }, {
      selectName: "民宿",
      selectColumn: "Name",
      selectVals: "民宿"
    }, {
      selectName: "商務旅館",
      selectColumn: "Name",
      selectVals: "商"
    }, {
      selectName: "汽車旅館",
      selectColumn: "Name",
      selectVals: "汽車"
    }, {
      selectName: "飯店",
      selectColumn: "Name",
      selectVals: "飯店"
    }
  ]

  constructor() {

    this.store.setFilterBoxModalContent({
      msTitle: "篩選內容",
      msContent: "",
      msItem: {
        selectListItem: this.selectListItem,
        hotelTypeItem: this.hotelTypeItem,
        checkBoxToggle: this.state.checkBoxToggle()
      }
    })

    effect(() => {

      if(this.store.filterBox().searhAction) {
        this.searching()
        this.store.setFilterBoxSearhAction(false)
      }
    })
  }

  searching(): void {

    const filterBoxVal = this.store.filterBox()

    const searchVal = this.state.valGroup.searchVal().value()
    const selectValI = filterBoxVal.selectListValI.columnName
    const selectValII = filterBoxVal.selectListValII.columnName
    const isHaveImage = filterBoxVal.checkBoxToggle
    const haveValidArr = this.state.valGroup.searchVal().errors()
    const searchCheckStatusCode = filterBoxVal.searchCheckStatusCode

    this.store.setFilterBoxSearchErrorMessages(
      haveValidArr.length > 0 ? haveValidArr[0] : []
    )

    const tempQuery = this.store.currentQueryStr()

    const queryParams: GetAllDataParamsType = Object.fromEntries(
      tempQuery.split('&').map(row => {
        const [key, value] = row.split('=')
        return [key, value]
      })
    )

    delete queryParams.s
    delete queryParams.col
    delete queryParams.type
    delete queryParams.have_img

    if(searchVal) queryParams.s = searchVal
    if(selectValI) queryParams.col = selectValI
    if(selectValII) queryParams.type = selectValII
    if(isHaveImage) queryParams.have_img = isHaveImage

    if (haveValidArr.length > 0 && selectValI !== "") {

      this.store.setFilterBoxSearchCheckStatusCode(2)

      return
    }

    if (haveValidArr.length > 0 && searchVal !== "") {
      
      this.store.setFilterBoxSearchCheckStatusCode(2)

      return
    }

    if (!searchVal && selectValI !== "") {
      
      this.store.setFilterBoxSearchCheckStatusCode(1)

      return
    }

    if(searchCheckStatusCode !== -1) {
      this.store.setFilterBoxSearchCheckStatusCode(-1)
    }

    this.store.setFilterBoxForceRenderCount(filterBoxVal.forceRenderCount + 1)

    if(filterBoxVal.modalToggle) {
      this.store.setFilterBoxModalToggle(false)
    }

    queryParams.page = 1
    
    this.router.navigate(["main"], { queryParams })
  }

  filterOpen(): void {
    this.store.setFilterBoxModalToggle(true)
  }

  testVal(value: string): {
    kind: string;
    message: string;
  } | null {
    const rule = /^[\u4e00-\u9fa5_0-9]+$/
    const test = rule.test(value)
    return !test ? {  kind: 'invalid', message: "格式錯誤" } : null
  }
}
