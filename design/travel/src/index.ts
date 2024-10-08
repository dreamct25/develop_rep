import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import './styles.scss'
import pin from '../public/images/pin.png'
import './lib/Library'
import $, { Self } from './lib/Library'
import type { fetchDataType,travelDataType } from './types'

const urlQuerys = new URLSearchParams(new URL(window.location.href).search)
const provider = new OpenStreetMapProvider()
let travelData:travelDataType[] = []
let currentSelectItem:travelDataType | undefined
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

L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',{ attribution:'CopyRight &copy; 2022-10 Alex Chen' }).addTo(map)

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

            setTimeout(() => renderData(filterItem),3000)
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

const renderData:(objTemp?:travelDataType | travelDataType[]) => void = objTemp => {
    
    if(objTemp){

        if($.typeOf(objTemp,'Object')) {
            const obj = objTemp as travelDataType

            $('.single-list').html(`
                <div class="list-item">
                    <div class="top">
                        ${obj.Picture1 ? `<div class="img" style="background-image:url('${obj.Picture1}');"></div>` : '<div class="no-img">No Image</div>'}
                        <div class="img-desc ${obj.Name ? '' : 'hide'}">${obj.Name}</div>
                    </div>
                    <div class="middle-outer">
                        <div class="middle">
                            <div>景點說明</div>
                            <div>${obj.Toldescribe || '暫無資訊'}</div>
                            <div>交通資訊</div>
                            <div>${obj.Travellinginfo || '暫無資訊'}</div>
                        </div>
                    </div>
                </div>
            `)

            currentSelectItem = obj

            map.flyTo([obj.Py,obj.Px],isZoom ? map.getZoom() : 15)
            popup.setLatLng({ lat: obj.Py,lng:obj.Px }).setContent(obj.Name).openOn(map)
            

            $('.right-side').addClass('active')

            isZoom = true

            return
        }

        const filterItem = objTemp as travelDataType[]

        layerGroup.clearLayers()

        $('.search-list').html(
            filterItem.length > 0 ?
                $.maps(filterItem,item => {
                    L.marker([item.Py,item.Px],{ icon: L.icon({ iconUrl: pin, iconSize: [20,20] }) }).addTo(layerGroup).bindPopup(item.Name).on('click',renderData.bind(this,item))

                    return `
                        <div class="list-item ${currentSelectItem && currentSelectItem.Name === item.Name ? 'active' : ''}" onclick="dinamicSingleData('${item.Name}')">
                            <div>${item.Name}</div>
                            <div><i class="fas fa-map-marker-alt color="#FF0000""></i>${item.Add ? item.Add.replace(item.Zipcode,'').split('').appendFirst(` ${item.Zipcode} `).join('') : ' 暫無資訊'}</div>
                            <div><i class="fas fa-mobile-alt" color="#00BBFF"></i>${item.Tel || '暫無資訊'}</div>
                            <div><i class="fas fa-clock" color="#FF1493"></i>${item.Opentime || '暫無資訊'}</div>
                            <div><i class="fas fa-tag color="#F5D005""></i>${item.Ticketinfo || '暫無資訊'}</div>
                        </div>
                    `
                }).join('') :
            '<div class="no-data">無周圍景點資料</div>'
        )

        const getSelectPos = $.findIndexOfObj(filterItem,item => item?.Name === currentSelectItem?.Name)

        $('.search-list').scrollToTop({ scrollTop: 0, duration: 0 })

        if(currentSelectItem){
            if(getSelectPos !== -1){
                const dom = (($('.search-list .list-item') as unknown as Record<string,Self>)[getSelectPos])

                if(dom){
                    const currentSelectListTop = dom.getBoundingClientRect()
                    const currentSelectListScrollPos = ($('.search-list').scrollTop + currentSelectListTop.top) - (window.innerWidth <= 414 ? 520 : 300)
                    $('.search-list').scrollToTop({ scrollTop: currentSelectListScrollPos, duration: 0 })
                }
            } else {
                currentSelectItem = undefined
            }
        }

        if(window.innerWidth <= 414) return

        if(!$('.right-side').className.includes('active')){
            $('.search-list-outer-frame').addClass('active')
        }
    } else {
        $('.search-list').html('<div class="no-data">無周圍景點資料</div>')
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

        const filterItem = $.filter(travelData,item => northEastLat > item.Py && southWestLat < item.Py && northEastLng > item.Px && southWestLng < item.Px)

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
        $.each($('.leaflet-tile') as unknown as HTMLImageElement[],item => $(item).addClass('active'))
    } else {
        $.each($('.leaflet-tile') as unknown as HTMLImageElement[],item => $(item).removeClass('active'))
    }
}

$(document).useMounted(async () => {
    $('.loading-outer').addClass('active')

    const result = await $.fetch.get<fetchDataType>('https://proxy-service-three.vercel.app/test/travels',{
        queryParams:{ qc:urlQuerys.get('qc') || 1000 }
    })

    $('.loading-outer').removeClass('active')

    travelData = result.data.XML_Head.Infos.Info

    $('.search-btn').listener('click',searchPos)
    $('[name="search-input"]').listener('keydown',searchPosWhenEnter)
    $('.dark-mode').listener('click',toggleDarkMode)
    $('.single-list-outer .close-btn').listener('click',() => $('.right-side').removeClass('active'))
    $('.close-search-list-btn').listener('click',() => $('.search-list-outer-frame').removeClass('active'))
    $('.visit-list-btn').listener('click',() => $('.search-list-outer-frame').addClass('active'))

    map.on('click',removeSingleDataView);

    map.on('dragend',getAreasData)

    map.on('zoomend',getAreasData)

    map.on('moveend',() => toggleDarkMode())

    popup.on('remove',() => {
        currentSelectItem = undefined
        $('.right-side').removeClass('active')
    })

    renderData()
})