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
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 20px;
        padding: 5px 15px 10px 14px;
        line-height: 30px;
        border-radius: 5px;
        margin: 5px 7px;
        div:nth-of-type(3){
            display: flex;
        }
    }

    .color-preview{
        position: fixed;
        top: 15%;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 20px;
        padding: 5px 15px 10px 14px;
        line-height: 30px;
        border-radius: 5px;
        margin: 5px 7px;
        width: 80px;
        height: 94px;
        box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.5),0 0 6px 1px rgba(0, 0, 0, 0.5);

        .color-preview-frame{
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
            font-size: 13px;
        }
    }
`

export default container