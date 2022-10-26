import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import './styles.scss'
import pin from '../public/images/pin.png'
import data from './json/data.json'
import './lib/Library'
import $ from './lib/Library'
import type { fetchDataType,travelDataType } from './types'

declare global {
    interface Window {
        dinamicSingleData(name:string):void
    }
}

const provider = new OpenStreetMapProvider()
let travelData:travelDataType[] = []
let currentSelectItem:travelDataType
let isZoom:boolean = false
let isSearch:boolean = false
let isDarkModeOpen:boolean = false

const map = L.map('map',{
  center: [23.565745352647966, 121.01552734375001],
  zoom: 8,
  zoomControl: false
})

const popup = L.popup()

const layerGroup = L.layerGroup().addTo(map)

L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',{ attribution:'&copy; CopyRight By Alex Chen - Travel 2022-10' }).addTo(map)

const removeSingleDataView:() => void = () => $('.right-side').removeClass('active')

const searchPos:() => void = async () => {
    const value = $('[name="search-input"]').val()
    if(value){
        isSearch = true

        const result = await provider.search({ query:value })

        if(result.length > 0){
            const [{ x,y },] = result
            
            const filterItemAddress = $.filter(travelData,(item:travelDataType):any => item.Add && item.Add.match(value)) as travelDataType[]
            const filterItemName = $.filter(travelData,(item:travelDataType):any => item.Add && item.Name.match(value)) as travelDataType[]

            const filterItem = filterItemAddress.length > 0 ? filterItemAddress : filterItemName

            layerGroup.clearLayers()

            map.flyTo([y,x],isZoom ? map.getZoom() : 15)

            isZoom = true

            setTimeout(() => {
                renderData(filterItem)
                // toggleDarkMode()
            },3000)
        }
    }
}

const searchPosWhenEnter:({ keyCode,target }:KeyboardEvent) => void = ({ keyCode,target }) => {
    const { value } = target as HTMLInputElement
    
    keyCode === 13 && searchPos()

    if(value.length === 1){
        $('.search-list-outer').removeClass('active')
        $('.right-side').removeClass('active')
        layerGroup.clearLayers()
    }
}

const renderData:(objTemp:travelDataType | travelDataType[]) => void = objTemp => {
    if($.typeOf(objTemp,'Object')){
        const obj = objTemp as travelDataType

        $('.single-list').html(`
            <div class="list-item">
                <div class="top">
                    ${obj.Picture1 ? `<div class="img" style="background-image:url('${obj.Picture1}');"></div>` : '<div class="no-img">No Image</div>'}
                    <div class="img-desc ${obj.Name ? '' : 'hide'}">${obj.Name}</div>
                </div>
                <div class="middle">
                    <div>景點說明</div>
                    <div>${obj.Toldescribe ? obj.Toldescribe : '暫無資訊'}</div>
                    <div>交通資訊</div>
                    <div>${obj.Travellinginfo ? obj.Travellinginfo : '暫無資訊'}</div>
                </div>
            </div>
        `)

        currentSelectItem = obj

        map.flyTo([obj.Py,obj.Px],isZoom ? map.getZoom() : 15)
        popup.setLatLng({ lat: obj.Py,lng:obj.Px }).setContent(obj.Name).openOn(map)

        $('.right-side').addClass('active')

        isZoom = true
    } else {
        const filterItem = objTemp as travelDataType[]

        layerGroup.clearLayers()

        $('.search-list').html($.maps(filterItem,(item:travelDataType,index:number) => {
            L.marker([item.Py,item.Px],{ icon: L.icon({ iconUrl: pin, iconSize: [20,20] }) }).addTo(layerGroup).bindPopup(item.Name).on('click',renderData.bind(this,item))

            return `<div class="list-item ${currentSelectItem && index === 0 ? 'active' : ''}" onclick="dinamicSingleData('${item.Name}')">
                <div>${item.Name}</div>
                <div><i class="fas fa-map-marker-alt color="#FF0000""></i>${item.Add ? item.Add.replace(item.Zipcode,'').split('').appendFirst(` ${item.Zipcode} `).join('') : ' 暫無資訊'}</div>
                <div><i class="fas fa-mobile-alt" color="#00BBFF"></i>${item.Tel ? item.Tel : '暫無資訊'}</div>
                <div><i class="fas fa-clock" color="#FF1493"></i>${item.Opentime ? item.Opentime : '暫無資訊'}</div>
                <div><i class="fas fa-tag color="#F5D005""></i>${item.Ticketinfo ? item.Ticketinfo : '暫無資訊'}</div>
            </div>
            `
        }).join(''))

        $('.search-list-outer').addClass('active')

        $('.search-list').scrollToTop({ scrollTop:0,duration:5000 })
    }
}

window.dinamicSingleData = name => {
    const filterItem = $.filter(travelData,({ Name }:travelDataType):any => Name === name) as travelDataType[]

    if(filterItem.length > 0){
        const [obj] = filterItem
        renderData(obj)
    }
}

const getAreasData:() => void = () => {
    if(!isSearch){
        const { lat:northEastLat,lng:northEastLng } = map.getBounds().getNorthEast()
        const { lat:southWestLat,lng:southWestLng } = map.getBounds().getSouthWest()

        const filterItem = $.filter(travelData,(item:travelDataType):any => northEastLat > item.Py && southWestLat < item.Py && northEastLng > item.Px && southWestLng < item.Px)

        if(currentSelectItem){
            const getPos = $.findIndexOfObj(filterItem,(item:travelDataType) => item.Name === currentSelectItem.Name)

            getPos !== -1 ? filterItem.remove(getPos).appendFirst(currentSelectItem) : filterItem.appendFirst(currentSelectItem)
        }

        toggleDarkMode()

        renderData(filterItem)
    } else {
        isSearch = false   
    }
    
}

const toggleDarkMode:(event?:MouseEvent) => void = event => {
    if(event?.target){
        isDarkModeOpen = !$.includes(($('.dark-mode').attr('class') as string).split(' '),'active')
        $('.dark-mode')[isDarkModeOpen ? 'addClass' : 'removeClass']('active')
    }

    if(isDarkModeOpen){
        $.each($('.leaflet-tile') as unknown as any[],(item:HTMLImageElement) => $(item).addClass('active'))
    } else {
        $.each($('.leaflet-tile') as unknown as any[],(item:HTMLImageElement) => $(item).removeClass('active'))
    }
}

$(document).useMounted(() => {
    travelData = (data as any).data as travelDataType[]

    $('.search-btn').listener('click',searchPos)
    $('[name="search-input"]').listener('keydown',searchPosWhenEnter)
    $('.dark-mode').listener('click',toggleDarkMode)

    map.on('click',removeSingleDataView);

    map.on('dragend',getAreasData)

    map.on('zoomend',getAreasData)

    map.on('moveend',() => toggleDarkMode())
})