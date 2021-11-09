import { Collection } from "immutable"
import { FunctionComponent, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router"
import { StyledComponent } from "styled-components"
import { actionCreatorType } from './types'
import componentEntries from '../RenderCenter'

const {
    styles: { Show },
    actionCreator
}: {
    styles: { Show: StyledComponent<"div", any, {}, never> },
    actionCreator: actionCreatorType
} = componentEntries

interface RenderCenterProps {

}

interface objType {
    singleData: any,
    changeBackPostSwitch: any,
}

const RenderCenter: FunctionComponent<RenderCenterProps> = (): JSX.Element => {
    const router = useHistory()
    const { state: { postData, postId,postHotItemType } }: { state: { [key: string]: any } } = useLocation()
    const { singleData, changeBackPostSwitch }: objType = useSelector((state: Collection<unknown, unknown>): objType => {
        const { renderCenter }: { [key: string]: any } = state.toJS()
        return {
            singleData: renderCenter.singleData,
            changeBackPostSwitch: state.getIn(['renderCenter', 'changeBackPostSwitch'])
        }
    })
    const dispatch = useDispatch()
    const renderCenterBannerRef = useRef<HTMLDivElement>(null)

    const filterSingleItem = () => {
        let filterItem = postData.filter(({ id }: { id: number }) => id === postId)
        dispatch(actionCreator.getSingleItems(filterItem))
    }

    const goSinglePreviewVideo: Function = (id: number) => {
        router.push({
            pathname: '/single_preview',
            search: `id=${id}&type=${postHotItemType}`
        })
    }

    const renderTextSwitch:Function = (val:string):string | undefined => {
        switch(val){
            case 'movie':
                return 'title'
            case 'tv':
                return 'name'
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (singleData.length === 0) return
            renderCenterBannerRef.current?.style.setProperty('background-image', `url('https://image.tmdb.org/t/p/original${singleData[0].backdrop_path}')`)
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