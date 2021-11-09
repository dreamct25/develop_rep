import { FunctionComponent } from "react";
import { StyledComponent } from "styled-components";
import styles from './styles'

const { NoImageItem }: { NoImageItem: StyledComponent<"div", any, {}, never> } = styles

interface NoImageProps {
    text: string
}

const NoImage: FunctionComponent<NoImageProps> = ({ text }: NoImageProps): JSX.Element => {
    return (
        <NoImageItem>
            {text}
        </NoImageItem>
    )
}

export default NoImage