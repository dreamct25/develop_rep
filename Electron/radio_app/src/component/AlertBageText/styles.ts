import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        .alert-bage-text-outer{
            position:fixed;
            bottom: -10%;
            left: 0;
            right: 0;
            margin: 0 260px;
            opacity: 0;
            z-index: -1;
            transition: .7s ease;
            .alert-bage-text{
                background-color: rgba(255,255,255);
                color: black;
                text-align: center;
                padding: 10px 12px;
                border-radius: 5px;
            }
            &.toggle {
                bottom: 1%;
                opacity: 1;
                z-index: 10;
            }
        }
    `
}

export { Container }