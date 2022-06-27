import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../RenderSingleForPodcast'
import importItemFromDailog from '../Dialog'
import importItemFromPodcastItemList from '../PodcastItemList'
import Pagination from '../Pagination/Pagination'
import Loading from '../Loading/Loading'
import rssParser from 'rss-parser'

const { actions,styles } = importItem
const { Show,HiddenOuterFrame } = styles

class RenderSingleForPodcast extends Component{
    constructor(props){
        super(props)
        this.setAuido = this.setAuido.bind(this)
        this.scrollList = this.scrollList.bind(this)
        this.paginationPart = this.paginationPart.bind(this)
    }
    render() {
        if(this.props.xmlListData.length <= 0){
            return(
                <Show>
                    <div className="container-fluid">
                        <div className="list-outer">
                            <Loading text="讀取中" />
                        </div>
                    </div>
                </Show>
            )
        }else{
            return(
                <Show>
                    <div className="container-fluid">
                        <div className="list-outer" ref={listOuter => this.listOuter = listOuter} onScroll={this.scrollList}>
                            <div className="imgs-outer">
                                <img ref={imgs => this.imgs = imgs} src={this.props.imgUrl} alt="" />
                            </div>
                            {this.props.itemData.map((item,index) => (
                                <div className="list" key={index}>
                                    <div className="list-header">{item.title}</div>
                                    <div className="list-data">{item.isoDate.split("T")[0]}</div>
                                    <div className="list-content">
                                        <span className={this.props.contentToggle && this.props.currentTargetId === item.guid ? "details details-toggle" : "details"} dangerouslySetInnerHTML={{__html:item["content:encoded"]}}></span>
                                        <div className="btns-group">
                                            <span className="content-toggle-btn" onClick={this.changeContentToggleState.bind(this,item.guid)}>
                                                <i className={(this.props.contentToggle && this.props.currentTargetId) === item.guid ? "fas fa-chevron-down arrow arrow-toggle" : "fas fa-chevron-down arrow"}></i>
                                                {(this.props.contentToggle && this.props.currentTargetId) === item.guid ? "收合內容" : "展開內容"}
                                            </span>
                                            <span className="show-input" onClick={this.changeState.bind(this,item.guid)}>
                                                線上收聽<i className={this.props.showInputToggle && this.props.currentTargetId === item.guid ? "far fa-angle-up arrow arrow-toggle" : "far fa-angle-up arrow"}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <HiddenOuterFrame>
                                        <div className={this.props.showInputToggle && this.props.currentTargetId === item.guid ? "audio-outer audio-outer-toggle" : "audio-outer"}>
                                            <audio src={item.enclosure === undefined ? "":item.enclosure.url}></audio>
                                            <div className="custom-progress">
                                                <input className="ranges" type="range" onClick={this.rangeValChange.bind(this,index)}  onInput={this.rangeValChange.bind(this,index)}></input>
                                                <span className="duration-time"></span>
                                            </div>
                                            <div className="play" onClick={this.playAudio.bind(this,index)}>
                                                {this.props.isPlayed && this.props.currentTargetId === item.guid ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                                            </div>
                                        </div>
                                    </HiddenOuterFrame>
                                </div>
                                )
                            )}
                            <Pagination  paginationObjProps={this.props.paginationObj} paginationPartProps={this.paginationPart} />
                        </div>
                    </div>
                </Show>
             )   
        }
    }
    componentDidMount(){
        this.props.singleData.forEach(key=>this.transXML(key.feedUrl))
    }
    componentWillUnmount(){
        this.props.postXMLListData([])
        this.props.setItemData([])
        this.props.changePlayStatus(false)
        this.props.changeShowInputToggleState(false)
        clearInterval(this.props.timer)
    }
    scrollList(){
        let val = 100 - (this.listOuter.scrollTop / 10)
        let forScale
        let forOpacity
        if(val <= 0){
            forOpacity = 0
            forScale = 0
        }else if(this.listOuter.scrollTop === 0){
            forOpacity = 1
            forScale = 1
        }else{
            forOpacity = (val / 100) - 0.05
            forScale = val / 100
        }
        this.imgs.style = `
            opacity:${forOpacity};
            transform:scale(${forScale});
        `
    }
    async transXML(xmls){
        // const unlockCross = `https://cors-anywhere.herokuapp.com/${xmls}`
        try{
            let getData = await new rssParser().parseURL(xmls)
            if(getData !== undefined){
                this.props.postXMLListData(getData.items,getData.image.url)
                setTimeout(this.paginationPart,1000)
                setTimeout(this.setAuido,3000)
            }
        }catch(err){
            setTimeout(()=>{
                this.props.openSwitch(false)
                this.props.closeDailog(false)
            },300)
            alert("資料讀取錯誤")
        }
    }
    changeContentToggleState(id){
        this.props.getCurrentTargetId(id)
        this.props.contentToggle === false ? this.props.changeContentToggleState(true) : this.props.changeContentToggleState(false)
    }
    timeFormate(timeVal,index) {
        if (isNaN(timeVal) === true) timeVal = 0;
        let hourStr = "";
        let hours = Math.floor(timeVal / 3600);
        let min = Math.floor(timeVal / 60) - hours * 60;
        let sec = Math.floor(timeVal) - min * 60 - hours * 3600;
        hourStr = hours < 10 ? `0${hours}` : hours;
        hourStr = hours === "00" ? "" : `${hours} : `;
        min = min < 10 ? `0${min}` : min;
        sec = sec < 10 ? `0${sec}` : sec;
        return timeVal < 3600 ? `${min} : ${sec}`:`${hourStr}${min} : ${sec}`;
    }
    setAuido(){
       document.querySelectorAll("audio").forEach((key,index)=>{
            document.querySelectorAll(".ranges")[index].setAttribute("value",0)
            document.querySelectorAll(".ranges")[index].setAttribute("max",Math.floor(key.duration))
            document.querySelectorAll(".duration-time")[index].textContent = this.timeFormate(Math.floor(key.duration,index))
        })
    }
    rangeValChange(index){
        document.querySelectorAll("audio")[index].currentTime = document.querySelectorAll(".ranges")[index].value
        document.querySelectorAll(".duration-time")[index].textContent = this.timeFormate(
            Math.floor(document.querySelectorAll("audio")[index].currentTime)
        ) 
        this.progressBackGroudChange(
            document.querySelectorAll(".ranges")[index].value,
            Math.floor(document.querySelectorAll("audio")[index].duration),
            index
        )
    }
    playAudio(index){
        this.props.isPlayed === false ? document.querySelectorAll("audio")[index].play() : document.querySelectorAll("audio")[index].pause()
        if(document.querySelectorAll("audio")[index].paused === false){
            this.props.changePlayStatus(true)
            let timer = setInterval(()=>{
                if(Math.floor(document.querySelectorAll("audio")[index].currentTime) === document.querySelectorAll(".ranges")[index].max){
                    clearInterval(this.props.timer)
                    document.querySelectorAll("audio")[index].currentTime = 0
                    document.querySelectorAll(".ranges")[index].value = 0
                    document.querySelectorAll(".duration-time")[index].textContent = this.timeFormate(
                        Math.floor(document.querySelectorAll("audio")[index].currentTime)
                    )
                    this.props.changePlayStatus(false)
                    this.progressBackGroudChange(0,100)
                    alert(1)
                }else{
                    document.querySelectorAll(".ranges")[index].value = Math.floor(
                        document.querySelectorAll("audio")[index].currentTime
                    ) 
                    document.querySelectorAll(".duration-time")[index].textContent = this.timeFormate(
                        Math.floor(
                            document.querySelectorAll("audio")[index].currentTime
                        ) 
                    )
                    this.progressBackGroudChange(
                        document.querySelectorAll(".ranges")[index].value,
                        Math.floor(
                            document.querySelectorAll("audio")[index].duration
                        ),
                        index
                    )
                }
            },1000)
            this.props.setTimerItem(timer)
        }else{
            this.props.changePlayStatus(false)
            clearInterval(this.props.timer)
        }
    }
    progressBackGroudChange(val,dur,index){
        document.querySelectorAll(".ranges")[index].style.backgroundImage = `-webkit-linear-gradient(left,red 0%,red ${(val / dur) * 100}%,white ${
            (val / dur) * 100
          }%,white 100%)`
    }
    changeState(id){
        this.props.getCurrentTargetId(id)
        this.props.showInputToggle === false ? this.props.changeShowInputToggleState(true) : this.props.changeShowInputToggleState(false)
    }
    paginationPart(pages) {
        let pagination = {}
        let itemDataTemp = []
        let itemDataTempI = []
        pagination.totalLength = this.props.xmlListData.length;
        pagination.partPage = window.innerWidth < 768 ? 6 : 8;
        pagination.pageTotal = Math.ceil(
          pagination.totalLength / pagination.partPage
        );
        pages = pages === undefined ? 1 : pages

        pagination.currentPage = pages;
        pagination.hasPage = pagination.currentPage > 1;
        pagination.hasNext = pagination.currentPage < pagination.totalLength;

        if(pagination.currentPage === pagination.pageTotal) pagination.hasNext = false
        if(pagination.currentPage > pagination.pageTotal) pagination.currentPage = pagination.pageTotal
        const minPage = pagination.currentPage * pagination.partPage - pagination.partPage + 1;
        const maxPage = pagination.currentPage * pagination.partPage;

        itemDataTempI = this.props.xmlListData
        itemDataTempI.forEach((key, index) => {
          let num = index + 1;
          if(num >= minPage && num <= maxPage) itemDataTemp.push(key);
        });
        this.props.setPagination(pagination)
        this.props.setItemData(itemDataTemp)
    }
}

const reactReduxStateToProps = state => ({
    singleData:state.getIn(['podcastItem','singleData']),
    xmlListData:state.getIn(['renderSingleForPodcast','xmlListData']).toJS(),
    contentToggle:state.getIn(['renderSingleForPodcast','contentToggle']),
    currentTargetId:state.getIn(['renderSingleForPodcast','currentTargetId']),
    isPlayed:state.getIn(['renderSingleForPodcast','isPlayed']),
    timer:state.getIn(['renderSingleForPodcast','timer']),
    showInputToggle:state.getIn(['renderSingleForPodcast','showInputToggle']),
    imgUrl:state.getIn(['renderSingleForPodcast','imgUrl']),
    paginationObj:state.getIn(['renderSingleForPodcast','paginationObj']),
    itemData:state.getIn(['renderSingleForPodcast','itemData']),
    itemDataTemp:state.getIn(['renderSingleForPodcast','itemDataTemp'])
})

const reactReduxDispatchToProps = dispatch => ({
    postXMLListData(data,imgUrl){
        const action = actions.postXMLListData(data,imgUrl)
        dispatch(action)
    },
    changeContentToggleState(status){
        const action = actions.changeContentState(status)
        dispatch(action)
    },
    getCurrentTargetId(id){
        const action = actions.getCurrentTargetId(id)
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
    },
    changeOpenSingleState(status){
        const action = actions.changeOpenSingleState(status)
        dispatch(action)
    },
    setPagination(obj){
        const action = actions.setPagination(obj)
        dispatch(action)
    },
    setItemData(data){
        const action = actions.setItemData(data)
        dispatch(action)
    },
    setItemDataTemp(data){
        const action = actions.setItemDataTemp(data)
        dispatch(action)
    },
    openSwitch(status){
        console.log(status)
        const action = importItemFromDailog.actions.dialogIsOpened(status)
        dispatch(action)
    },
    closeDailog(status){
        const action = importItemFromPodcastItemList.actions.hasGetData(status)
        dispatch(action)
    }
})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(RenderSingleForPodcast)