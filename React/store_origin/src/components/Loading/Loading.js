import React from 'react'
import importItem from '../Loading/styles'

const { Show } = importItem 

const Loading = props => (
    <Show>
        <div className="loading-outer">
            <div className="loading"></div>
            <span className="loading-text">{props.text}</span>
        </div>
    </Show>
)

export default Loading