import React from 'react'
import { connect } from 'react-redux'
import Styles from '../Footer/styles'

const { Footers } = Styles

const Footer = props => (
    <Footers>
        <div className={props.hasClick ? "footer-text footer-text-toggle" : "footer-text"}>
            <h6>Copy Right By Chen</h6>
        </div>
    </Footers> 
)



const reactReduxStateToProps = state => ({
    hasClick:state.getIn(['main','searchBtnHasClick'])
})

const reactReduxDispatchToProps = dispatch => ({})

export default connect(reactReduxStateToProps,reactReduxDispatchToProps)(Footer)