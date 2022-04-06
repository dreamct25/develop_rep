import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        width: 100%;
        height: 96vh;
        background-color: rgba(30,30,30,.7);
        color: white;
        .top-close{
            position: fixed;
            top: 0;
            right: 0;
            transform: translate(-13px,10px);
        }
        .font-color-group{
            .font-color-input-group{
                display: flex;
                justify-content: center;
                input{
                    width: 70px;
                    margin-right: 5px;
                    padding: 3px;
                    text-align: center;
                    border-radius: 5px;
                    outline: none;
                    border: none;
                }
            }
        }
        .confirm-setting{
            margin-top: auto;
        }
    `
}

export default Container