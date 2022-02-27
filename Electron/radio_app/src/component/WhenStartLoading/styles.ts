import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        .loading-outer{
            position: relative;
            width:200px;
            height: 200px;
            opacity: 0;
            transition: .5s ease;
            .loading{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 5px solid white;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-radius: 50%;
                animation: loadings .7s linear infinite;
                transform: rotate(0turn);
                box-shadow: 0 0 4px 0 rgba(0,0,0,.7);
            }
            .loading-text{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                color: white;
                font-style: italic;
                font-size: 30px;
                text-shadow: 1px 1px 2px rgba(0,0,0,.7);
            }
            @keyframes loadings {
                100%{
                    transform: rotate(1turn);
                }
            }
            &.toggle{
                opacity: 1;
            }
        }
    `
}

export { Container }