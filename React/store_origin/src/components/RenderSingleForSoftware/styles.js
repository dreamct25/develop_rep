import styled from 'styled-components'
const cssAll = {
    Show:styled.div`
        .single-app-item{
            padding: 10px 0;
            overflow-y: scroll;
            overflow-x: hidden;
            height: 780px;
            .single-app-item-title{
                display: flex;
                justify-content: space-between;
                span{
                    display: block;
                }
                .item-title{
                    padding: 5px 10px;
                    span:nth-of-type(1){
                        font-size: 25px;
                    }
                }
                .img-outer{
                    margin: 45px;
                    img{
                        border-radius:15px;
                    }
                    .bottom-groups{
                        display: flex;
                        align-self: flex-end;
                        margin:10px 0 0 0 ;
                        font-size: 25px;
                        .rating{
                            display: block;
                            background-color: rgba(100,100,100,.7);
                            text-align:center;
                            padding:0 5px;
                            border-radius: 8px;
                            font-size: 20px;
                            margin:0 3px;
                        }
                        .price{
                            display: block;
                            background-color: rgba(100,100,100,.7);
                            text-align:center;
                            padding:0 5px;
                            border-radius: 8px;
                            font-size: 20px;
                            margin:0 0 0 3px;
                        }
                    }
                }
            }
            @media screen and (max-width:768px){
                .single-app-item-title{
                    .item-title{
                        padding: 10px 20px;
                    }
                    .img-outer{
                        margin: 55px 15px 15px 0;
                    }
                }
            }
            @media screen and (max-width:414px){
                .single-app-item-title{
                    display: unset;
                    justify-content: unset;
                    .item-title{
                        padding: 10px 20px;
                    }
                    .img-outer{
                        display: flex;
                        justify-content: space-between;
                        margin: 0 15px 8px 15px;
                    }
                }
            }
            .singel-app-item-content{
                .carousel-outer{
                    #carouselExampleControls{
                        img{
                            margin: 0 13%;
                        }
                    }
                    @media screen and (max-width:768px){
                        .carousel-in-rwd-outer{
                            overflow: hidden;
                            overflow-x: scroll;
                            overflow-y: hidden;
                            .carousel-img-outer{
                                display: flex;
                                img{
                                    margin: 8px 8px;
                                }
                                img:first-child{
                                    margin: 8px 8px 8px 0;
                                }
                                img:last-child{
                                    margin: 8px 0 8px 8px;
                                }
                            }
                        }
                        .carousel-in-rwd-outer::-webkit-scrollbar {
                            width: 0px;
                        }
                    }
                }
                @media screen and (max-width:768px){
                    .carousel-outer{
                        margin: 8% auto;
                    }
                }
                @media screen and (max-width:414px){
                    .carousel-outer{
                        margin: unset;
                    }
                }
                .single-app-item-explain{
                    padding: 5px 20px;
                    span{
                        display: block;
                    }
                    .explain-groups{
                        text-align: right;
                        font-size: 18px;
                    }
                    .descript-outer{
                        padding: 8px 30px;
                        .descript-title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            span{
                            font-size: 20px;
                            text-align:left;
                            padding: 0;
                            }
                            .arrow{
                                transform: rotate(0deg);
                                transition:.7s ease;
                            }
                            .arrow-toggle{
                                transform: rotate(180deg);
                            }
                        }
                        .descript-text-outer{
                            overflow:hidden;
                            padding: 0 15px;
                            .descript-text{
                                margin-top: -100%;
                                transition: .7s ease;
                                span{
                                    font-size: 16px;
                                }
                            }
                            .descript-text-toggle{
                                margin-top: 0 !important;
                            }
                        }
                        @media screen and (max-width:414px){
                            .descript-text-outer{
                                padding: 0 5px;
                                .descript-text{
                                    margin-top: -1950px;
                                    span{
                                        padding: 5px 0;
                                    }
                                }
                            }
                        }
                    }
                    @media screen and (max-width:768px){
                        .descript-outer{
                            padding: 8px 0;
                        }
                    }
                    .update-outer{
                        padding: 8px 30px;
                        .update-title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            span{
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }
                            .arrow{
                                transform: rotate(0deg);
                                transition:.7s ease;
                            }
                            .arrow-toggle{
                                transform: rotate(180deg);
                            }
                        }
                        
                        .update-text-outer{
                            overflow:hidden;
                            padding: 0 15px;
                            .update-text{
                                margin-top: -100%;
                                transition: .7s ease;
                                font-size: 16px;
                                
                                span:nth-of-type(1){
                                    text-align:left;
                                }
                                span:nth-of-type(2){
                                    text-align:justify;
                                }
                                span:nth-of-type(3){
                                    text-align:right;
                                }
                            }
                            .update-text-toggle{
                                margin-top: 0 !important;
                            }
                        }
                        @media screen and (max-width:414px){
                            .update-text-outer{
                                padding: 0 5px;
                                span{
                                    padding: 5px 0;
                                }
                            }
                        }
                    }
                    @media screen and (max-width:768px){
                        .update-outer{
                            padding: 8px 0;
                        }
                    }
                    .support-outer{
                        padding: 8px 30px;
                        .support-text-title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            user-select: none;
                            span{
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }
                            .arrow{
                                transform: rotate(0deg);
                                transition:.7s ease;
                            }
                            .arrow-toggle{
                                transform: rotate(180deg);
                            }
                        }
                        .support-text-outer{
                            overflow:hidden ;
                            padding: 0 15px;
                            .support-text{
                                margin-top: -100%;
                                font-size: 15px;
                                transition:.7s ease;
                            }
                            .support-text-toggle{
                                margin-top: 0 !important;
                            }
                        }
                        @media screen and (max-width:414px){
                            .support-text-outer{
                                padding: 0 5px 0 5px;
                                .support-text{
                                    margin-top: -1995px;
                                    span{
                                        padding: 5px 0;
                                    }
                                }
                            }
                        }
                    }
                    @media screen and (max-width:768px){
                        .support-outer{
                            padding: 8px 0;
                        }
                    }
                }
                @media screen and (max-width:414px){
                    .single-app-item-explain{
                        padding: 5px 15px;
                    }
                }
            }
        }
        .single-app-item::-webkit-scrollbar {
            height: 0px;
        }
        @media screen and (max-width:768px){
            .single-app-item{
                height: 992px;
            }
        }
        @media screen and (max-width:414px){
            .single-app-item{
                height: 715px;
            }
        }
    `
}

export default cssAll