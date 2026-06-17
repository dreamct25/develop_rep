import { StyledLayout } from '.'

const NotFound:FC = ():TSX => (
    <StyledLayout>
        <div className='layout'>
            <i className="far fa-times-circle" />
            <div>Page Not Found</div>
        </div>
    </StyledLayout>
)

export default NotFound