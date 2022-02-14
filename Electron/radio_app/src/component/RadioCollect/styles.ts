import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        .collect-radio-center-outer{
            margin: 10px 100px;
            position: relative;
            border-radius:10px;
            background: radial-gradient(closest-corner,rgba(0,0,0,.8),rgba(0,0,0,.6));
            box-shadow: 0 0 22px 13px rgba(0,0,0,.7);
            transition: .7s ease;
            .collect-radio-content{
                position: relative;
                z-index: 2;
                padding: 15px;
                .colletct-single-radio-header{
                    font-size: 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .toggle-right-list{
                        width: 40px;
                        height: 20px;
                        background-color: white;
                        position: relative;
                        border-radius: 20px;
                        opacity: 0.2;
                        cursor: pointer;
                        user-select: none;
                        transition: .7s ease;
                        .toggle-button{
                            background-color: white;
                            box-shadow: inset 0 0 1px 0 rgba(0,0,0,.7);
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 20px;
                            height: 20px;
                            border-radius:50% ;
                            transition: .7s ease;
                            &.active{
                                left: 20px;
                            }
                        }
                        &.active{
                            background-color: rgb(8,232,222);
                        }
                        .tooltip {
                            color: black;
                            font-size: 15px;
                            position: absolute;
                            background-color: rgb(255,255,255);
                            border-radius: 6.4px;
                            padding: 6px;
                            transform: translate(-23px,-36px);
                            width: 87px;
                            opacity: 0;
                            z-index: -1;
                            transition: .7s ease;
                            box-shadow: 0 0 5px 0 rgba(0,0,0,.7);

                            &:after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 50%;
                                width: 0;
                                height: 0;
                                border: 6px solid transparent;
                                border-top-color: rgb(255,255,255);
                                border-bottom: 0;
                                transform: translate(-5px, 27px);
                            }
                            &.active{
                                opacity: 1;
                                z-index: 2;
                            }
                        }
                        &:hover{
                            opacity: 1;
                        }
                    }
                }
                .colletct-single-radio-body{
                    span{
                        display: block;
                    }
                    .at-start-tipe{
                        text-align: center;
                        padding: 18px 0 25px 0;
                    }
                    .current-program-date{
                        text-align: right;
                        margin:10px 0;
                    }
                    .current-play-time-list-outer{
                        overflow: hidden;
                        margin-top: 15px;
                        .current-play-time-list-title{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 10px;
                        }
                        .current-play-time-list{
                            overflow-y: scroll;
                            overflow-x: hidden;
                            height: 200px;
                            &::-webkit-scrollbar {
                                width: 4px;
                                background-color: rgb(30,30,30);
                                border-radius:20px;
                            }
                            &::-webkit-scrollbar-thumb {
                                background-color: rgba(255, 255, 255, 0.7);
                                border-radius:20px;
                            }
                            .current-play-time-list-item{
                                padding: 5px 0;
                                color: white;
                                &.active{
                                    color: rgb(8,232,222);
                                    font-weight: bold;
                                }
                                &.already-play{
                                    color: gray;
                                }
                            }
                        }
                    }
                }
                
            }
            &.toggle{
                margin: 10px 260px;
            }
        }
        .collect-list-outer-frame{
            position: fixed;
            top:30px;
            left: 0;
            bottom: 0;
            width: 250px;
            transform: translateX(-250px);
            background: linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,.8),rgba(0,0,0,.6),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
            transition: .7s ease;
            z-index: 5;
            .search-collect-radio-outer{
                input{
                    width: -webkit-fill-available;
                    margin: 10px 11px 10px 15px;
                    border-radius:20px;
                    padding: 4px 10px;
                    border: none;
                    outline: none;
                    font-size: 18px;
                    &::placeholder{
                        font-size: 15px;
                        text-align: center;
                    }
                }
            }
            .collect-list-outer{
                overflow-x: hidden;
                overflow-y: scroll;
                height: 95.5vh;
                .collect-list-item{
                    padding: 15px 11px 0 15px;
                    .img-outer{
                        overflow:hidden;
                        border-radius: 5px;
                        position: relative;
                        .img{
                            min-height:160px;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            cursor: pointer;
                            user-select:none;
                        }
                        .radio-title{
                            position:absolute;
                            text-align: center;
                            left: 0;
                            right:0;
                            bottom: 0;
                            background-color: rgba(0,0,0,.7);
                            padding:2px 5px;
                            line-height: 27px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp:1;
                            transform: translateY(35px);
                            transition: .7s ease;
                        }
                        .delete-collect-btn{
                            position: absolute;
                            top: 0;
                            right: 0;
                            margin:5px;
                            padding:3px 5.13px 5px 5.13px;
                            font-size: 18px;
                            background-color: rgba(0,0,0,.5);
                            backdrop-filter:blur(10px);
                            border-radius: 50%;
                            transform: translateY(-35px);
                            cursor: pointer;
                            user-select: none;
                            z-index: 5;
                            transition: .7s ease;
                        }
                        .is-playing-frame{
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            opacity: 0;
                            z-index: -1;
                            background-color: rgba(0,0,0,.7);
                            font-size: 60px;
                            font-weight: bold;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-shadow:0 0 10px rgba(255, 255, 255, 0.7);
                            transition: .7s ease;
                            animation: lightText 1s linear infinite;
                            &.toggle{
                                opacity: 1;
                                z-index: 2;
                            }
                        }
                        @keyframes lightText {
                            0%{
                                text-shadow:0 0 10px rgba(255, 255, 255, 0.7);
                                font-size: 60px;
                            }
                            50%{
                                text-shadow:0 0 0 rgba(255, 255, 255, 0.7);
                                font-size: 50px;
                            }
                            100%{
                                text-shadow:0 0 10px rgba(255, 255, 255, 0.7);
                                font-size: 60px;
                            }
                        }
                        &:hover{
                            .radio-title{
                                transform: translateY(0px);
                            }
                            .delete-collect-btn{
                                transform: translateY(0px);
                            }
                        }
                    }
                    &:first-child{
                        padding: 0 11px 0 15px;
                    }
                    &:last-child{
                        padding: 15px 11px 15px 15px;
                    }
                }
                .no-data{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                }
                &::-webkit-scrollbar {
                    width: 4px;
                    background-color: transparent;
                    border-radius:20px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius:20px;
                }
            }
            &.toggle{
                transform: translateX(0px);
            }
        }
    `
}

export { Container }