import styled, { StyledComponent } from 'styled-components'

interface cssSetPropertys {
    Show: StyledComponent<"div", any, {}, never>
}

const cssSet: cssSetPropertys = {
    Show: styled.div`
        min-height:100vh;
    `,
}

export default cssSet