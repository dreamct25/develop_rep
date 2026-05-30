import { StyledLayout } from '.'

const Loading:FC<{ toggleLoadingStatus: boolean }> = (props): TSX => {

    return (
        <StyledLayout toggleLoadingStatus={props.toggleLoadingStatus}>
            <div className="loading-outer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <g className="spinner">
                        <circle className="path" cx="25" cy="25" r="20" />
                    </g>
                </svg>
                <div className="loading-text">載入中</div>
            </div>
        </StyledLayout>
    )
}

export default Loading