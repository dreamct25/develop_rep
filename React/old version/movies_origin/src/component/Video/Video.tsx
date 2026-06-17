import { Dispatch, FunctionComponent, useEffect, useRef, ChangeEventHandler, MutableRefObject, MouseEventHandler } from 'react'
import { actionCreatorTypes, VideoProps, objType, reducerState, cssSetPropertys } from './types'
import { useDispatch, useSelector } from 'react-redux'
import VideoJs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.min.js'
import componentEntries from '../Video'

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorTypes,
    styles: cssSetPropertys
} = componentEntries

const Video: FunctionComponent<VideoProps> = ({ url }: VideoProps): JSX.Element => {
    const { durationVal, totalTime, currentTimeText, havePlay, videoFooterBarAnimate, initialStatus, volume,volumeSliderToggle,volumeTextToggle }: objType = useSelector((state: reducerState) => ({
        durationVal: state.getIn(['video', 'duration']) as number,
        totalTime: state.getIn(['video', 'totalTime']) as string,
        currentTimeText: state.getIn(['video', 'currentTimeText']) as string,
        havePlay: state.getIn(['video', 'havePlay']) as boolean,
        videoFooterBarAnimate: state.getIn(['video', 'videoFooterBarAnimate']) as boolean,
        initialStatus: state.getIn(['video', 'initialStatus']) as boolean,
        volume: state.getIn(['video', 'volume']) as string,
        volumeSliderToggle:state.getIn(['video', 'volumeSliderToggle']) as boolean,
        volumeTextToggle: state.getIn(['video', 'volumeTextToggle']) as boolean
    }))

    const timer: MutableRefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout>(null)

    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>()

    const playerOption: VideoJsPlayerOptions = {
        defaultVolume: Number(volume) / 100,
        autoplay: false,
        controls: window.innerWidth <= 414 ? true : false,
        sources: [{ src: url, type: 'video/youtube' }],
        muted: false,
        loop: false,
    }

    const video = useRef<HTMLVideoElement>(null)
    const players = useRef<any>(null)
    const progress = useRef<HTMLInputElement>(null)
    const volumeSlider = useRef<HTMLInputElement>(null)

    const initialVideo: (player: VideoJsPlayer) => void = player => {
        players.current = player
        setTimeout(() => {
            dispatch(actionCreator.setTotalTimes(String(player.duration())))
            dispatch(actionCreator.setDurations(player.currentTime()))
            dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
            volumeAnimate(volume)
            player.on('play', () => {
                timeAction(player)
            })
            player.on('pause', () => {
                clearInterval(timer.current!)
                dispatch(actionCreator.setHavePlays(false))
            })
            player.ready(() => {
                clearInterval(timer.current!)
                dispatch(actionCreator.setHavePlays(false))
            })
        }, 2000)
    }

    const timeAction: (player: VideoJsPlayer) => void = player => {
        dispatch(actionCreator.setDurations(player.currentTime()))
        dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
        dispatch(actionCreator.setHavePlays(true))
        clearInterval(timer.current!)
        timer.current = setInterval(() => {
            if (player.currentTime() / player.duration() === 1) {
                clearInterval(timer.current!);
                dispatch(actionCreator.setHavePlays(false))
            } else {
                dispatch(actionCreator.setDurations(player.currentTime()))
                dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
                progressAnimte(player.currentTime(), player.duration())
            }
        }, 1000)
    }

    const playSwitch: MouseEventHandler<HTMLDivElement> = (): void => havePlay ? players.current.pause() : players.current.play()

    const toggleVideoFooterBar: (status: boolean) => void = status => {
        dispatch(actionCreator.setVideoFooterBarAnimates(status))
        !status && setVolumeSliderToggle(!status)
    }

    const initalPlay: MouseEventHandler<HTMLDivElement> = (): void => {
        dispatch(actionCreator.setInitialStatus(true))
        havePlay ?  players.current.play() : setTimeout(() => players.current.play(), 1000)
    }

    const progressAnimte: (val: number, dur: number) => void = (val, dur) => progress.current?.style.setProperty("background-image", `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${(val / dur) * 100}%,white 100%)`)
    
    const volumeAnimate: (val: string) => void = val => volumeSlider.current?.style.setProperty("background-image", `-webkit-linear-gradient(left,red 0%,red ${val}%,white ${val}%,white 100%)`)

    const videoDurationChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }: { target: { value: string } }) => {
        dispatch(actionCreator.setDurations(Number(value)))
        dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(Number(value))))
        players.current.currentTime(Number(value))
        clearInterval(timer.current!)
    }

    const volumeChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }: { target: { value: string } }) => {
        dispatch(actionCreator.setVolumeVal(value))
        players.current.volume(Number(value) / 100)
    }

    const videoTimeTrans: (curTime: any) => string = curTime => {
        curTime = isNaN(curTime) === true ? 0 : curTime;
        let min: number | string = Math.floor(curTime / 60);
        let sec: number | string = Math.floor(curTime) - min * 60;
        min = min < 10 ? `0${min}` : min;
        sec = sec < 10 ? `0${sec}` : sec;
        return `${min} : ${sec}`;
    }

    const setVolumeSliderToggle:(status:boolean) => void = status => dispatch(actionCreator.setVolumeSliderToggle(!status))

    const setVolumeTextToggle:(status:boolean) => void = status => dispatch(actionCreator.setVolumeTextToggle(status))

    useEffect(() => {
        initialStatus === true && progressAnimte(players.current.currentTime(), players.current.duration())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [durationVal])

    useEffect(() => {
        volumeAnimate(volume)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume])

    useEffect(() => {
        const player: VideoJsPlayer = VideoJs(video.current!, playerOption)
        initialVideo(player)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            video.current !== null && player.dispose()
            clearInterval(timer.current!)
            dispatch(actionCreator.setTotalTimes('0'))
            dispatch(actionCreator.setDurations(0))
            dispatch(actionCreator.setVolumeVal("50"))
            dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(0)))
            dispatch(actionCreator.setInitialStatus(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="video-outer">
                <div onMouseEnter={toggleVideoFooterBar.bind(this, true)} onMouseLeave={toggleVideoFooterBar.bind(this, false)}>
                    <video ref={video} className='video-js' />
                </div>
                <div className={havePlay ? 'inital-play inital-play-hide' : 'inital-play'} onClick={initalPlay}>
                    <i className="fal fa-play fa-6x"></i>
                </div>
                {initialStatus === true && <div className={videoFooterBarAnimate ? 'video-footer video-footer-active' : 'video-footer'} onMouseEnter={toggleVideoFooterBar.bind(this, true)} onMouseLeave={toggleVideoFooterBar.bind(this, false)}>
                    <div className="video-play" onClick={playSwitch}>
                        <i className={havePlay ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </div>
                    <div className="video-progress">
                        <input ref={progress} className="progress-custom" type="range" min="0" max={totalTime} value={durationVal} onChange={videoDurationChange} />
                    </div>
                    <div className="video-volume-group">
                        <div className="video-volume-btn" onClick={setVolumeSliderToggle.bind(this,volumeSliderToggle)}>
                            <i className={Number(volume) !== 0 ? 'fas fa-volume-down':'fas fa-volume-mute'} />
                        </div>
                        <div className={volumeSliderToggle ? 'video-volume-slider video-volume-slider-toggle' : 'video-volume-slider'}>
                            <input ref={volumeSlider} type="range" className="volume" min="0" max="100" value={volume} onChange={volumeChange} onMouseDown={setVolumeTextToggle.bind(this,true)} onMouseUp={setVolumeTextToggle.bind(this,false)} />
                        </div>
                    </div>
                    <div className="video-time">{currentTimeText} / {videoTimeTrans(totalTime)}</div>
                </div>}
                <div className={volumeTextToggle ? 'volume-text volume-text-toggle' : 'volume-text'}>{volume} %</div>
                <div className={havePlay ? 'video-outer-frame video-outer-frame-hide' : 'video-outer-frame'}></div>
            </div>
        </Show>
    )
}

export default Video