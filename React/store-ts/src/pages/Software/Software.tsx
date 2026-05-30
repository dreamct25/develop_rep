import { useEffect, useContext, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { StyledLayout } from '.'
import { SingleSoftwareInfoModal, InfinitiScroll, Loading } from '@/component'
import { type SingleSoftwareDataType } from '@/component/SingleSoftwareInfoModal'
import { type SearchResp } from '../Home'

const Software:FC = ():TSX => {

    const query = useSearch({ from: '/software' }) as Record<'s', string>

    const { $ } = useContext(NewContext)

    const [{
        searchResult,
        singleData,
        toggleSingleSoftwareModalStatus
    }, setInitState] = useState<{
        searchResult: SearchResp<'software'>['results'],
        singleData: SingleSoftwareDataType | undefined,
        toggleSingleSoftwareModalStatus: boolean
    }>({
        searchResult: [],
        singleData: undefined,
        toggleSingleSoftwareModalStatus: false
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetcher:() => Promise<void> = async () => {

        const searchVal =  query.s

        if(!searchVal) return

        setIsLoading(true)

        const { data } = await $.fetch.get<{ data: SearchResp<'software'> }>(`${import.meta.env.VITE_APP_API_URL}/test/store/search`, {
            queryParams: {
                term: searchVal,
                media: 'software',
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

        const res = await $.fetch.get<{ data: { results: SingleSoftwareDataType[] } }>(`${import.meta.env.VITE_APP_API_URL}/test/store/single`, {
            queryParams: {
                id: lookupId,
                country: 'TW'
            }
        })

        const [result] = res.data.data.results

        setInitState(prevState => ({
            ...prevState,
            singleData: result,
            toggleSingleSoftwareModalStatus: true
        }))

        setIsLoading(false)
    }

    useEffect(() => {

        document.body.style.overflow = toggleSingleSoftwareModalStatus ? 'hidden' : ''

    }, [toggleSingleSoftwareModalStatus])

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
                                                    <img src={`${row.artworkUrl100.replace(/100x100/g,"640x1280")}`} />
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div>{row.trackName}</div>
                                                <div>{row.sellerName}</div>
                                                <div>分類：{row.genres}</div>
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
            <SingleSoftwareInfoModal
                singleData={singleData}
                toggleSingleSoftwareModalStatus={toggleSingleSoftwareModalStatus} 
                setToggleSingleSoftwareModalStatus={setInitState.bind(undefined, prevState => ({ ...prevState, toggleSingleSoftwareModalStatus: false }))}
            />
        </StyledLayout>
    )
}

export default Software