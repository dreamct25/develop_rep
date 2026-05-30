import React,{ PureComponent } from 'react'
import { connect } from 'react-redux'
import importItem from '../MusicVideoItemList'
import Dialog from '../Dialog/Dialog'
import Pagination from '../Pagination/Pagination'

const { actions,styles } = importItem
const { Show } = styles

class MusicVideoItemList extends PureComponent{
    constructor(props){
        super(props)
        this.getPageTarget = this.getPageTarget.bind(this)
        this.paginationPart = this.paginationPart.bind(this)
    }
    render() {
     return(
        <Show>
            <div className="row no-gutters">
                {this.props.itemData.map((item,index) => (
                <div className="col-md-4"  key={`item${index}`}>
                    <div className="items-card-outer-frame" onClick={this.goDetails.bind(this,item.trackId)} onMouseEnter={this.setCurrentPreviewState.bind(this,true,item.trackId)} onMouseLeave={this.setCurrentPreviewState.bind(this,false,item.trackId)}>
                        <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "items-card-outer items-card-outer-toggle" : "items-card-outer"}>
                            <div className="items-card" title={`${item.artistName} - ${item.trackName}`}>
                                <div className="img-outer">
                                    <div className="img" style={{backgroundImage:`url(${item.artworkUrl100.replace(/100x100/g,"999x999")})`}}>
                                        <div className="explain-title">
                                            <span>{item.artistName} - {item.trackName}</span>
                                        </div>
                                        <div className="explain">
                                            <span>曲風：{item.primaryGenreName}</span>
                                            <span>類型：{item.kind}</span>
                                            <span>曲長：{item.trackTimeMillis}</span>
                                            <span>發行日期：{item.releaseDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "items-card-frame items-card-frame-toggle" : "items-card-frame"}>
                            <span className={this.props.previewFrameToggle === false ? "items-card-frame-title" : "items-card-frame-title items-card-frame-title-toggle"}>Preview</span>
                        </div>
                    </div>
                </div>))}
            </div>
            <Pagination  paginationObjProps={this.props.paginationObj} paginationPartProps={this.paginationPart} />
            {this.props.hasGetData === true ? <Dialog posX={this.props.currentItemX} posY={this.props.currentItemY}/> : null}
        </Show>
     )   
    }
    componentDidMount(){
        window.addEventListener("click",this.getPageTarget)
        setTimeout(()=>{this.paginationPart()},100)
    }
    componentWillUnmount(){
        window.removeEventListener("click",this.getPageTarget)
    }
    getPageTarget(e){
        if(e.target.parentNode.className === "close-btn"){
            e.target.parentNode.parentNode.classList.remove("dialog-toggle")
            setTimeout(()=>this.props.changeState(false),700)
        }
    }
    goDetails(itemID,el){
        console.log(el.target.parentNode.parentNode.getBoundingClientRect())
        let { x,y } = el.target.parentNode.parentNode.getBoundingClientRect()
        this.props.changeCurrentItemY(Math.floor(y))
        this.props.changeCurrentItemX(Math.floor(x))
        this.props.goDetailsInDispatch(itemID)
    }
    setCurrentPreviewState(status,itemID){
        this.props.setCurrentTargetId(itemID)
        this.props.changePreviewFrameState(status)
    }
    paginationPart(pages) {
        let pagination = {}
        let itemDataTemp = []
        pagination.totalLength = this.props.renderItems.length;
        pagination.partPage = window.innerWidth <= 768 ? 8 : 18;
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

        this.props.setItemDataTemp(this.props.renderItems)
        this.props.setItemData([])
        this.props.itemDataTemp.forEach((key, index) => {
          let num = index + 1;
          if(num >= minPage && num <= maxPage) itemDataTemp.push(key);
        });
        this.props.setItemData(itemDataTemp)
        this.props.setPagination(pagination)
    }
}

const reactReduxStateToProps = state => ({
    renderItems:state.getIn(['main','newFilterItems']).toJS(),
    currentItemX:state.getIn(['musicVideoItem','currentItemX']),
    currentItemY:state.getIn(['musicVideoItem','currentItemY']),
    hasGetData:state.getIn(['musicVideoItem','hasGetData']),
    previewFrameToggle:state.getIn(['musicVideoItem','previewFrameToggle']),
    currentTargetId:state.getIn(['musicVideoItem','currentTargetId']),
    paginationObj:state.getIn(['musicVideoItem','paginationObj']),
    itemData:state.getIn(['musicVideoItem','itemData']),
    itemDataTemp:state.getIn(['musicVideoItem','itemDataTemp'])
})

const reactReduxDispatchToProps = dispatch => ({
    goDetailsInDispatch(itemID){
        dispatch(actions.getSingleItems(itemID))
    },
    changeState(status){
        const action = actions.showSingleDialog(status)
        dispatch(action)
    },
    changeCurrentItemX(val){
        const action = actions.getCurrentItemX(val)
        dispatch(action)
    },
    changeCurrentItemY(val){
        const action = actions.getCurrentItemY(val)
        dispatch(action)
    },
    changePreviewFrameState(status){
        const action = actions.changePreviewFrameToggle(status)
        dispatch(action)
    },
    setCurrentTargetId(txt){
        const action = actions.setCurrentTargetId(txt)
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
    }
})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(MusicVideoItemList)