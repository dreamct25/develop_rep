import { Component, input, output, effect, inject } from '@angular/core';
import { UtilesService } from '@/app/service'
import { type modalContentType } from '@/app/types'

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  standalone: true
})

export class AppAlertModal {
  
  propsModalToggle = input.required<boolean>()

  propsModalContent = input.required<modalContentType>()

  postClose = output<boolean>()

  utiles = inject(UtilesService)

  constructor() {

    effect(() => {

      if(this.propsModalToggle()) {
        
        this.utiles.hideBodyScollBar(true)
        
        return
      }

      this.utiles.hideBodyScollBar(false)
    })
  }

  closeModal(): void {
    this.postClose.emit(false)
  }
}
