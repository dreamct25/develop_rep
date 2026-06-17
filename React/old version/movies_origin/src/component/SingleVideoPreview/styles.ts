import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        min-height:100vh;
        background-color:rgb(28,28,28);
        .single-container{
            padding:25px 0;
            .title{
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
                .title-group{
                    span{
                        display:block;
                        color:white;
                    }
                    span:nth-of-type(1){
                        font-size:40px;
                    }
                    span:nth-of-type(2){
                        font-size:20px;
                    }
                }
            }
            .single-else{
                margin-top:20px;
                span{
                    padding:3px 0;
                }
                .release-date{
                    display:grid;
                    grid-template-columns:30% 70%;
                    margin:0 3px;
                    border-radius:5px;
                    overflow:hidden;
                    span:nth-of-type(1){
                        font-weight:bold;
                        text-align:center;
                        color:black;
                        background-color:rgb(255,255,255);
                    }
                    span:nth-of-type(2){
                        text-align:center;
                        color:white;
                        box-shadow:inset -1px 0 2px 1px rgba(255, 255, 255, 0.7);
                        border-radius: 0 5px 5px 0;
                    }
                }
                .rate{
                    display:grid;
                    grid-template-columns:30% 70%;
                    margin:0 3px;
                    border-radius:5px;
                    overflow:hidden;
                    span:nth-of-type(1){
                        font-weight:bold;
                        color:black;
                        background-color:rgb(255,255,255);
                        text-align:center;
                    }
                    .rate-star{
                        display:flex;
                        justify-content:center;
                        box-shadow:inset -1px 0 2px 1px rgba(255, 255, 255, 0.7);
                        padding:0 3px 0 7px;
                        border-radius: 0 5px 5px 0;
                        span:nth-of-type(1){
                            background-color:unset;
                            .stars-group{
                                .stars{
                                    color:rgb(250,250,0);
                                    text-shadow:0 1px 1px rgba(0, 0, 0, 0.7);
                                }
                            }
                        }
                        span:nth-of-type(2){
                            color:white;
                            margin-left:5px;
                        }
                    }
                }
                .video-type{
                    display:grid;
                    grid-template-columns:30% 70%;
                    margin:0 3px;
                    border-radius:5px;
                    overflow:hidden;
                    span:nth-of-type(1){
                        font-weight:bold;
                        text-align:center;
                        color:black;
                        background-color:rgb(255,255,255);
                    }
                    span:nth-of-type(2){
                        text-align:center;
                        color:white;
                        box-shadow:inset -1px 0 2px 1px rgba(255, 255, 255, 0.7);
                        border-radius: 0 5px 5px 0;
                    }
                }
            }
            .single-descript{
                .descript{
                    text-align:justify;
                    color:white;
                    line-height:30px;
                }
            }
            .single-cast-group-outer-fram{
                margin:30px 0;
                .single-cast-group-title{
                    color:white;
                    font-weight:bold;
                    font-size:25px;
                    margin-bottom:10px;
                }
                .single-cast-group-outer{
                    border-radius:10px;
                    box-shadow:inset 0 0 10px 1px rgba(0,0,0,.7);
                    padding:10px;
                    width:100%;
                    overflow-x:auto;
                    overflow-y:hidden;
                    .single-cast-group{
                        display:flex;
                        .cast-card-outer{
                            margin:10px 0;
                            padding:0 10px;
                            .cast-card{
                                color:white;
                                border-radius:5px;
                                box-shadow:0 0 2px 1px rgba(255,255,255,.7);
                                cursor: pointer;
                                user-select:none;
                                .cast-card-img{
                                    border-radius:5px 5px 0 0;
                                    width:250px;
                                    height:360px;
                                    overflow:hidden;
                                    img{
                                        width:100%;
                                        height:100%;
                                    }
                                    .no-cast-img{
                                        display:flex;
                                        justify-content:center;
                                        flex-direction:column;
                                        align-items:center;
                                        font-size:25px;
                                        font-style:italic;
                                        background-color:rgb(100,100,100);
                                        width:100%;
                                        height:100%;
                                    }
                                }
                                .cast-title{
                                    border-radius:0 0 5px 5px;
                                    padding:5px;
                                    text-align:center;
                                    span{
                                        -webkit-line-clamp: 1;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                    }
                                }
                            }
                        }
                        .cast-card-outer:last-child{
                            padding:0 20px 0 10px;
                        }
                    }
                }
                .single-cast-group-outer::-webkit-scrollbar {
                    width: 2px;
                    height:5px;
                    background-color: transparent;
                }
                .single-cast-group-outer::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius:20px;
                }
            }
            .single-review-outer{
                color:white;
                .single-review-title{
                    color:white;
                    font-weight:bold;
                    font-size:25px;
                    margin-bottom:10px;
                }
                .single-review-item-outer{
                    border-radius:10px;
                    box-shadow:inset 0 0 10px 1px rgba(0,0,0,.7);
                    padding:15px 6px 10px 6px;
                    .single-review-item-title{
                        margin-bottom:10px;
                        padding:0 20px 10px 20px;
                        display:grid;
                        grid-template-columns:40% 30% 10% 20%;
                        border-bottom:0.1px solid rgba(255,255,255,.7);
                        span{
                            display:block;
                        }
                        span:nth-of-type(4){
                            text-align:right;
                        }
                    }
                    .single-review-item{
                        display:grid;
                        grid-template-columns:40% 30% 10% 20%;
                        padding:0 20px;
                        line-height:35px;
                        span{
                            display:block;
                        }
                        .stars-group{
                            .stars{
                                color:yellow;
                            }
                        }
                        span:nth-of-type(4){
                            text-align:right;
                            .time{
                                span{
                                    margin:0 6px;
                                }
                            }
                        }
                    }
                    .no-review{
                        text-align: center;
                        margin: 30px 0 20px 0;
                        font-size: 18px;
                    }
                }

                @media screen and (max-width:415px){
                    .single-review-item-outer{
                        .single-review-item-title{
                            grid-template-columns:33.33% 33.33% 33.33%;
                            span{
                                display:block;
                            }
                            span:nth-of-type(2){
                                text-align:center;
                            }
                            span:nth-of-type(3){
                                text-align:right;
                            }
                        }
                        .single-review-item{
                            grid-template-columns:33.33% 33.33% 33.33%;
                            span{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                            span:nth-of-type(2){
                                text-align:center;
                            }
                            span:nth-of-type(3){
                                text-align:right;
                                
                            }
                        }
                    }
                }
            }
            .single-preview-footer{
                .icon{
                    color: white;
                    text-align: center;
                    margin: 20px 0 0 0;
                    i{
                        margin-right:3px;
                    }
                }
                @media screen and (max-width:415px){
                    .icon{
                        margin: 20px 0;
                    }
                }
            }
        }
    `,
}

export default cssSet