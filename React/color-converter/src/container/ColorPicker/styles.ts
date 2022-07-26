import styled from 'styled-components'
import { containerType } from '.'

const container:containerType = styled.div`
    align-self: center;
    .picker{
        width: 600px;
        height: 600px;
        canvas{
            position: absolute
        }
    }

    
    .board-info{
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 20px;
        padding: 5px 15px 10px 14px;
        line-height: 30px;
        border-radius: 5px;
        margin: 5px;
        div:nth-of-type(3){
            display: flex;
        }
    }
`

export default container