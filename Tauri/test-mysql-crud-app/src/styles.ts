import { styled } from '@linaria/react'

export default styled.div`
    .container {

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;

            h1{
                font-size: 35px;
                font-weight: bold;
                font-style: italic;
                padding: 20px 0;
            }

            .add-btn{
                background-color: rgb(0,162,255);
                box-shadow: inset 0 0 3px 1px rgba(255,255,255,.7);
                padding: 10px 12px;
                width: 95px;
                color: white;
                text-align: center;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                user-select: none;
            }
        }

        .main{
            display: flex;
            justify-content: center;

            .tables{
                box-shadow: 0 0 1px 1px rgba(255,255,255,.7);
                border-radius: 5px;
                overflow: hidden;
                min-width: 96.5vw;

                .table-header{
                    display: grid;
                    grid-template-columns: 20% 20% 40% 20%;
                    
                    div{
                        padding: 12px;
                        box-shadow: 0 0 .5px .5px rgba(255,255,255,.7);
                    }
                }

                .table-body{
                    height: 70vh;
                    overflow-X: hidden;
                    overflow-y: auto;

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
                        height: 70vh;
                        font-size: 20px;
                        font-weight: bold;
                    }

                    .row{
                        display: grid;
                        grid-template-columns: 20% 20% 40% 20%;

                        div{
                            padding: 12px;
                            box-shadow: 0 0 .5px .5px rgba(255,255,255,.7);
                            margin: 0;
                        }

                        .row-btns{
                            display: flex;
                            padding: 0;

                            div{
                                box-shadow: unset;
                                width: 50%;
                                height: 100%;
                                text-align: center;
                                font-weight: bold;
                                box-shadow: inset 0 0 3px .5px rgba(255,255,255,.7),0 0px .5px .5px rgba(255,255,255,.7);

                                &:nth-of-type(1){
                                    background-color: rgb(85,85,255);
                                    margin: 0.5px;
                                    cursor: pointer;
                                    user-select: none;
                                }

                                &:nth-of-type(2){
                                    background-color: rgb(255,51,51);
                                    margin: 0.5px;
                                    cursor: pointer;
                                    user-select: none;
                                }
                            }
                        }
                    }
                }
            }
        }

        .footer{
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translate(-50%,0);

            h6{
                font-weight: bold;
            }
        }

        .bottom{
            position: fixed;
            bottom: 0;
            right: 0;
            margin: 14px 16px;

            .row{
                display: flex;
                justify-content: center;
                align-items: center;

                .title{
                    font-weight: bold;
                    font-size: 16px;
                    margin-right: 10px;
                }

                .icons-group{
                    display: flex;
                    a {
                        display: block;
                        font-weight: 500;
                        color: #646cff;
                        text-decoration: inherit;

                        &:hover {
                            color: #535bf2;
                        }

                        .logo {
                            will-change: filter;
                            transition: 0.75s;
                            weight: 25px;
                            height: 25px;
                            padding: 0;

                            &.vite{

                                &:hover {
                                    filter: drop-shadow(0 0 10px #747bff);
                                }
                            }

                            &.tauri{
                                margin: 0 5.5px 0 8px;
                                &:hover {
                                    filter: drop-shadow(0 0 10px #24c8db);
                                }
                            }

                            &.react{
                                margin: 0 10px 0 5.5px;

                                &:hover {
                                    filter: drop-shadow(0 0 10px #61dafb);
                                }
                            }

                            &.typescript{
                                &:hover {
                                    filter: drop-shadow(0 0 10px #0066FF);
                                }
                            }
                        }
                    }
                }
            }
        }

        .modal-body{
            .input-group{
                display: grid;
                grid-template-columns: 50% 50%;
                gap: 5px;

                input{
                    width: 165px;
                    padding: 10px;
                    border-radius: 8px;
                    color: white;
                    background-color: translate;
                    box-shadow: inset 0 0 .5px .5px rgba(255,255,255,.7);
                }
            }
            
            span{
                padding: 12px 0;
            }
        }
    }
`