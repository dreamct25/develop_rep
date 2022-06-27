import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import importItem from '../Main'
import ShowItem from '../ShowItem/ShowItem'

const { actions,styles } = importItem

const { SearchBarOuter,ShowItemOuter } = styles

class Main extends Component{
    constructor(props){
        super(props)
        this.getCurrentSearchVal = this.getCurrentSearchVal.bind(this)
        this.searching = this.searching.bind(this)
        this.getCurrentSelectVal = this.getCurrentSelectVal.bind(this)
    }
    render() {
     return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <SearchBarOuter>
                        <div className={this.props.hasClick ? "search-bar search-bar-toggle" : "search-bar"}>
                            <input type="text" value={this.props.searchVal} onChange={this.getCurrentSearchVal} />
                            <select value={this.props.selectVal} onChange={this.getCurrentSelectVal}>
                                <option defaultValue disabled value="">-- 搜尋種類 --</option>
                                {this.props.selectItem.map((seletObj,index) => <option key={index} value={seletObj.selectTypeEn}>{seletObj.selectTypeZh}</option>)}
                            </select>
                            <div className="search-btn" onClick={this.searching}>Search</div>
                        </div>
                    </SearchBarOuter>
                </div>
            </div>
            <ShowItemOuter>
                {(this.props.hasClick === true) && <ShowItem itemsTotal={this.props.itemsTotal} items={this.props.items}  txt={(this.props.hasClick === true) && `搜尋關鍵字：${this.props.searchVal}`} />}
            </ShowItemOuter>
        </div>
     )   
    }
    componentDidUpdate(){
        (this.props.isSearching.status === 4) && this.showCurrentItem()
    }
    getCurrentSearchVal(e){
        const currentVal = e.target.value
        this.props.valChange(currentVal)
    }
    getCurrentSelectVal(e){
        const currentVal = e.target.value
        this.props.selectValChange(currentVal)
    }
    searching(){
        const searchStr = {
            searchVal:this.props.searchVal,
            selectVal:this.props.selectVal
        }

        if(searchStr['searchVal'] === ""){
            alert("請輸入搜尋文字")
            return
        }else if (searchStr['selectVal'] === ""){
            alert("請選擇搜尋種類")
            return
        }

        this.props.hasClickStateChange(true)
        this.props.postVal(searchStr.searchVal,searchStr.selectVal,this.props.history)
    }
    showCurrentItem(){
         this.props.componentOption.forEach(itemKey => {
            if(this.props.selectVal === itemKey.currentSelect) {
                this.props.history.push(itemKey.routeName)
                this.props.changeIsSearchingDefault()
            }
        })
    }
}

const reactReduxStateToProps = state => ({
    items:state.getIn(['main','newFilterItems']).toJS(),
    itemsTotal:state.getIn(['main','itemsTotal']),
    searchVal:state.getIn(['main','searchVal']),
    selectVal:state.getIn(['main','selectVal']),
    hasClick:state.getIn(['main','searchBtnHasClick']),
    selectItem:state.getIn(['main','selectItem']).toJS(),
    isSearching:state.getIn(['main','isSearching']),
    componentOption:state.getIn(['main','componentOption']).toJS()
})

const reactReduxDispatchToProps = dispatch => ({
    valChange(val){
        const action = actions.getVal(val)
        dispatch(action)
    },
    selectValChange(val){
        const action = actions.getSelectVal(val)
        dispatch(action)
    },
    postVal(searchVal,selectVal,routeProps){
        dispatch(actions.getItems(searchVal,selectVal,routeProps))
    },
    hasClickStateChange(status){
        const action = actions.hasClick(status)
        dispatch(action)
    },
    changeIsSearchingDefault(){
        const action = actions.isSearchingDefault(null,null)
        dispatch(action)
    }
})

export default withRouter(connect(reactReduxStateToProps,reactReduxDispatchToProps)(Main))