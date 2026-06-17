import { useContext, useRef, useEffect } from "react"
import { useNavigate } from '@tanstack/react-router'
import { NewContext } from '@/App'
import { StyledLayout } from '.'

const LeftBar: FC = (): TSX => {

    const { $, setReducer, getReducer } = useContext(NewContext)

    const router = useNavigate()

    const { 
        currentSelectAtLeftBarType, 
        toggleBarAnimate, 
        currentWindowInnerWidth
    } = getReducer(state => ({
        currentSelectAtLeftBarType: state.LeftBarReducer.currentSelectAtLeftBarType,
        toggleBarAnimate: state.HomeReducer.toggleBarAnimate,
        currentWindowInnerWidth: state.HomeReducer.currentWindowInnerWidth
    }))

    const listItem: { 
        titleName: string, 
        titleVal: 'movie' | 'tv' | 'soon' 
    }[] = [{
        titleName: '熱門電影',
        titleVal:'movie'
    }, {
        titleName: '熱門影集',
        titleVal:'tv'
    }, {
        titleName: '即將上映',
        titleVal:'soon'
    }]

    const leftListOuterRef = useRef<HTMLDivElement>(null)

    const currentSelectType: (val: 'movie' | 'tv' | 'soon') => void = val => {

        if (val === 'soon') {
            
            router({ to: '/coming_soon_list' })

            return
        }
        
        setReducer(state => 
            void(state.LeftBarReducer.currentSelectAtLeftBarType = val), 
            'LeftBarReducer/setCurrentSelectAtLeftBarType'
        )
    }

    useEffect(() => {

        if(!leftListOuterRef.current) return

        if((currentWindowInnerWidth || window.innerWidth) > 970) return

        const { top } = leftListOuterRef.current.getBoundingClientRect()
        const { marginTop, transform } = window.getComputedStyle(leftListOuterRef.current)
        
        const { f: translateY } = new DOMMatrix(transform);

        const computedDynamicFloatFooterPos = top - parseFloat(marginTop) - translateY

        setReducer(state => 
            void(state.LeftBarReducer.floatFooterPos = computedDynamicFloatFooterPos), 
            'LeftBarReducer/setFloatFooterPos'
        )

    }, [leftListOuterRef.current, currentWindowInnerWidth])

    return (
        <StyledLayout>
            <div 
                className={toggleBarAnimate ? "left-list-outer outer-active" : "left-list-outer"}
                ref={leftListOuterRef}
            >
                <div className="left-list">
                    {
                        (currentWindowInnerWidth || window.innerWidth) > 970 && (
                            <div className="header">
                                <h1 className="title">Movies</h1>
                            </div>
                        )
                    }
                    {
                        $.maps(listItem, (item, index) => (
                            <div 
                                className={currentSelectAtLeftBarType === item.titleVal ? "list-item list-item-active" : "list-item"} 
                                key={index} 
                                onClick={currentSelectType.bind(this, item.titleVal)}
                            >
                                {item.titleName}
                            </div>
                        ))
                    }
                </div>
                <div className="list-footer">CopyRight &copy; 2021 Alex Chen .</div>
            </div>
        </StyledLayout>
    )
}

export default LeftBar