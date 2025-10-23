import { MouseEventHandler } from 'react'
import { StyledLayout } from '.'

const SwitchBar:FC<{ isSlide: boolean, clickEvent: MouseEventHandler<HTMLDivElement> }> = ({ isSlide, clickEvent }):TSX => {

    return (
        <StyledLayout isSlide={isSlide} onClick={clickEvent}>
            <div className="switch-circle"></div>
        </StyledLayout>
    )
}

export default SwitchBar