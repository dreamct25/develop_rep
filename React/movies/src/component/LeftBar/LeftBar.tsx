import { Dispatch, FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Collection } from 'immutable'
import { StyledComponent } from "styled-components"
import { actionCreatorType } from './types'
import componentEntries from '../LeftBar'
import { useHistory } from "react-router"

const {
    actionCreator,
    styles: { Show }
}: {
    actionCreator: actionCreatorType
    styles: { Show: StyledComponent<"div", any, {}, never> }
} = componentEntries

interface LeftBarProps {
    toggleBar: boolean,
    postCurrentSelectAtLeftBarType: Function
}

interface objType {
    listItem: { titleName: string, titleVal: string }[],
    listToggleAnimate: any,
    selectText: any
}

const LeftBar: FunctionComponent<LeftBarProps> = ({ toggleBar, postCurrentSelectAtLeftBarType }: LeftBarProps): JSX.Element => {
    const { listItem, listToggleAnimate, selectText }: objType = useSelector((state: Collection<unknown, unknown>): objType => {
        let { leftBar }: { [key: string]: any } = state.toJS()
        return {
            listItem: leftBar.listItem,
            listToggleAnimate: state.getIn(['leftBar', 'listToggleAnimate']),
            selectText: state.getIn(['leftBar', 'selectText'])
        }
    })

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