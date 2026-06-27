import { styled } from '@linaria/react'

export default styled.div`

    .color-card-outer-frame{
        max-width: 772px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        margin: 75px auto 66px auto;

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
        
        .color-card-outer{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(93px, 1fr));
            grid-gap: 12px;
            padding: 2px 12px;
        
            .color-card-item{
                height: 93px;
                border-radius: 5px;
                overflow: hidden;
                box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
                background-color: var(--color-code);
                cursor: pointer;
                user-select: none;
            }
        }

        .float-current-pick-color-desc {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            max-width: 772px;
            
            .inside {
                max-width: 230px;
                display: grid;
                grid-template-columns: 48px auto;
                gap: 8px;
                margin-top: 6px;
                transform: translateX(10px);
                padding: 6px 8px 6px 6px;
                background-color: rgba(30, 30, 30, .5);
                box-shadow: inset 0 0 2px rgba(255, 255, 255, .5);
                backdrop-filter: blur(6px);
                border-radius: 5px;

                .left {

                    .box {
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                        box-shadow: inset 0 0 2px rgba(255, 255, 255, .5);
                        background-color: var(--color-code);
                        transition: background-color .5s ease;
                    }
                }

                .right {
                    color: white;
                    text-align: center;
                    line-height: 24px;
                }
            }
        }
    }
`