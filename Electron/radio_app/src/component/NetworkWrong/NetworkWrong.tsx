import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Container } from './styles'

const NetworkWrong: FunctionComponent = (): JSX.Element => {
    const route = useHistory()
    const [messgeText, setMessgeText] = useState<string>('')
    const [isCountDown, setIsCountDown] = useState<boolean>(false)
    const reloadPage: () => void = () => {
        setIsCountDown(navigator.onLine)
    }

    useEffect(() => {
        if (isCountDown) {
            let count: number = 4
            const timer = setInterval(() => {
                if (count === 0) {
                    clearInterval(timer)
                    route.push({ pathname: '/radio' })
                } else {
                    count--
                    setMessgeText(`Network is connected,now will redirect to main page after ${count} secodes !`)
                }
            }, 1000)
        }
    }, [isCountDown])

    useEffect(() => {
        setMessgeText('Please check your network then try to open the application again !')
    }, [])
    return (
        <Container>
            <div className="message">{messgeText}</div>
            <div className="reload-btn" onClick={reloadPage}>Reload</div>
        </Container>
    )
}

export default React.memo(NetworkWrong)