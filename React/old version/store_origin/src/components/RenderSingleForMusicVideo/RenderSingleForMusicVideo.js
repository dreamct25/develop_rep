import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../RenderSingleForMusicVideo'

const { actions,styles } = importItem
const { Show } = styles

class RenderSingleForMusicVideo extends Component{
    constructor(props){
        super(props)
        this.playVideo = this.playVideo.bind(this)
        this.setVideo = this.setVideo.bind(this)
        this.rangeChange = this.rangeChange.bind(this)
        this.voiceChange = this.voiceChange.bind(this)
    }
    render() {
     return(
        <Show>
            {this.props.singleData.map(item => (
                <div className="single-content" key={item.trackId} onMouseEnter={this.videoBarToggleChange.bind(this,true)} onMouseLeave={this.videoBarToggleChange.bind(this,false)}>
                    <div className={this.props.isPlayed === false || (this.props.isPlayed === true && this.props.videoBarToggle === true) ? "video-title-outer" : "video-title-outer video-title-outer-toggle"}>
                        <span className="video-title">{item.artistName}-{item.trackName} ( Short Version )</span>
                    </div>
                    <div className={this.props.isPlayed ? "video-black-frame video-black-frame-toggle" : "video-black-frame"}></div>
                    <div className={this.props.isPlayed ? "video-btn video-btn-toggle" : "video-btn"} onClick={this.playVideo} onMouseEnter={this.videoBarToggleChange.bind(this,true)}>
                        {this.props.isPlayed ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                    </div>
                    <video ref={videos => this.videos = videos} src={item.previewUrl} playsInline></video>
                    <div className={this.props.isPlayed === false || (this.props.isPlayed === true && this.props.videoBarToggle === true) ? "custom-progress" : "custom-progress custom-progress-toggle"}>
                        <input type="range" className="duration-range" value={this.props.rangeVal} max={this.props.rangeMaxVal} ref={range => this.range = range} onClick={this.rangeChange} onInput={this.rangeChange}></input>
                        <span className="duration-time" ref={durationText => this.durationText = durationText}>{this.props.durationTime}</span>
                        
                        {window.innerWidth < 768 ? null : <div className="voice-btn" onClick={this.changeVoiceValRangeToggle.bind(this,true)} onMouseLeave={this.changeVoiceValRangeToggle.bind(this,false)}>
                            <i className="fas fa-volume"></i>
                            <div className={this.props.voiceValToggle === false ? "voice-range-outer" : "voice-range-outer voice-range-outer-toggle"}>
                                <input type="range" className="voice-range" value={this.props.voiceVal} max="100" onClick={this.voiceChange} onChange={this.voiceChange} ref={range => this.voiceRange = range}/>
                            </div>
                        </div>}
                    </div>
                    <span className={this.props.textShowToggle === false ? "text-show" : "text-show text-show-toggle"}>{this.props.textShowContent}</span>
                </div>
                )
            )}
        </Show>
     )   
    }
    componentDidMount(){
        setTimeout(this.setVideo,1000)
    }
    componentWillUnmount(){
        this.props.changePlayState(false)
        clearInterval(this.props.timer)
    }
    setVideo(){
        const { duration } = this.videos
        const floatFix = Math.floor(duration)
        this.props.changeRangeMaxVal(floatFix)
        this.props.changeDurationTime(floatFix)
        this.props.changeRangeVal(0)
        if(window.innerWidth > 768){
            this.voiceRangeBackgroundColorChange(0.5)
            this.props.changeVoiceVal(50)
        }
        setTimeout(()=>{
            if(this.props.rangeMaxVal.toString() === "NaN"){
                this.props.changeRangeMaxVal(Math.floor(this.videos.duration))
                this.props.changeDurationTime(this.videos.duration)
                this.props.changeRangeVal(0)
            }
        },1000)
    }
    playVideo(){
        this.props.isPlayed === false ? this.videos.play() : this.videos.pause()
        this.videos.paused === false ? this.props.changePlayState(true) : this.props.changePlayState(false)
        clearInterval(this.props.timer)
        let timer = setInterval(()=> {
            if(Math.floor(this.videos.currentTime) === Math.floor(this.props.rangeMaxVal)){
                clearInterval(this.props.timer)
                this.videos.currentTime = 0
                this.props.changeRangeVal(this.videos.currentTime)
                this.range.value = 0
                this.rangeBackgroundColorChange(0,100)
                this.props.changePlayState(false)
            }else{
                this.props.changeDurationTime(Math.floor(this.videos.currentTime))
                this.props.changeRangeVal(Math.floor(this.videos.currentTime))
                this.rangeBackgroundColorChange(this.props.rangeVal,this.videos.duration)
            }
        },1000)
        this.props.setNewTimer(timer)
    }
    rangeChange(){
        this.props.changeRangeVal(Number(this.range.value))
        this.videos.currentTime = this.props.rangeVal
    }
    voiceChange(){
        this.props.changeVoiceVal(this.voiceRange.value)
        this.videos.volume = this.props.voiceVal / 100
        this.props.changeTextShowContent(`音量：${Math.floor(this.voiceRange.value) === 0 ? '靜音' : `${Math.floor(this.voiceRange.value)} %`}`)
        this.props.changeTextShowToggleState(true)
        this.voiceRangeBackgroundColorChange(this.props.voiceVal / 100)
        setTimeout(()=> this.props.changeTextShowToggleState(false),1500)
    }
    voiceRangeBackgroundColorChange(val){
        this.voiceRange.style.backgroundImage = `-webkit-linear-gradient(left,red 0%,red ${val * 100}%,white ${
            val * 100
          }%,white 100%)`
    }
    rangeBackgroundColorChange(val,dur){
        this.range.style.backgroundImage = `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${
            (val / dur) * 100
          }%,white 100%)`
    }
    videoBarToggleChange(status){
        if(window.innerWidth < 768) return
        this.props.changeVideoBarToggleState(status)
    }
    changeVoiceValRangeToggle(status){
        this.props.changeVoiceValToggleState(status)
    }
}

RenderSingleForMusicVideo.defaultProps = {
    voiceVal:50
}

const reactReduxStateToProps = state => ({
    singleData:state.getIn(['musicVideoItem','singleData']),
    isPlayed:state.getIn(['renderSingleForMusicVideo','isPlayed']),
    rangeVal:state.getIn(['renderSingleForMusicVideo','rangeVal']),
    rangeMaxVal:state.getIn(['renderSingleForMusicVideo','rangeMaxVal']),
    timer:state.getIn(['renderSingleForMusicVideo','timer']),
    durationTime:state.getIn(['renderSingleForMusicVideo','durationTime']),
    voiceVal:state.getIn(['renderSingleForMusicVideo','voiceVal']),
    textShowToggle:state.getIn(['renderSingleForMusicVideo','textShowToggle']),
    textShowContent:state.getIn(['renderSingleForMusicVideo','textShowContent']),
    videoBarToggle:state.getIn(['renderSingleForMusicVideo','videoBarToggle']),
    voiceValToggle:state.getIn(['renderSingleForMusicVideo','voiceValToggle'])
})

const reactReduxDispatchToProps = dispatch => ({
    changePlayState(status){
        const action = actions.changePlayedState(status)
        dispatch(action)
    },
    changeRangeVal(val){
        const action = actions.changeRangeVal(val)
        dispatch(action)
    },
    changeRangeMaxVal(val){
        const action = actions.changeRangeMaxVal(val)
        dispatch(action)
    },
    setNewTimer(timer){
        const action = actions.setTimer(timer)
        dispatch(action)
    },
    changeDurationTime(val){
        const action = actions.changeDurationTime(val)
        dispatch(action)
    },
    changeVoiceVal(val){
        const action = actions.changeVoiceVal(val)
        dispatch(action)
    },
    changeTextShowToggleState(status){
        const action = actions.changeTextShowState(status)
        dispatch(action)
    },
    changeTextShowContent(txt){
        const action = actions.changeTextShowContent(txt)
        dispatch(action)
    },
    changeVideoBarToggleState(status){
        const action = actions.changeVideoBarToggle(status)
        dispatch(action)
    },
    changeVoiceValToggleState(status){
        const action = actions.changeVoiceValToggle(status)
        dispatch(action)
    }
})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(RenderSingleForMusicVideo)