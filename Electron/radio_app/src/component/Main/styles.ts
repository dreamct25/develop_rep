import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        position: relative;
        min-height: 98.5vh;
        background-image: url('../../asset/img/main-bg.jpg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        user-select: none;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(3px);
            z-index: -1;
        }
        margin: 5px;
        border-radius: 5.5px;
        overflow: hidden;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.7);
        .top-bar{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 33px;
            background-color: rgb(60,60,60);
            z-index: 20;
            padding: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-bar-title{
                font-size: 15px;
            }
            .top-bar-controller{
                display: flex;
                .abount-text{
                    margin:0 8px;
                    font-size: 14px;
                    cursor: pointer;
                    user-select: none;
                }
                .min{
                    background-color: rgb(255,214,10);
                    height:13px;
                    width:13px;
                    border-radius: 50%;
                    font-size: 7px;
                    color:rgba(0,0,0,.5);
                    .min-icon{
                        transform: translate(2px,3px);
                        opacity: 0;
                        transition: .5s ease;
                    }
                }
                .full{
                    background-color: rgb(50,215,75);
                    height:13px;
                    width:13px;
                    margin: 0 5px;
                    border-radius: 50%;
                    font-size: 9px;
                    color:rgba(0,0,0,.5);
                    .full-icon{
                        transform: translate(2.5px,2px);
                        opacity: 0;
                        transition: .5s ease;
                    }
                }
                .close{
                    background-color: rgb(255,69,58);
                    height:13px;
                    width:13px;
                    border-radius: 50%;
                    font-size: 11px;
                    color:rgba(0,0,0,.5);
                    .close-icon{
                        transform: translate(2.5px,0.5px);
                        opacity: 0;
                        transition: .5s ease;
                    }
                }
                &:hover{
                    .min-icon,
                    .full-icon,
                    .close-icon{
                        opacity: 1;
                    }
                }
            }
        }
        .change-language-list{
            text-align:center;
            position: absolute;
            top: 32px;
            right: 0;
            z-index: 0;
            margin:5px 5px 0 0;
            color: black;
            overflow: hidden;
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
            .change-language-switch{
                padding: 5px 6px;
                background-color: white;
                position: relative;
                z-index: 2;
            }
            .language-list-item-outer{
                margin-top:-53px;
                transition:.7s ease;
                border-top:0.1px solid rgba(0,0,0,.7);
                .language-list-item{
                    padding:5px 0;
                    background-color: white;
                    transition:.7s ease;
                    &.active{
                        color:white;
                        background-color: black;
                    }
                    &:hover{
                        color:white;
                        background-color: black;
                    }
                }
                &.toggle{
                    margin-top: 0;
                }
            }
        }
        .top-option-group{
            position: absolute;
            left: 0;
            right: 0;
            top: -10%;
            margin: 0 260px;
            overflow: hidden;
            border-radius: 10px;
            display: flex;
            z-index: 1;
            transition: .7s ease;
            .go-radio-list,
            .go-collect-list{
                background-color: rgba(0,0,0,.7);
                color:white;
                padding: 10px 20px;
                width: 100%;
                text-align: center;
                cursor: pointer;
                user-select: none;
                transition: .7s ease;
                backdrop-filter:blur(10px);
                box-shadow: inset 0 0 3px 0.5px rgba(255,255,255,.7);
                &.active{
                    background-color: white;
                    color: black;
                    box-shadow: inset 0 0 3px 0.5px rgba(0,0,0,.7);
                }
            }

            .go-radio-list{
                border-radius: 10px 0 0 10px;
            }
            .go-collect-list{
                border-radius: 0 10px 10px 0;
            }
            &.toggle{
                top: 6%;
            }
        }
    `
}

export { Container }