import { StyledLayout, LoadingPropsType } from '.'

const Loading: FC<LoadingPropsType> = (props): TSX => {
    
    const { loadingStatus, infoText } = props
    
    return (
        <StyledLayout isInMobile={props?.isInMobile}>
            <div className={loadingStatus ? "loading-outer loading-outer-active" : "loading-outer"}>
                <div className={loadingStatus ? "left-line active" : "left-line"}></div>
                <div className="loading">
                    <div className="loading-text">{infoText}</div>
                </div>
                <div className={loadingStatus ? "right-line active" : "right-line"}></div>
            </div>
        </StyledLayout>
    )
}

export default Loading