import React,{ PureComponent } from 'react'
import { connect } from 'react-redux'
import importItem from '../EbookItemList'
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
                <div className="col-md-3"  key={`item${index}`}>
                    <div className="items-card-outer-frame" onMouseEnter={this.setCurrentPreviewState.bind(this,true,item.trackId)}>
                        <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "items-card-outer items-card-outer-toggle" : "items-card-outer"}>
                            <div className="items-card" title={`${item.artistName} - ${item.trackName}`}>
                                <div className="img-outer">
                                    <div className="img" style={{backgroundImage:`url(${item.artworkUrl100.replace(/100x100/g,"400x600")})`}}></div>
                                </div>
                            </div>
                        </div>
                        <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "items-card-frame items-card-frame-toggle" : "items-card-frame"}>
                            <span className={this.props.previewFrameToggle === false ? "items-card-frame-title" : "items-card-frame-title items-card-frame-title-toggle"}>{item.description}</span>
                            <div className="go-details-btn-outer">
                                <div className="go-details-btn" onClick={this.setCurrentPreviewState.bind(this,false,item.trackId)}>關閉</div>
                            </div>
                        </div>
                    </div>
                    <div className="explain-groups">
                        <div className="explain-title">
                            <span>{item.artistName}<br/>{item.trackName}</span>
                        </div>
                        <div className="explain">
                            <span>分類：{item.genres.join(" , ")}</span>
                            <span>發行日期：{item.releaseDate}</span>
                        </div>
                    </div>
                </div>))}
            </div>
            <Pagination  paginationObjProps={this.props.paginationObj} paginationPartProps={this.paginationPart} />
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
    setCurrentPreviewState(status,itemID){
        this.props.setCurrentTargetId(itemID)
        this.props.changePreviewFrameState(status)
    }
    paginationPart(pages) {
        
        let pagination = {}
        let itemDataTemp = []
        pagination.totalLength = this.props.renderItems.length;
  
        pagination.partPage = 16;
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
    currentItemX:state.getIn(['ebookItem','currentItemX']),
    currentItemY:state.getIn(['ebookItem','currentItemY']),
    previewFrameToggle:state.getIn(['ebookItem','previewFrameToggle']),
    currentTargetId:state.getIn(['ebookItem','currentTargetId']),
    paginationObj:state.getIn(['ebookItem','paginationObj']),
    itemData:state.getIn(['ebookItem','itemData']),
    itemDataTemp:state.getIn(['ebookItem','itemDataTemp'])
})

const reactReduxDispatchToProps = dispatch => ({
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