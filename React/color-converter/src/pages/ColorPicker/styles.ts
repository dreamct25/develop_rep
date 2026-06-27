import { styled } from '@linaria/react'

export default styled.div`
    align-self: center;

    .picker{
        width: 600px;
        height: 600px;

        canvas{
            position: absolute
        }
    }

    .board-info{
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(30, 30, 30, .5);
        box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.5);
        color: white;
        padding: 6px 8px 6px 6px;
        border-radius: 5px;
        margin: 5px;
        backdrop-filter: blur(6px);
        display: grid;
        grid-template-columns: 64px auto;
        gap: 8px;

        .left {

            .color-preview{
                width: 100%;
                height: 64px;
                border-radius: 5px;
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.5);
            }
        }

        .right {
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
                margin-bottom: 6px;

                &:nth-of-type(3){
                    display: flex;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
`