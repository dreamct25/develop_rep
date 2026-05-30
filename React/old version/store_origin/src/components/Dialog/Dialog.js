import React,{ Component } from 'react'
import { connect } from 'react-redux'
import importItem from '../Dialog'
import RenderSingleForMusic from '../RenderSingleForMusic/RenderSingleForMusic'
import RenderSingleForMusicVideo from '../RenderSingleForMusicVideo/RenderSingleForMusicVideo'
import RenderSingleForMovie from '../RenderSingleForMovie/RenderSingleForMovie'
import RenderSingleForPodcast from '../RenderSingleForPodcast/RenderSingleForPodcast'
import RenderSingleForSoftware from '../RenderSingleForSoftware/RenderSingleForSoftware'
import { BrowserRouter,Route,Switch,withRouter } from 'react-router-dom'

const { actions,styles } = importItem
const { Show } = styles

class Dialog extends Component{
    constructor(props){
        super(props)
        this.positionDialog = this.positionDialog.bind(this)
    }
    render() {
     return(
        <Show className="dialog-outer">
            <div className={this.props.dialogIsOpen === false ? "dialog" : "dialog dialog-toggle"} ref={dialog=>this.dialog = dialog}>
                <Switch>
                    <Route exact path="/search_music" component={RenderSingleForMusic}></Route>
                    <Route exact path="/search_music_video" component={RenderSingleForMusicVideo}></Route>
                    <Route exact path="/search_movie" component={RenderSingleForMovie}></Route>
                    <Route exact path="/search_podcast" component={RenderSingleForPodcast}></Route>
                    <Route exact path="/search_software" component={RenderSingleForSoftware}></Route>
                </Switch>
                <div className="close-btn">
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>
        </Show>
     )   
    }
    componentDidMount(){
        this.resizeDialog()
        this.positionDialog()
    }
    componentWillUnmount(){
        this.props.openSwitch(false)
    }
    positionDialog(){
        if(window.innerWidth > 768){
            this.dialog.style.transformOrigin = `${this.props.posX}px ${this.props.posY}px`
        }
        setTimeout(()=>this.props.openSwitch(true),200)
    }
    resizeDialog(){
        switch(this.props.history.location.pathname){
            case "/search_music":
                
                if(window.innerWidth < 768){
                    this.dialog.style.transform = "translate(-58%,-56%) scale(1)"
                }else{
                    this.dialog.style.width = "100vh"
                }
                break
            case "/search_music_video":
                this.dialog.style.width = "90%"
                break
            case "/search_movie":
                this.dialog.style.width = "90%"
                break
            case "/search_podcast":
                if(window.innerWidth <= 768) return
                this.dialog.style.width = "94vh"
                break
            case "/search_software":
                if(window.innerWidth <= 768) return
                this.dialog.style.width = "100vh"
                break
        }
    }
}

const reactReduxStateToProps = state => ({
    dialogIsOpen:state.getIn(['dialog','dialogIsOpen'])
})

const reactReduxDispatchToProps = dispatch => ({
    openSwitch(status){
        const action = actions.dialogIsOpened(status)
        dispatch(action)
    }
})

export default withRouter(connect(reactReduxStateToProps,reactReduxDispatchToProps)(Dialog))
