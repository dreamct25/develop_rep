import { FunctionComponent } from "react";
import { LoadingProps,cssSetPropertys } from "./types";
import styles from './styles'

const { Show }: cssSetPropertys = styles

const Loading: FunctionComponent<LoadingProps> = ({ haveOpen }: LoadingProps): JSX.Element => (
    <Show>
        <div className={haveOpen ? "loading-outer loading-outer-active" : "loading-outer"}>
            <div className="loading">
                <svg className="fsg" width="100%" height="100%">
                    <defs>
                        <linearGradient id="a1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="10%" stopColor="rgb(0,162,250)" />
                            <stop offset="50%" stopColor="rgb(0,90,250)" stopOpacity=".5" />
                            <stop offset="70%" stopColor="rgb(0,0,0)" stopOpacity="0" />
                            <stop offset="90%" stopColor="rgb(0,0,0)" stopOpacity="0" />
                            <stop offset="100%" stopColor="rgb(0,0,0)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="80" strokeWidth="6" stroke="url(#a1)" fill="none">
                    </circle>
                </svg>
                <div className="loading-text">Loading</div>
            </div>
        </div>
    </Show>
)

export default Loading