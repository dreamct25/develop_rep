import { StyledLayout } from '.'

interface VideoModeModalProps {
    toggleModalStatus: boolean,
    children: TSX
}

const VideoModeModal: FC<VideoModeModalProps> = (props):TSX => {

    return (
        <StyledLayout 
            className={props.toggleModalStatus ? 'toggle' : ''}
        >
            {props.children}
        </StyledLayout>
    )
}

export default VideoModeModal