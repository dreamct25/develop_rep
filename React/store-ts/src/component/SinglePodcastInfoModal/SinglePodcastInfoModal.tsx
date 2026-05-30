import { 
    useState, 
    useContext, 
    useRef, 
    useEffect, 
    type SyntheticEvent, 
    type UIEventHandler 
} from 'react'
import { Pause, Play } from 'lucide-react'
import { NewContext } from '@/App'
import { InfinitiScroll } from '@/component'
import { StyledLayout, type SinglePodcastDataType, type RenderSinglePodcastDataType } from '.'

const SingleMusicInfoModal:FC<{
    toggleSinglePodcastModalStatus: boolean,
    setToggleSinglePodcastModalStatus: () => void
    singleData: SinglePodcastDataType | undefined
}> = (props): TSX => {

    const { $ } = useContext(NewContext)

    const [{
        isPlayed,
        rangeVal,
        rangeMaxVal,
        trackDurationVal,
        progressBackGroudVal,
        renderSingleData,
        contentToggle,
        currentContentToggleId,
        // currentTargetId,
        showInputToggle,
        currentShowInputToggleId,
        imgUrl
    }, setInitState] = useState<{
        isPlayed: boolean,
        rangeVal: number,
        rangeMaxVal: string,
        trackDurationVal: string,
        progressBackGroudVal: number,
        renderSingleData: {
            item: RenderSinglePodcastDataType[]
        } & Record<string, any> | undefined,
        currentContentToggleId: string,
        currentShowInputToggleId: string
        contentToggle: boolean,
        // currentTargetId: string,
        showInputToggle: boolean,
        imgUrl: string
    }>({
        isPlayed: false,
        rangeVal: 0,
        rangeMaxVal: '',
        trackDurationVal: '',
        progressBackGroudVal: 0,
        renderSingleData: undefined,
        currentContentToggleId: '',
        currentShowInputToggleId: '',
        contentToggle: false,
        // currentTargetId: '',
        showInputToggle: false,
        imgUrl: ''
    })

    const [loadingResultText, setLoadingResultText] = useState('讀取資料中')

    const audiosRef = useRef<HTMLAudioElement>(null)
    const listOuterRef = useRef<HTMLDivElement>(null)
    const listImgRef = useRef<HTMLImageElement>(null)
    const audioInputRef = useRef<HTMLInputElement>(null)
    const timer = useRef<NodeJS.Timeout>(undefined)

    const timeFormat = (timeVal: number): string => {
        
        timeVal = Number(timeVal)

        if (!Number.isFinite(timeVal)) timeVal = 0

        const hours = Math.floor(timeVal / 3600)
        const minutes = Math.floor((timeVal % 3600) / 60)
        const seconds = Math.floor(timeVal % 60)

        const pad:(val: number) => string = val => String(val).padStart(2, '0')

        if (hours <= 0) return `${pad(minutes)} : ${pad(seconds)}`

        return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`
    };

    const setAuido:() => void = () => {

        if(!audiosRef.current) return

        setInitState(prevState => ({
            ...prevState,
            rangeMaxVal: Math.floor(audiosRef.current!.duration).toFixed(),
            trackDurationVal: timeFormat(audiosRef.current!.duration),
            progressBackGroudVal: 0,
            rangeVal: 0
        }))
    }

    const rangeValChange: (event: SyntheticEvent<HTMLInputElement>) => void = event => {
        
        if(!audiosRef.current) return

        const val = parseInt((event.target as HTMLInputElement).value)
        
        audiosRef.current.currentTime = val

        setInitState(prevState => ({
            ...prevState,
            rangeVal: val,
            progressBackGroudVal: (val / Math.floor(audiosRef.current!.duration)) * 100
        }))

    }

    const scrollList: UIEventHandler<HTMLDivElement> = () => {

        if(!listOuterRef.current || !listImgRef.current) return

        const val = 100 - (listOuterRef.current.scrollTop / 10)

        let forScale = 0
        let forOpacity = 0

        if(val <= 0){
            forOpacity = 0
            forScale = 0
            return
        }
        
        if(listOuterRef.current.scrollTop === 0){
            forOpacity = 1
            forScale = 1
            return
        }

        forOpacity = (val / 100) - 0.2
        forScale = val / 100

        listImgRef.current.style.cssText = `
            opacity: ${forOpacity};
            transform: scale(${forScale});
        `
    }
    
    const transXML: (xmlsUrl: string) => Promise<void> = async xmlsUrl => {

        try {

            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/test/store/pt_convert?c=${btoa(encodeURIComponent(xmlsUrl))}`)
            
            const result = await res.json() as { 
                data: { 
                    image: { url?: string, href?: string }[] | { href: string }, 
                    item: RenderSinglePodcastDataType[] 
                }
            }

            if(res.status >= 200 && res.status <= 399) {

                if(result.data){

                    let singleImageUrl = ''

                    if(Array.isArray(result.data.image)) {

                        const [singleImageItem, ] = result.data.image
                        singleImageUrl = (singleImageItem?.url || singleImageItem?.href) || ''

                    } else {
                        singleImageUrl = result.data.image.href
                    }

                    result.data.item = $.maps(result.data.item, row => ({
                        ...row,
                        guid: (row.guid as Record<string, any>)?.['#text'] || row.guid
                    }))

                    setInitState(prevState => ({
                        ...prevState,
                        renderSingleData: result.data,
                        imgUrl: singleImageUrl
                    }))
                    
                } else {
                    throw new Error()
                }

                return
            }

            throw new Error()

        } catch (err: any) {

            setLoadingResultText('資料讀取錯誤')

        }
    }
    
    const changeContentToggleState:(id: string) => void = id => {
        
        setInitState(prevState => ({
            ...prevState,
            // currentTargetId: prevState.showInputToggle ? prevState.currentTargetId : id,
            contentToggle: prevState.currentContentToggleId === id ? !contentToggle : true,
            currentContentToggleId: id,
        }))
    }

    const changeState:(id: string) => void = id => {

        // if(showInputToggle) {

            if(audiosRef.current && audioInputRef.current) {

                audiosRef.current?.pause()
                audiosRef.current = null
                audioInputRef.current = null
            }
        // }

        setInitState(prevState => ({
            ...prevState,
            // currentTargetId: id,
            currentShowInputToggleId: id,
            showInputToggle: prevState.currentShowInputToggleId === id ? !showInputToggle : true,
            trackDurationVal: ''
        }))
    }

    useEffect(() => {

        setInitState(prevState => ({
            ...prevState,
            isPlayed: false
        }))

    }, [currentShowInputToggleId])

    useEffect(() => {

        if(!audiosRef.current) return

        clearInterval(timer.current)

        audiosRef.current[isPlayed ? 'play' : 'pause']()

        if(!isPlayed) return

        timer.current = setInterval(()=>{

            if(parseInt(audiosRef.current!.currentTime.toFixed(0)) === parseInt(rangeMaxVal)){
            
                clearInterval(timer.current)
            
                audiosRef.current!.currentTime = 0

                setInitState(prevState => ({
                    ...prevState,
                    rangeVal: 0,
                    trackDurationVal: timeFormat(audiosRef.current!.duration),
                    isPlayed: false,
                    progressBackGroudVal: 0
                }))

                return
            }

            const val = parseInt(audiosRef.current!.currentTime.toFixed(0))

            setInitState(prevState => ({
                ...prevState,
                rangeVal: val,
                trackDurationVal: timeFormat(audiosRef.current!.duration - audiosRef.current!.currentTime),
                progressBackGroudVal: (val / Math.floor(audiosRef.current!.duration)) * 100
            }))

        }, 1000)

    }, [isPlayed])

    useEffect(() => {

        if(props.singleData) transXML(props.singleData.feedUrl)

    }, [props.singleData])

        useEffect(() => {

        if(!props.toggleSinglePodcastModalStatus) {

            if(timer.current) clearInterval(timer.current)

            audiosRef.current = null
            listOuterRef.current = null           
            listImgRef.current = null
            audioInputRef.current = null
            timer.current = undefined
            
            setInitState(prevState => ({
                ...prevState,
                isPlayed: false,
                rangeVal: 0,
                rangeMaxVal: '',
                trackDurationVal: '',
                progressBackGroudVal: 0,
                renderSingleData: undefined,
                contentToggle: false,
                currentTargetId: '',
                showInputToggle: false,
                imgUrl: ''
            }))
        }

    }, [props.toggleSinglePodcastModalStatus])

    return (
        <StyledLayout 
            className={
                props.toggleSinglePodcastModalStatus ? 
                    'single-podcast-info-modal-outer-frame toggle' : 
                    'single-podcast-info-modal-outer-frame'
            } 
            playDurationProgress={progressBackGroudVal}
            onClick={({ target }) => {
                const element = target as HTMLDivElement
                const elementClassList = $.createArray({ type: 'new', item: element.classList })
                
                if(
                    elementClassList.includes('single-podcast-info-modal-outer-frame')
                ) props.setToggleSinglePodcastModalStatus()
            }}
        >
            <div className="single-podcast-info-modal-outer">
                {renderSingleData ? 
                    (
                        <div className="podcast-list-outer" ref={listOuterRef} onScroll={scrollList}>
                            <div className="imgs-outer">
                                <img ref={listImgRef} src={imgUrl} alt="" />
                            </div>
                            {
                                renderSingleData.item.length > 0 && (
                                    <InfinitiScroll
                                        mountedElement={listOuterRef.current!}
                                        list={renderSingleData.item}
                                        pageSize={5}
                                        isFloatLoadingText={false}
                                        renderList={list => 

                                            $.maps(list, (item, index) => (
                                                <div className="podcast-list-item" key={index}>
                                                    <div className="list-header">{item.title}</div>
                                                    <div className="list-content">
                                                        <div 
                                                            className={contentToggle && (currentContentToggleId === item.guid) ? "details details-toggle" : "details"} 
                                                            dangerouslySetInnerHTML={{ __html: item.encoded }}
                                                        ></div>
                                                        <div className="content-bottom">
                                                            <div className="list-date">
                                                                {$.formatDateTime({ formatDate: item.pubDate.replace(' GMT', ''), formatType: 'yyyy-MM-dd' })}
                                                            </div>
                                                            <div className="btns-group">
                                                                <div className="content-toggle-btn" onClick={changeContentToggleState.bind(undefined, item.guid as string)}>
                                                                    {contentToggle && (currentContentToggleId === item.guid) ? "收合內容" : "展開內容"}
                                                                </div>
                                                                {item.enclosure && (
                                                                    <div 
                                                                        className="show-input" 
                                                                        onClick={changeState.bind(undefined, item.guid as string)}
                                                                    >
                                                                        線上收聽
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={showInputToggle && currentShowInputToggleId === item.guid ? "audio-outer audio-outer-toggle" : "audio-outer"}>
                                                        {item.enclosure && (
                                                            <audio 
                                                                ref={element => {
                                                                    if(showInputToggle && currentShowInputToggleId === item.guid) audiosRef.current = element
                                                                }}
                                                                src={showInputToggle && currentShowInputToggleId === item.guid ? item.enclosure.url : undefined}
                                                                onLoadedMetadata={() => {
                                                                    if(showInputToggle && currentShowInputToggleId === item.guid) setAuido()
                                                                }}
                                                            />
                                                        )}
                                                        {item.enclosure && (
                                                            <div className="custom-progress-outer">
                                                                <div className="custom-progress">
                                                                    <div className={(showInputToggle && currentShowInputToggleId === item.guid) && trackDurationVal !== '' ? "progress-mask hidden" : "progress-mask"}>{currentShowInputToggleId === item.guid ? 'loading' : ''}</div>
                                                                    <div className="progress">
                                                                        <input 
                                                                            ref={element => {
                                                                                if(showInputToggle && currentShowInputToggleId === item.guid) audioInputRef.current = element
                                                                            }}
                                                                            className="ranges" 
                                                                            type="range"
                                                                            value={rangeVal} 
                                                                            max={rangeMaxVal}
                                                                            onClick={rangeValChange}  
                                                                            onChange={rangeValChange} 
                                                                        />
                                                                        <span className="duration-time">{trackDurationVal}</span>
                                                                    </div>
                                                                </div>
                                                                <div 
                                                                    className="play" 
                                                                    onClick={() => {

                                                                        if((showInputToggle && currentShowInputToggleId === item.guid) && trackDurationVal !== '') {

                                                                            setInitState(prevState => ({ ...prevState, isPlayed: !isPlayed }))
                                                                        }
                                                                    }}
                                                                >
                                                                    {isPlayed && currentShowInputToggleId === item.guid ? <Pause /> : <Play />}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                )
                                            )
                                        }
                                    />
                                )
                            }
                        </div>
                    ) : (
                        <div className='load-text'>{loadingResultText}</div>
                    )
                }
            </div>
        </StyledLayout>
    )
}

export default SingleMusicInfoModal