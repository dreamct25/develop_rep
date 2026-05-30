import React,{ PureComponent } from 'react'
import { connect } from 'react-redux'
import importItem from '../SoftwareItemList'
import Dialog from '../Dialog/Dialog'
import Pagination from '../Pagination/Pagination'

const { actions,styles } = importItem
const { Show } = styles

class SoftwareItemList extends PureComponent{
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
                <div className={window.innerWidth <= 768 ? "col-md-6" : "col-md-3"}  key={`item${index}`}>
                    <div className="app-card-outer" onMouseEnter={this.setCurrentPreviewState.bind(this,true,item.trackId)} onMouseLeave={this.setCurrentPreviewState.bind(this,false,item.trackId)}>
                        <div className="app-icon">
                            <img src={item.artworkUrl100} alt=""/>
                        </div>
                        <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "app-explain app-explain-text-toggle" : "app-explain"}>
                            <span>{item.trackName}</span>
                            <span>{item.sellerName}</span>
                            <span>分類：{item.genres.join(" , ")}</span>
                            <div className={this.props.previewFrameToggle && this.props.currentTargetId === item.trackId ? "app-go-details-frame app-go-details-frame-toggle" : "app-go-details-frame"} onClick={this.goDetails.bind(this,item.trackId)}>Preview</div>
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
        setTimeout(()=>this.paginationPart(),100)
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
        let { x,y,height } = el.target.parentNode.parentNode.getBoundingClientRect()
        this.props.changeCurrentItemY(Math.floor(y - (height / 2)))
        this.props.changeCurrentItemX(Math.floor(x))
        this.props.goDetailsInDispatch(itemID)
    }
    setCurrentPreviewState(status,itemID){
        this.props.changePreviewFrameToggleState(status)
        this.props.getCurrentTargetId(itemID)
    }
    paginationPart(pages) {
        let pagination = {}
        let itemDataTemp = []
        pagination.totalLength = this.props.renderItems.length;
  
        pagination.partPage = 24;
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
    currentItemX:state.getIn(['softwareItem','currentItemX']),
    currentItemY:state.getIn(['softwareItem','currentItemY']),
    hasGetData:state.getIn(['softwareItem','hasGetData']),
    previewFrameToggle:state.getIn(['softwareItem','previewFrameToggle']),
    currentTargetId:state.getIn(['softwareItem','currentTargetId']),
    paginationObj:state.getIn(['softwareItem','paginationObj']),
    itemData:state.getIn(['softwareItem','itemData']),
    itemDataTemp:state.getIn(['softwareItem','itemDataTemp'])
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
    changePreviewFrameToggleState(status){
        const action = actions.changePreviewFrameToggle(status)
        dispatch(action)
    },
    getCurrentTargetId(id){
        const action = actions.getCurrentTargetId(id)
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

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(SoftwareItemList)
