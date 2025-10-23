import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { NewContext } from '@/UI/MainView/App'
import { StyledLayout } from '.'

const NetworkWrong: FC = (): TSX => {

    const { formatLanguage } = useContext(NewContext)

    const router = useNavigate()

    const [isCountDown, setIsCountDown] = useState<boolean>(false)

    const [count,setCount] = useState<number>(4)

    const reloadPage: () => Promise<void> = async () => {

        try {
            await fetch("https://proxy-service-three.vercel.app/uts/check_net");

            setIsCountDown(true)

        } catch(e){
            setIsCountDown(false)
        }
    }

    useEffect(() => {

        if (isCountDown) {
            
            let countTemp = 4

            const timer = setInterval(() => {
                
                if (countTemp === 0) {

                    clearInterval(timer)
                    router({ pathname: '/music' })

                    return
                }

                setCount(countTemp --)
            }, 1000)
        }

    }, [isCountDown])

    return (
        <StyledLayout>
            <div className="message">{count === 4 ? formatLanguage('checkIsOnline') : formatLanguage('redirectMessage',{ seconds : count })}</div>
            {count === 4 && <div className="reload-btn" onClick={reloadPage}>{formatLanguage('retryButton')}</div>}
        </StyledLayout>
    )
}

export default NetworkWrong