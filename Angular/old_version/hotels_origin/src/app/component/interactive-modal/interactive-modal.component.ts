import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { modalContentType } from '../../types/types'

@Component({
  selector: 'app-interactive-modal',
  templateUrl: './interactive-modal.component.html',
  styleUrls: ['./interactive-modal.component.scss']
})
export class InteractiveModalComponent implements OnInit {

  @Input()
  public propsItemId: string = ""

  @Input()
  public propsModalToggle: boolean = false

  @Input()
  public propsModalContent: modalContentType = {
    msTitle: "",
    msContent: "",
    msItem: {}
  }

  @Output()
  public postClose: EventEmitter<{ [key: string]: any }> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  closeModal(haveDelete: boolean) {
    let { msItem: { id } } = this.propsModalContent
    this.postClose.emit({ targetID: id, haveDeleteState: haveDelete })
  }

}
