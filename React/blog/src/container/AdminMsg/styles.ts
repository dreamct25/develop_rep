import styled from "styled-components";

export default styled.div`
    .msg-layout{
        .msg-list-header{
            display: grid;
            grid-template-columns: 20% 30% 10% 25% 15%;
            border-bottom: 2px solid rgba(30,30,30,.3);

            div{
                padding: 12px;
                font-weight: bold;
                font-size: 18px;
                color: white;
                text-shadow: 0 1px 3px rgba(0,0,0,.7);
            }
        }

        .msg-list{
            max-height: 81vh;
            overflow-x: hidden;
            overflow-y: auto;
            border-radius: 5px;
            margin: 10px 0;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 20px;
                background-color: rgba(255, 255, 255, 0.7);
            }

            .no-data{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-weight: bold;
                color: white;
                min-height: 50vh;
            }

            @media screen and (min-width:415px){
                .msg-list-item{
                    display: grid;
                    grid-template-columns: 20% 30% 10% 25% 15%;
                    align-items: center;
                    color: white;

                    &:nth-child(odd){
                        background-color: rgba(30,30,30,.8);
                    }

                    &:nth-child(even){
                        background-color: rgba(30,30,30,.5);
                    }

                    div{
                        margin: 12px;

                        &:nth-of-type(1),
                        &:nth-of-type(2){
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                        }
                    }
                    
                    
                    .btn-group{
                        display: flex;
                        justify-content: space-around;

                        div{
                            cursor: pointer;
                            user-select: none;

                            i{
                                pointer-events: none;
                            }
                        }
                    }
                }
            }

            @media screen and (max-width:414px){
                .msg-list-item{
                    color: white;

                    &:nth-child(odd){
                        background-color: rgba(30,30,30,.8);
                    }

                    &:nth-child(even){
                        background-color: rgba(30,30,30,.5);
                    }

                    .top{
                        display: grid;
                        grid-template-columns: 35% 65%;

                        .left,
                        .right{
                            div{
                                margin: 12px;

                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    
                    .bottom{
                        .btn-group{
                            display: grid;
                            grid-template-columns: 33.33% 33.33% 33.33%;
                            padding: 5px;

                            div{
                                cursor: pointer;
                                user-select: none;
                                text-align: center;
                                box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, 0.5);
                                border-radius: 5px;
                                padding: 5px 0 4px 0;

                                i{
                                    pointer-events: none;
                                }

                                &:nth-of-type(2){
                                    margin: 0 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .msg-list-footer{
            color: white;
            text-align: right;
            font-weight: bold;
            text-shadow: 0 1px 3px rgba(0,0,0,.7);
            margin-bottom: 10px;
        }
    }

    .action-modal-body{
        .top{
            display: flex;
            flex-direction: column;

            .text-area-outer{
                margin-top: 12px;
            }

            input,
            textarea{
                color: black;
                border-color: rgba(30,30,30,.3);

                &:focus{
                    border-color: rgba(30,30,30,0);
                }

                &:focus ~ p {
                    font-size: 17px;
                }

                &.lock{

                    &:not(:placeholder-shown){
                        border-color: rgba(30,30,30,0);
                    }

                    &:not(:placeholder-shown) ~ p {
                        font-size: 17px;
                    }
                }
            }

            p{
                color: rgba(30,30,30,.5);
            }

            fieldset{
                border-color: rgba(30,30,30,.3);
            }
        }

        .bottom{
            .title{
                font-weight: bold;
                color: rgba(30,30,30,.5);
                margin-bottom: 3px;
                font-size: 14.45px;
            }

            .res-msg-list-outer{
                .res-msg-list{
                    display: flex;
                    flex-direction: column;

                    .res-msg-list-item-outer{
                        border: .5px solid rgba(30,30,30,.3);
                        border-radius: 5px;
                        margin: 0 0 12px 0;

                        &:last-child{
                            margin: 0 0 0 0;
                        }

                        .res-msg-list-item{
                            padding: 5px 8px;

                            .res-msg-title{
                                display: flex;
                                justify-content: space-between;

                                .right-group{
                                    display: flex;
                                    gap: 10px;
                                }
                            }
                        }

                        .delete-msg-btn{
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            align-items: center;
                            height: 100%;
                            padding: 10px 0;
                            border-left: .5px solid rgba(30,30,30,.3);
                            cursor: pointer;
                            user-select: none;

                            i{
                                color: red;
                                pointer-events: none;
                            }
                        
                            @media screen and (max-width:576px){
                                border-left: unset;
                                border-top: .5px solid rgba(30,30,30,.3);
                            }
                        }
                    }
                }
                
                .no-data{
                    padding: 16px 8px;
                    border: .5px solid rgba(30,30,30,.3);
                    border-radius: 5px;
                    text-align: center;
                }
            }
        }

        .delete-context{
            text-align: center;
        }
    }
`