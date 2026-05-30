import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../RenderSingleForMusic'

const { actions,styles } = importItem
const { Show,HiddenOuterFrame } = styles

class RenderSingleForMusic extends Component{
    constructor(props){
        super(props)
        this.playAudio = this.playAudio.bind(this)
        this.setAuido = this.setAuido.bind(this)
        this.changeState = this.changeState.bind(this)
        this.rangeValChange = this.rangeValChange.bind(this)
    }
    render() {
     return(
        <Show>
            <div className="container-fluid">
                {this.props.singleData.map(item => (
                    <div key={item.trackId}>
                        <div className="single-outer">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="img-outer">
                                        <img src={item.artworkUrl100.replace(/100x100/g,"300x300")} alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="right-detailse-outer">
                                        <div className="right-detailse">
                                            <span>專輯：{item.collectionName}</span>
                                            <span>發行時間：{item.releaseDate.split("T")[0]}</span>
                                            <span>曲風：{item.primaryGenreName}</span>
                                            <span>{item.artistName}-{item.trackName}</span>
                                            <span className="show-input" onClick={this.changeState}>
                                                試聽<i className={this.props.showInputToggle === false ? "far fa-angle-up arrow" : "far fa-angle-up arrow arrow-toggle"}></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <HiddenOuterFrame>
                                        <div className={this.props.showInputToggle === false ? "audio-outer" : "audio-outer audio-outer-toggle"}>
                                            <audio src={item.previewUrl} ref={audios => this.audios = audios}></audio>
                                            <div className="custom-progress">
                                                <input ref={range => this.range = range} type="range" value={this.props.rangeVal} max={this.props.rangeMaxVal} onClick={this.rangeValChange}  onInput={this.rangeValChange}></input>
                                                <span className="duration-time">{this.props.trackDurationVal}</span>
                                            </div>
                                            <div className="play" onClick={this.playAudio}>
                                                {this.props.isPlayed ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                                            </div>
                                        </div>
                                    </HiddenOuterFrame>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                )}
            </div>
        </Show>
     )   
    }
    componentDidMount(){
        setTimeout(this.setAuido,1000)
    }
    componentWillUnmount(){
        this.props.changeShowInputToggleState(false)
        this.props.setRangVal(0)
        clearInterval(this.props.timer)
    }
    setAuido(){
        this.props.setRangMaxVal(Math.floor(this.audios.duration))
        this.props.setTrackDurationVal(Math.floor(this.audios.duration))
        setTimeout(()=>{
            if(this.props.rangeMaxVal.toString() === "NaN"){
                this.props.setRangMaxVal(Math.floor(this.audios.duration))
                this.props.setTrackDurationVal(Math.floor(this.audios.duration))
                this.props.setRangVal(0)
            }
        },1000)
    }
    rangeValChange(){
        this.props.setRangVal(Number(this.range.value))
        this.audios.currentTime = this.props.rangeVal
        this.progressBackGroudChange(this.props.rangeVal,Math.floor(this.audios.duration))
    }
    playAudio(){
        if(this.props.rangeVal.toString() === "NaN"){
            alert("please reload this dialog")
            return
        }
        this.props.isPlayed === false ? this.audios.play() : this.audios.pause()
        this.audios.paused === false ? this.props.changePlayStatus(true) : this.props.changePlayStatus(false)
        clearInterval(this.props.timer)
        let timer = setInterval(()=>{
            if(Math.floor(this.audios.currentTime) === this.props.rangeMaxVal){
                clearInterval(this.props.timer)
                this.audios.currentTime = 0
                this.props.setRangVal(0)
                this.props.setTrackDurationVal(this.audios.duration)
                this.props.changePlayStatus(false)
                this.progressBackGroudChange(0,100)
            }else{
                this.props.setRangVal(Math.floor(this.audios.currentTime))
                this.props.setTrackDurationVal(this.audios.currentTime)
                this.progressBackGroudChange(this.props.rangeVal,Math.floor(this.audios.duration))
            }
        },1000)
        this.props.setTimerItem(timer)
    }
    progressBackGroudChange(val,dur){
        console.log(val,dur)
        this.range.style.backgroundImage = `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${
            (val / dur) * 100
          }%,white 100%)`
    }
    changeState(){
        this.props.showInputToggle === false ? this.props.changeShowInputToggleState(true) : this.props.changeShowInputToggleState(false)
    }
}

const reactReduxStateToProps = state => ({
    singleData:state.getIn(['musicItem','singleData']),
    rangeVal:state.getIn(['renderSingleForMusic','rangeVal']),
    rangeMaxVal:state.getIn(['renderSingleForMusic','rangeMaxVal']),
    trackDurationVal:state.getIn(['renderSingleForMusic','trackDurationVal']),
    isPlayed:state.getIn(['renderSingleForMusic','isPlayed']),
    timer:state.getIn(['renderSingleForMusic','timer']),
    showInputToggle:state.getIn(['renderSingleForMusic','showInputToggle'])
})

const reactReduxDispatchToProps = dispatch => ({
    setRangVal(val){
        const action = actions.getRangeVal(val)
        dispatch(action)
    },
    setRangMaxVal(val){
        const action = actions.getMaxRangeVal(val)
        dispatch(action)
    },
    setTrackDurationVal(val){
        const action = actions.getTrackDurationVal(val)
        dispatch(action)
    },
    changePlayStatus(status){
        const action = actions.currentPlayState(status)
        dispatch(action)
    },
    setTimerItem(item){
        const action = actions.setTimer(item)
        dispatch(action)
    },
    changeShowInputToggleState(status){
        const action = actions.showInputToggle(status)
        dispatch(action)
    }
})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(RenderSingleForMusic)