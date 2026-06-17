import { combineReducers } from 'redux-immutable'
import mainComponent from '../component/Main'
import rightBarComponent from '../component/RightBar'
import LeftBarComponent from '../component/LeftBar'
import RenderCenterComponent from '../component/RenderCenter'
import RenderSearchMovieComponent from '../component/RenderSearchMovie'
import RenderSearchTvComponent from '../component/RenderSearchTv'
import RenderSearchActorComponent from '../component/RenderSearchActor'
import CastModalComponent from '../component/CastModal'
import SingleVideoPreviewComponent from '../component/SingleVideoPreview'
import VideoComponent from '../component/Video'
import ComingSoonListComponent from '../component/ComingSoonList'

export default combineReducers({
    main: mainComponent.reducer,
    rightBar: rightBarComponent.reducer,
    leftBar: LeftBarComponent.reducer,
    renderCenter: RenderCenterComponent.reducer,
    renderSearchMovie: RenderSearchMovieComponent.reducer,
    renderSearchTv: RenderSearchTvComponent.reducer,
    renderSearchActor: RenderSearchActorComponent.reducer,
    singleVideoPreview: SingleVideoPreviewComponent.reducer,
    comingSoonList: ComingSoonListComponent.reducer,
    video: VideoComponent.reducer,
    castModal:CastModalComponent.reducer
})