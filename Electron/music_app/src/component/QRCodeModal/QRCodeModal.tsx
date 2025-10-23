import QRCode from 'react-qr-code'
import { StyledLayout } from '.'

interface QRCodeModalProps {
    value:string
    toggleModal: boolean,
    renderText: TSX,
    closeCodeModal(status: boolean): void
}

const QRCodeModal:FC<QRCodeModalProps> = (props):TSX => {
    
    const { value,toggleModal,renderText,closeCodeModal } = props
    
    return (
        <StyledLayout>
            <div 
                className={toggleModal ? "qr-modal-outer-fram toggle" : "qr-modal-outer-fram"}
                onClick={({ target }) => {
                    const element = target as HTMLDivElement

                    if(typeof element.className === 'object') return

                    if(!element.className.split(' ').includes('qr-modal-outer-fram')) return

                    closeCodeModal(false)
                }}
            >
                <div className={toggleModal ? "qr-modal-outer toggle" : "qr-modal-outer"}>
                    <div className="qr-modal-body">
                        <div className="qrcode-area">
                            <QRCode size={300} level="H" value={value} />
                        </div>
                        <div className='qr-desc-text'>{renderText}</div>
                    </div>
                </div>
            </div>
        </StyledLayout>
    )
}

export default QRCodeModal