import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .cast-modal{
            color:white;
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            overflow-x:hidden;
            overflow-y:scroll;
            opacity:0;
            z-index: -1;
            border-radius:10px;
            background-color:rgba(0,0,0,.3);
            backdrop-filter:blur(10px);
            box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
            width: 44%;
            margin:1% 0;
            transform: translate(63%, -5%);
            transition:.7s ease;
            .close{
                position:absolute;
                top:0;
                right:0;
                transform:translate(-25px,20px);
                background-color: white;
                padding: 3px 11.7px 1px 11.7px;
                border-radius: 50%;
                color: black;
                font-size: 22px;
                opacity:0.5;
                cursor: pointer;
                user-select:none;
                transition:.7s ease;
            }
            .close:hover{
                opacity:1;
            }
            .cast-modal-body{
                .cast-profile{
                    .img-outer{
                        padding:12px;
                        height: 380px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .cast-details-outer{
                        line-height:27px;
                        .cast-details{
                            padding:12px 0;
                            span{
                                display:block;
                            }
                            span:nth-of-type(1){
                                font-size:25px;
                                font-weight:bold;
                            }
                            span:nth-of-type(2){
                                font-size:20px;
                                font-weight:bold;
                            }
                        }
                    }
                    .cast-famous-video-outer{
                        padding-right:10px;
                        .cast-famous-video-title{
                            font-size:25px;
                            margin-bottom:5px;
                        }
                        .cast-famous-video-list{
                            display:flex;
                            overflow-x:auto;
                            overflow-y:hidden;
                            .cast-famous-video-list-item{
                                min-width:130px;
                                height:188px;
                                position: relative;
                                margin:0 5px;
                                cursor: pointer;
                                user-select:none;
                                img{
                                    width:100%;
                                    height:100%;
                                }
                                .famous-title{
                                    position: absolute;
                                    right:0;
                                    left:0;
                                    bottom: 0;
                                    .title-group{
                                        background:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,.8),rgba(0,0,0,.6),rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
                                        padding:1px 5px 3px 5px;
                                        span{
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 1;
                                            -webkit-box-orient: vertical;
                                        }
                                        span:nth-of-type(1){
                                            font-size:14px;
                                        }
                                        span:nth-of-type(2){
                                            font-size:10px;
                                        }
                                    }
                                }
                            }
                            .cast-famous-video-list-item:first-child{
                                margin:0 5px 0 0;
                            }
                            .cast-famous-video-list-item:last-child{
                                margin:0 0 0 5px;
                            }
                            .no-cast-famous-video{
                                line-height: 160px;
                                text-align: center;
                                width: 100%;
                            }
                        }
                        .cast-famous-video-list::-webkit-scrollbar {
                            width: 0;
                            height:4px;
                            background-color: transparent;
                        }
                        .cast-famous-video-list::-webkit-scrollbar-thumb {
                            background-color: rgba(255, 255, 255, 0.7);
                            border-radius:20px;
                        }
                    }
                    .cast-descript-outer{
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        padding:12px;
                        .cast-descript-title{
                            font-size:25px;
                            align-self:flex-start;
                        }
                        .cast-descript{
                            line-height:38px;
                            padding:0 8px;
                            text-align:justify;
                        }
                        .cast-no-descript{
                            padding:15px 8px;
                            text-align:center;
                        }
                    }       
                    .cast-movie-list-outer{
                        .title{
                            font-size:25px;
                            padding:0 12px;
                        }
                        .cast-movie-list-title{
                            margin:8px 0 15px 0;
                            display:grid;
                            grid-template-columns:50% 15% 20% 15%;
                            padding:0 12px;
                            font-size:18px;
                            span:nth-of-type(4){
                                text-align:center;
                            }
                        }
                        .cast-movie-list{
                            height:415px;
                            overflow-x:hidden;
                            overflow-y:scroll;
                            .list-item{
                                position:relative;
                                display:grid;
                                grid-template-columns:50% 15% 20% 15%;
                                align-items:center;
                                padding:20px 12px;
                                transition:.7s ease;
                                .title{
                                    margin-top:unset;
                                    display:flex;
                                    flex-direction:column;
                                    cursor: pointer;
                                    user-select:none;
                                    span{
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                    }
                                    span:nth-of-type(1){
                                        font-size:18px;
                                    }
                                    span:nth-of-type(2){
                                        font-size:15px;
                                    }
                                }
                                .movie-post{
                                    cursor: pointer;
                                    user-select:none;
                                }
                                .movie-post-toggle{
                                    opacity:1;
                                    z-index:15;
                                    transform:translate(-50%,0%);
                                }
                                div:nth-of-type(3){
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                }
                                div:nth-of-type(4){
                                    text-align:center;
                                }
                            }
                            .list-item:hover{
                                background-color:rgba(255,255,255,.7);
                                color:black;
                            }
                        }
                        .cast-movie-list::-webkit-scrollbar {
                            width: 5px;
                            height:0;
                            background-color: transparent;
                        }
                        .cast-movie-list::-webkit-scrollbar-thumb {
                            background-color: rgba(255, 255, 255, 0.7);
                            border-radius:20px;
                        }
                    }               
                }
            }
        }
        .cast-modal-toggle{
            opacity:1;
            z-index: 20;
            transform: translate(63%, 0);
        }
        .cast-modal::-webkit-scrollbar {
            width: 0px;
            height:0;
            background-color: transparent;
        }
        .post-img-outer{
            position:fixed;
            top:0;
            left:50%;
            bottom:0;
            transform:translate(-50%,0) scale(0.5);
            opacity:0;
            z-index: -1;
            margin:75px 0;
            box-shadow:0 0 5px 2px rgba(0,0,0,.7);
            overflow:hidden;
            border-radius:5px;
            transition:.7s ease;
            img{
                width:100%;
                height:100%;
            }
            .close-img{
                position:absolute;
                top:0;
                right:0;
                transform: translate(-20%, 20%);
                background-color: white;
                padding: 3px 11.7px 1px 11.7px;
                border-radius: 50%;
                color: black;
                font-size: 22px;
                opacity:0.5;
                cursor: pointer;
                user-select:none;
                transition:.7s ease;
            }
            .close-img:hover{
                opacity:1;
            }
        }
        .post-img-outer-toggle{
            opacity:1;
            z-index: 25;
            transform:translate(-50%,0) scale(1);
        }

        @media screen and (max-width:415px){
            .cast-modal{
                width:unset;
                transform: translate(0, -5%);
                .cast-modal-body{
                    .cast-profile{
                        .img-outer{
                            height: 600px;
                        }
                        .cast-details-outer{
                            .cast-details{
                                padding:12px;
                            }
                        }
                        .cast-famous-video-outer{
                            padding-left:unset;
                            padding:0 12px;
                        }
                        .cast-movie-list-outer{
                            .cast-movie-list-title{
                                grid-template-columns: 37% 20% 20% 23%;
                            }
                            .cast-movie-list{
                                .list-item{
                                    grid-template-columns: 37% 20% 20% 23%;
                                }
                            }
                        }
                    }
                }
            }
            .cast-modal-toggle{
                transform: translate(0, 0);
            }
            .post-img-outer{
                left:0;
                right:0;
                margin:50px 25px;
                transform:translate(0,0) scale(0.5);
            }
            .post-img-outer-toggle{
                transform:translate(0,0) scale(1);
            }
        }
    `,
}

export default cssSet