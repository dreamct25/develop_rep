import React, { FunctionComponent,memo } from 'react'
import QRCode from 'react-qr-code'
import { Container } from './style'

interface QRCodeModalProps {
    value:string
    toggleModal: boolean,
    renderText:string,
    setToggleQRCodeModal: (status: boolean) => void,
}

const QRCodeModal:FunctionComponent<QRCodeModalProps> = (props):JSX.Element => {
    const { value,toggleModal,renderText,setToggleQRCodeModal } = props

    const setModalToggle: (status: boolean) => void = status => setToggleQRCodeModal(status)
    return (
        <Container>
            <div className={toggleModal ? "qr-modal-outer-fram toggle" : "qr-modal-outer-fram"}>
                <div className={toggleModal ? "qr-modal-outer toggle" : "qr-modal-outer"}>
                    <div className="qr-modal-body">
                        <div className="qrcode-area">
                            <QRCode size={150} level="H" value={value} />
                        </div>
                        <div className='qr-desc-text'>{renderText}</div>
                    </div>
                    <div className='close-qr-modal' onClick={setModalToggle.bind(this, false)}>
                        <i className="fas fa-times-circle" />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default memo(QRCodeModal)