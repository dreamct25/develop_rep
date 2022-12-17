import styled,{ createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        position: relative;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;

        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 98vh;
            background-color: rgb(30,30,30);

            @media screen and (max-width:414px) {
                min-height: 97vh;
            }
        }
    }
`

export const Styles = styled.div`
    .center{
        position: relative;
        z-index: 10;
        text-align: center;

        @media screen and (max-width:414px) {
            width: 414px;
        }

        .remain-title,
        .remain-middle,
        .remain-text {
            margin-bottom: 10px;
            color: white;
            font-size: 45px;
            transition: .5s ease;
            transform: translateY(20px);
            opacity: 0;

            @media screen and (max-width:414px) {
                font-size: 32px;
            }

            &.active{
                opacity: 1;
                transform: translateX(0);
            }
        }

        .remain-title{
            font-size: 55px;

            @media screen and (max-width:414px) {
                font-size: 32px;
            }
        }
    }

    .language-option-layout{
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        transform: translateY(-40px);
        transition: .5s ease;
        color: white;
        z-index: 2;
        margin: 5px;

        .current-language-outer{
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 2px 0 rgba(255,255,255,.7);
            padding: 3px 5px 5px 5px;
            border-radius: 5px;
            width: 160px;
            cursor: pointer;
            user-select: none;
            backdrop-filter: blur(5px);

            @media screen and (max-width:1024px){
                width: 180px;
                padding: 5px;
            }

            svg{
                width: 20px;
                height: 20px;

                line,
                path,
                polyline{
                    fill: none;
                    stroke: white;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                }
            }
            .current-language{
                margin-left: 5px;
            }
        }

        .language-option-list-outer{
            position: relative;

            .language-option-list {
                max-height: 0;
                opacity: 0;
                background-color: rgba(30,30,30,.7);
                border-radius: 5px;
                transition: all .5s;
                position: absolute;
                top: 5px;
                left: 0;
                right: 0;
                overflow: hidden;
                box-shadow: inset 0 0 2px rgb(255 255 255 / 70%);
                backdrop-filter: blur(5px);
    
                .options {
                    text-align: center;
                    padding: 8px;
                    cursor: pointer;
                    user-select: none;
                    transition: .5s ease;
    
                    &.active {
                        background-color: rgb(255,255,255);
                        color: black;
                        box-shadow: inset 0 0 2px 1px rgba(0,0,0,.7);
                    }
                }

                &.active{
                    opacity: 1;
                    max-height: 100vh;
                }
            }
        }

        &.active{
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .footer{
        position: fixed;
        z-index: 2;
        right: 0;
        bottom: 0;
        color: white;
        box-shadow: 0 0 2px 0 rgba(255,255,255,.7);
        transform: translateX(265px);
        padding: 3px 8px 5px 8px;
        font-size: 14px;
        border-radius: 5px 0 0 0;
        backdrop-filter: blur(5px);
        transition: .5s ease;

        @media screen and (max-width:414px){
            font-size: 14px;
        }

        &.active{
            transform: translateX(0px);
        }
    }

    &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(30,30,30,.5);
    }
`