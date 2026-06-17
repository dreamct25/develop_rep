import { styled } from '@linaria/react'

export default styled.div`

    .search-tv{
        display: grid;
        grid-template-rows: auto auto 1fr;
        gap: 12px;
        height: calc(100vh - 79px);

        &.toggle {
            grid-template-rows: auto 1fr;

            .search-filter-group {
                display: none;
            }
        }

        .search-tv-header {
            color:white;

            .search-tv-title {
                text-align: center;
                font-size: 35px;
                font-weight: bold;
                margin-bottom: 25px;
                
                &.with-search {

                    div {

                        &:first-child {
                            font-size: 35px;
                        }

                        &:last-child {
                            margin-top: 12px;
                            font-size: 20px;
                        }
                    }
                }
            }

            .search-tv-totals {
                text-align: right;
                margin: 0 12px;
                font-size: 18px;
            }
        }

        .search-filter-group {
            display: grid;
            grid-template-columns: 68% 32%;
            gap: 6px;
            margin: 0 18px 0 12px;

            @media screen and (max-width: 990px) {
                grid-template-columns: 58% 42%;
            }

            @media screen and (max-width: 768px) {
                display: block;
                margin: 0 12px;

                .filter-item-list-outer-frame {
                    margin-top: 6px;
                }
            }

            .catagory-list-outer-frame,
            .filter-item-list-outer-frame {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 6px;

                .catagory-list-outer,
                .filter-item-list-outer {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    gap: 6px;

                    .left-btn,
                    .right-btn {
                        padding: 8px 12px;
                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                        border-radius: 5px;
                        cursor: pointer;
                        user-select: none;
                        backdrop-filter: blur(6px);
                        background-color: rgba(30, 30, 30, .3);
                    
                        i {
                            color: white;
                            pointer-events: none;
                        }
                    }

                    .catagory-list,
                    .filter-item-list {
                        overflow-y: hidden;
                        overflow-x: auto;
                        display: grid;
                        grid-template-columns: repeat(16, 88px);
                        gap: 6px;
                        border-radius: 5px;

                        &::-webkit-scrollbar {
                            display: none;
                        }

                        .catagory-item,
                        .filter-item {
                            color: white;
                            padding: 8px 12px 6px 12px;
                            box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                            border-radius: 5px;
                            backdrop-filter: blur(6px);
                            background-color: rgba(30, 30, 30, .3);
                            cursor: pointer;
                            user-select: none;
                            text-align: center;
                            transition: .5s ease;

                            &.active {
                                color: black;
                                background-color: rgba(255, 255, 255, .7);
                                box-shadow: inset 0 0 2px 0 rgba(30,30,30,.7);
                            }
                        }
                    }

                    .filter-item-list {
                        grid-template-columns: repeat(3, 115px);
                    }
                }

                .catagory-reset-btn,
                .filter-item-reset-btn {
                    color: white;
                    padding: 8px 12px;
                    box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                    border-radius: 5px;
                    backdrop-filter: blur(6px);
                    background-color: rgba(30, 30, 30, .3);
                    cursor: pointer;
                    user-select: none;
                }
            }
        }

        .search-tv-body-outer {
            position: relative;
            height: 100%;
            margin: 0 12px;
            overflow: hidden;
            border-radius: 5px;

            .search-tv-body {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow-y: auto;
                overflow-x: hidden;

                &::-webkit-scrollbar {
                    width: 8px;
                    height: 0;
                    box-shadow: inset 0 0 5px 0 rgba(255, 255, 255, 0.7);
                    border-radius: 20px;
                }
    
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, .5);
                    border-radius: 20px;
                }

                .tv-list {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media screen and (max-width: 991px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (max-width: 576px) {
                        grid-template-columns: repeat(1, 1fr);
                    }

                    .poster-card {
                        position: relative;
                        overflow: hidden;
                        border-radius:5px;
                        color: white;
                        height: 450px;

                        .poster-card-mask {
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
                            z-index: 2;
                            cursor: pointer;
                            user-select:none;
                            transition:.7s ease;

                            &:hover{
                                opacity:1;
                            }
                        }

                        .poster-img{
                            height:100%;

                            .img{
                                background-image: var(--poster-img);
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
                            backdrop-filter:blur(10px);
                            background-color:rgba(0,0,0,.3);
                            margin: 0 5px 5px 0;
                            padding: 5px 6px;
                            border-radius: 5px;
                            
                            span {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }

                        .rate{
                            display:flex;
                            align-items:center;
                            position: absolute;
                            top:0;
                            right:0;
                            backdrop-filter:blur(10px);
                            background-color:rgba(0,0,0,.3);
                            margin: 5px 5px 0 0;
                            padding: 5px 6px;
                            border-radius: 5px;
                            
                            .stars{
                                font-size:12px;
                                color:yellow;
                                margin-left:5px;
                            }
                        }

                        .release-date{
                            position: absolute;
                            top:0;
                            left:0;
                            backdrop-filter:blur(10px);
                            background-color:rgba(0,0,0,.3);
                            margin: 5px 0 0 5px;
                            padding: 5px 6px;
                            border-radius: 5px;
                        }
                    }
                }

                .no-result {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color:white;
                    text-align:center;
                    height: 100%;
                }
            }
        }
    }
`