import styled, { StyledComponent } from "styled-components";

export interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

const cssSet: cssSetPropertys = {
    Show: styled.div`
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: unset;
        }
    `
}

export default cssSet
