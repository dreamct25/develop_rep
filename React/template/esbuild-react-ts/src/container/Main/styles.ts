import { styled } from '@linaria/react'

const container = styled.div`
    h1{
        color: blue;
    }
    .route-layout{
        margin: 5px 0;
        background-color: blue;
        border-radius: 5px;
        width: 301px;
        padding: 5px;
        color: white;
    }
    .btn-group{
        display: flex;
        gap: 5px;
        
        div{
            background-color: rgb(30,30,30);
            color: white;
            cursor: pointer;
            user-select: none;
            padding: 5px;
            border-radius: 5px;
        }
    }
`
export default container