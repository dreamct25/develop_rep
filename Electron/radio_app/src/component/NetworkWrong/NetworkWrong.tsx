import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { TFunction, useTranslation } from 'react-i18next'
import { Container } from './styles'

const NetworkWrong: FunctionComponent = (): JSX.Element => {
    const route = useHistory()

    const [isCountDown, setIsCountDown] = useState<boolean>(false)

    const [count,setCount] = useState<number>(4)

    const reloadPage: () => void = () => {
        setIsCountDown(navigator.onLine)
    }

    const { t }: { t: TFunction<"translation", undefined> } = useTranslation()

    const formatLang: TFunction<"translation", undefined> = t

    useEffect(() => {
        if (isCountDown) {
            let countTemp = 4
            const timer = setInterval(() => {
                if (countTemp === 0) {
                    clearInterval(timer)
                    route.push({ pathname: '/radio' })
                } else {
                    setCount(countTemp --)
                }
            }, 1000)
        }
    }, [isCountDown])

    return (
        <Container>
            <div className="message">{count === 4 ? formatLang('checkIsOnline') : formatLang('redirectMessage',{ seconds : count })}</div>
            <div className="reload-btn" onClick={reloadPage}>{formatLang('retryButton')}</div>
        </Container>
    )
}

export default React.memo(NetworkWrong)