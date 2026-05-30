import { useEffect, useContext, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { StyledLayout } from '.'
import { SinglePodcastInfoModal, InfinitiScroll, Loading } from '@/component'
import { type SinglePodcastDataType } from '@/component/SinglePodcastInfoModal'
import { type SearchResp } from '../Home'

const Podcast:FC = ():TSX => {

    const query = useSearch({ from: '/podcast' }) as Record<'s', string>

    const { $ } = useContext(NewContext)

    const [{
        searchResult,
        singleData,
        toggleSinglePodcastModalStatus
    }, setInitState] = useState<{
        searchResult: SearchResp<'podcast'>['results'],
        singleData: SinglePodcastDataType | undefined,
        toggleSinglePodcastModalStatus: boolean
    }>({
        searchResult: [],
        singleData: undefined,
        toggleSinglePodcastModalStatus: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetcher:() => Promise<void> = async () => {

        const searchVal =  query.s

        if(!searchVal) return

        setIsLoading(true)

        const { data } = await $.fetch.get<{ data: SearchResp<'podcast'> }>(`${import.meta.env.VITE_APP_API_URL}/test/store/search`, {
            queryParams: {
                term: searchVal,
                media: 'podcast',
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

        const res = await $.fetch.get<{ data: { results: SinglePodcastDataType[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        const [result] = res.data.data.results

        setInitState(prevState => ({
            ...prevState,
            singleData: result,
            toggleSinglePodcastModalStatus: true
        }))

        setIsLoading(false)
    }

    useEffect(() => {

        document.body.style.overflow = toggleSinglePodcastModalStatus ? 'hidden' : ''

    }, [toggleSinglePodcastModalStatus])

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
                                                <div className="img-place-holder toggle">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                                        <g className="spinner">
                                                            <circle className="path" cx="25" cy="25" r="20" />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className="img-outer">
                                                    <img src={`${row.artworkUrl600.replace(/600x600/g,"720x720")}`} />
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div className='item'>
                                                    <div>播客：{row.collectionName}</div>
                                                    <div>類型：{row.primaryGenreName}</div>
                                                    <div>系列：{row.genres.join('、')}</div>
                                                </div>
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
            <SinglePodcastInfoModal
                singleData={singleData}
                toggleSinglePodcastModalStatus={toggleSinglePodcastModalStatus}
                setToggleSinglePodcastModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSinglePodcastModalStatus: false }))}
            />
        </StyledLayout>
    )
}

export default Podcast