import styled,{ StyledComponent } from 'styled-components'

const container:StyledComponent<'div',any> = styled.div`
    .container{
        color: red;
    }
    .box{
        background-color: red;
        width: 100px;
        height: 100px;
        transition: .7s ease;
        &.toggle{
            background-color: blue;
        }
    }
`

export default container