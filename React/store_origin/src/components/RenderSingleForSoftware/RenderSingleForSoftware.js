import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../RenderSingleForSoftware'

const { actions,styles } = importItem
const { Show } = styles

class RenderSingleForSoftware extends Component{
    constructor(props){
        super(props)
        this.changeSupportToggle = this.changeSupportToggle.bind(this)
        this.changeDescriptToggle = this.changeDescriptToggle.bind(this)
        this.changeUpdateToggle = this.changeUpdateToggle.bind(this)
    }
    render() {
     return(
        <Show>
            <div className={window.innerWidth <= 768 ? "" : "container-fluid"}>
                {this.props.singleData.map((item,index) => (
                    <div className="single-app-item" key={index}>
                        <div className="single-app-item-title">
                            <div className="item-title">
                                <span>{item.trackName}</span>
                                <span>{item.sellerName}</span>
                            </div>
                            <div className="img-outer">
                                <img src={item.artworkUrl100} alt=""/>
                                <div className="bottom-groups">
                                    <span className="rating">{item.trackContentRating}</span>
                                    <span className="price">{item.formattedPrice}</span>
                                </div>
                            </div>
                        </div>
                        <div className="singel-app-item-content">
                            <div className="carousel-outer">
                                {window.innerWidth > 768 ?
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            item[item.ipadScreenshotUrls.length === 0 || window.innerWidth < 768 ?"screenshotUrls":"ipadScreenshotUrls"].map((urls,index)=>
                                                index === 0 ? 
                                                <div className="carousel-item active" key={index}>
                                                    <img src={urls} className="d-block" alt=""/>
                                                </div> : <div className="carousel-item">
                                                <img src={urls} className="d-block" alt=""/>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div> : 
                                <div className="carousel-in-rwd-outer">
                                    <div className="carousel-img-outer">
                                        {item[item.ipadScreenshotUrls.length === 0 || window.innerWidth < 768 ?"screenshotUrls":"ipadScreenshotUrls"].map((urls,index)=>(
                                            <img src={urls} key={index} alt=""/>
                                        ))}
                                    </div>
                                </div>}
                            </div>
                            <div className="single-app-item-explain">
                                <div className="explain-groups">
                                    <span>用戶評分數：{item.averageUserRatingForCurrentVersion.toFixed(1)}</span>
                                    <span>分類：{item.genres.length === 0 ? item.genres.join("") : item.genres.join(" , ")}</span>
                                </div>
                                <div className="descript-outer" onClick={this.changeDescriptToggle}>
                                    <div className="descript-title">
                                        <span>App 內容說明</span>
                                        <i className={this.props.descriptToggle ? "fas fa-chevron-down arrow arrow-toggle" : "fas fa-chevron-down arrow"}></i>
                                    </div>
                                    <div className="descript-text-outer">
                                        <div className={this.props.descriptToggle ? "descript-text descript-text-toggle" : "descript-text"}>
                                            <span>{item.description}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="update-outer" onClick={this.changeUpdateToggle}>
                                    <div className="update-title">
                                        <span>更新內容</span>
                                        <i className={this.props.updateToggle ? "fas fa-chevron-down arrow arrow-toggle" : "fas fa-chevron-down arrow"}></i>
                                    </div>
                                    <div className="update-text-outer">
                                        <div className={this.props.updateToggle ? "update-text update-text-toggle" : "update-text"}>
                                            <span>更新內容 Ver {item.version}</span>
                                            <span>{item.releaseNotes}</span>
                                            <span>{item.currentVersionReleaseDate.split("T")[0]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="support-outer">
                                    <div className="support-text-title" onClick={this.changeSupportToggle}>
                                        <span>支援機型</span>
                                        <i className={this.props.supportToggle ? "fas fa-chevron-down arrow arrow-toggle" : "fas fa-chevron-down arrow"}></i>
                                    </div>
                                    <div className="support-text-outer">
                                        <span className={this.props.supportToggle ? "support-text support-text-toggle" : "support-text"}>{item.supportedDevices.join(" , ")}</span>
                                    </div>
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
    changeSupportToggle(){
        this.props.supportToggle ? this.props.changeSupportToggle(false) : this.props.changeSupportToggle(true)
    }
    changeDescriptToggle(){
        this.props.descriptToggle ? this.props.changeDescriptToggle(false) : this.props.changeDescriptToggle(true)
    }
    changeUpdateToggle(){
        this.props.updateToggle ? this.props.changeUpdateToggle(false) : this.props.changeUpdateToggle(true)
    }
    
}

const reactReduxStateToProps = state => ({
    singleData:state.getIn(['softwareItem','singleData']),
    supportToggle:state.getIn(['renderSingleForSoftware','supportToggle']),
    descriptToggle:state.getIn(['renderSingleForSoftware','descriptToggle']),
    updateToggle:state.getIn(['renderSingleForSoftware','updateToggle'])
})

const reactReduxDispatchToProps = dispatch => ({
    changeSupportToggle(status){
        const action = actions.supportToggleState(status)
        dispatch(action)
    },
    changeDescriptToggle(status){
        const action = actions.descriptToggleState(status)
        dispatch(action)
    },
    changeUpdateToggle(status){
        const action = actions.updateToggleState(status)
        dispatch(action)
    }
})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(RenderSingleForSoftware)