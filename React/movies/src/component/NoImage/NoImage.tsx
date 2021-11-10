import { FunctionComponent } from "react";
import { NoImageProps,cssSetPropertys } from "./types";
import styles from './styles'

const { NoImageItem }: cssSetPropertys = styles

const NoImage: FunctionComponent<NoImageProps> = ({ text }: NoImageProps): JSX.Element => (
    <NoImageItem>
        {text}
    </NoImageItem>
)

export default NoImage