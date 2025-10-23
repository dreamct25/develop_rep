import { styled } from '@linaria/react'

export default styled.div<{ slideNum: string,slideNumMax: number }>`
    

    /* input {
        height: 13px;
        -webkit-appearance: none; 
        background: none;
        outline: none;

        &::-webkit-slider-runnable-track {
            background: #eee;
            height: 6px;
            border-radius: 20px;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: 2px solid rgba(0,162,255,1);
            height: 15px;
            width: 15px;
            margin-top: -5px;
            border-radius: 8px;
            background: #fff;
            cursor: pointer;
            transition: .3s ease;
        }

        &::-webkit-slider-thumb:active{
            transform: scale(1.3);
        }

        &::-webkit-slider-runnable-track {
            background: linear-gradient(
                to right,
                rgba(0,162,255,1) 0%,
                rgba(0,162,255,1) ${props => `${parseInt(props.slideNum) / props.slideNumMax * 100}%`},
                #eee ${props => `${parseInt(props.slideNum) / props.slideNumMax * 100}%`},
                #eee
            );
        }
    } */

    .rc-slider {

        .rc-slider-track {
            background-color: rgba(0,162,255,1);
            border-radius: 20px;
        }

        .rc-slider-handle {
            border: 2px solid rgba(0,162,255,1);
            opacity: 1;

            &.rc-slider-handle-dragging {
                border: 2px solid rgba(0,162,255,1);
                box-shadow: unset;
                transform: scale(1.2) translateX(-50%) !important;
            }
        }

        .tooltip {
            padding: 4px 0 5px 0;
            width: 40px;
            color: white;
            background: rgb(30,30,30);
            border-radius: 5px;
            text-align: center;
            transform: scale(.8) translate(-19px,-41px);
            opacity: 0;
            z-index: -1;
            transition: .5s ease;
                
            &:before {
                content: "";
                position: absolute;
                border-top: 8px solid rgb(30, 30, 30);
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                top: 97%;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &:hover {

            .tooltip {
                opacity: 1;
                z-index: 1;
            }
        }
    }

    
`