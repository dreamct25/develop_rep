import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        background-color:rgb(30,30,30);
        min-height:100vh;
        .search-item-outer{
            padding:35px 0 15px 0;
        }
        @media screen and (max-width:415px){
            padding:0;
        }
    `,
}

export default cssSet