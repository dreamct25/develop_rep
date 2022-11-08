import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'video.js/dist/video-js.min.css'
import VideoYoutubePlugin from 'videojs-youtube/dist/Youtube.min.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHome,
    faHeart,
    faFilm,
    faStar,
    faPauseCircle,
    faPlayCircle,
    faCaretSquareUp, 
    faVolumeMute,
    faVolumeUp,
    faExpand,
    faTimes,
    faChevronLeft,
    faChevronRight,
    faStepBackward,
    faStepForward,
    faGlobe,
    faInfo,
    faMagnifyingGlass,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { en,tw } from './asset/i18nLang'
import router from './router'
import store from './store'
import App from './App.vue'

library.add(
    faHome,
    faHeart,
    faFilm,
    faStar,
    faPauseCircle,
    faPlayCircle,
    faCaretSquareUp,
    faVolumeMute,
    faVolumeUp,
    faExpand,
    faTimes,
    faChevronLeft,
    faChevronRight,
    faStepBackward,
    faStepForward,
    faGlobe,
    faInfo,
    faMagnifyingGlass,
    faChevronLeft,
    faCircleXmark
)

const i18n = createI18n<[typeof en,typeof tw],'en' | 'tw'>({
    legacy: false,
    locale: 'tw',
    fallbackLocale: 'tw',
    messages: { en,tw }
})

createApp(App)
    .use(router)
    .use(store)
    .use(VideoYoutubePlugin)
    .use(i18n)
    .component('Icon', FontAwesomeIcon).mount('.app')