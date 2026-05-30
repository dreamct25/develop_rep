import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'
import Styles from '../Header/styles'

const { HeadersOuter } = Styles

class Header extends Component{
    constructor(props){
        super(props)
        this.goHome = this.goHome.bind(this)
    }
    render() {
     return(
        <HeadersOuter>
            <div className="header" onClick={this.goHome}>
                <i className="fas fa-shopping-bag header-icon"></i>
                <h1>Store</h1>
            </div>
        </HeadersOuter>
     )   
    }
    goHome(){
        window.location.reload()
    }
}

export default withRouter(Header)