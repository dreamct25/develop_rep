import { styled } from '@linaria/react'

export default styled.div`
    padding: 36px 0 20px 0;

    .list-outer {
        
        .list {
            display: grid;
            grid-template-columns: repeat(auto-fit, 250px);
            gap: 12px;
            justify-content: center;

            .card {
                border-radius: 5px;
                overflow: hidden;
                background-color: rgba(255, 255, 255, .1);
                backdrop-filter: blur(3px);
                cursor: pointer;
                user-select: none;

                .top {
                    position: relative;
                    
                    .img-place-holder {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 2px;
                        opacity: 0;
                        z-index: 2;
                        height: 369.14px;
                        pointer-events: none;
                        backdrop-filter: blur(6px);
                        background-color: rgba(30, 30, 30, .7);
                        transition: opacity .2s ease;

                        &.toggle {
                            opacity: 1;
                        }
                    }

                    .img-outer {
                        height: 369.14px;

                        img {
                            width: 100%;
                        }
                    }
                }

                .bottom {
                    padding: 7px 9px;
                    color: white;

                    div, span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        margin-bottom: 12px;

                        &:nth-child(2) {
                            font-size: 14px;
                            text-align: right;
                        }

                        &:nth-child(3) {
                            font-size: 14px;
                            text-align: right;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }

                    span {
                        font-size: 18px;
                    }
                }
            }
        }
    }
`