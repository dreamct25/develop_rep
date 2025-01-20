import { StyledLayout } from '.'

const Loading:FC<{ loadingStatus: boolean, loadingText: string }> = ({ loadingStatus,loadingText }):TSX => {

    return (
        <StyledLayout toggle={loadingStatus}>
            <div className="loading-text">{loadingText}</div>
        </StyledLayout>
    )
}

export default Loading