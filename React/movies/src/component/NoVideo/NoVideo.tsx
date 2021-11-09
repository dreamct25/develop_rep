import { FunctionComponent } from "react";
import { StyledComponent } from "styled-components";
import styles from './style'

const { Show }: { Show: StyledComponent<"div", any, {}, never> } = styles

const NoVideo: FunctionComponent<{}> = () => {
    return (
        <Show>
            <div className="no-video">
                <div className="no-video-title">
                    - No Trailer -
                </div>
                <div className="no-video-frame"></div>
            </div>
        </Show>
    )
}

export default NoVideo