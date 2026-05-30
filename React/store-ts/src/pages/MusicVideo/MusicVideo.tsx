import { useEffect, useContext, useState, useRef } from 'react'
import { useSearch } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { StyledLayout } from '.'
import { SingleMusicVideoInfoModal, InfinitiScroll, Loading } from '@/component'
import { type SingleMusicVideoDataType } from '@/component/SingleMusicVideoInfoModal'
import { type SearchResp } from '../Home'

const MusicVideo:FC = ():TSX => {

    const query = useSearch({ from: '/music-video' }) as Record<'s', string>

    const { $ } = useContext(NewContext)

    const [{
        searchResult,
        singleData,
        toggleSingleMusicVideoModalStatus
    }, setInitState] = useState<{
        searchResult: SearchResp<'music-video'>['results'],
        singleData: SingleMusicVideoDataType | undefined,
        toggleSingleMusicVideoModalStatus: boolean
    }>({
        searchResult: [],
        singleData: undefined,
        toggleSingleMusicVideoModalStatus: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const singleMusicVideoInfoModalRef = useRef<{ timeFormat(timeVal: number): string }>(null)

    const fetcher:() => Promise<void> = async () => {

        const searchVal =  query.s

        if(!searchVal) return

        setIsLoading(true)

        const { data } = await $.fetch.get<{ data: SearchResp<'music-video'> }>(`${import.meta.env.VITE_APP_API_URL}/test/store/search?`, {
            queryParams: {
                term: searchVal,
                media: 'musicVideo',
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

        const res = await $.fetch.get<{ data: { results: SingleMusicVideoDataType[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        const [result] = res.data.data.results

        setInitState(prevState => ({
            ...prevState,
            singleData: result,
            toggleSingleMusicVideoModalStatus: true
        }))

        setIsLoading(false)
    }

    useEffect(() => {

        document.body.style.overflow = toggleSingleMusicVideoModalStatus ? 'hidden' : ''

    }, [toggleSingleMusicVideoModalStatus])

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

                                                if(row?.artworkUrl100) {

                                                    const imgPlaceHolder = element.querySelector('.img-place-holder') as HTMLDivElement
                                                    const imgBackgroundTarget = element.querySelector('.img-outer .img') as HTMLImageElement

                                                    const imgTemp = new Image()
                                                    imgTemp.src = row.artworkUrl100.replace(/100x100/g,"640x640")

                                                    imgTemp.onload = () => {
                                                        imgBackgroundTarget.style.cssText = `--bg: url('${row.artworkUrl100.replace(/100x100/g,"640x640")}');`
                                                        imgPlaceHolder.classList.remove('toggle')
                                                    }
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
                                                    <div className="img"></div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div>
                                                    <span>{row.artistName} - {row.trackName}</span>
                                                </div>
                                                <div>曲長：{singleMusicVideoInfoModalRef.current?.timeFormat(row.trackTimeMillis)}</div>
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
            <SingleMusicVideoInfoModal
                ref={singleMusicVideoInfoModalRef}
                singleData={singleData}
                toggleSingleMusicVideoModalStatus={toggleSingleMusicVideoModalStatus}
                setToggleSingleMusicVideoModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleMusicVideoModalStatus: false }))}
            />
        </StyledLayout>
    )
}

export default MusicVideo