import { styled } from '@linaria/react';

export default styled.div`

    .modal-outer-frame {
        position: absolute;
        top: 33px;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        backdrop-filter:blur(10px);
        background-color: rgba(0,0,0,.5);
        transition: .5s ease;

        .modal-outer-info,
        .modal-outer{
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 95%;
            max-width: 400px;
            background-color: rgb(40,40,40);
            border-radius:8px;
            opacity: 0;
            transition: .5s ease;

            .modal-title{
                font-size: 20px;
                padding: 12px 14px 15px 14px;
                box-shadow: inset 0 0 1px 0 white;
                border-radius:8px 8px 0 0;
            }

            .modal-info-body{
                text-align: center;
                padding: 20px 0 11px 0;
                line-height: 22px;
            }

            .modal-body{
                text-align: center;
                padding: 30px;
                box-shadow: inset 0 0 1px 0 white;
            }

            .modal-info-footer{

                div{
                    padding-bottom: 18px;
                    text-align: center;
                    cursor: pointer;
                    user-select:none;
                }
            }

            .modal-footer{
                display: flex;
                box-shadow: inset 0 0 1px 0 white;
                border-radius:0 0 8px 8px;
                overflow: hidden;
                div{
                    padding: 12px 0;
                    width: 50%;
                    text-align: center;
                    cursor: pointer;
                    user-select:none;
                    &:nth-of-type(1){
                        box-shadow: inset -0.1px 0 0 0 white;
                    }
                    &:nth-of-type(2){
                    box-shadow: inset 0.1px 0 0 0 white;
                    }
                }
            }

            &.toggle {
                opacity: 1;
                top: 50%;
            }
        }

        &.toggle {
            opacity: 1;
            z-index: 25;
        }
    }
`