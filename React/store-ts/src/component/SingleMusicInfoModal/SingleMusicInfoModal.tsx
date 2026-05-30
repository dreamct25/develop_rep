import { 
    useState, 
    useContext, 
    useRef, 
    useImperativeHandle, 
    useEffect,
    forwardRef,
    type SyntheticEvent 
} from 'react'
import { Pause, Play } from 'lucide-react'
import { NewContext } from '@/App'
import { StyledLayout, type SingleMusicDataType } from '.'

const SingleMusicInfoModal = forwardRef<{
    timeFormat(timeVal: number): string
}, {
    toggleSingleMusicModalStatus: boolean,
    setToggleSingleMusicModalStatus: () => void,
    singleData: SingleMusicDataType | undefined
}>((props, ref) => {

    const { $ } = useContext(NewContext)

    const [{
        isPlayed,
        rangeVal,
        rangeMaxVal,
        trackDurationVal,
        progressBackGroudVal
    }, setInitState] = useState<{
        isPlayed: boolean,
        rangeVal: number,
        rangeMaxVal: string,
        trackDurationVal: string,
        progressBackGroudVal: number
    }>({
        isPlayed: false,
        rangeVal: 0,
        rangeMaxVal: '',
        trackDurationVal: '',
        progressBackGroudVal: 0
    })

    const audiosRef = useRef<HTMLAudioElement>(null)
    const audioInputRef = useRef<HTMLInputElement>(null)
    const timer = useRef<NodeJS.Timeout>(undefined)

    const timeFormat = (timeVal: number): string => {
        if (isNaN(timeVal) || timeVal < 0) timeVal = 0;

        const min = Math.floor(timeVal / 60 / 1000);
        const sec = Math.floor(timeVal % 60);

        const minOutput = String(min).padStart(2, '0');
        const secOutput = String(sec).padStart(2, '0');

        return `${minOutput} : ${secOutput}`;
    };

    const setAuido:() => void = () => {

        setInitState(prevState => ({
            ...prevState,
            rangeMaxVal: Math.floor(audiosRef.current!.duration).toFixed(),
            trackDurationVal: timeFormat(audiosRef.current!.duration),
            rangeVal: 0
        }))
    }

    const rangeValChange: (event: SyntheticEvent<HTMLInputElement>) => void = (event) => {
        
        if(!audiosRef.current) return

        const val = parseInt((event.target as HTMLInputElement).value)
        
        audiosRef.current.currentTime = val

        setInitState(prevState => ({
            ...prevState,
            rangeVal: val,
            progressBackGroudVal: (val / Math.floor(audiosRef.current!.duration)) * 100
        }))

    }

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

        if(!props.toggleSingleMusicModalStatus) {

            if(timer.current) clearInterval(timer.current)

            audiosRef.current = null
            audioInputRef.current = null
            timer.current = undefined
            
            setInitState(prevState => ({
                ...prevState,
                isPlayed: false,
                rangeVal: 0,
                rangeMaxVal: '',
                trackDurationVal: '',
                progressBackGroudVal: 0
            }))
        }

    }, [props.toggleSingleMusicModalStatus])

    useImperativeHandle(ref, () => ({
        timeFormat
    }))

    return (
        <StyledLayout
            className={
                props.toggleSingleMusicModalStatus ? 
                    'single-music-info-modal-outer-frame toggle' : 
                    'single-music-info-modal-outer-frame'
            }
            onClick={({ target }) => {
                const element = target as HTMLDivElement
                const elementClassList = $.createArray({ type: 'new', item: element.classList })
                
                if(
                    elementClassList.includes('single-music-info-modal-outer-frame')
                ) props.setToggleSingleMusicModalStatus()
            }} 
            playDurationProgress={progressBackGroudVal}
        >
            <div className="single-music-info-modal-outer">
                {
                    props.singleData ? 
                        (
                            <div className="single-outer" key={props.singleData.trackId}>
                                <div className="top">
                                    <div className="img-outer">
                                        <img src={props.singleData.artworkUrl100.replace(/100x100/g,"300x300")} alt=""/>
                                    </div>
                                    <div className="right-detailse-outer">
                                        <div className="right-detailse">
                                            <div>專輯：{props.singleData.collectionName}</div>
                                            <div>發行時間：{props.singleData.releaseDate.split("T")[0]}</div>
                                            <div>曲風：{props.singleData.primaryGenreName}</div>
                                            <div>{props.singleData.artistName}-{props.singleData.trackName}</div>
                                        </div>
                                    </div>
                                    <div className="try-text">僅限試聽</div>
                                </div>
                                <div className="bottom">
                                    <div className="audio-outer">
                                        <audio src={props.singleData.previewUrl} ref={audiosRef} onLoadedMetadata={setAuido} />
                                        <div className="custom-progress">
                                            <input 
                                                ref={audioInputRef} 
                                                type="range" 
                                                value={rangeVal} 
                                                max={rangeMaxVal} 
                                                onClick={rangeValChange}  
                                                onChange={rangeValChange}
                                            />
                                            <div className="duration-time">{trackDurationVal}</div>
                                        </div>
                                        <div className="play" onClick={setInitState.bind(undefined, prevState => ({ ...prevState, isPlayed: !isPlayed }))}>
                                            {isPlayed ? <Pause /> : <Play />}
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
})

export default SingleMusicInfoModal