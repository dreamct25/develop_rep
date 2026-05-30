import React from 'react'
import styles from '../SearchData/styles'
import Loading from '../Loading/Loading'

const { EmptyData } = styles
const SearchData = props => (
    (props.searchState !== 4) && <EmptyData>
        <Loading text={props.text} />
    </EmptyData>
)

export default SearchData