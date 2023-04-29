import React,{ FC } from 'react'
import { useLocation } from 'react-router-dom'

const PageII:FC = ():JSX.Element => {
    const { search } = useLocation()
    const { value:[key,property] } = new URLSearchParams(search).entries().next()

    return (
        <div>
            PageII
            <br />
            This is PageII content.
            <br />
            {search && `Route Search Key：${key} - Value：${property}`}
        </div>
    )
}

export default PageII