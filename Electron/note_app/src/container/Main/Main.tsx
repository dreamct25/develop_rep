import { ipcRenderer } from 'electron'
import React, { memo, FunctionComponent, useState, ChangeEvent, useContext, useEffect, MouseEvent } from 'react'
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
        haveNoteDesc
    }, setIniteState] = useState<{
        textVal: string,
        textValCurrentId: number,
        textColor: string,
        textSize: string,
        textFontFamily: string,
        textFontStyle: string,
        textFontLineHeight: string,
        textBackgroundColor: string
        haveNoteDesc: boolean
    }>({
        textVal: '',
        textValCurrentId: 999,
        textColor: 'rgba(0,0,0,1)',
        textSize: '16px',
        textFontFamily: '',
        textFontStyle: 'normal',
        textFontLineHeight: 'unset',
        textBackgroundColor: 'rgba(0,0,0,1)',
        haveNoteDesc: false
    })

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

    useEffect(() => {
        ipcRenderer.once('deleteItem', () => deleteItemToNoteList())
    }, [textValCurrentId])

    useEffect(() => {
        getNoteList()

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
                // onBlur={() => {
                //     haveNoteDesc ? updateToNoteList() : addToNoteList()
                // }}
            />
        </Container>
    )
}

export default memo(Main)