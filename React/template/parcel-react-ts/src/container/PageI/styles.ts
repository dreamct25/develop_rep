import styled,{ StyledComponent } from 'styled-components'

const container:StyledComponent<'div',any> = styled.div`
    .btn{
        color: white;
        background-color: rgb(30,30,30);
        padding: 5px 0;
        width: 100px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
    }
    .list-outer{
        .list-item{
            color: white;
            padding: 5px;
            width: 150px;
            border-radius: 5px;
            margin: 5px 0;
            &.pug{
                background-color: blue;
            }
            &.jsx{
                background-color: red;
            }
        }
    }
`

export default container