import { 
    useEffect, 
    useRef, 
    useState,
    type ChangeEventHandler, 
    type MouseEventHandler
} from 'react'
import VideoJs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.min.js'
import { StyledLayout, type Player } from '.'

const Video:FC<{ url: string }> = ({ url }): TSX => {

    const [{
        durationVal, 
        totalTime, 
        currentTimeText, 
        havePlay, 
        progressBarVal,
        volumeBarVal,
        toggleVideoFooterBarAnimateStatus, 
        initialStatus, 
        volume,
        volumeSliderToggle,
        volumeTextToggle
    }, setInitState] = useState<{
        durationVal: number,
        totalTime: string, 
        currentTimeText: string, 
        havePlay: boolean, 
        progressBarVal: number
        volumeBarVal: number
        toggleVideoFooterBarAnimateStatus: boolean, 
        initialStatus: boolean, 
        volume: string,
        volumeSliderToggle: boolean,
        volumeTextToggle: boolean
    }>({
        durationVal: 0,
        totalTime: '', 
        currentTimeText: '', 
        havePlay: false, 
        progressBarVal: 0,
        volumeBarVal: 50,
        toggleVideoFooterBarAnimateStatus: false, 
        initialStatus: false, 
        volume: '50',
        volumeSliderToggle: false,
        volumeTextToggle: false
    })

    const timer = useRef<NodeJS.Timeout>(undefined)
    const videoOuterRef = useRef<HTMLDivElement>(null)
    const players = useRef<Player>(undefined)
    const toggleVideoFooterBarAnimateStatusDebounceTimer = useRef<NodeJS.Timeout>(undefined)
    
    const playerOption = {
        defaultVolume: parseInt(volume) / 100,
        autoplay: false,
        controls: false,
        sources: [{ 
            src: url, 
            type: 'video/youtube'
        }],
        muted: false,
        loop: false,
        posterImage: false
    }

    const initialVideo: (player: Player) => void = player => {

        players.current = player

        player.on('play', whenVideoPlay.bind(undefined, player))

        player.on('pause', () => {

            if(timer.current) clearInterval(timer.current)

            setInitState(prevState => ({
                ...prevState,
                havePlay: false
            }))
        })

        player.on('loadedmetadata', () => {

            if(timer.current) clearInterval(timer.current)

            setInitState(prevState => {

                if(!player.duration || !player.currentTime) return prevState

                const currentTime = player.currentTime()!
                
                return {...prevState,
                    totalTime: String(player.duration()),
                    durationVal: currentTime,
                    currentTimeText: toVideoTimes(currentTime),
                    havePlay: false,
                    initialStatus: true
                }
            })
        })
    }

    const whenVideoPlay: (player: Player) => void = player => {

        setInitState(prevState => ({
            ...prevState,
            durationVal: player.currentTime()!,
            currentTimeText: toVideoTimes(player.currentTime()!),
            havePlay: true,
            toggleVideoFooterBarAnimateStatus: true
        }))

        if(timer.current) clearInterval(timer.current)
        
        timer.current = setInterval(() => {

            if(!player) {
                clearInterval(timer.current);
                return
            }

            const currentTime = player.currentTime()!
            const currentDuration = player.duration()!

            if (currentTime / currentDuration === 1) {
                
                clearInterval(timer.current!);
                
                setInitState(prevState => ({
                    ...prevState,
                    havePlay: false
                }))

                return

            }

            setInitState(prevState => ({
                ...prevState,
                durationVal: currentTime,
                currentTimeText: toVideoTimes(currentTime)
            }))
            
            progressAnimate(currentTime, currentDuration)

        }, 1000)
    }

    const playSwitch: MouseEventHandler<HTMLDivElement> = () => {

        if(!players.current) return

        if(havePlay) {
            
            players.current.pause()
            
            return
        }

        players.current.play()
    }

    const toggleVideoFooterBar: (status: boolean) => void = status => {

        setInitState(prevState => ({
            ...prevState,
            toggleVideoFooterBarAnimateStatus: status
        }))
        
        if(!status) setVolumeSliderToggle(!status)
    }

    const playVideoHandler: MouseEventHandler<HTMLDivElement> = () => {

        if(!players.current) return

        if(havePlay) {

            players.current.play()
            
            return
        }

        players.current!.play()
    }

    const progressAnimate: (val: number, duration: number) => void = (val, duration) => {

        setInitState(prevState => ({
            ...prevState,
            progressBarVal: (val / duration) * 100
        }))
    }

    const videoDurationChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {

        if(!players.current) return

        clearInterval(timer.current)

        setInitState(prevState => ({
            ...prevState,
            durationVal: parseInt(value),
            currentTimeText: toVideoTimes(parseInt(value))
        }))
        
        players.current.currentTime(parseInt(value))
    }

    const volumeChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        
        setInitState(prevState => {

            if(!players.current) return prevState

            const currentVolume = parseFloat(target.value) / 100

            players.current.volume(currentVolume)

            return {
                ...prevState,
                volume: target.value,
                volumeBarVal: parseInt(target.value)
            }
        })
    }

    const toVideoTimes: (curTime: number) => string = curTime => {

        curTime = isNaN(curTime) ? 0 : curTime;

        const min = Math.floor(curTime / 60);
        const sec = Math.floor(curTime) - min * 60;
        const outPutMin = min < 10 ? `0${min}` : `${min}`;
        const outPutSec = sec < 10 ? `0${sec}` : `${sec}`;

        return `${outPutMin} : ${outPutSec}`;
    }

    const setVolumeSliderToggle:(status:boolean) => void = status => {

        setInitState(prevState => ({
            ...prevState,
            volumeSliderToggle: !status
        }))
    }

    const setVolumeTextToggle:(status:boolean) => void = status => {

        setInitState(prevState => ({
            ...prevState,
            volumeTextToggle: status
        }))
    }

    const initalPlayer = () => {
        
        if(!videoOuterRef.current) return

        if(timer.current) clearInterval(timer.current)

        const dom = videoOuterRef.current.querySelector('video-js')

        if(dom) {
            
            if(Array.from(dom.children).length > 0) return
        }

        const videoJSDom = document.createElement('video-js')

        videoOuterRef.current.appendChild(videoJSDom);
        
        const player = VideoJs(videoJSDom, playerOption)

        initialVideo(player)
    }

    const disposePlayer: () => void = () => {

        if(players.current && !players.current.isDisposed()) {
            players.current.dispose()
        }
    }

    useEffect(() => {

        if(toggleVideoFooterBarAnimateStatus) {

            if(toggleVideoFooterBarAnimateStatusDebounceTimer.current)
                clearTimeout(toggleVideoFooterBarAnimateStatusDebounceTimer.current)

            toggleVideoFooterBarAnimateStatusDebounceTimer.current = setTimeout(() => {

                setInitState(prevState => ({
                    ...prevState,
                    toggleVideoFooterBarAnimateStatus: false
                }))

            }, 3000)
        }

    }, [toggleVideoFooterBarAnimateStatus, havePlay, durationVal, volume])

    useEffect(() => {

        if(!players.current) return

        if(players.current.currentTime() && players.current.duration()) {
            progressAnimate(players.current.currentTime()!, players.current.duration()!)
        }

    }, [durationVal])

    useEffect(() => {

        if(!videoOuterRef.current) return

        if(url) initalPlayer()

    }, [videoOuterRef.current, url])

    useEffect(() => () => {
        disposePlayer()
    }, [])

    return (
        <StyledLayout
            progressBarVal={progressBarVal}
            volumeBarVal={volumeBarVal}
        >
            <div className="video-outer"
                onMouseEnter={havePlay ? toggleVideoFooterBar.bind(undefined, true) : undefined} 
                onMouseLeave={havePlay ? toggleVideoFooterBar.bind(undefined, false) : undefined}
                onClick={() => {

                    if(!navigator.userAgent.toLowerCase().includes('mobile')) return

                    if(!havePlay) toggleVideoFooterBar(!toggleVideoFooterBarAnimateStatus)
                }}
            >
                <div className='video-js-outer' ref={videoOuterRef} />
                <div className={toggleVideoFooterBarAnimateStatus ? "video-play-btn toggle" : "video-play-btn"} onClick={playSwitch}>
                    <i className={havePlay ? 'fas fa-pause' : 'fas fa-play'} />
                </div>
                {
                    initialStatus && (
                        <div 
                            className={[
                                'video-footer',
                                toggleVideoFooterBarAnimateStatus ? 'video-footer-active' : '',
                                navigator.userAgent.toLocaleLowerCase().includes('iphone') ? 'hide-volume' : ''
                            ].join(' ')} 
                        >
                            <div className="video-progress">
                                <input 
                                    className="progress-custom" 
                                    type="range" 
                                    min="0" 
                                    max={totalTime} 
                                    value={durationVal} 
                                    onChange={videoDurationChange} 
                                />
                            </div>
                            {
                                !navigator.userAgent.toLocaleLowerCase().includes('iphone') && (
                                    <div className="video-volume-group">
                                        <div 
                                            className="video-volume-btn" 
                                            onClick={setVolumeSliderToggle.bind(undefined, volumeSliderToggle)}
                                        >
                                            <i className={parseInt(volume) > 0 ? 'fas fa-volume-down':'fas fa-volume-mute'} />
                                        </div>
                                        <div className={volumeSliderToggle ? 'video-volume-slider video-volume-slider-toggle' : 'video-volume-slider'}>
                                            <input
                                                type="range" 
                                                className="volume" 
                                                min="0" 
                                                max="100" 
                                                value={volume} 
                                                onChange={volumeChange} 
                                                onMouseDown={setVolumeTextToggle.bind(undefined, true)} 
                                                onMouseUp={setVolumeTextToggle.bind(undefined, false)}
                                                onTouchStart={setVolumeTextToggle.bind(undefined, true)}
                                                onTouchEnd={setVolumeTextToggle.bind(undefined, false)}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            <div className="video-time">{currentTimeText} / {toVideoTimes(parseInt(totalTime))}</div>
                        </div>
                    )
                }
                <div className={volumeTextToggle ? 'volume-text volume-text-toggle' : 'volume-text'}>音量 {volume} %</div>
                <div 
                    className={havePlay ? 'video-outer-frame video-outer-frame-hide' : 'video-outer-frame'}
                    onClick={playVideoHandler}
                />
            </div>
        </StyledLayout>
    )
}

export default Video