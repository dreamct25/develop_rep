import { ChangeEvent, FC,useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { NewContext } from '../../App'
import { Container,initStateType } from '.'

const Converter:FC = ():JSX.Element => {

    const { $,formatLanguage,PickerUtils } = useContext(NewContext)

    const [{
        toggleMode,
        inRGB_RVal,
        inRGB_GVal,
        inRGB_BVal,
        inRGB_HexVal,
        inHex_RVal,
        inHex_GVal,
        inHex_BVal,
        inHex_HexVal,
        isCopyed
    },setInitState] = useState<initStateType>({
        toggleMode: false,
        inRGB_RVal: '0',
        inRGB_GVal: '0',
        inRGB_BVal: '0',
        inRGB_HexVal: '#000000',
        inHex_RVal: '0',
        inHex_GVal: '0',
        inHex_BVal: '0',
        inHex_HexVal: '#000000',
        isCopyed: false
    })

    const toggleBoard:(status: boolean) => void = status => {
        setInitState(prevState => ({
            ...prevState,
            toggleMode: status
        }))
    }

    const setInputVal:(inputName: string, { target }: ChangeEvent<HTMLInputElement>) => void = (inputName,{ target }) => {
        const currentVal = target.value;

        if (inputName === 'inHex_HexVal') {
            const [R, G, B] = PickerUtils.hexToRgb(target.value)!.split(',')
            setInitState(prevState => ({
                ...prevState,
                inHex_RVal: R,
                inHex_GVal: G,
                inHex_BVal: B,
                inHex_HexVal: target.value
            }))
        } else {
            if (currentVal.split('')[0] === '0') {
                const strTemp = currentVal.split('')
                strTemp.shift();
                target.value = strTemp.join('');
            } else if (currentVal === '') {
                target.value = '0';
            } else if (Number(currentVal) > 255) {
                target.value = '255';
            }

            setInitState(prevState => ({
                ...prevState,
                [inputName]: target.value,
            }))
        }
    }

    const timeOutHandler:(status:boolean) => void = status => {
        setInitState(prevState => ({
            ...prevState,
            isCopyed: status
        }))
    }

    const copyText:(copyVal: string) => void = copyVal => {
        navigator.clipboard.writeText(copyVal)
        timeOutHandler(true)
        setTimeout(timeOutHandler, 1000,false)
    }

    useEffect(() => {
        setInitState(prevState => ({
            ...prevState,
            inRGB_HexVal: PickerUtils.rgbToHex($.convert<number>(inRGB_RVal, 'number')!, $.convert<number>(inRGB_GVal, 'number')!, $.convert<number>(inRGB_BVal, 'number')!)
        }))
    },[inRGB_RVal,inRGB_GVal,inRGB_BVal])

    return (
        <Container>
            <div className="board-outer-frame">
                <div className="board-outer">
                    <div className="converter-btn" onClick={toggleBoard.bind(this, !toggleMode)}>{formatLanguage('pages.converter.toggleConverter')}</div>
                    <div className={toggleMode ? "board-to-rgb" : "board-to-rgb active"}>
                        <div className="input-groups">
                            <div className="converter-rgb-title">{formatLanguage('pages.converter.rgbToHex')}</div>
                            <div className="R-input-group">
                                <input type="number" inputMode="numeric" value={inRGB_RVal} onChange={setInputVal.bind(this, 'inRGB_RVal')}/>
                                <p>R</p>
                            </div>
                            <div className="G-input-group">
                                <input type="number" inputMode="numeric" value={inRGB_GVal} onChange={setInputVal.bind(this, 'inRGB_GVal')} />
                                <p>G</p>
                            </div>
                            <div className="B-input-group">
                                <input type="number" inputMode="numeric" value={inRGB_BVal} onChange={setInputVal.bind(this, 'inRGB_BVal')} />
                                <p>B</p>
                            </div>
                            <div className="converter-rgb-footer">{formatLanguage('pages.converter.toHex')}</div>
                            <div className="to-hex-input-group">
                                <input type="text" readOnly value={inRGB_HexVal} />
                                <div className="copy-btn" onClick={copyText.bind(this, inRGB_HexVal)}>
                                    <FontAwesomeIcon icon={faCopy} />
                                    <div className="tooltip">{formatLanguage(`pages.converter.${isCopyed ? "copied" : "copy"}`)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="preview-color">
                            <div className="color-box" style={{ backgroundColor: `${inRGB_HexVal}` }}></div>
                            <div className="color-box-frame">{formatLanguage('pages.converter.previewColor')}</div>
                        </div>
                    </div>
                    <div className={toggleMode ? "board-to-hex active" : "board-to-hex"}>
                        <div className="input-groups">
                            <div className="converter-rgb-title">{formatLanguage('pages.converter.hexToRGB')}</div>
                            <div className="hex-input-group">
                                <input type="text" value={inHex_HexVal} onChange={setInputVal.bind(this, 'inHex_HexVal')}/>
                            </div>
                            <div className="converter-hex-footer">{formatLanguage('pages.converter.toRGB')}</div>
                            <div className="hex-RGB-input-group">
                                <div className="to-R-input-group">
                                    <input type="number" inputMode="numeric" readOnly value={inHex_RVal} />
                                    <p>R</p>
                                </div>
                                <div className="to-G-input-group">
                                    <input type="number" inputMode="numeric" readOnly value={inHex_GVal} />
                                    <p>G</p>
                                </div>
                                <div className="to-B-input-group">
                                    <input type="number" inputMode="numeric" readOnly value={inHex_BVal} />
                                    <p>B</p>
                                </div>
                            </div>
                            <div className="full-rgb-input-group">
                                <input type="text" readOnly value={`rgb(${inHex_RVal},${inHex_GVal},${inHex_BVal})`} />
                                <div className="copy-btn" onClick={copyText.bind(this, `rgb(${inHex_RVal},${inHex_GVal},${inHex_BVal})`)}>
                                    <FontAwesomeIcon icon={faCopy} />
                                    <div className="tooltip">{formatLanguage(`pages.converter.${isCopyed ? "copied" : "copy"}`)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="preview-color">
                            <div className="color-box" style={{
                                backgroundColor: `rgb(${inHex_RVal},${inHex_GVal},${inHex_BVal})`
                            }}></div>
                            <div className="color-box-frame">{formatLanguage('pages.converter.previewColor')}</div>
                        </div>
                    </div>
                </div>
                <div className="operate-desc">
                    <div className="title">{formatLanguage('pages.converter.operateDescTitle')}</div>
                    <div className="desc">{formatLanguage('pages.converter.operateDescContent')}</div>
                </div>
            </div>
        </Container>
    )
}

export default Converter