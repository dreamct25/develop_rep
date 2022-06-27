import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Styles from '../ShowItem/styles'
import MusicItemList from '../MusicItemList/MusicItemList'
import MusicVideoItemList from '../MusicVideoItemList/MusicVideoItemList'
import MovieItemList from '../MovieItemList/MovieItemList'
import PodcastItemList from '../PodcastItemList/PodcastItemList'
import EbookItemList from '../EbookItemList/EbookItemList'
import SoftwareItemList from '../SoftwareItemList/SoftwareItemList'
import SearchData from '../SearchData/SearchData'
import { Route,withRouter,Switch } from 'react-router-dom'

const { Show } = Styles

class ShowItem extends Component{
    constructor(props){
        super(props)
        this.searhCheck = this.searhCheck.bind(this)
    }
    render() {
        if(this.props.isSearching.status !== null){
            return(
            <Show>
                <div className="container-fluid">
                <SearchData searchState={this.props.isSearching} text={this.searhCheck(this.props.isSearching)}/>
                    {(this.props.isSearching.status !== 4) && <SearchData searchState={this.props.isSearching} text={this.searhCheck(this.props.isSearching)}/>}
                </div>
            </Show>)
        }else{
            return(
                <Show>
                    <span className="show-search">{this.props.txt}</span>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/search_music" component={MusicItemList}></Route>
                            <Route exact path="/search_music_video" component={MusicVideoItemList}></Route>
                            <Route exact path="/search_movie" component={MovieItemList}></Route>
                            <Route exact path="/search_podcast" component={PodcastItemList}></Route>
                            <Route exact path="/search_ebook" component={EbookItemList}></Route>
                            <Route exact path="/search_software" component={SoftwareItemList} ></Route>
                        </Switch>
                    </div>
                </Show>
            )   
        }
    }
    searhCheck(isSearchings){
        let elText = ""
        const waringTextItem = [{
            stateNum:1,
            stateStr:"搜尋中"
        },{
            stateNum:2,
            stateStr:"搜尋完成"
        },{
            stateNum:3,
            stateStr:"無搜尋資料，請重新輸入搜尋內容或選項"
        }]
        waringTextItem.forEach(key => {
            if(key.stateNum === isSearchings.status) elText = key.stateStr
        })
        return elText
    }
}

const reactReduxStateToProps = state => ({
    selectVal:state.getIn(['main','selectVal']),
    itemsTotal:state.getIn(['main','itemsTotal']),
    isSearching:state.getIn(['main','isSearching'])
})

const reactReduxDispatchToProps = dispatch => ({})

export default withRouter(connect(reactReduxStateToProps,reactReduxDispatchToProps)(ShowItem))