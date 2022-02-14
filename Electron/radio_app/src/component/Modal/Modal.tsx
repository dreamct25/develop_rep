import React, { FunctionComponent } from "react";
import { Container } from './styles'

interface ModalProps {
    modalProps: {
        modalTitle: string,
        toggleModal: boolean,
        setToggleModal: (status: boolean, method: string) => void,
        renderText: string,
        showCopyRightInfo?: boolean
    }
}

const Modal: FunctionComponent<ModalProps> = ({ modalProps }: ModalProps): JSX.Element => {
    const { modalTitle, toggleModal, setToggleModal, renderText, showCopyRightInfo } = modalProps
    const setModalToggle: (status: boolean, method: string) => void = (status, method) => setToggleModal(status, method)
    return (
        <Container>
            <div className={toggleModal ? "modal-outer-fram toggle" : "modal-outer-fram"}>
                {
                    showCopyRightInfo === true ? (
                        <div className={toggleModal ? "modal-copy-right-info-outer toggle" : "modal-copy-right-info-outer"}>
                            <div className="modal-copy-right-info-body">{renderText}</div>
                            <div className="modal-copy-right-info-footer">
                                <div onClick={setModalToggle.bind(this, false, 'confirm')}>確定</div>
                            </div>
                        </div>) : (
                        <div className={toggleModal ? "modal-outer toggle" : "modal-outer"}>
                            <div className="modal-title">{modalTitle}</div>
                            <div className="modal-body">{renderText}</div>
                            <div className="modal-footer">
                                <div onClick={setModalToggle.bind(this, false, 'confirm')}>確定</div>
                                <div onClick={setModalToggle.bind(this, false, 'cancel')}>取消</div>
                            </div>
                        </div>
                    )
                }

            </div>
        </Container>
    )
}

export default React.memo(Modal)