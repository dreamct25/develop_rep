import { Component, input, output } from '@angular/core';
import { type modalContentType } from '@/app/types'

@Component({
  selector: 'app-interactive-modal',
  templateUrl: './interactive-modal.component.html',
  styleUrls: ['./interactive-modal.component.scss'],
  standalone: true
})
export class AppInteractiveModal {

  propsModalToggle = input.required<boolean>()
  propsModalContent = input.required<modalContentType>()

  postClose = output<{ targetID: any, haveDeleteState: boolean }>()

  closeModal(haveDelete: boolean): void {
    const { msItem: { id } } = this.propsModalContent()
    this.postClose.emit({ targetID: id, haveDeleteState: haveDelete })
  }
}
