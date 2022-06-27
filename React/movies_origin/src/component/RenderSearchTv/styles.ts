import styled from 'styled-components'
import { cssSetPropertys } from './types'

const cssSet: cssSetPropertys = {
    Show: styled.div`
        min-height:100vh;
        .search-tv{
            .search-tv-header{
                color:white;
                .search-tv-title{
                    text-align:center;
                    font-size:35px;
                    font-weight:bold;
                    margin-bottom: 20px;
                }
                .search-tv-header-middle-group{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .search-tv-totals{
                        text-align:right;
                        margin:5px 12px;
                        font-size:18px;
                    }
                    .filter-group-outer{
                        display:flex;
                        justify-content:flex-end;
                        margin:0 12px;
                        .filter-group{
                            position: relative;
                            text-align:center;
                            .filter-btn{
                                padding:5px 20px;
                                background-color:rgba(0,0,0,.7);
                                position: relative;
                                z-index:3;
                                cursor: pointer;
                                user-select:none;
                                border-radius:5px;
                                transition:.7s ease;
                                box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
                            }
                            .filter-btn-toggle{
                                border-radius:5px 5px 0 0;
                            }
                            .filter-list{
                                background-color:rgba(0,0,0,.7);
                                position: absolute;
                                top:34px;
                                left:0;
                                right:0;
                                bottom:0;
                                z-index:8;
                                overflow:hidden;
                                height:0;
                                opacity:0;
                                backdrop-filter:blur(2px);
                                transition:.7s ease;
                                border-radius:0 0 5px 5px;
                                box-shadow:inset 0 0 2px 0 rgba(255,255,255,.7);
                                .filter-list-item{
                                    cursor: pointer;
                                    user-select:none;
                                }
                                .filter-list-item:nth-of-type(1){
                                    padding-top:6px;
                                }
                                .filter-list-item:nth-of-type(2){
                                    padding:3px 0;
                                }
                                .filter-list-item:nth-of-type(3){
                                    padding-bottom:6px;
                                }
                            }
                            .filter-list-toggle{
                                opacity:1;
                                height:92px;
                            }
                        }
                    }
                }
                .search-tv-header-middle-group-toggle{
                    display:block;
                }
            }
            .search-tv-body{
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .poster-card{
                    position: relative;
                    overflow:hidden;
                    border-radius:5px;
                    margin:12px;
                    color:white;
                    height:450px;
                    .poster-card-fram {
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        font-weight:bold;
                        position:absolute;
                        top:0;
                        right:0;
                        left:0;
                        bottom:0;
                        background:linear-gradient(0deg,rgba(0,0,0,.9),rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.3),rgba(0,0,0,.1),rgba(0,0,0,0));
                        opacity:0;
                        z-index:5;
                        cursor: pointer;
                        user-select:none;
                        transition:.7s ease;
                    }
                    .poster-card-fram:hover{
                        opacity:1;
                    }
                    .poster-img{
                        height:100%;
                        .img{
                            background-position:top center;
                            background-repeat:no-repeat;
                            background-size:cover;
                            min-height:100%;
                        }
                    }
                    .poster-title{
                        position: absolute;
                        bottom:0;
                        right:0;
                        margin-left:10px;
                        backdrop-filter:blur(10px);
                        background-color:rgba(0,0,0,.3);
                        transform: translate(-5px, -38px);
                        padding: 2px 6px;
                        border-radius: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                    .rate{
                        display:flex;
                        align-items:center;
                        position: absolute;
                        top:0;
                        right:0;
                        backdrop-filter:blur(10px);
                        background-color:rgba(0,0,0,.3);
                        transform: translate(-5px, 7px);
                        padding: 2px 6px;
                        border-radius: 5px;
                        .stars{
                            font-size:12px;
                            color:yellow;
                            margin-left:5px;
                        }
                    }
                    .release-date{
                        position: absolute;
                        bottom:0;
                        right:0;
                        backdrop-filter:blur(10px);
                        background-color:rgba(0,0,0,.3);
                        transform: translate(-5px, -5px);
                        padding: 2px 6px;
                        border-radius: 5px;
                    }
                }
                .no-result{
                    color:white;
                    text-align:center;
                }
            }
            .search-tv-footer{
                margin:20px 0;
                .icon{
                    color: white;
                    text-align: center;
                    margin-top: 20px;
                    i{
                        margin-right:3px;
                    }
                }
            }
        }
    `,
}

export default cssSet