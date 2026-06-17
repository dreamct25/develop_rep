import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    NoImageItem: styled.div`
        display:flex;
        justify-content:center;
        flex-direction:column;
        align-items:center;
        font-size:25px;
        font-style:italic;
        background-color:rgb(100,100,100);
        width:100%;
        height:100%;
    `,
}

export default cssSet