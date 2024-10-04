import React from 'react'
import { Container } from '.'

interface ActionModalProps {
    acionModalTitle?:string,
    toggleModalStatus:boolean,
    children?:TSX,
    confirmEvent:() => void,
    cancelEvent:() => void
}

const ActionModal:FC<ActionModalProps> = ({ 
    acionModalTitle,
    toggleModalStatus,
    children,
    confirmEvent,
    cancelEvent
}):TSX => {
    return pug`
        Container(toggleModalStatus=toggleModalStatus)
            .action-modal-outer
                .action-modal-header #{acionModalTitle || '提示訊息'}
                hr
                .action-modal-body
                    ${children}
                hr
                .action-modal-footer
                    .confirm(onClick=confirmEvent) 確定
                    if cancelEvent
                        .cancel(onClick=cancelEvent) 取消
    `
}

export default ActionModal