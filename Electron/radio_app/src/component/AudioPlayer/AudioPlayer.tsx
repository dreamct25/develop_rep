import React, { FunctionComponent } from "react";
import { AudioPlayerProps } from './types'
import Container from './styles'
import { CircleSlider } from 'react-circle-slider'

const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({ audioPlayerProps : {
    audioPlayer,
    audioVoice,
    audioState,
    setCurrentVoice,
    setCurrentPlayState,
    prevOrNext
} }: AudioPlayerProps): JSX.Element => {

    const setCurrentAudioState: () => void = () => setCurrentPlayState(!audioState)

    const audioPrevOrNext: (type: string, e: React.MouseEvent<HTMLDivElement>) => void = (type, e) => prevOrNext(type, e)

    const setCurrentAudioVoice: (value: string) => void = value => setCurrentVoice(value)

    return (
        <Container>
            <div className="voice-slider">
                <CircleSlider
                    size={180}
                    knobRadius={10}
                    progressWidth={5}
                    progressColor="rgb(8,232,222)"
                    circleColor="rgba(60,60,60,.7)"
                    shadow="rgb(0,0,0,.7)"
                    min={0}
                    max={100}
                    value={audioVoice}
                    onChange={setCurrentAudioVoice}
                />
                <div className="voice-text" style={{ color: `rgb(255,${255 - (audioVoice * 2.55)},${255 - (audioVoice * 2.55)})` }}>
                    <i className="fas fa-volume volume-icon"></i>&nbsp;{audioVoice} %
                </div>
            </div>
            <div className="music-progress-outer">
                <div className="music-progress">
                    <span className={audioState ? 'active-1' : 'stop'}></span>
                    <span className={audioState ? 'active-2' : 'stop'}></span>
                    <span className={audioState ? 'active-3' : 'stop'}></span>
                    <span className={audioState ? 'active-4' : 'stop'}></span>
                    <span className={audioState ? 'active-5' : 'stop'}></span>
                    <span className={audioState ? 'active-6' : 'stop'}></span>
                    <span className={audioState ? 'active-7' : 'stop'}></span>
                    <span className={audioState ? 'active-8' : 'stop'}></span>
                    <span className={audioState ? 'active-9' : 'stop'}></span>
                    <span className={audioState ? 'active-10' : 'stop'}></span>
                </div>
            </div>
            <video ref={audioPlayer} />
            <div className="set-bar">
                <div className="prev-btn" onClick={audioPrevOrNext.bind(this, 'prev')}>
                    <i className="fas fa-backward"></i>
                </div>
                <div className="play-btn" onClick={setCurrentAudioState}>
                    {!audioState ? <i className="fas fa-play play"></i> : <i className="fas fa-pause pause"></i>}
                </div>
                <div className="next-btn" onClick={audioPrevOrNext.bind(this, 'next')}>
                    <i className="fas fa-forward"></i>
                </div>
            </div>
        </Container>
    )
}

export default React.memo(AudioPlayer)