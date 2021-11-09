import { all } from 'redux-saga/effects'
import MainSaga from '../component/Main/saga'
import SingleVideoPreviewSaga from '../component/SingleVideoPreview/saga'
import RenderSearchMovieSaga from '../component/RenderSearchMovie/saga'
import RenderSearchTvSaga from '../component/RenderSearchTv/saga'
import RenderSearchActorSaga from '../component/RenderSearchActor/saga'
import ComingSoonListSaga from '../component/ComingSoonList/saga'
import CastModalSaga from '../component/CastModal/saga'

function* rootSaga() {
    yield all([
        MainSaga(),
        SingleVideoPreviewSaga(),
        RenderSearchMovieSaga(),
        RenderSearchTvSaga(),
        RenderSearchActorSaga(),
        ComingSoonListSaga(),
        CastModalSaga()
    ])
}

export default rootSaga