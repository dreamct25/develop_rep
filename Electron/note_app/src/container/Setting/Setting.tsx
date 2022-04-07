import { ipcRenderer } from "electron";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Container } from '.'
import $ from '../../lib/Library'

interface initState {
    fontSize:string
    fontColor: {
        R: string,
        G: string,
        B: string
    }
}
const Setting: FunctionComponent = (): JSX.Element => {
    const [{
        fontSize,
        fontColor
    }, setInitState] = useState<initState>({
        fontSize:'16',
        fontColor: {
            R: '0',
            G: '0',
            B: '0'
        }
    })
    const closeWindow: () => void = () => {
        ipcRenderer.send('closeWindow')
    }

    const settingNoteContent: () => void = () => {
        ipcRenderer.send('settingNoteContent',{
            fontSize,
            fontColor
        })
    }

    const setVal: (valType: string, { target: { value } }: ChangeEvent<HTMLInputElement>) => void = (valType, { target: { value } }) => {
        setInitState(prevState => {
            const prevStateTemp: initState = { ...prevState }
            // for font color
            if (valType.match('fontColor')) {
                const [_, colorType]: string[] = valType.split('_');
                const currentFontColorObj = (prevStateTemp.fontColor as { [key: string]: any })
                if ($.convert(value, 'number') > 255) {
                    currentFontColorObj[colorType] = '255'
                } else if (value === '') {
                    currentFontColorObj[colorType] = '0'
                } else {
                    const valueTemp = value.split('')
                    if (valueTemp[0] === '0') valueTemp[0] = ''
                    currentFontColorObj[colorType] = valueTemp.join('')
                }
            } else {
                (prevStateTemp as { [key: string]: any })[valType] = value
            }
            return prevStateTemp
        })
    }
    return (
        <Container>
            <div className="top-close" onClick={closeWindow}>close</div>
            <div>
                <div>文字大小</div>
                <input type="text" value={fontSize} maxLength={3} onChange={setVal.bind(this,'fontSize')}></input>
            </div>
            <div className="font-color-group">
                <div>文字顏色</div>
                <div className="font-color-input-group">
                    <div>R <input type="text" value={fontColor.R} maxLength={3} onChange={setVal.bind(this, 'fontColor_R')} /></div>
                    <div>G <input type="text" value={fontColor.G} maxLength={3} onChange={setVal.bind(this, 'fontColor_G')} /></div>
                    <div>B <input type="text" value={fontColor.B} maxLength={3} onChange={setVal.bind(this, 'fontColor_B')} /></div>
                </div>
            </div>
            <div className="confirm-setting" onClick={settingNoteContent}>確定</div>
        </Container>
    )
}

export default Setting