import { FC,useContext } from "react";
import { NewContext } from '../../App'
import { colorCard } from '../../assets/json'
import { Container } from '.'

const ColorCard:FC = ():JSX.Element => {
    const { $,PickerUtils } = useContext(NewContext)

    return (
        <Container>
            <div className="color-card-outer-frame">
                <div className="color-card-outer">
                    {$.maps(colorCard,(colorCode:string,index:number) => (
                        <div key={index} className="color-card-item" style={{ backgroundColor:colorCode }}>
                            <div className="card-content-mask">
                                <div>RGB：rgb({PickerUtils.hexToRgb(colorCode)})</div>
                                <div>HEX：{colorCode}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default ColorCard