import styled from 'styled-components'

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

    .article-list-outer{

        @media screen and (min-width:415px){
            .article-list{
                padding: 10px;
                height: 79vh;
                overflow-y: auto;
                overflow-x: hidden;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 20px;
                    background-color: rgba(255, 255, 255, 0.7);
                }

                .article-item{
                    display: flex;
                    margin: 22px 22px 33px 22px;
                    overflow: hidden;
                    border-radius: 5px;
                    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
                    height: 250px;

                    &:hover{
                        .right{
                            .img{
                                opacity: 1;
                            }
                        }
                    }

                    .left{
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        padding: 18px 35px;
                        color: white;
                        width: 52%;
                        text-align: justify;

                        &:after{
                            content: '';
                            position: absolute;
                            top: 0;
                            right: 0;
                            left: 0;
                            bottom: 0;
                            z-index: -1;
                            background-color: rgb(30,30,30);
                        }
                        
                        
                        div{
                            &:nth-of-type(1){
                                font-size: 20px;
                                font-weight: bold;
                            }

                            &:nth-of-type(2){
                                align-self: flex-end;
                            }

                            &:nth-of-type(3){
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                text-overflow: ellipsis;
                                line-height: 33px;
                                width: 100%;
                            }

                            &:nth-of-type(4){
                                display: flex;
                                justify-content: space-between;
                                width: 100%;

                                div{
                                    display: unset;
                                    justify-content: unset;

                                    &:first-child{
                                        font-size: 16px;
                                    }
                                    
                                    &:last-child{
                                        cursor: pointer;
                                        user-select: none;

                                        &:hover {
                                            color: rgb(0,230,255);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .right{
                        width: 48.1%;
                        background-image: linear-gradient(90deg,rgba(30,30,30,0),rgba(30,30,30,1));
                        
                        .img{
                            height: 100%;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: cover;
                            opacity: .5;
                            position: relative;
                            z-index: -1;
                            transition: .5s ease;
                        }
                    }

                    &:nth-child(odd){
                        .left{
                            order: 2;
                        }
                        .right{
                            order: 1;
                        }
                    }

                    &:nth-child(even){
                        .left{
                            order: 1;
                        }
                        .right{
                            order: 2;
                            background-image: linear-gradient(90deg,rgba(30,30,30,1),rgba(30,30,30,0));
                        }
                    }

                    &:last-child{
                        margin: 22px 22px 0 22px;
                    }
                }
            }
        }
        
        @media screen and (max-width:414px){
            .article-list{
                padding: 10px;
                height: 73vh;
                margin-bottom: 16px;
                overflow-y: auto;
                overflow-x: hidden;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 20px;
                    background-color: rgba(255, 255, 255, 0.7);
                }

                .article-item{
                    position: relative;
                    margin: 22px 22px 33px 22px;
                    overflow: hidden;
                    border-radius: 5px;
                    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
                    height: 250px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    padding: 18px 35px;
                    color: white;
                    text-align: justify;
                    background-color: rgba(30,30,30,.7);

                    div{
                        &:nth-of-type(1){
                            font-size: 20px;
                            font-weight: bold;
                        }

                        &:nth-of-type(2){
                            align-self: flex-end;
                        }

                        &:nth-of-type(3){
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            text-overflow: ellipsis;
                            line-height: 33px;
                            width: 100%;
                        }

                        &:nth-of-type(4){
                            display: flex;
                            justify-content: space-between;
                            width: 100%;

                            div{
                                display: unset;
                                justify-content: unset;

                                &:first-child{
                                    font-size: 16px;
                                }
                                
                                &:last-child{
                                    cursor: pointer;
                                    user-select: none;

                                    &:hover {
                                        color: rgb(0,230,255);
                                    }
                                }
                            }
                        }
                    }

                    .img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: cover;
                        opacity: .5;
                        z-index: -1;
                    }

                    &:last-child{
                        margin: 22px 22px 0 22px;
                    }
                }
            }
        }
    }
`