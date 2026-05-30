import { styled } from '@linaria/react'

export default styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 30, 30, .7);
    opacity: 0;
    backdrop-filter: blur(6px);
    pointer-events: none;
    z-index: 5;
    transition: opacity .5s ease;

    &.toggle {
        opacity: 1;
        pointer-events: all;
    }

    .single-ebook-info-modal-outer {
        position: absolute;
        top: 5%;
        right: 0;
        left: 0;
        bottom: 5%;
        border-radius: 12px;
        max-width: 500px;
        width: 95%;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: inset 0 0 2px .5px rgba(255, 255, 255, .5);

        .single-ebook-item {
            padding: 10px 0;
            overflow-y: auto;
            overflow-x: hidden;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            color: white;

            &::-webkit-scrollbar {
                width: 3px;
                height: 0px;
                border-radius: 20px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 20px;
            }

            .single-ebook-item-title {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 12px;
                align-items: center;
                padding: 25px 3px 0 40px;

                .item-title {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    div {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        
                        &:first-child {
                            font-size: 30px;
                            margin-bottom: 12px;
                        }
                    }
                }

                .price {
                    background-color: rgba(100,100,100,.3);
                    text-align:center;
                    padding: 5px;
                    border-radius: 8px;
                    margin-right: 30px;
                }
            }

            .singel-ebook-item-content {

                .img-outer {

                    img {
                        display: block;
                        border-radius: 15px;
                        width: 50%;
                        margin: 45px auto 12px auto;
                    }
                }

                .single-ebook-item-explain {
                    padding: 5px 20px;

                    @media screen and (max-width:414px) {
                        padding: 5px 15px;
                    }

                    span {
                        display: block;
                    }

                    .explain-groups {
                        text-align: right;
                        font-size: 16px;
                        margin: 12px 0 20px 0;

                        div {

                            &:last-child {
                                margin-top: 12px;
                            }
                        }
                    }

                    .descript-outer {
                        margin-top: 12px;

                        .descript-title {

                            span {
                                font-size: 20px;
                                text-align:left;
                                padding: 0;
                            }
                        }

                        .descript-text-outer {
                            margin-top: 12px;

                            .descript-text {
                                line-height: 25px;

                                span {
                                    font-size: 16px;
                                    text-align: justify;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .load-text {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 100%;
    }
`