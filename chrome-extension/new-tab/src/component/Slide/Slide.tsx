import { StyledLayout } from '.'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const Slide:FC<{ 
    slideNum: any,
    min: number,
    max: number
    changeEvent: (value:any) => void 
}> = ({ slideNum, min, max, changeEvent }):TSX => {
    
    return (
        <StyledLayout slideNum={slideNum} slideNumMax={max}>
            <Slider 
                handleRender={renderProps => (<div {...renderProps.props}>
                    <div className='tooltip'>{slideNum}</div>
                </div>)}
                min={min}
                max={max}
                onChange={changeEvent}
                value={slideNum}
            />
        </StyledLayout>
    )
}

export default Slide