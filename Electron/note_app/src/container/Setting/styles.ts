import styled from "styled-components";
import { cssSetPropertys } from './types'

const { Container }: cssSetPropertys = {
    Container: styled.div`
        width: 100%;
        height: 96vh;
        background-color: rgba(0,0,0,.7);
        border-radius: 10px;
        position: relative;
        color: white;
        overflow: hidden;
        .setting-outer{
            .setting-title{
                display: flex;
                padding: 10px;
                position: relative;
                z-index: 1;
                cursor: move;
                user-select: none;
                .title{
                    font-weight: bold;
                    font-size: 18px;
                }
                .top-close{
                    position: fixed;
                    top: 0;
                    right: 0;
                    transform: translate(-13px,10px);
                    cursor: pointer;
                    user-select: none;
                }
            }
            .setting-body{
                padding: 0 10px;
                .font-size-input,
                .font-line-height-input{
                    span{
                        display: block;
                    }
                    input{
                        margin-top: 5px;
                        padding: 3px;
                        border-radius: 5px;
                        outline: none;
                        border: none;
                        width: 100%;
                    }
                }
                .font-size-input{
                    margin-right: 8px;
                }
                .font-style-group{
                    .font-style-list{
                        display: flex;
                        border-radius: 5px;
                        overflow: hidden;
                        margin-top: 5px;
                        .font-style-list-item{
                            text-align: center;
                            padding: 5px;
                            cursor: pointer;
                            user-select: none;
                            background-color: rgba(0,0,0,0);
                            width: 100%;
                            box-shadow: inset 0 0 0 0.3px rgb(255,255,255) ;
                            transition: .5s ease;
                            &.active{
                                color: black;
                                background-color: rgba(255,255,255,1);
                            }
                            &:first-child{
                                border-radius: 5px 0 0 5px;
                            }
                            &:last-child{
                                border-radius: 0 5px 5px 0;
                            }
                        }
                    }
                }
                .font-family-group{
                    .font-family-list-outer{
                        overflow-y: scroll;
                        overflow-x: hidden;
                        height: 200px;
                        margin: 5px 0;
                        &::-webkit-scrollbar {
                            width: 4px;
                            background-color: transparent;
                            border-radius:20px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(255, 255, 255, 0.7);
                            border-radius:20px;
                        }
                        .font-family-list-item{
                            padding: 5px;
                            cursor: pointer;
                            user-select: none;
                            background-color: rgba(0,0,0,0);
                            transition: .5s ease;
                            &.active{
                                color: black;
                                background-color: rgba(255,255,255,1);
                            }
                        }
                    }
                }
                
                .set-color-group{
                    display: grid;
                    grid-template-columns: auto auto;
                    grid-gap: 15px;
                    .font-color-group,
                    .typing-space-background-color-group{
                        position: relative;
                       .current-select-font-color,
                       .current-select-background-color{
                           width: 133px;
                           height:85px;
                           border-radius: 5px;
                           margin-top: 5px;
                           cursor: pointer;
                           user-select: none;
                       }
                       .select-font-color-box,
                       .select-background-color-box{
                           position: absolute;
                           top: 0;
                           opacity: 0;
                           z-index: -1;
                           transition: .5s ease;
                           &.toggle-font-box{
                               opacity: 1;
                               z-index: 1;
                               transform: translate(140px,-10px);
                           }
                           &.toggle-background-box{
                               opacity: 1;
                               z-index: 1;
                               transform: translate(-107px,-10px);
                           }
                           .react-colorful{
                               width: 100px;
                               height: 140px;
                           }
                       }
                       .select-font-color-box{
                           transform: translate(140px,0px);
                       }
                       .select-background-color-box{
                           transform: translate(-107px,0px);
                       }
                    }
                }
            }
        }
        
        .confirm-setting{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 10px;
            box-shadow: inset 0 0.5px 0.5px 0 rgb(255,255,255);
            cursor: pointer;
            user-select: none;
        }
    `
}

export default Container