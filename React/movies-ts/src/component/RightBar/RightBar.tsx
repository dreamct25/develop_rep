import { type MouseEventHandler, useRef, useContext, useEffect } from "react"
import { useNavigate } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { NoImage } from '@/component'
import { type resultType } from '@/pages/Home'
import { StyledLayout } from '.'

const RightBar: FC<{
    postData: (resultType & Record<string, string>)[],
    postCurrentSelect: (id: number) => void,
}> = ({ postData, postCurrentSelect }): TSX => {
    
    const router = useNavigate()

    const { $, getReducer } = useContext(NewContext)

    const { currentSelectAtLeftBarType, toggleBarAnimate } = getReducer(state => ({
        currentSelectAtLeftBarType: state.LeftBarReducer.currentSelectAtLeftBarType,
        toggleBarAnimate: state.HomeReducer.toggleBarAnimate
    }))

    const currentPostType = {
        movie: ['title', 'original_title'],
        tv: ['name', 'original_name']
    }

    const rightListRef = useRef<HTMLDivElement>(null)

    const currentSelect: (id: number) => void = id => {

        postCurrentSelect(id)
        
        if(window.innerWidth <= 414) setTimeout(() => goSinglePreviewVideo(id), 1700)
    }

    const pushSearchPage: MouseEventHandler<HTMLDivElement> = () => router({
        to: "/search",
        search: { 
            s: currentSelectAtLeftBarType === 'movie' ? 'popular_movie' : 'popular_tv', 
            type: currentSelectAtLeftBarType 
        }
    })

    const goSinglePreviewVideo:(id: number) => void = id => { 
        router({ to: '/single_preview', search: { id, type: currentSelectAtLeftBarType }}) 
    }

    useEffect(() => {
        
        if(!rightListRef.current) return

        $(rightListRef.current).scrollToPos({ direction: 'top', scrollPos: 0, duration: 1200 })
        
    }, [currentSelectAtLeftBarType])

    return (
        <StyledLayout>
            <div className={toggleBarAnimate ? "right-list-outer outer-active" : "right-list-outer"}>
                <div className="right-list" ref={rightListRef}>
                    {
                        postData.length > 0 && (
                            <>
                                {
                                    $.maps(postData, (item, index) => (
                                        <div className="poster-card" key={index} onClick={currentSelect.bind(this, item.id)}>
                                            <div className="poster-img">
                                                {
                                                    item.poster_path ? (
                                                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                                    ) : (
                                                        <NoImage text={'No Poster Image'} />
                                                    )
                                                }
                                                <div className="rate">{item.vote_average.toFixed(1)}<i className="fas fa-star stars"></i></div>
                                                <div className="release-date">
                                                    {currentSelectAtLeftBarType === 'movie' ? '上映日' : '首播日'}：
                                                    {currentSelectAtLeftBarType === 'movie' ? item.release_date : item.first_air_date}
                                                </div>
                                            </div>
                                            <div className="poster-card-body">
                                                <div className="title-group">
                                                    <span>{item[currentPostType[currentSelectAtLeftBarType][0]]}</span>
                                                    {
                                                        item[currentPostType[currentSelectAtLeftBarType][0]] !==
                                                        item[currentPostType[currentSelectAtLeftBarType][1]] && (
                                                            <span>{item[currentPostType[currentSelectAtLeftBarType][1]]}</span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div 
                                    className="more-info" 
                                    onClick={pushSearchPage}
                                >
                                    更多熱門{currentSelectAtLeftBarType === 'movie' ? '電影' : '影集'}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </StyledLayout>
    )
}

export default RightBar