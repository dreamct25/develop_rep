import { FC } from "react"
import {
    Converter,
    ColorPicker,
    ColorCard,
    ImageColorPicker
} from './container'

const router:{ 
    path:string,
    component:FC
}[] = [{
    path:'/converter',
    component:Converter
},{
    path:'/picker',
    component:ColorPicker
},{
    path:'/color_card',
    component:ColorCard
},{
    path:'/image_picker',
    component:ImageColorPicker
}]

export default router