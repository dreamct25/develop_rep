import { Component, input, output, signal, effect, untracked, viewChild, ElementRef, afterNextRender, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UtilesService } from '@/app/service'
import { type LocationModalContentType } from '@/app/types'

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppLocationModal {

  propsLsModalToggle = input.required<boolean>()
  propsLsModalContent = input.required<LocationModalContentType>()

  postClose = output<boolean>()

  utiles = inject(UtilesService)

  private mapElement = viewChild<ElementRef<HTMLDivElement>>('map')
  private leaflet: ReturnType<typeof L.map>
  private leafletPin: ReturnType<typeof L.marker>
  private mapCenterPos: number[] = [23.565745352647966, 121.01552734375001]

  constructor() {

    afterNextRender(() => {
      
      if(!this.mapElement()?.nativeElement) return

      this.createMap()
    })

    effect(() => {

      if(this.propsLsModalContent()) {

        if(this.propsLsModalContent().msTitle) {
          this.goMapPos()
        }
      }

      if(this.propsLsModalToggle()) {

        this.utiles.hideBodyScollBar(true)

        return
      }

      this.utiles.hideBodyScollBar(false)
    })
  }

  async createMap(): void {

    const [L, ] = await Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css')
    ])

    const { map, marker, layerGroup, tileLayer, icon } = L
   
    this.leaflet = map(this.mapElement().nativeElement,{
      center: this.mapCenterPos,
      zoom: 8,
      zoomControl: false
    })

    this.leafletLayerGroup = layerGroup().addTo(this.leaflet)

    tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}&hl=zh-TW', {
      attribution: '(地圖資訊請以 Google Map 為主)'
    }).addTo(this.leaflet)
  }

  async goMapPos(): void {

    const { marker, icon } = await import('leaflet')

    const { msItem: { detailsParams: { PositionLon, PositionLat, Address } }, msTitle } = this.propsLsModalContent()

    this.leaflet.setView([PositionLat, PositionLon], 16, { animate: false })

    this.leafletPin = marker(
      [PositionLat, PositionLon],
      { 
        icon: icon({ 
          iconUrl: import.meta.env.MODE === 'development' ? '/images/pin.png' : './images/pin.png', 
          iconSize: [35, 35] 
        }), 
        shadowPane: true 
      }
    )
      .addTo(this.leafletLayerGroup)
      .bindPopup(msTitle)
      .openPopup()
  }

  closeModal(): void {

    this.postClose.emit(false)

    this.leaflet.removeLayer(this.leafletPin)

    this.leaflet.setView(this.mapCenterPos, 8, { animate: false })
  }
}
