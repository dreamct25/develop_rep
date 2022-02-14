import React, { FunctionComponent } from "react";
import { Container } from "./styles";
import { AlertBageTextProps } from './types'

const AlertBageText: FunctionComponent<AlertBageTextProps> = ({ text, toggleState }: AlertBageTextProps): JSX.Element => (
    <Container>
        <div className={toggleState ? "alert-bage-text-outer toggle" : "alert-bage-text-outer"}>
            <div className="alert-bage-text">{text}</div>
        </div>
    </Container>
)

export default React.memo(AlertBageText)