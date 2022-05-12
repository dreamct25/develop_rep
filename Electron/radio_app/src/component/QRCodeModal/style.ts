import styled, { StyledComponent } from "styled-components";

const { Container }: { Container: StyledComponent<"div", any> } = {
    Container: styled.div`
        .qr-modal-outer-fram{
            position: absolute;
            top: 33px;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: -1;
            backdrop-filter:blur(10px);
            background-color: rgba(0,0,0,.5);
            transition: .7s ease;
            .qr-modal-outer{
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 180px;
                background-color: rgb(40,40,40);
                border-radius:8px;
                opacity: 0;
                transition: .7s ease;
                .qr-modal-body{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 0;
                    box-shadow: inset 0 0 1px 0 white;
                    border-radius: 5px;
                    .qrcode-area{
                        border-radius: 5px;
                        padding: 3px;
                        background-color: white;
                    }
                    .qr-desc-text{
                        padding: 10px 10px 0px 10px;
                        line-height: 19px;
                        font-size: 14px;
                        letter-spacing: 2px;
                        text-align: center;
                    }
                }
                &.toggle {
                    opacity: 1;
                    top: 50%;
                }
                .close-qr-modal{
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 20px;
                    cursor: pointer;
                    user-select: none;
                    transform: translate(10px,-10px);
                }
            }
            &.toggle {
                opacity: 1;
                z-index: 20;
            }
        }
    `
}

export { Container }