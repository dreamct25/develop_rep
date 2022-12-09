import styled from "styled-components";

export default styled.div`
    .no-data{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 84vh;
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
    
    .single-article-layout{
        position: relative;

        @media screen and (min-width:415px){
            &:after{
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                width: 1px;
                background-color: rgba(255,255,255,.5);
                transform: translateX(-4px);
                z-index: -1;
                box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
            }
        }
        
        

        .prev-angle,
        .next-angle{
            position: absolute;
            border-radius: 50%;
            background-color: rgb(100,100,100);
            cursor: pointer;
            user-select: none;
            z-index: 4;

            i{
                pointer-events: none;
                color: white;
            }
        }

        .prev-angle{
            top: 50%;
            left: 0;
            transform: translate(0,-50%);
            margin-left: 15px;
            padding: 5px 15px 5px 13px;

            @media screen and (max-width:414px){
                margin-left: 4px;
            }
        }

        .next-angle{
            top: 50%;
            right: 0;
            transform: translate(0,-50%);
            margin-right: -12px;
            padding: 5px 13px 5px 15px;

            @media screen and (max-width:414px){
                margin-right: 10px;
            }
        }

        .single-article{
            padding-left: 32px;
            overflow-x: hidden;
            overflow-y: scroll;
            height: 85vh;
            margin-right: 2px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 20px;
                background-color: rgb(210, 210, 210);
            }

            .article-main{
                position: relative;
                padding: 20px;
                min-height: 85vh;

                @media screen and (min-width:415px){
                    &:before{
                        content: '';
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        width: 1px;
                        background-color: rgba(255,255,255,.5);
                        box-shadow: 0 0 1px 0 rgba(0,0,0,.7);
                    }
                }

                .context{
                    color: white;
                    padding: 0 10px;
                    
                    .top{

                        .title{
                            font-weight: bold;
                            font-size: 30px;
                            text-shadow: 0 2px 3px rgba(0,0,0,.7);
                            margin-bottom: 16px;
                        }

                        img{
                            width: 100%;
                            border-radius: 5px;
                            box-shadow: 7px 7px 16px 0px rgba(30,30,30,.7);
                        }

                        blockquote{

                            padding: 0 12px;

                            p{
                                line-height: 33px;
                                letter-spacing: 3px;
                                text-align: justify;
                                text-shadow: 0 1px 2px rgba(0,0,0,.7);
                            }
                        }
                        
                    }

                    .bottom{
                        display: flex;
                        justify-content: flex-end;
                        gap: 5px;
                        padding: 5px 0;
                        font-size: 14px;
                        border-bottom: 1px solid rgba(255,255,255,.5);
                    }
                }
                
                .leave-msg-layout{

                    .leave-msg-input-groups,
                    .leave-res-input-groups{
                        display: flex;
                        flex-direction: column;
                        padding: 10px;

                        div{
                            &:nth-of-type(2){
                                margin: 10px 0;
                            }
                        }

                        .leave-msg-btn,
                        .leave-res-btn{
                            cursor: pointer;
                            user-select: none;
                            margin-top: -5px;
                            border-radius: 5px;
                            text-align: center;
                            background-color: rgb(30,30,30);
                            box-shadow: inset 0 0 16px 0 rgba(255,255,255,.5);
                            color: white;
                            padding: 5px 0;
                        }
                    }

                    .msg-list{
                        color: white;
                        padding: 0 10px;
                        border-top: 1px solid rgba(255,255,255,.5);
                        
                        .msg-list-item{
                            border-bottom: 1px solid rgba(255,255,255,.5);

                            &:last-child{
                                border-bottom: unset;
                            }

                            .msg-title,
                            .msg-content,
                            .msg-footer{
                                padding: 5px;
                            }

                            .msg-footer{
                                .res-btn{
                                    cursor: pointer;
                                    user-select: none;

                                    &:hover{
                                        color: rgb(0,230,255);
                                    }
                                }
                            }

                            .leave-res-group{
                                overflow: hidden;
                                max-height: 0;
                                transition: .5s ease;

                                &.active{
                                    max-height: 500px;
                                }

                                .res-list{
                                    overflow: hidden;
                                    overflow-y: scroll;
                                    max-height: 0;
                                    margin: 0 12px;
                                    transition: .5s ease;

                                    &::-webkit-scrollbar {
                                        width: 5px;
                                    }

                                    &::-webkit-scrollbar-thumb {
                                        border-radius: 20px;
                                        background-color: rgba(255, 255, 255, 0.7);
                                    }

                                    .res-list-item{
                                        border-bottom: 1px solid rgba(255,255,255,.5);

                                        &:last-child{
                                            border-bottom: unset;
                                        }
                                        
                                        .res-title,
                                        .res-content{
                                            padding: 5px;
                                        }

                                        .res-title{
                                            display: flex;
                                            justify-content: space-between;

                                            span{
                                                &:nth-of-type(2){
                                                    font-size: 14px;
                                                }
                                            }
                                        }
                                    }

                                    &.active{
                                        max-height: 200px;
                                    }
                                }
                            }

                            .msg-footer{
                                display: flex;
                                justify-content: flex-end;
                                font-size: 14px;
                                gap: 5px;
                            }
                        }
                    }
                }   
            }
            
            @media screen and (max-width:414px){
                padding-left: 0;
            }
        }
    }
`