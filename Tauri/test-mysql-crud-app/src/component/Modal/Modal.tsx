import { FC,ReactNode } from "react";
import { StyleLayout } from '.'

interface ModalProps {
    modalObj: { 
        modalTitle:string, 
        toggleModalStatus:boolean 
    },
    children:ReactNode,
    handleAction(type:string):void
}

const Modal:FC<ModalProps> = ({ children,modalObj:{ modalTitle,toggleModalStatus },handleAction }):JSX.Element => {
    

    return (
        <StyleLayout className={toggleModalStatus ? 'active' : ''}>
            <div className="modal">
                <div className="modal-header">{modalTitle}</div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <div onClick={handleAction.bind(this,'confirm')}>Confirm</div>
                    <div onClick={handleAction.bind(this,'cancel')}>Cancel</div>
                </div>
            </div>
        </StyleLayout>
    )
}

export default Modal