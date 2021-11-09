import styled, { StyledComponent } from 'styled-components'

interface cssSetPropertys {
    Show: StyledComponent<"div", any>
}

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .cast-modal-outer{
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            opacity:0;
            z-index: -1;
            transition:.7s ease;
            backdrop-filter:blur(10px);
            background-color:rgba(0,0,0,.3);
            padding:30px;
            overflow-x:hidden;
            overflow-y:scroll;
            min-height:100vh;
            .cast-modal{
                color:white;
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
                        .cast-profile-left{
                            padding:0 6px 12px 0;
                            .img-outer{
                                height: 345px;
                                img{
                                    width:100%;
                                    height:100%;
                                }
                            }
                            .cast-details{
                                padding:10px 10px 10px 0;
                                line-height:30px;
                                span{
                                    display:block;
                                }
                            }
                        }
                        .cast-profile-right{
                            padding:0 0 12px 6px;
                            .cast-movie-list-outer{
                                .title{
                                    font-size:25px;
                                    padding:0 12px;
                                }
                                .cast-movie-list-title{
                                    margin:8px 0 15px 0;
                                    display:grid;
                                    grid-template-columns:50% 15% 20% 15%;
                                    grid-column-gap:10px;
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
                                        grid-column-gap:10px;
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
                                    width: 2px;
                                    height:0;
                                    background-color: transparent;
                                }
                                .cast-movie-list::-webkit-scrollbar-thumb {
                                    background-color: rgba(255, 255, 255, 0.7);
                                    border-radius:20px;
                                }
                            }
                        }
                        .cast-descript-outer{
                            display:flex;
                            flex-direction:column;
                            justify-content:center;
                            align-items:center;
                            .cast-descript-title{
                                font-size:25px;
                                align-self:flex-start;
                            }
                            .cast-descript{
                                line-height:38px;
                                padding:0 8px;
                            }
                            .cast-no-descript{
                                padding:15px 8px;
                                text-align:center;
                            }
                        }                      
                    }
                }
            }
            .post-img-outer{
                position:fixed;
                top:0;
                left:50%;
                bottom:0;
                transform:translate(-50%,0) scale(0.5);
                opacity:0;
                z-index: -1;
                margin:20px 0;
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
        }
        .cast-modal-outer-toggle{
            opacity:1;
            z-index: 20;
        }
        .cast-modal-outer::-webkit-scrollbar {
            width: 5px;
            height:0;
            background-color: transparent;
        }
        .cast-modal-outer::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.7);
            border-radius:20px;
        }
    `,
}

export default cssSet