import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { NewContext } from '../../App'
import { colorCard } from '../../assets/json'
import { Container } from '.'

const ColorCard: FC = (): TSX => {

    const { $, PickerUtils, formatLanguage } = useContext(NewContext)

    const [{
        rgbColorCode,
        hexColorCode,
        selectColorCode,
        copyActionName,
        isCopied
    }, setInitState] = useState<{
        rgbColorCode: string,
        hexColorCode: string,
        selectColorCode: string,
        copyActionName: string,
        isCopied: boolean
    }>({
        rgbColorCode: '',
        hexColorCode: '',
        selectColorCode: '',
        copyActionName: '',
        isCopied: false
    })

    const copyText:(actionName: string) => Promise<void> = async actionName => {

        if(!selectColorCode) return

        setInitState(prevState => ({
            ...prevState,
            copyActionName: actionName,
            isCopied: true
        }))

        const copyVal = actionName === 'rgb' ? rgbColorCode : hexColorCode
        
        await navigator.clipboard.writeText(copyVal)

        await $.useSleep(1000)

        setInitState(prevState => ({
            ...prevState,
            isCopied: false
        }))

        await $.useSleep(500)

        setInitState(prevState => ({
            ...prevState,
            copyActionName: ''
        }))
    }

    useEffect(() => {

        if(!selectColorCode) return

        setInitState(prevState => ({
            ...prevState,
            rgbColorCode: `rgb(${PickerUtils.hexToRgb(selectColorCode).split(',').join(', ')})`,
            hexColorCode: selectColorCode,
        }))

    }, [selectColorCode])

    return (
        <Container>
            <div className="color-card-outer-frame">
                <div className="color-card-outer">
                    {$.maps(colorCard, (colorCode, index) => (
                        <div
                            className="color-card-item"
                            key={index}
                            onClick={
                                setInitState.bind(undefined, prevState => ({
                                    ...prevState,
                                    selectColorCode: colorCode
                                }))
                            }
                            ref={element => {

                                if(!element) return

                                element.style.cssText = `--color-code: ${colorCode}`
                            }}
                        />
                    ))}
                </div>
                <div className="float-current-pick-color-desc">
                    <div className="inside">
                        <div className="left">
                            <div 
                                className="box"
                                ref={element => {

                                    if(!element) return

                                    element.style.cssText = `--color-code: ${selectColorCode}`
                                }}
                            />
                        </div>
                        <div className="right">
                            <div className="rgb">
                                <span>RGB：{rgbColorCode || formatLanguage('pages.colorCard.pickColorYet')}</span>
                                <div className="copy-btn" onClick={copyText.bind(undefined, 'rgb')}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </div>
                            </div>
                            <div className="hex">
                                <span>HEX：{hexColorCode || formatLanguage('pages.colorCard.pickColorYet')}</span>
                                <div className="copy-btn" onClick={copyText.bind(undefined, 'hex')}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={isCopied ? "copy-info-toast active" : "copy-info-toast"}>
                {
                    formatLanguage(
                        'pages.colorCard.copyToastText',
                        {
                            copyType: copyActionName.toLocaleUpperCase(),
                            colorCode: copyActionName === 'rgb' ? rgbColorCode : hexColorCode
                        }
                    )
                }
            </div>
        </Container>
    )
}

export default ColorCard