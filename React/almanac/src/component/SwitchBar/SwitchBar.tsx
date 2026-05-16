import { MouseEventHandler } from 'react'
import { StyledLayout } from '.'

const SwitchBar:FC<{ 
    isSlide: boolean,
    isDisabled?: boolean,
    clickEvent: MouseEventHandler<HTMLDivElement> 
}> = (props):TSX => {

    return (
        <StyledLayout 
            isSlide={props.isSlide} 
            onClick={props.clickEvent}
            isDisabled={props?.isDisabled || false}
        >
            <div className="switch-circle"></div>
        </StyledLayout>
    )
}

export default SwitchBar