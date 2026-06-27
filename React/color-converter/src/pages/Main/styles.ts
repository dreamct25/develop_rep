import { styled } from '@linaria/react'

export default styled.div`

    .language-list-outer{
        position: fixed;
        top: 0;
        right: 0;
        z-index: 2;
        margin: 5px;
        overflow: hidden;
        border-radius: 5px;
        transition: .5s ease;
        background-color: rgba(30, 30 , 30, .4);
        backdrop-filter: blur(6px);
        box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .7);

        .language-display-outer{
            display: flex;
            align-items: center;
            color: white;
            padding: 8px;
            cursor: pointer;
            user-select: none;

            svg{
                padding-right: 5px;
            }
        }

        .language-list {
            max-height: 0vh;
            overflow: hidden;
            opacity: 0;
            transition: .5s ease;

            .language-list-item{
                color: white;
                padding: 8px;
                margin: 0 1px;
                cursor: pointer;
                user-select: none;
                text-align: center;

                &:first-child {
                    border: 1px solid rgba(255, 255, 255, .2);
                    border-left: unset;
                    border-right: unset;
                }

                &:last-child {
                    padding: 8px 8px 12px 8px;
                }
            }

            &.toggle{
                max-height: 9vh;
                opacity: 1;
            }
        }
    }

    .nav-list{
        position: fixed;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        backdrop-filter: blur(6px);
        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
        padding: 9px 11px;
        z-index: 5;
        transform: translate(-90%, -75%);
        cursor: pointer;
        user-select: none;
        background-color: rgba(60, 60 , 60);

        .line-icon{

            .line{
                width: 18px;
                height: 2px;
                background-color: white;
                border-radius: 20px;
                margin: 4px 0;
                transform: translate(0px,0px) rotate(0deg);
                transition: .3s ease;
            }
        }

        .nav-btn-group-zh,
        .nav-btn-group-en{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 125px;
            height: 128px;
            opacity: 0;
            transform: scale(0.8) translate(-118px, -126px);
            box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, .7),  0 0 5px 0 rgba(0,0,0,.3);
            border-radius: 5px;
            overflow: hidden;
            padding: 4px 2px;
            pointer-events: none;
            transition: .3s ease;
            color: white;
            background-color: rgba(60, 60 , 60);

            div{
                cursor: pointer;
                user-select: none;
                padding: 8px;
                text-align: center;
            }

            &.toggle{
                opacity: 1;
                transform: scale(1) translate(-107px, -114px);
                pointer-events: all;
            }
        }

        .nav-btn-group-en{
            width: 152px;
            transform: scale(0.8) translate(-148px, -126px);

            &.toggle{
                transform: scale(1) translate(-134px, -115px);
            }
        }

        &.toggle{

            .line-icon{

                .line:nth-of-type(1){
                    transform: translate(0px,6px) rotate(135deg);
                }

                .line:nth-of-type(2){
                    width: 0;
                }

                .line:nth-of-type(3){
                    transform: translate(0px,-6px) rotate(-135deg);
                }
            }
        }
    }

    .container{
        display: grid;
        grid-template-rows: 1fr auto;
        justify-content: center;
        min-height: 100vh;
        max-width: 960px;
        margin: 0 auto;

        .footer{
            margin: 25px 0;
            color: white;
            text-align: center;
            font-weight: bold;
            text-shadow: 0 0 2px rgba(0,0,0,.7);
        }
    }
`