import React,{ FC } from 'react'
import { useLocation } from 'react-router-dom'

const PageI:FC = ():JSX.Element => {
    const { state } = useLocation()
    return (
        <div>
            PageI
            <br />
            This is PageI content.
            <br />
            {state && `Route State - ${JSON.stringify(state)}`}
        </div>
    )
}

export default PageI