import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { StyledLayout } from '.'


const NotFound: FC = (): TSX => {

    return (
        <StyledLayout>
            <FontAwesomeIcon icon={faTimesCircle} />
            <span>Error 404</span>
        </StyledLayout>
    )
}

export default NotFound