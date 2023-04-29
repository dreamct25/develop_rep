import {
    PageI,
    PageII
} from './container'
import { Home } from './container/Home'

export default [{
    Path:'/',
    Component:Home
},{
    Path:'/pageI/:obj',
    Component: PageI
},{
    Path:'/pageII/:obj',
    Component:PageII
}]