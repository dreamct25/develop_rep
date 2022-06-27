import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        .search-group-outer{
            position:fixed;
            top:2%;
            right:0;
            z-index: 12;
            display:flex;
            background-color:white;
            border-radius:20px;
            overflow:hidden;
            transform:translateX(-20px);
            transition:.7s ease;
            box-shadow:0 0 4px 0 rgba(0,0,0,.3);
            .search-group{
                display:flex;
                margin-right:-282px;
                transition:.7s ease;
                input{
                    border:none;
                    outline:none;
                    background-color:transparent;
                    padding-left:10px;
                }
                select{
                    border: none;
                    outline: none;
                    -webkit-appearance: none;
                }
            }
            .search-group-toggle{
                margin-right:0px;
            }
            .search-btn{
                position: relative;
                z-index:5;
                color:black;
                background-color:white;
                padding:6px 10px;
                border-radius:50%;
                transition:.7s ease;
                cursor: pointer;
                user-select:none;
            }
            .search-btn-toggle{
                border-radius:0 20px 20px 0;
            }
        }
        .search-group-outer-toggle{
            top:-100%;
        }
        .right-list-outer{
            position: fixed;
            top:0;
            right:0;
            bottom:0;
            z-index:10;
            opacity:1;
            transform:translateX(0px);
            background-color:rgba(0,0,0,.3);
            backdrop-filter:blur(10px);
            transition:.7s ease;
            .right-list{
                height:100vh;
                padding:0 20px;
                overflow-y:scroll;
                .poster-card{
                    width:250px;
                    padding:20px 0;
                    user-select:none;
                    cursor: pointer;
                    .poster-img{
                        position: relative;
                        img{
                            width:100%;
                            height:100%;
                        }
                        .rate{
                            display:flex;
                            align-items:center;
                            color:white;
                            position: absolute;
                            top:0;
                            right:0;
                            backdrop-filter:blur(10px);
                            transform:translate(-10%, 20%);
                            background-color:rgba(0,0,0,.3);
                            padding:0 5px;
                            border-radius:5px;
                            .stars{
                                margin-left:3px;
                                color:yellow;
                            }
                        }
                        .release-date{
                            color:white;
                            position: absolute;
                            bottom:0;
                            right:0;
                            backdrop-filter:blur(10px);
                            transform:translate(-5%,-20%);
                            background-color:rgba(0,0,0,.3);
                            padding:0 5px;
                            border-radius:5px;
                        }
                    }
                    .poster-card-body{
                        color:white;
                        padding:10px 5px;
                        .title-group{
                            span{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                            span:nth-of-type(1){
                                font-size:18px;
                                font-weight:bold;
                            }
                            span:nth-of-type(2){
                                font-size:13px;
                            }
                        }
                    }
                }
                .poster-card:first-child{
                    padding:17px 0 30px 0;
                }
                .poster-card:last-child{
                    padding:30px 0 10px 0;
                }
                .more-info{
                    cursor: pointer;
                    user-select:none;
                    background-color:white;
                    padding:5px 15px;
                    text-align:center;
                    color:black;
                    border-radius:5px;
                    margin-bottom:20px;
                }
            }

            .right-list::-webkit-scrollbar {
                width: 2px;
                background-color: rgb(100, 100, 100);
            }
            .right-list::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.7);
            }
        }

        .outer-active{
            opacity:0;
            transform:translateX(400px);
        }
        @media screen and (max-width: 415px) {
            .search-group-outer{
                top:4%;
                transform:translateX(-15px);
                .search-group{
                    margin-right:-322px;
                }
                .search-group-toggle{
                    margin-right:0px;
                }
            }
            .search-group-outer-toggle{
                top:-100%;
            }
            .right-list-outer{
                bottom:unset;
                opacity:1;
                transform:translateY(0);
                .right-list{
                    .poster-card{
                        width:100%
                    }
                    .more-info{
                        margin-bottom:180px;
                    }
                }
            }
            .outer-active{
                opacity:0;
                transform:translateY(-100%);
            }
        }
    `,
}

export default cssSet