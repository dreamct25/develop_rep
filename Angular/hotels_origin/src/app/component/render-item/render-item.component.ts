import { Component, input, output, signal, viewChildren, ElementRef, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common'
import { type dataType } from '@/app/types'

@Component({
  selector: 'app-render-item',
  templateUrl: './render-item.component.html',
  styleUrls: ['./render-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppRenderItem {

  propsData = input.required<dataType[]>()

  idPost = output<string>()

  topFrameToggle = signal<boolean>(false)
  currentIndex = signal<number>(-1)

  private elements = viewChildren<ElementRef<HTMLDivElement>>('itemRef')

  topFrameToggleFn(haveToggle: boolean, currentIndex: number): void {
    this.topFrameToggle.set(haveToggle)
    this.currentIndex.set(currentIndex)
  }

  getSingleId(id: string): void {
    this.idPost.emit(id)
  }

  constructor() {
    
    effect(() => {

      if(this.elements().length > 0) {

        this.elements().forEach(row => {
          const element = getComputedStyle(row.nativeElement)
          const imgUrl = element.getPropertyValue('--url')
          
          const img = new Image()
          img.src = imgUrl

          img.onload = () => {
            row.nativeElement.style.cssText = `--picture: url(${imgUrl})`
            row.nativeElement.querySelector('.img').classList.add('active')
            row.nativeElement.querySelector('.img-loading').classList.remove('active')
          }

          img.onerror = () => {
            row.nativeElement.querySelector('.img-loading').classList.remove('active')
            row.nativeElement.classList.add('hidden')
          }
        })
      }
    })
  }
}
