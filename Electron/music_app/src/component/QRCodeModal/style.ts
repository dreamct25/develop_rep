import { styled } from '@linaria/react';

export default styled.div`

    .qr-modal-outer-fram{
        position: absolute;
        top: 33px;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        backdrop-filter:blur(10px);
        background-color: rgba(30,30,30,.3);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: .5s ease;

        .qr-modal-outer{
            background-color: rgb(40,40,40);
            border-radius:8px;

            .qr-modal-body{
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 12px;
                box-shadow: inset 0 0 1px 0 white;
                border-radius: 5px;

                .qrcode-area{
                    border-radius: 5px;
                    padding: 3px;
                    background-color: white;
                }

                .qr-desc-text{
                    padding-top: 8px;
                    line-height: 19px;
                    font-size: 14px;
                    letter-spacing: 2px;
                    text-align: center;
                }
            }
        }

        &.toggle {
            opacity: 1;
            z-index: 20;
        }
    }
`