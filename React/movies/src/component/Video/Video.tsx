import { Dispatch, FunctionComponent, useEffect, useRef, ChangeEventHandler, MutableRefObject, MouseEventHandler, MouseEvent } from 'react'
import VideoJs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { StyledComponent } from 'styled-components'
import { actionCreatorTypes } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { Collection } from 'immutable'
import componentEntries from '../Video'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.min.js'

const { actionCreator, styles: { Show } }: {
    actionCreator: actionCreatorTypes,
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface VideoProps {
    url: string
}

interface objType {
    durationVal: any,
    totalTime: any
    currentTimeText: any,
    havePlay: any,
    videoFooterBarAnimate: any,
    initialStatus: any
}

const Video: FunctionComponent<VideoProps> = ({ url }: VideoProps): JSX.Element => {
    const { durationVal, totalTime, currentTimeText, havePlay, videoFooterBarAnimate, initialStatus }: objType = useSelector((state: Collection<unknown, unknown>) => ({
        durationVal: state.getIn(['video', 'duration']),
        totalTime: state.getIn(['video', 'totalTime']),
        currentTimeText: state.getIn(['video', 'currentTimeText']),
        havePlay: state.getIn(['video', 'havePlay']),
        videoFooterBarAnimate: state.getIn(['video', 'videoFooterBarAnimate']),
        initialStatus: state.getIn(['video', 'initialStatus'])
    }))

    const timer: MutableRefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout>(null)

    const dispatch: Dispatch<any> = useDispatch<Dispatch<any>>()
    
    const playerOption: VideoJsPlayerOptions = {
        autoplay: false,
        controls: false,
        sources: [{ src: url, type: 'video/youtube' }],
        muted: false,
        loop: false,
    }

    const video = useRef<HTMLVideoElement>(null)
    const players = useRef<any>(null)
    const progress = useRef<HTMLInputElement>(null)

    const initialVideo: Function = (player: VideoJsPlayer) => {
        players.current = player
        setTimeout(() => {
            dispatch(actionCreator.setTotalTimes(player.duration()))
            dispatch(actionCreator.setDurations(player.currentTime()))
            dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
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

    const timeAction: Function = (player: VideoJsPlayer) => {
        dispatch(actionCreator.setDurations(player.currentTime()))
        dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
        clearInterval(timer.current!)
        timer.current = setInterval(() => {
            if (player.currentTime() / player.duration() === 1) {
                clearInterval(timer.current!);
                dispatch(actionCreator.setHavePlays(false))
            } else {
                dispatch(actionCreator.setHavePlays(true))
                dispatch(actionCreator.setDurations(player.currentTime()))
                dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(player.currentTime() + 1)))
                progressAnimte(player.currentTime(), player.duration())
            }
        }, 1000)
    }

    const playSwitch: MouseEventHandler<HTMLDivElement> = () => {
        havePlay ? players.current.pause() : players.current.play()
    }

    const toggleVideoFooterBar: Function = (status: boolean) => {
        dispatch(actionCreator.setVideoFooterBarAnimates(status))
    }

    const initalPlay: MouseEventHandler<HTMLDivElement> = () => {
        dispatch(actionCreator.setInitialStatus(true))
        setTimeout(() => players.current.play(), 1000)

    }

    const progressAnimte = (val: number, dur: number) => progress.current?.style.setProperty("background-image", `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${(val / dur) * 100}%,white 100%)`)

    const videoDurationChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }: { target: { value: string } }) => {
        dispatch(actionCreator.setDurations(Number(value)))
        dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(Number(value))))
        players.current.currentTime(Number(value))
        clearInterval(timer.current!)
    }

    const videoTimeTrans: Function = (curTime: any): string => {
        curTime = isNaN(curTime) === true ? 0 : curTime;
        let min: number | string = Math.floor(curTime / 60);
        let sec: number | string = Math.floor(curTime) - min * 60;
        min = min < 10 ? `0${min}` : min;
        sec = sec < 10 ? `0${sec}` : sec;
        return `${min} : ${sec}`;
    }

    useEffect(() => {
        initialStatus === true && progressAnimte(players.current.currentTime(), players.current.duration())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [durationVal])

    useEffect(() => {
        const player: VideoJsPlayer = VideoJs(video.current!, playerOption)
        initialVideo(player)
        return () => {
            player.dispose()
            clearInterval(timer.current!)
            dispatch(actionCreator.setTotalTimes(0))
            dispatch(actionCreator.setDurations(0))
            dispatch(actionCreator.setCurrentTimeTexts(videoTimeTrans(0)))
            dispatch(actionCreator.setInitialStatus(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Show>
            <div className="video-outer">
                <div onMouseEnter={(el: MouseEvent) => toggleVideoFooterBar(true)} onMouseLeave={(el: MouseEvent) => toggleVideoFooterBar(false)}>
                    <video ref={video} className='video-js' />
                </div>
                <div className={initialStatus ? 'inital-play inital-play-hide' : 'inital-play'} onClick={initalPlay}>
                    <i className="fal fa-play fa-6x"></i>
                </div>
                {initialStatus === true && <div className={videoFooterBarAnimate ? 'video-footer video-footer-active' : 'video-footer'} onMouseEnter={(el: MouseEvent) => toggleVideoFooterBar(true)} onMouseLeave={(el: MouseEvent) => toggleVideoFooterBar(false)}>
                    <div className="video-play" onClick={playSwitch}>
                        <i className={havePlay ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </div>
                    <div className="video-progress">
                        <input ref={progress} className="progress-custom" type="range" min="0" max={totalTime} value={durationVal} onChange={videoDurationChange} />
                    </div>
                    <div className="video-time">{currentTimeText} / {videoTimeTrans(totalTime)}</div>
                </div>}
                <div className={initialStatus ? 'video-outer-frame video-outer-frame-hide' : 'video-outer-frame'}></div>
            </div>
        </Show>

    )
}

export default Video