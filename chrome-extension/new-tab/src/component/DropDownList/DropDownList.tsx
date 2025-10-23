import { useState } from 'react'
import { StyledLayout } from '.'

interface DropDowListProps {
    bindValue: string | number,
    listItem: { selectName: string, selectValue: any }[],
    changeEvent(value: string): void
    useThemColor: string
}

const DropDownList:FC<DropDowListProps> = (props):TSX => {
    const { bindValue,listItem,changeEvent,useThemColor } = props
    const [toggleList,setToggleList] = useState<boolean>(false)

    const mappingValueName = Object.fromEntries(listItem.map(row => [row.selectValue,row.selectName]))

    return (
        <StyledLayout useThemColor={useThemColor}>
            <div className="current-select" onClick={() => setToggleList(!toggleList)}>{mappingValueName[bindValue]}</div>
            <div className={`select-list ${toggleList ? 'toggle' : ''}`}>
                {listItem.map(
                    (row,index) => (
                        <div 
                            className="list-item"
                            key={index}
                            onClick={() => {
                                setToggleList(false)
                                changeEvent(row.selectValue)
                            }} 
                        >
                            {row.selectName}
                        </div>
                    )
                )}
            </div>
        </StyledLayout>
    )
}

export default DropDownList