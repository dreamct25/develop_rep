import { ToastContainer } from 'react-toastify'
import { StyledLayout } from '.'

const Toast:FC<{ themColor?:string }> = ({ themColor }):TSX => {

    return (
        <StyledLayout themColor={themColor || undefined}>
            <ToastContainer 
                toastClassName='custom-toast' 
                position='top-center' 
                hideProgressBar={true} 
                autoClose={1800} 
                theme='dark' 
            />
        </StyledLayout>
    )
}

export default Toast