import { useEffect, useContext, useState, useRef } from 'react'
import { useSearch } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { StyledLayout } from '.'
import { SingleMusicInfoModal, InfinitiScroll, Loading } from '@/component'
import { type SingleMusicDataType } from '@/component/SingleMusicInfoModal'
import { type SearchResp } from '../Home'

const Music:FC = ():TSX => {

    const query = useSearch({ from: '/music' }) as Record<'s', string>

    const { $ } = useContext(NewContext)

    const [{
        searchResult,
        singleData,
        toggleSingleMusicModalStatus
    }, setInitState] = useState<{
        searchResult: SearchResp<'music'>['results'],
        singleData: SingleMusicDataType | undefined,
        toggleSingleMusicModalStatus: boolean
    }>({
        searchResult: [],
        singleData: undefined,
        toggleSingleMusicModalStatus: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const singleMusicInfoModalRef = useRef<{ timeFormat(timeVal: number): string }>(null)

    const fetcher:() => Promise<void> = async () => {

        const searchVal =  query.s

        if(!searchVal) return

        setIsLoading(true)

        const { data } = await $.fetch.get<{ data: SearchResp<'music'> }>(`${import.meta.env.VITE_APP_API_URL}/test/store/search`, {
            queryParams: {
                term: searchVal,
                media: 'music',
                country: 'tw',
                limit: 200
            }
        })

        setInitState(prevState => ({
            ...prevState,
            searchResult: data.data.results
        }))

        setIsLoading(false)
    }

    const getSingleSelectInfoHandler: (lookupId: number) => void = async lookupId => {

        setIsLoading(true)
        
        setInitState(prevState => ({
            ...prevState,
            singleData: undefined
        }))

        const res = await $.fetch.get<{ data: { results: SingleMusicDataType[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        const [result] = res.data.data.results

        setInitState(prevState => ({
            ...prevState,
            singleData: result,
            toggleSingleMusicModalStatus: true
        }))

        setIsLoading(false)
    }

    useEffect(() => {

        document.body.style.overflow = toggleSingleMusicModalStatus ? 'hidden' : ''

    }, [toggleSingleMusicModalStatus])

    useEffect(() => {

        fetcher()

    }, [])

    return (
        <StyledLayout>
            <div className='list-outer'>
                <div className='list'>
                    {
                        searchResult.length > 0 && (
                            <InfinitiScroll
                                mountedElement={document}
                                list={searchResult}
                                triggerOffset={200}
                                pageSize={20}
                                renderList={list => 
                                    $.maps(list, (row, index) => (
                                        <div className='card' key={index} onClick={getSingleSelectInfoHandler.bind(undefined, row.trackId)}>
                                            <div className="left" ref={element => {

                                                if(!element) return

                                                const imgPlaceHolder = element.querySelector('.img-place-holder') as HTMLDivElement
                                                const img = element.querySelector('.img-outer img') as HTMLImageElement

                                                img.onload = () => {
                                                    imgPlaceHolder.classList.remove('toggle')
                                                }
                                            }}>
                                                <div className="img-place-holder toggle">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                        <g className="spinner">
                                                            <circle className="path" cx="25" cy="25" r="20" />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="img-outer">
                                                    <img src={`${row.artworkUrl100.replace(/100x100/g,"640x640")}`} />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div>
                                                    <span>{row.artistName} - {row.trackName}</span>
                                                </div>
                                                <div>專輯：{row.collectionName}</div>
                                                <div>曲長：{singleMusicInfoModalRef.current?.timeFormat(row.trackTimeMillis)}</div>
                                                <div>曲風：{row.primaryGenreName}</div>
                                                <div>發行日期：{$.formatDateTime({ formatDate: row.releaseDate, formatType: 'yyyy-MM-dd' })}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            />
                        )
                    }
                </div>
            </div>
            <Loading toggleLoadingStatus={isLoading} />
            <SingleMusicInfoModal
                ref={singleMusicInfoModalRef}
                singleData={singleData}
                toggleSingleMusicModalStatus={toggleSingleMusicModalStatus}
                setToggleSingleMusicModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleMusicModalStatus: false }))}
            />
        </StyledLayout>
    )
}

export default Music