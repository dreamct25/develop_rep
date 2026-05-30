import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../PodcastItemList'
import Dialog from '../Dialog/Dialog'
import Pagination from '../Pagination/Pagination'

const { actions,styles } = importItem
const { Show } = styles

class PodcastItemList extends Component{
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
                    <div className="items-card">
                        <div className="img-outer">
                            <img src={item.artworkUrl600.replace(/600x600/g,"170x170")} alt=""/>
                        </div>
                        <div className="explain-outer">
                            <div className="explain">
                                <span>專輯：{item.collectionName}</span>
                                <span>系列：{item.genres.join(" , ")}</span>
                                <span>類型：{item.primaryGenreName}</span>
                                <span title={`${item.artistName} - ${item.trackName}`} onClick={this.goDetails.bind(this,item.trackId)}>{item.artistName} - {item.trackName}</span>
                            </div>
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
        setTimeout(() => {this.paginationPart()},1000);
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
        let { x,y,height,width } = el.target.parentNode.parentNode.getBoundingClientRect()
        this.props.changeCurrentItemY(Math.floor(y + (height / 2)))
        this.props.changeCurrentItemX(Math.floor(x - (width / 2)))
        this.props.goDetailsInDispatch(itemID)
    }
    paginationPart(pages) {
        let pagination = {}
        let itemDataTemp = []
        pagination.totalLength = this.props.renderItems.length;
  
        pagination.partPage = window.innerWidth <= 768 ? 8 : 12;
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
    currentItemX:state.getIn(['podcastItem','currentItemX']),
    currentItemY:state.getIn(['podcastItem','currentItemY']),
    hasGetData:state.getIn(['podcastItem','hasGetData']),
    paginationObj:state.getIn(['podcastItem','paginationObj']),
    itemData:state.getIn(['podcastItem','itemData']),
    itemDataTemp:state.getIn(['podcastItem','itemDataTemp'])
})

const reactReduxDispatchToProps = dispatch => ({
    clearSingleData(data){
        const action = actions.clearSingleData(data)
        dispatch(action)
    },
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

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(PodcastItemList)
