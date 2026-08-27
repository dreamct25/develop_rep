import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { modalContentType } from '../../types/types'
@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

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


  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.postClose.emit(false)
  }
}
