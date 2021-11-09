import styled, { StyledComponent } from 'styled-components'

interface cssSetPropertys {
    Show: StyledComponent<"div", any, {}, never>
}

const cssSet: cssSetPropertys = {
    Show: styled.div`
        background-color:rgb(30,30,30);
        min-height:100vh;
        .search-item-outer{
            padding:35px 12px;
        }
    `,
}

export default cssSet