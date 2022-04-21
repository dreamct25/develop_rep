import { ipcRenderer } from "electron";
import React, { ChangeEvent, FunctionComponent, useState, MouseEvent, useEffect } from "react";
import { RgbaColorPicker } from 'react-colorful'
import { Container } from '.'
import $ from '../../lib/Library'

interface initState {
    fontSize: string
    fontFamily: string
    fontStyle: string,
    fontLineHeight: string,
    fontColor: { r: number, g: number, b: number, a: number },
    typingSpaceBackgroundColor: { r: number, g: number, b: number, a: number },
    toggleFontColorBox: boolean,
    toggleTypingSpaceBackgroundColor: boolean,
    haveUserSetting: boolean,
    userSettingId: number,
    systemFonts: string[]
    moveXY: {
        baseX: number,
        baseY: number
    }
}

interface dataType {
    uuid: number,
    font_size: string
    font_family: string
    font_style: string,
    font_line_height: string,
    font_color: string,
    background_color: string
}

$.fetch.createBase({
    baseUrl: 'http://localhost:9003',
    baseHeaders: { 'Content-Type': 'application/json' }
})

const Setting: FunctionComponent = (): JSX.Element => {
    const fontStyleList: string[] = ['Normal', 'Italic', 'Bold']
    const [{
        fontSize,
        fontColor,
        fontStyle,
        fontFamily,
        fontLineHeight,
        typingSpaceBackgroundColor,
        toggleFontColorBox,
        toggleTypingSpaceBackgroundColor,
        haveUserSetting,
        userSettingId,
        systemFonts,
        moveXY
    }, setInitState] = useState<initState>({
        fontSize: '16',
        fontFamily: '',
        fontStyle: 'normal',
        fontLineHeight: '20',
        fontColor: { r: 255, g: 255, b: 255, a: 1 },
        typingSpaceBackgroundColor: { r: 0, g: 0, b: 0, a: 1 },
        toggleFontColorBox: false,
        toggleTypingSpaceBackgroundColor: false,
        haveUserSetting: false,
        userSettingId: 999,
        systemFonts: [],
        moveXY: {
            baseX: -1,
            baseY: -1
        }
    })
    const closeWindow: () => void = () => {
        ipcRenderer.send('closeWindow')
    }

    const settingNoteContent: (setToDb: boolean) => void = setToDb => {
        ipcRenderer.send('settingNoteContent', {
            fontSize,
            fontColor,
            fontFamily,
            fontStyle,
            fontLineHeight,
            typingSpaceBackgroundColor
        })
        setToDb && setUserSettingToDb()
    }

    const setVal: (valType: string, value: any) => void = (valType, value) => {
        setInitState(prevState => {
            const prevStateTemp: initState = { ...prevState }

            switch (valType) {
                // for font color
                case 'fontColor':
                case 'typingSpaceBackgroundColor':
                    (prevStateTemp as { [key: string]: any })[valType] = value
                    return prevStateTemp
                case 'fontStyle':
                    (prevStateTemp as { [key: string]: any })[valType] = value.toLowerCase()
                    return prevStateTemp
                case 'fontSize':
                case 'fontLineHeight':
                    if (value === '' || $.convert(value, 'number') < -1) {
                        (prevStateTemp as { [key: string]: any })[valType] = '0'
                    } else {
                        const valueTemp: string[] = value.split('')
                        if (valueTemp[0] === '0') valueTemp[0] = '';
                        (prevStateTemp as { [key: string]: any })[valType] = valueTemp.join('')
                    }
                    return prevStateTemp
            }
        })
    }

    const toggleColorBox: (type: string, status: boolean) => void = (type, status) => {
        if (type === 'fontColorBox') {
            setInitState(prevState => ({
                ...prevState,
                toggleFontColorBox: status,
                toggleTypingSpaceBackgroundColor: false
            }))
        } else {
            setInitState(prevState => ({
                ...prevState,
                toggleFontColorBox: false,
                toggleTypingSpaceBackgroundColor: status
            }))
        }
    }

    const startDragWindow: ({ nativeEvent: { button, x, y } }: MouseEvent<HTMLDivElement>) => void = ({ nativeEvent: { button, x, y } }) => button === 0 && setInitState(initState => ({ ...initState, moveXY: { baseX: x, baseY: y } }))

    const moveingWindow: ({ screenX, screenY }: MouseEvent) => void = ({ screenX, screenY }) => {
        const { baseX, baseY } = moveXY
        ipcRenderer.send('setPosition', { windowName: 'settingWindow', dragX: screenX - baseX, dragY: screenY - baseY })
    }

    const endDragWindow: () => void = () => {
        setInitState(initState => ({ ...initState, moveXY: { baseX: -1, baseY: -1 } }))
        $(document).on('mousemove', () => { });
    }

    const getUserSetting: () => void = () => {
        $.fetch({
            method: 'get',
            url: '/db_api/get_user_setting',
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                if (data.data.length > 0) {
                    const [{
                        uuid,
                        font_size,
                        font_family,
                        font_style,
                        font_line_height,
                        font_color,
                        background_color
                    }]: dataType[] = data.data
                    console.log(data)
                    setInitState(prevState => ({
                        ...prevState,
                        fontSize: font_size,
                        fontFamily: font_family,
                        fontStyle: font_style,
                        fontLineHeight: font_line_height,
                        fontColor: $.convert(font_color, 'json'),
                        typingSpaceBackgroundColor: $.convert(background_color, 'json'),
                        userSettingId: uuid,
                        haveUserSetting: true
                    }))

                } else {
                    setInitState(prevState => ({
                        ...prevState,
                        haveUserSetting: false
                    }))
                    setUserSettingToDb()
                }
            },
            excuteDone: () => console.log('request done !'),
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const setUserSettingToDb: () => void = () => {
        const packPostData = {
            fontSize,
            fontColor: $.convert(fontColor, 'stringify'),
            fontFamily,
            fontStyle,
            fontLineHeight,
            typingSpaceBackgroundColor: $.convert(typingSpaceBackgroundColor, 'stringify')
        }

        $.fetch({
            method: 'post',
            url: haveUserSetting ? '/db_api/update_user_setting_item' : '/db_api/set_user_setting_item',
            data: haveUserSetting ? { uuid: userSettingId, ...packPostData } : packPostData,
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                console.log(data)
                getUserSetting()
            },
            excuteDone: () => console.log('request done !'),
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const getSystemFont: () => void = () => {
        $.fetch({
            method: 'get',
            url: '/get_font_setting',
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                setInitState(prevState => ({
                    ...prevState,
                    systemFonts: data.font
                }))
            },
            excuteDone: () => console.log('request done !'),
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    useEffect(() => {
        settingNoteContent(false)
    }, [userSettingId])

    useEffect(() => {
        const { baseX, baseY } = moveXY;
        (baseX !== -1 && baseY !== -1) && $(document).on('mousemove', moveingWindow);
    }, [moveXY])

    useEffect(() => {
        getSystemFont()
        getUserSetting()
    }, [])

    return (
        <Container>
            <div className="setting-outer">
                <div className="setting-title" onMouseDown={startDragWindow} onMouseUp={endDragWindow}>
                    <div className="title">Setting</div>
                    <div className="top-close" onClick={closeWindow}><i className="fas fa-times"></i></div>
                </div>
                <div className="setting-body">
                    <div className="flex">
                        <div className="font-size-input">
                            <span>Font Size</span>
                            <input type="text" value={fontSize} maxLength={3} onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setVal('fontSize', value)}></input>
                        </div>
                        <div className="font-line-height-input">
                            <div>Line Height</div>
                            <input type="text" value={fontLineHeight} maxLength={3} onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setVal('fontLineHeight', value)}></input>
                        </div>
                    </div>
                    <br />
                    <div className="font-style-group">
                        <span>Font Style</span>
                        <div className="font-style-list">
                            {$.maps(fontStyleList, (fontStyleItem: string, index: number): JSX.Element => (
                                <div
                                    className={fontStyleItem.toLowerCase() === fontStyle ? "font-style-list-item active" : "font-style-list-item"}
                                    key={index}
                                    onClick={() => setVal('fontStyle', fontStyleItem)}
                                >{fontStyleItem}</div>
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className="set-color-group">
                        <div className="font-color-group">
                            <div>Font Color</div>
                            <div className="current-select-font-color"
                                style={{
                                    backgroundColor: `rgba(${fontColor.r},${fontColor.g},${fontColor.b},${fontColor.a})`
                                }}
                                onClick={toggleColorBox.bind(this, 'fontColorBox', !toggleFontColorBox)}
                            />
                            <div className={toggleFontColorBox ? "select-font-color-box toggle-font-box" : "select-font-color-box"}>
                                <RgbaColorPicker
                                    color={fontColor}
                                    onChange={(value: { [key: string]: any }) => setVal('fontColor', value)}
                                />
                            </div>

                        </div>
                        <div className="typing-space-background-color-group">
                            <div>Background Color</div>
                            <div className="current-select-background-color"
                                style={{
                                    backgroundColor: `rgba(${typingSpaceBackgroundColor.r},${typingSpaceBackgroundColor.g},${typingSpaceBackgroundColor.b},${typingSpaceBackgroundColor.a})`
                                }}
                                onClick={toggleColorBox.bind(this, 'typingSpaceBackgroundColorBox', !toggleTypingSpaceBackgroundColor)}
                            />
                            <div className={toggleTypingSpaceBackgroundColor ? "select-background-color-box toggle-background-box" : "select-background-color-box"}>
                                <RgbaColorPicker
                                    color={typingSpaceBackgroundColor}
                                    onChange={(value: { [key: string]: any }) => setVal('typingSpaceBackgroundColor', value)}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="font-family-group">
                        <span>Font Family</span>
                        <div className="font-family-list-outer">
                            {$.maps(systemFonts, (fonts: string, index: number): JSX.Element => (
                                <div
                                    className={fontFamily === fonts ? "font-family-list-item active" : "font-family-list-item"}
                                    key={index}
                                    onClick={() => {
                                        setInitState(prevState => ({
                                            ...prevState,
                                            fontFamily: fonts
                                        }))
                                    }}
                                >{fonts}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="confirm-setting" onClick={settingNoteContent.bind(this, true)}>Confirm</div>
        </Container>
    )
}

export default Setting