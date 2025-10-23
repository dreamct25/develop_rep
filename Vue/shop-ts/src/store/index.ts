import { reducer as LoginReducer } from '@/pages/Login'
import { reducer as MainReducer } from '@/pages/Main'
import reducerMembers from '@/store/reducerMembersEnum'

export default {
    // [reducerMembers.Login]:LoginReducer,
    [reducerMembers.Main]: MainReducer,
    [reducerMembers.Login]: LoginReducer
}