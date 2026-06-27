import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { NewContext } from '../../App'
import { Container,initStateType } from '.'
import { CustomInput } from '@/component/CustomInput'

const Converter: FC = (): TSX => {

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

    const setInputVal: (
        inputName: string, 
        { target }: ChangeEvent<HTMLInputElement>
    ) => void = (inputName, { target }) => {
        
        const currentVal = target.value;

        if (inputName === 'inHex_HexVal') {

            const [R, G, B] = PickerUtils.hexToRgb(target.value).split(',')
            
            setInitState(prevState => ({
                ...prevState,
                inHex_RVal: R,
                inHex_GVal: G,
                inHex_BVal: B,
                inHex_HexVal: target.value
            }))

            return
        }

        if (currentVal === '') target.value = '0';

        if (Number(currentVal) > 255) target.value = '255';

        if (currentVal.split('')[0] === '0') {
            
            const strTemp = currentVal.split('')
            strTemp.shift();
            target.value = strTemp.join('');
        }

        setInitState(prevState => ({
            ...prevState,
            [inputName]: target.value,
        }))
    }

    const timeOutHandler: (status: boolean) => void = status => {
        
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
            inRGB_HexVal: PickerUtils.rgbToHex(
                $.convert<number>(inRGB_RVal, 'number'), 
                $.convert<number>(inRGB_GVal, 'number'), 
                $.convert<number>(inRGB_BVal, 'number')
            )
        }))

    },[inRGB_RVal, inRGB_GVal, inRGB_BVal])

    return (
        <Container>
            <div className="board-outer-frame">
                <div className="board-outer">
                    <div className="converter-btn" onClick={toggleBoard.bind(undefined, !toggleMode)}>{formatLanguage('pages.converter.toggleConverter')}</div>
                    <div className={toggleMode ? "board-to-rgb" : "board-to-rgb active"}>
                        <div className="input-groups">
                            <div className="top">
                                <div className="converter-rgb-title">
                                    {formatLanguage('pages.converter.rgbToHex')}
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="R-input-group">
                                    <CustomInput 
                                        label='R' 
                                        type="number"
                                        labelAlign="default"
                                        usingType="input"
                                        useStyle="white"
                                        inputStyle="default"
                                        size="md"
                                        align="center"
                                        marginBottom={12}
                                        inputVal={inRGB_RVal} 
                                        changeEvent={setInputVal.bind(undefined, 'inRGB_RVal')}
                                    />
                                </div>
                                <div className="G-input-group">
                                    <CustomInput 
                                        label='G' 
                                        type="number"
                                        labelAlign="default"
                                        usingType="input"
                                        useStyle="white"
                                        inputStyle="default"
                                        size="md"
                                        align="center"
                                        marginBottom={12}
                                        inputVal={inRGB_GVal}
                                        changeEvent={setInputVal.bind(undefined, 'inRGB_GVal')}
                                    />
                                </div>
                                <div className="B-input-group">
                                    <CustomInput 
                                        label='B' 
                                        type="number"
                                        labelAlign="default"
                                        usingType="input"
                                        useStyle="white"
                                        inputStyle="default"
                                        size="md"
                                        align="center"
                                        marginBottom={6}
                                        inputVal={inRGB_BVal} 
                                        changeEvent={setInputVal.bind(undefined, 'inRGB_BVal')}
                                    />
                                </div>
                                <div className="converter-rgb-footer">{formatLanguage('pages.converter.toHex')}</div>
                                <div className="to-hex-input-group">
                                    <input type="text" readOnly value={inRGB_HexVal} />
                                    <div className="copy-btn" onClick={copyText.bind(undefined, inRGB_HexVal)}>
                                        <FontAwesomeIcon icon={faCopy} />
                                        <div className="tooltip">{formatLanguage(`pages.converter.${isCopyed ? "copied" : "copy"}`)}</div>
                                    </div>
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
                            <div className="top">
                                <div className="converter-hex-title">
                                    {formatLanguage('pages.converter.hexToRGB')}
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="hex-input-group">
                                    <CustomInput 
                                        label='Hex' 
                                        type="text"
                                        labelAlign="default"
                                        usingType="input"
                                        useStyle="white"
                                        inputStyle="default"
                                        size="md"
                                        align="center"
                                        marginBottom={6}
                                        inputVal={inHex_HexVal} 
                                        changeEvent={setInputVal.bind(undefined, 'inHex_HexVal')}
                                    />
                                    {/* <input type="text" value={inHex_HexVal} onChange={setInputVal.bind(undefined, 'inHex_HexVal')}/> */}
                                </div>
                                <div className="converter-hex-footer">{formatLanguage('pages.converter.toRGB')}</div>
                                <div className="hex-RGB-input-group">
                                    <div className="to-R-input-group">
                                        <CustomInput 
                                            label='R' 
                                            type="number"
                                            labelAlign="default"
                                            usingType="input"
                                            useStyle="white"
                                            inputStyle="default"
                                            size="md"
                                            align="center"
                                            marginBottom={1}
                                            inputVal={inHex_RVal}
                                            readOnly
                                        />
                                        {/* <input type="number" inputMode="numeric" readOnly value={inHex_RVal} />
                                        <p>R</p> */}
                                    </div>
                                    <div className="to-G-input-group">
                                        <CustomInput 
                                            label='G' 
                                            type="number"
                                            labelAlign="default"
                                            usingType="input"
                                            useStyle="white"
                                            inputStyle="default"
                                            size="md"
                                            align="center"
                                            marginBottom={1}
                                            inputVal={inHex_GVal}
                                            readOnly
                                        />
                                        {/* <input type="number" inputMode="numeric" readOnly value={inHex_GVal} />
                                        <p>G</p> */}
                                    </div>
                                    <div className="to-B-input-group">
                                        <CustomInput 
                                            label='B' 
                                            type="number"
                                            labelAlign="default"
                                            usingType="input"
                                            useStyle="white"
                                            inputStyle="default"
                                            size="md"
                                            align="center"
                                            marginBottom={1}
                                            inputVal={inHex_BVal}
                                            readOnly
                                        />
                                        {/* <input type="number" inputMode="numeric" readOnly value={inHex_BVal} />
                                        <p>B</p> */}
                                    </div>
                                </div>
                                <div className="full-rgb-input-group">
                                    <input type="text" readOnly value={`rgb(${inHex_RVal}, ${inHex_GVal}, ${inHex_BVal})`} />
                                    <div className="copy-btn" onClick={copyText.bind(undefined, `rgb(${inHex_RVal},${inHex_GVal},${inHex_BVal})`)}>
                                        <FontAwesomeIcon icon={faCopy} />
                                        <div className="tooltip">{formatLanguage(`pages.converter.${isCopyed ? "copied" : "copy"}`)}</div>
                                    </div>
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