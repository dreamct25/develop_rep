import { reducer as LoginReducer } from '../container/Login'
import { reducer as MainReducer } from '../container/Main'
import reducerMembers from 'store/reducerMembersEnum'

export default {
    [reducerMembers.Login]:LoginReducer,
    [reducerMembers.Main]:MainReducer
}