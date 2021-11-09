import { useEffect, FunctionComponent, Dispatch } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import componentEntries from '../Main'
import { StyledComponent } from "styled-components";
import { actionCreatorType } from "./types";
import RightBar from "../RightBar/RightBar";
import LeftBar from "../LeftBar/LeftBar";
import RenderCenter from "../RenderCenter/RenderCenter";
import SingleVideoPreview from "../SingleVideoPreview/SingleVideoPreview";
import RenderSearch from "../RenderSearch/RenderSearch";
import ComingSoonList from "../ComingSoonList/ComingSoonList";

const { actionCreator }: { actionCreator: actionCreatorType } = componentEntries

const { styles: { Show } }: { styles: { Show: StyledComponent<"div", any, {}, never> } } = componentEntries

interface objType {
    data: any,
    imgId: any,
    toggleBarAnim: any,
    search: any,
    hotItemType:any
}

const Main: FunctionComponent = (): JSX.Element => {
    const { data, imgId, toggleBarAnim, search,hotItemType }: { [key: string]: any } = useSelector((state: Immutable.Collection<unknown, unknown>): objType => ({
        data: state.getIn(["main", "data"]),
        imgId: state.getIn(['main', 'imgId']),
        toggleBarAnim: state.getIn(['main', 'toggleBarAnimate']),
        search: state.getIn(['main', 'search']),
        hotItemType:state.getIn(['main','hotItemType'])
    }))

    const dispatch:Dispatch<any> = useDispatch()

    const route = useHistory()

    const { pathname }: { pathname: string } = useLocation()

    const { searchVal, selectVal }: { searchVal: string, selectVal: string } = search

    const currentSelect: Function = (id: number) => dispatch(actionCreator.getCurrentSelect(id))

    const currentSearch: Function = (val: { [key: string]: any }) => dispatch(actionCreator.setSearchVal(val))

    const currentSelectAtLeftBarType:Function = (val:string) => dispatch(actionCreator.setHotItemType(val))

    const toggleBarAnimate = (status: boolean) => dispatch(actionCreator.setToggleBarAnimate(status))

    const pushMainPage = (obj: object): void => { "results" in data && route.push({ ...obj }) }

    const pushSearchPage = (obj: object): void => { 'searchVal' in search && route.push({ ...obj }) }

    useEffect(() => {
        currentSelectAtLeftBarType('movie')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        pushSearchPage({
            pathname: "/search",
            search: `query=${searchVal}&type=${selectVal}`,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    useEffect(() => pushMainPage({
        pathname: "/main",
        state: {
            postData: data.results,
            postId: imgId,
            postHotItemType:hotItemType
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [imgId])

    useEffect(() => {
        toggleBarAnimate(pathname === "/main" || pathname === "/" ? false : true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        'results' in data && pushMainPage({
            pathname: "/main",
            state: {
                postData: data.results,
                postId: data.results[0].id,
                postHotItemType:'movie'
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    return (
        <Show>
            <LeftBar 
                toggleBar={toggleBarAnim} 
                postCurrentSelectAtLeftBarType={currentSelectAtLeftBarType} 
            />
            <Switch>
                <Route exact path="/main" component={RenderCenter} />
                <Route exact path="/single_preview" component={SingleVideoPreview} />
                <Route exact path="/search" component={RenderSearch} />
                <Route exact path="/coming_soon_list" component={ComingSoonList} />
            </Switch>
            <RightBar
                toggleBar={toggleBarAnim}
                postData={"results" in data && data.results}
                postCurrentSelect={currentSelect}
                postCurrentSearch={currentSearch}
                currentHotItemType={hotItemType}
            />
        </Show>
    )
}

export default Main