import { styled } from '@linaria/react';

export default styled.div<{ isInMobile: boolean }>`

    .loading-outer{
        position: absolute;
        top: ${props => props.isInMobile ? '0' : '33px'};
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        backdrop-filter: blur(10px);
        z-index: -1;
        opacity: 0;
        transition: .7s ease;

        .right-line{
            position: absolute;
            top: 50%;
            left: 0;
            background-color: white;
            width:0;
            height: 2px;
            transition: .7s ease;
            opacity: 0;

            &.active{
                width: ${props => props.isInMobile ? '32vw' : '39vw'};
                animation: rightLight 1s linear infinite;
            }

            @keyframes rightLight {
                0%{
                    opacity: 0;
                }

                50%{
                    opacity: 1;
                }

                100%{
                    opacity: 0;
                }
            }
        }

        .left-line{
            position: absolute;
            top: 50%;
            right: 0;
            background-color: white;
            width:0;
            height: 2px;
            opacity: 0;
            transition: .7s ease;

            &.active{
                width: ${props => props.isInMobile ? '32vw' : '39vw'} ;
                animation: leftLight 1s linear infinite;
            }
            
            @keyframes leftLight {
                0%{
                    opacity: 0;
                }

                50%{
                    opacity: 1;
                }

                100%{
                    opacity: 0;
                }
            }
        }

        .loading{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 130px;
            height: 130px;

            .loading-text{
                font-size: 20px;
            }
        }

        &.loading-outer-active{
            z-index: 26;
            opacity: 1;
        }
    }
`