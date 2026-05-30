import { useState, useContext, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Carousel } from '@/component'
import { NewContext } from '@/App'
import { StyledLayout, type SingleSoftwareDataType } from '.'

const SingleSoftwareInfoModal:FC<{
    toggleSingleSoftwareModalStatus: boolean
    setToggleSingleSoftwareModalStatus: () => void
    singleData: SingleSoftwareDataType | undefined
}> = (props): TSX => {

    const { $ } = useContext(NewContext)

    const [{
        supportToggle,
        updateToggle,
        carouselImgPaths,
        renderSupportedDevicesRepack
    }, setInitState] = useState<{
        supportToggle: boolean,
        updateToggle: boolean,
        carouselImgPaths: string[],
        renderSupportedDevicesRepack: { deviceName: string, device: string[] }[]
    }>({
        supportToggle: false,
        updateToggle: false,
        carouselImgPaths: [],
        renderSupportedDevicesRepack: []
    })

    useEffect(() => {

        if(!props.toggleSingleSoftwareModalStatus) {
            
            setInitState(prevState => ({
                ...prevState,
                supportToggle: false,
                updateToggle: false,
                carouselImgPaths: [],
                renderSupportedDevicesRepack: []
            }))
        }

    }, [props.toggleSingleSoftwareModalStatus])

        useEffect(() => {

        if(props.singleData) {

            const supportedDevicesCatagoryDict = [
                'iPadAir',
                'iPadMini',
                'iPadPro',
                'iPod',
                'iPhone',
                'iPad',
            ]

            const supportedDevicesCatagorySort = [
                'iPhone',
                'iPad',
                'iPad Air',
                'iPad Mini',
                'iPad Pro',
                'iPod',
            ]

            let renderSupportedDevicesRepackTemp: { deviceName: string, device: string[] }[] = []

            if(props.singleData.supportedDevices.length > 0) {

                const supportedDevicesFilters = $.sum(props.singleData.supportedDevices, (obj, row) => {

                    const key = supportedDevicesCatagoryDict.find(dictStr => row.startsWith(dictStr)) || 'other';

                    if(!obj[key]) obj[key] = []

                    const [prevItem, ] = row.split('-')

                    obj[key].push(prevItem.replace('Cellular', '-With WIFI'));

                    return obj;

                }, {} as Record<string, string[]>);

                renderSupportedDevicesRepackTemp = $.maps(supportedDevicesCatagorySort, sortKey => ({
                    deviceName: sortKey,
                    device: supportedDevicesFilters[sortKey.replace(' ', '')]
                }))
            }
            
            setInitState(prevState => ({
                ...prevState,
                carouselImgPaths: props.singleData![
                    props.singleData!.ipadScreenshotUrls.length === 0 || window.innerWidth < 768 ? 
                    "screenshotUrls": "ipadScreenshotUrls"
                ],
                renderSupportedDevicesRepack: renderSupportedDevicesRepackTemp
            }))
        }

    }, [props.singleData])

    return (
        <StyledLayout 
            className={
                props.toggleSingleSoftwareModalStatus ? 
                    'single-software-info-modal-outer-frame toggle' : 
                    'single-software-info-modal-outer-frame'
            }
            onClick={({ target }) => {
                const element = target as HTMLDivElement
                const elementClassList = $.createArray({ type: 'new', item: element.classList })
                
                if(
                    elementClassList.includes('single-software-info-modal-outer-frame')
                ) props.setToggleSingleSoftwareModalStatus()
            }}
        >
            <div className="single-software-info-modal-outer">
                {props.singleData ? 
                    (
                        <div className="single-app-item">
                            <div className="single-app-item-title">
                                <div className="item-title">
                                    <div>{props.singleData.trackName}</div>
                                    <div>{props.singleData.sellerName}</div>
                                </div>
                                <div className="img-outer">
                                    <img src={props.singleData.artworkUrl100} alt=""/>
                                    <div className="bottom-groups">
                                        <div className="rating">{props.singleData.trackContentRating}</div>
                                        <div className="price">{props.singleData.formattedPrice}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="singel-app-item-content">
                                <div className="carousel-outer">
                                    <Carousel isLoop>
                                        {
                                            carouselImgPaths.length > 0 ?
                                                $.maps(carouselImgPaths, (urls, index) => (
                                                    <div className="embla__slide" key={index}>
                                                        <div className="img-outer">
                                                            <img src={urls} alt=""/>
                                                        </div>
                                                    </div>
                                                )) : [
                                                    <div className="embla__slide" key={+new Date()}>
                                                        <div className="img-outer no-image">無圖片</div>
                                                    </div>
                                                ]
                                        }
                                    </Carousel>
                                </div>
                                <div className="single-app-item-explain">
                                    <div className="explain-groups">
                                        <div>用戶評分數：{props.singleData.averageUserRatingForCurrentVersion.toFixed(1)}</div>
                                        <div>分類：{props.singleData.genres.length === 0 ? '無' : props.singleData.genres.join(" , ")}</div>
                                    </div>
                                    <div className="descript-outer">
                                        <div className="descript-title">
                                            <span>App 內容說明</span>
                                        </div>
                                        <div className="descript-text-outer">
                                            <div className="descript-text">
                                                <span>{props.singleData.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="update-outer" onClick={setInitState.bind(undefined, prevState => ({ ...prevState, updateToggle: !updateToggle }))}>
                                        <div className="update-title">
                                            <span>更新內容</span>
                                            <ChevronDown className={updateToggle ? "arrow arrow-toggle" : "arrow"} />
                                        </div>
                                        <div 
                                            className="update-text-outer"
                                            ref={element => {

                                                if(!element) return

                                                if(updateToggle) {
                                                    
                                                    element.style.cssText = `height: ${element.scrollHeight}px;`

                                                    return
                                                }

                                                element.style.cssText = ''
                                            }}
                                        >
                                            <div className="update-text">
                                                <span>Ver {props.singleData.version}</span>
                                                <span>{props.singleData.releaseNotes}</span>
                                                <span>{props.singleData.currentVersionReleaseDate.split("T")[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="support-outer">
                                        <div className="support-text-title" onClick={setInitState.bind(undefined, prevState => ({ ...prevState, supportToggle: !supportToggle }))}>
                                            <span>支援機型</span>
                                            <ChevronDown className={supportToggle ? "arrow arrow-toggle" : "arrow"} />
                                        </div>
                                        <div 
                                            className="support-text-outer"
                                            ref={element => {

                                                if(!element) return

                                                if(supportToggle && renderSupportedDevicesRepack.length > 0) {

                                                    element.style.cssText = `height: ${element.scrollHeight}px;`

                                                    return
                                                }

                                                element.style.cssText = ''
                                            }}
                                        >
                                            {
                                                renderSupportedDevicesRepack.length > 0 && $.maps(
                                                    renderSupportedDevicesRepack, 
                                                    (row, index) => (
                                                        <div className='support-device-row' key={index}>
                                                            <div className='device-name'>{row.deviceName}</div>
                                                            <div className='devices'>{row.device.join(' , ')}</div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='load-text'>讀取資料中</div>
                    )
                }
            </div>
        </StyledLayout>
    )
}

export default SingleSoftwareInfoModal