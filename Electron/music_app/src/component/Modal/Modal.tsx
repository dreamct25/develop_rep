import { useContext } from 'react'
import { NewContext } from '@/UI/MainView/App'
import { StyledLayout } from '.'

interface ModalProps {
    modalTitle: string,
    toggleModal: boolean,
    setToggleModal(status: boolean, method: string): void,
    children: TSX | TSX[]
    withOptions?:boolean
    onlyInfo?:boolean
}

const Modal: FC<ModalProps> = (props: ModalProps): TSX => {
    
    const { modalTitle, toggleModal, setToggleModal } = props
    
    const { formatLanguage } = useContext(NewContext)

    return (
        <StyledLayout>
            <div className={toggleModal ? "modal-outer-fram toggle" : "modal-outer-fram"}>
                <div className={`${props?.onlyInfo ? 'modal-outer-info' : 'modal-outer'} ${toggleModal ? 'toggle' : ''}`}>
                    {modalTitle && (<div className="modal-title">{modalTitle}</div>)}
                    <div className={props?.onlyInfo ? 'modal-info-body' : 'modal-body' }>{props.children}</div>
                    <div className={props?.onlyInfo ? 'modal-info-footer' : 'modal-footer'}>
                        {props?.withOptions ? (
                            <>
                                <div onClick={setToggleModal.bind(this, false, 'confirm')}>{formatLanguage('confirm')}</div>
                                <div onClick={setToggleModal.bind(this, false, 'cancel')}>{formatLanguage('cancel')}</div>
                            </>
                        ) : (
                            <div onClick={setToggleModal.bind(this, false, 'confirm')}>{formatLanguage('confirm')}</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </StyledLayout>
    )
}

export default Modal