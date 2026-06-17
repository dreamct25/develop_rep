import StyledLayout from './styles'

const NoImage: FC<{ text: string, fontSize?: number }> = ({ text, fontSize = 25 }): TSX => (
    <StyledLayout fontSize={fontSize} >{text}</StyledLayout>
)

export default NoImage