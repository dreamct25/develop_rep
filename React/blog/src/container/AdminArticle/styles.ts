import styled from "styled-components";

export default styled.div`
    .articles-layout{
        .article-category-bar{
            display: grid;
            grid-template-columns: 25% 25% 25% 25%;
            margin: 10px 0;
            border-radius: 5px;

            div{
                font-weight: bold;
                color: white;
                text-align: center;
                padding: 12px 0;
                background-color: rgba(30,30,30,.8);
                border-right: 1px solid rgba(255, 255, 255, 0.7);
                cursor: pointer;
                user-select: none;
                transition: .5s ease;

                &:first-child{
                    border-radius: 5px 0 0 5px;
                }

                &:last-child{
                    border-radius: 0 5px 5px 0;
                    border-right: unset;
                }

                &.active{
                    color: black;
                    background-color: rgba(255,255,255,.8);
                    box-shadow: inset 0 0 2px 0 rgba(30,30,30,.8) ,0 0 .7px 0 rgba(30,30,30,.8);
                }
            }
        }

        .article-list-header{
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

        .article-list{
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
                .article-list-item{
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
                .article-list-item{
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

        .article-list-footer{
            color: white;
            text-align: right;
            font-weight: bold;
            text-shadow: 0 1px 3px rgba(0,0,0,.7);
            margin-bottom: 10px;
        }
    }

    .add-article-btn{
        position: fixed;
        top: 0;
        right: 0;
        padding: 9px 16px;
        border-radius: 50%;
        backdrop-filter: blur(10px);
        font-size: 18px;
        box-shadow: inset 0 0 3px 0 rgba(255,255,255,.7);
        transform: translate(-50px, 70px);
        cursor: pointer;
        user-select: none;
        background-color: rgba(30,30,30,.7);

        i{
            color: white;
        }

        @media screen and (max-width:414px){
            transform: translate(-5px,55px);
        }
    }

    .action-modal-body{
        .modal-top-groups{
            display: flex;
            flex-direction: column;

            .input-outer{
                &:nth-of-type(2){
                    margin: 12px 0;
                }
                &:nth-of-type(3){
                    margin-bottom: 12px;
                }
            }

            input{
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

            .option-group{
                position: relative;

                .option-list-outer{
                    position: absolute;
                    left: 0;
                    right: 0;
                    background-color: white;
                    opacity: 1;
                    z-index: -1;
                    margin-top: 10px;
                    border-radius: 5px;
                    overflow: hidden;
                    border: 1px solid rgba(30,30,30,.3);

                    .list-item{
                        text-align: center;
                        padding: 8px 0;
                        cursor: pointer;
                        user-select: none;
                        transition: .5s ease;

                        &:hover{
                            color: white;
                            background-color: rgb(60,60,60);
                        }
                        
                        &.active{
                            color: white;
                            background-color: rgb(60,60,60);
                            box-shadow: inset 0 0 3px 0 rgba(255,255,255,.7);
                        }
                    }

                    &.active{
                        opacity: 1;
                        z-index: 5;
                    }

                    @media screen and (max-width:414px){
                        margin-top: 3px;
                    }
                }
            }

            .date-input{
                @media screen and (max-width:414px){
                    margin-top: 5px;
                }
            }
        }

        .wmde-markdown-var{
            margin-top: 5px;

            .cm-focused{
                outline: unset;
            }

            .cm-gutters{
                display: none;
            }

            .cm-activeLine{
                background-color: transparent;
            }

            .w-md-editor-toolbar{
                padding: 13px 5px 5px 5px;

                button{
                    height: auto;
                    padding: 2px 4px 4px 4px;
                }
            }
        }

        .delete-context{
            text-align: center;
        }
    }
`