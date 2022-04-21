import { ipcRenderer } from 'electron'
import React, { memo, FunctionComponent, useState, ChangeEvent, useContext, useEffect, MouseEvent, useRef } from 'react'
import { newContext } from '../App/App'
import Container from './styles'
interface dataType {
    create_date: string
    note_desc: string
    uuid: number
}
const Main: FunctionComponent = (): JSX.Element => {
    const { $ } = useContext(newContext)
    const [{
        textVal,
        textValCurrentId,
        textColor,
        textSize,
        textFontFamily,
        textFontStyle,
        textFontLineHeight,
        textBackgroundColor,
        haveNoteDesc,
        settingCurrentId,
        toggleMoveWindow,
        moveXY
    }, setIniteState] = useState<{
        textVal: string,
        textValCurrentId: number,
        textColor: string,
        textSize: string,
        textFontFamily: string,
        textFontStyle: string,
        textFontLineHeight: string,
        textBackgroundColor: string,
        settingCurrentId: number
        haveNoteDesc: boolean,
        toggleMoveWindow: boolean,
        moveXY: {
            baseX: number,
            baseY: number
        }
    }>({
        textVal: '',
        textValCurrentId: 999,
        textColor: 'rgba(0,0,0,1)',
        textSize: '16px',
        textFontFamily: '',
        textFontStyle: 'normal',
        textFontLineHeight: 'unset',
        textBackgroundColor: 'rgba(0,0,0,1)',
        haveNoteDesc: false,
        toggleMoveWindow: false,
        settingCurrentId: 1,
        moveXY: {
            baseX: -1,
            baseY: -1
        }
    })

    const resizeTimer = useRef(null)

    const setVal: ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => void = ({ target: { value } }) => {
        setIniteState(prevState => ({
            ...prevState,
            textVal: value
        }))
    }

    const getNoteList = () => {
        $.fetch({
            method: 'get',
            url: '/get_note_list',
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                if (data.data.length > 0) {
                    const [{ uuid, note_desc }]: dataType[] = data.data
                    setIniteState(prevState => ({
                        ...prevState,
                        textVal: note_desc,
                        textValCurrentId: uuid,
                        haveNoteDesc: true
                    }))
                } else {
                    setIniteState(prevState => ({
                        ...prevState,
                        textVal: '',
                        textValCurrentId: 999,
                        haveNoteDesc: false
                    }))
                }
            },
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const getUserWindowSetting: () => void = () => {
        $.fetch({
            method: 'get',
            url: '/get_user_setting',
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                if (data.data.length > 0) {
                    const [{ window_pos_x, window_pos_y, window_size_w, window_size_h }]: { [key: string]: any }[] = data.data
                    if (window_pos_x && window_pos_y) {
                        ipcRenderer.send('setPosition', { windowName: 'mainWindow', dragX: window_pos_x, dragY: window_pos_y })
                    }
                    if (window_size_w && window_size_h) {
                        ipcRenderer.send('setSize', { width: window_size_w, height: window_size_h })
                    }
                }
            },
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const addToNoteList: () => void = () => {
        $.fetch({
            method: 'post',
            url: '/set_note_list_item',
            data: { textVal, textValCurrentId },
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                console.log(data)
            },
            excuteDone: () => {
                setIniteState(prevState => ({
                    ...prevState,
                    textVal: ''
                }))
                getNoteList()
            },
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const updateToNoteList: () => void = () => {
        $.fetch({
            method: 'post',
            url: '/update_note_list_item',
            data: { textVal, textValCurrentId },
            beforePost: () => console.log('request !'),
            successFn: ({ data: { status } }: { data: { status: string } }) => {
                if (status === 'ok') getNoteList()
            },
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const deleteItemToNoteList = () => {
        $.fetch({
            method: 'post',
            url: '/delete_note_list_item',
            data: { uuid: textValCurrentId },
            before: () => console.log('request !'),
            successFn: ({ data: { status } }: { data: { status: string } }) => {
                if (status === 'ok') {
                    getNoteList()
                }
            },
            excuteDone: () => console.log('request done !'),
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const showRightList: ({ button }: MouseEvent) => void = ({ button }) => {
        if (button === 2) {
            ipcRenderer.send('showRightMenu')
        }
    }

    const startDragWindow: ({ nativeEvent: { button, x, y } }: MouseEvent<HTMLDivElement>) => void = ({ nativeEvent: { button, x, y } }) => button === 0 && setIniteState(prevState => ({ ...prevState, moveXY: { baseX: x, baseY: y } }))

    const moveingWindow: ({ screenX, screenY }: MouseEvent) => void = ({ screenX, screenY }) => {
        const { baseX, baseY } = moveXY
        ipcRenderer.send('setPosition', { windowName: 'mainWindow', dragX: screenX - baseX, dragY: screenY - baseY })
    }

    const endDragWindow: () => void = () => {
        setIniteState(prevState => ({
            ...prevState,
            toggleMoveWindow: false,
            moveXY: { baseX: -1, baseY: -1 }
        }))
        $(document).on('mousemove', () => { });
        ipcRenderer.send('getCurrentWindowSetting')
    }

    useEffect(() => {
        ipcRenderer.once('deleteItem', () => deleteItemToNoteList())
    }, [textValCurrentId])

    useEffect(() => {
        const { baseX, baseY } = moveXY;
        (baseX !== -1 && baseY !== -1) && $(document).on('mousemove', moveingWindow);
    }, [moveXY])

    useEffect(() => {
        getNoteList()
        getUserWindowSetting()
        $(window).on('resize', () => {
            ipcRenderer.send('getCurrentWindowSetting', 'resize')
        })
        ipcRenderer.on('currentResizeWindowSize', (event, value) => {
            const { width, height } = value
            clearTimeout(resizeTimer.current)
            resizeTimer.current = setTimeout(() => {
                $.fetch({
                    method: 'post',
                    url: '/update_user_setting_current_window_size',
                    data: {
                        uuid: settingCurrentId,
                        sizeW: width,
                        sizeH: height
                    },
                    before: () => console.log('request !'),
                    successFn: ({ data: { message } }: { data: { message: string } }) => {
                        getUserWindowSetting()
                    },
                    excuteDone: () => console.log('request done !'),
                    errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
                })
            }, 500)
        })
        ipcRenderer.on('currentWindowSetting', (event, value) => {
            const { x, y } = value
            $.fetch({
                method: 'post',
                url: '/update_user_setting_current_window_pos',
                data: {
                    uuid: settingCurrentId,
                    posX: x,
                    posY: y
                },
                before: () => console.log('request !'),
                successFn: ({ data: { message } }: { data: { message: string } }) => {
                    getUserWindowSetting()
                },
                excuteDone: () => console.log('request done !'),
                errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
            })
        })
        ipcRenderer.on('moveWindow', () => setIniteState(prevState => ({ ...prevState, toggleMoveWindow: true })))
        ipcRenderer.on('getSettingNoteContent', (event, value: {
            fontSize: string,
            fontStyle: string
            fontColor: {
                r: number,
                g: number,
                b: number,
                a: number
            },
            typingSpaceBackgroundColor: {
                r: number,
                g: number,
                b: number,
                a: number
            },
            fontFamily: string,
            fontLineHeight: string
        }) => {
            const {
                fontSize,
                fontStyle,
                fontFamily,
                fontLineHeight,
                fontColor,
                typingSpaceBackgroundColor
            } = value

            setIniteState(prevState => ({
                ...prevState,
                textSize: `${fontSize}px`,
                textColor: `rgba(${fontColor.r},${fontColor.g},${fontColor.b},${fontColor.a})`,
                textFontFamily: fontFamily,
                textFontStyle: fontStyle,
                textFontLineHeight: fontLineHeight === '0' ? 'unset' : `${fontLineHeight}px`,
                textBackgroundColor: `rgba(${typingSpaceBackgroundColor.r},${typingSpaceBackgroundColor.g},${typingSpaceBackgroundColor.b},${typingSpaceBackgroundColor.a})`
            }))
        })
    }, [])
    return (
        <Container>
            <div className={toggleMoveWindow ? 'drag-window toggle' : 'drag-window'}
                onMouseDown={startDragWindow}
                onMouseUp={endDragWindow}
            ></div>
            <textarea
                className='text-area'
                style={{
                    fontSize: textSize,
                    color: textColor,
                    fontFamily: textFontFamily,
                    fontStyle: textFontStyle === 'bold' ? 'normal' : textFontStyle,
                    fontWeight: textFontStyle === 'bold' ? textFontStyle : 'unset',
                    lineHeight: textFontLineHeight,
                    backgroundColor: textBackgroundColor
                }}
                value={textVal}
                onMouseDown={showRightList}
                onChange={setVal}
                onBlur={() => {
                    haveNoteDesc ? updateToNoteList() : addToNoteList()
                }}
            />
        </Container>
    )
}

export default memo(Main)