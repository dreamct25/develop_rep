import { Component, OnInit } from '@angular/core';
import { selectType, modalContentType } from '../../types/types'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.scss']
})
export class SearchGroupComponent implements OnInit {

  public valGroup: FormGroup
  public selectTextI: string = "全部"
  public selectTextII: string = "不限定"
  public selectListToggle: boolean = false
  public openListToggleI: boolean = false
  public openListToggleII: boolean = false
  public currentIndexI: number = 0
  public currentIndexII: number = 0
  public checkBoxToggle: boolean = false
  public rwdState: boolean = false
  public modalToggle: boolean = false
  public msObj: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: {}
  }
  public selectListItem: selectType[] = [{
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
  }]
  public hotelTypeItem: selectType[] = [
    {
      selectName: "不限定",
      selectColumn: "Name",
      selectVals: ""
    },
    {
      selectName: "旅館",
      selectColumn: "Name",
      selectVals: "旅"
    },
    {
      selectName: "民宿",
      selectColumn: "Name",
      selectVals: "民宿"
    },
    {
      selectName: "商務旅館",
      selectColumn: "Name",
      selectVals: "商"
    },
    {
      selectName: "汽車旅館",
      selectColumn: "Name",
      selectVals: "汽車"
    },
    {
      selectName: "飯店",
      selectColumn: "Name",
      selectVals: "飯店"
    }
  ]
  constructor(public fb: FormBuilder, public router: Router) {
    this.valGroup = fb.group({
      searchBar: fb.group({
        searchVal: ["", [Validators.required, this.testVal]],
        selectValI: [""],
        selectValII: [""]
      })
    })
  }

  ngOnInit() {
    this.rwdState = window.innerWidth <= 768
    if (this.rwdState) this.msObj = {
      msTitle: "篩選內容",
      msContent: "",
      msItem: {
        selectListItem: this.selectListItem,
        hotelTypeItem: this.hotelTypeItem,
        checkBoxToggle: this.checkBoxToggle
      }
    }
  }

  searching() {
    let searchVal: string = this.valGroup.get("searchBar.searchVal")?.value
    let selectValI: string = this.valGroup.get("searchBar.selectValI")?.value
    let selectValII: string = this.valGroup.get("searchBar.selectValII")?.value
    let haveValid = this.valGroup.getError("message", "searchBar.searchVal")
    this.router.navigate(["main"], {
      queryParams: {
        searchItems: [
          searchVal,
          selectValI,
          selectValII,
          this.selectTextI,
          this.checkBoxToggle,
          JSON.stringify(haveValid)
        ]
      }
    })
  }

  openListI = () => this.openListToggleI = !this.openListToggleI

  openListII = () => this.openListToggleII = !this.openListToggleII

  checkBoxToggles = (haveCheck: boolean | undefined = undefined) => this.checkBoxToggle = haveCheck !== undefined ? haveCheck : !this.checkBoxToggle

  openFilterBox = (haveOpen: boolean) => this.modalToggle = haveOpen

  selectListValI({ columnText, columnName, currentIndex }: { [key: string]: any }) {
    this.currentIndexI = currentIndex
    this.selectTextI = columnText
    this.valGroup.get("searchBar.selectValI")?.setValue(columnName)
    setTimeout(() => this.openListToggleI = false, 650)
  }

  selectListValII({ columnText, columnName, currentIndex }: { [key: string]: any }) {
    this.currentIndexII = currentIndex
    this.selectTextII = columnText
    this.valGroup.get("searchBar.selectValII")?.setValue(columnName)
    setTimeout(() => this.openListToggleII = false, 650)
  }

  testVal(control: FormControl) {
    let rule = /^[\u4e00-\u9fa5_0-9]+$/
    let test = rule.test(control.value)
    return !test && { message: { messageText: "格式錯誤" } }
  }
}
