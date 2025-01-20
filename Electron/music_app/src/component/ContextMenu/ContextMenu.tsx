import { StyledLayout } from '.'

interface ContextMenuProps {
    pos:{ x: number, y: number }
    toggleContextMenuStatus: boolean,
    children:TSX
}

const ContextMenu: FC<ContextMenuProps> = (props): TSX => {
    console.log(props)
    const { pos, toggleContextMenuStatus, children } = props

    return (
        <StyledLayout posX={pos.x} posY={pos.y}>
            <div className={toggleContextMenuStatus ? "context-outer toggle" : "context-outer"}>
                {children}
            </div>
        </StyledLayout>
    )
}

export default ContextMenu