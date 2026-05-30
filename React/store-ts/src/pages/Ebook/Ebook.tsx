import { useEffect, useContext, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { SingleEbookInfoModal, InfinitiScroll, Loading } from '@/component'
import { type SingleEbookDataType } from '@/component/SingleEbookInfoModal'
import { type SearchResp } from '../Home'
import { StyledLayout } from '.'

const Ebook:FC = ():TSX => {

    const query = useSearch({ from: '/ebook' }) as Record<'s', string>

    const { $ } = useContext(NewContext)

    const [{
        searchResult,
        singleData,
        toggleSingleEboolModalStatus
    }, setInitState] = useState<{
        searchResult: SearchResp<'ebook'>['results'],
        singleData: SingleEbookDataType | undefined,
        toggleSingleEboolModalStatus: boolean
    }>({
        searchResult: [],
        singleData: undefined,
        toggleSingleEboolModalStatus: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetcher:() => Promise<void> = async () => {

        const searchVal =  query.s

        if(!searchVal) return

        setIsLoading(true)

        const { data } = await $.fetch.get<{ data: SearchResp<'ebook'> }>(`${import.meta.env.VITE_APP_API_URL}/test/store/search`,{
            queryParams: {
                term: searchVal,
                media: 'ebook',
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

        const res = await $.fetch.get<{ data: { results: SingleEbookDataType[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        const [result] = res.data.data.results

        setInitState(prevState => ({
            ...prevState,
            singleData: result,
            toggleSingleEboolModalStatus: true
        }))

        setIsLoading(false)
    }

    useEffect(() => {

        document.body.style.overflow = toggleSingleEboolModalStatus ? 'hidden' : ''

    }, [toggleSingleEboolModalStatus])

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
                                            <div className="top" ref={element => {

                                                if(!element) return

                                                const imgPlaceHolder = element.querySelector('.img-place-holder') as HTMLDivElement
                                                const img = element.querySelector('.img-outer img') as HTMLImageElement

                                                img.onload = () => {
                                                    imgPlaceHolder.classList.remove('toggle')
                                                }
                                            }}>
                                                <div className="img-place-holder toggle"></div>
                                                <div className="img-outer">
                                                    <img src={`${row.artworkUrl100.replace(/100x100/g,"640x1280")}`} />
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div>
                                                    <span>{row.artistName} - {row.trackName}</span>
                                                </div>
                                                <div>分類：{row.genres}</div>
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
            <SingleEbookInfoModal
                singleData={singleData}
                toggleSingleEbookModalStatus={toggleSingleEboolModalStatus} 
                setToggleSingleEbookModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleEboolModalStatus: false }))}
            />
        </StyledLayout>
    )
}

export default Ebook