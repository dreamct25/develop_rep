import VideoJs from 'video.js'
import StyledLayout from './styles'
import Video from './Video'

export type Player = ReturnType<typeof VideoJs>

export { StyledLayout, Video }