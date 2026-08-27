import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import '@/styles.scss'
import $ from './lib/Library'
import type { fetchDataType,travelDataType } from '@/types'

const urlQuerys = new URLSearchParams(new URL(window.location.href).search)
const provider = new OpenStreetMapProvider()
let travelData: travelDataType[] = []
let currentSelectItem:travelDataType | undefined
let isZoom: boolean = false
let isSearch: boolean = false
let isDarkModeOpen: boolean = false
let pin: L.Marker | undefined = undefined

const map = L.map('map',{
  center: [23.565745352647966, 121.01552734375001],
  zoom: 8,
  zoomControl: false
})

const serviceDayMapping = {
    Monday: "週一",
    Tuesday: "週二",
    Wednesday: "週三",
    Thursday: "週四",
    Friday: "週五",
    Saturday: "週六",
    Sunday: "週日"
}

const popup = L.popup()

const layerGroup = L.layerGroup().addTo(map)

L.tileLayer(
    'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
    { 
        attribution:'CopyRight &copy; 2022-10 Alex Chen',
    }
).addTo(map)

const removeSingleDataView:() => void = () => {

    currentSelectItem = undefined

    $('.right-side').removeClass('active')
}

const searchPos:() => void = async () => {

    const value = $('[name="search-input"]').val()

    if(currentSelectItem) currentSelectItem = undefined
    
    if(value){

        isSearch = true

        const result = await provider.search({ query:value })

        if(result.length > 0){

            const { [0]: { x: lon, y: lat } } = result

            layerGroup.clearLayers()

            map.flyTo([lat, lon], isZoom ? map.getZoom() : 15)

            isZoom = true

            getAreasData()
        }

        return
    }

    isSearch = false

    getAreasData()
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

        if(!(objTemp instanceof Array)) {

            const {
                AttractionName,
                Description, 
                TrafficInfo,
                PositionLat,
                PositionLon,
                Images 
            } = objTemp as travelDataType
            
            const img = Images[0]

            $('.single-list').html(`
                <div class="list-item">
                    <div class="top">
                        ${
                            img ? 
                                `<div class="img" style="background-image:url('${img.URL}');"></div>` : 
                                '<div class="no-img">No Image</div>'
                        }
                        <div class="img-desc ${img ? '' : 'hide'}">${img.Name}</div>
                    </div>
                    <div class="middle-outer">
                        <div class="middle">
                            <div class="inside-top">
                                <div>景點說明</div>
                                <div>${Description || '暫無資訊'}</div>
                            </div>
                            <div class="inside-bottom">
                                <div>交通資訊</div>
                                <div>${TrafficInfo.replace(/。/g, '。\r\n') || '暫無資訊'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `)

            currentSelectItem = objTemp as travelDataType

            map.flyTo([PositionLat, PositionLon], isZoom ? map.getZoom() : 15)
            popup.setLatLng({ lat: PositionLat, lng:PositionLon }).setContent(AttractionName).openOn(map)

            $('.right-side').addClass('active')

            isZoom = true

            renderData(travelData)

            return
        }

        const filterItem = objTemp as travelDataType[]

        layerGroup.clearLayers()

        if(pin) {
            map.removeLayer(pin)
            pin = undefined
        }

        $('.search-list').html(
            filterItem.length > 0 ?
                $.maps(filterItem,item => {

                    const { PositionLat, PositionLon, AttractionName } = item

                    pin = L.marker(
                        [PositionLat, PositionLon],
                        { icon: L.icon({ iconUrl: './images/pin.png', iconSize: [20,20] }) }
                    )
                        .addTo(layerGroup)
                        .bindPopup(AttractionName)
                        .on('click', renderData.bind(this,item))

                    return `
                        <div 
                            class="list-item ${currentSelectItem && currentSelectItem.AttractionName === AttractionName ? 'active' : ''}" 
                            onclick="dinamicSingleData('${AttractionName}')"
                        >
                            <div class="title">${AttractionName}</div>
                            <div class="info-1">
                                <i class="fas fa-map-marker-alt"></i>${item.Add || ' 暫無資訊'}
                            </div>
                            <div class="info-2">
                                <i class="fas fa-mobile-alt"></i>${item?.Telephones ? item.Telephones[0].Tel : '暫無資訊'}
                            </div>
                            <div class="info-3">
                                ${item.ServiceTimeInfo.length > 0 ? 
                                    `
                                        <i class="fas fa-clock"></i>營運時間
                                        ${
                                            $.maps(
                                                $.filter(item.ServiceTimeInfo, filterRow => filterRow.EffectiveDate === null), 
                                                (info, index) => 
                                                `
                                                    <div class="day-row-outer">
                                                        ${index > 0 ? `<div class="day-row-desc"> - ${info.Name}</div>` : ''}
                                                        <div class="day-row">
                                                            ${
                                                                $.maps(info.ServiceDays, day => 
                                                                    `
                                                                        <div class="group-outer">
                                                                            <div>${(serviceDayMapping as Record<string, string>)[day]}</div>
                                                                            <div>
                                                                                ${String(info.StartTimeTransform.hour.time24h).padStart(2, '0')}:
                                                                                ${String(info.StartTimeTransform.minute).padStart(2, '0')} ~ 
                                                                                ${String(info.EndTimeTransform.hour.time24h).padStart(2, '0')}:
                                                                                ${String(info.EndTimeTransform.minute).padStart(2, '0')}
                                                                            </div>
                                                                        </div>
                                                                    `
                                                                ).join('')
                                                            }
                                                        </div>
                                                    </div>
                                                `
                                            ).join('')
                                        }
                                    `
                                    : '<i class="fas fa-clock"></i>暫無資訊'
                                }
                            </div>
                            <div class="info-4">
                                ${
                                    item.TicketInfo.length > 0 ? 
                                        `
                                            <i class="fas fa-tag"></i>${item.TicketInfo.length === 1 ? '票價免費' : '票價'}
                                            <div class="ticket-info-outer">
                                                ${
                                                    $.maps(item.TicketInfo, info => 
                                                        `${
                                                            info.Price > 0 ? 
                                                                `<div class="ticket-info">
                                                                    <div class="desc">${info.Name}</div>
                                                                    <div>${info.Price}</div>
                                                                </div>` : ''
                                                        }`
                                                    ).join('')
                                                }
                                            </div>
                                        ` : '<i class="fas fa-tag"></i>暫無資訊'
                                }
                            </div>
                        </div>
                    `
                }).join('') :
            '<div class="no-data">無周圍景點資料</div>'
        )

        const getSelectPos = $.findIndexOfObj(
            filterItem, 
            item => item.AttractionName === currentSelectItem?.AttractionName
        )

        $('.search-list').scrollToPos({ direction: 'top', scrollPos: 0, duration: 0 })

        if(currentSelectItem){

            if(getSelectPos !== -1){

                const dom = (($('.search-list .list-item') as unknown as HTMLDivElement[])[getSelectPos])

                if(dom){
                    const currentSelectListTop = dom.getBoundingClientRect()
                    
                    const currentSelectListScrollPos = 
                        ($('.search-list').scrollTop + currentSelectListTop.top) - 
                        (window.innerWidth <= 414 ? 520 : 300)
                    
                    $('.search-list').scrollToPos({ 
                        direction: 'top', 
                        scrollPos: currentSelectListScrollPos, 
                        duration: 0 
                    })
                }

            } else {

                currentSelectItem = undefined
            }
        }

        if(window.innerWidth <= 414) return

        if(!$('.right-side').classList.contains('active')){

            $('.search-list-outer-frame').addClass('active')
        }

        return
    }

    $('.search-list').html('<div class="no-data">無周圍景點資料</div>')
}

window.dinamicSingleData = name => {

    const [filterItem] = $.filter(travelData, ({ AttractionName }) => AttractionName === name)

    if(filterItem) renderData(filterItem)
}

const getAreasData:() => Promise<void> = async () => {

    if(currentSelectItem) return

    if(!isSearch){

        const { lat: northEastLat, lng: northEastLng } = map.getBounds().getNorthEast()
        const { lat: southWestLat, lng: southWestLng } = map.getBounds().getSouthWest()

        let northEastLatTemp = northEastLat
        let northEastLngTemp = northEastLng
        let southWestLatTemp = southWestLat
        let southWestLngTemp = southWestLng

        if(map.getZoom() > 9) {

            const center = map.getCenter();

            // 1. 取得地圖當前容器的像素尺寸（寬、高）
            const size = map.getSize();
            
            // 2. 計算在 9 倍縮放時，中心點的像素座標
            const centerPointAtZoom9 = map.project(center, 9);
            
            // 3. 根據當前外框大小，計算 9 倍時的西南角與東北角像素座標
            const southWestPoint = L.point(centerPointAtZoom9.x - size.x / 2, centerPointAtZoom9.y + size.y / 2);
            const northEastPoint = L.point(centerPointAtZoom9.x + size.x / 2, centerPointAtZoom9.y - size.y / 2);
            
            // 4. 將像素座標反推回 9 倍時的經緯度
            const southWestLatLng = map.unproject(southWestPoint, 9);
            const northEastLatLng = map.unproject(northEastPoint, 9);
            
            // 建立 9 倍大小的虛擬邊界
            const { lat: zoomNorthEastLat, lng: zoomNorthEastLng } = L.latLngBounds(southWestLatLng, northEastLatLng).getNorthEast();
            const { lat: zoomSouthWestLat, lng: zoomSouthWestLng } = L.latLngBounds(southWestLatLng, northEastLatLng).getSouthWest();

            northEastLatTemp = zoomNorthEastLat
            northEastLngTemp = zoomNorthEastLng
            southWestLatTemp = zoomSouthWestLat
            southWestLngTemp = zoomSouthWestLng
        }

        $('.loading-outer').addClass('active')

        const result = await $.fetch.get<fetchDataType>('https://proxy-service-three.vercel.app/test/travels',{
            queryParams:{ 
                n_lat: northEastLatTemp,
                n_lon: northEastLngTemp,
                s_lat: southWestLatTemp,
                s_lon: southWestLngTemp,
                ...urlQuerys.get('qc') ? { qc: urlQuerys.get('qc') } : {}
            }
        })

        $('.loading-outer').removeClass('active')

        if(result.data.message !== 'success') return

        const value = $('[name="search-input"]').val()

        const travelDataTemp = $.maps(result.data.data, row => ({
            ...row,
            Add: `${row?.PostalAddress?.ZipCode} ${row?.PostalAddress?.City}${row?.PostalAddress?.Town}${row?.PostalAddress?.StreetAddress}`
        }))

        travelData = value ? $.filter(travelDataTemp, row => 
            row.AttractionName.includes(value) ||
            row.Add.includes(value)
        ) : travelDataTemp

        toggleDarkMode()

        renderData(travelData)

        return
    }

    isSearch = false
}

const toggleDarkMode:(event?:MouseEvent) => void = event => {
    
    if(event?.target){

        const darkModeElement = $('.dark-mode')

        isDarkModeOpen = !darkModeElement.classList.contains('active')
        
        $('.dark-mode')[isDarkModeOpen ? 'addClass' : 'removeClass']('active')
    }

    const elements = document.querySelectorAll('.leaflet-tile') as unknown as HTMLImageElement[]

    if(isDarkModeOpen){

        $.each(elements, item => $(item).addClass('active'))

        return
    }

    if(elements[0]?.classList.contains('active')) {
        $.each(elements, item => $(item).removeClass('active'))
    }
}

$(document).useMounted(async () => {

    $('.search-btn').listener('click', searchPos)

    $('[name="search-input"]').listener('keydown', searchPosWhenEnter)

    $('.dark-mode').listener('click', toggleDarkMode)

    $('.single-list-outer .close-btn').listener('click', () => $('.right-side').removeClass('active'))
    
    $('.close-search-list-btn').listener('click', () => $('.search-list-outer-frame').removeClass('active'))
    
    $('.visit-list-btn').listener('click', () => $('.search-list-outer-frame').addClass('active'))

    map.on('click', removeSingleDataView);

    map.on('dragend', getAreasData)

    map.on('zoomend', getAreasData)

    map.on('moveend',() => {
        toggleDarkMode()
    })

    popup.on('remove',() => {

      currentSelectItem = undefined

      $('.right-side').removeClass('active')
    })
})