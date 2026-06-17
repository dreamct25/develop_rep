import { FunctionComponent } from "react";
import { cssSetPropertys } from './types'
import styles from './style'

const { Show }: cssSetPropertys = styles

const NoVideo: FunctionComponent<{}> = ():JSX.Element => (
    <Show>
        <div className="no-video">
            <div className="no-video-title">
                - No Trailer -
            </div>
            <div className="no-video-frame"></div>
        </div>
    </Show>
)


export default NoVideo