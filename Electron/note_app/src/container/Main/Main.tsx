import { ipcRenderer } from 'electron'
import React, { memo, FunctionComponent, useState, ChangeEvent, useContext, useEffect, MouseEvent } from 'react'
import { newContext } from '../App/App'
import Container from './styles'

const Main: FunctionComponent = (): JSX.Element => {
    const { $ } = useContext(newContext)
    const [{
        textVal,
        texValCurrentId,
        textAreaWidth,
        textAreaHeight
    }, setIniteState] = useState<{
        textVal: string,
        texValCurrentId: string,
        textAreaWidth:number,
        textAreaHeight:number
    }>({
        textVal: '',
        texValCurrentId: '',
        textAreaWidth:window.innerWidth,
        textAreaHeight:window.innerHeight
    })

    const setVal: ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => void = ({ target: { value } }) => {
        setIniteState(prevState => ({
            ...prevState,
            textVal: value
        }))
    }

    const resolveTextVal = () => {
        const getWhiteSpace: string[] = textVal.split('\n')
        console.log(getWhiteSpace)
    }

    const getNoteList = () => {
        $.fetch({
            method: 'get',
            url: '/get_note_list',
            beforePost: () => console.log('request !'),
            successFn: ({ data }: { data: any }) => {
                console.log(data.data)
                setIniteState(prevState => ({
                    ...prevState,
                    textVal: ''
                }))
            },
            errorFn: ({ statusText }: { statusText: string }) => console.log(statusText)
        })
    }

    const setToDb: () => void = () => {
        $.fetch({
            method: 'post',
            url: '/set_note_list_item',
            data: { textVal },
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

    const deleteItemToDb = () => {
        $.fetch({
            method: 'post',
            url: '/delete_note_list_item',
            data: { uuid: 2 },
            before: () => console.log('request !'),
            successFn: ({ status }: { status: string }) => {
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

    ipcRenderer.on('deleteItem', () => {
        deleteItemToDb()
    })

    resolveTextVal()

    useEffect(() => {
        getNoteList()
        // window.addEventListener('resize',() => {
        //     setIniteState(prevState => ({
        //         ...prevState,
        //         textAreaWidth: Math.floor(window.innerWidth / 25)
        //     }))
        // })
    }, [])
    return (
        <Container>
            <textarea className='text-area' value={textVal} onMouseDown={showRightList} onChange={setVal}></textarea>
            {/* <div onClick={setToDb}>setToDB</div> */}
        </Container>
    )
}

export default memo(Main)