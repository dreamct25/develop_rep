import { useContext, useState } from "react";
import { NewContext } from '../../App'
import { colorCard } from '../../assets/json'
import { Container } from '.'

const ColorCard: FC = (): TSX => {

    const { $, PickerUtils, formatLanguage } = useContext(NewContext)

    const [selectColorCode, setSelectColorCode] = useState<string>('')

    return (
        <Container>
            <div className="color-card-outer-frame">
                <div className="color-card-outer">
                    {$.maps(colorCard, (colorCode, index) => (
                        <div
                            className="color-card-item"
                            key={index}
                            onClick={setSelectColorCode.bind(undefined, colorCode)}
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
                            <div>RGB：{selectColorCode ? `rgb(${PickerUtils.hexToRgb(selectColorCode).split(',').join(', ')})` : formatLanguage('pages.colorCard.pickColorYet')}</div>
                            <div>HEX：{selectColorCode || formatLanguage('pages.colorCard.pickColorYet')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ColorCard