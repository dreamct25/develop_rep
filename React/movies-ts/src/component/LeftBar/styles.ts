import { styled } from '@linaria/react'

export default styled.div`

    .left-list-outer{
        position:fixed;
        top:0;
        left:0;
        z-index:10;
        opacity:1;
        transform: translateX(0);
        transition: opacity .7s ease, transform .7s ease;
        background-color: rgba(0, 0, 0, .3);
        backdrop-filter: blur(6px);
        max-width: 200px;
        overflow: hidden;

        &.outer-active {
            opacity: 0;
            transform: translateX(-400px);
        }

        .header{
            position: absolute;
            top: 3%;
            left: 50%;
            transform: translate(-50%, 0);
            color: white;
            font-size: 35px;
            font-style: italic;
            cursor: pointer;
        }

        .left-list{
            display: flex;
            justify-content: center;
            flex-direction: column;
            min-height: 100vh;

            .list-item{
                cursor: pointer;
                user-select: none;
                text-align: center;
                color: white;
                padding: 0 60px;
                margin: 20px 0;
                transform: scale(1);
                transition: .5s ease;
                text-shadow: 0 1px 1px rgba(255,255,255,0);
            
                &.list-item-active{
                    text-shadow: 0 1px 1px rgba(255,255,255,.7);
                    transform: scale(1.2);
                }
            }
        }

        .list-footer{
            color: white;
            position: absolute;
            bottom: 2%;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 11px;
            font-style: italic;
        }

        @media screen and (max-width: 970px) {
            top: unset;
            right: 0;
            bottom: 0;
            opacity: 0;
            transform: translateY(120px);
            z-index: 11;
            margin: 12px auto 20px auto;
            border-radius: 20px;
            max-width: 390px;
            width: 90%;
            background-color: rgba(30, 30, 30, .2);
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .5);
            transition: unset;

            &.outer-active {
                transition: opacity .7s ease, transform .7s ease;
                opacity: 1;
                transform: translateY(0);
            }

            .left-list{
                min-height: auto;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 6px;
                align-items: center;
                padding: 0 12px;

                .list-item{
                    padding: 0;
                    margin: 16px 0;
                }
            }

            .list-footer{
                font-size: 13px;
                padding-bottom: 16px;
                position: unset;
            }
        }
    }
`