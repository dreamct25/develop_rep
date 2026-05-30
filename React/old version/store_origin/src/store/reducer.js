import { combineReducers } from 'redux-immutable'
import mainReducer from '../components/Main'
import musicReducer from '../components/MusicItemList'
import musicVideoReducer from '../components/MusicVideoItemList'
import movieReducer from '../components/MovieItemList'
import podcastReducer from '../components/PodcastItemList'
import ebookReducer from '../components/EbookItemList'
import softwareReducer from '../components/SoftwareItemList'
import renderSingleForMusic from '../components/RenderSingleForMusic'
import renderSingleForMusicVideo from '../components/RenderSingleForMusicVideo'
import renderSingleForMovie from '../components/RenderSingleForMovie'
import renderSingleForPodcast from '../components/RenderSingleForPodcast'
import renderSingleForSoftware from '../components/RenderSingleForSoftware'
import dialogReducer from '../components/Dialog'

export default combineReducers({
    main:mainReducer.reducer,
    musicItem:musicReducer.reducer,
    musicVideoItem:musicVideoReducer.reducer,
    movieItem:movieReducer.reducer,
    podcastItem:podcastReducer.reducer,
    ebookItem:ebookReducer.reducer,
    softwareItem:softwareReducer.reducer,
    renderSingleForMusic:renderSingleForMusic.reducer,
    renderSingleForMusicVideo:renderSingleForMusicVideo.reducer,
    renderSingleForMovie:renderSingleForMovie.reducer,
    renderSingleForPodcast:renderSingleForPodcast.reducer,
    renderSingleForSoftware:renderSingleForSoftware.reducer,
    dialog:dialogReducer.reducer,
})