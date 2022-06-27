import { FunctionComponent, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { actionCreatorType,objType,reducerState,RenderCenterProps,cssSetPropertys } from './types'
import componentEntries from '../RenderCenter'

const {
    styles: { Show },
    actionCreator
}: {
    styles: cssSetPropertys,
    actionCreator: actionCreatorType
} = componentEntries

const RenderCenter: FunctionComponent<RenderCenterProps> = ({ postData,postId,postHotItemType }:RenderCenterProps): JSX.Element => {
    
    const router = useHistory()

    const { singleData, changeBackPostSwitch,currentPostType }: objType = useSelector((state: reducerState): objType => ({
        singleData: state.getIn(['renderCenter', 'singleData']) as {[key:string]:any}[],
        changeBackPostSwitch: state.getIn(['renderCenter', 'changeBackPostSwitch']) as boolean,
        currentPostType: state.getIn(['renderCenter', 'currentPostType']).toJS() as {[key:string]:any}
    }))

    const dispatch = useDispatch()
    
    const renderCenterBannerRef = useRef<HTMLDivElement>(null)

    const filterSingleItem:() => void = () => dispatch(actionCreator.getSingleItems(postData.filter(({ id }: { id: number }) => id === postId)))

    const goSinglePreviewVideo:(id: number) => void = id => router.push({ pathname: '/single_preview',search: `id=${id}&type=${postHotItemType}` })

    const renderTextSwitch:(val:string) => string = val => currentPostType[val]

    useEffect(() => {
        setTimeout(() => {
            if (singleData.constructor.name !== 'Array') return
            const [{ backdrop_path }] : {[key:string]:any}[] = singleData
            renderCenterBannerRef.current?.style.setProperty('background-image', `url('https://image.tmdb.org/t/p/original${backdrop_path}')`)
        }, 300)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeBackPostSwitch])

    useEffect(() => {
        filterSingleItem()
        dispatch(actionCreator.changeBackPostSwitch(true))
        setTimeout(() => dispatch(actionCreator.changeBackPostSwitch(false)), 700)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

    return (
         <Show>
            {singleData.length !== 0 && singleData.map((item: { [key: string]: any }, index: number) => (
                <div className="render-center-outer" key={index}>
                    <div ref={renderCenterBannerRef} className={changeBackPostSwitch ? 'render-center-banner render-center-banner-toggle' : 'render-center-banner'}>
                        {!changeBackPostSwitch && <div className="render-center-banner-body">
                            <div className="title">
                                <span className="preview-title">{item[renderTextSwitch(postHotItemType)]}</span>
                                <span className="preview-video" onClick={goSinglePreviewVideo.bind(this, item.id)}>預告片<i className="far fa-play-circle play-icon"></i></span>
                            </div>
                            <span>{item.overview === "" ? '無解說。' : item.overview}</span>
                        </div>}
                    </div>
                </div>

            ))}
        </Show>
    )
}

export default RenderCenter