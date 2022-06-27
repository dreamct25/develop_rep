import { ChangeEventHandler, Dispatch, FunctionComponent, MouseEventHandler } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { actionCreatorType, reducerState, RightBarProps, objType, cssSetPropertys } from './types'
import { useHistory } from "react-router"
import componentEntries from '../RightBar'

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType,
    styles: cssSetPropertys
} = componentEntries

const RightBar: FunctionComponent<RightBarProps> = ({
    toggleBar,
    postData,
    postCurrentSelect,
    postCurrentSearch,
    currentHotItemType
}: RightBarProps): JSX.Element => {
    const { selectListItem, currentPostType, rightBarSearchVal, rightBarSelectVal, searchBarToggleAnimate }: objType = useSelector((state: reducerState): objType => ({
        rightBarSearchVal: state.getIn(['rightBar', 'rightBarSearchVal']) as string,
        rightBarSelectVal: state.getIn(['rightBar', 'rightBarSelectVal']) as string,
        searchBarToggleAnimate: state.getIn(['rightBar', 'searchBarToggleAnimate']) as boolean,
        selectListItem: state.getIn(['rightBar', 'selectListItem']).toJS() as { selectText: string, selectVal: string }[],
        currentPostType: state.getIn(['rightBar', 'currentPostType']).toJS() as { [key: string]: any }
    }))

    const route = useHistory()

    const dispatch: Dispatch<any> = useDispatch()

    const currentSelect: (id: number) => void = id => {
        postCurrentSelect(id)
        window.innerWidth <= 414 && setTimeout(() => goSinglePreviewVideo(id),1700)
    }

    const setRightBarSearchVal: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }: { target: { value: string } }): void => dispatch(actionCreator.setRightBarSearchVal(value))

    const setRightBarSelectVal: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }: { target: { value: string } }): void => dispatch(actionCreator.setRightBarSelectVal(value))

    const pushSearchPage: MouseEventHandler<HTMLDivElement> = (): void => route.push({
        pathname: "/search",
        search: `query=${currentHotItemType === 'movie' ? 'popular_movie' : 'popular_tv'}&type=${currentHotItemType}`,
    })

    const searching: MouseEventHandler<HTMLDivElement> = (): void => {
        dispatch(actionCreator.setSearchBarToggleAnimate(!searchBarToggleAnimate))
        if (searchBarToggleAnimate && rightBarSearchVal !== '') {
            if (rightBarSelectVal === '') {
                alert('請選擇搜尋種類')
                dispatch(actionCreator.setSearchBarToggleAnimate(true))
            } else {
                postCurrentSearch({ searchVal: rightBarSearchVal, selectVal: rightBarSelectVal })
            }
        }
    }

    const renderTextSwitch: (val: string) => string[] | undefined = val => currentPostType[val]

    const goSinglePreviewVideo:(id: number) => void = id => route.push({ pathname: '/single_preview',search: `id=${id}&type=${currentHotItemType}` })

    return (
        <Show>
            <div className={toggleBar ? "search-group-outer search-group-outer-toggle" : "search-group-outer"}>
                <div className={searchBarToggleAnimate ? "search-group search-group-toggle" : "search-group"}>
                    <input type="text" value={rightBarSearchVal} onChange={setRightBarSearchVal} />
                    <select defaultValue="" onChange={setRightBarSelectVal}>
                        {selectListItem.map(({ selectText, selectVal }: { selectText: string, selectVal: string }, index: number) => (<option key={index} value={selectVal}>{selectText}</option>))}
                    </select>
                </div>
                <div className={searchBarToggleAnimate ? "search-btn search-btn-toggle" : "search-btn"} onClick={searching}>
                    <i className="fal fa-search"></i>
                </div>
            </div>
            <div className={toggleBar ? "right-list-outer outer-active" : "right-list-outer"}>
                <div className="right-list">
                    {postData !== false && postData.map((item: { [key: string]: any }, index: number) => (
                        <div className="poster-card" key={index} onClick={currentSelect.bind(this, item.id,item.media_type)}>
                            <div className="poster-img">
                                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                <div className="rate">{item.vote_average}<i className="fas fa-star stars"></i></div>
                                <div className="release-date">{item.release_date}</div>
                            </div>
                            <div className="poster-card-body">
                                <div className="title-group">
                                    <span>{item[renderTextSwitch(currentHotItemType)![0]]}</span>
                                    <span>{item[renderTextSwitch(currentHotItemType)![1]]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="more-info" onClick={pushSearchPage}>更多熱門{currentHotItemType === 'movie' ? '電影' : '影集'}</div>
                </div>
            </div>
        </Show>
    )
}

export default RightBar