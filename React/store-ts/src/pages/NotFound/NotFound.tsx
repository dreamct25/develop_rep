import { StyledLayout } from '.'
import { CircleX } from 'lucide-react'

const NotFound:FC = ():TSX => (
    <StyledLayout>
        <div className='layout'>
            <CircleX />
            <div>Not Found</div>
        </div>
    </StyledLayout>
)

export default NotFound