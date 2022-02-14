import React, { FunctionComponent } from "react";
import { Container } from './styles'
import { LoadingPropsType } from './types'

const Loading: FunctionComponent<LoadingPropsType> = ({ loadingState }: LoadingPropsType): JSX.Element => {
    return (
        <Container>
            <div className={loadingState ? "loading-outer loading-outer-active" : "loading-outer"}>
                <div className={loadingState ? "left-line active" : "left-line"}></div>
                <div className="loading">
                    <div className="loading-text">Loading</div>
                </div>
                <div className={loadingState ? "right-line active" : "right-line"}></div>
            </div>
        </Container>
    )
}

export default React.memo(Loading)