import { 
    useState, 
    useContext, 
    useRef, 
    useImperativeHandle, 
    useEffect, 
    forwardRef, 
    type SyntheticEvent 
} from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import { NewContext } from '@/App'
import { StyledLayout, type SingleMusicVideoDataType } from '.'

const SingleMusicVideoInfoModal = forwardRef<{
    timeFormat(timeVal: number): string
}, {
    toggleSingleMusicVideoModalStatus: boolean,
    setToggleSingleMusicVideoModalStatus: () => void,
    singleData: SingleMusicVideoDataType | undefined
}>((props, ref) => {

    const { $ } = useContext(NewContext)

    const [{
        isPlayed,
        rangeVal,
        rangeMaxVal,
        voiceVal,
        voiceValToggle,
        durationTime,
        textShowToggle,
        textShowContent,
        videoBarToggle,
        progressBackGroudVal,
        voiceProgressBackGroudVal
    }, setInitState] = useState<{
        isPlayed: boolean,
        rangeVal: number,
        rangeMaxVal: string,
        voiceVal: string,
        voiceValToggle: boolean,
        durationTime: string,
        textShowToggle: boolean,
        textShowContent: string,
        videoBarToggle: boolean,
        progressBackGroudVal: number,
        voiceProgressBackGroudVal: number
    }>({
        isPlayed: false,
        rangeVal: 0,
        rangeMaxVal: '',
        voiceVal: '50',
        voiceValToggle: false,
        durationTime: '',
        textShowToggle: false,
        textShowContent: "",
        videoBarToggle: false,
        progressBackGroudVal: 0,
        voiceProgressBackGroudVal: 0
    })

    const videoRef = useRef<HTMLVideoElement>(null)
    const videoInputRef = useRef<HTMLInputElement>(null)
    const timer = useRef<NodeJS.Timeout>(undefined)
    const showTextDebunceTimer = useRef<NodeJS.Timeout>(undefined)

    const timeFormat = (timeVal: number): string => {
        if (isNaN(timeVal) || timeVal < 0) timeVal = 0;

        const min = Math.floor(timeVal / 60 / 1000);
        const sec = Math.floor(timeVal % 60);

        const minOutput = String(min).padStart(2, '0');
        const secOutput = String(sec).padStart(2, '0');

        return `${minOutput} : ${secOutput}`;
    };

    const setVideo:() => void = () => {

        if(!videoRef.current) return

        videoRef.current.volume = parseInt(voiceVal) / 100

        setInitState(prevState => ({
            ...prevState,
            rangeMaxVal: Math.floor(videoRef.current!.duration).toFixed(),
            durationTime: timeFormat(videoRef.current!.duration),
            rangeVal: 0,
            voiceProgressBackGroudVal: parseInt(voiceVal)
        }))
    }

    const rangeValChange: (event: SyntheticEvent<HTMLInputElement>) => void = event => {
        
        if(!videoRef.current) return

        const val = parseInt((event.target as HTMLInputElement).value)
        
        videoRef.current.currentTime = val

        setInitState(prevState => ({
            ...prevState,
            rangeVal: val,
            progressBackGroudVal: (val / Math.floor(videoRef.current!.duration)) * 100
        }))

    }

    const voiceChange: (event: SyntheticEvent<HTMLInputElement>) => void = event => {

        setInitState(prevState => {

            if(!videoRef.current) return prevState

            const { value } = (event.target as HTMLInputElement)

            const voiceValTemp = parseInt(value) / 100

            videoRef.current.volume = voiceValTemp

            return {
                ...prevState,
                voiceVal: value,
                textShowToggle: true,
                textShowContent: `音量：${parseInt(value) === 0 ? '靜音' : `${value} %`}`,
                voiceProgressBackGroudVal: parseInt(value)
            }
        })

        clearTimeout(showTextDebunceTimer.current)

        showTextDebunceTimer.current = setTimeout(() => {

            setInitState(prevState => ({
                ...prevState,
                textShowToggle: false
            }))

        }, 1500)
    }

    useEffect(() => {

        if(!videoRef.current) return

        clearInterval(timer.current)

        videoRef.current![isPlayed ? 'play' : 'pause']()

        if(!isPlayed) return

        timer.current = setInterval(()=>{

            if(parseInt(videoRef.current!.currentTime.toFixed(0)) === parseInt(rangeMaxVal)){
            
                clearInterval(timer.current)
            
                videoRef.current!.currentTime = 0

                setInitState(prevState => ({
                    ...prevState,
                    rangeVal: 0,
                    durationTime: timeFormat(videoRef.current!.duration),
                    isPlayed: false,
                    progressBackGroudVal: 0
                }))

                return
            }

            const val = parseInt(videoRef.current!.currentTime.toFixed(0))

            setInitState(prevState => ({
                ...prevState,
                rangeVal: val,
                durationTime: timeFormat(videoRef.current!.duration - videoRef.current!.currentTime),
                progressBackGroudVal: (val / Math.floor(videoRef.current!.duration)) * 100
            }))

        },1000)

    }, [isPlayed])

    useEffect(() => {

        if(!props.toggleSingleMusicVideoModalStatus) {

            if(timer.current) clearInterval(timer.current)

            videoRef.current = null
            videoInputRef.current = null
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

    }, [props.toggleSingleMusicVideoModalStatus])

    useImperativeHandle(ref, () => ({
        timeFormat
    }))

    return (
        <StyledLayout
            className={
                props.toggleSingleMusicVideoModalStatus ? 
                    'single-music-video-info-modal-outer-frame toggle' : 
                    'single-music-video-info-modal-outer-frame'
            }
            onClick={({ target }) => {
                const element = target as HTMLDivElement
                const elementClassList = $.createArray({ type: 'new', item: element.classList })
                
                if(
                    elementClassList.includes('single-music-video-info-modal-outer-frame')
                ) props.setToggleSingleMusicVideoModalStatus()
            }}
            playDurationProgressVal={progressBackGroudVal}
            voiceProgressBackGroudVal={voiceProgressBackGroudVal}
        >
            <div className="single-music-video-info-modal-outer">
                {
                    props.singleData ? 
                        (
                            <div 
                                className="single-content" 
                                onMouseEnter={setInitState.bind(undefined, prevState => ({ ...prevState, videoBarToggle: true }))} 
                                onMouseLeave={setInitState.bind(undefined, prevState => ({ ...prevState, videoBarToggle: false }))}
                            >
                                {
                                    props.singleData?.previewUrl ? (
                                        <>
                                            <div 
                                                className={
                                                    !isPlayed || (isPlayed && videoBarToggle) ? 
                                                    "video-title-outer" : "video-title-outer video-title-outer-toggle"
                                                }
                                            >
                                                <span className="video-title">{props.singleData.artistName}-{props.singleData.trackName} ( Short Version )</span>
                                            </div>
                                            <div className={isPlayed ? "video-black-frame video-black-frame-toggle" : "video-black-frame"}></div>
                                            <div className={isPlayed ? "video-btn video-btn-toggle" : "video-btn"} >
                                                {isPlayed ? <Pause /> : <Play />}
                                            </div>
                                            <video 
                                                ref={videoRef} 
                                                src={props.singleData.previewUrl} 
                                                playsInline 
                                                onLoadedMetadata={setVideo}
                                                onClick={setInitState.bind(undefined, prevState => ({ ...prevState, isPlayed: !isPlayed }))} 
                                            />
                                            <div 
                                                className={
                                                    !isPlayed || (isPlayed && videoBarToggle) ? 
                                                    "custom-progress" : "custom-progress custom-progress-toggle"
                                                }>
                                                <div className="duration-range-outer">
                                                    <input 
                                                        type="range" 
                                                        className="duration-range"
                                                        ref={videoInputRef}
                                                        value={rangeVal} 
                                                        max={rangeMaxVal} 
                                                        onClick={rangeValChange} 
                                                        onChange={rangeValChange}
                                                    />
                                                </div>
                                                <span className="duration-time">{durationTime}</span>
                                                <div 
                                                    className="voice-btn"
                                                    onClick={element => {

                                                        if(!element) return

                                                        const currentTarget = element.target as HTMLDivElement

                                                        if($.createArray({ type: 'new', item: currentTarget.classList }).includes('voice-range')) return

                                                        setInitState(prevState => ({ ...prevState, voiceValToggle: !voiceValToggle }))
                                                    }} 
                                                >
                                                    <Volume2 />
                                                    <div className={!voiceValToggle ? "voice-range-outer" : "voice-range-outer voice-range-outer-toggle"}>
                                                        <input 
                                                            type="range" 
                                                            className="voice-range" 
                                                            value={voiceVal}
                                                            max="100" 
                                                            onClick={voiceChange} 
                                                            onChange={voiceChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={!textShowToggle ? "text-show" : "text-show text-show-toggle"}>{textShowContent}</span>
                                        </>
                                    ) : (
                                        <div className="no-video">無檢視影片</div>
                                    )
                                }
                                
                            </div>
                        ) : (
                            <div className='load-text'>{props.toggleSingleMusicVideoModalStatus && '讀取資料中'}</div>
                        )
                }
            </div>
        </StyledLayout>
    )
})

export default SingleMusicVideoInfoModal