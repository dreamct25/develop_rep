import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { modalContentType } from '../../types/types'

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit, OnChanges {

  @Input()
  public propsModalToggle: boolean = false

  @Input()
  public propsModalContent: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: {}
  }

  @Output()
  public postClose: EventEmitter<boolean> = new EventEmitter()

  @Output()
  public postSelectListValI: EventEmitter<{ [key: string]: any }> = new EventEmitter()

  @Output()
  public postSelectListValII: EventEmitter<{ [key: string]: any }> = new EventEmitter()

  @Output()
  public postCheckBoxToggle: EventEmitter<boolean> = new EventEmitter()

  public modalContentOuterHeightToggle: boolean = false
  public modalContentOuterToggle: boolean = false
  public modalContentToggle: boolean = false
  public checkBoxToggle: boolean = false
  public selectTextI: string = "全部"
  public selectTextII: string = "不限定"
  public selectListToggle: boolean = false
  public openListToggleI: boolean = false
  public openListToggleII: boolean = false
  public currentIndexI: number = 0
  public currentIndexII: number = 0
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.propsModalToggle) {
      this.modalContentOuterHeightToggle = true
      setTimeout(() => {
        this.modalContentOuterToggle = true
        this.modalContentToggle = true
      }, 700)
    } else {
      this.modalContentToggle = false
      this.modalContentOuterToggle = false
      setTimeout(() => this.modalContentOuterHeightToggle = false, 700)
    }

  }

  openListI = () => this.openListToggleI = !this.openListToggleI

  openListII = () => this.openListToggleII = !this.openListToggleII

  checkBoxToggles() {
    this.checkBoxToggle = !this.checkBoxToggle
    this.postCheckBoxToggle.emit(this.checkBoxToggle)
  }

  selectListValI({ columnText, columnName, currentIndex }: { [key: string]: any }) {
    this.currentIndexI = currentIndex
    this.selectTextI = columnText
    this.postSelectListValI.emit({ columnText: columnText, columnName: columnName, currentIndex: currentIndex })
    setTimeout(() => this.openListToggleI = false, 650)
  }

  selectListValII({ columnText, columnName, currentIndex }: { [key: string]: any }) {
    this.currentIndexII = currentIndex
    this.selectTextII = columnText
    this.postSelectListValII.emit({ columnText: columnText, columnName: columnName, currentIndex: currentIndex })
    setTimeout(() => this.openListToggleII = false, 650)
  }

  closeModal() {
    this.postClose.emit(false)
  }

}
