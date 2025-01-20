import { StyledLayout } from '.'

const Tooltip:FC<{ text: string,posX: number, posY: number }> = ({ text, posX, posY }):TSX => {

    return (
        <StyledLayout posX={posX} posY={posY}>
            <div className="tooltip">{text}</div>
        </StyledLayout>
    )
}

export default Tooltip