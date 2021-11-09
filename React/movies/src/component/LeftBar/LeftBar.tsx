import { Dispatch, FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { StyledComponent } from "styled-components"
import { useHistory } from "react-router"
import { actionCreatorType,LeftBarProps,objType,reducerState } from './types'
import componentEntries from '../LeftBar'

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: { Show: StyledComponent<"div", any> }
} = componentEntries



const LeftBar: FunctionComponent<LeftBarProps> = ({ toggleBar, postCurrentSelectAtLeftBarType }: LeftBarProps): JSX.Element => {
    const { listItem, listToggleAnimate, selectText }: objType = useSelector((state: reducerState): objType => ({
        listItem: state.getIn(['leftBar', 'listToggleAnimate']).toJS() as { titleName: string,titleVal:string}[],
        listToggleAnimate: state.getIn(['leftBar', 'listToggleAnimate']) as boolean,
        selectText: state.getIn(['leftBar', 'selectText']) as string
    }))

    const dispatch: Dispatch<any> = useDispatch()

    const route = useHistory()

    const currentSelectType: Function = (val: string): void => {
        if (val === 'soon') {
            route.push({
                pathname: 'coming_soon_list'
            })
        } else {
            dispatch(actionCreator.setSelectText(val))
            dispatch(actionCreator.setListToggleAnimate(true))
            postCurrentSelectAtLeftBarType(val)
        }

    }

    useEffect(() => {
        dispatch(actionCreator.setSelectText('movie'))
        dispatch(actionCreator.setListToggleAnimate(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Show>
            <div className={toggleBar ? "left-list-outer outer-active" : "left-list-outer"}>
                <div className="left-list">
                    {listItem.map((item: { titleName: string, titleVal: string }, index: number) => (
                        <div className={selectText === item.titleVal && listToggleAnimate ? "list-item list-item-active" : "list-item"} key={index} onClick={currentSelectType.bind(this, item.titleVal)}>{item.titleName}</div>
                    ))}
                </div>
            </div>
        </Show>
    )
}

export default LeftBar