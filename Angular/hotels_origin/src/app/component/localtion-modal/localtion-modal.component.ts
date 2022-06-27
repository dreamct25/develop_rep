import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { empty } from 'rxjs';
import { modalContentType } from '../../types/types'

@Component({
  selector: 'app-localtion-modal',
  templateUrl: './localtion-modal.component.html',
  styleUrls: ['./localtion-modal.component.scss']
})
export class LocaltionModalComponent implements OnInit, OnChanges {

  @Input()
  public propsLsModalToggle: boolean = false

  @Input()
  public propsLsModalContent: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: { url: "" }
  }

  @Output()
  public postClose: EventEmitter<boolean> = new EventEmitter()

  public getLoading: any

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  goMapDetailsPage({ name, px, py }: { name: string, px: number, py: number }) {
    let urls: string = `https://www.google.com.tw/maps/search/${name}/@${px},${py}?hl=zh-TW`
    window.open(urls)
  }

  closeModal() {
    this.postClose.emit(false)
  }
}
