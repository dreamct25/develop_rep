import { RefObject } from "react";
import { StyledComponent } from "styled-components";

export interface cssSetPropertys {
    Container: StyledComponent<"div", any>
}

export interface AlertBageTextProps {
    text: string,
    toggleState: boolean
}
